import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ open, onClose }) {

    const navigate = useNavigate();

    const location = useLocation();

    const menuStyle = (path) => ({

    color: "white",

    mx: 1,

    my: 0.5,

    borderRadius: 3,

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

    return (

<Drawer
    anchor="left"
    open={open}
    onClose={onClose}
   PaperProps={{
    sx: {
        width: {
            xs: "85vw",
            sm: 280,
            md: 260,
        },
        maxWidth: 320,
        height: "100vh",
        overflow: "hidden",
    }
}}
>

<Box
     sx={{
        width: "100%",
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
        p:3,
        textAlign:"center"
    }}
>
     <SchoolIcon
                        sx={{
                            fontSize: 55,
                            mb: 0.2
                        }}
                    />

   
    <Typography
        variant="body2"
        color = "white"
        sx={{
            opacity:.9,
            mt:0.5,
            fontSize: 18,
        }}
    >
        Admin Control Panel
    </Typography>

</Box>
<Divider
    sx={{
        mx: 2,
        bgcolor: "rgba(255,255,255,.20)"
    }}
/>
            <List>

                <ListItemButton
                   sx={{
    ...menuStyle("/admin/dashboard"),

    mx:1,

    borderRadius:3,

    transition:".3s",

    "&:hover":{

    bgcolor:"rgba(255,255,255,.20)",

    transform:"translateX(4px)",

    boxShadow:"0 8px 20px rgba(30,136,229,.30)"

}
}}
                   onClick={() => {

    navigate("/admin/dashboard");

    onClose();

}}
                >
                 <ListItemIcon
    sx={{
        color: "white"
    }}
>
                        <DashboardIcon />
                    </ListItemIcon>

                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton
                    sx={{
    ...menuStyle("/admin/books"),

    mx:1,

    borderRadius:3,

    transition:".3s",

"&:hover":{

    bgcolor:"rgba(255,255,255,.20)",

    transform:"translateX(4px)",

    boxShadow:"0 8px 20px rgba(30,136,229,.30)"

}
}}
                    onClick={() => {

    navigate("/admin/books");

    onClose();

}}
                >
<ListItemIcon
    sx={{
        color: "white"
    }}
>
                        <MenuBookIcon />
                    </ListItemIcon>

                    <ListItemText primary="Books" />
                </ListItemButton>

                <ListItemButton
                    sx={{
    ...menuStyle("/admin/users"),

    mx:1,

    borderRadius:3,

    transition:".3s",

"&:hover":{

    bgcolor:"rgba(255,255,255,.20)",

    transform:"translateX(4px)",

    boxShadow:"0 8px 20px rgba(30,136,229,.30)"

}
}}
                    onClick={() => {

    navigate("/admin/users");

    onClose();

}}
                >
                  <ListItemIcon
    sx={{
        color: "white"
    }}
>
                        <PeopleIcon />
                    </ListItemIcon>

                    <ListItemText primary="Users" />
                </ListItemButton>

                <ListItemButton
                   sx={{
    ...menuStyle("/admin/borrow"),

    mx:1,

    borderRadius:3,

    transition:".3s",

"&:hover":{

    bgcolor:"rgba(255,255,255,.20)",

    transform:"translateX(4px)",

    boxShadow:"0 8px 20px rgba(30,136,229,.30)"

}
}}
                   onClick={() => {

    navigate("/admin/borrow");

    onClose();

}}
                >
<ListItemIcon
    sx={{
        color: "white"
    }}
>
                        <SwapHorizIcon />
                    </ListItemIcon>

                    <ListItemText primary="Borrow / Return" />
                </ListItemButton>

                <ListItemButton
                   sx={{
    ...menuStyle("/admin/reports"),

    mx:1,

    borderRadius:3,

    transition:".3s",

"&:hover":{

    bgcolor:"rgba(255,255,255,.20)",

    transform:"translateX(4px)",

    boxShadow:"0 8px 20px rgba(30,136,229,.30)"

}
}}
onClick={() => {

    navigate("/admin/reports");

    onClose();

}}
                >
<ListItemIcon
    sx={{
        color: "white"
    }}
>
                        <BarChartIcon />
                    </ListItemIcon>

                    <ListItemText primary="Reports" />
                </ListItemButton>

                <ListItemButton
                    sx={{
    ...menuStyle("/admin/profile"),

    mx:1,

    borderRadius:3,

    transition:".3s",

   "&:hover":{

    bgcolor:"rgba(255,255,255,.20)",

    transform:"translateX(4px)",

    boxShadow:"0 8px 20px rgba(30,136,229,.30)"

}
}}
                    onClick={() => {

    navigate("/admin/profile");

    onClose();

}}
                >
<ListItemIcon
    sx={{
        color: "white"
    }}
>
                        <PersonIcon />
                    </ListItemIcon>

                    <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton
                   sx={{
    ...menuStyle("/admin/notifications"),

    mx:1,

    borderRadius:3,

    transition:".3s",

"&:hover":{

    bgcolor:"rgba(255,255,255,.20)",

    transform:"translateX(4px)",

    boxShadow:"0 8px 20px rgba(30,136,229,.30)"

}
}}
                    onClick={() => {

    navigate("/admin/notifications");

    onClose();

}}
                >
<ListItemIcon
    sx={{
        color: "white"
    }}
>
                       
                        <NotificationsIcon />
                    </ListItemIcon>

                    <ListItemText primary="Notifications" />
                </ListItemButton>

            </List>

           <Box sx={{ flexGrow: 1 }} />

<Divider
    sx={{
        mx: 2,
        mb: 1,
        bgcolor: "rgba(255,255,255,.20)"
    }}
/>

            <List>

                <ListItemButton
                    sx={{

color:"#fff",

mx:1,

borderRadius:3,

"&:hover":{

bgcolor:"#DC2626",


}

}}
                    onClick={() => {

    localStorage.clear();

    navigate("/");

}}
                >
                 <ListItemIcon
    sx={{
        color: "white"
    }}
>

                        <LogoutIcon />
                    </ListItemIcon>

                    <ListItemText primary="Logout" />

                </ListItemButton>

            </List>

        </Box>
        </Drawer>

    );

}

export default Sidebar;