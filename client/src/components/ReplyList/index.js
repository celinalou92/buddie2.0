import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const ReplyList = ({ replies }) => {
  console.log("reply list",replies)
  return (
    <div>
      <br/>
      <h5>Replies:</h5>
      <div>
        {replies &&
          replies.map((reply) => (
            <p className="" key={reply._id}>
              <Link
                // to={`/profile/${reply.username}`}
                style={{ fontWeight: 700 }}
              >
                {reply.username}
              </Link>{" "}
              : {reply.replyBody}
              <div className="messageDate">{reply.createdAt}</div>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReplyList;
