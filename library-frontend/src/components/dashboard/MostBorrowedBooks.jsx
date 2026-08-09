import { useEffect, useState } from "react";

import {
    getMostBorrowedBooks
} from "../../services/dashboardService";

import {
    Paper,
    Typography,
    Box,
    Avatar,
    LinearProgress
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";

function MostBorrowedBooks() {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        loadBooks();

    }, []);

    const loadBooks = async () => {

        try {

            const data = await getMostBorrowedBooks();

            setBooks(data);

        }
        catch (error) {

            console.error(error);

        }

    };

    const maxBorrow =
        books.length > 0
            ? Math.max(
                ...books.map(book => book.borrowCount)
            )
            : 1;

    return (

        <Paper
            elevation={0}
            sx={{

                mt: 4,

                p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                },

                borderRadius: 5,

                background:
                    "linear-gradient(145deg,#F8FBFF,#EEF5FF)",

                border: "1px solid #b2d0f8",

                boxShadow:
                    "0 12px 30px rgba(25,118,210,.08)",

                width: "100%",

                overflow: "hidden"

            }}
        >

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
                sx={{
                    fontSize: {
                        xs: "1.25rem",
                        sm: "1.5rem"
                    }
                }}
            >

                📚 Most Borrowed Books

            </Typography>

            <Typography
                color="text.secondary"
                mb={{
                    xs: 2.5,
                    sm: 4
                }}
                sx={{
                    fontSize: {
                        xs: "0.875rem",
                        sm: "1rem"
                    }
                }}
            >

                Top performing books in your library

            </Typography>

            {

                books.map((book, index) => (

                    <Box

                        key={book.bookId}

                        sx={{

                            display: "flex",

                            alignItems: {
                                xs: "flex-start",
                                sm: "center"
                            },

                            flexDirection: {
                                xs: "column",
                                sm: "row"
                            },

                            p: {
                                xs: 1.5,
                                sm: 2
                            },

                            mb: 2,

                            borderRadius: 4,

                            transition: ".3s",

                            width: "100%",

                            "&:hover": {

                                bgcolor: "#F5F9FF",

                                transform: "translateX(6px)"

                            }

                        }}

                    >

                        {/* BOOK ICON */}

                        <Avatar

                            sx={{

                                bgcolor: "#1976D2",

                                mr: {
                                    xs: 0,
                                    sm: 2
                                },

                                mb: {
                                    xs: 1.5,
                                    sm: 0
                                },

                                width: {
                                    xs: 46,
                                    sm: 52
                                },

                                height: {
                                    xs: 46,
                                    sm: 52
                                },

                                flexShrink: 0

                            }}

                        >

                            <MenuBookIcon />

                        </Avatar>


                        {/* BOOK INFORMATION */}

                        <Box
                            sx={{
                                flex: 1,

                                minWidth: 0,

                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                }
                            }}
                        >

                            <Typography
                                fontWeight="bold"
                                sx={{

                                    overflow: "hidden",

                                    textOverflow: "ellipsis",

                                    whiteSpace: {
                                        xs: "normal",
                                        sm: "nowrap"
                                    },

                                    wordBreak: "break-word",

                                    fontSize: {
                                        xs: "0.95rem",
                                        sm: "1rem"
                                    }

                                }}
                            >

                                {book.title}

                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{

                                    overflow: "hidden",

                                    textOverflow: "ellipsis",

                                    whiteSpace: {
                                        xs: "normal",
                                        sm: "nowrap"
                                    },

                                    wordBreak: "break-word",

                                    mt: 0.3

                                }}
                            >

                                {book.author}

                            </Typography>


                            {/* BORROW PROGRESS */}

                            <LinearProgress

                                variant="determinate"

                                value={
                                    (book.borrowCount / maxBorrow) * 100
                                }

                                sx={{

                                    mt: 1,

                                    height: 8,

                                    borderRadius: 10,

                                    bgcolor: "#E3F2FD",

                                    "& .MuiLinearProgress-bar": {

                                        borderRadius: 10,

                                        background:
                                            "linear-gradient(90deg,#1976D2,#42A5F5)"

                                    }

                                }}

                            />

                        </Box>


                        {/* RANK + BORROW COUNT */}

                        <Box

                            sx={{

                                textAlign: "center",

                                ml: {
                                    xs: 0,
                                    sm: 3
                                },

                                mt: {
                                    xs: 1.5,
                                    sm: 0
                                },

                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                },

                                display: {
                                    xs: "flex",
                                    sm: "block"
                                },

                                alignItems: "center",

                                justifyContent: {
                                    xs: "space-between",
                                    sm: "center"
                                },

                                gap: {
                                    xs: 1,
                                    sm: 0
                                },

                                flexShrink: 0

                            }}

                        >

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                color="#1976D2"
                                sx={{
                                    fontSize: {
                                        xs: "1.2rem",
                                        sm: "1.5rem"
                                    }
                                }}
                            >

                                #{index + 1}

                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    fontSize: {
                                        xs: "0.8rem",
                                        sm: "0.875rem"
                                    }
                                }}
                            >

                                {book.borrowCount} Times

                            </Typography>

                        </Box>

                    </Box>

                ))

            }

        </Paper>

    );

}

export default MostBorrowedBooks;