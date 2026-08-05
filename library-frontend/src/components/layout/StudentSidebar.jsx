import {
    Drawer,
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HistoryIcon from "@mui/icons-material/History";
import PaidIcon from "@mui/icons-material/Paid";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";

import { useNavigate, useLocation } from "react-router-dom";

function StudentSidebar({ open, closeDrawer }) {

    const navigate = useNavigate();
    const location = useLocation();

    const menuStyle = (path) => ({

        color: "white",

        borderRadius: 3,

        mx: 1,

        my: 0.5,

        transition: "0.25s",

        bgcolor:
            location.pathname === path
                ? "rgba(255,255,255,0.18)"
                : "transparent",

        "&:hover": {

            bgcolor: "rgba(255,255,255,0.15)",

            transform: "translateX(5px)"

        }

    });

    const navigateTo = (path) => {

        navigate(path);

        closeDrawer();

    };

    return (

        <Drawer
    anchor="left"
    open={open}
    onClose={closeDrawer}
    PaperProps={{
        sx: {
            height: "100vh",
            overflow: "hidden"
        }
    }}
>

           <Box
    sx={{
        width: 260,
        height: "100%",
        background:
            "linear-gradient(180deg,#1565C0,#512DA8)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        boxShadow: 6,

        overflow: "hidden"
    }}
>

                <Box
                    sx={{
                        p: 3,
                        textAlign: "center"
                    }}
                >

                    <SchoolIcon
                        sx={{
                            fontSize: 55,
                            mb: 1
                        }}
                    />

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >

                        Student LMS

                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            opacity: .8,
                            mt: 1
                        }}
                    >

                        Digital Library

                    </Typography>

                </Box>

                <Divider
                    sx={{
                        bgcolor: "rgba(255,255,255,.25)"
                    }}
                />

                <List sx={{ mt: 2 }}>

                    <ListItemButton
                        sx={menuStyle("/student/dashboard")}
                        onClick={() => navigateTo("/student/dashboard")}
                    >

                        <ListItemIcon sx={{ color: "white" }}>
                            <DashboardIcon />
                        </ListItemIcon>

                        <ListItemText primary="Dashboard" />

                    </ListItemButton>

                    <ListItemButton
                        sx={menuStyle("/student/books")}
                        onClick={() => navigateTo("/student/books")}
                    >

                        <ListItemIcon sx={{ color: "white" }}>
                            <MenuBookIcon />
                        </ListItemIcon>

                        <ListItemText primary="My Books" />

                    </ListItemButton>

                    <ListItemButton
                        sx={menuStyle("/student/history")}
                        onClick={() => navigateTo("/student/history")}
                    >

                        <ListItemIcon sx={{ color: "white" }}>
                            <HistoryIcon />
                        </ListItemIcon>

                        <ListItemText primary="Borrow History" />

                    </ListItemButton>

                    <ListItemButton
                        sx={menuStyle("/student/fines")}
                        onClick={() => navigateTo("/student/fines")}
                    >

                        <ListItemIcon sx={{ color: "white" }}>
                            <PaidIcon />
                        </ListItemIcon>

                        <ListItemText primary="Fine History" />

                    </ListItemButton>

                    <ListItemButton
                        sx={menuStyle("/student/notifications")}
                        onClick={() => navigateTo("/student/notifications")}
                    >

                        <ListItemIcon sx={{ color: "white" }}>
                            <NotificationsIcon />
                        </ListItemIcon>

                        <ListItemText primary="Notifications" />

                    </ListItemButton>

                    <ListItemButton
                        sx={menuStyle("/student/profile")}
                        onClick={() => navigateTo("/student/profile")}
                    >

                        <ListItemIcon sx={{ color: "white" }}>
                            <PersonIcon />
                        </ListItemIcon>

                        <ListItemText primary="Profile" />

                    </ListItemButton>

                </List>

                <Box sx={{ flexGrow: 1 }} />

                <Divider
                    sx={{
                        bgcolor: "rgba(255,255,255,.25)"
                    }}
                />

                <List sx={{ mb: 2 }}>

                    <ListItemButton

                        sx={{

                            color: "white",

                            borderRadius: 3,

                            mx: 1,

                            "&:hover": {

                                bgcolor: "#E53935"

                            }

                        }}

                        onClick={() => {

                            localStorage.clear();

                            navigate("/");

                        }}

                    >

                        <ListItemIcon sx={{ color: "white" }}>
                            <LogoutIcon />
                        </ListItemIcon>

                        <ListItemText primary="Logout" />

                    </ListItemButton>

                </List>

            </Box>

        </Drawer>

    );

}

export default StudentSidebar;