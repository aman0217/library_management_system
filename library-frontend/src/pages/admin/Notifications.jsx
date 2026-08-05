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
import {

    Card,
    CardContent,
    Grid,
    Avatar

} from "@mui/material";
import {

    TextField,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
    Paper

} from "@mui/material";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Chip,
    IconButton
} from "@mui/material";
import {

    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllRead

} from "../../services/notificationService";
import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";
import NotificationsIcon
from "@mui/icons-material/Notifications";

import NotificationsActiveIcon
from "@mui/icons-material/NotificationsActive";
import {
    getNotifications
} from "../../services/notificationService";

import {
    getCurrentUser
} from "../../services/userService";

import {
    
    CircularProgress,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    Box,
    Typography,
    Button,
    Stack
} from "@mui/material";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { formatTime } from "../../services/timeUtils";

function Notifications() {

    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);

const [search, setSearch] = useState("");

const [filter, setFilter] = useState("ALL");
 useEffect(() => {

        loadNotifications();

    }, []);
    useEffect(() => {

    applyFilters(search, filter);

}, [notifications]);

    const loadNotifications = async () => {

        try {

            const user = await getCurrentUser();

            const data = await getNotifications(user.id);

            console.log("Notifications =", data);

            setNotifications(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };
const unreadNotifications = notifications.filter(
    notification => !notification.read
).length;

const readNotifications = notifications.filter(
    notification => notification.read
).length;

const todayNotifications = notifications.filter(notification => {

    const today = new Date().toISOString().split("T")[0];

    return notification.createdAt.startsWith(today);

}).length;

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

        data = data.filter(notification =>

            notification.title
                .toLowerCase()
                .includes(searchValue.toLowerCase())

            ||

            notification.message
                .toLowerCase()
                .includes(searchValue.toLowerCase())

        );

    }

    setFilteredNotifications(data);

};

const handleSearch = (value) => {

    setSearch(value);

    applyFilters(value, filter);

};

const handleFilter = (_, value) => {

    if (!value) return;

    setFilter(value);

    applyFilters(search, value);

};
const handleMarkAsRead = async (notificationId) => {

    try {

        await markAsRead(notificationId);

        loadNotifications();

    }

    catch (error) {

        console.error(error);

    }

};

const handleMarkAllRead = async () => {

    try {

        const user = await getCurrentUser();

        await markAllAsRead(user.id);

        loadNotifications();

    }

    catch (error) {

        console.error(error);

    }

};

const handleDelete = async (notificationId) => {

    try {

        await deleteNotification(notificationId);

        loadNotifications();

    }

    catch (error) {

        console.error(error);

    }

};

const handleDeleteRead = async () => {

    try {

        const user = await getCurrentUser();

        await deleteAllRead(user.id);

        loadNotifications();

    }

    catch (error) {

        console.error(error);

    }

};
const getNotificationIcon = (type) => {

    switch (type) {

        case "SUCCESS":

            return <CheckCircleIcon color="success" />;

        case "WARNING":

            return <WarningAmberIcon color="warning" />;

        case "INFO":

            return <InfoIcon color="info" />;

        default:

            return <NotificationsNoneIcon color="primary" />;

    }

};

    return (

        <DashboardLayout>
            <Card
    sx={{
        mb: 4,
        borderRadius: 5,
        background: "linear-gradient(135deg,#1976d2,#512DA8)",
        color: "#fff",
        boxShadow: "0 12px 35px rgba(25,118,210,.25)"
    }}
>
    <CardContent>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            {/* Left */}

            <Box>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    🔔 Notification Center
                </Typography>

                <Typography
                    mt={1}
                    sx={{
                        opacity: .9,
                        fontSize: "1rem"
                    }}
                >
                    Manage, monitor and stay updated with all library notifications.
                </Typography>

                <NotificationsActiveIcon
                    sx={{
                        fontSize: 60,
                        mt: 2,
                        color: "#E3F2FD"
                    }}
                />

            </Box>

            {/* Right */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                <Avatar
                    sx={{
                        width: 90,
                        height: 90,
                        bgcolor: "#fff",
                        color: "#1976d2",
                        border: "4px solid rgba(255,255,255,.35)"
                    }}
                >

                    <NotificationsIcon
                        sx={{
                            fontSize: 50
                        }}
                    />

                </Avatar>

            </Box>

        </Box>

    </CardContent>

</Card>

<Grid
    container
    spacing={3}
    mb={4}
>

    {/* Total */}

    <Grid size={{ xs: 12, sm: 6, md: 3 }}>

        <Card
            sx={{
                minHeight: 145,
                borderRadius: 5,
                background:
                    "linear-gradient(135deg,#42A5F5,#1565C0)",
                color: "#fff",
                transition: ".35s",

                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8
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
                            sx={{ opacity: .9 }}
                        >
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
                            width: 58,
                            height: 58,
                            bgcolor: "rgba(255,255,255,.2)"
                        }}
                    >

                        <NotificationsIcon />

                    </Avatar>

                </Box>

            </CardContent>

        </Card>

    </Grid>

    {/* Unread */}

    <Grid size={{ xs: 12, sm: 6, md: 3 }}>

        <Card
            sx={{
                minHeight: 145,
                borderRadius: 5,
                background:
                    "linear-gradient(135deg,#FFA726,#F57C00)",
                color: "#fff",
                transition: ".35s",

                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8
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
                            sx={{ opacity: .9 }}
                        >
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
                            width: 58,
                            height: 58,
                            bgcolor: "rgba(255,255,255,.2)"
                        }}
                    >

                        <MarkunreadIcon />

                    </Avatar>

                </Box>

            </CardContent>

        </Card>

    </Grid>

    {/* Read */}

    <Grid size={{ xs: 12, sm: 6, md: 3 }}>

        <Card
            sx={{
                minHeight: 145,
                borderRadius: 5,
                background:
                    "linear-gradient(135deg,#66BB6A,#2E7D32)",
                color: "#fff",
                transition: ".35s",
                mb: 3,

                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8
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
                            sx={{ opacity: .9 }}
                        >
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
                            width: 58,
                            height: 58,
                            bgcolor: "rgba(255,255,255,.2)"
                        }}
                    >

                        <DoneAllIcon />

                    </Avatar>

                </Box>

            </CardContent>

        </Card>

    </Grid>

    {/* Today */}

    <Grid size={{ xs: 12, sm: 6, md: 3 }}>

        <Card
            sx={{
                minHeight: 145,
                borderRadius: 5,
                background:
                    "linear-gradient(135deg,#AB47BC,#6A1B9A)",
                color: "#fff",
                transition: ".35s",

                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8
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
                            sx={{ opacity: .9 }}
                        >
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
                            width: 58,
                            height: 58,
                            bgcolor: "rgba(255,255,255,.2)"
                        }}
                    >

                        <TodayIcon />

                    </Avatar>

                </Box>

            </CardContent>

        </Card>

    </Grid>

</Grid>

             <Box
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 4,
        flexWrap: {
            xs: "wrap",
            md: "nowrap"
        }
    }}
>

    <TextField
        fullWidth
        placeholder="Search Notifications..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            )
        }}
        sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "#fff"
            }
        }}
    />

    <ToggleButtonGroup
        value={filter}
        exclusive
         onChange={handleFilter}
        color="primary"
        sx={{
            flexShrink: 0,

            "& .MuiToggleButton-root": {
                minWidth: 100,
                height: 56,
                fontWeight: "bold",
                textTransform: "none"
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
        startIcon={<DoneAllIcon />}
        onClick={handleMarkAllRead}
        sx={{
            height: 56,
            minWidth: 170,
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
        startIcon={<DeleteSweepIcon />}
        onClick={handleDeleteRead}
        sx={{
            height: 56,
            minWidth: 170,
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 3
        }}
    >
        Delete Read
    </Button>

</Box>

          <Paper
    elevation={4}
    sx={{
        mt: 4,
        borderRadius: 5,
        overflow: "hidden",
        border: "1px solid #E5EAF2",
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,.06)"
    }}
>
    {filteredNotifications.length === 0 ? (

        <Box
            sx={{
                py: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
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

            {filteredNotifications.map((notification) => (

                <Box key={notification.id}>

                    <ListItem
                        sx={{
                            py: 2.2,
                            px: 3,
                            transition: ".35s",
                            bgcolor: notification.read
                                ? "#fff"
                                : "#F7FBFF",

                            borderLeft: notification.read
                                ? "5px solid transparent"
                                : "5px solid #1976D2",

                            "&:hover": {
                                bgcolor: "#F3F8FD",
                                transform: "translateX(6px)"
                            }
                        }}
                    >

                        <ListItemAvatar>

                            <Avatar
                                sx={{
                                    width: 56,
                                    height: 56,

                                    bgcolor: notification.read
                                        ? "#43A047"
                                        : "#1976D2",

                                    boxShadow: 3
                                }}
                            >
                                {getNotificationIcon(notification.type)}
                            </Avatar>

                        </ListItemAvatar>

                        <ListItemText

                            primary={

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                >
                                    {notification.title}
                                </Typography>

                            }

                            secondary={

                                <>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: .5,
                                            color: "#555"
                                        }}
                                    >
                                        {notification.message}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: .8,
                                            display: "block",
                                            color: "#888"
                                        }}
                                    >
                                        {notification.createdAt}
                                    </Typography>

                                </>

                            }

                            secondaryTypographyProps={{
                                component: "div"
                            }}

                        />

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.2,
                                ml: 2
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
                                    minWidth: 90,
                                    fontWeight: 700,
                                    borderRadius: 3
                                }}
                            />

                            {!notification.read && (

                                <IconButton
                                    color="success"
                                    onClick={() =>
                                        handleMarkAsRead(notification.id)
                                    }
                                    sx={{
                                        bgcolor: "#E8F5E9",

                                        transition: ".3s",

                                        "&:hover": {
                                            bgcolor: "#C8E6C9",
                                            transform: "scale(1.12)"
                                        }
                                    }}
                                >
                                    <DoneIcon />
                                </IconButton>

                            )}

                            <IconButton
                                color="error"
                                onClick={() =>
                                    handleDelete(notification.id)
                                }
                                sx={{
                                    bgcolor: "#FFEBEE",

                                    transition: ".3s",

                                    "&:hover": {
                                        bgcolor: "#FFCDD2",
                                        transform: "scale(1.12)"
                                    }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>

                        </Box>

                    </ListItem>

                    <Divider />

                </Box>

            ))}

        </List>

    )}

</Paper>

        </DashboardLayout>

    );

}

export default Notifications;