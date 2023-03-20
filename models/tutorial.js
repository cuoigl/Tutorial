const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const tutorialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    published: {
      type: String,
      required: true,
    },
    price: {
      type: Currency,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Tutorials = mongoose.model("Tutorial", tutorialSchema);

module.exports = Tutorials;
