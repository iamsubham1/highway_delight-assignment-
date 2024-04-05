import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://das1998lipun:Ou3w1IO9FvzBHEo3@cluster0.xbf2g4h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = async()=>{

    try {

        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    
    } catch (error) {

        console.error('Error starting server:', error);
        process.exit();
    }
}

export default connectToMongo;