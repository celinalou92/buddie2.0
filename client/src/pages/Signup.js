import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import {
  Container,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
} from "@mui/material";

const Signup = () => {
  const [addUser, { error, loading }] = useMutation(ADD_USER);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      await addUser({
        variables: { ...formState },
      });
      window.location.assign("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="credCardsSignup">
      <div
        style={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form
          style={{
            width: "100%",
            marginTop: "24px",
          }}
          noValidate
          onSubmit={handleFormSubmit}
        >
          <Grid container spacing={2} flexDirection={"column"}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="uname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  margin: "20px 0 16px 0",
                }}
                color="primary"
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              {error && <div>Sign up failed</div>}
              {loading ? (
                <div>
                  {` 
              Loading...
              `}
                </div>
              ) : (
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </form>
        <br />
      </div>
      <CssBaseline />
    </Container>
  );
};

export default Signup;
