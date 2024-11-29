import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection } from 'mongoose';

let mongoServer: MongoMemoryServer;

/**
 * Sets up the in-memory database and copies data from the main database.
 */
export const setupInMemoryDatabase = async (mainDbUri: string): Promise<void> => {
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();
  const memoryUri = mongoServer.getUri();

  await mongoose.connect(memoryUri);

  const mainDbConnection: Connection = mongoose.createConnection(mainDbUri);
  await mainDbConnection.asPromise();

  const collections = await mainDbConnection.db.listCollections().toArray();
  for (const collection of collections) {
    const data = await mainDbConnection.db.collection(collection.name).find().toArray();
    if (data.length > 0) {
      await mongoose.connection.collection(collection.name).insertMany(data); // Insert into in-memory DB
    }
  }

  await mainDbConnection.close();
};

/**
 * Tears down the in-memory database.
 */
export const teardownInMemoryDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};
