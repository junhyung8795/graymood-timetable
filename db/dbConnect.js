import mongoose from "mongoose";

const connection = {};

export default async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
    connection.isConnected = db.connections[0].readyState;
}
