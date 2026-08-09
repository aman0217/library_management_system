import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Avatar,
    Stack,
    Chip,
    Button,
    LinearProgress
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PaidIcon from "@mui/icons-material/Paid";
import NotificationsIcon from "@mui/icons-material/Notifications";

import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";

import {
    getStudentDashboard,
    getDueSoonBooks
} from "../../services/dashboardService";

import { getCurrentUser } from "../../services/userService";


function StudentDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [user, setUser] = useState(null);
    const [dueSoonBooks, setDueSoonBooks] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            // -----------------------------
            // 1. Current User
            // -----------------------------

            const userData = await getCurrentUser();

            console.log("Current User =", userData);

            if (!userData) {

                console.error("User is null");

                return;

            }


            setUser(userData);


            // -----------------------------
            // 2. Dashboard Stats
            // -----------------------------

            const dashboardData =
                await getStudentDashboard(userData.id);

            console.log(
                "Student Dashboard =",
                dashboardData
            );

            setStats(dashboardData);


            // -----------------------------
            // 3. Due Soon Books
            // -----------------------------

            const dueSoon =
                await getDueSoonBooks(userData.id);

            console.log(
                "Due Soon Books =",
                dueSoon
            );

            setDueSoonBooks(dueSoon || []);

        }

        catch (error) {

            console.error(
                "Dashboard loading error =",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ----------------------------------
    // Today's Date
    // ----------------------------------

    const today = new Date().toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


    // ----------------------------------
    // Due Soon Chip Color
    // ----------------------------------

    const getChipColor = (days) => {

        if (days <= 1) return "error";

        if (days <= 2) return "warning";

        if (days <= 4) return "info";

        return "success";

    };


    // ----------------------------------
    // Progress
    // ----------------------------------

    const getProgressValue = (days) => {

        if (days <= 1) return 100;

        if (days <= 2) return 80;

        if (days <= 4) return 60;

        return 35;

    };


    // ----------------------------------
    // Loading
    // ----------------------------------

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        width: "100%",
                        minHeight: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <CircularProgress />

                </Box>

            </StudentDashboardLayout>

        );

    }


    // ----------------------------------
    // Safety check
    // ----------------------------------

    if (!stats || !user) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        width: "100%",
                        minHeight: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        px: 2
                    }}
                >

                    <Typography
                        color="error"
                        textAlign="center"
                    >
                        Unable to load dashboard data.
                    </Typography>

                </Box>

            </StudentDashboardLayout>

        );

    }


    return (

        <StudentDashboardLayout>

            {/* ================================================= */}
            {/* MAIN PAGE CONTAINER */}
            {/* ================================================= */}

            <Box
                sx={{
                    width: "100%",
                    minWidth: 0,
                    boxSizing: "border-box",
                    pb: {
                        xs: 3,
                        sm: 4,
                        md: 5
                    }
                }}
            >


                {/* ================================================= */}
                {/* WELCOME HERO */}
                {/* ================================================= */}

                <Card
                    sx={{
                        mb: {
                            xs: 2.5,
                            sm: 3,
                            md: 4
                        },

                        borderRadius: {
                            xs: 3,
                            sm: 4,
                            md: 5
                        },

                        overflow: "hidden",

                        background:
                            "linear-gradient(135deg,#1565C0,#512DA8)",

                        color: "#fff",

                        boxShadow: {
                            xs: 3,
                            sm: 5,
                            md: 8
                        }
                    }}
                >

                    <CardContent
                        sx={{
                            p: {
                                xs: 2.5,
                                sm: 3.5,
                                md: 5
                            },

                            "&:last-child": {
                                pb: {
                                    xs: 2.5,
                                    sm: 3.5,
                                    md: 5
                                }
                            }
                        }}
                    >

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}

                            spacing={{
                                xs: 3,
                                sm: 2,
                                md: 4
                            }}

                            justifyContent="space-between"

                            alignItems={{
                                xs: "flex-start",
                                sm: "center"
                            }}

                            sx={{
                                width: "100%"
                            }}
                        >


                            {/* LEFT SIDE */}

                            <Box
                                sx={{
                                    flex: 1,
                                    minWidth: 0,
                                    width: "100%"
                                }}
                            >

                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.8rem",
                                            sm: "2.2rem",
                                            md: "3rem"
                                        },

                                        lineHeight: 1.2
                                    }}
                                >
                                    Welcome Back 👋
                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 1,

                                        fontSize: {
                                            xs: "1.15rem",
                                            sm: "1.35rem",
                                            md: "1.5rem"
                                        },

                                        fontWeight: 600,

                                        wordBreak: "break-word"
                                    }}
                                >

                                    {user.firstName}{" "}
                                    {user.lastName}

                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 1.5,

                                        opacity: 0.9,

                                        fontSize: {
                                            xs: "0.9rem",
                                            sm: "1rem"
                                        }
                                    }}
                                >

                                    Keep learning and enjoy reading.

                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 0.7,

                                        opacity: 0.85,

                                        fontSize: {
                                            xs: "0.82rem",
                                            sm: "0.95rem"
                                        }
                                    }}
                                >

                                    {today}

                                </Typography>


                                <Chip
                                    label="Library Membership Active"
                                    color="success"

                                    sx={{
                                        mt: 2.5,

                                        fontWeight: "bold",

                                        maxWidth: "100%"
                                    }}
                                />

                            </Box>


                            {/* RIGHT AVATAR */}

                            <Box
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: 150,
                                        md: 180
                                    },

                                    flexShrink: 0,

                                    display: "flex",

                                    justifyContent: {
                                        xs: "center",
                                        sm: "center"
                                    },

                                    alignItems: "center"
                                }}
                            >

                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 90,
                                            sm: 110,
                                            md: 130
                                        },

                                        height: {
                                            xs: 90,
                                            sm: 110,
                                            md: 130
                                        },

                                        fontSize: {
                                            xs: 36,
                                            sm: 44,
                                            md: 52
                                        },

                                        fontWeight: "bold",

                                        bgcolor: "#fff",

                                        color: "#1565C0",

                                        boxShadow:
                                            "0 12px 35px rgba(0,0,0,.35)",

                                        border:
                                            "5px solid rgba(255,255,255,.45)",

                                        transition: ".35s",

                                        "&:hover": {
                                            transform:
                                                "scale(1.08) rotate(5deg)"
                                        }
                                    }}
                                >

                                    {(
                                        stats.firstName ||
                                        user.firstName ||
                                        "S"
                                    )
                                        .charAt(0)
                                        .toUpperCase()}

                                </Avatar>

                            </Box>

                        </Stack>

                    </CardContent>

                </Card>



                {/* ================================================= */}
                {/* DUE SOON SECTION */}
                {/* ================================================= */}

                <Card
                    sx={{
                        mb: {
                            xs: 2.5,
                            sm: 3,
                            md: 4
                        },

                        borderRadius: {
                            xs: 3,
                            sm: 4,
                            md: 5
                        },

                        overflow: "hidden",

                        boxShadow: {
                            xs: 2,
                            sm: 4,
                            md: 6
                        }
                    }}
                >

                    {/* HEADER */}

                    <Box
                        sx={{
                            background:
                                "linear-gradient(135deg,#ff9800,#ff5722)",

                            color: "#fff",

                            p: {
                                xs: 2,
                                sm: 2.5,
                                md: 3
                            },

                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                sm: "row"
                            },

                            gap: {
                                xs: 2,
                                sm: 1
                            },

                            justifyContent: "space-between",

                            alignItems: {
                                xs: "flex-start",
                                sm: "center"
                            }
                        }}
                    >


                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                minWidth: 0
                            }}
                        >

                            <WarningAmberIcon
                                sx={{
                                    mr: 1,
                                    fontSize: {
                                        xs: 28,
                                        sm: 32
                                    },

                                    flexShrink: 0
                                }}
                            />

                            <Box
                                sx={{
                                    minWidth: 0
                                }}
                            >

                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.15rem",
                                            sm: "1.35rem"
                                        }
                                    }}
                                >

                                    Due Soon Alerts

                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "0.8rem",
                                            sm: "0.9rem"
                                        },

                                        opacity: 0.9
                                    }}
                                >

                                    Return these books before due date

                                </Typography>

                            </Box>

                        </Box>


                        <Button
                            variant="contained"
                            color="success"
                            size="medium"

                            onClick={() =>
                                navigate("/student/books")
                            }

                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                },

                                fontWeight: "bold",

                                borderRadius: 3,

                                px: 3,

                                textTransform: "none",

                                boxShadow: 3,

                                "&:hover": {
                                    boxShadow: 6
                                }
                            }}
                        >

                            View All

                        </Button>

                    </Box>



                    {/* DUE BOOKS */}

                    <Box
                        sx={{
                            p: {
                                xs: 1.5,
                                sm: 2.5,
                                md: 3
                            }
                        }}
                    >

                        {dueSoonBooks.length === 0 ? (

                            <Box
                                sx={{
                                    textAlign: "center",
                                    py: {
                                        xs: 4,
                                        sm: 5
                                    }
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "2rem",
                                            sm: "2.5rem"
                                        }
                                    }}
                                >
                                    🎉
                                </Typography>

                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    mt={2}
                                    sx={{
                                        fontSize: {
                                            xs: "1.2rem",
                                            sm: "1.5rem"
                                        }
                                    }}
                                >

                                    Great!

                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    mt={1}
                                >

                                    No books are due soon.

                                </Typography>

                            </Box>

                        ) : (

                            dueSoonBooks.map((book) => (

                                <Card
                                    key={book.issueId}

                                    sx={{
                                        mb: 2,

                                        borderRadius: {
                                            xs: 2.5,
                                            sm: 3
                                        },

                                        boxShadow: 2,

                                        transition: ".3s",

                                        "&:last-child": {
                                            mb: 0
                                        },

                                        "&:hover": {
                                            transform: {
                                                xs: "none",
                                                sm: "scale(1.01)"
                                            }
                                        }
                                    }}
                                >

                                    <CardContent
                                        sx={{
                                            p: {
                                                xs: 2,
                                                sm: 2.5
                                            },

                                            "&:last-child": {
                                                pb: {
                                                    xs: 2,
                                                    sm: 2.5
                                                }
                                            }
                                        }}
                                    >

                                        {/* BOOK TOP */}

                                        <Box
                                            sx={{
                                                display: "flex",

                                                flexDirection: {
                                                    xs: "column",
                                                    sm: "row"
                                                },

                                                gap: {
                                                    xs: 2,
                                                    sm: 1.5
                                                },

                                                justifyContent:
                                                    "space-between",

                                                alignItems: {
                                                    xs: "flex-start",
                                                    sm: "center"
                                                }
                                            }}
                                        >


                                            {/* BOOK INFO */}

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    minWidth: 0,
                                                    width: {
                                                        xs: "100%",
                                                        sm: "auto"
                                                    }
                                                }}
                                            >

                                                <Avatar
                                                    sx={{
                                                        mr: 1.5,

                                                        bgcolor:
                                                            "#1976d2",

                                                        flexShrink: 0
                                                    }}
                                                >

                                                    <MenuBookIcon />

                                                </Avatar>


                                                <Box
                                                    sx={{
                                                        minWidth: 0
                                                    }}
                                                >

                                                    <Typography
                                                        fontWeight="bold"
                                                        sx={{
                                                            fontSize: {
                                                                xs: "0.95rem",
                                                                sm: "1rem"
                                                            },

                                                            overflow:
                                                                "hidden",

                                                            textOverflow:
                                                                "ellipsis",

                                                            whiteSpace:
                                                                {
                                                                    xs:
                                                                        "normal",
                                                                    sm:
                                                                        "nowrap"
                                                                },

                                                            wordBreak:
                                                                "break-word"
                                                        }}
                                                    >

                                                        {book.booktitle}

                                                    </Typography>


                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            mt: 0.5
                                                        }}
                                                    >

                                                        Due:{" "}
                                                        {book.dueDate}

                                                    </Typography>

                                                </Box>

                                            </Box>


                                            {/* DAYS CHIP */}

                                            <Chip
                                                label={`${book.remainingDays} Days Left`}

                                                color={
                                                    getChipColor(
                                                        book.remainingDays
                                                    )
                                                }

                                                sx={{
                                                    fontWeight: "bold",

                                                    alignSelf: {
                                                        xs: "flex-start",
                                                        sm: "center"
                                                    }
                                                }}
                                            />

                                        </Box>



                                        {/* PROGRESS */}

                                        <LinearProgress
                                            variant="determinate"

                                            value={
                                                getProgressValue(
                                                    book.remainingDays
                                                )
                                            }

                                            color={
                                                getChipColor(
                                                    book.remainingDays
                                                )
                                            }

                                            sx={{
                                                mt: 2,

                                                height: 8,

                                                borderRadius: 5
                                            }}
                                        />


                                        {/* RETURN BUTTON */}

                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: {
                                                    xs: "stretch",
                                                    sm: "flex-end"
                                                },

                                                mt: 2
                                            }}
                                        >

                                            <Button
                                                variant="outlined"
                                                size="small"

                                                startIcon={
                                                    <AssignmentReturnIcon />
                                                }

                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        sm: "auto"
                                                    },

                                                    borderRadius: 2,

                                                    textTransform: "none"
                                                }}
                                            >

                                                Return Now

                                            </Button>

                                        </Box>

                                    </CardContent>

                                </Card>

                            ))

                        )}

                    </Box>

                </Card>



                {/* ================================================= */}
                {/* STATISTICS CARDS */}
                {/* ================================================= */}

                <Grid
                    container
                    spacing={{
                        xs: 2,
                        sm: 2.5,
                        md: 3
                    }}

                    sx={{
                        width: "100%",
                        m: 0
                    }}
                >


                    {/* BORROWED */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}
                    >

                        <Card
                            onClick={() =>
                                navigate("/student/books")
                            }

                            sx={{
                                height: {
                                    xs: 220,
                                    sm: 250,
                                    md: 270
                                },

                                borderRadius: 5,

                                background:
                                    "linear-gradient(135deg,#42A5F5,#1E88E5)",

                                color: "#fff",

                                position: "relative",

                                overflow: "hidden",

                                cursor: "pointer",

                                transition: ".35s",

                                "&:hover": {
                                    transform: {
                                        xs: "none",
                                        sm: "translateY(-10px) scale(1.02)"
                                    },

                                    boxShadow:
                                        "0 20px 40px rgba(0,0,0,.25)"
                                }
                            }}
                        >

                            <Box
                                sx={{
                                    position: "absolute",

                                    right: -25,

                                    top: -25,

                                    width: 120,

                                    height: 120,

                                    borderRadius: "50%",

                                    background:
                                        "rgba(255,255,255,.15)"
                                }}
                            />


                            <CardContent
                                sx={{
                                    height: "100%",

                                    display: "flex",

                                    flexDirection: "column",

                                    p: {
                                        xs: 2.5,
                                        sm: 3
                                    },

                                    "&:last-child": {
                                        pb: {
                                            xs: 2.5,
                                            sm: 3
                                        }
                                    }
                                }}
                            >

                                <MenuBookIcon
                                    sx={{
                                        fontSize: {
                                            xs: 40,
                                            sm: 50
                                        }
                                    }}
                                />


                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{
                                        mt: 1,

                                        fontSize: {
                                            xs: "2.4rem",
                                            sm: "2.8rem",
                                            md: "3rem"
                                        }
                                    }}
                                >

                                    {stats.borrowedBooks}

                                </Typography>


                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.1rem"
                                        }
                                    }}
                                >

                                    Borrowed Books

                                </Typography>


                                <Box sx={{ flexGrow: 1 }} />


                                <Button
                                    variant="contained"

                                    endIcon={
                                        <ArrowForwardIcon />
                                    }

                                    onClick={(e) => {

                                        e.stopPropagation();

                                        navigate(
                                            "/student/books"
                                        );

                                    }}

                                    sx={{
                                        alignSelf: "flex-start",

                                        bgcolor: "#fff",

                                        color: "#1976d2",

                                        fontWeight: "bold",

                                        borderRadius: 3,

                                        px: 2.5,

                                        textTransform: "none",

                                        "&:hover": {
                                            bgcolor: "#f5f5f5"
                                        }
                                    }}
                                >

                                    View Details

                                </Button>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* RETURNED */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}
                    >

                        <Card
                            onClick={() =>
                                navigate(
                                    "/student/returned-books"
                                )
                            }

                            sx={{
                                height: {
                                    xs: 220,
                                    sm: 250,
                                    md: 270
                                },

                                borderRadius: 5,

                                background:
                                    "linear-gradient(135deg,#66BB6A,#2E7D32)",

                                color: "#fff",

                                cursor: "pointer",

                                transition: ".35s",

                                "&:hover": {
                                    transform: {
                                        xs: "none",
                                        sm: "translateY(-10px) scale(1.02)"
                                    },

                                    boxShadow:
                                        "0 20px 40px rgba(0,0,0,.25)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    height: "100%",

                                    display: "flex",

                                    flexDirection: "column",

                                    p: {
                                        xs: 2.5,
                                        sm: 3
                                    }
                                }}
                            >

                                <CheckCircleIcon
                                    sx={{
                                        fontSize: {
                                            xs: 40,
                                            sm: 50
                                        }
                                    }}
                                />


                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{
                                        mt: 1,

                                        fontSize: {
                                            xs: "2.4rem",
                                            sm: "2.8rem",
                                            md: "3rem"
                                        }
                                    }}
                                >

                                    {stats.returnedBooks}

                                </Typography>


                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.1rem"
                                        }
                                    }}
                                >

                                    Returned Books

                                </Typography>


                                <Box sx={{ flexGrow: 1 }} />


                                <Button
                                    variant="contained"

                                    endIcon={
                                        <ArrowForwardIcon />
                                    }

                                    onClick={(e) => {

                                        e.stopPropagation();

                                        navigate(
                                            "/student/returned-books"
                                        );

                                    }}

                                    sx={{
                                        alignSelf: "flex-start",

                                        bgcolor: "#fff",

                                        color: "#2E7D32",

                                        fontWeight: "bold",

                                        borderRadius: 3,

                                        px: 2.5,

                                        textTransform: "none",

                                        "&:hover": {
                                            bgcolor: "#f5f5f5"
                                        }
                                    }}
                                >

                                    View History

                                </Button>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* FINE */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}
                    >

                        <Card
                            sx={{
                                height: {
                                    xs: 220,
                                    sm: 250,
                                    md: 270
                                },

                                borderRadius: 5,

                                overflow: "hidden",

                                position: "relative",

                                background:
                                    "linear-gradient(135deg,#EF5350,#C62828)",

                                color: "#fff",

                                transition: ".35s",

                                "&:hover": {
                                    transform: {
                                        xs: "none",
                                        sm: "translateY(-8px) scale(1.02)"
                                    },

                                    boxShadow:
                                        "0 20px 35px rgba(0,0,0,.25)"
                                }
                            }}
                        >

                            <Box
                                sx={{
                                    position: "absolute",

                                    right: -25,

                                    top: -25,

                                    width: 110,

                                    height: 110,

                                    borderRadius: "50%",

                                    bgcolor:
                                        "rgba(255,255,255,.15)"
                                }}
                            />


                            <CardContent
                                sx={{
                                    height: "100%",

                                    display: "flex",

                                    flexDirection: "column",

                                    p: {
                                        xs: 2.5,
                                        sm: 3
                                    }
                                }}
                            >

                                <PaidIcon
                                    sx={{
                                        fontSize: {
                                            xs: 40,
                                            sm: 50
                                        }
                                    }}
                                />


                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{
                                        mt: 1,

                                        fontSize: {
                                            xs: "2rem",
                                            sm: "2.5rem",
                                            md: "2.8rem"
                                        },

                                        wordBreak: "break-word"
                                    }}
                                >

                                    ₹ {stats.pendingFine}

                                </Typography>


                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.1rem"
                                        }
                                    }}
                                >

                                    Pending Fine

                                </Typography>


                                <Typography
                                    variant="body2"
                                    sx={{
                                        opacity: 0.75,
                                        mt: 1
                                    }}
                                >

                                    Please clear your dues.

                                </Typography>


                                <Box
                                    sx={{
                                        flexGrow: 1
                                    }}
                                />


                                <Button
                                    variant="contained"

                                    sx={{
                                        alignSelf: "flex-start",

                                        bgcolor: "#fff",

                                        color: "#C62828",

                                        fontWeight: "bold",

                                        borderRadius: 3,

                                        px: 2.5,

                                        textTransform: "none",

                                        "&:hover": {
                                            bgcolor: "#f5f5f5"
                                        }
                                    }}
                                >

                                    Pay Now

                                </Button>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* NOTIFICATIONS */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}
                    >

                        <Card
                            sx={{
                                height: {
                                    xs: 220,
                                    sm: 250,
                                    md: 270
                                },

                                borderRadius: 5,

                                background:
                                    "linear-gradient(135deg,#F59E0B,#F97316)",

                                color: "#fff",

                                overflow: "hidden",

                                position: "relative",

                                transition: ".35s",

                                "&:hover": {
                                    transform: {
                                        xs: "none",
                                        sm: "translateY(-8px) scale(1.03)"
                                    },

                                    boxShadow:
                                        "0 20px 40px rgba(0,0,0,.25)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    height: "100%",

                                    display: "flex",

                                    flexDirection: "column",

                                    p: {
                                        xs: 2.5,
                                        sm: 3
                                    }
                                }}
                            >

                                <Box
                                    sx={{
                                        width: {
                                            xs: 55,
                                            sm: 65
                                        },

                                        height: {
                                            xs: 55,
                                            sm: 65
                                        },

                                        borderRadius: "50%",

                                        bgcolor:
                                            "rgba(255,255,255,.18)",

                                        display: "flex",

                                        alignItems: "center",

                                        justifyContent: "center"
                                    }}
                                >

                                    <NotificationsIcon
                                        sx={{
                                            fontSize: {
                                                xs: 32,
                                                sm: 38
                                            }
                                        }}
                                    />

                                </Box>


                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{
                                        mt: 1.5,

                                        fontSize: {
                                            xs: "2.4rem",
                                            sm: "2.8rem",
                                            md: "3rem"
                                        }
                                    }}
                                >

                                    {stats.unreadNotifications}

                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 1,

                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.05rem"
                                        },

                                        fontWeight: 500
                                    }}
                                >

                                    Unread Notifications

                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 1,

                                        opacity: 0.9,

                                        fontSize: {
                                            xs: "0.82rem",
                                            sm: "0.9rem"
                                        }
                                    }}
                                >

                                    Latest activity waiting for you

                                </Typography>


                                <Box
                                    sx={{
                                        flexGrow: 1
                                    }}
                                />


                                <Button
                                    variant="contained"

                                    endIcon={
                                        <ArrowForwardIcon />
                                    }

                                    onClick={() => {

                                        navigate(
                                            "/student/notifications"
                                        );

                                    }}

                                    sx={{
                                        alignSelf: "flex-start",

                                        bgcolor: "#fff",

                                        color: "#F57C00",

                                        fontWeight: "bold",

                                        borderRadius: 3,

                                        px: 2.5,

                                        textTransform: "none",

                                        "&:hover": {
                                            bgcolor: "#f5f5f5"
                                        }
                                    }}
                                >

                                    Open

                                </Button>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

            </Box>

        </StudentDashboardLayout>

    );

}


export default StudentDashboard;