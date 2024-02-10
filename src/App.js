import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import UpdateProfileForm from "./Components/UpdateProfileForm";

function App() {
  const [userEmail, setUserEmail] = useState(null);

  const handleSignIn = (email) => {
    console.log("Signed in with email:", email); // Debugging
    setUserEmail(email);
  };

  const handleSignOut = () => {
    setUserEmail(null);
  };

  console.log("User email:", userEmail); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />{" "}
     
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard/:email"
          element={
            <Dashboard userEmail={userEmail} onSignOut={handleSignOut} />
          }
        />
        <Route
          path="/dashboard/:email/edit"
          element={<UpdateProfileForm userEmail={userEmail} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
