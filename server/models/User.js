import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";
import { taskSchema } from "./Task.js";
import { messageSchema } from "./Message.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    podID: {
      type: Schema.Types.ObjectId,
      ref: "Pod",
    },
    tasks: [taskSchema],
    messages: [messageSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds);
  }
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
