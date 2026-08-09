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

import {
    Card,
    CardContent,
    Grid,
    Avatar,
    TextField,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Chip,
    IconButton,
    Box,
    CircularProgress,
    Typography
} from "@mui/material";

import {
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
    getNotifications
} from "../../services/notificationService";

import StudentDashboardLayout
    from "../../components/layout/StudentDashboardLayout";

import { getCurrentUser }
    from "../../services/userService";


function StudentNotifications() {

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);

    const [filteredNotifications, setFilteredNotifications] =
        useState([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");


    /* =========================================================
       LOAD NOTIFICATIONS
    ========================================================= */

    useEffect(() => {

        loadNotifications();

    }, []);


    /* =========================================================
       FILTER EFFECT
    ========================================================= */

    useEffect(() => {

        applyFilters(search, filter);

    }, [notifications, search, filter]);


    /* =========================================================
       LOAD NOTIFICATIONS
    ========================================================= */

    const loadNotifications = async () => {

        try {

            const user = await getCurrentUser();

            const data = await getNotifications(user.id);

            console.log("Notifications =", data);

            setNotifications(data || []);

        }

        catch (error) {

            console.error("Failed to load notifications:", error);

        }

        finally {

            setLoading(false);

        }

    };


    /* =========================================================
       COUNTS
    ========================================================= */

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


    /* =========================================================
       FILTER
    ========================================================= */

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
                searchValue.toLowerCase();


            data = data.filter(notification => {

                const title =
                    notification.title?.toLowerCase() || "";


                const message =
                    notification.message?.toLowerCase() || "";


                return (
                    title.includes(searchText) ||
                    message.includes(searchText)
                );

            });

        }


        setFilteredNotifications(data);

    };


    const handleSearch = (value) => {

        setSearch(value);

    };


    const handleFilter = (_, value) => {

        if (!value) {
            return;
        }

        setFilter(value);

    };


    /* =========================================================
       MARK SINGLE AS READ
    ========================================================= */

    const handleMarkAsRead = async (notificationId) => {

        try {

            await markAsRead(notificationId);

            await loadNotifications();

        }

        catch (error) {

            console.error(
                "Failed to mark notification as read:",
                error
            );

        }

    };


    /* =========================================================
       MARK ALL AS READ
    ========================================================= */

    const handleMarkAllRead = async () => {

        try {

            const user = await getCurrentUser();

            await markAllAsRead(user.id);

            await loadNotifications();

        }

        catch (error) {

            console.error(
                "Failed to mark all notifications as read:",
                error
            );

        }

    };


    /* =========================================================
       DELETE SINGLE
    ========================================================= */

    const handleDelete = async (notificationId) => {

        try {

            await deleteNotification(notificationId);

            await loadNotifications();

        }

        catch (error) {

            console.error(
                "Failed to delete notification:",
                error
            );

        }

    };


    /* =========================================================
       DELETE ALL READ
    ========================================================= */

    const handleDeleteRead = async () => {

        try {

            const user = await getCurrentUser();

            await deleteAllRead(user.id);

            await loadNotifications();

        }

        catch (error) {

            console.error(
                "Failed to delete read notifications:",
                error
            );

        }

    };


    /* =========================================================
       NOTIFICATION ICON
    ========================================================= */

    const getNotificationIcon = (type) => {

        switch (type) {

            case "SUCCESS":

                return (
                    <CheckCircleIcon
                        sx={{
                            color: "#2E7D32"
                        }}
                    />
                );


            case "WARNING":

                return (
                    <WarningAmberIcon
                        sx={{
                            color: "#ED6C02"
                        }}
                    />
                );


            case "INFO":

                return (
                    <InfoIcon
                        sx={{
                            color: "#0288D1"
                        }}
                    />
                );


            default:

                return (
                    <NotificationsNoneIcon
                        sx={{
                            color: "#1976D2"
                        }}
                    />
                );

        }

    };


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        minHeight: "50vh",
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


    /* =========================================================
       UI
    ========================================================= */

    return (

        <StudentDashboardLayout>

            {/* =================================================
                HEADER
            ================================================= */}

            <Card
                sx={{
                    mb: 4,
                    borderRadius: 5,
                    background:
                        "linear-gradient(135deg,#1976d2,#512DA8)",
                    color: "#fff",
                    overflow: "hidden"
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 3,
                            sm: 4,
                            md: 4
                        }
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "stretch",
                            gap: 3
                        }}
                    >

                        {/* LEFT */}

                        <Box
                            sx={{
                                minWidth: 0,
                                flex: 1
                            }}
                        >

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    fontSize: {
                                        xs: "1.8rem",
                                        sm: "2.1rem",
                                        md: "2.125rem"
                                    }
                                }}
                            >

                                🔔 Notifications

                            </Typography>


                            <Typography
                                mt={1}
                                sx={{
                                    fontSize: {
                                        xs: 14,
                                        sm: 16
                                    }
                                }}
                            >

                                Stay updated with your latest
                                library activities.

                            </Typography>


                            <NotificationsActiveIcon
                                sx={{
                                    fontSize: {
                                        xs: 48,
                                        sm: 60
                                    },
                                    mt: 1.5,
                                    ml: 0.5
                                }}
                            />

                        </Box>


                        {/* RIGHT */}

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                minWidth: {
                                    xs: 75,
                                    sm: 120
                                }
                            }}
                        >

                            <Avatar
                                sx={{
                                    width: {
                                        xs: 60,
                                        sm: 80
                                    },

                                    height: {
                                        xs: 60,
                                        sm: 80
                                    },

                                    bgcolor: "#fff",
                                    color: "#1976d2"
                                }}
                            >

                                <NotificationsIcon
                                    sx={{
                                        fontSize: {
                                            xs: 35,
                                            sm: 48
                                        }
                                    }}
                                />

                            </Avatar>

                        </Box>

                    </Box>

                </CardContent>

            </Card>


            {/* =================================================
                SEARCH + FILTER + ACTION BUTTONS

                IMPORTANT:
                Desktop -> ALL ONE ROW
                Mobile -> controlled wrapping
            ================================================= */}

            <Box
                sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1.5,

                    mb: 4,

                    width: "100%",

                    /*
                     * Desktop:
                     * everything remains in one row.
                     *
                     * Mobile:
                     * controls wrap only when required.
                     */
                    flexWrap: {
                        xs: "wrap",
                        md: "nowrap"
                    }
                }}
            >

                {/* SEARCH */}

                <TextField
                    placeholder="Search Notifications..."
                    value={search}
                    onChange={(e) =>
                        handleSearch(e.target.value)
                    }

                    size="medium"

                    sx={{

                        /*
                         * Desktop search gets maximum
                         * available space.
                         */
                        flex: {
                            xs: "1 1 100%",
                            md: "1 1 auto"
                        },

                        minWidth: 0,

                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#fff",
                            borderRadius: 2
                        }
                    }}

                    InputProps={{

                        startAdornment: (

                            <InputAdornment position="start">

                                <SearchIcon />

                            </InputAdornment>

                        )

                    }}

                />


                {/* FILTER */}

                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilter}
                    color="primary"

                    sx={{

                        flexShrink: 0,

                        height: 56,

                        "& .MuiToggleButton-root": {

                            minWidth: {
                                xs: 82,
                                sm: 90,
                                md: 95
                            },

                            height: 56,

                            fontWeight: "bold",

                            textTransform: "none",

                            px: {
                                xs: 1,
                                sm: 1.5
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


                {/* MARK ALL READ */}

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleMarkAllRead}

                    sx={{

                        height: 56,

                        minWidth: {
                            xs: 145,
                            md: 160
                        },

                        flexShrink: 0,

                        textTransform: "none",

                        fontWeight: "bold",

                        whiteSpace: "nowrap",

                        borderRadius: 2
                    }}
                >

                    Mark All Read

                </Button>


                {/* DELETE READ */}

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteRead}

                    sx={{

                        height: 56,

                        minWidth: {
                            xs: 135,
                            md: 150
                        },

                        flexShrink: 0,

                        textTransform: "none",

                        fontWeight: "bold",

                        whiteSpace: "nowrap",

                        borderRadius: 2
                    }}
                >

                    Delete Read

                </Button>

            </Box>


            {/* =================================================
                STAT CARDS
            ================================================= */}

            <Grid
                container
                spacing={3}
                sx={{
                    width: "100%"
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
                        sx={{
                            minHeight: 140,
                            height: "100%",
                            borderRadius: 5,

                            background:
                                "linear-gradient(135deg,#42A5F5,#1565C0)",

                            color: "#fff",

                            transition: ".35s",

                            "&:hover": {

                                transform:
                                    "translateY(-8px) scale(1.03)"

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

                                    <Typography>
                                        Total
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        mt={1}
                                    >

                                        {notifications.length}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
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
                        sx={{
                            minHeight: 140,
                            height: "100%",
                            borderRadius: 5,

                            background:
                                "linear-gradient(135deg,#FFA726,#F57C00)",

                            color: "#fff",

                            transition: ".35s",

                            "&:hover": {

                                transform:
                                    "translateY(-8px) scale(1.03)"

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

                                    <Typography>
                                        Unread
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        mt={1}
                                    >

                                        {unreadNotifications}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
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
                        sx={{
                            minHeight: 140,
                            height: "100%",
                            borderRadius: 5,

                            background:
                                "linear-gradient(135deg,#66BB6A,#2E7D32)",

                            color: "#fff",

                            transition: ".35s",

                            "&:hover": {

                                transform:
                                    "translateY(-8px) scale(1.03)"

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

                                    <Typography>
                                        Read
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        mt={1}
                                    >

                                        {readNotifications}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
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
                        sx={{
                            minHeight: 140,
                            height: "100%",
                            borderRadius: 5,

                            background:
                                "linear-gradient(135deg,#AB47BC,#6A1B9A)",

                            color: "#fff",

                            transition: ".35s",

                            "&:hover": {

                                transform:
                                    "translateY(-8px) scale(1.03)"

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

                                    <Typography>
                                        Today
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight="bold"
                                        mt={1}
                                    >

                                        {todayNotifications}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
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


            {/* =================================================
                NOTIFICATION LIST
            ================================================= */}

            <Paper
                elevation={4}

                sx={{

                    mt: 3,

                    borderRadius: 5,

                    overflow: "hidden",

                    width: "100%"
                }}
            >

                {

                    filteredNotifications.length === 0

                        ?

                        (

                            <Box
                                sx={{
                                    py: 10,
                                    px: 2,
                                    textAlign: "center"
                                }}
                            >

                                <NotificationsNoneIcon
                                    sx={{
                                        fontSize: 70,
                                        color: "#bdbdbd"
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    mt={2}
                                >

                                    No Notifications Found

                                </Typography>

                            </Box>

                        )

                        :

                        (

                            <List
                                disablePadding
                                sx={{
                                    width: "100%"
                                }}
                            >

                                {

                                    filteredNotifications.map(
                                        notification => (

                                            <Box
                                                key={notification.id}
                                            >

                                                <ListItem

                                                    sx={{

                                                        /*
                                                         * IMPORTANT:
                                                         * left blue border preserved
                                                         */

                                                        borderLeft:
                                                            notification.read
                                                                ? "4px solid transparent"
                                                                : "4px solid #1976d2",

                                                        bgcolor:
                                                            notification.read
                                                                ? "#fff"
                                                                : "#F5FAFF",

                                                        py: 2,

                                                        px: {
                                                            xs: 1.5,
                                                            sm: 2
                                                        },

                                                        /*
                                                         * Don't let the
                                                         * right action area
                                                         * disappear.
                                                         */

                                                        display: "flex",

                                                        alignItems: "center",

                                                        gap: {
                                                            xs: 0.5,
                                                            sm: 1
                                                        },

                                                        transition: ".3s",

                                                        "&:hover": {

                                                            bgcolor: "#ECEFF1",

                                                            /*
                                                             * Original hover
                                                             * effect retained.
                                                             */

                                                            transform:
                                                                "scale(1.01)"
                                                        }
                                                    }}
                                                >

                                                    {/* ICON */}

                                                    <ListItemAvatar
                                                        sx={{
                                                            minWidth: {
                                                                xs: 48,
                                                                sm: 56
                                                            }
                                                        }}
                                                    >

                                                        <Avatar
                                                            sx={{

                                                                width: {
                                                                    xs: 42,
                                                                    sm: 52
                                                                },

                                                                height: {
                                                                    xs: 42,
                                                                    sm: 52
                                                                },

                                                                bgcolor:
                                                                    notification.read
                                                                        ? "#43A047"
                                                                        : "#1976D2",

                                                                boxShadow: 3
                                                            }}
                                                        >

                                                            {
                                                                getNotificationIcon(
                                                                    notification.type
                                                                )
                                                            }

                                                        </Avatar>

                                                    </ListItemAvatar>


                                                    {/* CONTENT */}

                                                    <ListItemText

                                                        sx={{
                                                            minWidth: 0,
                                                            flex: 1,
                                                            mr: {
                                                                xs: 0.5,
                                                                sm: 1
                                                            }
                                                        }}

                                                        primary={

                                                            <Typography
                                                                variant="subtitle1"
                                                                fontWeight="bold"

                                                                sx={{
                                                                    overflowWrap:
                                                                        "anywhere"
                                                                }}
                                                            >

                                                                {
                                                                    notification.title
                                                                }

                                                            </Typography>

                                                        }

                                                        secondaryTypographyProps={{
                                                            component: "div"
                                                        }}

                                                        secondary={

                                                            <Box>

                                                                <Typography
                                                                    component="div"

                                                                    sx={{
                                                                        color: "#555",
                                                                        mt: 0.4,
                                                                        overflowWrap:
                                                                            "anywhere"
                                                                    }}
                                                                >

                                                                    {
                                                                        notification.message
                                                                    }

                                                                </Typography>


                                                                <Typography
                                                                    component="div"

                                                                    variant="caption"

                                                                    sx={{
                                                                        color: "#888",
                                                                        mt: 0.7
                                                                    }}
                                                                >

                                                                    {
                                                                        notification.createdAt
                                                                    }

                                                                </Typography>

                                                            </Box>

                                                        }

                                                    />


                                                    {/* STATUS */}

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

                                                        size="small"

                                                        sx={{

                                                            mr: {
                                                                xs: 0.5,
                                                                sm: 1
                                                            },

                                                            width: {
                                                                xs: 70,
                                                                sm: 85
                                                            },

                                                            minWidth: {
                                                                xs: 70,
                                                                sm: 85
                                                            },

                                                            fontWeight: "bold",

                                                            borderRadius: 3,

                                                            flexShrink: 0
                                                        }}

                                                    />


                                                    {/* ACTIONS */}

                                                    <Box

                                                        sx={{

                                                            display: "flex",

                                                            alignItems: "center",

                                                            justifyContent: "center",

                                                            flexShrink: 0,

                                                            minWidth: {
                                                                xs: 80,
                                                                sm: 92
                                                            }
                                                        }}
                                                    >

                                                        {/* MARK READ */}

                                                        {
                                                            !notification.read &&

                                                            (

                                                                <IconButton

                                                                    color="success"

                                                                    aria-label="Mark as read"

                                                                    onClick={() =>
                                                                        handleMarkAsRead(
                                                                            notification.id
                                                                        )
                                                                    }

                                                                    sx={{

                                                                        width: {
                                                                            xs: 38,
                                                                            sm: 44
                                                                        },

                                                                        height: {
                                                                            xs: 38,
                                                                            sm: 44
                                                                        },

                                                                        transition: ".3s",

                                                                        "&:hover": {

                                                                            bgcolor:
                                                                                "#E8F5E9",

                                                                            transform:
                                                                                "scale(1.15)"
                                                                        }
                                                                    }}
                                                                >

                                                                    <DoneIcon />

                                                                </IconButton>

                                                            )

                                                        }


                                                        {/* DELETE */}

                                                        <IconButton

                                                            color="error"

                                                            aria-label="Delete notification"

                                                            onClick={() =>
                                                                handleDelete(
                                                                    notification.id
                                                                )
                                                            }

                                                            sx={{

                                                                width: {
                                                                    xs: 38,
                                                                    sm: 44
                                                                },

                                                                height: {
                                                                    xs: 38,
                                                                    sm: 44
                                                                },

                                                                transition: ".3s",

                                                                "&:hover": {

                                                                    bgcolor:
                                                                        "#FFEBEE",

                                                                    transform:
                                                                        "scale(1.15)"
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

                                    )

                                }

                            </List>

                        )

                }

            </Paper>

        </StudentDashboardLayout>

    );

}


export default StudentNotifications;