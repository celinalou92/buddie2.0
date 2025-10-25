import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import { Link, Grid, Button } from "@mui/material";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState('');
  const [login, { loading }] = useMutation(LOGIN_USER);
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
  
      if (data && data.login && data.login.token) {
        Auth.handleLogin(data.login.token);
      } else {
        setFormError('Login failed: no token returned.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setFormError('Invalid email or password.');
    }
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      // marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", 
      // marginTop: theme.spacing(3),
    },
    submit: {
      // margin: theme.spacing(5, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className="credCards">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleChange}
          />
          {formError && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {formError}
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'LOG IN'}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
