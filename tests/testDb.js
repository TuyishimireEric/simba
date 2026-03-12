import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoConfig = null;

export const connect = async () => {
    mongoConfig = await MongoMemoryServer.create();
    const uri = mongoConfig.getUri();
    await mongoose.connect(uri);
};

export const closeDatabase = async () => {
    if (mongoConfig) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoConfig.stop();
    }
};

export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};
