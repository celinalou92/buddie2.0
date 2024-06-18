import React from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Toggler from "../Toggler";
import AssignMenu from "../AssignMenu";
import DeleteButton from "../DeleteButton";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import {ButtonBase, Grid} from "@material-ui/core";

const DashTask = ({  user, setShouldUpdate }) => {
  
  const { loading, data } = useQuery(QUERY_ME, {
    variables: {
      id: user.data._id,
    },
  });

  const tasks = data?.me.tasks || [];

  if (!tasks.length) {
    return <h3>You don't have any tasks!</h3>;
  }

  return (
    <div>
      {tasks &&
        tasks.map((task) => (
          <Grid container className="" key={task._id}>
            <Grid xs={12} sm={12} md={1} item className="taskItem">
              <ButtonBase>
                <div className="task-creator">
                  {" "}
                  <span className="mobile-display">Creator:</span>{" "}
                  {task.username}
                </div>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className="">
              <p className="myTaskStyle">
                <span className="myTaskIcon">
                  <ListAltIcon></ListAltIcon>
                </span>
                {task.taskText}
              </p>
            </Grid>
            <Grid item xs={4} sm={4} md={12} className="">
              <Toggler task={task} setShouldUpdate={setShouldUpdate} />
            </Grid>
            <Grid item xs={4} sm={4} md={12} className="taskItem">
              <DeleteButton task={task} setShouldUpdate={setShouldUpdate} />
            </Grid>
          </Grid>
        ))}
    </div>
  );
};

export default DashTask;
