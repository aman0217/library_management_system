import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { getCurrentUser } from "../../services/userService";
import DashboardLayout from "../../components/layout/DashboardLayout";

import { getDashboardSummary } from "../../services/dashboardService";

import {
    Grid,
    Paper,
    Typography,
    Box,
    Chip,
    CircularProgress
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PaidIcon from "@mui/icons-material/Paid";
import MonthlyBorrowChart from "../../components/dashboard/MonthlyBorrowChart";
import MostBorrowedBooks from "../../components/dashboard/MostBorrowedBooks";
import TopActiveStudents from "../../components/dashboard/TopActiveStudents";
import NeverBorrowedBooks from "../../components/dashboard/NeverBorrowedBooks";

function StatCard({
    title,
    value,
    icon,
    color
}) {

    return (

        <Paper
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 5,
                background: `${color}09`,
                position: "relative",
                overflow: "hidden",
                transition: ".35s",
                border: "1px solid #ECEFF1",
                boxShadow: "0 10px 25px rgba(0,0,0,.06)",

                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,.15)"
                }
            }}
        >

            {/* Top Colored Line */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 7,
                    bgcolor: color
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2
                }}
            >

                <Box
                    sx={{
                        minWidth: 0,
                        flex: 1
                    }}
                >

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#607D8B",
                            fontWeight: 600,
                            letterSpacing: .5,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            mt: 1,
                            color: "#263238",
                            fontSize: {
                                xs: "2rem",
                                sm: "2.5rem",
                                md: "3rem"
                            }
                        }}
                    >
                        {value}
                    </Typography>

                </Box>

                <Avatar
                    sx={{
                        width: {
                            xs: 52,
                            sm: 60,
                            md: 70
                        },
                        height: {
                            xs: 52,
                            sm: 60,
                            md: 70
                        },
                        flexShrink: 0,
                        bgcolor: `${color}20`,
                        color: color,
                        border: `2px solid ${color}`
                    }}
                >

                    <Box
                        sx={{
                            fontSize: {
                                xs: 25,
                                sm: 30,
                                md: 34
                            }
                        }}
                    >
                        {icon}
                    </Box>

                </Avatar>

            </Box>

        </Paper>

    );
}

function AdminDashboard() {

    const [summary, setSummary] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardSummary();

            setSummary(data);
            const user = await getCurrentUser();

            setCurrentUser(user);
        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    if (!summary) {

        return (

            <DashboardLayout>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 10
                    }}
                >

                    <CircularProgress />

                </Box>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

             {/* Welcome Card */}
<Paper
    elevation={0}
    sx={{
        mb: 4,
        p: {
            xs: 2.5,
            sm: 3,
            md: 4
        },
        borderRadius: 4,
        background:
            "linear-gradient(135deg,#1565C0,#512DA8)",
        color: "white"
    }}
>

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: {
            xs: "flex-start",
            sm: "center"
        },
        flexDirection: {
            xs: "column-reverse",
            sm: "row"
        },
        gap: {
            xs: 2,
            sm: 3
        }
    }}
>

        <Box>

          <Typography
    variant="h5"
    fontWeight="bold"
    sx={{
        fontSize: {
            xs: "1.8rem",
            sm: "2.3rem",
            md: "3.1rem"
        },
        lineHeight: 1.15
    }}
>
                Welcome Back 👋
            </Typography>

            <Typography
    variant="h3"
    fontWeight="bold"
    mt={1}
    sx={{
        fontSize: {
            xs: "1.5rem",
            sm: "1.8rem",
            md: "1.9rem"
        },
        mb: 3,
        lineHeight: 1.2,
        wordBreak: "break-word"
    }}
>
                {currentUser?.firstName} {currentUser?.lastName}
            </Typography>

            <Typography
                sx={{
                    mt: 1,
                    opacity: .85
                }}
            >
                {new Date().toLocaleDateString("en-IN", {

                    weekday: "long",

                    day: "numeric",

                    month: "long",

                    year: "numeric"

                })}
            </Typography>
 <Typography
    sx={{
        mt: 1,
        opacity: .9,
        fontSize: {
            xs: 14,
            sm: 15,
            md: 17
        },
        lineHeight: 1.6
    }}
>
            Manage books, users, borrow requests and reports from one place.

        </Typography>
        </Box>

     <Avatar
    sx={{
        width: {
            xs: 80,
            sm: 110,
            md: 140
        },
        height: {
            xs: 80,
            sm: 110,
            md: 140
        },
        fontSize: {
            xs: 32,
            sm: 44,
            md: 55
        },
        mr: {
            xs: 0,
            sm: 3,
            md: 7
        },
        bgcolor: "rgba(18, 163, 220, 0.18)",
        border: {
            xs: "3px solid #e7e5f1",
            sm: "4px solid #e7e5f1",
            md: "5px solid #e7e5f1"
        },
        boxShadow: "0 0 25px rgba(100,181,246,.55)"
    }}
>
    {currentUser?.firstName?.charAt(0)}

</Avatar>

    </Box>

</Paper>

    {/* Statistics */}

    <Grid
    container
    spacing={{ xs: 2, sm: 3 }}
>

                <Grid size={{ xs: 12, md: 4 }}>

                    <StatCard
                        title="Total Books"
                        value={summary.totalBooks}
                        icon={<MenuBookIcon fontSize="inherit" />}
                        color="#1976d2"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <StatCard
                        title="Total Users"
                        value={summary.totalUsers}
                        icon={<PeopleIcon fontSize="inherit" />}
                        color="#2e7d32"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <StatCard
                        title="Borrowed Books"
                        value={summary.borrowedBooks}
                        icon={<AssignmentReturnedIcon fontSize="inherit" />}
                        color="#ed6c02"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <StatCard
                        title="Available Books"
                        value={summary.availableBooks}
                        icon={<LibraryBooksIcon fontSize="inherit" />}
                        color="#0288d1"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <StatCard
                        title="Overdue Books"
                        value={summary.overdueBooks}
                        icon={<WarningAmberIcon fontSize="inherit" />}
                        color="#d32f2f"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <StatCard
                        title="Fine Collected"
                        value={`₹ ${summary.totalFineCollected}`}
                        icon={<PaidIcon fontSize="inherit" />}
                        color="#9c27b0"
                    />

                </Grid>

        </Grid>
        <Grid container spacing={3} sx={{ mt: 2 }}>

    <Grid size={{ xs: 12 }}>

        <MonthlyBorrowChart />

    </Grid>

    <Grid size={{ xs: 12 }}>

        <MostBorrowedBooks />

    </Grid>

    <Grid size={{ xs: 12 }}>

        <TopActiveStudents />

    </Grid>

    <Grid size={{ xs: 12 }}>

        <NeverBorrowedBooks />

    </Grid>

</Grid>

        </DashboardLayout>

    );

}

export default AdminDashboard;