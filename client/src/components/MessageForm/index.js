import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../../utils/mutations";
import { QUERY_MESSAGES } from "../../utils/queries";
import SendIcon from "@mui/icons-material/Send";

const MessageForm = () => {
  const [messageText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
    update(cache, { data: { addMessage } }) {
      try {
        // read what's currently in the cache
        const { messages } = cache.readQuery({ query: QUERY_MESSAGES });
        // prepend the newest thought to the front of the array
        cache.writeQuery({
          query: QUERY_MESSAGES,
          data: { messages: [addMessage, ...messages] },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addMessage({
        variables: { messageText },
      });

      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Type a message"
          value={messageText}
          className="form-input   col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="buddieBtn btn col-12 col-md-3" type="submit">
          <span>
            <SendIcon></SendIcon>
          </span>
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

export default MessageForm;
