const { Schema, model } = require("mongoose");


const items = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    items: [
      {type:Schema.Types.ObjectId, ref:'Quest'}
    ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



const Items = model("quest-list", items);
module.exports = Items;