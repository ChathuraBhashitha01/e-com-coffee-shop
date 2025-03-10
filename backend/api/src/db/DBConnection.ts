import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL: string | undefined = process.env.MONGODB_URL;

const DBConnection = async (): Promise<void> => {
    try {
        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables.");
        }
        
        const con = await mongoose.connect(MONGODB_URL);
        console.info(`MongoDB connected to: ${con.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB cluster: ", error);
    }
};

export default DBConnection;