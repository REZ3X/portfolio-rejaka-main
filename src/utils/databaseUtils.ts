export async function reconnectDatabase(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response = await fetch("/api/database/reconnect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
}

export async function checkDatabaseStatus(): Promise<{
  connected: boolean;
  message: string;
}> {
  try {
    const response = await fetch("/api/database/reconnect", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      connected: data.connected,
      message: data.message,
    };
  } catch (error) {
    return {
      connected: false,
      message: `Network error: ${error}`,
    };
  }
}

export async function ensureDatabaseConnection(): Promise<boolean> {
  const status = await checkDatabaseStatus();

  if (!status.connected) {
    console.log("Database disconnected, attempting to reconnect...");
    const reconnectResult = await reconnectDatabase();

    if (reconnectResult.success) {
      console.log("Database reconnected successfully");
      return true;
    } else {
      console.error("Failed to reconnect database:", reconnectResult.message);
      return false;
    }
  }

  return true;
}
