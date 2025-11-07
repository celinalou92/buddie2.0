import TaskRow from "../TaskRow";
import TaskForm from "../TaskForm";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TASKS } from "../../utils/queries";
import AuthService from "../../utils/auth";
import { DELETE_TASK } from "../../utils/mutations";

const Taskboard = () => {
  const user = AuthService.loggedIn();
  const { loading, data } = useQuery(QUERY_TASKS);
  const tasks = data?.tasks || [];

  const [deleteTask, { error }] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      try {
        const { tasks } = cache.readQuery({ query: QUERY_TASKS });
        cache.writeQuery({
          query: QUERY_TASKS,
          data: { tasks: tasks.filter((task) => task._id !== deleteTask._id) },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (!user || undefined) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

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

  return (
    <>
      <table>
        <thead className="cardHeader p-3">
          <tr>
            <th scope="col">
              <h4>Assign</h4>
            </th>
            <th scope="col">
              <h4>Task</h4>
            </th>
            <th scope="col">
              <h4>Delete</h4>
            </th>
          </tr>
        </thead>
        <tbody className="card">
          <TaskRow tasks={tasks} deleteTask={deleteTask} />
        </tbody>
      </table>
      <TaskForm />
    </>
  );
};

export default Taskboard;
