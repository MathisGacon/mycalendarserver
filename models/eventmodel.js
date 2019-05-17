const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    date: { type: String },
    startTime: { type: Number },
    endTime: { type: Number },
    name: { type: String },
    color: { type: String },
    sharable: { type: Boolean }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const eventModel = mongoose.model("Event", eventSchema);
module.exports = eventModel;
