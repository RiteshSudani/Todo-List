// src/components/LoginSignup.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  selectAuthError,
  selectAuthStatus,
} from "../redux/authSlice";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const status = useSelector(selectAuthStatus);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAuth = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Start login process
      dispatch(loginStart());

      try {
        // Retrieve user data from local storage
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (
          storedUser &&
          storedUser.email === email &&
          storedUser.password === password
        ) {
          console.log("Login successful:", storedUser);
          dispatch(loginSuccess({ email }));
        } else {
          throw new Error("Please SignUP First...");
        }
      } catch (err) {
        console.error("Login error:", err);
        dispatch(loginFailure(err.message));
      }
    } else {
      // Validate signup form
      if (!email || !password || !confirmPassword || !name) {
        return dispatch(signupFailure("All fields are required"));
      }
      if (password !== confirmPassword) {
        return dispatch(signupFailure("Passwords do not match"));
      }

      // Start signup process
      dispatch(signupStart());

      try {
        // Simulate an API call for signup
        const response = await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email && password) {
              // Save user data to local storage
              localStorage.setItem(
                "user",
                JSON.stringify({ email, password, name })
              );
              resolve({ email });
            } else {
              reject(new Error("Invalid data"));
            }
          }, 1000);
        });

        console.log("Signup successful:", response);
        dispatch(signupSuccess(response));
        setIsLogin(true); // Automatically switch to login after signup
      } catch (err) {
        console.error("Signup error:", err);
        dispatch(signupFailure(err.message));
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleAuth}
      sx={{
        mt: 4,
        px: 2,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
        {isLogin ? "Login" : "Signup"}
      </Typography>
      {!isLogin && (
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {!isLogin && (
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={status === "loading"}
        sx={{ mb: 2 }}
      >
        {status === "loading"
          ? isLogin
            ? "Logging in..."
            : "Signing up..."
          : isLogin
          ? "Login"
          : "Signup"}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </Typography>
      )}
      <Typography sx={{ mt: 2, textAlign: "center" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign up" : "Log in"}
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginSignup;
