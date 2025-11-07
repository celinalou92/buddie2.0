import AssignMenu from "../AssignMenu";
import DeleteButton from "../DeleteButton";

const TaskRow = ({ tasks, deleteTask }) => {

  return (
    <>
      {tasks &&
        tasks.map((task) => (
          <tr key={task._id}>
              <td>
                <AssignMenu task={task} />
              </td>
              <td>
                <p>{task.taskText}</p>
              </td>
              <td>
                <DeleteButton task={task} deleteTask={deleteTask}/>
            </td>
          </tr>
        ))}
    </>
  );
};

export default TaskRow;
