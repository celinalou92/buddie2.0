import React from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Toggler from "../Toggler";
import DeleteButton from "../DeleteButton";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const DashTask = ({ user, setShouldUpdate }) => {
  const { loading, data } = useQuery(QUERY_ME, {
    variables: {
      id: user.data._id,
    },
  });

  const tasks = data?.me.tasks || [];

  if (!tasks.length) {
    return <h3>You don't have any tasks!</h3>;
  }

  return (
    <div>
      {tasks &&
        tasks.map((task) => (
          <div className="taskItem">
            <p className="myTaskStyle">
              <span className="myTaskIcon">
                <ListAltIcon></ListAltIcon>
              </span>
              {task.taskText}
            </p>
            <Toggler task={task} setShouldUpdate={setShouldUpdate} />
            <DeleteButton task={task} setShouldUpdate={setShouldUpdate} />
          </div>
        ))}
    </div>
  );
};

export default DashTask;
