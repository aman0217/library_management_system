import { useState } from "react";

import { Box } from "@mui/material";

import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";

function StudentDashboardLayout({ children }) {

    const [open, setOpen] = useState(false);

    return (

        <Box sx={{ display: "flex" }}>

            <StudentNavbar
                openDrawer={() => setOpen(true)}
            />

            <StudentSidebar
                open={open}
                closeDrawer={() => setOpen(false)}
            />

            <Box
                sx={{
                    flexGrow: 1,
                    mt: "64px",
                    p: 3,
                    width: "100%"
                }}
            >
                {children}
            </Box>

        </Box>

    );

}

export default StudentDashboardLayout;