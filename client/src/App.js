import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Signup from "./Signup";
import SingleMessage from "./SingleMessage";
import { ThemeProvider } from "@mui/styles";
import { StyledEngineProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();
const serverURI = process.env.NEXT_PUBLIC_BACKEND_URI;
const httpLink = new HttpLink({ uri: serverURI });

function App() {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("id_token");

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          ...(token && { authorization: token }),
        },
      }));
      return forward(operation);
    });

    const apolloClient = new ApolloClient({
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

    setClient(apolloClient);
  }, []);

  if (!client) return <div>Loading...</div>;

  return (
    <ApolloProvider client={client}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <div className="flex-column justify-flex-start min-100-vh">
              <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/dashboard" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/message/:id" component={SingleMessage} />
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
