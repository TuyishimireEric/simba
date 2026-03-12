import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoConfig = null;

/**
 * Connect to the in-memory database.
 * This should be called before any tests run.
 */
export const connect = async () => {
    mongoConfig = await MongoMemoryServer.create();
    const uri = mongoConfig.getUri();
    await mongoose.connect(uri);
};

/**
 * Drop database, close the connection and stop mongodb-memory-server.
 * This should be called after all tests finish.
 */
export const closeDatabase = async () => {
    if (mongoConfig) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoConfig.stop();
    }
};

/**
 * Remove all data from all database collections.
 * This should be called between each test to ensure a clean state.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};
