import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoClient>;
}

const globalForMongo = globalThis as unknown as GlobalWithMongo;

if (process.env.NODE_ENV === "development") {
  if (!globalForMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalForMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalForMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db("portfolio");
}

export async function reconnectMongoDB(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const client = await clientPromise;
    await client.db("admin").admin().ping();
    return { success: true, message: "MongoDB connection is healthy" };
  } catch (error) {
    console.log("MongoDB connection lost, attempting to reconnect...", error);

    try {
      const oldClient = await clientPromise;
      await oldClient.close();
    } catch (closeError) {
      console.log("Error closing old connection:", closeError);
    }

    try {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();

      if (process.env.NODE_ENV === "development") {
        globalForMongo._mongoClientPromise = clientPromise;
      }

      const newClient = await clientPromise;
      await newClient.db("admin").admin().ping();

      return { success: true, message: "MongoDB reconnected successfully" };
    } catch (reconnectError) {
      console.error("Failed to reconnect to MongoDB:", reconnectError);
      return {
        success: false,
        message: `Failed to reconnect: ${reconnectError}`,
      };
    }
  }
}

export async function getConnectionStatus(): Promise<{
  connected: boolean;
  message: string;
}> {
  try {
    const client = await clientPromise;
    await client.db("admin").admin().ping();
    return { connected: true, message: "Connected" };
  } catch (error) {
    return { connected: false, message: `Disconnected: ${error}` };
  }
}
