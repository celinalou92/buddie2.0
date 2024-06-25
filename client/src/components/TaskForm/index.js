import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../../utils/mutations";
import { QUERY_TASKS } from "../../utils/queries";

const TaskForm = () => {
  const [taskText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);


  const [addTask, { error }] = useMutation(ADD_TASK, {
    update(cache, { data: { addTask } }) {
      try {
        // read what's currently in the cache
        const { tasks } = cache.readQuery({ query: QUERY_TASKS });
        // prepend the newest task to the front of the array
        cache.writeQuery({
          query: QUERY_TASKS,
          data: { tasks: [addTask, ...tasks] },
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
      await addTask({
        variables: { taskText: taskText },
      });

      setText("");
      setCharacterCount(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new task..."
          value={taskText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3 buddieBtn" type="submit">
          Submit
        </button>
        <p
        className={`m-1 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      </form>
    </div>
  );
};

export default TaskForm;
