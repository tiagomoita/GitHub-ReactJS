import React, { useContext } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import SignInScreen from "./../components/SignInScreen/SignInScreen";
import PageNotFound from "./../components/SignInScreen/PageNotFound";
import Home from "../components/Home/Home";
import { Context as AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const AppRouter = () => {
  const {
    state: { users, logged },
    update_logged,
  } = useContext(AuthContext);

  useEffect(() => {
    update_logged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.length === 0) {
      localStorage.setItem("Data", JSON.stringify([]));
    }

    if (users.length !== 0) {
      localStorage.setItem("Data", JSON.stringify(users));
    }
  }, [users]);
 
  return (
    <Router>
      <Switch>
          {Object.values(logged).length === 0 ? (
            <Route path="/" component={SignInScreen} exact />
          ) : (
            logged.Logged === true ? 
              <Route path="/home" component={Home} exact /> :
              <Route path="/" component={SignInScreen} exact />
          )}

          {Object.values(logged).length === 0 ? (
              <Redirect from="/home" to="/" />
            ) : (
              logged.Logged === true ? (
              
                <Redirect from="/" to="/home" /> ):
                <Redirect from="/home" to="/" />
          )}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
