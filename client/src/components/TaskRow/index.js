import React from "react";
import AssignMenu from "../AssignMenu";
import DeleteButton from "../DeleteButton";

const TaskList = ({ tasks }) => {
  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <>
      {tasks &&
        tasks.map((task) => (
          <tr key={task._id}>
              <td>
                <AssignMenu task={task} />
              </td>
              <td>
                <p>{task.taskText}</p>
              </td>
              <td>
                <DeleteButton task={task} />
            </td>
          </tr>
        ))}
    </>
  );
};

export default TaskList;
