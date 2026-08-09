import { useEffect, useState } from "react";

import { getNeverBorrowedBooks } from "../../services/dashboardService";

import {
    Paper,
    Typography,
    Box,
    Avatar,
    Chip
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function NeverBorrowedBooks() {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        loadBooks();

    }, []);

    const loadBooks = async () => {

        try {

            const data = await getNeverBorrowedBooks();

            setBooks(data);

        }
        catch (error) {

            console.error(error);

        }

    };

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
                    "0 12px 30px rgba(255,152,0,.08)",

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

                ⚠ Never Borrowed Books

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

                Books that have never been issued

            </Typography>


            {

                books.length === 0

                    ?

                    (

                        <Box
                            sx={{
                                textAlign: "center",

                                py: {
                                    xs: 4,
                                    sm: 5
                                },

                                px: {
                                    xs: 1,
                                    sm: 2
                                }
                            }}
                        >

                            <Typography
                                color="success.main"
                                fontWeight="bold"
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        sm: "1.1rem"
                                    }
                                }}
                            >

                                🎉 Great!

                            </Typography>


                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,

                                    fontSize: {
                                        xs: "0.85rem",
                                        sm: "1rem"
                                    }
                                }}
                            >

                                Every book has been borrowed at least once.

                            </Typography>

                        </Box>

                    )

                    :

                    books.map((book) => (

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

                                    transform: "translateX(6px)"

                                }

                            }}

                        >

                            {/* BOOK ICON */}

                            <Avatar

                                sx={{

                                    bgcolor: "#FB8C00",

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

                                        wordBreak: "break-word",

                                        overflowWrap: "anywhere",

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

                                        mt: 0.3,

                                        wordBreak: "break-word",

                                        overflowWrap: "anywhere"

                                    }}
                                >

                                    {book.author}

                                </Typography>

                            </Box>


                            {/* CATEGORY */}

                            <Chip

                                icon={
                                    <WarningAmberIcon />
                                }

                                label={book.category}

                                sx={{

                                    width: {
                                        xs: "100%",
                                        sm: 150
                                    },

                                    maxWidth: {
                                        xs: "100%",
                                        sm: 150
                                    },

                                    minHeight: 36,

                                    mt: {
                                        xs: 1.5,
                                        sm: 0
                                    },

                                    ml: {
                                        xs: 0,
                                        sm: 2
                                    },

                                    justifyContent: "center",

                                    fontWeight: "bold",

                                    bgcolor: "#FFF4E5",

                                    color: "#ED6C02",

                                    border: "1px solid #FFCC80",

                                    flexShrink: 0,

                                    "& .MuiChip-label": {

                                        width: "100%",

                                        textAlign: "center",

                                        overflow: "hidden",

                                        textOverflow: "ellipsis",

                                        whiteSpace: "nowrap"

                                    },

                                    "& .MuiChip-icon": {

                                        color: "#ED6C02"

                                    }

                                }}

                            />

                        </Box>

                    ))

            }

        </Paper>

    );

}

export default NeverBorrowedBooks;