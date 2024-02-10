import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
} from "@material-ui/core";

const Dashboard = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/dashboard/${email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  const handleLogout = () => {
    navigate("/signin");
  };

  const handleEditField = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleSaveField = (fieldName) => {
    // Save changes to the backend for the specific field
    setEditingField(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="sm">
      {userData ? (
        <Box mt={4}>
          <Typography variant="h4">Welcome, {userData.username}</Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>
          <Typography variant="body1">
            Full Name:{" "}
            {editingField === "full_name" ? (
              <>
                <TextField
                  variant="outlined"
                  size="small"
                  name="full_name"
                  value={userData.full_name}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveField("full_name")}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                {userData.full_name}{" "}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditField("full_name")}
                >
                  Edit
                </Button>
              </>
            )}
          </Typography>
          <Typography variant="body1">
            Birthdate:{" "}
            {editingField === "birthdate" ? (
              <>
                <TextField
                  variant="outlined"
                  size="small"
                  name="birthdate"
                  type="date"
                  value={userData.birthdate}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveField("birthdate")}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                {userData.birthdate}{" "}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditField("birthdate")}
                >
                  Edit
                </Button>
              </>
            )}
          </Typography>
          {/* Render other user data as needed */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">Loading user data...</Typography>
      )}
    </Container>
  );
};

export default Dashboard;
