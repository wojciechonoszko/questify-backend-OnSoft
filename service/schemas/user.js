const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");

const user = new Schema(
    {
        name: {
            type: String,
            default: "Guest",
        },
        password: {
            type: String,
            require: [true, "Password required"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: true,
        },

        token: {
            type: String,
            default: null,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verifyTokenEmail: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

user.path("email").validate((value) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(value).toLowerCase());
  });

user.methods.setPassword = function ({ password }) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};
user.methods.validPassword = function (password) {
    return bCrypt.compareSync(password, this.password);
};
user.methods.setToken = function (token) {
    this.token = token;
};

const User = model("user", user);
module.exports = User;