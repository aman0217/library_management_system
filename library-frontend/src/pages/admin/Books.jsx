import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Avatar,
    Stack,
    Chip,
    InputAdornment,
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { getDashboardSummary } from "../../services/dashboardService";
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

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this book?"

        );

        if (!confirmDelete) return;

        try {

            await deleteBook(id);

            toast.success("Book Deleted Successfully");

            loadBooks();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to Delete Book"

            );

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
    const columns = [

        {
            field: "id",
            headerName: "ID",
            width: 80
        },

        {
            field: "title",
            headerName: "Title",
            flex: 1
        },

        {
            field: "author",
            headerName: "Author",
            flex: 1
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
            flex: 1
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 150,

            renderCell: (params) => (

                <>

                    <IconButton
                        color="primary"
                        onClick={() => {

                            setSelectedBook(params.row);

                            setEditDialogOpen(true);

                        }}
                    >

                        <EditIcon />

                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >

                        <DeleteIcon />

                    </IconButton>

                </>

            )

        }

    ];

    return (

        <DashboardLayout>
        <Card
    sx={{
        mb:4,
        borderRadius:5,
        background:
            "linear-gradient(135deg,#1976D2,#512DA8)",
        color:"#fff",
        overflow:"hidden"
    }}
>

<CardContent>

<Box
sx={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<Box>

<Typography
variant="h4"
fontWeight="bold"
>

📚 Books Management

</Typography>

<Typography
sx={{
mt:1,
opacity:.9
}}
>

Manage, organize and maintain your complete library collection.

</Typography>

</Box>

<Avatar
sx={{

width:80,
height:80,
bgcolor:"rgba(255,255,255,.2)",
border:"3px solid rgba(255,255,255,.35)",
mr: 5
}}
>

<LibraryBooksIcon sx={{fontSize:45}}/>

</Avatar>

</Box>

</CardContent>

</Card>
<Grid
container
spacing={3}
sx={{mb:4}}
>

<Grid size={{xs:12,md:3}}>

<Card
sx={{
    height:150,

    borderRadius:4,

    background:"#EAF4FF",

    border:"1px solid #D8E8FF",

    boxShadow:"0 8px 25px rgba(0,0,0,.05)",

    transition:"all .35s ease",

    cursor:"pointer",

    "&:hover":{

        transform:"translateY(-8px)",

        boxShadow:"0 18px 40px rgba(25,118,210,.18)",

        borderColor:"#1976D2"

    }

}}
>

<CardContent
sx={{
height:"100%"
}}
>

<Stack
direction="row"

justifyContent="space-between"

alignItems="center"

sx={{
height:"100%"
}}
>

<Box>

<Typography color="text.secondary">

Total Books

</Typography>

<Typography

variant="h3"

fontWeight={800}

sx={{

mt:1,

color:"#1A237E"

}}

>
{summary?.totalBooks || 0}
</Typography>

</Box>

<Avatar

sx={{

width:70,

height:70,

bgcolor:"#1976D2",

boxShadow:"0 8px 20px rgba(25,118,210,.25)"

}}

>
    

<MenuBookIcon/>

</Avatar>

</Stack>

</CardContent>

</Card>

</Grid>

<Grid size={{xs:12,md:3}}>

<Card
sx={{
    height:150,

    borderRadius:4,

    background:"#EAF4FF",

    border:"1px solid #D8E8FF",

    boxShadow:"0 8px 25px rgba(0,0,0,.05)",

    transition:"all .35s ease",

    cursor:"pointer",

    "&:hover":{

        transform:"translateY(-8px)",

        boxShadow:"0 18px 40px rgba(25,118,210,.18)",

        borderColor:"#1976D2"

    }

}}
>

<CardContent
sx={{
height:"100%"
}}
>
<Stack
direction="row"

justifyContent="space-between"

alignItems="center"

sx={{
height:"100%"
}}
>
<Box>

<Typography>

Available

</Typography>

<Typography

variant="h3"

fontWeight={800}

sx={{

mt:1,

color:"#1A237E"

}}

>

{summary?.availableBooks || 0}
</Typography>

</Box>

<Avatar

sx={{

width:70,

height:70,

bgcolor:"#2E7D32",

boxShadow:"0 8px 20px rgba(25,118,210,.25)"

}}

>

<CheckCircleIcon/>

</Avatar>

</Stack>

</CardContent>

</Card>

</Grid>

<Grid size={{xs:12,md:3}}>

<Card
sx={{
    height:150,

    borderRadius:4,

    background:"#EAF4FF",

    border:"1px solid #D8E8FF",

    boxShadow:"0 8px 25px rgba(0,0,0,.05)",

    transition:"all .35s ease",

    cursor:"pointer",

    "&:hover":{

        transform:"translateY(-8px)",

        boxShadow:"0 18px 40px rgba(25,118,210,.18)",

        borderColor:"#1976D2"

    }

}}
>
<CardContent
sx={{
height:"100%"
}}
>

<Stack
direction="row"

justifyContent="space-between"

alignItems="center"

sx={{
height:"100%"
}}
>

<Box>

<Typography>

Issued

</Typography>

<Typography

variant="h3"

fontWeight={800}

sx={{

mt:1,

color:"#1A237E"

}}

>

{summary?.borrowedBooks || 0}

</Typography>

</Box>

<Avatar

sx={{

width:70,

height:70,

bgcolor:"#EF6C00",

boxShadow:"0 8px 20px rgba(25,118,210,.25)"

}}

>

<AssignmentReturnedIcon/>

</Avatar>

</Stack>

</CardContent>

</Card>

</Grid>

<Grid size={{xs:12,md:3}}>

<Card
sx={{
    height:150,

    borderRadius:4,

    background:"#EAF4FF",

    border:"1px solid #D8E8FF",

    boxShadow:"0 8px 25px rgba(0,0,0,.05)",

    transition:"all .35s ease",

    cursor:"pointer",

    "&:hover":{

        transform:"translateY(-8px)",

        boxShadow:"0 18px 40px rgba(25,118,210,.18)",

        borderColor:"#1976D2"

    }

}}
>

<CardContent
sx={{
height:"100%"
}}
>

<Stack
direction="row"

justifyContent="space-between"

alignItems="center"

sx={{
height:"100%"
}}
>

<Box>

<Typography>

Categories

</Typography>

<Typography

variant="h3"

fontWeight={800}

sx={{

mt:1,

color:"#1A237E"

}}

>

{new Set(rows.map(x=>x.category)).size}

</Typography>

</Box>

<Avatar

sx={{

width:70,

height:70,

bgcolor:"#8E24AA",

boxShadow:"0 8px 20px rgba(25,118,210,.25)"

}}

>

<CategoryIcon/>

</Avatar>

</Stack>

</CardContent>

</Card>

</Grid>

</Grid>
            <Box
sx={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
mb:3,
gap:2
}}
>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >

                    Books Management

                </Typography>

               <Button
variant="contained"
startIcon={<AddCircleIcon/>}
onClick={()=>setOpenDialog(true)}
sx={{
borderRadius:3,
px:3,
fontWeight:"bold",
textTransform:"none",
background:
"linear-gradient(135deg,#1976D2,#512DA8)"
}}
>

Add New Book

</Button>

            </Box>

<Paper

sx={{

p:4,

borderRadius:5,

background:"#fff",

border:"1px solid #72a0eb",

boxShadow:"0 10px 30px rgba(7, 5, 5, 0.06)"

}}

>

<TextField
fullWidth
placeholder="Search by Title, Author or ISBN..."
value={keyword}
onChange={(e)=>handleSearch(e.target.value)}
InputProps={{
startAdornment:(
<InputAdornment position="start">

<SearchIcon color="primary"/>

</InputAdornment>
)
}}
sx={{
mb:3,
"& .MuiOutlinedInput-root":{
borderRadius:4,
background:"#FAFAFA"
}
}}
/>

                <Box
                    sx={{
                        height: 500,
                        width: "100%",
                        
                    }}
                >

                  <DataGrid

rows={rows}

columns={columns}

rowCount={rowCount}

paginationMode="server"

paginationModel={paginationModel}

onPaginationModelChange={setPaginationModel}

pageSizeOptions={[5,10,20]}

disableRowSelectionOnClick

sx={{
    border: 0,

    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#1976D2",
      color: "#fff",
      borderRadius: "12px 12px 0 0",
    },

    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "#1976D2",
      color: "#fff",
    },

    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
      color: "#fff",
      fontSize: "15px",
    },

    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },

    "& .MuiDataGrid-sortIcon": {
      color: "#fff",
    },

    "& .MuiDataGrid-menuIconButton": {
      color: "#fff",
    },

    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#F5F9FF",
    },

    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid #EEF2F7",
    },
  }}

/>
                </Box>

            </Paper>

            <AddBookDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                loadBooks={loadBooks}
            />

            <EditBookDialog
                open={editDialogOpen}
                handleClose={() => setEditDialogOpen(false)}
                book={selectedBook}
                loadBooks={loadBooks}
            />

        </DashboardLayout>

    );

}

export default Books;