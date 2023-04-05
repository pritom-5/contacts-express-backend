const mongoose = require("mongoose");

// schema

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const contactsModel = mongoose.model("contacts", contactSchema);
module.exports = contactsModel;
