import mongoose from "mongoose";

const UserAccessCodeSchema = new mongoose.Schema({
    userAccessCode: { type: String },
});

const UserAccessCode =
    mongoose.models.UserAccessCode ||
    mongoose.model("UserAccessCode", UserAccessCodeSchema);

export default UserAccessCode;
