import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI || "";

const connectToMongo = async (): Promise<void> => {
    try {
       

        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit with error code
    }
}

export default connectToMongo;
