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

import {
    useNavigate,
    useLocation
} from "react-router-dom";


function StudentSidebar({ open, closeDrawer }) {

    const navigate = useNavigate();
    const location = useLocation();


    // =====================================================
    // MENU STYLE
    // =====================================================

    const menuStyle = (path) => ({
        color: "white",

        borderRadius: 3,

        mx: {
            xs: 0.75,
            sm: 1
        },

        my: 0.5,

        px: {
            xs: 1.5,
            sm: 2
        },

        minHeight: 48,

        transition: "0.25s",

        bgcolor:
            location.pathname === path
                ? "rgba(255,255,255,0.18)"
                : "transparent",

        "&:hover": {
            bgcolor: "rgba(255,255,255,0.15)",
            transform: "translateX(5px)"
        },

        "&:active": {
            transform: "translateX(3px)"
        }
    });


    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigateTo = (path) => {

        navigate(path);

        closeDrawer();

    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.clear();

        closeDrawer();

        navigate("/", {
            replace: true
        });

    };


    return (

        <Drawer
            anchor="left"
            open={open}
            onClose={closeDrawer}

            /*
             * Sidebar navbar se upar rahega.
             */
            sx={{
                zIndex: (theme) =>
                    theme.zIndex.drawer + 2
            }}

            /*
             * IMPORTANT
             *
             * Backdrop ko transparent kar rahe hain.
             *
             * Isse sidebar open hone par:
             *
             * LEFT  = Sidebar
             * RIGHT = Navbar visible
             *
             */
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: "transparent"
                    }
                }
            }}

            ModalProps={{
                keepMounted: true
            }}

            PaperProps={{
                sx: {

                    /*
                     * Sidebar fixed rahega.
                     */
                    position: "fixed",

                    top: 0,
                    left: 0,
                    bottom: 0,

                    height: "100vh",

                    width: {
                        xs: "82vw",
                        sm: 280,
                        md: 260
                    },

                    maxWidth: 320,

                    overflow: "hidden",

                    boxSizing: "border-box",

                    border: "none",

                    /*
                     * Paper navbar se bhi upar.
                     */
                    zIndex: (theme) =>
                        theme.zIndex.drawer + 3
                }
            }}
        >

            {/* ================================================= */}
            {/* SIDEBAR */}
            {/* ================================================= */}

            <Box
                sx={{
                    width: "100%",

                    height: "100%",

                    minHeight: "100vh",

                    background:
                        "linear-gradient(180deg,#1565C0,#512DA8)",

                    color: "white",

                    display: "flex",

                    flexDirection: "column",

                    overflow: "hidden",

                    boxSizing: "border-box"
                }}
            >

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <Box
                    sx={{
                        flexShrink: 0,

                        p: {
                            xs: 2,
                            sm: 3
                        },

                        textAlign: "center",

                        display: "flex",

                        flexDirection: "column",

                        alignItems: "center",

                        justifyContent: "center"
                    }}
                >

                    {/* SCHOOL ICON */}

                    <SchoolIcon
                        sx={{
                            display: "block",

                            color: "white",

                            width: {
                                xs: 45,
                                sm: 55
                            },

                            height: {
                                xs: 45,
                                sm: 55
                            },

                            mb: 1,

                            flexShrink: 0
                        }}
                    />


                    {/* TITLE */}

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            fontSize: {
                                xs: "1.7rem",
                                sm: "2.125rem"
                            },

                            lineHeight: 1.2,

                            whiteSpace: "nowrap"
                        }}
                    >
                        Student LMS
                    </Typography>


                    {/* SUBTITLE */}

                    <Typography
                        variant="body2"
                        sx={{
                            opacity: 0.8,

                            mt: 1,

                            fontSize: {
                                xs: "0.75rem",
                                sm: "0.875rem"
                            }
                        }}
                    >
                        Digital Library
                    </Typography>

                </Box>


                <Divider
                    sx={{
                        flexShrink: 0,

                        bgcolor:
                            "rgba(255,255,255,.25)"
                    }}
                />


                {/* ================================================= */}
                {/* MENU */}
                {/* ================================================= */}

                <List
                    disablePadding
                    sx={{
                        flexShrink: 0,

                        mt: {
                            xs: 1,
                            sm: 2
                        },

                        px: 0.5
                    }}
                >

                    {/* DASHBOARD */}

                    <ListItemButton
                        sx={menuStyle(
                            "/student/dashboard"
                        )}

                        onClick={() =>
                            navigateTo(
                                "/student/dashboard"
                            )
                        }
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",

                                minWidth: {
                                    xs: 42,
                                    sm: 48
                                }
                            }}
                        >
                            <DashboardIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Dashboard"
                        />

                    </ListItemButton>


                    {/* MY BOOKS */}

                    <ListItemButton
                        sx={menuStyle(
                            "/student/books"
                        )}

                        onClick={() =>
                            navigateTo(
                                "/student/books"
                            )
                        }
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",

                                minWidth: {
                                    xs: 42,
                                    sm: 48
                                }
                            }}
                        >
                            <MenuBookIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="My Books"
                        />

                    </ListItemButton>


                    {/* BORROW HISTORY */}

                    <ListItemButton
                        sx={menuStyle(
                            "/student/history"
                        )}

                        onClick={() =>
                            navigateTo(
                                "/student/history"
                            )
                        }
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",

                                minWidth: {
                                    xs: 42,
                                    sm: 48
                                }
                            }}
                        >
                            <HistoryIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Borrow History"
                        />

                    </ListItemButton>


                    {/* FINE HISTORY */}

                    <ListItemButton
                        sx={menuStyle(
                            "/student/fines"
                        )}

                        onClick={() =>
                            navigateTo(
                                "/student/fines"
                            )
                        }
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",

                                minWidth: {
                                    xs: 42,
                                    sm: 48
                                }
                            }}
                        >
                            <PaidIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Fine History"
                        />

                    </ListItemButton>


                    {/* NOTIFICATIONS */}

                    <ListItemButton
                        sx={menuStyle(
                            "/student/notifications"
                        )}

                        onClick={() =>
                            navigateTo(
                                "/student/notifications"
                            )
                        }
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",

                                minWidth: {
                                    xs: 42,
                                    sm: 48
                                }
                            }}
                        >
                            <NotificationsIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Notifications"
                        />

                    </ListItemButton>


                    {/* PROFILE */}

                    <ListItemButton
                        sx={menuStyle(
                            "/student/profile"
                        )}

                        onClick={() =>
                            navigateTo(
                                "/student/profile"
                            )
                        }
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",

                                minWidth: {
                                    xs: 42,
                                    sm: 48
                                }
                            }}
                        >
                            <PersonIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Profile"
                        />

                    </ListItemButton>

                </List>


                {/* ================================================= */}
                {/* FLEXIBLE SPACE */}
                {/* ================================================= */}

                <Box
                    sx={{
                        flexGrow: 1,
                        minHeight: 0
                    }}
                />


                <Divider
                    sx={{
                        flexShrink: 0,

                        bgcolor:
                            "rgba(255,255,255,.25)"
                    }}
                />


                {/* ================================================= */}
                {/* LOGOUT */}
                {/* ================================================= */}

                <List
                    disablePadding
                    sx={{
                        flexShrink: 0,

                        mb: {
                            xs: 1,
                            sm: 2
                        },

                        px: 0.5
                    }}
                >

                    <ListItemButton
                        sx={{
                            color: "white",

                            borderRadius: 3,

                            mx: {
                                xs: 0.75,
                                sm: 1
                            },

                            minHeight: 48,

                            transition: "0.25s",

                            "&:hover": {
                                bgcolor: "#E53935",

                                transform:
                                    "translateX(5px)"
                            },

                            "&:active": {
                                transform:
                                    "translateX(3px)"
                            }
                        }}

                        onClick={handleLogout}
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",

                                minWidth: {
                                    xs: 42,
                                    sm: 48
                                }
                            }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Logout"
                        />

                    </ListItemButton>

                </List>

            </Box>

        </Drawer>

    );
}

export default StudentSidebar;