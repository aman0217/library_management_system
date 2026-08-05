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

        const interval = setInterval(loadNotifications, 5000);

        return () => clearInterval(interval);

    }, [currentUser]);

    const loadCurrentUser = async () => {

        try {

            const user = await getCurrentUser();

            setCurrentUser(user);

        }

        catch (err) {

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

        }

        catch (err) {

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

            <Toolbar>

                <IconButton

                    color="inherit"

                    edge="start"

                    onClick={onMenuClick}

                    sx={{

                        mr:2,

                        "&:hover":{

                            bgcolor:"rgba(255,255,255,.25)"

                        }

                    }}

                >

                    <MenuIcon/>

                </IconButton>

                <Box sx={{flexGrow:1}}>

                    <Typography

                        variant="h5"

                        fontWeight="bold"

                    >

                        📚 Library Management System

                    </Typography>

                    <Typography

                        variant="body2"

                        sx={{opacity:.8}}

                    >

                        Administration Panel

                    </Typography>

                </Box>

                <IconButton

                    color="inherit"

                    onClick={(e)=>setAnchorEl(e.currentTarget)}

                >

                    <Badge

                        badgeContent={unreadCount}

                        color="error"

                    >

                        <NotificationsIcon/>

                    </Badge>

                </IconButton>

                <Box

                    sx={{

                        display:"flex",

                        alignItems:"center",

                        ml:3,

                        gap:1.5

                    }}

                >

                    <Avatar

                        sx={{

                            bgcolor:"#fff",

                            color:"#1976D2"

                        }}

                    >

                        <AdminPanelSettingsIcon/>

                    </Avatar>

                    <Box>

                        <Typography

                            fontWeight="bold"

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

                <Menu

                    anchorEl={anchorEl}

                    open={open}

                    onClose={()=>setAnchorEl(null)}

                    slotProps={{
                        paper:{
                            sx:{
                                width:380,
                                maxHeight:500,
                                borderRadius:3
                            }
                        }
                    }}

                >

                    <Typography

                        sx={{

                            p:2,

                            fontWeight:"bold"

                        }}

                    >

                        Notifications

                    </Typography>

                    <Divider/>

                    {

                        notifications.length===0 ?

                        (

                            <MenuItem>

                                No Notifications

                            </MenuItem>

                        )

                        :

                        notifications.map(notification=>(

                            <MenuItem

                                key={notification.id}

                                sx={{

                                    display:"block",

                                    whiteSpace:"normal",

                                    bgcolor:

                                        notification.read

                                            ?"inherit"

                                            :"#f5f5f5"

                                }}

                                onClick={()=>{

                                    if(!notification.read){

                                        markAsRead(notification.id);

                                        loadNotifications();

                                    }

                                }}

                            >

                                <Box

                                    sx={{

                                        display:"flex",

                                        justifyContent:"space-between"

                                    }}

                                >

                                    <Typography fontWeight="bold">

                                        {notification.title}

                                    </Typography>

                                    <IconButton

                                        size="small"

                                        color="error"

                                        onClick={(e)=>{

                                            e.stopPropagation();

                                            deleteNotification(notification.id);

                                            loadNotifications();

                                        }}

                                    >

                                        <DeleteIcon fontSize="small"/>

                                    </IconButton>

                                </Box>

                                <Typography variant="body2">

                                    {notification.message}

                                </Typography>

                                <Typography

                                    variant="caption"

                                >

                                    {notification.createdAt}

                                </Typography>

                            </MenuItem>

                        ))

                    }

                </Menu>

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;