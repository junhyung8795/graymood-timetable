import mongoose from "mongoose";

const connection = {};

export default async function dbConnect() {
    if (connection.isConnected) {
        console.log("DB already connected");
        return;
    }
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
    console.log("DB connected");
    connection.isConnected = db.connections[0].readyState;
}
