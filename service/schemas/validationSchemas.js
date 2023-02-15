const Joi = require("joi");

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().min(5).max(25).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().min(5).max(30).required(),
  password: Joi.string().min(5).max(25).required(),
});

const newQuestSchema = Joi.object({
  title: Joi.string().min(1).required(),
  level: Joi.string().valid("easy", "normal", "hard").required(),
  category: Joi.string()
    .valid("stuff", "family", "health", "learning", "leisure", "work")
    .required(),
  date: Joi.string().required(),
  isChallenge: Joi.boolean().required(),
  isDone:Joi.boolean().required()
});

const editQuestSchema = Joi.object({
  title: Joi.string().min(1),
  level: Joi.string().valid("easy", "normal", "hard"),
  category: Joi.string().valid(
    "stuff",
    "family",
    "health",
    "learning",
    "leisure",
    "work"
  ),
  isChallenge: Joi.boolean(),
  date: Joi.string(),
  isDone:Joi.boolean(),
})
  .required()
  .min(1);



const idSchema=Joi.string().required()
module.exports = {
  userRegisterSchema,
  userLoginSchema,
  newQuestSchema,
  editQuestSchema,
  idSchema,
};