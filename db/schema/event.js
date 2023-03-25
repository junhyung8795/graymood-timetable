import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    detail: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: {
        type: Date,
        expires: 2160000,
        default: Date.now,
    },
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
