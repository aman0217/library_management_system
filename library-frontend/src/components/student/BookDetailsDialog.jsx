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
            PaperProps={{
                sx: {
                    borderRadius: 5
                }
            }}
        >

            <DialogTitle
                sx={{
                    background:
                        "linear-gradient(135deg,#1976d2,#512DA8)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 26
                }}
            >

                📖 Book Details

            </DialogTitle>

            <DialogContent sx={{ mt: 3 }}>

                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                        flexWrap: {
                            xs: "wrap",
                            md: "nowrap"
                        }
                    }}
                >

                    {/* LEFT SIDE */}
                    <Box
                        sx={{
                            width: 220,
                            textAlign: "center"
                        }}
                    >

                        {
                            book.coverImage ?

                                <Box
                                    component="img"
                                    src={`http://localhost:8080${book.coverImage}`}
                                    sx={{
                                        width: 180,
                                        height: 240,
                                        objectFit: "cover",
                                        borderRadius: 3,
                                        boxShadow: 5
                                    }}
                                />

                                :

                                <Avatar
                                    sx={{
                                        width: 180,
                                        height: 240,
                                        bgcolor: "#E3F2FD",
                                        color: "#1976d2",
                                        mx: "auto",
                                        borderRadius: 3
                                    }}
                                >

                                    <MenuBookIcon
                                        sx={{
                                            fontSize: 90
                                        }}
                                    />

                                </Avatar>

                        }

                        <Chip

                            label={book.status}

                            color={getStatusColor(book.status)}

                            sx={{
                                mt: 2,
                                width: 140,
                                fontWeight: "bold",
                                fontSize: 15
                            }}

                        />

                    </Box>
                                        {/* RIGHT SIDE */}

                    <Box sx={{ flex: 1 }}>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="primary"
                        >

                            {book.title}

                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2}>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 2,
                                        borderRadius: 3
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
                                        alignItems="center"
                                        mb={1.5}
                                    >

                                        <PersonIcon
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Author :</b> {book.author}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={1.5}
                                    >

                                        <NumbersIcon
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>ISBN :</b> {book.isbn}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={1.5}
                                    >

                                        <BusinessIcon
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Publisher :</b> {book.publisher}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={1.5}
                                    >

                                        <CategoryIcon
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Category :</b> {book.category}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >

                                        <CalendarMonthIcon
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Publication :</b> {book.publicationYear}

                                        </Typography>

                                    </Box>

                                </Paper>

                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 2,
                                        borderRadius: 3
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
                                        alignItems="center"
                                        mb={1.5}
                                    >

                                        <LibraryBooksIcon
                                            color="success"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Total Copies :</b> {book.totalCopies}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >

                                        <Inventory2Icon
                                            color="success"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Available :</b> {book.availableCopies}

                                        </Typography>

                                    </Box>

                                </Paper>

                            </Grid>

                        </Grid>
                                                <Paper
                            elevation={2}
                            sx={{
                                mt: 3,
                                p: 2,
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

                            <Grid container spacing={2}>

                                <Grid size={{ xs: 12, md: 6 }}>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={1.5}
                                    >

                                        <CalendarMonthIcon
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Issue Date :</b> {book.issueDate}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        mb={1.5}
                                    >

                                        <CalendarMonthIcon
                                            color="warning"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Due Date :</b> {book.dueDate}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >

                                        <CalendarMonthIcon
                                            color="success"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

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
                                        alignItems="center"
                                        mb={1.5}
                                    >

                                        <AccessTimeIcon
                                            color="info"
                                            sx={{ mr: 1 }}
                                        />

                                        <Typography>

                                            <b>Remaining Days :</b>{" "}

                                            {book.remainingDays}

                                        </Typography>

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >

                                        <PaidIcon
                                            color={
                                                book.fine > 0
                                                    ? "error"
                                                    : "success"
                                            }
                                            sx={{ mr: 1 }}
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

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3
                }}
            >

                <Button

                    variant="contained"

                    onClick={onClose}

                    sx={{
                        borderRadius: 1,
                        px: 2
                    }}

                >

                    Close

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default BookDetailsDialog;