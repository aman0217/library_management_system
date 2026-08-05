import { useEffect, useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LinearProgress from "@mui/material/LinearProgress";
import { getDueSoonBooks } from "../../services/dashboardService";
import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";
import { useNavigate } from "react-router-dom";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Avatar,
    Stack,
    Chip,
    Button
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PaidIcon from "@mui/icons-material/Paid";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { getStudentDashboard } from "../../services/dashboardService";
import { getCurrentUser } from "../../services/userService";

function StudentDashboard() {

    const [stats, setStats] = useState(null);
    const [user, setUser] = useState(null);
    const [dueSoonBooks, setDueSoonBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        loadDashboard();

    }, []);

const loadDashboard = async () => {

    try {

        // 1. Current User lao
        const userData = await getCurrentUser();

        console.log("Current User =", userData);

        if (!userData) {

            console.error("User is null");

            return;

        }

        // 2. State me store karo
        setUser(userData);

        // 3. Dashboard Stats lao
        const dashboardData = await getStudentDashboard(userData.id);

        setStats(dashboardData);

        // 4. Due Soon Books lao
        const dueSoon = await getDueSoonBooks(userData.id);
        setDueSoonBooks(dueSoon);

    }

    catch (error) {

        console.error(error);

    }

};
    const today = new Date().toLocaleDateString("en-IN", {

    weekday: "long",

    day: "numeric",

    month: "long",

    year: "numeric"

});
    const getChipColor = (days) => {

    if (days <= 1) return "error";

    if (days <= 2) return "warning";

    if (days <= 4) return "info";

    return "success";

};

const getProgressValue = (days) => {

    if (days <= 1) return 100;

    if (days <= 2) return 80;

    if (days <= 4) return 60;

    return 35;

};

    if (!stats || !user) {

        return (

            <StudentDashboardLayout>

                <Box
    sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5
    }}
>
    <CircularProgress />
</Box>
            </StudentDashboardLayout>

        );

    }
    

    return (

        <StudentDashboardLayout>

          <Card
    sx={{
        mb: 4,
        borderRadius: 5,
        overflow: "hidden",
        background:
            "linear-gradient(135deg,#1565C0,#512DA8)",
        color: "white",
        boxShadow: 8
    }}
>
    <CardContent sx={{ p: 5 }}>
<Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
        minHeight: 210,
        px: 2
    }}
><Box
    sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }}
>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >

                    Welcome Back 👋

                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        mt: 1,
                        fontWeight: 600
                    }}
                >

                    {user.firstName} {user.lastName}

                </Typography>

                <Typography
                    sx={{
                        mt: 2,
                        opacity: .9,
                        fontSize: 16
                    }}
                >

                    Keep learning and enjoy reading.

                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        opacity: .85
                    }}
                >

                    {today}

                </Typography>

                <Chip
                    label="Library Membership Active"
                    color="success"
                    sx={{
                        mt: 3,
                        fontWeight: "bold"
                    }}
                />

            </Box>

        <Box
    sx={{
        width: 180,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
>
    <Avatar
        sx={{
            width: 130,
            height: 130,
            fontSize: 52,
            fontWeight: "bold",
            bgcolor: "#fff",
            color: "#1565C0",
            boxShadow: "0 12px 35px rgba(0,0,0,.35)",
            border: "5px solid rgba(255,255,255,.45)",
            transition: ".35s",

            "&:hover": {
                transform: "scale(1.08) rotate(5deg)"
            }
        }}
    >
        {stats.firstName?.charAt(0).toUpperCase()}
    </Avatar>
</Box>

        </Stack>

    </CardContent>

</Card>
 <Box sx={{ mt:4, mb:4 }}>

<Card

sx={{

borderRadius:5,

overflow:"hidden",

boxShadow:6,

transition:"0.35s",

"&:hover":{

transform:"translateY(-4px)",

boxShadow:10

}

}}

>

<Box

sx={{

background:"linear-gradient(135deg,#ff9800,#ff5722)",

color:"white",

p:2.5,

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>

<Box  sx={{
        display: "flex",
        alignItems: "center"
    }}>

<WarningAmberIcon sx={{ mr:1,fontSize:32 }}/>

<Box>

<Typography

variant="h5"

fontWeight="bold"

>

Due Soon Alerts

</Typography>

<Typography>

Return these books before due date

</Typography>

</Box>

</Box>

<Button
    variant="contained"
    color="success"
    size="medium"
    onClick={() => navigate("/student/books")}
    sx={{
        fontWeight: "bold",
        borderRadius: 3,
        px: 3,
        textTransform: "none",
        boxShadow: 3,
        "&:hover": {
            boxShadow: 6
        }
    }}
>

    View All

</Button>

</Box>

<CardContent>

{
dueSoonBooks.length===0 ?

<Box

textAlign="center"

py={5}

>

<Typography variant="h2">

🎉

</Typography>

<Typography

variant="h5"

fontWeight="bold"

mt={2}

>

Great!

</Typography>

<Typography color="text.secondary">

No books are due soon.

</Typography>

</Box>

:

dueSoonBooks.map(book=>(

<Card

key={book.issueId}

sx={{

mb:2,

borderRadius:4,

boxShadow:2,

transition:"0.3s",

"&:hover":{

transform:"scale(1.01)"

}

}}

>

<CardContent>

<Box

 sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}
>

<Box

display="flex"

alignItems="center"

>

<Avatar

sx={{

mr:2,

bgcolor:"#1976d2"

}}

>

<MenuBookIcon/>

</Avatar>

<Box>

<Typography

fontWeight="bold"

fontSize={18}

>

{book.booktitle}

</Typography>

<Typography

variant="body2"

color="text.secondary"

>

Due :

{book.dueDate}

</Typography>

</Box>

</Box>

<Chip

label={`${book.remainingDays} Days Left`}

color={getChipColor(book.remainingDays)}

/>

</Box>

<LinearProgress

variant="determinate"

value={getProgressValue(book.remainingDays)}

color={getChipColor(book.remainingDays)}

sx={{

mt:2,

height:8,

borderRadius:5

}}

/>

<Box

display="flex"

justifyContent="flex-end"

mt={2}

>

<Button

variant="outlined"

size="small"

>

Return Now

</Button>

</Box>

</CardContent>

</Card>

))

}

</CardContent>

</Card>

</Box>

<Grid
    container
    spacing={3}
    sx={{
        width: "100%",
        mt: 1
    }}
>

          <Grid
    size={{
        xs: 12,
        sm: 6,
        md: 3
    }}
>

<Card
    onClick={() => navigate("/student/books")}
    sx={{

        height: 270,

        borderRadius: 5,

        background: "linear-gradient(135deg,#42A5F5,#1E88E5)",

        color: "#fff",

        position: "relative",

        overflow: "hidden",

        cursor: "pointer",

        transition: "0.35s",

        "&:hover": {

            transform: "translateY(-10px) scale(1.02)",

            boxShadow: "0 20px 40px rgba(0,0,0,.25)"

        }

    }}
>

<Box
sx={{
position:"absolute",
right:-25,
top:-25,
width:120,
height:120,
borderRadius:"50%",
background:"rgba(255,255,255,.15)"
}}
/>

<CardContent
    sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }}
>

<MenuBookIcon sx={{fontSize:55}}/>

<Box>

<Typography
variant="h3"
fontWeight="bold"
>

{stats.borrowedBooks}

</Typography>

<Typography
fontSize={18}
>

Borrowed Books

</Typography>

</Box>
<Box sx={{ flexGrow: 1 }} />
<Button

    variant="contained"

    endIcon={<ArrowForwardIcon />}

    onClick={(e) => {

        e.stopPropagation();

        navigate("/student/books");

    }}

    sx={{

        alignSelf: "start",

        bgcolor: "#fff",

        color: "#1976d2",

        fontWeight: "bold",

        borderRadius: 3,

        px: 3,

        "&:hover": {

            bgcolor: "#f5f5f5",

            transform: "translateX(4px)"

        }

    }}

>

    View Details

</Button>

</CardContent>

</Card>

</Grid>
              <Grid
    size={{
        xs: 12,
        sm: 6,
        md: 3
    }}
>

<Card
sx={{
height:270,
borderRadius:5,
background:"linear-gradient(135deg,#66BB6A,#2E7D32)",
color:"#fff",
position:"relative",
overflow:"hidden",
transition:"0.35s",
"&:hover":{
transform:"translateY(-10px) scale(1.02)",
boxShadow:"0 20px 40px rgba(0,0,0,.25)"
}
}}
>

<Box
sx={{
position:"absolute",
right:-25,
top:-25,
width:120,
height:120,
borderRadius:"50%",
background:"rgba(255,255,255,.15)"
}}
/>

<CardContent
    sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }}
>

<AssignmentReturnIcon sx={{fontSize:55}}/>

<Box>

<Typography
variant="h3"
fontWeight="bold"
>

{stats.returnedBooks}

</Typography>

<Typography
fontSize={18}
>

Returned Books

</Typography>

</Box>
<Box sx={{ flexGrow: 1 }} />
<Button
    variant="contained"
    endIcon={<ArrowForwardIcon />}
    onClick={(e) => {

        e.stopPropagation();

        navigate("/student/returned-books");

    }}
    sx={{

        alignSelf: "start",

        bgcolor: "#fff",

        color: "#1976d2",

        fontWeight: "bold",

        borderRadius: 3,

        px: 3,

        "&:hover": {

            bgcolor: "#f5f5f5",

            transform: "translateX(4px)"

        }

    }}
>

    View History

</Button>

</CardContent>

</Card>

</Grid>

           <Grid
    size={{
        xs: 12,
        sm: 6,
        md: 3
    }}
>


<Card
    sx={{
        height: 270,
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
        background:
            "linear-gradient(135deg,#ef5350,#c62828)",
        color: "#fff",
        transition: "0.35s",
        cursor: "pointer",
        "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 20px 35px rgba(0,0,0,.25)"
        }
    }}
>

<CardContent
    sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }}
>
<Box
    sx={{
        position: "absolute",
        right: -25,
        top: -25,
        width: 110,
        height: 110,
        borderRadius: "50%",
        bgcolor: "rgba(255,255,255,.15)"
    }}
/>

<PaidIcon
    sx={{
        fontSize: 55,
        color: "#fff"
    }}
/>

<Box>

<Typography
    variant="h3"
    fontWeight="bold"
>

₹ {stats.pendingFine}

</Typography>

<Typography
    sx={{
        opacity: .9,
        mt: 1,
        fontSize: 18
    }}
>

Pending Fine

</Typography>

<Typography
    variant="body2"
    sx={{
        opacity: .75,
        mt: 1
    }}
>

Please clear your dues.

</Typography>

</Box>
<Box sx={{ flexGrow: 1 }} />
<Button
    variant="contained"
    endIcon={<ArrowForwardIcon />}
    sx={{
        alignSelf: "flex-start",
        bgcolor: "#fff",
        color: "#c62828",
        fontWeight: "bold",
        borderRadius: 3,
        px: 3,
        "&:hover": {
            bgcolor: "#f5f5f5"
        }
    }}
>

Pay Now

</Button>

</CardContent>

</Card>              </Grid>

<Grid
    size={{
        xs: 12,
        sm: 6, 
        md: 3
    }}
>

<Card
    sx={{

        height: 270,

        borderRadius: 5,

        background:
            "linear-gradient(135deg,#F59E0B,#F97316)",

        color: "#fff",

        overflow: "hidden",

        position: "relative",

        transition: ".35s",

        "&:hover": {

            transform: "translateY(-8px) scale(1.03)",

            boxShadow: "0 20px 40px rgba(0,0,0,.25)"

        }

    }}
>

<CardContent
    sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }}
>

<Box
    sx={{

        width: 65,

        height: 65,

        borderRadius: "50%",

        bgcolor: "rgba(255,255,255,.18)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center"

    }}
>

<NotificationsIcon sx={{ fontSize: 38 }} />

</Box>

<Typography
    variant="h3"
    fontWeight="bold"
    mt={2}
>

    {stats.unreadNotifications}

</Typography>

<Typography
    mt={1}
    sx={{
        fontSize: 17,
        fontWeight: 500
    }}
>

    Unread Notifications

</Typography>

<Typography
    sx={{
        mt: 1,
        opacity: .9
    }}
>

    Latest activity waiting for you

</Typography>

<Box sx={{ flexGrow: 1 }} />

<Button
    variant="contained"
    endIcon={<ArrowForwardIcon />}
    onClick={(e) => {

        e.stopPropagation();

        navigate("/student/notifications");

    }}
    sx={{

        alignSelf: "start",

        bgcolor: "#fff",

        color: "#1976d2",

        fontWeight: "bold",

        borderRadius: 3,

        px: 3,

        "&:hover": {

            bgcolor: "#f5f5f5",

            transform: "translateX(4px)"

        }

    }}
>

    Open

</Button>
</CardContent>

</Card>

</Grid>

            </Grid>

        </StudentDashboardLayout>

    );

}

export default StudentDashboard;