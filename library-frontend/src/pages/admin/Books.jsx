import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    Avatar,
    Stack,
    InputAdornment,
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import Grid from "@mui/material/Grid";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { toast } from "react-toastify";

import {
    getBooks,
    searchBooks,
    deleteBook
} from "../../services/bookService";

import {
    getDashboardSummary
} from "../../services/dashboardService";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AddBookDialog from "../../components/books/AddBookDialog";
import EditBookDialog from "../../components/books/EditBookDialog";

import { DataGrid } from "@mui/x-data-grid";


function Books() {

    const [rows, setRows] = useState([]);

    const [rowCount, setRowCount] = useState(0);

    const [summary, setSummary] = useState(null);

    const [keyword, setKeyword] = useState("");

    const [selectedBook, setSelectedBook] = useState(null);

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10
    });


    /*
    ============================================================
                         LOAD DATA
    ============================================================
    */

    useEffect(() => {

        loadBooks();

        loadSummary();

    }, [paginationModel]);


    const loadBooks = async () => {

        try {

            const data = await getBooks(
                paginationModel.page,
                paginationModel.pageSize
            );

            setRows(data.content);

            setRowCount(data.totalElements);

        }

        catch (error) {

            console.error(error);

        }

    };


    const loadSummary = async () => {

        try {

            const data = await getDashboardSummary();

            setSummary(data);

        }

        catch (error) {

            console.error(error);

        }

    };


    /*
    ============================================================
                           SEARCH
    ============================================================
    */

    const handleSearch = async (value) => {

        setKeyword(value);

        try {

            if (value.trim() === "") {

                loadBooks();

                return;

            }

            const data = await searchBooks(value);

            setRows(data.content);

            setRowCount(data.totalElements);

        }

        catch (error) {

            console.error(error);

        }

    };


    /*
    ============================================================
                           DELETE
    ============================================================
    */

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {

            await deleteBook(id);

            toast.success("Book Deleted Successfully");

            loadBooks();

            loadSummary();

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to Delete Book"
            );

        }

    };


    /*
    ============================================================
                           COLUMNS
    ============================================================
    */

    const columns = [

        {
            field: "id",
            headerName: "ID",
            width: 80
        },

        {
            field: "title",
            headerName: "Title",
            flex: 1,
            minWidth: 180
        },

        {
            field: "author",
            headerName: "Author",
            flex: 1,
            minWidth: 160
        },

        {
            field: "isbn",
            headerName: "ISBN",
            width: 180
        },

        {
            field: "availableCopies",
            headerName: "Available",
            width: 120
        },

        {
            field: "totalCopies",
            headerName: "Total",
            width: 120
        },

        {
            field: "category",
            headerName: "Category",
            width: 150
        },

        {
            field: "publisher",
            headerName: "Publisher",
            flex: 1,
            minWidth: 160
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 150,

            sortable: false,

            filterable: false,

            renderCell: (params) => (

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5
                    }}
                >

                    <IconButton
                        color="primary"
                        onClick={() => {

                            setSelectedBook(params.row);

                            setEditDialogOpen(true);

                        }}
                        sx={{
                            transition: ".25s",

                            "&:hover": {

                                bgcolor: "#E3F2FD",

                                transform: "scale(1.12)"

                            }
                        }}
                    >

                        <EditIcon />

                    </IconButton>


                    <IconButton
                        color="error"
                        onClick={() =>
                            handleDelete(params.row.id)
                        }
                        sx={{
                            transition: ".25s",

                            "&:hover": {

                                bgcolor: "#FFEBEE",

                                transform: "scale(1.12)"

                            }
                        }}
                    >

                        <DeleteIcon />

                    </IconButton>

                </Box>

            )

        }

    ];


    /*
    ============================================================
                         CATEGORY COUNT
    ============================================================
    */

    const categoryCount =
        new Set(
            rows.map((book) => book.category)
        ).size;


    /*
    ============================================================
                            UI
    ============================================================
    */

    return (

        <DashboardLayout>

            {/* ==================================================
                                HEADER
            ================================================== */}

            <Card
                sx={{
                    mb: 4,

                    borderRadius: 5,

                    background:
                        "linear-gradient(135deg,#1976D2,#512DA8)",

                    color: "#fff",

                    overflow: "hidden",

                    transition: ".35s",

                    "&:hover": {

                        boxShadow:
                            "0 18px 40px rgba(25,118,210,.25)"

                    }
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

                            justifyContent:
                                "space-between",

                            alignItems: "center",

                            gap: 3,

                            flexWrap: {
                                xs: "wrap",
                                sm: "nowrap"
                            }
                        }}
                    >

                        <Box
                            sx={{
                                flex: 1,
                                minWidth: 0
                            }}
                        >

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    fontSize: {
                                        xs: "1.7rem",
                                        sm: "2rem",
                                        md: "2.125rem"
                                    },

                                    lineHeight: 1.2
                                }}
                            >

                                📚 Books Management

                            </Typography>


                            <Typography
                                sx={{
                                    mt: 1,

                                    opacity: .9,

                                    fontSize: {
                                        xs: ".9rem",
                                        sm: "1rem"
                                    }
                                }}
                            >

                                Manage, organize and maintain
                                your complete library collection.

                            </Typography>

                        </Box>


                        <Avatar
                            sx={{
                                width: {
                                    xs: 60,
                                    sm: 70,
                                    md: 80
                                },

                                height: {
                                    xs: 60,
                                    sm: 70,
                                    md: 80
                                },

                                flexShrink: 0,

                                bgcolor:
                                    "rgba(255,255,255,.2)",

                                border:
                                    "3px solid rgba(255,255,255,.35)",

                                mr: {
                                    xs: 0,
                                    sm: 1,
                                    md: 3
                                },

                                transition: ".3s",

                                "&:hover": {

                                    transform:
                                        "scale(1.08) rotate(3deg)"

                                }
                            }}
                        >

                            <LibraryBooksIcon
                                sx={{
                                    fontSize: {
                                        xs: 32,
                                        sm: 38,
                                        md: 45
                                    }
                                }}
                            />

                        </Avatar>

                    </Box>

                </CardContent>

            </Card>


            {/* ==================================================
                         STATISTICS CARDS
            ================================================== */}

            <Grid
                container
                spacing={{
                    xs: 2,
                    sm: 2.5,
                    md: 3
                }}
                sx={{
                    mb: 4
                }}
            >

                {/* TOTAL BOOKS */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3
                    }}
                >

                    <Card
                        sx={{
                            height: 150,

                            borderRadius: 4,

                            background: "#EAF4FF",

                            border:
                                "1px solid #D8E8FF",

                            boxShadow:
                                "0 8px 25px rgba(0,0,0,.05)",

                            transition:
                                "all .35s ease",

                            cursor: "pointer",

                            "&:hover": {

                                transform:
                                    "translateY(-8px)",

                                boxShadow:
                                    "0 18px 40px rgba(25,118,210,.18)",

                                borderColor:
                                    "#1976D2"

                            }
                        }}
                    >

                        <CardContent
                            sx={{
                                height: "100%"
                            }}
                        >

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    height: "100%"
                                }}
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                        fontWeight={600}
                                    >
                                        Total Books
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight={800}
                                        sx={{
                                            mt: 1,
                                            color: "#1A237E",
                                            fontSize: {
                                                xs: "2rem",
                                                sm: "2.5rem"
                                            }
                                        }}
                                    >

                                        {summary?.totalBooks || 0}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 55,
                                            sm: 65,
                                            md: 70
                                        },

                                        height: {
                                            xs: 55,
                                            sm: 65,
                                            md: 70
                                        },

                                        bgcolor: "#1976D2",

                                        boxShadow:
                                            "0 8px 20px rgba(25,118,210,.25)"
                                    }}
                                >

                                    <MenuBookIcon
                                        sx={{
                                            fontSize: {
                                                xs: 28,
                                                sm: 34
                                            }
                                        }}
                                    />

                                </Avatar>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>


                {/* AVAILABLE */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3
                    }}
                >

                    <Card
                        sx={{
                            height: 150,

                            borderRadius: 4,

                            background: "#EAF4FF",

                            border:
                                "1px solid #D8E8FF",

                            boxShadow:
                                "0 8px 25px rgba(0,0,0,.05)",

                            transition:
                                "all .35s ease",

                            cursor: "pointer",

                            "&:hover": {

                                transform:
                                    "translateY(-8px)",

                                boxShadow:
                                    "0 18px 40px rgba(25,118,210,.18)",

                                borderColor:
                                    "#1976D2"

                            }
                        }}
                    >

                        <CardContent
                            sx={{
                                height: "100%"
                            }}
                        >

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    height: "100%"
                                }}
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                        fontWeight={600}
                                    >
                                        Available
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight={800}
                                        sx={{
                                            mt: 1,
                                            color: "#1A237E",
                                            fontSize: {
                                                xs: "2rem",
                                                sm: "2.5rem"
                                            }
                                        }}
                                    >

                                        {summary?.availableBooks || 0}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 55,
                                            sm: 65,
                                            md: 70
                                        },

                                        height: {
                                            xs: 55,
                                            sm: 65,
                                            md: 70
                                        },

                                        bgcolor: "#2E7D32",

                                        boxShadow:
                                            "0 8px 20px rgba(46,125,50,.25)"
                                    }}
                                >

                                    <CheckCircleIcon
                                        sx={{
                                            fontSize: {
                                                xs: 28,
                                                sm: 34
                                            }
                                        }}
                                    />

                                </Avatar>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>


                {/* ISSUED */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3
                    }}
                >

                    <Card
                        sx={{
                            height: 150,

                            borderRadius: 4,

                            background: "#EAF4FF",

                            border:
                                "1px solid #D8E8FF",

                            boxShadow:
                                "0 8px 25px rgba(0,0,0,.05)",

                            transition:
                                "all .35s ease",

                            cursor: "pointer",

                            "&:hover": {

                                transform:
                                    "translateY(-8px)",

                                boxShadow:
                                    "0 18px 40px rgba(25,118,210,.18)",

                                borderColor:
                                    "#1976D2"

                            }
                        }}
                    >

                        <CardContent
                            sx={{
                                height: "100%"
                            }}
                        >

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    height: "100%"
                                }}
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                        fontWeight={600}
                                    >
                                        Issued
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight={800}
                                        sx={{
                                            mt: 1,
                                            color: "#1A237E",
                                            fontSize: {
                                                xs: "2rem",
                                                sm: "2.5rem"
                                            }
                                        }}
                                    >

                                        {summary?.borrowedBooks || 0}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 55,
                                            sm: 65,
                                            md: 70
                                        },

                                        height: {
                                            xs: 55,
                                            sm: 65,
                                            md: 70
                                        },

                                        bgcolor: "#EF6C00",

                                        boxShadow:
                                            "0 8px 20px rgba(239,108,0,.25)"
                                    }}
                                >

                                    <AssignmentReturnedIcon
                                        sx={{
                                            fontSize: {
                                                xs: 28,
                                                sm: 34
                                            }
                                        }}
                                    />

                                </Avatar>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>


                {/* CATEGORIES */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3
                    }}
                >

                    <Card
                        sx={{
                            height: 150,

                            borderRadius: 4,

                            background: "#EAF4FF",

                            border:
                                "1px solid #D8E8FF",

                            boxShadow:
                                "0 8px 25px rgba(0,0,0,.05)",

                            transition:
                                "all .35s ease",

                            cursor: "pointer",

                            "&:hover": {

                                transform:
                                    "translateY(-8px)",

                                boxShadow:
                                    "0 18px 40px rgba(25,118,210,.18)",

                                borderColor:
                                    "#1976D2"

                            }
                        }}
                    >

                        <CardContent
                            sx={{
                                height: "100%"
                            }}
                        >

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    height: "100%"
                                }}
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                        fontWeight={600}
                                    >
                                        Categories
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight={800}
                                        sx={{
                                            mt: 1,
                                            color: "#1A237E",
                                            fontSize: {
                                                xs: "2rem",
                                                sm: "2.5rem"
                                            }
                                        }}
                                    >

                                        {categoryCount}

                                    </Typography>

                                </Box>


                                <Avatar
                                    sx={{
                                        width: {
                                            xs: 55,
                                            sm: 65,
                                            md: 70
                                        },

                                        height: {
                                            xs: 55,
                                            sm: 65,
                                            md: 70
                                        },

                                        bgcolor: "#8E24AA",

                                        boxShadow:
                                            "0 8px 20px rgba(142,36,170,.25)"
                                    }}
                                >

                                    <CategoryIcon
                                        sx={{
                                            fontSize: {
                                                xs: 28,
                                                sm: 34
                                            }
                                        }}
                                    />

                                </Avatar>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>


            {/* ==================================================
                         SEARCH + ADD BOOK
            ================================================== */}

            <Paper
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },

                    borderRadius: 5,

                    background: "#fff",

                    border:
                        "1px solid #72a0eb",

                    boxShadow:
                        "0 10px 30px rgba(7,5,5,.06)",

                    mb: 3
                }}
            >

                <Box
                    sx={{
                        display: "flex",

                        alignItems: {
                            xs: "stretch",
                            sm: "center"
                        },

                        justifyContent:
                            "space-between",

                        gap: 2,

                        flexDirection: {
                            xs: "column",
                            sm: "row"
                        }
                    }}
                >

                    <TextField
                        fullWidth
                        placeholder="Search by Title, Author or ISBN..."
                        value={keyword}
                        onChange={(e) =>
                            handleSearch(e.target.value)
                        }

                        InputProps={{
                            startAdornment: (

                                <InputAdornment position="start">

                                    <SearchIcon
                                        color="primary"
                                    />

                                </InputAdornment>

                            )
                        }}

                        sx={{
                            flex: 1,

                            "& .MuiOutlinedInput-root": {

                                borderRadius: 3,

                                transition: ".25s",

                                "&:hover fieldset": {

                                    borderColor:
                                        "#1976D2"

                                },

                                "&.Mui-focused fieldset": {

                                    borderColor:
                                        "#1976D2"

                                }

                            }
                        }}
                    />


                    <Button
                        variant="contained"
                        startIcon={<AddCircleIcon />}
                        onClick={() =>
                            setOpenDialog(true)
                        }

                        sx={{
                            borderRadius: 3,

                            px: {
                                xs: 2,
                                sm: 3
                            },

                            py: 1.5,

                            minWidth: {
                                xs: "100%",
                                sm: 180
                            },

                            fontWeight: "bold",

                            textTransform: "none",

                            whiteSpace: "nowrap",

                            background:
                                "linear-gradient(135deg,#1976D2,#512DA8)",

                            transition: ".3s",

                            "&:hover": {

                                background:
                                    "linear-gradient(135deg,#1565C0,#4527A0)",

                                transform:
                                    "translateY(-2px)",

                                boxShadow:
                                    "0 8px 20px rgba(25,118,210,.25)"

                            }
                        }}
                    >

                        Add New Book

                    </Button>

                </Box>

            </Paper>


            {/* ==================================================
                             BOOK TABLE
            ================================================== */}

            <Paper
                sx={{
                    p: {
                        xs: 1.5,
                        sm: 2,
                        md: 3
                    },

                    borderRadius: 5,

                    background: "#fff",

                    border:
                        "1px solid #72a0eb",

                    boxShadow:
                        "0 10px 30px rgba(7,5,5,.06)",

                    overflow: "hidden"
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        px: {
                            xs: 1,
                            sm: 2
                        },

                        pt: {
                            xs: 1,
                            sm: 2
                        },

                        pb: 2,

                        fontSize: {
                            xs: "1.25rem",
                            sm: "1.5rem"
                        }
                    }}
                >

                    📚 Library Books

                </Typography>


                {/* 
                    Important:
                    Mobile par DataGrid columns hide nahi hongi.
                    Table horizontally scroll ho sakti hai.
                */}

                <Box
                    sx={{
                        width: "100%",

                        overflowX: "auto",

                        WebkitOverflowScrolling: "touch"
                    }}
                >

                    <Box
                        sx={{
                            height: {
                                xs: 500,
                                sm: 550,
                                md: 600
                            },

                            minWidth: {
                                xs: 1050,
                                md: "100%"
                            },

                            width: "100%"
                        }}
                    >

                        <DataGrid

                            rows={rows}

                            columns={columns}

                            rowCount={rowCount}

                            paginationMode="server"

                            paginationModel={paginationModel}

                            onPaginationModelChange={
                                setPaginationModel
                            }

                            pageSizeOptions={[
                                5,
                                10,
                                20
                            ]}

                            disableRowSelectionOnClick


                            sx={{

                                border: 0,

                                "& .MuiDataGrid-columnHeaders": {

                                    backgroundColor:
                                        "#1976D2",

                                    color: "#fff",

                                    borderRadius:
                                        "12px 12px 0 0"

                                },


                                "& .MuiDataGrid-columnHeader": {

                                    backgroundColor:
                                        "#1976D2",

                                    color: "#fff"

                                },


                                "& .MuiDataGrid-columnHeaderTitle": {

                                    fontWeight: "bold",

                                    color: "#fff",

                                    fontSize: "15px"

                                },


                                "& .MuiDataGrid-iconSeparator": {

                                    display: "none"

                                },


                                "& .MuiDataGrid-sortIcon": {

                                    color: "#fff"

                                },


                                "& .MuiDataGrid-menuIconButton": {

                                    color: "#fff"

                                },


                                /* Existing row hover */

                                "& .MuiDataGrid-row:hover": {

                                    backgroundColor:
                                        "#F5F9FF"

                                },


                                "& .MuiDataGrid-cell": {

                                    borderBottom:
                                        "1px solid #EEF2F7"

                                },


                                /* Mobile touch-friendly rows */

                                "@media (max-width:600px)": {

                                    "& .MuiDataGrid-cell": {

                                        fontSize: "13px"

                                    },

                                    "& .MuiDataGrid-columnHeaderTitle": {

                                        fontSize: "13px"

                                    }

                                }

                            }}

                        />

                    </Box>

                </Box>

            </Paper>


            {/* ==================================================
                           ADD BOOK DIALOG
            ================================================== */}

            <AddBookDialog

                open={openDialog}

                handleClose={() =>
                    setOpenDialog(false)
                }

                loadBooks={() => {

                    loadBooks();

                    loadSummary();

                }}

            />


            {/* ==================================================
                           EDIT BOOK DIALOG
            ================================================== */}

            <EditBookDialog

                open={editDialogOpen}

                handleClose={() =>
                    setEditDialogOpen(false)
                }

                book={selectedBook}

                loadBooks={() => {

                    loadBooks();

                    loadSummary();

                }}

            />

        </DashboardLayout>

    );

}

export default Books;