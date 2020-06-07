import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const api = axios.create({
  baseURL: "https://q3rgtdews6.execute-api.us-east-2.amazonaws.com/default/",
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: "#676767",
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
    textAlign: "center",
  },
  input: {
    width: "90%",
    backgroundColor: "#efefef",
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "90%",
    height: "50px",
    backgroundColor: "#2c84d3",
    color: "#ffffff",
  },
  lostPass: {
    color: "#676767",
    fontWeight: "500",
    fontSize: "18px",
  },
  signUpHere: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: "16px",
    textAlign: "center",
  },
  signUpLink: {
    color: "#ffffff",
  },
  forgetLink: {
    textDecoration: "none",
    color: "#676767",
  },
  error: {
    color: "red",
  },
}));

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();
  let history = useHistory();

  const signIn = async (event) => {
    event.preventDefault();
    const url = "/login?email=" + username + "&password=" + password;
    try {
      const validate = await api.get(url);
      if (validate.data.code !== 200) {
        setError("Username or Password dosen't match");
      } else {
        setError("");
        history.push({
          pathname: "/dashboard",
          state: { loggedIn: true },
        });
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  return (
    <Container maxWidth="xs" fixed>
      <Paper elevation={3} className={classes.paper}>
        <div>
          <h1 className={classes.title}>Login</h1>
          <p className={classes.error}>{error}</p>
        </div>
        <div>
          <form onSubmit={signIn}>
            <div>
              <TextField
                type="email"
                className={classes.input}
                variant="outlined"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                type="password"
                className={classes.input}
                variant="outlined"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              disableElevation
            >
              <b>Sign in</b>
            </Button>
            <p className={classes.lostPass}>
              <a href="/" className={classes.forgetLink}>
                Lost your Password?
              </a>
            </p>
          </form>
        </div>
      </Paper>
      <p className={classes.signUpHere}>
        Not have an account?{" "}
        <a className={classes.signUpLink} href="/">
          Sign up here!
        </a>
      </p>
    </Container>
  );
};

export default Login;
