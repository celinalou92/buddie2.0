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
                {reply.username}: {reply.replyBody}
              </p>
              <div className="messageDate">{reply.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReplyList;
