import Redis from "ioredis";
import { logger } from "../utils/winston";

let redisClient: Redis | null = null;

export const redisConnection = async (): Promise<Redis | null> => {
  try {
    if (!redisClient) {
      redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        reconnectOnError: (err) => {
          logger.error(`Redis error: ${err}`);
          return true;
        },
      });

      redisClient.on("connect", () => {
        console.log("Redis connection success.");
      });

      redisClient.on("error", (err) => {
        console.log(`Redis connection error: ${err}`);
      });

      redisClient.on("reconnecting", () => {
        console.log("Reconnecting to Redis...");
      });
    } else {
      console.log("Using existing Redis connection.");
    }

    return redisClient;
  } catch (err) {
    logger.error(`Redis connection failed: ${err}`);
    return null;
  }
};

export const redisSetKey = async (
  key: string,
  value: string,
  expiryInSeconds: number = 10 * 24 * 60 * 60,
): Promise<void> => {
  try {
    if (!redisClient) {
      await redisConnection();
    }
    if (redisClient) {
      await redisClient.set(`${process.env.REDIS_ENV}_${key}`, value, "EX", expiryInSeconds);
    }
  } catch (err) {
    logger.error(`Redis Error setting key '${process.env.REDIS_ENV}_${key}': ${err}`);
  }
};

export const redisGetKey = async (key: string): Promise<string | null> => {
  try {
    if (!redisClient) {
      await redisConnection();
    }
    if (redisClient) {
      const value = await redisClient.get(`${process.env.REDIS_ENV}_${key}`);
      return value;
    }
  } catch (err) {
    logger.error(`Redis Error retrieving key '${process.env.REDIS_ENV}_${key}': ${err}`);
  }
  return null;
};
