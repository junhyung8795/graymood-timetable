import mongoose from "mongoose";

const ManagerAccessCodeSchema = new mongoose.Schema({
    managerAccessCode: { type: String, required: true },
});

const ManagerAccessCode =
    mongoose.models.ManagerAccessCode ||
    mongoose.model("ManagerAccessCode", ManagerAccessCodeSchema);

export default ManagerAccessCode;
