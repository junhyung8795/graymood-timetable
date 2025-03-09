import mongoose from "mongoose";

const connection = {};
const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

export default async function dbConnect() {
    if (connection.isConnected) {
        return;
    }
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
    connection.isConnected = db.connections[0].readyState;
}
