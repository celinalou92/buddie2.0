import React from "react";
import TaskRow from "../components/TaskRow";
import TaskForm from "../components/TaskForm";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../utils/queries";
import Container from "@material-ui/core/Container";
import AuthService from "../utils/auth";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "5px 26px 5px 12px",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "auto",
    width: "85vw",
  },
}));

const Taskboard = () => {
  const classes = useStyles();
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
    <div>
      <Container maxWidth="lg">
        <h1>Viewing Your Pod's Taskboard.</h1>
        <br />
        <Grid container id="taskListContainer">
          <Grid container id="taskListHeader" className={classes.paper}>
            <Grid item sm={6}>
              <p>Task</p>
            </Grid>
            <Grid item sm={2}>
              <p>Status</p>
            </Grid>
            <Grid item sm={2}>
              <p>Assign</p>
            </Grid>
            <Grid item sm={2}>
              <p>Delete</p>
            </Grid>
          </Grid>
          {loading ? (
            <div>Loading your Pod's tasks</div>
          ) : (
            <TaskRow tasks={tasks}/>
          )}
          <br />
        </Grid>
        <TaskForm />
      </Container>
    </div>
  );
};

export default Taskboard;
