import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);
  const backendURL = "http://localhost:5000/api/auth/verify"; // change for AWS later

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await fetch(backendURL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("User verified:", data.user);
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
          setIsValid(false);
        }
      } catch (err) {
        console.error("Error verifying token:", err);
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) return <p>Loading...</p>;
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
