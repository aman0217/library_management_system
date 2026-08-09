import { useEffect, useState } from "react";

import { updateBook } from "../../services/bookService";

import { toast } from "react-toastify";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

function EditBookDialog({
    open,
    handleClose,
    book,
    loadBooks
}) {

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        publicationYear: "",
        category: "",
        totalCopies: ""
    });

    useEffect(() => {

        if (book) {

            setFormData({
                title: book.title || "",
                author: book.author || "",
                isbn: book.isbn || "",
                publisher: book.publisher || "",
                publicationYear: book.publicationYear || "",
                category: book.category || "",
                totalCopies: book.totalCopies || ""
            });

        }

    }, [book]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleUpdate = async () => {

        try {

            await updateBook(book.id, formData);

            toast.success("Book Updated Successfully");

            loadBooks();

            handleClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to Update Book"
            );

        }

    };

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
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

                <EditIcon
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
                    Edit Book
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
                            value={formData.title}
                            onChange={handleChange}
                            sx={{
                                mt: {
                                    xs: 0,
                                    sm: 0.5
                                }
                            }}
                        />

                    </Grid>


                    {/* AUTHOR */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            sx={{
                                mt: {
                                    xs: 0,
                                    sm: 0.5
                                }
                            }}
                        />

                    </Grid>


                    {/* ISBN */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="ISBN Number"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* PUBLISHER */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Publisher"
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* PUBLICATION YEAR */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Publication Year"
                            name="publicationYear"
                            value={formData.publicationYear}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* CATEGORY */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />

                    </Grid>


                    {/* TOTAL COPIES */}

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            label="Total Copies"
                            name="totalCopies"
                            value={formData.totalCopies}
                            onChange={handleChange}
                        />

                    </Grid>

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
                    onClick={handleClose}
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
                    onClick={handleUpdate}
                    sx={{
                        borderRadius: 3,

                        px: 4,

                        minHeight: 44,

                        width: {
                            xs: "100%",
                            sm: "auto"
                        },

                        background:
                            "linear-gradient(135deg,#1976D2,#512DA8)",

                        "&:hover": {
                            background:
                                "linear-gradient(135deg,#1565C0,#4527A0)"
                        }
                    }}
                >
                    Update Book
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default EditBookDialog;