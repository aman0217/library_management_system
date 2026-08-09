import { useEffect, useState } from "react";

import BookDetailsDialog from "../../components/student/BookDetailsDialog";
import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";

import {
    getBorrowHistory,
    getBorrowHistoryBookDetails
} from "../../services/dashboardService";

import {
    getCurrentUser
} from "../../services/userService";

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
    Button,
    Avatar,
    Stack
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from "@mui/icons-material/Visibility";


function StudentBorrowHistory() {

    const [loading, setLoading] = useState(true);

    const [history, setHistory] = useState([]);

    const [filteredHistory, setFilteredHistory] = useState([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedBook, setSelectedBook] = useState(null);


    /* =========================
       LOAD HISTORY
    ========================= */

    useEffect(() => {

        loadHistory();

    }, []);


    const loadHistory = async () => {

        try {

            const user = await getCurrentUser();

            const data = await getBorrowHistory(user.id);

            console.log("Borrow History =", data);

            setHistory(data || []);

            setFilteredHistory(data || []);

        }

        catch (error) {

            console.error(
                "Failed to load borrow history:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    /* =========================
       STATUS COLOR
    ========================= */

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


    /* =========================
       VIEW BOOK DETAILS
    ========================= */

    const handleView = async (issueId) => {

        try {

            const data =
                await getBorrowHistoryBookDetails(issueId);

            setSelectedBook(data);

            setOpenDialog(true);

        }

        catch (error) {

            console.error(
                "Failed to load book details:",
                error
            );

        }

    };


    /* =========================
       FILTER LOGIC
    ========================= */

    const applyFilters = (
        searchValue,
        statusValue
    ) => {

        let data = [...history];


        /* STATUS FILTER */

        if (statusValue !== "ALL") {

            data = data.filter(
                (book) =>
                    book.status === statusValue
            );

        }


        /* SEARCH FILTER */

        if (searchValue.trim() !== "") {

            const searchText =
                searchValue.toLowerCase().trim();

            data = data.filter((book) => {

                const title =
                    book.title?.toLowerCase() || "";

                const author =
                    book.author?.toLowerCase() || "";

                return (
                    title.includes(searchText) ||
                    author.includes(searchText)
                );

            });

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


    /* =========================
       STATISTICS
    ========================= */

    const totalBorrowed =
        history.length;

    const activeBooks =
        history.filter(
            (book) =>
                book.status === "ACTIVE"
        ).length;

    const returnedBooks =
        history.filter(
            (book) =>
                book.status === "RETURNED"
        ).length;

    const overdueBooks =
        history.filter(
            (book) =>
                book.status === "OVERDUE"
        ).length;


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        minHeight: "70vh",
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


    return (

        <StudentDashboardLayout>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    overflow: "hidden"
                }}
            >


                {/* =====================================================
                    HEADER
                ====================================================== */}

                <Card
                    sx={{
                        mb: {
                            xs: 2,
                            sm: 3,
                            md: 4
                        },

                        borderRadius: {
                            xs: 3,
                            sm: 4,
                            md: 5
                        },

                        background:
                            "linear-gradient(135deg,#1976D2,#512DA8)",

                        color: "#fff",

                        overflow: "hidden",

                        boxShadow:
                            "0 12px 30px rgba(25,118,210,.20)"
                    }}
                >

                    <CardContent
                        sx={{
                            p: {
                                xs: 2.5,
                                sm: 3,
                                md: 4
                            },

                            "&:last-child": {
                                pb: {
                                    xs: 2.5,
                                    sm: 3,
                                    md: 4
                                }
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
                                    xs: 2,
                                    sm: 3
                                }
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
                                            xs: "1.7rem",
                                            sm: "2rem",
                                            md: "2.3rem"
                                        },

                                        lineHeight: 1.2,

                                        wordBreak:
                                            "break-word"
                                    }}
                                >
                                    📚 Borrow History
                                </Typography>


                                <Typography
                                    sx={{
                                        mt: 1,

                                        fontSize: {
                                            xs: ".9rem",
                                            sm: "1rem"
                                        },

                                        opacity: .92
                                    }}
                                >
                                    View all your borrowing
                                    activities.
                                </Typography>


                                <HistoryIcon
                                    sx={{
                                        fontSize: {
                                            xs: 42,
                                            sm: 50,
                                            md: 60
                                        },

                                        mt: 1.5
                                    }}
                                />

                            </Box>


                            {/* RIGHT ICON */}

                            <Box
                                sx={{
                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: {
                                        xs: "flex-start",
                                        sm: "center"
                                    }
                                }}
                            >

                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 65,
                                            sm: 75,
                                            md: 85
                                        },

                                        height: {
                                            xs: 65,
                                            sm: 75,
                                            md: 85
                                        },

                                        bgcolor: "#fff",

                                        color: "#1976D2",

                                        boxShadow:
                                            "0 8px 20px rgba(0,0,0,.18)"
                                    }}
                                >

                                    <MenuBookIcon
                                        sx={{
                                            fontSize: {
                                                xs: 36,
                                                sm: 42,
                                                md: 50
                                            }
                                        }}
                                    />

                                </Avatar>

                            </Box>

                        </Box>

                    </CardContent>

                </Card>



                {/* =====================================================
                    STATISTICS CARDS
                ====================================================== */}

                <Grid
                    container
                    spacing={{
                        xs: 2,
                        sm: 2.5,
                        md: 3
                    }}
                    sx={{
                        mb: {
                            xs: 2,
                            sm: 3,
                            md: 4
                        }
                    }}
                >


                    {/* TOTAL */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}
                    >

                        <Card
                            sx={{
                                minHeight: {
                                    xs: 135,
                                    sm: 150,
                                    md: 165
                                },

                                height: "100%",

                                borderRadius: {
                                    xs: 3,
                                    sm: 4,
                                    md: 5
                                },

                                background:
                                    "linear-gradient(135deg,#42A5F5,#1565C0)",

                                color: "#fff",

                                boxShadow:
                                    "0 10px 25px rgba(21,101,192,.25)",

                                transition: ".3s",

                                "&:hover": {
                                    transform: {
                                        xs: "none",
                                        md: "translateY(-6px)"
                                    }
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2,
                                        sm: 2.5,
                                        md: 3
                                    },

                                    "&:last-child": {
                                        pb: {
                                            xs: 2,
                                            sm: 2.5,
                                            md: 3
                                        }
                                    }
                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center",

                                        gap: 1
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            sx={{
                                                color:
                                                    "rgba(255,255,255,.85)",

                                                fontSize: {
                                                    xs: ".85rem",
                                                    sm: ".95rem"
                                                }
                                            }}
                                        >
                                            Total Borrowed
                                        </Typography>


                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mt: 1,

                                                fontSize: {
                                                    xs: "2rem",
                                                    sm: "2.3rem",
                                                    md: "2.7rem"
                                                }
                                            }}
                                        >
                                            {totalBorrowed}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            width: {
                                                xs: 48,
                                                sm: 55,
                                                md: 60
                                            },

                                            height: {
                                                xs: 48,
                                                sm: 55,
                                                md: 60
                                            },

                                            flexShrink: 0,

                                            borderRadius:
                                                "50%",

                                            bgcolor:
                                                "rgba(255,255,255,.18)",

                                            display: "flex",

                                            justifyContent:
                                                "center",

                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <MenuBookIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 26,
                                                    sm: 30,
                                                    md: 34
                                                }
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* ACTIVE */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}
                    >

                        <Card
                            sx={{
                                minHeight: {
                                    xs: 135,
                                    sm: 150,
                                    md: 165
                                },

                                height: "100%",

                                borderRadius: {
                                    xs: 3,
                                    sm: 4,
                                    md: 5
                                },

                                background:
                                    "linear-gradient(135deg,#66BB6A,#2E7D32)",

                                color: "#fff",

                                boxShadow:
                                    "0 10px 25px rgba(46,125,50,.25)",

                                transition: ".3s",

                                "&:hover": {
                                    transform: {
                                        xs: "none",
                                        md: "translateY(-6px)"
                                    }
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2,
                                        sm: 2.5,
                                        md: 3
                                    },

                                    "&:last-child": {
                                        pb: {
                                            xs: 2,
                                            sm: 2.5,
                                            md: 3
                                        }
                                    }
                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center"
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            sx={{
                                                color:
                                                    "rgba(255,255,255,.85)"
                                            }}
                                        >
                                            Active
                                        </Typography>


                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mt: 1,

                                                fontSize: {
                                                    xs: "2rem",
                                                    sm: "2.3rem",
                                                    md: "2.7rem"
                                                }
                                            }}
                                        >
                                            {activeBooks}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            width: {
                                                xs: 48,
                                                sm: 55,
                                                md: 60
                                            },

                                            height: {
                                                xs: 48,
                                                sm: 55,
                                                md: 60
                                            },

                                            flexShrink: 0,

                                            borderRadius:
                                                "50%",

                                            bgcolor:
                                                "rgba(255,255,255,.18)",

                                            display: "flex",

                                            justifyContent:
                                                "center",

                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <MenuBookIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 26,
                                                    sm: 30,
                                                    md: 34
                                                }
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* RETURNED */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}
                    >

                        <Card
                            sx={{
                                minHeight: {
                                    xs: 135,
                                    sm: 150,
                                    md: 165
                                },

                                height: "100%",

                                borderRadius: {
                                    xs: 3,
                                    sm: 4,
                                    md: 5
                                },

                                background:
                                    "linear-gradient(135deg,#29B6F6,#0277BD)",

                                color: "#fff",

                                boxShadow:
                                    "0 10px 25px rgba(2,119,189,.25)",

                                transition: ".3s",

                                "&:hover": {
                                    transform: {
                                        xs: "none",
                                        md: "translateY(-6px)"
                                    }
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2,
                                        sm: 2.5,
                                        md: 3
                                    },

                                    "&:last-child": {
                                        pb: {
                                            xs: 2,
                                            sm: 2.5,
                                            md: 3
                                        }
                                    }
                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center"
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            sx={{
                                                color:
                                                    "rgba(255,255,255,.85)"
                                            }}
                                        >
                                            Returned
                                        </Typography>


                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mt: 1,

                                                fontSize: {
                                                    xs: "2rem",
                                                    sm: "2.3rem",
                                                    md: "2.7rem"
                                                }
                                            }}
                                        >
                                            {returnedBooks}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            width: {
                                                xs: 48,
                                                sm: 55,
                                                md: 60
                                            },

                                            height: {
                                                xs: 48,
                                                sm: 55,
                                                md: 60
                                            },

                                            flexShrink: 0,

                                            borderRadius:
                                                "50%",

                                            bgcolor:
                                                "rgba(255,255,255,.18)",

                                            display: "flex",

                                            justifyContent:
                                                "center",

                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <CheckCircleIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 26,
                                                    sm: 30,
                                                    md: 34
                                                }
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* OVERDUE */}

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3
                        }}
                    >

                        <Card
                            sx={{
                                minHeight: {
                                    xs: 135,
                                    sm: 150,
                                    md: 165
                                },

                                height: "100%",

                                borderRadius: {
                                    xs: 3,
                                    sm: 4,
                                    md: 5
                                },

                                background:
                                    "linear-gradient(135deg,#EF5350,#C62828)",

                                color: "#fff",

                                boxShadow:
                                    "0 10px 25px rgba(198,40,40,.25)",

                                transition: ".3s",

                                "&:hover": {
                                    transform: {
                                        xs: "none",
                                        md: "translateY(-6px)"
                                    }
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2,
                                        sm: 2.5,
                                        md: 3
                                    },

                                    "&:last-child": {
                                        pb: {
                                            xs: 2,
                                            sm: 2.5,
                                            md: 3
                                        }
                                    }
                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center"
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            sx={{
                                                color:
                                                    "rgba(255,255,255,.85)"
                                            }}
                                        >
                                            Overdue
                                        </Typography>


                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mt: 1,

                                                fontSize: {
                                                    xs: "2rem",
                                                    sm: "2.3rem",
                                                    md: "2.7rem"
                                                }
                                            }}
                                        >
                                            {overdueBooks}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            width: {
                                                xs: 48,
                                                sm: 55,
                                                md: 60
                                            },

                                            height: {
                                                xs: 48,
                                                sm: 55,
                                                md: 60
                                            },

                                            flexShrink: 0,

                                            borderRadius:
                                                "50%",

                                            bgcolor:
                                                "rgba(255,255,255,.18)",

                                            display: "flex",

                                            justifyContent:
                                                "center",

                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <WarningAmberIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 26,
                                                    sm: 30,
                                                    md: 34
                                                }
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>



                {/* =====================================================
                    SEARCH + FILTER
                ====================================================== */}

                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 2,
                            sm: 2.5,
                            md: 3
                        },

                        mb: {
                            xs: 2,
                            sm: 3
                        },

                        borderRadius: {
                            xs: 3,
                            sm: 4
                        },

                        border:
                            "1px solid #E3EAF5",

                        boxShadow:
                            "0 8px 25px rgba(25,118,210,.07)"
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                md: "row"
                            },

                            alignItems: {
                                xs: "stretch",
                                md: "center"
                            },

                            gap: {
                                xs: 2,
                                md: 2.5
                            },

                            width: "100%"
                        }}
                    >


                        {/* SEARCH */}

                        <TextField
                            fullWidth

                            placeholder=
                                "Search Book or Author..."

                            value={search}

                            onChange={(e) =>
                                handleSearch(
                                    e.target.value
                                )
                            }

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                    >

                                        <SearchIcon
                                            color="primary"
                                        />

                                    </InputAdornment>
                                )
                            }}

                            sx={{
                                flex: {
                                    md: 1
                                },

                                minWidth: 0,

                                "& .MuiOutlinedInput-root": {

                                    height: {
                                        xs: 50,
                                        sm: 54,
                                        md: 56
                                    },

                                    borderRadius: 3,

                                    background: "#fff"
                                }
                            }}
                        />


                        {/* FILTER */}

                        <ToggleButtonGroup
                            value={filter}

                            exclusive

                            onChange={handleFilter}

                            color="primary"

                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "auto"
                                },

                                display: "flex",

                                flexWrap: {
                                    xs: "wrap",
                                    sm: "nowrap"
                                },

                                "& .MuiToggleButton-root": {

                                    flex: {
                                        xs: "1 1 50%",
                                        sm: "0 0 auto"
                                    },

                                    minWidth: {
                                        xs: 0,
                                        sm: 100,
                                        md: 105
                                    },

                                    height: {
                                        xs: 48,
                                        sm: 54,
                                        md: 56
                                    },

                                    px: {
                                        xs: 1,
                                        sm: 2
                                    },

                                    fontWeight: "bold",

                                    textTransform:
                                        "none",

                                    fontSize: {
                                        xs: ".8rem",
                                        sm: ".9rem"
                                    }
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

                </Paper>



                {/* =====================================================
                    TABLE
                ====================================================== */}

                <TableContainer
                    component={Paper}

                    sx={{
                        width: "100%",

                        maxWidth: "100%",

                        overflowX: "auto",

                        borderRadius: {
                            xs: 3,
                            sm: 4
                        },

                        boxShadow:
                            "0 8px 25px rgba(0,0,0,.08)",

                        "&::-webkit-scrollbar": {
                            height: 8
                        },

                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor:
                                "#90CAF9",

                            borderRadius: 10
                        }
                    }}
                >

                    <Table
                        stickyHeader
                        sx={{
                            minWidth: 950
                        }}
                    >

                        <TableHead>

                            <TableRow>

                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                        background:
                                            "#1976D2",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Book
                                </TableCell>


                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                        background:
                                            "#1976D2",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Author
                                </TableCell>


                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                        background:
                                            "#1976D2",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Issue Date
                                </TableCell>


                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                        background:
                                            "#1976D2",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Due Date
                                </TableCell>


                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                        background:
                                            "#1976D2",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Return Date
                                </TableCell>


                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                        background:
                                            "#1976D2",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Status
                                </TableCell>


                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#fff",
                                        background:
                                            "#1976D2",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Action
                                </TableCell>

                            </TableRow>

                        </TableHead>


                        <TableBody>


                            {filteredHistory.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={7}
                                        align="center"
                                        sx={{
                                            py: 8
                                        }}
                                    >

                                        <Typography
                                            color="text.secondary"
                                            fontWeight={600}
                                        >
                                            No Borrow History
                                            Found
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            ) : (

                                filteredHistory.map(
                                    (book) => (

                                        <TableRow
                                            hover
                                            key={
                                                book.issueId
                                            }
                                        >

                                            <TableCell
                                                sx={{
                                                    fontWeight:
                                                        600,
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {book.title}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {book.author}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {book.issueDate}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {book.dueDate}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {
                                                    book.returnDate ??
                                                    "-"
                                                }
                                            </TableCell>


                                            <TableCell>

                                                <Chip
                                                    label={
                                                        book.status
                                                    }

                                                    color={
                                                        getStatusColor(
                                                            book.status
                                                        )
                                                    }

                                                    size="small"

                                                    sx={{
                                                        width: 110,

                                                        fontWeight:
                                                            "bold",

                                                        justifyContent:
                                                            "center"
                                                    }}
                                                />

                                            </TableCell>


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



                {/* =====================================================
                    BOOK DETAILS DIALOG
                ====================================================== */}

                <BookDetailsDialog
                    open={openDialog}
                    onClose={() =>
                        setOpenDialog(false)
                    }
                    book={selectedBook}
                />

            </Box>

        </StudentDashboardLayout>

    );

}


export default StudentBorrowHistory;