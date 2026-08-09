import { useEffect, useState } from "react";

import MarkunreadIcon from "@mui/icons-material/Markunread";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TodayIcon from "@mui/icons-material/Today";
import SearchIcon from "@mui/icons-material/Search";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import {
    Card,
    CardContent,
    Grid,
    Avatar,
    TextField,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Chip,
    IconButton,
    Box,
    Typography,
    Button,
    Stack,
    CircularProgress
} from "@mui/material";

import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";

import {
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    getNotifications
} from "../../services/notificationService";

import { getCurrentUser } from "../../services/userService";

function Notifications() {

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);

    const [filteredNotifications, setFilteredNotifications] =
        useState([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");


    /* =========================
       LOAD NOTIFICATIONS
    ========================= */

    useEffect(() => {

        loadNotifications();

    }, []);


    /* =========================
       APPLY FILTERS
    ========================= */

    useEffect(() => {

        applyFilters(search, filter);

    }, [notifications, search, filter]);


    const loadNotifications = async () => {

        try {

            setLoading(true);

            const user = await getCurrentUser();

            const data = await getNotifications(user.id);

            console.log("Notifications =", data);

            setNotifications(data || []);

        }

        catch (error) {

            console.error(
                "Unable to load notifications:",
                error
            );

            setNotifications([]);

        }

        finally {

            setLoading(false);

        }

    };


    /* =========================
       FILTER LOGIC
    ========================= */

    const applyFilters = (searchValue, filterValue) => {

        let data = [...notifications];


        if (filterValue === "UNREAD") {

            data = data.filter(
                notification => !notification.read
            );

        }


        if (filterValue === "READ") {

            data = data.filter(
                notification => notification.read
            );

        }


        if (searchValue.trim() !== "") {

            const searchText =
                searchValue.toLowerCase().trim();

            data = data.filter(notification =>

                notification.title
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                notification.message
                    ?.toLowerCase()
                    .includes(searchText)

            );

        }


        setFilteredNotifications(data);

    };


    /* =========================
       STATISTICS
    ========================= */

    const unreadNotifications =
        notifications.filter(
            notification => !notification.read
        ).length;


    const readNotifications =
        notifications.filter(
            notification => notification.read
        ).length;


    const todayNotifications =
        notifications.filter(notification => {

            if (!notification.createdAt) {
                return false;
            }

            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];

            return notification.createdAt.startsWith(today);

        }).length;


    /* =========================
       SEARCH
    ========================= */

    const handleSearch = (value) => {

        setSearch(value);

    };


    /* =========================
       FILTER
    ========================= */

    const handleFilter = (_, value) => {

        if (!value) {
            return;
        }

        setFilter(value);

    };


    /* =========================
       MARK SINGLE AS READ
    ========================= */

    const handleMarkAsRead = async (notificationId) => {

        try {

            await markAsRead(notificationId);

            await loadNotifications();

        }

        catch (error) {

            console.error(
                "Unable to mark notification as read:",
                error
            );

        }

    };


    /* =========================
       MARK ALL AS READ
    ========================= */

    const handleMarkAllRead = async () => {

        try {

            const user = await getCurrentUser();

            await markAllAsRead(user.id);

            await loadNotifications();

        }

        catch (error) {

            console.error(
                "Unable to mark all notifications:",
                error
            );

        }

    };


    /* =========================
       DELETE SINGLE
    ========================= */

    const handleDelete = async (notificationId) => {

        try {

            await deleteNotification(notificationId);

            await loadNotifications();

        }

        catch (error) {

            console.error(
                "Unable to delete notification:",
                error
            );

        }

    };


    /* =========================
       DELETE ALL READ
    ========================= */

    const handleDeleteRead = async () => {

        try {

            const user = await getCurrentUser();

            await deleteAllRead(user.id);

            await loadNotifications();

        }

        catch (error) {

            console.error(
                "Unable to delete read notifications:",
                error
            );

        }

    };


    /* =========================
       NOTIFICATION ICON
    ========================= */

    const getNotificationIcon = (type) => {

        switch (type) {

            case "SUCCESS":

                return (
                    <CheckCircleIcon />
                );


            case "WARNING":

                return (
                    <WarningAmberIcon />
                );


            case "INFO":

                return (
                    <InfoIcon />
                );


            default:

                return (
                    <NotificationsNoneIcon />
                );

        }

    };


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        minHeight: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                    <CircularProgress />

                </Box>

            </StudentDashboardLayout>

        );

    }


    return (

        <StudentDashboardLayout>

            {/* =====================================================
                HEADER
            ====================================================== */}

            <Card
                elevation={0}
                sx={{
                    mb: 4,
                    borderRadius: {
                        xs: 3,
                        sm: 4,
                        md: 5
                    },

                    background:
                        "linear-gradient(135deg,#1976D2,#512DA8)",

                    color: "#fff",

                    boxShadow:
                        "0 12px 35px rgba(25,118,210,.25)",

                    overflow: "hidden"
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 2.5,
                            sm: 3,
                            md: 4
                        },

                        "&:last-child": {
                            pb: {
                                xs: 2.5,
                                sm: 3,
                                md: 4
                            }
                        }
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",

                            justifyContent:
                                "space-between",

                            alignItems: "center",

                            gap: 3,

                            flexWrap: {
                                xs: "wrap",
                                sm: "nowrap"
                            }
                        }}
                    >

                        {/* LEFT */}

                        <Box
                            sx={{
                                flex: 1,
                                minWidth: 0
                            }}
                        >

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    fontSize: {
                                        xs: "1.7rem",
                                        sm: "2.1rem",
                                        md: "2.4rem"
                                    },

                                    lineHeight: 1.2
                                }}
                            >

                                🔔 Notification Center

                            </Typography>


                            <Typography
                                mt={1}
                                sx={{
                                    opacity: .9,

                                    fontSize: {
                                        xs: ".9rem",
                                        sm: "1rem"
                                    },

                                    lineHeight: 1.6
                                }}
                            >

                                Manage, monitor and stay updated
                                with all library notifications.

                            </Typography>


                            <NotificationsActiveIcon
                                sx={{
                                    fontSize: {
                                        xs: 45,
                                        sm: 55,
                                        md: 60
                                    },

                                    mt: 2,

                                    color: "#E3F2FD"
                                }}
                            />

                        </Box>


                        {/* RIGHT ICON */}

                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "flex"
                                },

                                alignItems: "center",
                                justifyContent: "center",

                                flexShrink: 0
                            }}
                        >

                            <Avatar
                                sx={{
                                    width: {
                                        sm: 75,
                                        md: 90
                                    },

                                    height: {
                                        sm: 75,
                                        md: 90
                                    },

                                    bgcolor: "#fff",

                                    color: "#1976D2",

                                    border:
                                        "4px solid rgba(255,255,255,.35)"
                                }}
                            >

                                <NotificationsIcon
                                    sx={{
                                        fontSize: {
                                            sm: 40,
                                            md: 50
                                        }
                                    }}
                                />

                            </Avatar>

                        </Box>

                    </Box>

                </CardContent>

            </Card>


            {/* =====================================================
                STATISTICS
            ====================================================== */}

            <Grid
                container
                spacing={{
                    xs: 2,
                    sm: 2.5,
                    md: 3
                }}
                sx={{
                    mb: 4
                }}
            >

                {/* TOTAL */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <Card
                        elevation={0}
                        sx={{
                            minHeight: 145,

                            height: "100%",

                            borderRadius: 5,

                            background:
                                "linear-gradient(135deg,#42A5F5,#1565C0)",

                            color: "#fff",

                            transition: ".35s",

                            "&:hover": {
                                transform:
                                    "translateY(-8px)",

                                boxShadow: 8
                            },

                            "@media (hover: none)": {
                                "&:active": {
                                    transform:
                                        "scale(.98)"
                                }
                            }
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        sx={{
                                            opacity: .9
                                        }}
                                    >

                                        Total

                                    </Typography>


                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        mt={1}
                                        sx={{
                                            fontSize: {
                                                xs: "2.2rem",
                                                sm: "2.5rem",
                                                md: "3rem"
                                            }
                                        }}
                                    >

                                        {notifications.length}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 50,
                                            sm: 58
                                        },

                                        height: {
                                            xs: 50,
                                            sm: 58
                                        },

                                        bgcolor:
                                            "rgba(255,255,255,.2)"
                                    }}
                                >

                                    <NotificationsIcon />

                                </Avatar>

                            </Box>

                        </CardContent>

                    </Card>

                </Grid>


                {/* UNREAD */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <Card
                        elevation={0}
                        sx={{
                            minHeight: 145,

                            height: "100%",

                            borderRadius: 5,

                            background:
                                "linear-gradient(135deg,#FFA726,#F57C00)",

                            color: "#fff",

                            transition: ".35s",

                            "&:hover": {
                                transform:
                                    "translateY(-8px)",

                                boxShadow: 8
                            },

                            "@media (hover: none)": {
                                "&:active": {
                                    transform:
                                        "scale(.98)"
                                }
                            }
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        sx={{
                                            opacity: .9
                                        }}
                                    >

                                        Unread

                                    </Typography>


                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        mt={1}
                                        sx={{
                                            fontSize: {
                                                xs: "2.2rem",
                                                sm: "2.5rem",
                                                md: "3rem"
                                            }
                                        }}
                                    >

                                        {unreadNotifications}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 50,
                                            sm: 58
                                        },

                                        height: {
                                            xs: 50,
                                            sm: 58
                                        },

                                        bgcolor:
                                            "rgba(255,255,255,.2)"
                                    }}
                                >

                                    <MarkunreadIcon />

                                </Avatar>

                            </Box>

                        </CardContent>

                    </Card>

                </Grid>


                {/* READ */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <Card
                        elevation={0}
                        sx={{
                            minHeight: 145,

                            height: "100%",

                            borderRadius: 5,

                            background:
                                "linear-gradient(135deg,#66BB6A,#2E7D32)",

                            color: "#fff",

                            transition: ".35s",

                            "&:hover": {
                                transform:
                                    "translateY(-8px)",

                                boxShadow: 8
                            },

                            "@media (hover: none)": {
                                "&:active": {
                                    transform:
                                        "scale(.98)"
                                }
                            }
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        sx={{
                                            opacity: .9
                                        }}
                                    >

                                        Read

                                    </Typography>


                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        mt={1}
                                        sx={{
                                            fontSize: {
                                                xs: "2.2rem",
                                                sm: "2.5rem",
                                                md: "3rem"
                                            }
                                        }}
                                    >

                                        {readNotifications}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 50,
                                            sm: 58
                                        },

                                        height: {
                                            xs: 50,
                                            sm: 58
                                        },

                                        bgcolor:
                                            "rgba(255,255,255,.2)"
                                    }}
                                >

                                    <DoneAllIcon />

                                </Avatar>

                            </Box>

                        </CardContent>

                    </Card>

                </Grid>


                {/* TODAY */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3
                    }}
                >

                    <Card
                        elevation={0}
                        sx={{
                            minHeight: 145,

                            height: "100%",

                            borderRadius: 5,

                            background:
                                "linear-gradient(135deg,#AB47BC,#6A1B9A)",

                            color: "#fff",

                            transition: ".35s",

                            "&:hover": {
                                transform:
                                    "translateY(-8px)",

                                boxShadow: 8
                            },

                            "@media (hover: none)": {
                                "&:active": {
                                    transform:
                                        "scale(.98)"
                                }
                            }
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        sx={{
                                            opacity: .9
                                        }}
                                    >

                                        Today

                                    </Typography>


                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        mt={1}
                                        sx={{
                                            fontSize: {
                                                xs: "2.2rem",
                                                sm: "2.5rem",
                                                md: "3rem"
                                            }
                                        }}
                                    >

                                        {todayNotifications}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 50,
                                            sm: 58
                                        },

                                        height: {
                                            xs: 50,
                                            sm: 58
                                        },

                                        bgcolor:
                                            "rgba(255,255,255,.2)"
                                    }}
                                >

                                    <TodayIcon />

                                </Avatar>

                            </Box>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>


            {/* =====================================================
                SEARCH + FILTERS + ACTIONS
            ====================================================== */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2,
                        sm: 2.5,
                        md: 3
                    },

                    borderRadius: 4,

                    border:
                        "1px solid #E5EAF2",

                    background: "#fff",

                    boxShadow:
                        "0 8px 25px rgba(0,0,0,.05)",

                    mb: 3
                }}
            >

                <Stack
                    spacing={{
                        xs: 2,
                        md: 2
                    }}
                >

                    {/* SEARCH */}

                    <TextField
                        fullWidth
                        placeholder="Search Notifications..."
                        value={search}
                        onChange={(e) =>
                            handleSearch(e.target.value)
                        }
                        InputProps={{
                            startAdornment: (

                                <InputAdornment
                                    position="start"
                                >

                                    <SearchIcon />

                                </InputAdornment>

                            )
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                bgcolor: "#fff"
                            }
                        }}
                    />


                    {/* FILTER + ACTIONS */}

                    <Box
                        sx={{
                            display: "flex",

                            alignItems: "center",

                            gap: 1.5,

                            flexWrap: "wrap"
                        }}
                    >

                        <ToggleButtonGroup
                            value={filter}
                            exclusive
                            onChange={handleFilter}
                            color="primary"
                            sx={{
                                flexWrap: "wrap",

                                "& .MuiToggleButton-root": {

                                    minWidth: {
                                        xs: 80,
                                        sm: 100
                                    },

                                    height: 48,

                                    fontWeight: "bold",

                                    textTransform: "none",

                                    borderRadius: {
                                        xs: 2,
                                        sm: 0
                                    }
                                }
                            }}
                        >

                            <ToggleButton value="ALL">

                                All

                            </ToggleButton>

                            <ToggleButton value="UNREAD">

                                Unread

                            </ToggleButton>

                            <ToggleButton value="READ">

                                Read

                            </ToggleButton>

                        </ToggleButtonGroup>


                        <Button
                            variant="contained"
                            color="success"
                            startIcon={
                                <DoneAllIcon />
                            }
                            onClick={handleMarkAllRead}
                            sx={{
                                height: 48,

                                minWidth: {
                                    xs: "100%",
                                    sm: 160
                                },

                                textTransform: "none",

                                fontWeight: "bold",

                                borderRadius: 3
                            }}
                        >

                            Mark All Read

                        </Button>


                        <Button
                            variant="contained"
                            color="error"
                            startIcon={
                                <DeleteSweepIcon />
                            }
                            onClick={handleDeleteRead}
                            sx={{
                                height: 48,

                                minWidth: {
                                    xs: "100%",
                                    sm: 160
                                },

                                textTransform: "none",

                                fontWeight: "bold",

                                borderRadius: 3
                            }}
                        >

                            Delete Read

                        </Button>

                    </Box>

                </Stack>

            </Paper>


            {/* =====================================================
                NOTIFICATIONS LIST
            ====================================================== */}

            <Paper
                elevation={0}
                sx={{
                    mt: 3,

                    borderRadius: {
                        xs: 3,
                        sm: 4,
                        md: 5
                    },

                    overflow: "hidden",

                    border:
                        "1px solid #E5EAF2",

                    background: "#fff",

                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)"
                }}
            >

                {filteredNotifications.length === 0 ? (

                    /* EMPTY STATE */

                    <Box
                        sx={{
                            py: {
                                xs: 7,
                                sm: 10
                            },

                            px: 2,

                            display: "flex",

                            flexDirection: "column",

                            alignItems: "center",

                            justifyContent: "center",

                            textAlign: "center"
                        }}
                    >

                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                bgcolor: "#EEF4FF",
                                mb: 2
                            }}
                        >

                            <NotificationsNoneIcon
                                sx={{
                                    fontSize: 48,
                                    color: "#1976D2"
                                }}
                            />

                        </Avatar>


                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                fontSize: {
                                    xs: "1.3rem",
                                    sm: "1.5rem"
                                }
                            }}
                        >

                            No Notifications Found

                        </Typography>


                        <Typography
                            color="text.secondary"
                            mt={1}
                        >

                            You're all caught up.

                        </Typography>

                    </Box>

                ) : (

                    <List disablePadding>

                        {filteredNotifications.map(
                            (notification) => (

                                <Box
                                    key={notification.id}
                                >

                                    <ListItem
                                        sx={{
                                            py: 2.2,

                                            px: {
                                                xs: 2,
                                                sm: 3
                                            },

                                            display: "flex",

                                            alignItems: {
                                                xs: "flex-start",
                                                sm: "center"
                                            },

                                            flexWrap: {
                                                xs: "wrap",
                                                sm: "nowrap"
                                            },

                                            gap: {
                                                xs: 1,
                                                sm: 0
                                            },

                                            transition: ".35s",

                                            bgcolor:
                                                notification.read
                                                    ? "#fff"
                                                    : "#F7FBFF",

                                            borderLeft:
                                                notification.read
                                                    ? "5px solid transparent"
                                                    : "5px solid #1976D2",

                                            "&:hover": {
                                                bgcolor:
                                                    "#F3F8FD",

                                                transform:
                                                    "translateX(6px)"
                                            },

                                            "@media (hover: none)": {

                                                "&:active": {
                                                    bgcolor:
                                                        "#F3F8FD"
                                                }

                                            }
                                        }}
                                    >

                                        {/* ICON */}

                                        <ListItemAvatar
                                            sx={{
                                                minWidth: {
                                                    xs: 55,
                                                    sm: 65
                                                }
                                            }}
                                        >

                                            <Avatar
                                                sx={{
                                                    width: {
                                                        xs: 46,
                                                        sm: 56
                                                    },

                                                    height: {
                                                        xs: 46,
                                                        sm: 56
                                                    },

                                                    bgcolor:
                                                        notification.read
                                                            ? "#43A047"
                                                            : "#1976D2",

                                                    boxShadow: 3
                                                }}
                                            >

                                                {getNotificationIcon(
                                                    notification.type
                                                )}

                                            </Avatar>

                                        </ListItemAvatar>


                                        {/* CONTENT */}

                                        <ListItemText
                                            sx={{
                                                minWidth: 0,

                                                flex: 1,

                                                mr: {
                                                    xs: 0,
                                                    sm: 2
                                                }
                                            }}

                                            primary={

                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight={700}
                                                    sx={{
                                                        wordBreak:
                                                            "break-word"
                                                    }}
                                                >

                                                    {
                                                        notification.title
                                                    }

                                                </Typography>

                                            }

                                            secondary={

                                                <Box>

                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            mt: .5,

                                                            color: "#555",

                                                            wordBreak:
                                                                "break-word"
                                                        }}
                                                    >

                                                        {
                                                            notification.message
                                                        }

                                                    </Typography>


                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            mt: .8,

                                                            display:
                                                                "block",

                                                            color: "#888"
                                                        }}
                                                    >

                                                        {
                                                            notification.createdAt
                                                        }

                                                    </Typography>

                                                </Box>

                                            }

                                            secondaryTypographyProps={{
                                                component: "div"
                                            }}

                                        />


                                        {/* ACTIONS */}

                                        <Box
                                            sx={{
                                                display: "flex",

                                                alignItems: "center",

                                                justifyContent: {
                                                    xs: "flex-end",
                                                    sm: "center"
                                                },

                                                gap: 1.2,

                                                ml: {
                                                    xs: "auto",
                                                    sm: 2
                                                },

                                                width: {
                                                    xs: "100%",
                                                    sm: "auto"
                                                }
                                            }}
                                        >

                                            <Chip
                                                label={
                                                    notification.read
                                                        ? "Read"
                                                        : "Unread"
                                                }

                                                color={
                                                    notification.read
                                                        ? "success"
                                                        : "warning"
                                                }

                                                sx={{
                                                    minWidth: {
                                                        xs: 75,
                                                        sm: 90
                                                    },

                                                    fontWeight: 700,

                                                    borderRadius: 3
                                                }}
                                            />


                                            {!notification.read && (

                                                <IconButton
                                                    color="success"
                                                    onClick={() =>
                                                        handleMarkAsRead(
                                                            notification.id
                                                        )
                                                    }
                                                    sx={{
                                                        bgcolor:
                                                            "#E8F5E9",

                                                        transition: ".3s",

                                                        "&:hover": {
                                                            bgcolor:
                                                                "#C8E6C9",

                                                            transform:
                                                                "scale(1.12)"
                                                        },

                                                        "@media (hover: none)": {

                                                            "&:active": {
                                                                bgcolor:
                                                                    "#C8E6C9",

                                                                transform:
                                                                    "scale(1.05)"
                                                            }

                                                        }
                                                    }}
                                                >

                                                    <DoneIcon />

                                                </IconButton>

                                            )}


                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(
                                                        notification.id
                                                    )
                                                }
                                                sx={{
                                                    bgcolor:
                                                        "#FFEBEE",

                                                    transition: ".3s",

                                                    "&:hover": {
                                                        bgcolor:
                                                            "#FFCDD2",

                                                        transform:
                                                            "scale(1.12)"
                                                    },

                                                    "@media (hover: none)": {

                                                        "&:active": {
                                                            bgcolor:
                                                                "#FFCDD2",

                                                            transform:
                                                                "scale(1.05)"
                                                        }

                                                    }
                                                }}
                                            >

                                                <DeleteIcon />

                                            </IconButton>

                                        </Box>

                                    </ListItem>


                                    <Divider />

                                </Box>

                            )
                        )}

                    </List>

                )}

            </Paper>

        </StudentDashboardLayout>

    );

}

export default Notifications;