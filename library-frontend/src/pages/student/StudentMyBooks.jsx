import { useEffect, useState } from "react";
import BookDetailsDialog from "../../components/student/BookDetailsDialog";
import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";
import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid

} from "@mui/material";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Avatar,
    Chip,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";
import {

    Divider,
    Stack

} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {

    getBorrowedBooks,
    getBorrowedBookDetails

} from "../../services/dashboardService";
import { getCurrentUser } from "../../services/userService";

function StudentMyBooks() {
    const [loading, setLoading] = useState(true);

    const [books, setBooks] = useState([]);

    const [filteredBooks, setFilteredBooks] = useState([]);

    const [search, setSearch] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    useEffect(() => {

        loadBooks();

    }, []);

    const loadBooks = async () => {

        try {

            const user = await getCurrentUser();

            const data = await getBorrowedBooks(user.id);
            setBooks(data);

            setFilteredBooks(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };
    const handleView = async (issueId) => {

    try {

        const data = await getBorrowedBookDetails(issueId);

        setSelectedBook(data);

        setDialogOpen(true);

    }

    catch (error) {

        console.error(error);

    }

};

    const handleSearch = (value) => {

        setSearch(value);

        setFilteredBooks(

            books.filter(book =>

                book.title.toLowerCase().includes(value.toLowerCase()) ||

                book.author.toLowerCase().includes(value.toLowerCase())

            )

        );

    };

    const getStatusColor = (status) => {

        switch (status) {

            case "ACTIVE":
                return "success";

            case "DUE SOON":
                return "warning";

            case "OVERDUE":
                return "error";

            default:
                return "info";

        }

    };

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

    return (

        <StudentDashboardLayout>

            <Card
                sx={{
                    borderRadius: 5,
                    mb: 4,
                    background:
                        "linear-gradient(135deg,#1976d2,#512DA8)",
                    color: "white"
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

                        <Box>

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                            >

                                📚 My Borrowed Books

                            </Typography>

                            <Typography mt={1}>

                                Manage all your currently borrowed books

                            </Typography>

                        </Box>

                        <Avatar
                            sx={{
                                bgcolor: "white",
                                color: "#1976d2",
                                width: 70,
                                height: 70,
                                mr: 5
                            }}
                        >

                            <MenuBookIcon fontSize="large"/>

                        </Avatar>

                    </Box>

                </CardContent>

            </Card>

            <TextField

                fullWidth

                value={search}

                onChange={(e) =>
                    handleSearch(e.target.value)
                }

                placeholder="Search by Book Title or Author..."

                sx={{ mb: 3 }}

                InputProps={{

                    startAdornment: (

                        <InputAdornment position="start">

                            <SearchIcon/>

                        </InputAdornment>

                    )

                }}

            />
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 4
                }}
            >

                <Table>

                    <TableHead>

                        <TableRow
                           sx={{
            bgcolor: "#1976d2"
        }}
    >
                        

                            <TableCell  sx={{
                                        color: "#fff",
                                    }}><b>Book</b></TableCell>

                            <TableCell  sx={{
                                        color: "#fff",
                                    }}><b>Author</b></TableCell>

                            <TableCell  sx={{
                                        color: "#fff",
                                    }}><b>Category</b></TableCell>

                            <TableCell  sx={{
                                        color: "#fff",
                                    }}><b>Issue Date</b></TableCell>

                            <TableCell  sx={{
                                        color: "#fff",
                                    }}><b>Due Date</b></TableCell>

                            <TableCell  sx={{
                                        color: "#fff",
                                          textAlign: "center"
                                    }}><b>Days Left</b></TableCell>

                            <TableCell  sx={{
                                        color: "#fff",
                                          textAlign: "center"
                                        
                                    }}><b>Status</b></TableCell>

                            <TableCell align="center"  sx={{
                                        color: "#fff",
                                    
                                    }}><b>Action</b></TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredBooks.map(book => (

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

                                        {book.category}

                                    </TableCell>

                                    <TableCell>

                                        {book.issueDate}

                                    </TableCell>

                                    <TableCell>

                                        {book.dueDate}

                                    </TableCell>

                                    <TableCell>
                                        <Box
        sx={{
            display: "flex",
            justifyContent: "center"
        }}
    >

                                        {book.remainingDays}
</Box>
                                    </TableCell>

                         <TableCell>

    <Box
        sx={{
            display: "flex",
            justifyContent: "center"
        }}
    >

        <Chip
            label={book.status}
            color={getStatusColor(book.status)}
            sx={{
                minWidth: 110,
                fontWeight: "bold"
            }}
        />

    </Box>

</TableCell>
                                    <TableCell align="center">

                                        <Button

    size="small"

    variant="contained"

    startIcon={<VisibilityIcon/>}

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
    open={dialogOpen}
    onClose={() => setDialogOpen(false)}
    book={selectedBook}
/>
 </StudentDashboardLayout>

    );

}

export default StudentMyBooks;