import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const location = useLocation();

    // =========================
    // Not Logged In
    // =========================

    if (!token) {

        return <Navigate to="/" replace />;

    }

    // =========================
    // Admin Routes
    // =========================

    if (

        location.pathname.startsWith("/admin") &&

        role !== "ADMIN" &&

        role !== "LIBRARIAN"

    ) {

        return <Navigate to="/" replace />;

    }

    // =========================
    // Student Routes
    // =========================

    if (

        location.pathname.startsWith("/student") &&

        role !== "STUDENT"

    ) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;