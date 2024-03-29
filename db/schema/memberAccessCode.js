import mongoose from "mongoose";

const MemberAccessCodeSchema = new mongoose.Schema({
    memberAccessCode: { type: String, required: true },
});

const MemberAccessCode =
    mongoose.models.MemberAccessCode ||
    mongoose.model("MemberAccessCode", MemberAccessCodeSchema);

export default MemberAccessCode;
