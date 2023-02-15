const { string } = require("joi");
const { Schema, model } = require("mongoose");


const quest = new Schema(
  {
    owner: {
      type: String,
      required:true,
    },
    isChallenge: {
      type: Boolean,
      required:true,
    },
    isDone: {
      type: Boolean,
      required:true,
    },
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["easy","normal","hard"],
      required: true,
    },
    category: {
      type: String,
      enum:["stuff","family","health","learning","leisure","work"],
      required: true,
    },
    date: {
      type: String,
      required:true,
    },
    
    
  },
  {
    versionKey: false,
    timestamps: true,
    
  }
);

const Quest = model("quest", quest);
module.exports = Quest;