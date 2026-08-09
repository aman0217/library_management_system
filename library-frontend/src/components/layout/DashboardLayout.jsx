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
        mt: { xs: "64px", sm: "70px" },
        p: {
            xs: 1.5,
            sm: 2,
            md: 3,
        },
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        bgcolor: "#F5F7FB",
        minHeight: "100vh",
        boxSizing: "border-box",
    }}
>
    {children}
</Box>

        </>

    );

}

export default DashboardLayout;