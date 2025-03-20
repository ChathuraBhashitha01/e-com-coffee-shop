import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../util/logger';

dotenv.config();

const MONGODB_URL: string | undefined = process.env.MONGODB_URL;

const DBConnection = async (): Promise<void> => {
    try {
        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables.");
        }
        
        const connection = await mongoose.connect(MONGODB_URL);
        logger.info(`MongoDB connected to: ${connection.connection.host}`);
    } catch (error) {
        logger.info(`Error connecting to MongoDB cluster: ${error}`);
    }
};

export default DBConnection;