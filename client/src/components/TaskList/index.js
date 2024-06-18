import React from "react";
// -----------------------------  components ----------------------------- //
import Toggler from "../Toggler";
import AssignMenu from "../AssignMenu";
import DeleteButton from "../DeleteButton";
// -----------------------------  task list styles ----------------------------- //

import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";

// -----------------------------  task list styles ----------------------------- //

// -----------------------------  task list styles ----------------------------- //

const TaskList = ({ tasks }) => {
  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }
  return (
    <>
      {tasks &&
        tasks.map((task) => (
          <Grid className="task-container" key={task._id}>
            <Grid xs={12} sm={12} md={1} item className="taskItem">
              <ButtonBase>
                <div className="task-creator">
                  {" "}
                  <span className="mobile-display">Creator:</span>{" "}
                  {task.username}
                </div>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="taskItem">
              <p className="taskText">{task.taskText}</p>
            </Grid>
            <Grid item xs={4} sm={4} md={1} className="taskItem">
              <Toggler task={task} />
            </Grid>
            <Grid item xs={4} sm={4} md={1} className="taskItem">
              <AssignMenu task={task} />
            </Grid>
            <Grid item xs={4} sm={4} md={1} className="taskItem">
              <DeleteButton task={task} />
            </Grid>
          </Grid>
        ))}
    </>
  );
};

export default TaskList;
