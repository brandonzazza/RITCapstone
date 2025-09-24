import { Navigate } from "react-router-dom";
// Import Auth here

function ProtectedRoute({ children }) {
  // If user is not logged in, redirect to login page. Defaulted false for testing
  if (false) {
    return <Navigate to="/login" replace />;
  }

  // Else render the protected component
  return children;
}

export default ProtectedRoute;
