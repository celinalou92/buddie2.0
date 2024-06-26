import { useParams } from "react-router-dom";
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MESSAGE } from "../utils/queries";
import ReplyForm from "../components/ReplyForm";
import ReplyList from "../components/ReplyList";
import Auth from "../utils/auth";
import Grid from "@material-ui/core/Grid";
import MessageList from "../components/MessageList";

const SingleMessage = (props) => {
  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_MESSAGE, {
    variables: {
      id: id,
    },
  });

  const message = data?.message || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card">
        <div className="cardHeader">
          <h2>You are viewing {message.username}'s Message</h2>
        </div>
        <div className="scroller p-4">
          <div>
            <p>{message.messageText}</p>
          </div>
          {message.replies.length > 0 && (
            <ReplyList replies={message.replies} />
          )}
        </div>
      </div>
      {Auth.loggedIn() && <ReplyForm messageId={message._id} />}
    </>
  );
};

export default SingleMessage;
