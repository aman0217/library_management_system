import { useEffect, useState } from "react";

import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";
import BookDetailsDialog from "../../components/student/BookDetailsDialog";

import {
    getFineHistory,
    getBorrowHistoryBookDetails
} from "../../services/dashboardService";

import { getCurrentUser } from "../../services/userService";

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
    Button,
    Avatar
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaidIcon from "@mui/icons-material/Paid";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";


function StudentFineHistory() {

    // =========================
    // STATES
    // =========================

    const [loading, setLoading] = useState(true);

    const [fineHistory, setFineHistory] = useState([]);

    const [selectedBook, setSelectedBook] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    const [filteredHistory, setFilteredHistory] = useState([]);


    // =========================
    // LOAD FINE HISTORY
    // =========================

    const loadFineHistory = async () => {

        try {

            const user = await getCurrentUser();

            if (!user || !user.id) {
                console.error("Current user not found");
                return;
            }

            const data = await getFineHistory(user.id);

            console.log("Fine History =", data);

            const historyData = Array.isArray(data)
                ? data
                : [];

            setFineHistory(historyData);

            setFilteredHistory(historyData);

        }

        catch (error) {

            console.error(
                "Error loading fine history:",
                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadFineHistory();

    }, []);


    // =========================
    // SEARCH + FILTER
    // =========================

    useEffect(() => {

        let data = [...fineHistory];


        // STATUS FILTER

        if (filter !== "ALL") {

            data = data.filter(
                (fine) =>
                    fine.status === filter
            );

        }


        // SEARCH FILTER

        if (search.trim() !== "") {

            const searchValue =
                search.toLowerCase().trim();

            data = data.filter((fine) => {

                const bookTitle =
                    String(
                        fine.bookTitle || ""
                    ).toLowerCase();

                const author =
                    String(
                        fine.author || ""
                    ).toLowerCase();

                return (
                    bookTitle.includes(searchValue) ||
                    author.includes(searchValue)
                );

            });

        }


        setFilteredHistory(data);

    }, [
        search,
        filter,
        fineHistory
    ]);


    // =========================
    // VIEW BOOK DETAILS
    // =========================

    const handleView = async (issueId) => {

        try {

            if (!issueId) {
                console.error(
                    "Issue ID is missing"
                );
                return;
            }

            const data =
                await getBorrowHistoryBookDetails(
                    issueId
                );

            console.log(
                "Book Details =",
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


    // =========================
    // SUMMARY CALCULATIONS
    // =========================

    const totalFineRecords =
        fineHistory.length;


    const unpaidFine =
        fineHistory.filter(
            (fine) =>
                fine.status === "UNPAID"
        ).length;


    const paidFine =
        fineHistory.filter(
            (fine) =>
                fine.status === "PAID"
        ).length;


    const totalAmount =
        fineHistory.reduce(
            (sum, fine) =>
                sum +
                Number(fine.fineAmount || 0),
            0
        );


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        minHeight: "60vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                    <CircularProgress />

                </Box>

            </StudentDashboardLayout>

        );

    }


    // =========================
    // MAIN UI
    // =========================

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
                    PAGE HEADER
                ===================================== */}

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

                        background:
                            "linear-gradient(135deg,#E53935,#8E24AA)",

                        color: "#fff",

                        overflow: "hidden"
                    }}
                >

                    <Box
                        sx={{
                            minHeight: {
                                xs: 190,
                                sm: 210,
                                md: 220
                            },

                            px: {
                                xs: 2.5,
                                sm: 4,
                                md: 5
                            },

                            py: {
                                xs: 3,
                                sm: 4
                            },

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

                            gap: 3
                        }}
                    >


                        {/* LEFT */}

                        <Box>

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    fontSize: {
                                        xs: "1.7rem",
                                        sm: "2rem",
                                        md: "2.2rem"
                                    }
                                }}
                            >
                                💰 Fine History
                            </Typography>


                            <Typography
                                sx={{
                                    mt: 1,
                                    fontSize: {
                                        xs: "0.95rem",
                                        sm: "1rem"
                                    },

                                    opacity: 0.9
                                }}
                            >
                                View all your fine
                                records.
                            </Typography>


                            <ReceiptLongIcon
                                sx={{
                                    fontSize: {
                                        xs: 45,
                                        sm: 55,
                                        md: 60
                                    },

                                    mt: 1.5
                                }}
                            />

                        </Box>


                        {/* RIGHT */}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent:
                                    "center",

                                alignItems:
                                    "center",

                                alignSelf: {
                                    xs: "flex-end",
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

                                    color: "#8E24AA"
                                }}
                            >

                                <CurrencyRupeeIcon
                                    sx={{
                                        fontSize: {
                                            xs: 38,
                                            sm: 45,
                                            md: 50
                                        }
                                    }}
                                />

                            </Avatar>

                        </Box>

                    </Box>

                </Card>



                {/* =====================================
                    SUMMARY CARDS
                ===================================== */}

                <Grid
                    container
                    spacing={{
                        xs: 2,
                        sm: 2.5,
                        md: 3
                    }}
                    sx={{
                        width: "100%",
                        m: 0,
                        mb: {
                            xs: 3,
                            md: 4
                        }
                    }}
                >


                    {/* TOTAL RECORDS */}

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
                                    xs: 145,
                                    md: 165
                                },

                                height: "100%",

                                borderRadius: {
                                    xs: 3,
                                    md: 5
                                },

                                background:
                                    "linear-gradient(135deg,#5C6BC0,#3949AB)",

                                color: "#fff",

                                boxShadow:
                                    "0 10px 25px rgba(57,73,171,.35)",

                                transition: ".35s",

                                "&:hover": {
                                    transform:
                                        "translateY(-6px)",

                                    boxShadow:
                                        "0 18px 35px rgba(57,73,171,.45)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2.5,
                                        md: 3
                                    },

                                    "&:last-child": {
                                        pb: {
                                            xs: 2.5,
                                            md: 3
                                        }
                                    }
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
                                                color:
                                                    "rgba(255,255,255,.85)"
                                            }}
                                        >
                                            Total Records
                                        </Typography>

                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mt: 1,
                                                fontSize: {
                                                    xs: "2rem",
                                                    md: "2.8rem"
                                                }
                                            }}
                                        >
                                            {totalFineRecords}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            width: {
                                                xs: 50,
                                                md: 60
                                            },

                                            height: {
                                                xs: 50,
                                                md: 60
                                            },

                                            borderRadius: "50%",

                                            bgcolor:
                                                "rgba(255,255,255,.18)",

                                            display: "flex",

                                            justifyContent:
                                                "center",

                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <ReceiptLongIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 28,
                                                    md: 34
                                                }
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* UNPAID */}

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
                                    xs: 145,
                                    md: 165
                                },

                                height: "100%",

                                borderRadius: {
                                    xs: 3,
                                    md: 5
                                },

                                background:
                                    "linear-gradient(135deg,#EF5350,#C62828)",

                                color: "#fff",

                                boxShadow:
                                    "0 10px 25px rgba(198,40,40,.35)",

                                transition: ".35s",

                                "&:hover": {
                                    transform:
                                        "translateY(-6px)",

                                    boxShadow:
                                        "0 18px 35px rgba(198,40,40,.45)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2.5,
                                        md: 3
                                    }
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
                                                color:
                                                    "rgba(255,255,255,.85)"
                                            }}
                                        >
                                            Unpaid
                                        </Typography>

                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mt: 1,
                                                fontSize: {
                                                    xs: "2rem",
                                                    md: "2.8rem"
                                                }
                                            }}
                                        >
                                            {unpaidFine}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            width: {
                                                xs: 50,
                                                md: 60
                                            },

                                            height: {
                                                xs: 50,
                                                md: 60
                                            },

                                            borderRadius: "50%",

                                            bgcolor:
                                                "rgba(255,255,255,.18)",

                                            display: "flex",

                                            justifyContent:
                                                "center",

                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <MoneyOffIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 28,
                                                    md: 34
                                                }
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* PAID */}

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
                                    xs: 145,
                                    md: 165
                                },

                                height: "100%",

                                borderRadius: {
                                    xs: 3,
                                    md: 5
                                },

                                background:
                                    "linear-gradient(135deg,#66BB6A,#2E7D32)",

                                color: "#fff",

                                boxShadow:
                                    "0 10px 25px rgba(46,125,50,.35)",

                                transition: ".35s",

                                "&:hover": {
                                    transform:
                                        "translateY(-6px)",

                                    boxShadow:
                                        "0 18px 35px rgba(46,125,50,.45)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2.5,
                                        md: 3
                                    }
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
                                                color:
                                                    "rgba(255,255,255,.85)"
                                            }}
                                        >
                                            Paid
                                        </Typography>

                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mt: 1,
                                                fontSize: {
                                                    xs: "2rem",
                                                    md: "2.8rem"
                                                }
                                            }}
                                        >
                                            {paidFine}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            width: {
                                                xs: 50,
                                                md: 60
                                            },

                                            height: {
                                                xs: 50,
                                                md: 60
                                            },

                                            borderRadius: "50%",

                                            bgcolor:
                                                "rgba(255,255,255,.18)",

                                            display: "flex",

                                            justifyContent:
                                                "center",

                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <PaidIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 28,
                                                    md: 34
                                                }
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>



                    {/* TOTAL FINE */}

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
                                    xs: 145,
                                    md: 165
                                },

                                height: "100%",

                                borderRadius: {
                                    xs: 3,
                                    md: 5
                                },

                                background:
                                    "linear-gradient(135deg,#FF9800,#EF6C00)",

                                color: "#fff",

                                boxShadow:
                                    "0 10px 25px rgba(239,108,0,.35)",

                                transition: ".35s",

                                "&:hover": {
                                    transform:
                                        "translateY(-6px)",

                                    boxShadow:
                                        "0 18px 35px rgba(239,108,0,.45)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 2.5,
                                        md: 3
                                    }
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
                                                color:
                                                    "rgba(255,255,255,.85)"
                                            }}
                                        >
                                            Total Fine
                                        </Typography>

                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                mt: 1,
                                                fontSize: {
                                                    xs: "2rem",
                                                    md: "2.8rem"
                                                }
                                            }}
                                        >
                                            ₹{totalAmount}
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            width: {
                                                xs: 50,
                                                md: 60
                                            },

                                            height: {
                                                xs: 50,
                                                md: 60
                                            },

                                            borderRadius: "50%",

                                            bgcolor:
                                                "rgba(255,255,255,.18)",

                                            display: "flex",

                                            justifyContent:
                                                "center",

                                            alignItems:
                                                "center"
                                        }}
                                    >

                                        <CurrencyRupeeIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 28,
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



                {/* =====================================
                    SEARCH + FILTER
                ===================================== */}

                <Box
                    sx={{
                        mt: {
                            xs: 3,
                            md: 5
                        },

                        mb: {
                            xs: 3,
                            md: 4
                        },

                        display: "flex",

                        alignItems: {
                            xs: "stretch",
                            md: "center"
                        },

                        gap: 2,

                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },

                        width: "100%"
                    }}
                >


                    {/* SEARCH */}

                    <TextField
                        fullWidth
                        placeholder="Search Book or Author..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
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
                            flex: 1,

                            "& .MuiOutlinedInput-root":
                            {
                                borderRadius: 3,

                                minHeight: 54
                            }
                        }}
                    />


                    {/* FILTER */}

                    <ToggleButtonGroup
                        exclusive
                        value={filter}

                        onChange={
                            (event, value) => {

                                if (value) {
                                    setFilter(value);
                                }

                            }
                        }

                        color="primary"

                        sx={{
                            width: {
                                xs: "100%",
                                md: "auto"
                            },

                            display: "flex",

                            "& .MuiToggleButton-root":
                            {
                                flex: {
                                    xs: 1,
                                    md: "initial"
                                },

                                minWidth: {
                                    xs: 0,
                                    md: 110
                                },

                                minHeight: 54,

                                px: {
                                    xs: 1,
                                    md: 2
                                },

                                fontWeight: "bold",

                                textTransform:
                                    "none"
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



                {/* =====================================
                    TABLE
                ===================================== */}

                <TableContainer
                    component={Paper}

                    sx={{
                        width: "100%",

                        maxWidth: "100%",

                        borderRadius: {
                            xs: 2,
                            md: 4
                        },

                        boxShadow: {
                            xs: 2,
                            md: 4
                        },

                        overflowX: "auto",

                        WebkitOverflowScrolling:
                            "touch"
                    }}
                >

                    <Table
                        sx={{
                            minWidth: 1050
                        }}
                    >

                        <TableHead>

                            <TableRow
                                sx={{
                                    background:
                                        "#F5F7FA"
                                }}
                            >

                                <TableCell
                                    sx={{
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
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Due Date
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Return Date
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Late Days
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Fine
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight:
                                            "bold",
                                        whiteSpace:
                                            "nowrap"
                                    }}
                                >
                                    Status
                                </TableCell>

                                <TableCell
                                    sx={{
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


                        <TableBody>


                            {filteredHistory.length === 0 ? (

                                <TableRow>

                                    <TableCell
                                        colSpan={9}
                                        align="center"
                                        sx={{
                                            py: 6
                                        }}
                                    >

                                        <Typography
                                            color="text.secondary"
                                            fontWeight="600"
                                        >
                                            No Fine History Found
                                        </Typography>

                                    </TableCell>

                                </TableRow>

                            ) : (

                                filteredHistory.map(
                                    (fine) => (

                                        <TableRow
                                            hover
                                            key={
                                                fine.issueId
                                            }
                                        >

                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {fine.bookTitle}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {fine.author}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {fine.issueDate}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {fine.dueDate}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >
                                                {fine.returnDate ||
                                                    "-"}
                                            </TableCell>


                                            <TableCell>
                                                {fine.lateDays}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                <Typography
                                                    fontWeight="bold"
                                                    color="error.main"
                                                >
                                                    ₹
                                                    {Number(
                                                        fine.fineAmount ||
                                                        0
                                                    )}
                                                </Typography>

                                            </TableCell>


                                            <TableCell>

                                                <Chip
                                                    label={
                                                        fine.status
                                                    }

                                                    color={
                                                        fine.status ===
                                                        "PAID"
                                                            ? "success"
                                                            : "error"
                                                    }

                                                    sx={{
                                                        width: 110,

                                                        fontWeight:
                                                            "bold",

                                                        "& .MuiChip-label":
                                                        {
                                                            width:
                                                                "100%",

                                                            textAlign:
                                                                "center"
                                                        }
                                                    }}
                                                />

                                            </TableCell>


                                            <TableCell>

                                                <Button
                                                    variant="contained"
                                                    size="small"

                                                    startIcon={
                                                        <VisibilityIcon />
                                                    }

                                                    onClick={() =>
                                                        handleView(
                                                            fine.issueId
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


export default StudentFineHistory;