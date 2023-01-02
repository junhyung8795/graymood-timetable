import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: { type: String },
});

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default Item;
