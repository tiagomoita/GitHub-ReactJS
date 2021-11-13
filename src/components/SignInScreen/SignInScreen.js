import { Form, Button, FormControl, FormGroup, Card, Spinner } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./SignInScreen.css";
import img from "../../assets/user.png";
import { Context as AuthContext } from "../../context/AuthContext";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state: { error, loading }, signup, signin, authentication, error_message, set_loading } = useContext(AuthContext);


  const saveLoginInformation = ({ history }) => {
    if (email.length >= 8 && password.length >= 8) {
      set_loading(true);

      const user = { email, password, favourites: [], Logged: true };
      const Array = JSON.parse(localStorage.getItem("Data"));
      const u = Array.find(
        (element) =>
          JSON.stringify(element.email) === JSON.stringify(user.email)
      );

      if (u !== undefined) {
        //Sign In
        if (JSON.stringify(u.password) === JSON.stringify(user.password)) {
          setTimeout(() => {
            set_loading(false);
            error_message("");
            signin(user);
            authentication('login');
            history.push({
              pathname: "/home",
              state: { email: user.email },
            });
          }, 2000);
        } else {
          setTimeout(() => {
            set_loading(false);
            error_message("The password for this user is incorrect !");
          }, 2000);
        }
      } else {
        //Sign Up
        setTimeout(() => {
          set_loading(false);
          error_message("");
          signup(user);
          authentication('login');
          history.push({
            pathname: "/home",
            state: { email: user.email },
          });
        }, 2000);
      }
    } else {
      error_message("Email and Password must have more than 8 characters !");
    }
  };

  return (
    <div
      id="signIn"
      className="d-flex justify-content-center min-vh-100 align-items-center"
    >
      <Card className="p-4 justify-content-center">
        <div className="d-flex justify-content-center">
          <img src={img} alt="USer" />
        </div>
        <h1 className="mb-4 mt-4 text-center">Sign In</h1>
        <Form>
          {error ? <p className="errorMessage">{error}</p> : null}
          <FormGroup controlId="formBasicEmail">
            <FormControl
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup controlId="formBasicPassword">
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </FormGroup>

          {loading ? (
            <Button variant="primary" disabled className="position-absolute">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              type="button"
              className="position-absolute"
              onClick={() => {
                saveLoginInformation(props);
              }}
            >
              Sign In
            </Button>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default withRouter(SignInScreen);
