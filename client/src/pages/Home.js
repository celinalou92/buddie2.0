import Auth from "../utils/auth";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import TaskBoard from "../components/TaskBoard";

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
      <div className="flex-row justify-space-around">
        <div className="col-sm-12 col-md-8 p-2">
          <TaskBoard />
        </div>
        <div className="col-sm-12 col-md-4 p-2">
          <div className="cardHeader">
            <h4>Messages</h4>
          </div>
          <div className="card scroller">
            <MessageList />
          </div>
          <MessageForm />
        </div>
      </div>
    </main>
  );
};
export default Home;
