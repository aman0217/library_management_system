import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Avatar,
    Typography,
    Chip,
    Button,
    Divider,
    Grid,
    Paper
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import BusinessIcon from "@mui/icons-material/Business";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PaidIcon from "@mui/icons-material/Paid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function BookDetailsDialog({
    open,
    onClose,
    book
}) {

    if (!book) return null;

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

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            fullScreen={false}
            PaperProps={{
                sx: {

                    borderRadius: {
                        xs: 2,
                        sm: 3,
                        md: 5
                    },

                    width: {
                        xs: "calc(100% - 20px)",
                        sm: "calc(100% - 32px)",
                        md: "100%"
                    },

                    maxHeight: {
                        xs: "calc(100vh - 20px)",
                        sm: "calc(100vh - 32px)",
                        md: "90vh"
                    },

                    overflow: "hidden"

                }
            }}
        >

            {/* ================= TITLE ================= */}

            <DialogTitle
                sx={{

                    background:
                        "linear-gradient(135deg,#1976d2,#512DA8)",

                    color: "#fff",

                    fontWeight: "bold",

                    fontSize: {
                        xs: 20,
                        sm: 23,
                        md: 26
                    },

                    px: {
                        xs: 2,
                        sm: 3
                    },

                    py: {
                        xs: 1.5,
                        sm: 2
                    },

                    lineHeight: 1.3

                }}
            >

                📖 Book Details

            </DialogTitle>

            {/* ================= CONTENT ================= */}

            <DialogContent
                sx={{

                    mt: {
                        xs: 1,
                        sm: 2,
                        md: 3
                    },

                    px: {
                        xs: 1.5,
                        sm: 2.5,
                        md: 3
                    },

                    pb: 2,

                    overflowY: "auto",

                    overflowX: "hidden"

                }}
            >

                <Box
                    sx={{

                        display: "flex",

                        gap: {
                            xs: 2,
                            sm: 3,
                            md: 4
                        },

                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },

                        alignItems: {
                            xs: "center",
                            md: "flex-start"
                        },

                        width: "100%"

                    }}
                >

                    {/* ================= LEFT SIDE ================= */}

                    <Box
                        sx={{

                            width: {
                                xs: "100%",
                                sm: 220,
                                md: 220
                            },

                            minWidth: {
                                md: 220
                            },

                            textAlign: "center",

                            flexShrink: 0

                        }}
                    >

                        {

                            book.coverImage ?

                                <Box
                                    component="img"
                                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${book.coverImage}`}
                                    alt={book.title || "Book cover"}
                                    sx={{

                                        width: {
                                            xs: 140,
                                            sm: 165,
                                            md: 180
                                        },

                                        height: {
                                            xs: 190,
                                            sm: 220,
                                            md: 240
                                        },

                                        maxWidth: "100%",

                                        objectFit: "cover",

                                        borderRadius: 3,

                                        boxShadow: 5

                                    }}
                                />

                                :

                                <Avatar
                                    sx={{

                                        width: {
                                            xs: 140,
                                            sm: 165,
                                            md: 180
                                        },

                                        height: {
                                            xs: 190,
                                            sm: 220,
                                            md: 240
                                        },

                                        bgcolor: "#E3F2FD",

                                        color: "#1976d2",

                                        mx: "auto",

                                        borderRadius: 3

                                    }}
                                >

                                    <MenuBookIcon
                                        sx={{

                                            fontSize: {
                                                xs: 65,
                                                sm: 75,
                                                md: 90
                                            }

                                        }}
                                    />

                                </Avatar>

                        }

                        <Chip
                            label={book.status}
                            color={getStatusColor(book.status)}
                            sx={{

                                mt: 2,

                                width: {
                                    xs: 130,
                                    sm: 140
                                },

                                fontWeight: "bold",

                                fontSize: {
                                    xs: 13,
                                    sm: 15
                                }

                            }}
                        />

                    </Box>

                    {/* ================= RIGHT SIDE ================= */}

                    <Box
                        sx={{

                            flex: 1,

                            width: {
                                xs: "100%",
                                md: "auto"
                            },

                            minWidth: 0

                        }}
                    >

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="primary"
                            sx={{

                                fontSize: {
                                    xs: 24,
                                    sm: 30,
                                    md: 34
                                },

                                lineHeight: 1.2,

                                wordBreak: "break-word",

                                overflowWrap: "anywhere"

                            }}
                        >

                            {book.title}

                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* ================= BOOK + LIBRARY INFO ================= */}

                        <Grid
                            container
                            spacing={{
                                xs: 1.5,
                                sm: 2
                            }}
                        >

                            {/* BOOK INFORMATION */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <Paper
                                    elevation={2}
                                    sx={{

                                        p: {
                                            xs: 1.5,
                                            sm: 2
                                        },

                                        borderRadius: 3,

                                        height: "100%",

                                        overflow: "hidden"

                                    }}
                                >

                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        mb={2}
                                    >

                                        Book Information

                                    </Typography>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        mb={1.5}
                                        sx={{ minWidth: 0 }}
                                    >

                                        <PersonIcon
                                            color="primary"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                wordBreak: "break-word",
                                                overflowWrap: "anywhere"
                                            }}
                                        >

                                            <b>Author :</b> {book.author}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        mb={1.5}
                                        sx={{ minWidth: 0 }}
                                    >

                                        <NumbersIcon
                                            color="primary"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                wordBreak: "break-word",
                                                overflowWrap: "anywhere"
                                            }}
                                        >

                                            <b>ISBN :</b> {book.isbn}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        mb={1.5}
                                        sx={{ minWidth: 0 }}
                                    >

                                        <BusinessIcon
                                            color="primary"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                wordBreak: "break-word",
                                                overflowWrap: "anywhere"
                                            }}
                                        >

                                            <b>Publisher :</b> {book.publisher}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        mb={1.5}
                                        sx={{ minWidth: 0 }}
                                    >

                                        <CategoryIcon
                                            color="primary"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                wordBreak: "break-word",
                                                overflowWrap: "anywhere"
                                            }}
                                        >

                                            <b>Category :</b> {book.category}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        sx={{ minWidth: 0 }}
                                    >

                                        <CalendarMonthIcon
                                            color="primary"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                wordBreak: "break-word"
                                            }}
                                        >

                                            <b>Publication :</b>{" "}
                                            {book.publicationYear}

                                        </Typography>

                                    </Box>

                                </Paper>

                            </Grid>

                            {/* LIBRARY INFORMATION */}

                            <Grid size={{ xs: 12, md: 6 }}>

                                <Paper
                                    elevation={2}
                                    sx={{

                                        p: {
                                            xs: 1.5,
                                            sm: 2
                                        },

                                        borderRadius: 3,

                                        height: "100%"

                                    }}
                                >

                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        mb={2}
                                    >

                                        Library Information

                                    </Typography>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        mb={1.5}
                                    >

                                        <LibraryBooksIcon
                                            color="success"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography>

                                            <b>Total Copies :</b>{" "}
                                            {book.totalCopies}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                    >

                                        <Inventory2Icon
                                            color="success"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography>

                                            <b>Available :</b>{" "}
                                            {book.availableCopies}

                                        </Typography>

                                    </Box>

                                </Paper>

                            </Grid>

                        </Grid>

                        {/* ================= BORROW INFORMATION ================= */}

                        <Paper
                            elevation={2}
                            sx={{

                                mt: 3,

                                p: {
                                    xs: 1.5,
                                    sm: 2
                                },

                                borderRadius: 3

                            }}
                        >

                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                mb={2}
                            >

                                Borrow Information

                            </Typography>

                            <Grid
                                container
                                spacing={{
                                    xs: 1.5,
                                    sm: 2
                                }}
                            >

                                <Grid size={{ xs: 12, md: 6 }}>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        mb={1.5}
                                    >

                                        <CalendarMonthIcon
                                            color="primary"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                wordBreak: "break-word"
                                            }}
                                        >

                                            <b>Issue Date :</b>{" "}
                                            {book.issueDate}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        mb={1.5}
                                    >

                                        <CalendarMonthIcon
                                            color="warning"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                wordBreak: "break-word"
                                            }}
                                        >

                                            <b>Due Date :</b>{" "}
                                            {book.dueDate}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                    >

                                        <CalendarMonthIcon
                                            color="success"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                wordBreak: "break-word"
                                            }}
                                        >

                                            <b>Return Date :</b>{" "}

                                            {
                                                book.returnDate
                                                    ? book.returnDate
                                                    : "Not Returned"
                                            }

                                        </Typography>

                                    </Box>

                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                        mb={1.5}
                                    >

                                        <AccessTimeIcon
                                            color="info"
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography>

                                            <b>Remaining Days :</b>{" "}
                                            {book.remainingDays}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="flex-start"
                                    >

                                        <PaidIcon
                                            color={
                                                book.fine > 0
                                                    ? "error"
                                                    : "success"
                                            }
                                            sx={{
                                                mr: 1,
                                                flexShrink: 0
                                            }}
                                        />

                                        <Typography
                                            color={
                                                book.fine > 0
                                                    ? "error.main"
                                                    : "success.main"
                                            }
                                            fontWeight="bold"
                                        >

                                            Fine : ₹{book.fine}

                                        </Typography>

                                    </Box>

                                </Grid>

                            </Grid>

                        </Paper>

                    </Box>

                </Box>

            </DialogContent>

            {/* ================= ACTIONS ================= */}

            <DialogActions
                sx={{

                    px: {
                        xs: 2,
                        sm: 3
                    },

                    pb: {
                        xs: 2,
                        sm: 3
                    },

                    pt: 1

                }}
            >

                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{

                        borderRadius: 1,

                        px: {
                            xs: 2.5,
                            sm: 3
                        },

                        width: {
                            xs: "100%",
                            sm: "auto"
                        }

                    }}
                >

                    Close

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default BookDetailsDialog;