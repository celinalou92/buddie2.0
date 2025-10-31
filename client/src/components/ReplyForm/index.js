import { useState } from "react";
import { useMutation } from "@apollo/client";
import {  ADD_REPLY } from "../../utils/mutations";

const ReplyForm = ({ messageId }) => {
  const [replyBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addReply, { error }] = useMutation(ADD_REPLY);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addReply({
          variables: { replyBody, messageId },
        });
        // clear form input value
        setBody("");
        setCharacterCount(0);
      } catch (e) {
        console.log(e);
      }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <textarea
          value={replyBody}
          placeholder="Reply to message"
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3 buddieBtn" type="submit">
          Submit
        </button>
        <p
          className={`m-1 ${
            characterCount === 280 || error ? "text-error" : ""
          }`}
        >
          Character Count: {characterCount}/280
          {error && <span className="ml-2">Something went wrong...</span>}
        </p>
      </form>
    </div>
  );
};

export default ReplyForm;
