import React from "react";
import TaskRow from "../TaskRow";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../../utils/queries";
import AuthService from "../..//utils/auth";

const Taskboard = () => {
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
      <table className="taskTable">
        <thead className="cardHeader">
          <tr>
            <th scope="col">Assign</th>
            <th scope="col">Task</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        <TaskRow tasks={tasks} />
        </tbody>
      </table>
    </>
  );
};

export default Taskboard;
