import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { UPDATE_TASK } from "../utils/mutations";
import { QUERY_USERS } from "../utils/queries";


const AssignMenu = ({ task }) => {
  const [assign, setAssign] = useState("");
  const [updateAssign, { error }] = useMutation(UPDATE_TASK);

  const { data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  const handleChange = (e) => {
    const assign = e.target.value;
    if (error) {
      return console.log("Assign Toggle Error", error);
    }
    setAssign(assign);
    updateAssign({ variables: { _id: task._id, assignedID: assign } });
  };

  return (
    <select
      labelid="assignSelect"
      id="assignSelect"
      onChange={handleChange}
      value={assign}
      className="assign-input"
    >
      {users &&
        users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
    </select>
  );
};

export default AssignMenu;
