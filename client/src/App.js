import { React } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/postDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Nav />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            />
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
