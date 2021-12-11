import { React, useState, Fragment } from "react";

import { Form, Button, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { logInUser } from "../../redux-store/actions/usersActions";

import { Navigate, useLocation } from "react-router-dom";

function LogIn() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  const { state } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser(loginInfo));
  };

  return (
    <Fragment>
      {currentUser.loggedIn && <Navigate to={state ? state.from.pathname : "/"} />}
      <Container className="w-50 pt-5">
        <h1 className="pb-2">Log In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, email: e.target.value })
              }
              value={loginInfo.email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              value={loginInfo.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              onClick={(e) =>
                setLoginInfo({ ...loginInfo, remember: e.target.checked })
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
}

export default LogIn;
