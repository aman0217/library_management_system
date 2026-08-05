import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reports from "../pages/admin/Reports";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import StudentMyBooks from "../pages/student/StudentMyBooks";

/* =========================
   ADMIN PAGES
========================= */

import AdminDashboard from "../pages/admin/AdminDashboard";
import Books from "../pages/admin/Books";
import Users from "../pages/admin/Users";
import Borrow from "../pages/admin/Borrow";
import Profile from "../pages/admin/Profile";
import Notifications from "../pages/admin/Notifications";

/* =========================
   STUDENT PAGES
========================= */

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentBooks from "../pages/student/StudentBooks";
import StudentBorrowHistory from "../pages/student/StudentBorrowHistory";
import StudentNotifications from "../pages/student/StudentNotifications";
import StudentProfile from "../pages/student/StudentProfile";
import StudentFineHistory from "../pages/student/StudentFineHistory";
import StudentReturnedBooks from "../pages/student/StudentReturnedBooks";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    LOGIN
                ========================= */}

                <Route
                    path="/"
                    element={<Login />}
                />

                {/* =========================
                    ADMIN ROUTES
                ========================= */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">

                            <AdminDashboard />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/books"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">

                            <Books />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">

                            <Users />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/borrow"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">

                            <Borrow />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/reports"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">

                            <Reports />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/notifications"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">

                            <Notifications />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/profile"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">

                            <Profile />

                        </ProtectedRoute>
                    }
                />

                {/* =========================
                    STUDENT ROUTES
                ========================= */}

                <Route
    path="/student/dashboard"
    element={
        <ProtectedRoute allowedRole="STUDENT">
            <StudentDashboard />
        </ProtectedRoute>
    }
/>



<Route
    path="/student/history"
    element={
        <ProtectedRoute allowedRole="STUDENT">
            <StudentBorrowHistory />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/notifications"
    element={
        <ProtectedRoute allowedRole="STUDENT">
            <StudentNotifications />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/profile"
    element={
        <ProtectedRoute allowedRole="STUDENT">
            <StudentProfile />
        </ProtectedRoute>
    }
/>
                <Route
                    path="/student/fines"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">

                            <StudentFineHistory />

                        </ProtectedRoute>
                    }
                />
               <Route
    path="/student/books"
    element={
        <ProtectedRoute allowedRole="STUDENT">
            <StudentMyBooks />
        </ProtectedRoute>
    }
/>
<Route
    path="/student/returned-books"
    element={
        <ProtectedRoute allowedRole="STUDENT">
            <StudentReturnedBooks />
        </ProtectedRoute>
    }
/>
            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;