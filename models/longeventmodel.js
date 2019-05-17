const mongoose = require("mongoose");
const longEventSchema = new mongoose.Schema(
  {
    startDate: { type: Date },
    endDate: { type: Date },
    name: { type: String },
    color: { type: String },
    shareable: { type: Boolean }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const longEventModel = mongoose.model("LongEvent", longEventSchema);
module.exports = longEventModel;
