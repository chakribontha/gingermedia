import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Container } from "@material-ui/core";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    birthdate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Full Name"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Birthdate"
          id="birthdate"
          name="birthdate"
          type="date"
          value={formData.birthdate}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
      <Typography>
        Already have an account? <Link to="/signin">Sign In</Link>
      </Typography>
    </Container>
  );
};

export default SignUp;
