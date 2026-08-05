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

        }

        catch (error) {

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

                    borderRadius: 5,
                    

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

                <EditIcon />

                <Typography

                    variant="h5"

                    fontWeight="bold"

                >

                    Edit Book

                </Typography>

            </DialogTitle>

            <DialogContent

                sx={{

                    mt: 3,

                }}

            >

                <Grid

                    container

                    spacing={3}

                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                        sx = {{
                            mt: 1
                        }}

                            fullWidth

                            label="Book Title"

                            name="title"

                            value={formData.title}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                        sx = {{
                            mt: 1
                        }}

                            fullWidth

                            label="Author"

                            name="author"

                            value={formData.author}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            label="ISBN Number"

                            name="isbn"

                            value={formData.isbn}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            label="Publisher"

                            name="publisher"

                            value={formData.publisher}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            label="Publication Year"

                            name="publicationYear"

                            value={formData.publicationYear}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            label="Category"

                            name="category"

                            value={formData.category}

                            onChange={handleChange}

                        />

                    </Grid>

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

                    onClick={handleUpdate}

                    sx={{

                        borderRadius: 3,

                        px: 4,

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