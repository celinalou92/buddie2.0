import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../utils/mutations";
import DeleteIcon from "@mui/icons-material/Delete";
import { QUERY_TASKS } from "../utils/queries";

const DeleteButton = ({ task }) => {
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

  const handleClick = (event) => {
    event.preventDefault();
    deleteTask({ variables: { _id: task._id } });
  };

  return (
    <button
      className="deleteBtn"
      color="secondary"
      aria-label="delete"
      onClick={handleClick}
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
