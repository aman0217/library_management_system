import { useEffect, useState } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Avatar,
    Chip
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { getCurrentUser } from "../../services/userService";

import {
    getNotifications,
    getUnreadCount,
    markAsRead,
    deleteNotification
} from "../../services/notificationService";

function Navbar({ onMenuClick }) {

    const [currentUser, setCurrentUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const open = Boolean(anchorEl);

    useEffect(() => {
        loadCurrentUser();
    }, []);

    useEffect(() => {

        if (!currentUser) return;

        loadNotifications();

        const interval = setInterval(
            loadNotifications,
            30000
        );

        return () => clearInterval(interval);

    }, [currentUser]);

    const loadCurrentUser = async () => {

        try {

            const user = await getCurrentUser();

            setCurrentUser(user);

        } catch (err) {

            console.error(err);

        }

    };

    const loadNotifications = async () => {

        if (!currentUser) return;

        try {

            const data = await getNotifications(currentUser.id);

            const unread = await getUnreadCount(currentUser.id);

            setNotifications(data);
            setUnreadCount(unread);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <AppBar
            position="fixed"
            elevation={3}
            sx={{
                background:
                    "linear-gradient(135deg,#1976D2,#512DA8)"
            }}
        >

            <Toolbar
                sx={{
                    minHeight: {
                        xs: 60,
                        sm: 64
                    },

                    px: {
                        xs: 1,
                        sm: 2,
                        md: 3
                    }
                }}
            >

                {/* MENU BUTTON */}

                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{
                        mr: {
                            xs: 1,
                            sm: 2
                        },

                        "&:hover": {
                            bgcolor: "rgba(255,255,255,.25)"
                        }
                    }}
                >

                    <MenuIcon />

                </IconButton>


                {/* TITLE */}

                <Box
                    sx={{
                        flexGrow: 1,
                        minWidth: 0
                    }}
                >

                    <Typography
                        fontWeight="bold"
                        sx={{
                            fontSize: {
                                xs: "1rem",
                                sm: "1.25rem",
                                md: "1.5rem"
                            },

                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >

                        📚 Library Management System

                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            opacity: .8,

                            display: {
                                xs: "none",
                                sm: "block"
                            }
                        }}
                    >

                        Administration Panel

                    </Typography>

                </Box>


                {/* NOTIFICATION */}

                <IconButton
                    color="inherit"
                    onClick={(e) =>
                        setAnchorEl(e.currentTarget)
                    }
                    sx={{
                        ml: {
                            xs: .5,
                            sm: 1
                        }
                    }}
                >

                    <Badge
                        badgeContent={unreadCount}
                        color="error"
                        max={99}
                    >

                        <NotificationsIcon />

                    </Badge>

                </IconButton>


                {/* USER INFO */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        ml: {
                            xs: 1,
                            sm: 2,
                            md: 3
                        },

                        gap: {
                            xs: .5,
                            sm: 1.5
                        }
                    }}
                >

                    <Avatar
                        sx={{
                            bgcolor: "#fff",
                            color: "#1976D2",

                            width: {
                                xs: 34,
                                sm: 40
                            },

                            height: {
                                xs: 34,
                                sm: 40
                            }
                        }}
                    >

                        <AdminPanelSettingsIcon
                            sx={{
                                fontSize: {
                                    xs: 20,
                                    sm: 24
                                }
                            }}
                        />

                    </Avatar>


                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block"
                            }
                        }}
                    >

                        <Typography
                            fontWeight="bold"
                            noWrap
                        >

                            {currentUser?.firstName}

                        </Typography>

                        <Chip
                            label="ADMIN"
                            color="warning"
                            size="small"
                        />

                    </Box>

                </Box>


                {/* NOTIFICATION MENU */}

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}

                    slotProps={{
                        paper: {
                            sx: {
                                width: {
                                    xs: "calc(100vw - 20px)",
                                    sm: 380
                                },

                                maxWidth: "380px",

                                maxHeight: {
                                    xs: "70vh",
                                    sm: 500
                                },

                                borderRadius: 3
                            }
                        }
                    }}
                >

                    <Typography
                        sx={{
                            p: 2,
                            fontWeight: "bold"
                        }}
                    >

                        Notifications

                    </Typography>

                    <Divider />


                    {notifications.length === 0 ? (

                        <MenuItem>

                            No Notifications

                        </MenuItem>

                    ) : (

                        notifications.map(notification => (

                            <MenuItem
                                key={notification.id}

                                sx={{
                                    display: "block",

                                    whiteSpace: "normal",

                                    bgcolor:
                                        notification.read
                                            ? "inherit"
                                            : "#f5f5f5",

                                    py: 1.5
                                }}

                                onClick={() => {

                                    if (!notification.read) {

                                        markAsRead(
                                            notification.id
                                        );

                                        loadNotifications();

                                    }

                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems: "center",
                                        gap: 1
                                    }}
                                >

                                    <Typography
                                        fontWeight="bold"
                                        sx={{
                                            minWidth: 0,
                                            overflow: "hidden",
                                            textOverflow:
                                                "ellipsis"
                                        }}
                                    >

                                        {notification.title}

                                    </Typography>


                                    <IconButton
                                        size="small"
                                        color="error"

                                        onClick={(e) => {

                                            e.stopPropagation();

                                            deleteNotification(
                                                notification.id
                                            );

                                            loadNotifications();

                                        }}
                                    >

                                        <DeleteIcon
                                            fontSize="small"
                                        />

                                    </IconButton>

                                </Box>


                                <Typography
                                    variant="body2"
                                    sx={{
                                        whiteSpace: "normal",
                                        wordBreak: "break-word"
                                    }}
                                >

                                    {notification.message}

                                </Typography>


                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "block",
                                        mt: .5
                                    }}
                                >

                                    {notification.createdAt}

                                </Typography>

                            </MenuItem>

                        ))

                    )}

                </Menu>

            </Toolbar>

        </AppBar>

    );
}

export default Navbar;