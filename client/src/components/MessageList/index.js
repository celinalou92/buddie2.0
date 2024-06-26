import React from "react";
import { Link } from "react-router-dom";
import ChatIcon from "@material-ui/icons/Chat";
import PersonIcon from "@material-ui/icons/Person";
import { QUERY_MESSAGES } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const MessageList = () => {
  const { data } = useQuery(QUERY_MESSAGES);
  const messages = data?.messages || [];

  if (!messages.length) {
    return <h3>Start the conversation</h3>;
  }

  return (
    <>
      {messages &&
        messages.map((message) => (
          <div key={message._id} className="py-1 px-3">
            <div>
              <span className="nameStyle">{message.username}:</span>{" "}
              <span className="chatStyle">{message.messageText}</span>
            </div>
            <div>
              <PersonIcon />
              <Link to={`/message/${message._id}`}>
                <ChatIcon />
              </Link>
              <div className="messageDate">{message.createdAt}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MessageList;
