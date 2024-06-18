import React from "react";
import Toggler from "../Toggler";
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
          <div className="task-container" key={task._id}>
            <div className="taskItem">
              <div className="task-creator">
                {" "}
                <span className="mobile-display">Creator:</span> {task.username}
              </div>
            </div>
            <div className="taskItem">
              <p className="taskText">{task.taskText}</p>
            </div>
            <div className="taskItem">
              <Toggler task={task} />
            </div>
            <div className="taskItem">
              <AssignMenu task={task} />
            </div>
            <div className="taskItem">
              <DeleteButton task={task} />
            </div>
          </div>
        ))}
    </>
  );
};

export default TaskList;
