import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    detail: { type: String, required: true },
});

const Notice = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);

export default Notice;
