import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {userData ? (
        <div>
          <h2>Welcome, {userData.username}</h2>
          <p>Email: {userData.email}</p>
          <p>Full Name: {userData.full_name}</p>
          <p>Birthdate: {userData.birthdate}</p>
          {/* Render other user data as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
