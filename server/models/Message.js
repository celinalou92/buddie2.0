import { Schema, model } from "mongoose";
import replySchema from "./Reply.js";
import dateFormatter from "../utils/dateFormat.js";

export const messageSchema = new Schema(
  {
    messageText: {
      type: String,
      required: "Enter your message!",
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    replies: [replySchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormatter(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

messageSchema.virtual("replyCount").get(function (replies) {
  if(replies){
    return this.replies.length
  }
   return [];
});

const Message = model("Message", messageSchema);

export default Message;
