import Auth from "../utils/auth";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import Grid from "@material-ui/core/Grid";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TaskBoard from "../components/TaskBoard";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const user = Auth.loggedIn();
  const { data } = useQuery(QUERY_ME, {
    variables: {
      id: user.data._id,
    },
  });

  const tasks = data?.me.tasks || [];

  if (!user || undefined) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <main>
      <div className="flex-row justify-space-around">
        <div className="col-sm-12 col-md-6 p-2">
          <div className="card" >
            <div>
              <TaskBoard />
            </div>
          </div>
          <div>
            <TaskForm />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 p-2">
          <div className="card">
            <div className="cardHeader">
              <h4>Messages</h4>
            </div>
            <div className="card scroller">
              <MessageList />
            </div>
          </div>
          <MessageForm />
        </div>
      </div>
    </main>
  );
};
export default Home;
