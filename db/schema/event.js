import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: { type: String },
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
