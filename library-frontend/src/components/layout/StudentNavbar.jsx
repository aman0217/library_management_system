import {

    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Avatar,
    Chip

} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

function StudentNavbar({ openDrawer }) {

    return (

        <AppBar
            position="fixed"
            elevation={2}
            sx={{
                bgcolor: "#1565C0"
            }}
        >

            <Toolbar>

                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={openDrawer}
                    sx={{ mr: 2 }}
                >

                    <MenuIcon />

                </IconButton>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        flexGrow: 1
                    }}
                >

                    Student Dashboard

                </Typography>
                

            </Toolbar>

        </AppBar>

    );

}

export default StudentNavbar;