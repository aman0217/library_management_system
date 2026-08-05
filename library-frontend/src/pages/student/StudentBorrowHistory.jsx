import { useEffect, useState } from "react";
import BookDetailsDialog from "../../components/student/BookDetailsDialog";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";


import {
    getBorrowHistoryBookDetails
} from "../../services/dashboardService";
import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";

import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    InputAdornment,
    CircularProgress,
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
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
    getBorrowHistory
} from "../../services/dashboardService";

import {
    getCurrentUser
} from "../../services/userService";

function StudentBorrowHistory() {

    const [loading, setLoading] = useState(true);

    const [history, setHistory] = useState([]);

    const [filteredHistory, setFilteredHistory] = useState([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");
    const [openDialog, setOpenDialog] = useState(false);

const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const user = await getCurrentUser();

            const data = await getBorrowHistory(user.id);

            console.log("Borrow History =", data);

            setHistory(data);

            setFilteredHistory(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const getStatusColor = (status) => {

        switch (status) {

            case "ACTIVE":
                return "success";

            case "RETURNED":
                return "info";

            case "OVERDUE":
                return "error";

            case "DUE SOON":
                return "warning";

            default:
                return "default";

        }

    };
    const handleView = async (issueId) => {

    try {

        const data =
            await getBorrowHistoryBookDetails(issueId);

        setSelectedBook(data);

        setOpenDialog(true);

    }

    catch (error) {

        console.error(error);

    }

};

    const applyFilters = (searchValue, statusValue) => {

        let data = [...history];

        if (statusValue !== "ALL") {

            data = data.filter(

                book => book.status === statusValue

            );

        }

        if (searchValue.trim() !== "") {

            data = data.filter(

                book =>

                    book.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())

                    ||

                    book.author
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())

            );

        }

        setFilteredHistory(data);

    };

    const handleSearch = (value) => {

        setSearch(value);

        applyFilters(value, filter);

    };

    const handleFilter = (_, value) => {

        if (!value) return;

        setFilter(value);

        applyFilters(search, value);

    };

    const totalBorrowed = history.length;

    const activeBooks = history.filter(
        b => b.status === "ACTIVE"
    ).length;

    const returnedBooks = history.filter(
        b => b.status === "RETURNED"
    ).length;

    const overdueBooks = history.filter(
        b => b.status === "OVERDUE"
    ).length;

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 8
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
mb:4,
borderRadius:5,
background:"linear-gradient(135deg,#1976d2,#512DA8)",
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

    {/* LEFT SIDE */}
    <Box>

        <Typography
            variant="h4"
            fontWeight="bold"
        >
            📚 Borrow History
        </Typography>

        <Typography mt={1}>
            View all your borrowing activities.
        </Typography>

        <HistoryIcon
            sx={{
                fontSize: 60,      // thoda bada
                mt: 1.5,
                ml: 0.5
            }}
        />

    </Box>

    {/* RIGHT SIDE */}
    <Box
        sx={{
            display: "flex",
            alignItems: "center",     // vertical center
            justifyContent: "center", // horizontal center
            minWidth: 120
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
            <MenuBookIcon sx={{ fontSize: 48 }} />
        </Avatar>

    </Box>

</Box>

</CardContent>

</Card>

<Grid container spacing={3} mb={4}>

<Grid size={{ xs: 12, sm: 6, md: 3 }}>

<Card
    sx={{
        minHeight: 165,
        borderRadius: 5,
        background: "linear-gradient(135deg,#42A5F5,#1565C0)",
        color: "#fff",
        boxShadow: "0 10px 25px rgba(21,101,192,.35)",
        transition: ".35s",
        overflow: "hidden",

        "&:hover": {
            transform: "translateY(-8px) scale(1.03)",
            boxShadow: "0 18px 35px rgba(21,101,192,.45)"
        }
    }}
>

<CardContent
    sx={{
        height: "100%",
        py: 3,
        px: 3
    }}
>

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}
>

<Box>

<Typography
    sx={{
        color: "rgba(255,255,255,.85)"
    }}
>
    Total Borrowed
</Typography>

<Typography
    variant="h3"
    fontWeight="bold"
    mt={1.5}
>
    {totalBorrowed}
</Typography>

</Box>

<Box
    sx={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        bgcolor: "rgba(255,255,255,.18)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
>
    <MenuBookIcon
        sx={{
            fontSize: 34,
            color: "#fff"
        }}
    />
</Box>

</Box>

</CardContent>

</Card>

</Grid>
<Grid size={{ xs: 12, sm: 6, md: 3 }}>

<Card
    sx={{
        minHeight: 165,
        borderRadius: 5,
        background: "linear-gradient(135deg,#66BB6A,#2E7D32)",
        color: "#fff",
        boxShadow: "0 10px 25px rgba(46,125,50,.35)",
        transition: ".35s",

        "&:hover": {
            transform: "translateY(-8px) scale(1.03)",
            boxShadow: "0 18px 35px rgba(46,125,50,.45)"
        }
    }}
>

<CardContent
    sx={{
        height: "100%",
        py: 3,
        px: 3
    }}
>

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}
>

<Box>

<Typography
    sx={{
        color: "rgba(255,255,255,.85)"
    }}
>
    Active
</Typography>

<Typography
    variant="h3"
    fontWeight="bold"
    mt={1.5}
>
    {activeBooks}
</Typography>

</Box>

<Box
    sx={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        bgcolor: "rgba(255,255,255,.18)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
>

<MenuBookIcon
    sx={{
        fontSize: 34,
        color: "#fff"
    }}
/>

</Box>

</Box>

</CardContent>

</Card>

</Grid>

<Grid size={{ xs: 12, sm: 6, md: 3 }}>

<Card
    sx={{
        minHeight: 165,
        borderRadius: 5,
        background: "linear-gradient(135deg,#29B6F6,#0277BD)",
        color: "#fff",
        boxShadow: "0 10px 25px rgba(2,119,189,.35)",
        transition: ".35s",

        "&:hover": {
            transform: "translateY(-8px) scale(1.03)",
            boxShadow: "0 18px 35px rgba(2,119,189,.45)"
        }
    }}
>

<CardContent
    sx={{
        height: "100%",
        py: 3,
        px: 3
    }}
>

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}
>

<Box>

<Typography
    sx={{
        color: "rgba(255,255,255,.85)"
    }}
>
    Returned
</Typography>

<Typography
    variant="h3"
    fontWeight="bold"
    mt={1.5}
>
    {returnedBooks}
</Typography>

</Box>

<Box
    sx={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        bgcolor: "rgba(255,255,255,.18)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
>

<CheckCircleIcon
    sx={{
        fontSize: 34,
        color: "#fff"
    }}
/>

</Box>

</Box>

</CardContent>

</Card>

</Grid>


<Grid size={{ xs: 12, sm: 6, md: 3 }}>

<Card
    sx={{
        minHeight: 165,
        borderRadius: 5,
        background: "linear-gradient(135deg,#EF5350,#C62828)",
        color: "#fff",
        boxShadow: "0 10px 25px rgba(198,40,40,.35)",
        transition: ".35s",

        "&:hover": {
            transform: "translateY(-8px) scale(1.03)",
            boxShadow: "0 18px 35px rgba(198,40,40,.45)"
        }
    }}
>

<CardContent
    sx={{
        height: "100%",
        py: 3,
        px: 3
    }}
>

<Box
    sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}
>

<Box>

<Typography
    sx={{
        color: "rgba(255,255,255,.85)"
    }}
>
    Overdue
</Typography>

<Typography
    variant="h3"
    fontWeight="bold"
    mt={1.5}
>
    {overdueBooks}
</Typography>

</Box>

<Box
    sx={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        bgcolor: "rgba(255,255,255,.18)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
>

<WarningAmberIcon
    sx={{
        fontSize: 34,
        color: "#fff"
    }}
/>

</Box>

</Box>

</CardContent>

</Card>

</Grid>

</Grid>

<Box sx={{ mt: 5 }}>

    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: {
                xs: "wrap",
                md: "nowrap"
            }
        }}
    >

        {/* Search Box */}

        {/* Toggle Buttons */}

    </Box>

</Box>

<Box
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 4,
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
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            )
        }}
        sx={{
            flex: 1
        }}
    />

    <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilter}
        color="primary"
        sx={{
            flexShrink: 0,

            "& .MuiToggleButton-root": {

                minWidth: 105,

                height: 56,

                fontWeight: "bold",

                textTransform: "none"

            }

        }}
    >

        <ToggleButton value="ALL">
            All
        </ToggleButton>

        <ToggleButton value="ACTIVE">
            Active
        </ToggleButton>

        <ToggleButton value="RETURNED">
            Returned
        </ToggleButton>

        <ToggleButton value="OVERDUE">
            Overdue
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

<TableCell><b>Status</b></TableCell>

<TableCell align="center"><b>Action</b></TableCell>

</TableRow>

</TableHead>

<TableBody>

{filteredHistory.length===0 ?

<TableRow>

<TableCell colSpan={7} align="center">

<Typography py={5}>

No Borrow History Found

</Typography>

</TableCell>

</TableRow>

:

filteredHistory.map(book=>(

<TableRow
hover
key={book.issueId}
>

<TableCell>

{book.title}

</TableCell>

<TableCell>

{book.author}

</TableCell>

<TableCell>

{book.issueDate}

</TableCell>

<TableCell>

{book.dueDate}

</TableCell>

<TableCell>

{book.returnDate ?? "-"}

</TableCell>

<TableCell>

<Chip
    label={book.status}
    color={getStatusColor(book.status)}
    sx={{
        width: 120,
        fontWeight: "bold",
        justifyContent: "center",

        "& .MuiChip-label": {

            width: "100%",

            textAlign: "center"

        }

    }}
/>
</TableCell>

<TableCell align="center">



    <Button

        size="small"

        variant="contained"

        startIcon={<VisibilityIcon />}

        onClick={() => handleView(book.issueId)}

    >

        View

    </Button>

</TableCell>

</TableRow>

))

}

</TableBody>

</Table>

</TableContainer>
<BookDetailsDialog
    open={openDialog}
    onClose={() => setOpenDialog(false)}
    book={selectedBook}
/>
</StudentDashboardLayout>


);

}

export default StudentBorrowHistory;