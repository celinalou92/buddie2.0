import Auth from "../utils/auth";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import DashTask from "../components/DashTask";
import Grid from "@material-ui/core/Grid";

const Home = () => {
  const user = Auth.loggedIn();

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
        <Grid item sm={6}>
          <h2 className="heading">{user.data.username} Tasks</h2>
          <div className={` flex-row compBorders scroller`}>
            <DashTask user={user}/>
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
