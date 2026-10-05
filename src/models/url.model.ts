import { Schema, model } from "mongoose";
const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },

    shortCode: {
        type: String,
        required: true,
        unique: true
    }
});

export const Url = model("Url", urlSchema);