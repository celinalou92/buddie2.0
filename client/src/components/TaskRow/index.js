import React from "react";
import Toggler from "../Toggler";
import AssignMenu from "../AssignMenu";
import DeleteButton from "../DeleteButton";
import { Grid } from "@material-ui/core";

const TaskList = ({ tasks }) => {

  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <>
      {tasks &&
        tasks.map((task) => (
          <div key={task._id} className="taskRow">
            <Grid container >
              <Grid md={4} className="taskCell">
                <AssignMenu task={task} />
              </Grid>
              <Grid md={6} className="taskCell">
                <p>{task.taskText}</p>
              </Grid>
              <Grid md={2} className="taskCell">
                <DeleteButton task={task} />
              </Grid>
            </Grid>
          </div>
        ))}
    </>
  );
};

export default TaskList;
