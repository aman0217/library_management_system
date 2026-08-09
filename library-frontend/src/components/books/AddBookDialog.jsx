import { useState } from "react";

import {
    addBook,
    uploadBookCover
} from "../../services/bookService";

import { toast } from "react-toastify";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    Typography,
    Box,
    Chip
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function AddBookDialog({
    open,
    handleClose,
    loadBooks
}) {

    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        publicationYear: "",
        category: "",
        totalCopies: ""
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {

        setBook({
            ...book,
            [e.target.name]: e.target.value
        });

    };

    const handleFileChange = (e) => {

        const file = e.target.files?.[0];

        if (file) {
            setSelectedFile(file);
        }

    };

    const resetForm = () => {

        setBook({
            title: "",
            author: "",
            isbn: "",
            publisher: "",
            publicationYear: "",
            category: "",
            totalCopies: ""
        });

        setSelectedFile(null);

    };

    const handleSave = async () => {

        try {

            const savedBook = await addBook(book);

            if (selectedFile) {

                await uploadBookCover(
                    savedBook.id,
                    selectedFile
                );

            }

            toast.success("Book Added Successfully");

            loadBooks();

            resetForm();

            handleClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to Add Book"
            );

        }

    };

    const handleDialogClose = () => {

        resetForm();
        handleClose();

    };

    return (

        <Dialog
            open={open}
            onClose={handleDialogClose}
            maxWidth="md"
            fullWidth
            fullScreen={false}
            PaperProps={{
                sx: {
                    borderRadius: {
                        xs: 0,
                        sm: 3,
                        md: 5
                    },
                    width: "100%",
                    maxHeight: {
                        xs: "100vh",
                        sm: "90vh"
                    },
                    m: {
                        xs: 0,
                        sm: 2
                    }
                }
            }}
        >

            {/* ================= HEADER ================= */}

            <DialogTitle
                sx={{
                    background:
                        "linear-gradient(135deg,#1976D2,#512DA8)",

                    color: "#fff",

                    display: "flex",

                    alignItems: "center",

                    gap: 1,

                    py: {
                        xs: 1.5,
                        sm: 2
                    },

                    px: {
                        xs: 2,
                        sm: 3
                    }
                }}
            >

                <MenuBookIcon
                    sx={{
                        fontSize: {
                            xs: 22,
                            sm: 28
                        }
                    }}
                />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        fontSize: {
                            xs: "1.15rem",
                            sm: "1.5rem"
                        }
                    }}
                >

                    Add New Book

                </Typography>

            </DialogTitle>


            {/* ================= CONTENT ================= */}

            <DialogContent
                sx={{
                    mt: {
                        xs: 1,
                        sm: 2
                    },

                    px: {
                        xs: 2,
                        sm: 3
                    },

                    py: {
                        xs: 2,
                        sm: 3
                    },

                    overflowY: "auto"
                }}
            >

                <Grid
                    container
                    spacing={{
                        xs: 2,
                        sm: 3
                    }}
                >

                    {/* BOOK TITLE */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Book Title"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* AUTHOR */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Author"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* ISBN */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="ISBN Number"
                            name="isbn"
                            value={book.isbn}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* PUBLISHER */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Publisher"
                            name="publisher"
                            value={book.publisher}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* PUBLICATION YEAR */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Publication Year"
                            name="publicationYear"
                            value={book.publicationYear}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* CATEGORY */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={book.category}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* TOTAL COPIES */}

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            label="Total Copies"
                            name="totalCopies"
                            value={book.totalCopies}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* ================= FILE UPLOAD ================= */}

                    <Grid size={{ xs: 12 }}>

                        <Box
                            sx={{
                                border: "2px dashed #1976D2",

                                borderRadius: {
                                    xs: 2,
                                    sm: 4
                                },

                                p: {
                                    xs: 2,
                                    sm: 3
                                },

                                textAlign: "center",

                                bgcolor: "#F8FAFF",

                                width: "100%"
                            }}
                        >

                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<UploadFileIcon />}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "auto"
                                    },

                                    minHeight: 44
                                }}
                            >

                                Upload Book Cover

                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                            </Button>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={1.5}
                            >

                                JPG, PNG Supported

                            </Typography>

                        </Box>

                    </Grid>


                    {/* ================= SELECTED FILE ================= */}

                    {selectedFile && (

                        <Grid size={{ xs: 12 }}>

                            <Chip
                                color="primary"
                                label={selectedFile.name}
                                sx={{
                                    fontWeight: "bold",

                                    maxWidth: "100%",

                                    "& .MuiChip-label": {
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }
                                }}
                            />

                        </Grid>

                    )}

                </Grid>

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

                    pt: 1,

                    gap: 1,

                    flexDirection: {
                        xs: "column-reverse",
                        sm: "row"
                    },

                    alignItems: "stretch"
                }}
            >

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleDialogClose}
                    sx={{
                        borderRadius: 3,

                        px: 3,

                        minHeight: 44,

                        width: {
                            xs: "100%",
                            sm: "auto"
                        }
                    }}
                >

                    Cancel

                </Button>


                <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                        borderRadius: 3,

                        px: 4,

                        minHeight: 44,

                        width: {
                            xs: "100%",
                            sm: "auto"
                        },

                        background:
                            "linear-gradient(135deg,#1976D2,#512DA8)"
                    }}
                >

                    Save Book

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default AddBookDialog;