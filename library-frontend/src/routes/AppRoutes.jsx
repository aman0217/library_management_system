import { lazy, Suspense } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// =====================================================
// LOGIN
// Keep Login directly loaded
// =====================================================

import Login from "../pages/auth/Login";

// =====================================================
// ADMIN PAGES
// Lazy loaded for faster initial application load
// =====================================================

const AdminDashboard = lazy(
    () => import("../pages/admin/AdminDashboard")
);

const Books = lazy(
    () => import("../pages/admin/Books")
);

const Users = lazy(
    () => import("../pages/admin/Users")
);

const Borrow = lazy(
    () => import("../pages/admin/Borrow")
);

const Reports = lazy(
    () => import("../pages/admin/Reports")
);

const Notifications = lazy(
    () => import("../pages/admin/Notifications")
);

const Profile = lazy(
    () => import("../pages/admin/Profile")
);

// =====================================================
// STUDENT PAGES
// Lazy loaded for faster initial application load
// =====================================================

const StudentDashboard = lazy(
    () => import("../pages/student/StudentDashboard")
);

const StudentMyBooks = lazy(
    () => import("../pages/student/StudentMyBooks")
);

const StudentBorrowHistory = lazy(
    () => import("../pages/student/StudentBorrowHistory")
);

const StudentNotifications = lazy(
    () => import("../pages/student/StudentNotifications")
);

const StudentProfile = lazy(
    () => import("../pages/student/StudentProfile")
);

const StudentFineHistory = lazy(
    () => import("../pages/student/StudentFineHistory")
);

const StudentReturnedBooks = lazy(
    () => import("../pages/student/StudentReturnedBooks")
);

// =====================================================
// PAGE LOADER
// Shown only while a lazy-loaded page is downloading
// =====================================================

function PageLoader() {
    return (
        <div
            style={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 600
            }}
        >
            Loading...
        </div>
    );
}

// =====================================================
// APP ROUTES
// =====================================================

function AppRoutes() {
    return (
        <BrowserRouter>

            <Suspense fallback={<PageLoader />}>

                <Routes>

                    {/* ================================================= */}
                    {/* LOGIN */}
                    {/* ================================================= */}

                    <Route
                        path="/"
                        element={<Login />}
                    />


                    {/* ================================================= */}
                    {/* ADMIN ROUTES */}
                    {/* ================================================= */}

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


                    {/* ================================================= */}
                    {/* STUDENT ROUTES */}
                    {/* ================================================= */}

                    <Route
                        path="/student/dashboard"
                        element={
                            <ProtectedRoute allowedRole="STUDENT">
                                <StudentDashboard />
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
                        path="/student/returned-books"
                        element={
                            <ProtectedRoute allowedRole="STUDENT">
                                <StudentReturnedBooks />
                            </ProtectedRoute>
                        }
                    />

                </Routes>

            </Suspense>

        </BrowserRouter>
    );
}

export default AppRoutes;