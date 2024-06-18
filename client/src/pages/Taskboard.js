import React from "react";
import TaskList from "../components/TaskList";
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
        <Grid id="taskListContainer" container>
          <Grid item container>
            <Grid item container id="taskListHeader" className={classes.paper}>
              <Grid item sm={1} className="headerItem">
                <p>Creator</p>
              </Grid>
              <Grid item sm={6} className="headerItem">
                <p>Task</p>
              </Grid>
              <Grid item sm={1} className="headerItem">
                <p>Status</p>
              </Grid>
              <Grid item sm={1} className="headerItem">
                <p>Assign</p>
              </Grid>
              <Grid item sm={1} className="headerItem">
                <p>Delete</p>
              </Grid>
            </Grid>
          </Grid>
          {loading ? (
            <div>Loading your Pod's tasks</div>
          ) : (
            <TaskList tasks={tasks} username={`${user.username}'s tasks...`} />
          )}
          <br />
        </Grid>
        <TaskForm />
      </Container>
    </div>
  );
};

export default Taskboard;
