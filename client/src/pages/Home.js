import Auth from "../utils/auth";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import Grid from "@material-ui/core/Grid";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TaskBoard2 from "../components/TaskBoard2";

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
      <Grid direction="row" container spacing={2}>
        <Grid item sm={6} className="scroller py-4">
          <h2 className="heading">Viewing Your Pod's Tasks</h2>
          <TaskBoard2/>
        </Grid>
        <Grid item sm={6}>
          <h2 className="heading">Messages</h2>
            <div className="compBorders scroller flex-column justify-space-between alig">
              <MessageList />
              <MessageForm />
            </div>
        </Grid>
      </Grid>
    </main>
  );
};
export default Home;
