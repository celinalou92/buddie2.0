import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const ReplyList = ({ replies }) => {
  return (
    <div>
      <br />
      <h5>Replies:</h5>
      <div>
        {replies &&
          replies.map((reply) => (
            <div className="" key={reply._id}>
              <p>
                <Link
                  // to={`/profile/${reply.username}`}
                  style={{ fontWeight: 700 }}
                >
                  {reply.username}
                </Link>{" "}
                : {reply.replyBody}
              </p>
              <div className="messageDate">{reply.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReplyList;
