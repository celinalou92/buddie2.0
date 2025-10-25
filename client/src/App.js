import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Signup from "./pages/Signup";
import SingleMessage from "./pages/SingleMessage";
import Password from "./pages/Password";
import { ThemeProvider } from "@mui/styles";
import { StyledEngineProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const serverURI = process.env.REACT_APP_BACKEND_URI;
const httpLink = new HttpLink({ uri: serverURI });

let token = localStorage.getItem("id_token");

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token && { authorization: token }),
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tasks: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: concat(authMiddleware, httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <div className="flex-column justify-flex-start min-100-vh">
              <Header />
              <div className="container">
                <Switch>
                  {/* <Route exact path="/" component={Password} /> */}
                  {/* <Route exact path="/password" component={Password} /> */}
                  {/* <Route exact path="/dashboard" component={Home} /> */}
                  <Route exact path="/login" component={Login} />
                  {/* <Route exact path="/signup" component={Signup} /> */}
                  {/* <Route exact path="/message/:id" component={SingleMessage} /> */}
                  <Route exact path="/" component={Login} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
