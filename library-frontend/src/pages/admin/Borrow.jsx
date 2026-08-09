import { useEffect, useState } from "react";

import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import PaidRoundedIcon from "@mui/icons-material/Paid";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    getUsers
} from "../../services/userService";

import {
    getAllBooks
} from "../../services/bookService";

import {
    issueBook,
    getBorrowHistory,
    returnBook
} from "../../services/borrowService";

import { toast } from "react-toastify";

import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Avatar,
    Typography
} from "@mui/material";

import Grid from "@mui/material/Grid";

import { DataGrid } from "@mui/x-data-grid";

import IconButton from "@mui/material/IconButton";


function Borrow() {

    const [users, setUsers] = useState([]);

    const [books, setBooks] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");

    const [selectedBook, setSelectedBook] = useState("");

    const [history, setHistory] = useState([]);


    /* =========================
       LOAD USERS + BOOKS
    ========================= */

    useEffect(() => {

        loadUsers();

        loadBooks();

    }, []);


    const loadUsers = async () => {

        try {

            const data = await getUsers();

            const students = data.filter(
                (user) =>
                    user.role?.toUpperCase() === "STUDENT"
            );

            setUsers(students);

        }

        catch (error) {

            console.error(error);

        }

    };


    const loadBooks = async () => {

        try {

            const data = await getAllBooks();

            setBooks(data);

        }

        catch (error) {

            console.error(error);

        }

    };


    /* =========================
       BORROW HISTORY
    ========================= */

    const loadHistory = async (userId) => {

        if (!userId) {

            setHistory([]);

            return;

        }

        try {

            const data = await getBorrowHistory(userId);

            setHistory(data);

        }

        catch (error) {

            console.error(error);

        }

    };


    /* =========================
       BORROW BOOK
    ========================= */

    const handleBorrow = async () => {

        if (!selectedUser || !selectedBook) {

            toast.error(
                "Please select Student and Book"
            );

            return;

        }

        try {

            await issueBook({

                userId: selectedUser,

                bookId: selectedBook

            });

            toast.success(
                "Book Borrowed Successfully"
            );

            loadBooks();

            loadHistory(selectedUser);

            setSelectedBook("");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to Borrow Book"

            );

        }

    };


    /* =========================
       RETURN BOOK
    ========================= */

    const handleReturn = async (borrowId) => {

        try {

            await returnBook(borrowId);

            toast.success(
                "Book Returned Successfully"
            );

            loadBooks();

            loadHistory(selectedUser);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to Return Book"

            );

        }

    };


    /* =========================
       STATISTICS
    ========================= */

    const stats = {

        totalBorrowed: history.length,

        active: history.filter(
            item => !item.returned
        ).length,

        returned: history.filter(
            item => item.returned
        ).length,

        totalFine: history.reduce(

            (sum, item) =>

                sum + (item.fineAmount || 0),

            0

        )

    };


    /* =========================
       HISTORY COLUMNS
    ========================= */

    const historyColumns = [

        {
            field: "issueId",

            headerName: "ID",

            width: 80
        },

        {
            field: "bookTitle",

            headerName: "Book",

            flex: 1,

            minWidth: 180
        },

        {
            field: "issueDate",

            headerName: "Borrow Date",

            width: 130
        },

        {
            field: "dueDate",

            headerName: "Due Date",

            width: 130
        },

        {
            field: "returnDate",

            headerName: "Return Date",

            width: 130,

            valueGetter: (value) =>
                value || "-"
        },

        {
            field: "status",

            headerName: "Status",

            width: 150,

            renderCell: (params) => {

                const status = params.value;

                let color = "#F57C00";

                if (status === "RETURNED") {

                    color = "#2E7D32";

                }

                if (status === "OVERDUE") {

                    color = "#D32F2F";

                }

                return (

                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1
                        }}
                    >

                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: color
                            }}
                        />

                        <Typography
                            sx={{
                                color,
                                fontWeight: 700,
                                fontSize: ".85rem"
                            }}
                        >

                            {status}

                        </Typography>

                    </Box>

                );

            }

        },

        {
            field: "fineAmount",

            headerName: "Fine",

            width: 130,

            renderCell: (params) => {

                const fine =
                    params.value ?? 0;

                return (

                    <Typography
                        sx={{
                            color:
                                fine > 0
                                    ? "#D32F2F"
                                    : "#2E7D32",

                            fontWeight: 700,

                            fontSize: ".9rem",

                            width: "100%",

                            height: "100%",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center"
                        }}
                    >

                        ₹{fine}

                    </Typography>

                );

            }

        },

        {
            field: "actions",

            headerName: "Return",

            width: 120,

            sortable: false,

            renderCell: (params) => (

                !params.row.returned && (

                    <IconButton

                        onClick={() =>
                            handleReturn(
                                params.row.issueId
                            )
                        }

                        sx={{

                            width: 42,

                            height: 42,

                            borderRadius: 3,

                            background:
                                "linear-gradient(135deg,#43A047,#2E7D32)",

                            color: "#fff",

                            transition: ".3s",

                            "&:hover": {

                                transform:
                                    "scale(1.08)",

                                boxShadow:
                                    "0 8px 20px rgba(46,125,50,.35)",

                                background:
                                    "linear-gradient(135deg,#2E7D32,#1B5E20)"

                            }

                        }}

                    >

                        <KeyboardReturnIcon />

                    </IconButton>

                )

            )

        }

    ];


    return (

        <DashboardLayout>


            {/* =====================================================
                WELCOME / HEADER CARD
            ===================================================== */}

            <Card

                sx={{

                    mb: 4,

                    borderRadius: 5,

                    background:
                        "linear-gradient(135deg,#1565C0,#512DA8)",

                    color: "#fff",

                    overflow: "hidden"

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

                    {/* DESKTOP:
                        LEFT | STATS | ICON
                        
                        MOBILE:
                        LEFT
                        STATS
                        ICON
                    */}

                    <Box

                        sx={{

                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                lg: "row"
                            },

                            alignItems: {
                                xs: "stretch",
                                lg: "center"
                            },

                            gap: {
                                xs: 3,
                                lg: 4
                            }

                        }}

                    >


                        {/* =====================
                            LEFT CONTENT
                        ===================== */}

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
                                        sm: "2.1rem",
                                        md: "2.125rem"
                                    }

                                }}

                            >

                                📚 Borrow Management

                            </Typography>


                            <Typography

                                mt={1}

                                sx={{

                                    opacity: .9,

                                    fontSize: {
                                        xs: ".9rem",
                                        sm: "1rem"
                                    },

                                    lineHeight: 1.6

                                }}

                            >

                                Borrow books, return books and monitor
                                complete borrowing history.

                            </Typography>

                        </Box>


                        {/* =====================
                            THREE HEADER STATS
                        ===================== */}

                        <Box

                            sx={{

                                display: "flex",

                                flexDirection: {
                                    xs: "column",
                                    sm: "row"
                                },

                                gap: 2,

                                flexShrink: 0,

                                justifyContent: {
                                    xs: "stretch",
                                    sm: "center"
                                }

                            }}

                        >

                            {/* BOOKS */}

                            <Paper

                                elevation={0}

                                sx={{

                                    p: 2,

                                    minWidth: {
                                        xs: "100%",
                                        sm: 120,
                                        md: 130
                                    },

                                    textAlign: "center",

                                    bgcolor:
                                        "rgba(255,255,255,.12)",

                                    backdropFilter:
                                        "blur(10px)",

                                    color: "#fff",

                                    borderRadius: 4,

                                    border:
                                        "1px solid rgba(255,255,255,.12)",

                                    transition: ".3s",

                                    "&:hover": {

                                        bgcolor:
                                            "rgba(255,255,255,.2)",

                                        transform:
                                            "translateY(-4px)"

                                    }

                                }}

                            >

                                <Typography

                                    variant="h5"

                                    fontWeight="bold"

                                >

                                    {books.length}

                                </Typography>

                                <Typography
                                    variant="body2"
                                >

                                    Books

                                </Typography>

                            </Paper>


                            {/* STUDENTS */}

                            <Paper

                                elevation={0}

                                sx={{

                                    p: 2,

                                    minWidth: {
                                        xs: "100%",
                                        sm: 120,
                                        md: 130
                                    },

                                    textAlign: "center",

                                    bgcolor:
                                        "rgba(255,255,255,.12)",

                                    backdropFilter:
                                        "blur(10px)",

                                    color: "#fff",

                                    borderRadius: 4,

                                    border:
                                        "1px solid rgba(255,255,255,.12)",

                                    transition: ".3s",

                                    "&:hover": {

                                        bgcolor:
                                            "rgba(255,255,255,.2)",

                                        transform:
                                            "translateY(-4px)"

                                    }

                                }}

                            >

                                <Typography

                                    variant="h5"

                                    fontWeight="bold"

                                >

                                    {users.length}

                                </Typography>

                                <Typography
                                    variant="body2"
                                >

                                    Students

                                </Typography>

                            </Paper>


                            {/* RECORDS */}

                            <Paper

                                elevation={0}

                                sx={{

                                    p: 2,

                                    minWidth: {
                                        xs: "100%",
                                        sm: 120,
                                        md: 130
                                    },

                                    textAlign: "center",

                                    bgcolor:
                                        "rgba(255,255,255,.12)",

                                    backdropFilter:
                                        "blur(10px)",

                                    color: "#fff",

                                    borderRadius: 4,

                                    border:
                                        "1px solid rgba(255,255,255,.12)",

                                    transition: ".3s",

                                    "&:hover": {

                                        bgcolor:
                                            "rgba(255,255,255,.2)",

                                        transform:
                                            "translateY(-4px)"

                                    }

                                }}

                            >

                                <Typography

                                    variant="h5"

                                    fontWeight="bold"

                                >

                                    {history.length}

                                </Typography>

                                <Typography
                                    variant="body2"
                                >

                                    Records

                                </Typography>

                            </Paper>

                        </Box>


                        {/* =====================
                            BOOK ICON
                        ===================== */}

                        <Box

                            sx={{

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                flexShrink: 0,

                                minWidth: {
                                    xs: "100%",
                                    lg: 120
                                }

                            }}

                        >

                            <Avatar

                                sx={{

                                    width: {
                                        xs: 80,
                                        sm: 90,
                                        md: 100
                                    },

                                    height: {
                                        xs: 80,
                                        sm: 90,
                                        md: 100
                                    },

                                    background:
                                        "linear-gradient(135deg,#ffffff,#E3F2FD)",

                                    color: "#1565C0",

                                    border:
                                        "4px solid rgba(255,255,255,.25)",

                                    boxShadow:
                                        "0 12px 30px rgba(0,0,0,.25)"

                                }}

                            >

                                <MenuBookRoundedIcon

                                    sx={{

                                        fontSize: {
                                            xs: 45,
                                            sm: 52,
                                            md: 60
                                        }

                                    }}

                                />

                            </Avatar>

                        </Box>


                    </Box>

                </CardContent>

            </Card>


            {/* =====================================================
                BORROW BOOK SECTION
            ===================================================== */}

            <Paper

                sx={{

                    p: {
                        xs: 2.5,
                        sm: 3,
                        md: 4
                    },

                    mb: 4,

                    borderRadius: 5,

                    background:
                        "linear-gradient(135deg,#FCFCFF,#F4F8FF)",

                    border:
                        "1px solid #b4c9f1",

                    boxShadow:
                        "0 10px 28px rgba(25,118,210,.08)"

                }}

            >

                <Box sx={{ mb: 4 }}>

                    <Typography

                        variant="h5"

                        fontWeight="bold"

                        color="#1565C0"

                        sx={{

                            fontSize: {
                                xs: "1.35rem",
                                sm: "1.5rem"
                            }

                        }}

                    >

                        Borrow Book

                    </Typography>

                    <Typography

                        color="text.secondary"

                        mt={0.5}

                    >

                        Select a student and assign an available book.

                    </Typography>

                </Box>


                {/* FORM */}

                <Box

                    sx={{

                        display: "grid",

                        gridTemplateColumns: {

                            xs: "1fr",

                            md: "1fr 1fr auto"

                        },

                        gap: 3,

                        alignItems: "center"

                    }}

                >


                    {/* STUDENT */}

                    <FormControl

                        fullWidth

                        sx={{

                            "& .MuiOutlinedInput-root": {

                                borderRadius: 4,

                                background: "#fff",

                                transition: ".3s",

                                "&:hover": {

                                    boxShadow:
                                        "0 8px 18px rgba(25,118,210,.10)"

                                }

                            }

                        }}

                    >

                        <InputLabel>

                            👨‍🎓 Select Student

                        </InputLabel>

                        <Select

                            value={selectedUser}

                            label="👨‍🎓 Select Student"

                            onChange={(e) => {

                                setSelectedUser(
                                    e.target.value
                                );

                                loadHistory(
                                    e.target.value
                                );

                            }}

                        >

                            {

                                users.map((user) => (

                                    <MenuItem

                                        key={user.id}

                                        value={user.id}

                                    >

                                        <Box>

                                            <Typography
                                                fontWeight="bold"
                                            >

                                                {user.firstName}{" "}
                                                {user.lastName}

                                            </Typography>

                                            <Typography

                                                variant="caption"

                                                color="text.secondary"

                                            >

                                                {user.email}

                                            </Typography>

                                        </Box>

                                    </MenuItem>

                                ))

                            }

                        </Select>

                    </FormControl>


                    {/* BOOK */}

                    <FormControl

                        fullWidth

                        sx={{

                            "& .MuiOutlinedInput-root": {

                                borderRadius: 4,

                                background: "#fff",

                                transition: ".3s",

                                "&:hover": {

                                    boxShadow:
                                        "0 8px 18px rgba(25,118,210,.10)"

                                }

                            }

                        }}

                    >

                        <InputLabel>

                            📚 Select Book

                        </InputLabel>

                        <Select

                            value={selectedBook}

                            label="📚 Select Book"

                            onChange={(e) =>
                                setSelectedBook(
                                    e.target.value
                                )
                            }

                        >

                            {

                                books.map((book) => (

                                    <MenuItem

                                        key={book.id}

                                        value={book.id}

                                    >

                                        <Box>

                                            <Typography
                                                fontWeight="bold"
                                            >

                                                {book.title}

                                            </Typography>

                                            <Typography

                                                variant="caption"

                                                color="text.secondary"

                                            >

                                                Available :{" "}
                                                {book.availableCopies}

                                            </Typography>

                                        </Box>

                                    </MenuItem>

                                ))

                            }

                        </Select>

                    </FormControl>


                    {/* BORROW BUTTON */}

                    <Button

                        variant="contained"

                        onClick={handleBorrow}

                        sx={{

                            minWidth: {
                                xs: "100%",
                                md: 180
                            },

                            height: 56,

                            borderRadius: 3,

                            textTransform: "none",

                            fontWeight: "bold",

                            fontSize: "1rem",

                            background:
                                "linear-gradient(135deg,#1976D2,#1565C0)",

                            boxShadow:
                                "0 10px 22px rgba(25,118,210,.25)",

                            "&:hover": {

                                background:
                                    "linear-gradient(135deg,#1565C0,#0D47A1)"

                            }

                        }}

                    >

                        Borrow Book

                    </Button>

                </Box>

            </Paper>


            {/* =====================================================
                STATISTICS
            ===================================================== */}

            <Grid

                container

                spacing={3}

                sx={{

                    mt: 1,

                    mb: 3

                }}

            >


                {/* TOTAL BORROWED */}

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                    <Paper

                        sx={{

                            p: 3,

                            borderRadius: 4,

                            background:
                                "linear-gradient(135deg,#1976D2,#42A5F5)",

                            color: "#fff",

                            transition: ".3s",

                            "&:hover": {

                                transform:
                                    "translateY(-6px)",

                                boxShadow:
                                    "0 18px 35px rgba(25,118,210,.25)"

                            }

                        }}

                    >

                        <MenuBookRoundedIcon
                            sx={{ fontSize: 42 }}
                        />

                        <Typography mt={2}>

                            Total Borrowed

                        </Typography>

                        <Typography

                            variant="h3"

                            fontWeight="bold"

                        >

                            {stats.totalBorrowed}

                        </Typography>

                    </Paper>

                </Grid>


                {/* ACTIVE */}

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                    <Paper

                        sx={{

                            p: 3,

                            borderRadius: 4,

                            background:
                                "linear-gradient(135deg,#F57C00,#FFB74D)",

                            color: "#fff",

                            transition: ".3s",

                            "&:hover": {

                                transform:
                                    "translateY(-6px)",

                                boxShadow:
                                    "0 18px 35px rgba(245,124,0,.25)"

                            }

                        }}

                    >

                        <AutorenewRoundedIcon
                            sx={{ fontSize: 42 }}
                        />

                        <Typography mt={2}>

                            Active Borrowings

                        </Typography>

                        <Typography

                            variant="h3"

                            fontWeight="bold"

                        >

                            {stats.active}

                        </Typography>

                    </Paper>

                </Grid>


                {/* RETURNED */}

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                    <Paper

                        sx={{

                            p: 3,

                            borderRadius: 4,

                            background:
                                "linear-gradient(135deg,#2E7D32,#66BB6A)",

                            color: "#fff",

                            transition: ".3s",

                            "&:hover": {

                                transform:
                                    "translateY(-6px)",

                                boxShadow:
                                    "0 18px 35px rgba(46,125,50,.25)"

                            }

                        }}

                    >

                        <TaskAltRoundedIcon
                            sx={{ fontSize: 42 }}
                        />

                        <Typography mt={2}>

                            Returned Books

                        </Typography>

                        <Typography

                            variant="h3"

                            fontWeight="bold"

                        >

                            {stats.returned}

                        </Typography>

                    </Paper>

                </Grid>


                {/* FINE */}

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                    <Paper

                        sx={{

                            p: 3,

                            borderRadius: 4,

                            background:
                                "linear-gradient(135deg,#6A1B9A,#AB47BC)",

                            color: "#fff",

                            transition: ".3s",

                            "&:hover": {

                                transform:
                                    "translateY(-6px)",

                                boxShadow:
                                    "0 18px 35px rgba(106,27,154,.25)"

                            }

                        }}

                    >

                        <PaidRoundedIcon
                            sx={{ fontSize: 42 }}
                        />

                        <Typography mt={2}>

                            Total Fine

                        </Typography>

                        <Typography

                            variant="h3"

                            fontWeight="bold"

                        >

                            ₹{stats.totalFine}

                        </Typography>

                    </Paper>

                </Grid>

            </Grid>


            {/* =====================================================
                BORROW HISTORY
            ===================================================== */}

            <Paper

                sx={{

                    mt: 4,

                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },

                    borderRadius: 5,

                    background:
                        "linear-gradient(135deg,#FCFCFF,#F7FAFF)",

                    border:
                        "1px solid #bccef0",

                    boxShadow:
                        "0 10px 28px rgba(25,118,210,.08)"

                }}

            >

                <Box sx={{ mb: 3 }}>

                    <Typography

                        variant="h4"

                        fontWeight="bold"

                        color="#1565C0"

                        sx={{

                            fontSize: {
                                xs: "1.5rem",
                                sm: "1.8rem",
                                md: "2.125rem"
                            }

                        }}

                    >

                        Borrow History

                    </Typography>

                    <Typography

                        mt={1}

                        color="text.secondary"

                    >

                        Complete borrowing and return records
                        for the selected student.

                    </Typography>

                </Box>


                {/* 
                    Horizontal scrolling on small screens.
                    No columns/features are removed.
                */}

                <Box

                    sx={{

                        width: "100%",

                        overflowX: "auto"

                    }}

                >

                    <Box

                        sx={{

                            minWidth: 950,

                            height: 600

                        }}

                    >

                        <DataGrid

                            rows={history}

                            columns={historyColumns}

                            getRowId={(row) =>
                                row.issueId
                            }

                            disableRowSelectionOnClick

                            pageSizeOptions={[
                                5,
                                10,
                                25,
                                50,
                                100
                            ]}

                            initialState={{

                                pagination: {

                                    paginationModel: {

                                        pageSize: 10,

                                        page: 0

                                    }

                                }

                            }}

                            sx={{

                                border: "none",

                                "& .MuiDataGrid-columnHeaders": {

                                    backgroundColor:
                                        "#1976D2 !important",

                                    color: "#fff"

                                },

                                "& .MuiDataGrid-columnHeader": {

                                    backgroundColor:
                                        "#1976D2 !important"

                                },

                                "& .MuiDataGrid-columnHeaderTitle": {

                                    color:
                                        "#fff !important",

                                    fontWeight: 700,

                                    fontSize: "1rem"

                                },

                                "& .MuiDataGrid-iconSeparator": {

                                    display: "none"

                                },

                                "& .MuiDataGrid-menuIcon": {

                                    display: "none"

                                },

                                "& .MuiDataGrid-sortIcon": {

                                    display: "none"

                                },

                                "& .MuiDataGrid-row:nth-of-type(even)": {

                                    background:
                                        "#FAFBFF"

                                },

                                "& .MuiDataGrid-row:hover": {

                                    background:
                                        "#EEF4FF"

                                },

                                "& .MuiTouchRipple-root": {

                                    display: "none"

                                }

                            }}

                        />

                    </Box>

                </Box>

            </Paper>


        </DashboardLayout>

    );

}

export default Borrow;