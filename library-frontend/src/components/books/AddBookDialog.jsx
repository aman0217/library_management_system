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

        setSelectedFile(e.target.files[0]);

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

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to Add Book"

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
                    borderRadius: 5
                }
            }}
        >

            <DialogTitle
                sx={{
                    background:
                        "linear-gradient(135deg,#1976D2,#512DA8)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    py: 2
                }}
            >

                <MenuBookIcon />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >

                    Add New Book

                </Typography>

            </DialogTitle>

            <DialogContent
                sx={{
                    mt: 3
                }}
            >

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Book Title"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Author"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="ISBN Number"
                            name="isbn"
                            value={book.isbn}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Publisher"
                            name="publisher"
                            value={book.publisher}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Publication Year"
                            name="publicationYear"
                            value={book.publicationYear}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={book.category}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            label="Total Copies"
                            name="totalCopies"
                            value={book.totalCopies}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <Box

                            sx={{

                                border: "2px dashed #1976D2",

                                borderRadius: 4,

                                p: 3,

                                textAlign: "center",

                                bgcolor: "#F8FAFF"

                            }}

                        >

                            <Button

                                component="label"

                                variant="contained"

                                startIcon={<UploadFileIcon />}

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

                                mt={2}

                            >

                                JPG, PNG Supported

                            </Typography>

                        </Box>

                    </Grid>

                    {

                        selectedFile && (

                            <Grid size={{ xs: 12 }}>

                                <Chip

                                    color="primary"

                                    label={selectedFile.name}

                                    sx={{

                                        fontWeight: "bold",

                                        px: 1

                                    }}

                                />

                            </Grid>

                        )

                    }

                </Grid>

            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 3
                }}
            >

                <Button

                    variant="outlined"

                    color="inherit"

                    onClick={handleClose}

                    sx={{

                        borderRadius: 3,

                        px: 3

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