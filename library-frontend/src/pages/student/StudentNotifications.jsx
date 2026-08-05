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
    Button,
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
    Box,
    CircularProgress,
    Typography
} from "@mui/material";

function StudentNotifications() {

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

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 8
                    }}
                >

                    <CircularProgress />

                </Box>

            </StudentDashboardLayout>

        );

    }

    return (

        <StudentDashboardLayout>

           <Card
    sx={{
        mb: 4,
        borderRadius: 5,
        background: "linear-gradient(135deg,#1976d2,#512DA8)",
        color: "#fff"
    }}
>

    <CardContent>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch"
            }}
        >

            {/* Left */}

            <Box>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >

                    🔔 Notifications

                </Typography>

                <Typography mt={1}>

                    Stay updated with your latest library activities.

                </Typography>

                <NotificationsActiveIcon
                    sx={{
                        fontSize: 60,
                        mt: 1.5,
                        ml: .5
                    }}
                />

            </Box>

            {/* Right */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 120
                }}
            >

                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "#fff",
                        color: "#1976d2"
                    }}
                >

                    <NotificationsIcon
                        sx={{
                            fontSize: 48
                        }}
                    />

                </Avatar>

            </Box>

        </Box>

    </CardContent>

</Card>

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
            flex: 1
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
    onClick={handleMarkAllRead}
        sx={{
            height: 56,
            minWidth: 160,
            flexShrink: 0,
            textTransform: "none",
            fontWeight: "bold"
        }}
    >
        Mark All Read
    </Button>

    <Button
    variant="contained"
    color="error"
    onClick={handleDeleteRead}
        sx={{
            height: 56,
            minWidth: 150,
            flexShrink: 0,
            textTransform: "none",
            fontWeight: "bold"
        }}
    >
        Delete Read
    </Button>

</Box>
<Grid
    container
    spacing={3}
    mb={4}
>

    <Grid size={{ xs: 12, sm: 6, md: 3 }}>

        <Card
            sx={{
                minHeight: 140,
                borderRadius: 5,
                background: "linear-gradient(135deg,#42A5F5,#1565C0)",
                color: "#fff",
                transition: ".35s",

                "&:hover": {

                    transform: "translateY(-8px) scale(1.03)"

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
                            bgcolor: "rgba(255,255,255,.2)"
                        }}
                    >

                        <NotificationsIcon />

                    </Avatar>

                </Box>

            </CardContent>

        </Card>

    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>

    <Card
        sx={{
            minHeight: 140,
            borderRadius: 5,
            background: "linear-gradient(135deg,#FFA726,#F57C00)",
            color: "#fff",
            transition: ".35s",

            "&:hover": {

                transform: "translateY(-8px) scale(1.03)"

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
                        bgcolor: "rgba(255,255,255,.2)"
                    }}
                >

                    <MarkunreadIcon />

                </Avatar>

            </Box>

        </CardContent>

    </Card>

</Grid>
<Grid size={{ xs: 12, sm: 6, md: 3 }}>

    <Card
        sx={{
            minHeight: 140,
            borderRadius: 5,
            background: "linear-gradient(135deg,#66BB6A,#2E7D32)",
            color: "#fff",
            transition: ".35s",

            "&:hover": {

                transform: "translateY(-8px) scale(1.03)"

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
                        bgcolor: "rgba(255,255,255,.2)"
                    }}
                >

                    <DoneAllIcon />

                </Avatar>

            </Box>

        </CardContent>

    </Card>

</Grid>
<Grid size={{ xs: 12, sm: 6, md: 3 }}>

    <Card
        sx={{
            minHeight: 140,
            borderRadius: 5,
            background: "linear-gradient(135deg,#AB47BC,#6A1B9A)",
            color: "#fff",
            transition: ".35s",

            "&:hover": {

                transform: "translateY(-8px) scale(1.03)"

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

<Paper

    elevation={4}

    sx={{

        mt:3,

        borderRadius:5,

        overflow:"hidden"

    }}

>

    {

        filteredNotifications.length === 0 ?

        (

            <Box
                sx={{
                    py: 10,
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

            <List>

                {

                    filteredNotifications.map(notification => (

                        <Box key={notification.id}>

                            <ListItem
sx={{

    py: 2,

    px: 2,

    transition: ".3s",

    borderLeft: notification.read
        ? "4px solid transparent"
        : "4px solid #1976d2",

    bgcolor: notification.read
        ? "#fff"
        : "#F5FAFF",

    "&:hover": {

        bgcolor: "#ECEFF1",

        transform: "scale(1.01)"

    }

}}
                            >                                <ListItemAvatar>

                                    <Avatar
                                        sx={{

    width: 52,

    height: 52,

    bgcolor: notification.read
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

                                <ListItemText

    primary={

<Typography

    variant="subtitle1"

    fontWeight="bold"

>


            {notification.title}

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

        mt: .4

    }}

>

                {notification.message}

            </Typography>

<Typography

    component="div"

    variant="caption"

    sx={{

        color: "#888",

        mt: .7

    }}

>

                {notification.createdAt}

            </Typography>

        </Box>

    }

/>
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

        mr:2,

        width:85,

        fontWeight:"bold",

        borderRadius:3

    }}

/>

                                {

                                    !notification.read &&

                                    (

<IconButton

    color="success"

    sx={{

        transition:".3s",

        "&:hover":{

            bgcolor:"#E8F5E9",

            transform:"scale(1.15)"

        }

    }}

    onClick={()=>
        handleMarkAsRead(notification.id)
    }

>

                                            <DoneIcon />

                                        </IconButton>

                                    )

                                }

<IconButton

    color="error"

    sx={{

        transition:".3s",

        "&:hover":{

            bgcolor:"#FFEBEE",

            transform:"scale(1.15)"

        }

    }}

    onClick={()=>
        handleDelete(notification.id)
    }

>
                                    <DeleteIcon />

                                </IconButton>

                            </ListItem>

                            <Divider />

                        </Box>

                    ))

                }

            </List>

        )

    }

</Paper>

        </StudentDashboardLayout>

    );

}

export default StudentNotifications;