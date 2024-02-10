import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";

function App() {
  const [userEmail, setUserEmail] = useState(null);

  const handleSignIn = (email) => {
    console.log("Signed in with email:", email); // Debugging
    setUserEmail(email);
  };

  const handleSignOut = () => {
    setUserEmail(null);
  };

  console.log("User email:", userEmail); // Debugging

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard/:email"
          element={
            <Dashboard userEmail={userEmail} onSignOut={handleSignOut} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
