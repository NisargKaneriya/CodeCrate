// Importing required modules
import mongoose from 'mongoose';

// Creating a function to establish connection with DB
const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }
};

// Exporting the module
export default dbConnect;