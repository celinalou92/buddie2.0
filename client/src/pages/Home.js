// import FriendList from "../components/FriendList";
// import TaskForm from '../components/TaskForm';
import Auth from "../utils/auth";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import DashTask from "../components/DashTask";
import Grid from "@material-ui/core/Grid";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Home = () => {
  const user = Auth.loggedIn();

  const { loading, data } = useQuery(QUERY_ME, {
    variables: {
      id: user.data._id,
    },
  });

  const tasks = data.me.tasks;
  console.log(tasks)

  if (!user || undefined) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }



  console.log(data);

  return (
    <main>
      <Grid direction="row" container spacing={2}>
        <Grid item sm={6}>
          <h2 className="heading">My Tasks</h2>
          <div className={` flex-row compBorders scroller`}>
            <DashTask tasks={tasks}/>
          </div>
        </Grid>
        <Grid item sm={6}>
          <div className=" ">
            <h2 className="heading">Messages</h2>
            <div className={` ${user}`}>
              <div className="compBorders scroller">
                <MessageList />
              </div>
              <div className="col-12 mb-3">
                <MessageForm />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </main>
  );
};
export default Home;
