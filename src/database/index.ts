import { Connection, createConnection, getConnectionManager } from "typeorm";

import config from "./config";

export const dbConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
  } catch (err) {
    if (err instanceof Error && err.name === "AlreadyHasActiveConnectionError") {
      const activeConnection = getConnectionManager().get(config.name);
      return activeConnection;
    }
    console.log(err);
  }
  return null;
};
