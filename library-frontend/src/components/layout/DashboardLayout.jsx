import { useState } from "react";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {

    const [open, setOpen] = useState(false);

    return (

        <>

            <Navbar
                onMenuClick={() => setOpen(true)}
            />

            <Sidebar
                open={open}
                onClose={() => setOpen(false)}
            />

            <Box
                sx={{
                    mt: "70px",
                    p: 3,
                    width: "100%",
                    bgcolor: "#F5F7FB",
                    minHeight: "100vh"
                }}
            >

                {children}

            </Box>

        </>

    );

}

export default DashboardLayout;