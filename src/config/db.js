import mongoose from "mongoose";

const connectDB = async () => {
    try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo CONECTADO: ${conn.connection.host}`);
    } catch (error) {
    console.error(`ERROR al conectar a MongoDB: ${error.message}`);
    process.exit(1);
    }
};
export default connectDB;