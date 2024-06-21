import React from "react";
import TaskRow from "../TaskRow";
import TaskForm from "../TaskForm";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../../utils/queries";
import AuthService from "../..//utils/auth";
import Grid from "@material-ui/core/Grid";


const Taskboard2 = () => {
  const { loading, data } = useQuery(QUERY_TASKS);

  const tasks = data?.tasks || [];
  const user = AuthService.loggedIn();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || undefined) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <Grid container className="taskListHeader">
        <Grid item md={4}>
          <p>Assign</p>
        </Grid>
        <Grid item md={6}>
          <p>Task</p>
        </Grid>
        <Grid item md={2}>
          <p>Delete</p>
        </Grid>
      </Grid>
      <Grid container className="taskListContainer scroller">
        {loading ? (
          <div>Loading your Pod's tasks</div>
        ) : (
          <TaskRow tasks={tasks} />
        )}
        <br />
      </Grid>
      <TaskForm />
    </>
  );
};

export default Taskboard2;
