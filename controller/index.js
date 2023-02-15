const service = require("../service/index");
const {
  userRegisterSchema,
  userLoginSchema,
  newQuestSchema,
  editQuestSchema,
  idSchema,
} = require("../service/schemas/validationSchemas");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validate = userRegisterSchema.validate({ name, email, password });

  if (validate.error) {
    res.status(401).json({
      message: validate.error.message,
    });
  } else {
    try {
      const isUserExist = await service.findUserByEmail(email);
      if (!isUserExist) {
        await service.createUser(name, email, password);
        await service.createQuestsArray(email);
        res.status(201).json({
          message: "Registration successful",
        });
      } else {
        res.status(409).json({
          message: "This e-mail address is already registered",
        });
      }
    } catch (e) {
      next(e);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const validate = userLoginSchema.validate({ email, password });
  const isUserExist = await service.findUserByEmail(email);

  if (validate.error) {
    res.status(401).json({ message: validate.error.message });
  } else {
    try {
      if (isUserExist) {
        const loginFeedback = await service.loginUser(email, password);
        const data = loginFeedback.data;

        if (loginFeedback.code === 401) {
          res.status(401).json({
            message: "Email or password incorrect",
          });
        } else {
          res.status(200).json(data);
        }
      } else {
        res.status(401).json({
          message: "Email or password incorrect",
        });
      }
    } catch (e) {
      next(e);
    }
  }
};

const logout = async (req, res, next) => {
  const user = res.locals.user;
  await service.logoutUser(user.email);

  try {
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (e) {
    next(e);
  }
};
const getQuests = async (req, res, next) => {
  const user = res.locals.user;
  const questsList = await service.getAllQuests(user.email);
  try {
    res.status(200).json({
      data: questsList,
    });
  } catch (e) {
    next(e);
  }
};

const addQuest = async (req, res, next) => {
  const user = res.locals.user;

  const { title, level, category, date, isChallenge, isDone } = req.body;
  const validate = newQuestSchema.validate({ title, level, category, date,isChallenge,isDone });

  if (validate.error) {
    res.status(406).json({
      message: validate.error.message,
    });
  } else {
    try {
      const response = await service.createQuest(user.email, { title, level, category, date,isChallenge,isDone });
     
      res.status(201).json({
        message: "Created!",
        data:response
      });
    } catch (e) {
      next(e);
    }
  }
};
const updateQuest = async (req, res, next) => {
  const { id, data } = req.body;
  const user = res.locals.user;

  const validateData = editQuestSchema.validate(data);
  const validateId = idSchema.validate(id);

  if (validateId.error) {

    res.status(400).json({
      message: validateId.error,
    });
  } else if (validateData.error) {
    res.status(400).json({
      message: validateData.error,
    });
  } else {
    try {
      await service.updateQuest(user.email, id, {
        data,
      });

      res.status(200).json({
        message: "Edit successful",
      });
    } catch (e) {
      next(e);
    }
  }
};

const deleteQuest = async (req, res, next) => {
  const user = res.locals.user;
  const { id } = req.body;

  const validateId = idSchema.validate(id);
  if (validateId.error) {
    res.status(400).json({
      message: validateId.error.message,
    });
  } else {
    try {
      await service.deleteQuest(user.email, id);
      res.status(200).json({
        message: "Deleted",
      });
    } catch (e) {
      next(e);
    }
  }
};

module.exports = {
  register,
  login,
  logout,
  getQuests,
  addQuest,
  updateQuest,
  deleteQuest,
};