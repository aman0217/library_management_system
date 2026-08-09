import { useEffect, useState } from "react";

import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";
import BookDetailsDialog from "../../components/student/BookDetailsDialog";

import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Avatar,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip
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

    // ==========================================
    // STATES
    // ==========================================

    const [loading, setLoading] = useState(true);

    const [books, setBooks] = useState([]);

    const [filteredBooks, setFilteredBooks] =
        useState([]);

    const [search, setSearch] = useState("");

    const [selectedBook, setSelectedBook] =
        useState(null);

    const [dialogOpen, setDialogOpen] =
        useState(false);


    // ==========================================
    // LOAD BOOKS
    // ==========================================

    useEffect(() => {

        loadBooks();

    }, []);


    const loadBooks = async () => {

        try {

            const user =
                await getCurrentUser();

            if (!user || !user.id) {

                console.error(
                    "Current user not found"
                );

                return;
            }


            const data =
                await getBorrowedBooks(
                    user.id
                );


            console.log(
                "Borrowed Books =",
                data
            );


            const booksData =
                Array.isArray(data)
                    ? data
                    : [];


            setBooks(booksData);

            setFilteredBooks(
                booksData
            );

        }

        catch (error) {

            console.error(
                "Error loading borrowed books:",
                error
            );

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

                console.error(
                    "Issue ID is missing"
                );

                return;
            }


            const data =
                await getBorrowedBookDetails(
                    issueId
                );


            console.log(
                "Borrowed Book Details =",
                data
            );


            setSelectedBook(data);

            setDialogOpen(true);

        }

        catch (error) {

            console.error(
                "Error loading book details:",
                error
            );

        }

    };


    // ==========================================
    // SEARCH
    // ==========================================

    const handleSearch = (value) => {

        setSearch(value);


        const searchValue =
            value.toLowerCase().trim();


        if (searchValue === "") {

            setFilteredBooks(
                books
            );

            return;
        }


        const filtered =
            books.filter((book) => {

                const title =
                    String(
                        book.title || ""
                    ).toLowerCase();


                const author =
                    String(
                        book.author || ""
                    ).toLowerCase();


                return (
                    title.includes(searchValue) ||
                    author.includes(searchValue)
                );

            });


        setFilteredBooks(
            filtered
        );

    };


    // ==========================================
    // STATUS COLOR
    // ==========================================

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


    // ==========================================
    // LOADING UI
    // ==========================================

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        minHeight: "60vh",

                        display: "flex",

                        justifyContent:
                            "center",

                        alignItems:
                            "center"
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


                {/* ==================================
                    PAGE HEADER
                ================================== */}

                <Card
                    sx={{
                        mb: {
                            xs: 3,
                            md: 4
                        },

                        borderRadius: {
                            xs: 3,
                            md: 5
                        },

                        overflow: "hidden",

                        background:
                            "linear-gradient(135deg,#1976d2,#512DA8)",

                        color: "#fff",

                        boxShadow: {
                            xs: 3,
                            md: 6
                        }
                    }}
                >

                    <CardContent
                        sx={{
                            px: {
                                xs: 2.5,
                                sm: 4,
                                md: 5
                            },

                            py: {
                                xs: 3,
                                sm: 4,
                                md: 4
                            }
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",

                                flexDirection: {
                                    xs: "column",
                                    sm: "row"
                                },

                                justifyContent:
                                    "space-between",

                                alignItems: {
                                    xs: "flex-start",
                                    sm: "center"
                                },

                                gap: {
                                    xs: 3,
                                    sm: 2
                                }
                            }}
                        >


                            {/* LEFT */}

                            <Box
                                sx={{
                                    minWidth: 0
                                }}
                            >

                                <Typography
                                    variant="h4"
                                    fontWeight="bold"

                                    sx={{
                                        fontSize: {
                                            xs: "1.6rem",
                                            sm: "2rem",
                                            md: "2.25rem"
                                        },

                                        lineHeight: 1.2
                                    }}
                                >

                                    📚 My Borrowed Books

                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 1,

                                        fontSize: {
                                            xs: "0.9rem",
                                            sm: "1rem"
                                        },

                                        opacity: 0.9
                                    }}
                                >

                                    Manage all your
                                    currently borrowed
                                    books

                                </Typography>

                            </Box>


                            {/* RIGHT ICON */}

                            <Avatar
                                sx={{
                                    bgcolor: "#fff",

                                    color: "#1976d2",

                                    width: {
                                        xs: 60,
                                        sm: 70,
                                        md: 80
                                    },

                                    height: {
                                        xs: 60,
                                        sm: 70,
                                        md: 80
                                    },

                                    flexShrink: 0
                                }}
                            >

                                <MenuBookIcon
                                    sx={{
                                        fontSize: {
                                            xs: 32,
                                            sm: 38,
                                            md: 44
                                        }
                                    }}
                                />

                            </Avatar>

                        </Box>

                    </CardContent>

                </Card>



                {/* ==================================
                    SEARCH
                ================================== */}

                <TextField
                    fullWidth

                    value={search}

                    onChange={(e) =>
                        handleSearch(
                            e.target.value
                        )
                    }

                    placeholder={
                        "Search by Book Title or Author..."
                    }

                    InputProps={{
                        startAdornment: (

                            <InputAdornment
                                position="start"
                            >

                                <SearchIcon />

                            </InputAdornment>

                        )
                    }}

                    sx={{
                        mb: {
                            xs: 2.5,
                            md: 3
                        },

                        "& .MuiOutlinedInput-root":
                        {
                            borderRadius: {
                                xs: 2.5,
                                md: 3
                            },

                            minHeight: {
                                xs: 52,
                                md: 56
                            }
                        }
                    }}
                />



                {/* ==================================
                    RESULT COUNT
                ================================== */}

                <Box
                    sx={{
                        mb: 2,

                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",

                        flexWrap: "wrap",

                        gap: 1
                    }}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {filteredBooks.length}{" "}
                        {filteredBooks.length === 1
                            ? "book"
                            : "books"}{" "}
                        found

                    </Typography>


                    {search.trim() !== "" && (

                        <Button
                            size="small"

                            onClick={() =>
                                handleSearch("")
                            }

                            sx={{
                                textTransform:
                                    "none",

                                fontWeight:
                                    "bold"
                            }}
                        >

                            Clear Search

                        </Button>

                    )}

                </Box>



                {/* ==================================
                    TABLE
                ================================== */}

                <TableContainer
                    component={Paper}

                    sx={{
                        width: "100%",

                        maxWidth: "100%",

                        borderRadius: {
                            xs: 2,
                            md: 4
                        },

                        overflowX: "auto",

                        WebkitOverflowScrolling:
                            "touch",

                        boxShadow: {
                            xs: 2,
                            md: 4
                        }
                    }}
                >

                    <Table
                        sx={{
                            minWidth: 950
                        }}
                    >


                        {/* TABLE HEADER */}

                        <TableHead>

                            <TableRow
                                sx={{
                                    bgcolor:
                                        "#1976d2"
                                }}
                            >

                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Book
                                </TableCell>


                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Author
                                </TableCell>


                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Category
                                </TableCell>


                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Issue Date
                                </TableCell>


                                <TableCell
                                    sx={{
                                        color: "#fff",
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Due Date
                                </TableCell>


                                <TableCell
                                    align="center"

                                    sx={{
                                        color: "#fff",
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Days Left
                                </TableCell>


                                <TableCell
                                    align="center"

                                    sx={{
                                        color: "#fff",
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Status
                                </TableCell>


                                <TableCell
                                    align="center"

                                    sx={{
                                        color: "#fff",
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Action
                                </TableCell>

                            </TableRow>

                        </TableHead>



                        {/* TABLE BODY */}

                        <TableBody>


                            {filteredBooks.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={8}

                                        align="center"

                                        sx={{
                                            py: 6
                                        }}
                                    >

                                        <MenuBookIcon
                                            sx={{
                                                fontSize: 50,
                                                color:
                                                    "text.disabled",
                                                mb: 1
                                            }}
                                        />


                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            color="text.secondary"
                                        >

                                            {search.trim()
                                                ? "No Books Found"
                                                : "No Borrowed Books"}

                                        </Typography>


                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mt: 0.5
                                            }}
                                        >

                                            {search.trim()
                                                ? "Try another book title or author."
                                                : "You currently have no borrowed books."}

                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            ) : (

                                filteredBooks.map(
                                    (book) => (

                                        <TableRow
                                            hover

                                            key={
                                                book.issueId
                                            }
                                        >


                                            {/* BOOK */}

                                            <TableCell
                                                sx={{
                                                    fontWeight:
                                                        600,

                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.title ||
                                                    "-"}

                                            </TableCell>


                                            {/* AUTHOR */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.author ||
                                                    "-"}

                                            </TableCell>


                                            {/* CATEGORY */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.category ||
                                                    "-"}

                                            </TableCell>


                                            {/* ISSUE DATE */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.issueDate ||
                                                    "-"}

                                            </TableCell>


                                            {/* DUE DATE */}

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {book.dueDate ||
                                                    "-"}

                                            </TableCell>


                                            {/* DAYS LEFT */}

                                            <TableCell
                                                align="center"
                                            >

                                                <Typography
                                                    fontWeight="bold"

                                                    sx={{
                                                        color:
                                                            book.remainingDays <= 1
                                                                ? "error.main"
                                                                : book.remainingDays <= 3
                                                                    ? "warning.main"
                                                                    : "success.main"
                                                    }}
                                                >

                                                    {book.remainingDays ??
                                                        "-"}

                                                </Typography>

                                            </TableCell>


                                            {/* STATUS */}

                                            <TableCell
                                                align="center"
                                            >

                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",

                                                        justifyContent:
                                                            "center"
                                                    }}
                                                >

                                                    <Chip
                                                        label={
                                                            book.status ||
                                                            "UNKNOWN"
                                                        }

                                                        color={
                                                            getStatusColor(
                                                                book.status
                                                            )
                                                        }

                                                        sx={{
                                                            minWidth: 110,

                                                            fontWeight:
                                                                "bold",

                                                            "& .MuiChip-label":
                                                            {
                                                                px: 1.5
                                                            }
                                                        }}
                                                    />

                                                </Box>

                                            </TableCell>


                                            {/* ACTION */}

                                            <TableCell
                                                align="center"
                                            >

                                                <Button
                                                    size="small"

                                                    variant="contained"

                                                    startIcon={
                                                        <VisibilityIcon />
                                                    }

                                                    onClick={() =>
                                                        handleView(
                                                            book.issueId
                                                        )
                                                    }

                                                    sx={{
                                                        borderRadius:
                                                            2,

                                                        textTransform:
                                                            "none",

                                                        fontWeight:
                                                            "bold",

                                                        whiteSpace:
                                                            "nowrap"
                                                    }}
                                                >

                                                    View

                                                </Button>

                                            </TableCell>


                                        </TableRow>

                                    )
                                )

                            )}

                        </TableBody>

                    </Table>

                </TableContainer>



                {/* ==================================
                    BOOK DETAILS DIALOG
                ================================== */}

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


export default StudentMyBooks;