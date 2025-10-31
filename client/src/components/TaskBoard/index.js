import TaskRow from "../TaskRow";
import TaskForm from "../TaskForm";
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

  if (!tasks.length) {
    return (
      <div className="p-4 text-center">
        <h3>No Tasks Yet</h3>
      </div>
    );
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
      <thead className="cardHeader p-3">
        <tr>
          <th scope="col"><h4>Assign</h4></th>
          <th scope="col"><h4>Task</h4></th>
          <th scope="col"><h4>Delete</h4></th>
        </tr>
      </thead>
      <table className="card">
        <tbody>
          <TaskRow tasks={tasks} />
        </tbody>
      </table>
      <TaskForm />
    </>
  );
};

export default Taskboard;
