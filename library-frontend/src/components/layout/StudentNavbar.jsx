import {
    AppBar,
    Toolbar,
    Typography,
    IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

function StudentNavbar({ openDrawer }) {

    return (

        <AppBar
            position="fixed"
            elevation={2}
            sx={{
                bgcolor: "#1565C0",

                width: "100%",

                /*
                 * Navbar normal layer par.
                 * Sidebar iska left portion cover karega.
                 */
                zIndex: (theme) =>
                    theme.zIndex.drawer + 1
            }}
        >

            <Toolbar
                sx={{
                    minHeight: {
                        xs: 56,
                        sm: 64
                    },

                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 3
                    }
                }}
            >

                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={openDrawer}
                    aria-label="open student menu"

                    sx={{
                        mr: {
                            xs: 1,
                            sm: 2
                        },

                        width: {
                            xs: 42,
                            sm: 46
                        },

                        height: {
                            xs: 42,
                            sm: 46
                        },

                        borderRadius: 2,

                        "&:hover": {
                            bgcolor:
                                "rgba(255,255,255,0.20)"
                        },

                        "&:active": {
                            bgcolor:
                                "rgba(255,255,255,0.30)"
                        }
                    }}
                >

                    <MenuIcon
                        sx={{
                            fontSize: {
                                xs: 25,
                                sm: 28
                            }
                        }}
                    />

                </IconButton>


                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",

                        flexGrow: 1,

                        minWidth: 0,

                        fontSize: {
                            xs: "1.1rem",
                            sm: "1.35rem",
                            md: "1.5rem"
                        },

                        whiteSpace: "nowrap",

                        overflow: "hidden",

                        textOverflow: "ellipsis"
                    }}
                >
                    Student Dashboard
                </Typography>

            </Toolbar>

        </AppBar>

    );
}

export default StudentNavbar;