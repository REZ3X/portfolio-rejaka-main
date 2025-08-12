import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,
  maxIdleTimeMS: 30000,
  retryWrites: true,
  retryReads: true,
  family: 0, 
  hints: 0,
  heartbeatFrequencyMS: 10000,
  maxConnecting: 2,
  bufferMaxEntries: 0,
  useUnifiedTopology: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoClient>;
}

const globalForMongo = globalThis as unknown as GlobalWithMongo;

async function createConnection(retryCount = 0): Promise<MongoClient> {
  const maxRetries = 3;
  
  try {
    console.log(`Creating MongoDB connection (attempt ${retryCount + 1}/${maxRetries + 1})...`);
    const newClient = new MongoClient(uri, options);
    await newClient.connect();

    await newClient.db("admin").admin().ping();
    console.log("MongoDB connection established successfully");
    return newClient;
    
  } catch (error) {
    console.error(`MongoDB connection attempt ${retryCount + 1} failed:`, error);
    
    if (retryCount < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return createConnection(retryCount + 1);
    }
    
    throw error;
  }
}

if (process.env.NODE_ENV === "development") {
  if (!globalForMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalForMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalForMongo._mongoClientPromise;
} else {
  clientPromise = createConnection();
}

export default clientPromise;

export async function ensureConnection(): Promise<MongoClient> {
  try {
    const client = await clientPromise;
    await Promise.race([
      client.db("admin").admin().ping(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection ping timeout')), 5000)
      )
    ]);
    return client;
  } catch (error) {
    console.log("Connection lost or timed out, creating new connection...", error);
    
    try {
      const oldClient = await clientPromise;
      await oldClient.close();
    } catch (closeError) {
      console.log("Error closing old connection:", closeError);
    }

    clientPromise = createConnection();
    
    if (process.env.NODE_ENV === "development") {
      globalForMongo._mongoClientPromise = clientPromise;
    }
    
    return await clientPromise;
  }
}

export async function getDatabase(): Promise<Db> {
  const client = await ensureConnection();
  return client.db("portfolio");
}

export async function reconnectMongoDB(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    console.log("Checking MongoDB connection health...");
    await ensureConnection();
    return { success: true, message: "MongoDB connection is healthy" };
  } catch (error) {
    console.error("MongoDB reconnection failed:", error);
    return {
      success: false,
      message: `Failed to reconnect: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

export async function getConnectionStatus(): Promise<{
  connected: boolean;
  message: string;
}> {
  try {
    const client = await clientPromise;
    await Promise.race([
      client.db("admin").admin().ping(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Ping timeout')), 3000)
      )
    ]);
    return { connected: true, message: "Connected" };
  } catch (error) {
    return { 
      connected: false, 
      message: `Disconnected: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

export async function withRetry<T>(
  operation: (db: Db) => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const db = await getDatabase();
      return await operation(db);
    } catch (error) {
      lastError = error as Error;
      console.log(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        break;
      }
      
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 3000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

export async function keepAlive(): Promise<void> {
  try {
    const client = await ensureConnection();
    await client.db("portfolio").admin().ping();
    console.log("Keep-alive ping sent to MongoDB");
  } catch (error) {
    console.log("Keep-alive ping failed:", error);
  }
}