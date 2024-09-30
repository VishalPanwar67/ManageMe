import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import checkAuth from "../utils/auth.js";

const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null means checking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const loggedIn = await checkAuth(); // Call the async checkAuth function
      setIsLoggedIn(loggedIn);
      setLoading(false);
    };

    verifyUser();
  });
  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
