import { useEffect, useState } from "react";

import BookDetailsDialog from "../../components/student/BookDetailsDialog";
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
    Paper,
    Card,
    CardContent
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { getBorrowedBookDetails } from "../../services/dashboardService";
import { getBorrowHistory } from "../../services/borrowService";
import { getCurrentUser } from "../../services/userService";


function StudentReturnedBooks() {

    const [loading, setLoading] = useState(true);

    const [returnedBooks, setReturnedBooks] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedBook, setSelectedBook] = useState(null);


    // ==========================================
    // LOAD RETURNED BOOKS
    // ==========================================

    useEffect(() => {

        loadReturnedBooks();

    }, []);


    const loadReturnedBooks = async () => {

        try {

            const user = await getCurrentUser();

            if (!user || !user.id) {

                console.error("Current user not found");

                return;

            }


            const history = await getBorrowHistory(user.id);


            const returned = (history || []).filter(
                item => item.returned === true
            );


            setReturnedBooks(returned);

        }

        catch (error) {

            console.error(
                "Failed to load returned books:",
                error
            );

            setReturnedBooks([]);

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // VIEW BOOK DETAILS
    // ==========================================

    const handleView = async (issueId) => {

        try {

            if (!issueId) {

                console.error("Issue ID is missing");

                return;

            }


            const data =
                await getBorrowedBookDetails(issueId);


            setSelectedBook(data);

            setDialogOpen(true);

        }

        catch (error) {

            console.error(
                "Failed to load book details:",
                error
            );

        }

    };


    // ==========================================
    // LOADING STATE
    // ==========================================

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        minHeight: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <CircularProgress />

                </Box>

            </StudentDashboardLayout>

        );

    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <StudentDashboardLayout>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    overflow: "hidden"
                }}
            >


                {/* =====================================
                    HEADER CARD
                ===================================== */}

                <Card
                    sx={{
                        mb: 4,
                        borderRadius: 5,
                        overflow: "hidden",
                        background:
                            "linear-gradient(135deg,#1976d2,#512DA8)",
                        color: "#fff",
                        boxShadow:
                            "0 10px 30px rgba(25,118,210,.25)"
                    }}
                >

                    <CardContent
                        sx={{
                            p: {
                                xs: 3,
                                sm: 4,
                                md: 5
                            }
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 3
                            }}
                        >


                            {/* LEFT */}

                            <Box
                                sx={{
                                    minWidth: 0,
                                    flex: 1
                                }}
                            >

                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.8rem",
                                            sm: "2.2rem",
                                            md: "2.5rem"
                                        },
                                        lineHeight: 1.2
                                    }}
                                >

                                    Returned Books History

                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 1,
                                        opacity: 0.9,
                                        fontSize: {
                                            xs: 14,
                                            sm: 16
                                        }
                                    }}
                                >

                                    View all the books you have
                                    returned from the library.

                                </Typography>

                            </Box>


                            {/* RIGHT ICON */}

                            <Box
                                sx={{
                                    flexShrink: 0,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center"
                                }}
                            >

                                <Box
                                    sx={{
                                        width: {
                                            xs: 65,
                                            sm: 80,
                                            md: 90
                                        },
                                        height: {
                                            xs: 65,
                                            sm: 80,
                                            md: 90
                                        },
                                        borderRadius: "50%",
                                        bgcolor: "#fff",
                                        color: "#1976d2",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow:
                                            "0 8px 25px rgba(0,0,0,.25)"
                                    }}
                                >

                                    <MenuBookIcon
                                        sx={{
                                            fontSize: {
                                                xs: 34,
                                                sm: 42,
                                                md: 50
                                            }
                                        }}
                                    />

                                </Box>

                            </Box>

                        </Box>

                    </CardContent>

                </Card>


                {/* =====================================
                    TABLE WRAPPER
                ===================================== */}

                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        width: "100%"
                    }}
                >

                    {/* 
                        Horizontal scroll on small screens.
                        Desktop par normal table.
                    */}

                    <TableContainer
                        sx={{
                            width: "100%",
                            overflowX: "auto",

                            "&::-webkit-scrollbar": {
                                height: 8
                            },

                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#bdbdbd",
                                borderRadius: 10
                            }
                        }}
                    >

                        <Table
                            sx={{
                                minWidth: 1000
                            }}
                            aria-label="returned books table"
                        >


                            {/* =================================
                                TABLE HEAD
                            ================================= */}

                            <TableHead>

                                <TableRow
                                    sx={{
                                        background:
                                            "linear-gradient(135deg,#1976d2,#1565c0)"
                                    }}
                                >

                                    <TableCell
                                        sx={headerCellStyle}
                                    >
                                        Book
                                    </TableCell>


                                    <TableCell
                                        sx={headerCellStyle}
                                    >
                                        Author
                                    </TableCell>


                                    <TableCell
                                        sx={headerCellStyle}
                                    >
                                        Category
                                    </TableCell>


                                    <TableCell
                                        sx={headerCellStyle}
                                    >
                                        Issue Date
                                    </TableCell>


                                    <TableCell
                                        sx={headerCellStyle}
                                    >
                                        Due Date
                                    </TableCell>


                                    <TableCell
                                        sx={headerCellStyle}
                                    >
                                        Return Date
                                    </TableCell>


                                    <TableCell
                                        align="center"
                                        sx={headerCellStyle}
                                    >
                                        Status
                                    </TableCell>


                                    <TableCell
                                        align="center"
                                        sx={{
                                            ...headerCellStyle,
                                            minWidth: 120
                                        }}
                                    >
                                        Action
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            {/* =================================
                                TABLE BODY
                            ================================= */}

                            <TableBody>


                                {returnedBooks.length > 0 ? (

                                    returnedBooks.map((book) => (

                                        <TableRow
                                            key={
                                                book.issueId ||
                                                book.id
                                            }
                                            hover
                                            sx={{
                                                transition: ".2s",

                                                "&:hover": {
                                                    backgroundColor:
                                                        "#F5FAFF"
                                                }
                                            }}
                                        >


                                            {/* BOOK */}

                                            <TableCell
                                                sx={{
                                                    fontWeight: 600,
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.bookTitle || "—"}

                                            </TableCell>


                                            {/* AUTHOR */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.author || "—"}

                                            </TableCell>


                                            {/* CATEGORY */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.category || "—"}

                                            </TableCell>


                                            {/* ISSUE DATE */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.issueDate || "—"}

                                            </TableCell>


                                            {/* DUE DATE */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.dueDate || "—"}

                                            </TableCell>


                                            {/* RETURN DATE */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.returnDate || "—"}

                                            </TableCell>


                                            {/* STATUS */}

                                            <TableCell
                                                align="center"
                                            >

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems:
                                                            "center"
                                                    }}
                                                >

                                                    <Chip
                                                        label="Returned"
                                                        color="success"
                                                        size="small"
                                                        sx={{
                                                            minWidth: 100,
                                                            fontWeight:
                                                                "bold",
                                                            borderRadius: 3
                                                        }}
                                                    />

                                                </Box>

                                            </TableCell>


                                            {/* ACTION */}

                                            <TableCell
                                                align="center"
                                            >

                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={
                                                        <VisibilityIcon />
                                                    }
                                                    onClick={() =>
                                                        handleView(
                                                            book.issueId
                                                        )
                                                    }
                                                    sx={{
                                                        minWidth: 95,
                                                        background:
                                                            "#1976d2",
                                                        fontWeight:
                                                            "bold",
                                                        borderRadius: 2,
                                                        textTransform:
                                                            "none",

                                                        "&:hover": {
                                                            background:
                                                                "#1565C0"
                                                        }
                                                    }}
                                                >

                                                    View

                                                </Button>

                                            </TableCell>


                                        </TableRow>

                                    ))

                                ) : (

                                    /* =================================
                                       EMPTY STATE
                                    ================================= */

                                    <TableRow>

                                        <TableCell
                                            colSpan={8}
                                            align="center"
                                            sx={{
                                                py: 8
                                            }}
                                        >

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection:
                                                        "column",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "center"
                                                }}
                                            >

                                                <MenuBookIcon
                                                    sx={{
                                                        fontSize: 65,
                                                        color:
                                                            "#bdbdbd",
                                                        mb: 2
                                                    }}
                                                />


                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                    color="text.secondary"
                                                >

                                                    No Returned Books Found

                                                </Typography>


                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 1
                                                    }}
                                                >

                                                    Your returned book
                                                    history will appear
                                                    here.

                                                </Typography>

                                            </Box>

                                        </TableCell>

                                    </TableRow>

                                )}

                            </TableBody>

                        </Table>

                    </TableContainer>

                </Paper>


                {/* =====================================
                    BOOK DETAILS DIALOG
                ===================================== */}

                <BookDetailsDialog
                    open={dialogOpen}
                    onClose={() =>
                        setDialogOpen(false)
                    }
                    book={selectedBook}
                />


            </Box>

        </StudentDashboardLayout>

    );

}


// ==========================================
// TABLE HEADER STYLE
// ==========================================

const headerCellStyle = {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "0.95rem",
    whiteSpace: "nowrap",
    py: 2
};


export default StudentReturnedBooks;