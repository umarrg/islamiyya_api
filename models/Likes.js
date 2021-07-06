const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verse_key: {
      type: String,
    },
    id: {
      type: String,
    },

    verse_number: {
      type: String,
    },
    arabic_verse: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", LikeSchema);
