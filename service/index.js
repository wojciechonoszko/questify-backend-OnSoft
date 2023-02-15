const User = require("./schemas/user");
const Items = require("./schemas/items-list");
const Quest = require("./schemas/quest");
const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");



//USER!

const createUser = async (name, email, password) => {
  const newUser = await new User({ name: name, email: email });

  await newUser.setPassword({ password: password });
  await newUser.save();
};
const loginUser = async (email, password) => {
  const user = await User.findOne({ email: email });
  const isPasswordCorrect = await user.validPassword(password);
  if (isPasswordCorrect) {
    const payload = {
      _id: user.id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "12h",
    });
    await user.setToken(token);
    await user.save();
    return {
      
      data: {
        message: "Login successful",
        data: {
          name: user.name,
          email: user.email,
          token: token,
        },
      },
    };
  } else {
    return { code: 401, data: { message: "Email or password incorrect" } };
  }
};

const logoutUser = async (email) => {
  const user = await User.findOne({ email: email });
  user.setToken(null);
  user.save();
};

const findUserByEmail = (filter) => {
  return User.findOne({ email: filter }).lean();
};
const findUserByToken = (filter) => {
  return User.findOne({ token: filter }).lean();
};

//Quests!

const createQuestsArray = (email) => {
  return Items.create({ owner: email });
};
const getAllQuests = async (email) => {

  const collection = await Items.findOne({ owner: email }).lean();
  if (!collection) {
    Items.create({owner:email})
  }
  const ids = collection?.items.map(e=>e.toString());
  const items = await Quest.find({ '_id': { $in: ids } }).lean();
  return items
};

const createQuest = async (email, { title, level, category,date,isChallenge,isDone }) => {
  const quest = new Quest({ owner: email, title: title, level: level, category,date:date,isChallenge:isChallenge,isDone:isDone });
  quest.save()
 
  
  await Items.findOneAndUpdate({ owner: email }, { $push: { items: quest } }).lean();
  return quest
};
const updateQuest = async (email, id, { data }) => {
  return await Quest.findOneAndUpdate({ _id: id, owner:email },data);
}
const deleteQuest = async (email,id) => {
  await Quest.findOneAndRemove({ _id: id, owner: email });
  await Items.findOneAndUpdate({ owner: email },
  {$pull:{items:Types.ObjectId(id)}} 
  );
}


module.exports = {
  createUser,
  loginUser,
  logoutUser,
  findUserByEmail,
  findUserByToken,
  createQuestsArray,
  getAllQuests,
  createQuest,
  updateQuest,
  deleteQuest,
};