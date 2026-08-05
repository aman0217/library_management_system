import { useEffect, useState } from "react";
import BookDetailsDialog from "../../components/student/BookDetailsDialog";

import { getBorrowedBookDetails } from "../../services/dashboardService";
import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";

import {
    Box,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,
    Paper
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { getBorrowHistory } from "../../services/borrowService";
import { getCurrentUser } from "../../services/userService";

function StudentReturnedBooks() {

    const [loading, setLoading] = useState(true);

    const [returnedBooks, setReturnedBooks] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {

        loadReturnedBooks();

    }, []);

   const loadReturnedBooks = async () => {

    try {

        const user = await getCurrentUser();

        const history = await getBorrowHistory(user.id);

        

        const returned = history.filter(
            item => item.returned === true
        );

        setReturnedBooks(returned);

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

            <Box>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={4}
                >

                    Returned Books History

                </Typography>

                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 8px 24px rgba(0,0,0,.08)"
                    }}
                >
                 
                   <Table>

                        <TableHead>

                            <TableRow
                                sx={{
                                    bgcolor: "#1976d2"
                                }}
                            >

                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                >

                                    Book

                                </TableCell>

                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                >

                                    Author

                                </TableCell>

                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                >

                                    Category

                                </TableCell>

                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                >

                                    Issue Date

                                </TableCell>

                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                >

                                    Due Date

                                </TableCell>

                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                >

                                    Return Date

                                </TableCell>

                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                         display: "flex",
            justifyContent: "center"
                                    }}
                                >

                                    Status

                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                >

                                    Action

                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {

                                returnedBooks.length > 0 ?

                                    returnedBooks.map((book) => (

                                        <TableRow
                                            key={book.id}
                                            hover
                                        >

                                            <TableCell>

                                                {book.bookTitle}

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

                                                {book.returnDate}

                                            </TableCell>

                                            <TableCell>

                                                <Chip
                                                    label="Returned"
                                                    color="success"
                                                     sx={{
                
                fontWeight: "bold",
                            display: "flex",
            justifyContent: "center"
            }}
                                                />

                                            </TableCell>

                                            <TableCell
                                                align="center"
                                            >

                                               <Button

variant="contained"

size="small"

startIcon={<VisibilityIcon/>}

onClick={() => handleView(book.issueId)}

sx={{

background:"#1976d2",

fontWeight:"bold",

borderRadius:2,

textTransform:"none",

"&:hover":{

background:"#1565C0"

}

}}

>

View

</Button>

                                            </TableCell>

                                        </TableRow>

                                    ))

                                    :

                                    <TableRow>

                                        <TableCell
                                            colSpan={8}
                                            align="center"
                                        >

                                            No Returned Books Found

                                        </TableCell>

                                    </TableRow>

                            }

                        </TableBody>

                    </Table>

                </TableContainer>

            </Box>
<BookDetailsDialog
    open={dialogOpen}
    onClose={() => setDialogOpen(false)}
    book={selectedBook}
/>
        </StudentDashboardLayout>

    );

}

export default StudentReturnedBooks;