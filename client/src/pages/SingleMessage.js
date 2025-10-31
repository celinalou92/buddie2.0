import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_MESSAGE } from "../utils/queries";
import ReplyForm from "../components/ReplyForm";
import ReplyList from "../components/ReplyList";
import Auth from "../utils/auth";

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
          <h2>Message Thread:</h2> 
        </div>
        <div className="p-5">
          <p>{message.messageText}</p>
          <div className="scroller">
            {message.replies.length > 0 && (
              <ReplyList replies={message.replies} />
            )}
          </div>
        </div>
      </div>
      {Auth.loggedIn() && <ReplyForm messageId={message._id} />}
    </>
  );
};

export default SingleMessage;
