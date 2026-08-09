import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const location = useLocation();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // =====================================================
    // NOT LOGGED IN
    // =====================================================

    if (!token) {

        return (
            <Navigate
                to="/"
                replace
                state={{
                    from: location
                }}
            />
        );

    }

    // =====================================================
    // ROLE CHECK
    // =====================================================

    if (allowedRole === "ADMIN") {

        /*
         * ADMIN routes are accessible by:
         *
         * ADMIN
         * LIBRARIAN
         */

        if (
            role !== "ADMIN" &&
            role !== "LIBRARIAN"
        ) {

            return (
                <Navigate
                    to="/"
                    replace
                />
            );

        }

    }

    // =====================================================
    // STUDENT CHECK
    // =====================================================

    if (allowedRole === "STUDENT") {

        if (role !== "STUDENT") {

            return (
                <Navigate
                    to="/"
                    replace
                />
            );

        }

    }

    // =====================================================
    // AUTHENTICATED + AUTHORIZED
    // =====================================================

    return children;
}

export default ProtectedRoute;