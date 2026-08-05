import { useEffect, useState } from "react";
import BookDetailsDialog from "../../components/student/BookDetailsDialog";
import {
Box,
Typography,
Card,
CardContent,
Grid,
CircularProgress,

TextField,
InputAdornment,

ToggleButton,
ToggleButtonGroup,

Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,

Paper,
Chip,
Button

} from "@mui/material";
import {
    getBorrowHistoryBookDetails
} from "../../services/dashboardService";
import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaidIcon from "@mui/icons-material/Paid";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SearchIcon from "@mui/icons-material/Search";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar } from "@mui/material";

import {

    getFineHistory

} from "../../services/dashboardService";

import {

    getCurrentUser

} from "../../services/userService";

function StudentFineHistory() {

    const [loading, setLoading] = useState(true);

    const [fineHistory, setFineHistory] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

const [dialogOpen, setDialogOpen] = useState(false);
const [search, setSearch] = useState("");

const [filter, setFilter] = useState("ALL");

const [filteredHistory, setFilteredHistory] = useState([]);

useEffect(() => {

    let data = [...fineHistory];

    if (filter !== "ALL") {

        data = data.filter(

            fine => fine.status === filter

        );

    }

    if (search.trim() !== "") {

        data = data.filter(

            fine =>

                fine.bookTitle
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                fine.author
                    .toLowerCase()
                    .includes(search.toLowerCase())

        );

    }

    setFilteredHistory(data);

}, [search, filter, fineHistory]);
const handleView = async (issueId) => {

    try {

        const data =
            await getBorrowHistoryBookDetails(issueId);

        setSelectedBook(data);

        setDialogOpen(true);

    }

    catch (error) {

        console.error(error);

    }

};
    const loadFineHistory = async () => {

        try {

            const user = await getCurrentUser();

            const data = await getFineHistory(user.id);

            setFineHistory(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadFineHistory();

    }, []);

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    display="flex"
                    justifyContent="center"
                    mt={8}
                >

                    <CircularProgress />

                </Box>

            </StudentDashboardLayout>

        );

    }

    const totalFineRecords = fineHistory.length;

    const unpaidFine = fineHistory.filter(

        fine => fine.status === "UNPAID"

    ).length;

    const paidFine = fineHistory.filter(

        fine => fine.status === "PAID"

    ).length;

    const totalAmount = fineHistory.reduce(

        (sum, fine) => sum + fine.fineAmount,

        0

    );

    return (

        <StudentDashboardLayout>

<Card
sx={{
mb:4,
borderRadius:5,
background:"linear-gradient(135deg,#E53935,#8E24AA)",
color:"#fff"
}}
>

<CardContent>

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch"
    }}
>

    {/* LEFT */}
    <Box>

        <Typography
            variant="h4"
            fontWeight="bold"
        >
            💰 Fine History
        </Typography>

        <Typography mt={1}>
            View all your fine records.
        </Typography>

        <ReceiptLongIcon
            sx={{
                fontSize: 60,
                mt: 1.5,
                ml: 0.5
            }}
        />

    </Box>

    {/* RIGHT */}
    <Box
        sx={{
            minWidth: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >

        <Avatar
            sx={{
                width: 80,
                height: 80,
                bgcolor: "#fff",
                color: "#1976d2"
            }}
        >
            <CurrencyRupeeIcon sx={{ fontSize: 48 }} />
        </Avatar>

    </Box>

</Box>

</CardContent>

</Card>

<Grid container spacing={3} mb={4}>
    <Grid size={{ xs:12, sm:6, md:3 }}>

<Card
sx={{
minHeight:165,
borderRadius:5,
background:"linear-gradient(135deg,#5C6BC0,#3949AB)",
color:"#fff",
boxShadow:"0 10px 25px rgba(57,73,171,.35)",
transition:".35s",

"&:hover":{
transform:"translateY(-8px) scale(1.03)",
boxShadow:"0 18px 35px rgba(57,73,171,.45)"
}
}}
>

<CardContent
sx={{
height:"100%",
py:3,
px:3
}}
>

<Box
display="flex"
justifyContent="space-between"
alignItems="center"
>

<Box>

<Typography
sx={{
color:"rgba(255,255,255,.85)"
}}
>
Total Records
</Typography>

<Typography
variant="h3"
fontWeight="bold"
mt={1.5}
>
{totalFineRecords}
</Typography>

</Box>

<Box
sx={{
width:60,
height:60,
borderRadius:"50%",
bgcolor:"rgba(255,255,255,.18)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<ReceiptLongIcon
sx={{
fontSize:34,
color:"#fff"
}}
/>

</Box>

</Box>

</CardContent>

</Card>

</Grid>

<Grid size={{ xs:12, sm:6, md:3 }}>

<Card
sx={{
minHeight:165,
borderRadius:5,
background:"linear-gradient(135deg,#EF5350,#C62828)",
color:"#fff",
boxShadow:"0 10px 25px rgba(198,40,40,.35)",
transition:".35s",

"&:hover":{
transform:"translateY(-8px) scale(1.03)",
boxShadow:"0 18px 35px rgba(198,40,40,.45)"
}
}}
>

<CardContent
sx={{
height:"100%",
py:3,
px:3
}}
>

<Box
display="flex"
justifyContent="space-between"
alignItems="center"
>

<Box>

<Typography
sx={{
color:"rgba(255,255,255,.85)"
}}
>
Unpaid
</Typography>

<Typography
variant="h3"
fontWeight="bold"
mt={1.5}
>
{unpaidFine}
</Typography>

</Box>

<Box
sx={{
width:60,
height:60,
borderRadius:"50%",
bgcolor:"rgba(255,255,255,.18)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<MoneyOffIcon
sx={{
fontSize:34,
color:"#fff"
}}
/>

</Box>

</Box>

</CardContent>

</Card>

</Grid>

<Grid size={{ xs:12, sm:6, md:3 }}>

<Card
sx={{
minHeight:165,
borderRadius:5,
background:"linear-gradient(135deg,#66BB6A,#2E7D32)",
color:"#fff",
boxShadow:"0 10px 25px rgba(46,125,50,.35)",
transition:".35s",

"&:hover":{
transform:"translateY(-8px) scale(1.03)",
boxShadow:"0 18px 35px rgba(46,125,50,.45)"
}
}}
>

<CardContent
sx={{
height:"100%",
py:3,
px:3
}}
>

<Box
display="flex"
justifyContent="space-between"
alignItems="center"
>

<Box>

<Typography
sx={{
color:"rgba(255,255,255,.85)"
}}
>
Paid
</Typography>

<Typography
variant="h3"
fontWeight="bold"
mt={1.5}
>
{paidFine}
</Typography>

</Box>

<Box
sx={{
width:60,
height:60,
borderRadius:"50%",
bgcolor:"rgba(255,255,255,.18)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<PaidIcon
sx={{
fontSize:34,
color:"#fff"
}}
/>

</Box>

</Box>

</CardContent>

</Card>

</Grid>

<Grid size={{ xs:12, sm:6, md:3 }}>

<Card
sx={{
minHeight:165,
borderRadius:5,
background:"linear-gradient(135deg,#FF9800,#EF6C00)",
color:"#fff",
boxShadow:"0 10px 25px rgba(239,108,0,.35)",
transition:".35s",

"&:hover":{
transform:"translateY(-8px) scale(1.03)",
boxShadow:"0 18px 35px rgba(239,108,0,.45)"
}
}}
>

<CardContent
sx={{
height:"100%",
py:3,
px:3
}}
>

<Box
display="flex"
justifyContent="space-between"
alignItems="center"
>

<Box>

<Typography
sx={{
color:"rgba(255,255,255,.85)"
}}
>
Total Fine
</Typography>

<Typography
variant="h3"
fontWeight="bold"
mt={1.5}
>

₹{totalAmount}

</Typography>

</Box>

<Box
sx={{
width:60,
height:60,
borderRadius:"50%",
bgcolor:"rgba(255,255,255,.18)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<CurrencyRupeeIcon
sx={{
fontSize:34,
color:"#fff"
}}
/>

</Box>

</Box>

</CardContent>

</Card>

</Grid>

</Grid>

<Box
    sx={{
        mt: 5,          // Cards → Search
        mb: 4,          // Search → Table
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: {
            xs: "wrap",
            md: "nowrap"
        }
    }}
>
<TextField
    fullWidth
    placeholder="Search Book or Author..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    InputProps={{
        startAdornment:(
            <InputAdornment position="start">
                <SearchIcon/>
            </InputAdornment>
        )
    }}
/>

<ToggleButtonGroup

    exclusive

    value={filter}

    onChange={(e,value)=>{

        if(value){

            setFilter(value);

        }

    }}

    color="primary"

    sx={{

        "& .MuiToggleButton-root":{

            minWidth:110,

            height:56,

            fontWeight:"bold",

            textTransform:"none"

        }

    }}

>

<ToggleButton value="ALL">

All

</ToggleButton>

<ToggleButton value="PAID">

Paid

</ToggleButton>

<ToggleButton value="UNPAID">

Unpaid

</ToggleButton>

</ToggleButtonGroup>

</Box>
<TableContainer
component={Paper}
sx={{
borderRadius:4,
boxShadow:4
}}
>

<Table>

<TableHead>

<TableRow>

<TableCell><b>Book</b></TableCell>

<TableCell><b>Author</b></TableCell>

<TableCell><b>Issue Date</b></TableCell>

<TableCell><b>Due Date</b></TableCell>

<TableCell><b>Return Date</b></TableCell>

<TableCell><b>Late Days</b></TableCell>

<TableCell><b>Fine</b></TableCell>

<TableCell><b>Status</b></TableCell>

<TableCell align="center"><b>Action</b></TableCell>

</TableRow>

</TableHead>

<TableBody>

{

filteredHistory.length===0 ?

(

<TableRow>

<TableCell
colSpan={9}
align="center"
>

<Typography py={5}>

No Fine History Found

</Typography>

</TableCell>

</TableRow>

)

:

(

filteredHistory.map(fine=>(

<TableRow
hover
key={fine.issueId}
>

<TableCell>

{fine.bookTitle}

</TableCell>

<TableCell>

{fine.author}

</TableCell>

<TableCell>

{fine.issueDate}

</TableCell>

<TableCell>

{fine.dueDate}

</TableCell>

<TableCell>

{fine.returnDate}

</TableCell>

<TableCell>

{fine.lateDays}

</TableCell>

<TableCell>

<Typography
fontWeight="bold"
color="error.main"
>

₹{fine.fineAmount}

</Typography>

</TableCell>

<TableCell>

<Chip

label={fine.status}

color={
fine.status==="PAID"
?
"success"
:
"error"
}

sx={{

width:110,

fontWeight:"bold",

"& .MuiChip-label":{

width:"100%",

textAlign:"center"

}

}}

 />

</TableCell>

<TableCell align="center">

<Button

variant="contained"

size="small"

startIcon={<VisibilityIcon />}

onClick={() => handleView(fine.issueId)}

>

View

</Button>

</TableCell>

</TableRow>

))

)

}

</TableBody>

</Table>

</TableContainer>
<BookDetailsDialog

    open={dialogOpen}

    onClose={() => setDialogOpen(false)}

    book={selectedBook}

/>

</StudentDashboardLayout>

);

}

export default StudentFineHistory;