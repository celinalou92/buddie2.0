import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ task, deleteTask }) => {
  
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
