import { useEffect, useMemo, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Tooltip from "@mui/material/Tooltip";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InputAdornment from "@mui/material/InputAdornment";
import {
    getUsers,
    registerUser,
    updateUser,
    deleteUser
} from "../../services/userService";
import {
    Box,
    Button,
    Dialog,
    CardContent,
    Avatar,
    Chip,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Paper,
    Grid,
    Card,
    Stack,
    TextField,
    Typography,
    IconButton
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { DataGrid } from "@mui/x-data-grid";

import { toast } from "react-toastify";

function Users() {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [selectedId, setSelectedId] = useState(null);
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const [adminPassword, setAdminPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("ALL");

    const [deleteError, setDeleteError] = useState("");
    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

        username: "",

        email: "",

        password: "",

        phoneNumber: "",

        role: "STUDENT"

    });

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const data = await getUsers();

            setUsers(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

    setError("");

    setFormData({

        ...formData,

        [e.target.name]: e.target.value

    });

};
const validatePassword = () => {

    if (editMode) return;

    const password = formData.password;

    if (password.trim() === "") {

        setPasswordError("Password is required");
        return;

    }

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,100}$/;

    if (!regex.test(password)) {

        setPasswordError(
            "Password must contain minimum 8 characters including uppercase, lowercase, number and special character."
        );

    } else {

        setPasswordError("");

    }

};
    const handleEdit = (user) => {

    setEditMode(true);

    setSelectedId(user.id);

    setFormData({

        firstName: user.firstName,

        lastName: user.lastName,

        username: user.username,

        email: user.email,

        password: "",

        phoneNumber: user.phoneNumber,

        role: user.role

    });

    setOpen(true);

};

const handleDelete = async () => {

    try {

        await deleteUser(
            deleteId,
            adminPassword
        );

        toast.success("User deleted successfully");

        setDeleteDialog(false);

        loadUsers();

    } catch (error) {

        setDeleteError(
            error.response?.data?.message ||
            "Invalid admin password"
        );

    }

};

    const handleSubmit = async () => {

    try {

        if (editMode) {

            await updateUser(

                selectedId,

                formData

            );

            toast.success("User Updated Successfully");

        }

        else {

            await registerUser(formData);

            toast.success("User Registered Successfully");

        }

        setOpen(false);

        setEditMode(false);

        setSelectedId(null);

        setFormData({

            firstName: "",

            lastName: "",

            username: "",

            email: "",

            password: "",

            phoneNumber: "",

            role: "STUDENT"

        });

        setError("");
        loadUsers();
        setPasswordError("");

    }

    catch (error) {

    const message =
        error.response?.data?.message ||
        "Operation Failed";

    setError(message);

    toast.error(message);

}
};

   const filteredUsers = useMemo(() => {

    let filtered = users;

    if (selectedRole !== "ALL") {

        filtered = filtered.filter(

            user => user.role === selectedRole

        );

    }

    if (search.trim() !== "") {

        filtered = filtered.filter(user =>

            user.firstName.toLowerCase().includes(search.toLowerCase()) ||

            user.lastName.toLowerCase().includes(search.toLowerCase()) ||

            user.username.toLowerCase().includes(search.toLowerCase()) ||

            user.email.toLowerCase().includes(search.toLowerCase())

        );

    }

    return filtered;

}, [users, search, selectedRole]);

    const columns = [

        {

            field: "id",

            headerName: "ID",

            width: 80

        },

        {

            field: "firstName",

            headerName: "First Name",

            flex: 1

        },

        {

            field: "lastName",

            headerName: "Last Name",

            flex: 1

        },

        {

            field: "username",

            headerName: "Username",

            flex: 1

        },

        {

            field: "email",

            headerName: "Email",

            flex: 1.5

        },

        {

            field: "phoneNumber",

            headerName: "Phone",

            width: 150

        },

        {
    field: "role",
    headerName: "Role",
    width: 170,

    renderCell: (params) => {

        const colors = {

            ADMIN: "error",

            LIBRARIAN: "warning",

            STUDENT: "success"

        };

        return (

            <Chip
                label={params.value}
                color={colors[params.value]}
                size="small"
                sx={{
                    fontWeight: "bold",
                    minWidth: 95
                }}
            />

        );

    }
},
        {
    field: "actions",

    headerName: "Actions",

    width: 180,

    sortable: false,

renderCell: (params) => (

    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: "100%"
        }}
    >

        <Tooltip title="Edit User">

            <Button
                startIcon={<EditRoundedIcon />}
                variant="contained"
                size="small"
                onClick={() => handleEdit(params.row)}
                sx={{
                    minWidth: 0,
                    px: 2,
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: 600,
                    background:
                        "linear-gradient(135deg,#42A5F5,#1E88E5)",

                    boxShadow:
                        "0 4px 12px rgba(30,136,229,.25)",

                    "&:hover": {

                        transform: "translateY(-2px)",

                        background:
                            "linear-gradient(135deg,#1E88E5,#1565C0)"
                    }
                }}
            >
                Edit
            </Button>

        </Tooltip>

        <Tooltip title="Delete User">

            <Button
                startIcon={<DeleteRoundedIcon />}
                variant="contained"
                size="small"
                onClick={() => {

                    setDeleteId(params.row.id);

                    setAdminPassword("");

                    setDeleteError("");

                    setDeleteDialog(true);

                }}
                sx={{
                    minWidth: 0,
                    px: 2,
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: 600,

                    background:
                        "linear-gradient(135deg,#EF5350,#D32F2F)",

                    boxShadow:
                        "0 4px 12px rgba(211,47,47,.25)",

                    "&:hover": {

                        transform: "translateY(-2px)",

                        background:
                            "linear-gradient(135deg,#D32F2F,#B71C1C)"
                    }
                }}
            >
                Delete
            </Button>

        </Tooltip>

    </Box>

)

}

    ];
        return (

        <DashboardLayout>

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
    <CardContent>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            {/* Left */}

            <Box>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    👥 User Management
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        opacity: .9,
                        fontSize: "1rem"
                    }}
                >
                    Manage Admins, Librarians and Students
                    from one place.
                </Typography>

                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap"
                    }}
                >

                    <Chip
                        label={`${users.length} Total Users`}
                        sx={{
                            bgcolor: "green",
                            color: "#fff",
                            fontWeight: "bold"
                        }}
                    />

                    <Chip
                        label="Role Based Access"
                        sx={{
                            bgcolor: "green",
                            color: "#fff"
                        }}
                    />

                </Box>

            </Box>

            {/* Right */}

            <Avatar
                sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#fff",
                    color: "#1565C0",
                    border: "4px solid rgba(255,255,255,.25)",
                    boxShadow:
                        "0 10px 25px rgba(0,0,0,.25)",
                    mr: 5
                }}
            >

                <PersonIcon
                    sx={{
                        fontSize: 55
                    }}
                />

            </Avatar>

        </Box>

    </CardContent>

</Card>
  <Paper
    sx={{
        p: 3,
        mb: 3,
        borderRadius: 5,
        background:
            "linear-gradient(135deg,#FCFCFF,#F7F3FF)",
        border: "1px solid #9bcbe8",
        boxShadow:
            "0 10px 25px rgba(103,58,183,.08)"
    }}
>
    

               <Stack
direction="row"
justifyContent="space-between"                                             
alignItems="center"
spacing={3}
>
    <Box>

<Typography
variant="h6"
fontWeight="bold"
>

Users Directory

</Typography>

<Typography
variant="body2"
color="text.secondary"
>

Search, register and manage users

</Typography>

</Box>

<TextField
    label="Search Users"
    placeholder="Search by name, username or email..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    autoComplete="off"
    fullWidth
    sx={{
        width:420,
        "& .MuiOutlinedInput-root":{

            borderRadius:4,

            background:"#fff",

            transition:".3s",

            "&:hover":{

                boxShadow:
                    "0 8px 20px rgba(25,118,210,.10)"

            }

        }

    }}
/>

    <Box sx={{ flexGrow: 1 }} />

<Button

variant="contained"

size="large"

onClick={()=>setOpen(true)}

sx={{

height:52,

px:4,

borderRadius:4,

fontWeight:"bold",

textTransform:"none",

fontSize:"1rem",

background:
"linear-gradient(135deg,#1976D2,#1565C0)",

boxShadow:
"0 10px 25px rgba(25,118,210,.25)",

"&:hover":{

background:
"linear-gradient(135deg,#1565C0,#0D47A1)",

transform:"translateY(-2px)"

}

}}

>

＋ Add New User

</Button>

</Stack>

            </Paper>
<Grid container spacing={2} mb={4}>

    <Grid size={{ xs: 12, md: 3 }}>

        <Card
            onClick={() => setSelectedRole("ALL")}
            sx={{
                cursor: "pointer",
                borderRadius: 4,
                transition: ".3s",
background:
    selectedRole === "ALL"
        ? "linear-gradient(135deg,#1976D2,#1565C0)"
        : "#E3F2FD",

color:
    selectedRole === "ALL"
        ? "#fff"
        : "#1565C0",

                "&:hover": {

                    transform: "translateY(-5px)"

                }
            }}
        >

            <CardContent>

                <Typography variant="h5">

                    👥 All Users

                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={2}
                >

                    {users.length}

                </Typography>

            </CardContent>

        </Card>

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <Card
            onClick={() => setSelectedRole("ADMIN")}
            sx={{
                cursor: "pointer",
                borderRadius: 4,
                transition: ".3s",
               background:
    selectedRole === "ADMIN"
        ? "linear-gradient(135deg,#8E24AA,#6A1B9A)"
        : "#F3E5F5",

color:
    selectedRole === "ADMIN"
        ? "#fff"
        : "#6A1B9A",
                "&:hover": {

                    transform: "translateY(-5px)"

                }
            }}
        >

            <CardContent>

                <Typography variant="h5">

                    👑 Admin

                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={2}
                >

                    {

                        users.filter(

                            u => u.role === "ADMIN"

                        ).length

                    }

                </Typography>

            </CardContent>

        </Card>

    </Grid>

    <Grid size={{ xs: 12, md: 3}}>

        <Card
            onClick={() => setSelectedRole("LIBRARIAN")}
            sx={{
                cursor: "pointer",
                borderRadius: 4,
                transition: ".3s",
               background:
    selectedRole === "LIBRARIAN"
        ? "linear-gradient(135deg,#FB8C00,#EF6C00)"
        : "#FFF3E0",

color:
    selectedRole === "LIBRARIAN"
        ? "#fff"
        : "#EF6C00",

                "&:hover": {

                    transform: "translateY(-5px)"
                },
                mb: 4
            }}
        >

            <CardContent>

                <Typography variant="h5">

                    📚 Librarian

                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={2}
                >

                    {

                        users.filter(

                            u => u.role === "LIBRARIAN"

                        ).length

                    }

                </Typography>

            </CardContent>

        </Card>

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <Card
            onClick={() => setSelectedRole("STUDENT")}
            sx={{
                cursor: "pointer",
                borderRadius: 4,
                transition: ".3s",
background:
    selectedRole === "STUDENT"
        ? "linear-gradient(135deg,#43A047,#2E7D32)"
        : "#E8F5E9",

color:
    selectedRole === "STUDENT"
        ? "#fff"
        : "#2E7D32",

                "&:hover": {

                    transform: "translateY(-5px)"

                }
            }}
        >

            <CardContent>

                <Typography variant="h5">

                    🎓 Students

                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={2}
                >

                    {

                        users.filter(

                            u => u.role === "STUDENT"

                        ).length

                    }

                </Typography>

            </CardContent>

        </Card>

    </Grid>

</Grid>
         

          <Paper
    sx={{
        p: 2,
        borderRadius: 5,
        background: "#fff",
        border: "1px solid #9bcbe8",
        boxShadow: "0 10px 25px rgba(103,58,183,.08)"
    }}
>

                <Box
                    sx={{
                        height: 600
                    }}
                >

<DataGrid
    rows={filteredUsers}
    columns={columns}
    disableColumnSorting
    disableColumnMenu
    disableColumnFilter
    getRowId={(row) => row.id}
    disableRowSelectionOnClick
    pageSizeOptions={[10, 25, 50]}
    initialState={{
        pagination: {
            paginationModel: {
                page: 0,
                pageSize: 10
            }
        }
        
    }}
    sx={{
        border: "none",

        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1976D2 !important",
            color: "#fff"
        },

        "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#1976D2 !important"
        },

        "& .MuiDataGrid-columnHeaderTitle": {
            color: "#fff !important",
            fontWeight: 700,
            fontSize: "1rem"
        },

        "& .MuiDataGrid-iconSeparator": {
            color: "#ffffff80"
        },

        "& .MuiDataGrid-sortIcon": {
            color: "#fff !important"
        },

        "& .MuiDataGrid-menuIcon button": {
            color: "#fff !important"
        },

        "& .MuiDataGrid-row:nth-of-type(even)": {
            background: "#FAFBFF"
        },

        "& .MuiDataGrid-row:hover": {
            background: "#EEF4FF",
            
        },
}}

/>
                </Box>

            </Paper>

            <Dialog
            
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
    sx: {
        borderRadius: 5,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,.20)"
    }
}}
            >

<DialogTitle
    sx={{
        p: 0,
        overflow: "hidden"
    }}
>

    <Box
        sx={{
            background:
                editMode
                    ? "linear-gradient(135deg,#1976D2,#1565C0)"
                    : "linear-gradient(135deg,#43A047,#2E7D32)",

            color: "#fff",

            px: 4,

            py: 3,

            display: "flex",

            justifyContent: "space-between",

            alignItems: "center"
        }}
    >

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
            }}
        >

            <Avatar
                sx={{
                    bgcolor: "rgba(255,255,255,.18)",
                    width: 54,
                    height: 54
                }}
            >

                <PersonRoundedIcon
                    sx={{
                        fontSize: 30
                    }}
                />

            </Avatar>

            <Box>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >

                    {editMode
                        ? "Update User"
                        : "Register User"}

                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        opacity: .9,
                        mt: .5
                    }}
                >

                    {editMode
                        ? "Update user information."
                        : "Create a new user account."}

                </Typography>

            </Box>

        </Box>

        <IconButton
            onClick={() => {

                setOpen(false);

                setEditMode(false);

            }}
            sx={{
                color: "#fff"
            }}
        >

            <CloseRoundedIcon />

        </IconButton>

    </Box>

</DialogTitle>

<DialogContent
    sx={{
        p: 4,
        bgcolor: "#FAFBFF"
    }}
>

                    <Grid
    container
    spacing={2}
    mt={0.5}
>

<Grid size={{ xs: 12, md: 6 }}>
                       <TextField
    fullWidth
    label="First Name"
    name="firstName"
    value={formData.firstName}
    onChange={handleChange}
    margin = "normal"
    InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <BadgeRoundedIcon color="primary" />
            </InputAdornment>
        )
    }}
    sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
            transition: ".3s",

            "&:hover": {
                boxShadow: "0 4px 15px rgba(25,118,210,.12)"
            },

            "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(25,118,210,.20)"
            }
        }
    }}
/>
</Grid>
<Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <BadgeRoundedIcon color="primary" />
            </InputAdornment>
        )
    }}
    sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
            transition: ".3s",

            "&:hover": {
                boxShadow: "0 4px 15px rgba(25,118,210,.12)"
            },

            "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(25,118,210,.20)"
            }
        }
    }}
                        />
                        </Grid>
<Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <AlternateEmailRoundedIcon color="primary" />
            </InputAdornment>
        )
        }}
    sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
            transition: ".3s",

            "&:hover": {
                boxShadow: "0 4px 15px rgba(25,118,210,.12)"
            },

            "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(25,118,210,.20)"
            }
        }
    }}
                        />
                        </Grid>
<Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            
                            InputProps={{
        startAdornment: (
    <InputAdornment position="start">
        <EmailRoundedIcon color="primary" />
    </InputAdornment>
)
    }}
    sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
            transition: ".3s",

            "&:hover": {
                boxShadow: "0 4px 15px rgba(25,118,210,.12)"
            },

            "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(25,118,210,.20)"
            }
        }
    }}
                        />
                        </Grid>

                       {!editMode && (
<Grid size={{ xs: 12, md: 6 }}>
     <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={validatePassword}
        fullWidth
        error={passwordError !== ""}
        helperText={passwordError}
        InputProps={{
 startAdornment: (
            <InputAdornment position="start">
                <LockRoundedIcon color="primary" />
            </InputAdornment>
        )
    }}
    sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
            transition: ".3s",

            "&:hover": {
                boxShadow: "0 4px 15px rgba(25,118,210,.12)"
            },

            "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(25,118,210,.20)"
            }
        }
    }}
    />
    </Grid>
)}
<Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
       startAdornment: (
    <InputAdornment position="start">
        <PhoneRoundedIcon color="primary" />
    </InputAdornment>
)
    }}
    sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
            transition: ".3s",

            "&:hover": {
                boxShadow: "0 4px 15px rgba(25,118,210,.12)"
            },

            "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(25,118,210,.20)"
            }
        }
    }}
                        />
                        </Grid>
<Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
       startAdornment: (
    <InputAdornment position="start">
        <AdminPanelSettingsRoundedIcon color="primary" />
    </InputAdornment>
)
    }}
    sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
            transition: ".3s",

            "&:hover": {
                boxShadow: "0 4px 15px rgba(25,118,210,.12)"
            },

            "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(25,118,210,.20)"
            }
        }
    }}
                        >
                            

                            <MenuItem value="ADMIN">
                                ADMIN
                            </MenuItem>

                            <MenuItem value="LIBRARIAN">
                                LIBRARIAN
                            </MenuItem>

                            <MenuItem value="STUDENT">
                                STUDENT
                            </MenuItem>

                        </TextField>
</Grid>
                    </Grid>

                </DialogContent>
<DialogActions
    sx={{
        px: 4,
        py: 3,
        bgcolor: "#FAFBFF",
        borderTop: "1px solid #E8EEF8",
        justifyContent: "space-between"
    }}
>

    <Button
        onClick={() => {

            setOpen(false);

            setEditMode(false);

            setSelectedId(null);

            setPasswordError("");

            setError("");

            setFormData({

                firstName: "",

                lastName: "",

                username: "",

                email: "",

                password: "",

                phoneNumber: "",

                role: "STUDENT"

            });

        }}
        variant="outlined"
        sx={{
            borderRadius: "30px",
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontWeight: 700,

            borderColor: "#1976D2",

            color: "#1976D2",

            "&:hover": {

                borderColor: "#1565C0",

                bgcolor: "#E3F2FD"

            }
        }}
    >

        Cancel

    </Button>

    <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
            borderRadius: "30px",

            px: 5,

            py: 1.2,

            textTransform: "none",

            fontWeight: 700,

            background:
                editMode
                    ? "linear-gradient(135deg,#1976D2,#1565C0)"
                    : "linear-gradient(135deg,#43A047,#2E7D32)",

            boxShadow:
                "0 8px 18px rgba(25,118,210,.25)",

            "&:hover": {

                transform: "translateY(-2px)",

                boxShadow:
                    "0 12px 25px rgba(25,118,210,.35)",

                background:
                    editMode
                        ? "linear-gradient(135deg,#1565C0,#0D47A1)"
                        : "linear-gradient(135deg,#2E7D32,#1B5E20)"
            }
        }}
    >

        {editMode ? "Update User" : "Register User"}

    </Button>

</DialogActions>

            </Dialog>
            <Dialog
    open={deleteDialog}
    onClose={() => setDeleteDialog(false)}
    maxWidth="xs"
    fullWidth
>

    <DialogTitle>

        Delete User

    </DialogTitle>

    <DialogContent>

        <Typography mb={2}>
            Enter Admin Password
        </Typography>

        <TextField
            fullWidth
            label="Admin Password"
            type="password"
            value={adminPassword}
            onChange={(e) => {

                setAdminPassword(e.target.value);
                setDeleteError("");

            }}
            error={deleteError !== ""}
            helperText={deleteError}
        />

    </DialogContent>

    <DialogActions>

        <Button
            onClick={() => {

                setDeleteDialog(false);
                setAdminPassword("");
                setDeleteError("");

            }}
        >
            Cancel
        </Button>

        <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
        >
            Delete
        </Button>

    </DialogActions>

</Dialog>

        </DashboardLayout>

    );

}

export default Users;