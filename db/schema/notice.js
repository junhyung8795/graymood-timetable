import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
    title: { type: String },
    detail: { type: String },
});

const Notice = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);

export default Notice;
