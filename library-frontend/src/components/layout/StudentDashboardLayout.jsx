import { useState } from "react";

import { Box } from "@mui/material";

import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

function StudentDashboardLayout({ children }) {

    const [open, setOpen] = useState(false);

    const handleOpenDrawer = () => {
        setOpen(true);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };

    return (

        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                overflowX: "hidden",
                position: "relative"
            }}
        >

            {/* ================= NAVBAR ================= */}

            <StudentNavbar
                openDrawer={handleOpenDrawer}
                drawerOpen={open}
            />


            {/* ================= SIDEBAR ================= */}

            <StudentSidebar
                open={open}
                closeDrawer={handleCloseDrawer}
            />


            {/* ================= MAIN CONTENT ================= */}

            <Box
                component="main"
                sx={{
                    width: "100%",
                    minWidth: 0,
                    minHeight: "100vh",

                    /*
                     * Navbar ke neeche proper gap.
                     * 56px / 64px sirf navbar ki height hai.
                     * Iske baad content ko extra spacing bhi milegi.
                     */
                    pt: {
                        xs: "76px",
                        sm: "84px",
                        md: "88px"
                    },

                    px: {
                        xs: 1.5,
                        sm: 2,
                        md: 3
                    },

                    pb: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },

                    boxSizing: "border-box",

                    overflowX: "hidden"
                }}
            >

                {children}

            </Box>

        </Box>

    );
}

export default StudentDashboardLayout;