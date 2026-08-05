import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

import { toast } from "react-toastify";

import { login } from "../../services/authService";
function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await login({

                email,

                password

            });

            localStorage.setItem("token", response.token);

            localStorage.setItem("id", response.id);

            localStorage.setItem("username", response.username);

            localStorage.setItem("email", response.email);

            localStorage.setItem("role", response.role);

            toast.success("Login Successful");

            if (

                response.role === "ADMIN" ||

                response.role === "LIBRARIAN"

            ) {

                navigate("/admin/dashboard");

            }

            else if (

                response.role === "STUDENT"

            ) {

                navigate("/student/dashboard");

            }

            else {

                toast.error("Unknown User Role");

            }

        }

        catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Login Failed"

            );

        }

    };

   return (
    <Container
    maxWidth={false}
    disableGutters
    sx = {{
        height: "100vh",
        overflow: "hidden"
    }}
>
    <Box
        sx={{
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
                "linear-gradient(135deg,#EEF4FF,#FFFFFF)",
            p: 4
        }}
    >
        
        <Grid
            container
            spacing={6}
            alignItems="center"
            sx={{
                width: "100%",
                maxWidth: 1400
            }}
        >

            {/* LEFT SIDE */}

            <Grid
                size={{
                    xs: 12,
                    md: 7
                }}
            >

                <Typography
                    variant="h2"
                    fontWeight="bold"
                    color="primary"
                >
                    📚 Library
                </Typography>

                <Typography
                    variant="h2"
                    fontWeight="bold"
                    color="primary"
                >
                    Management
                </Typography>

                <Typography
                    variant="h2"
                    fontWeight="bold"
                    color="primary"
                    mb={3}
                >
                    System
                </Typography>

                <Typography
                    sx={{
                        fontSize: "1.2rem",
                        color: "#555",
                        maxWidth: 650,
                        mb: 5
                    }}
                >
                    Smart Digital Library Platform for
                    Admins, Librarians and Students.
                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <Card
                            sx={{
                                borderRadius: 4,
                                height: "100%",
                                transition: ".35s",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow:
                                        "0 20px 40px rgba(25,118,210,.18)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    textAlign: "center"
                                }}
                            >

                                <Avatar
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        bgcolor: "#1976D2",
                                        mx: "auto",
                                        mb: 2
                                    }}
                                >
                                    <AdminPanelSettingsRoundedIcon
                                        sx={{
                                            fontSize: 38
                                        }}
                                    />
                                </Avatar>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    Admin
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    mt={1}
                                >
                                    Complete Control
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <Card
                            sx={{
                                borderRadius: 4,
                                height: "100%",
                                transition: ".35s",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow:
                                        "0 20px 40px rgba(46,125,50,.18)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    textAlign: "center"
                                }}
                            >

                                <Avatar
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        bgcolor: "#2E7D32",
                                        mx: "auto",
                                        mb: 2
                                    }}
                                >
                                    <LocalLibraryRoundedIcon
                                        sx={{
                                            fontSize: 38
                                        }}
                                    />
                                </Avatar>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    Librarian
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    mt={1}
                                >
                                    Manage Books
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <Card
                            sx={{
                                borderRadius: 4,
                                height: "100%",
                                transition: ".35s",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow:
                                        "0 20px 40px rgba(251,140,0,.18)"
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    textAlign: "center"
                                }}
                            >

                                <Avatar
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        bgcolor: "#FB8C00",
                                        mx: "auto",
                                        mb: 2
                                    }}
                                >
                                    <SchoolRoundedIcon
                                        sx={{
                                            fontSize: 38
                                        }}
                                    />
                                </Avatar>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    Student
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    mt={1}
                                >
                                    Borrow Books
                                </Typography>

                            </CardContent>

                        </Card>
                        

                    </Grid>
                    

                </Grid>

            </Grid>
                        {/* RIGHT SIDE */}

            <Grid
                size={{
                    xs: 12,
                    md: 5
                }}
            >

                <Paper
    elevation={0}
    sx={{
        p: 5,
        borderRadius: 6,
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.5)",
        boxShadow: "0 25px 60px rgba(0,0,0,.12)",
        transition: ".35s",

        "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 35px 70px rgba(25,118,210,.18)"
        }
    }}
>

<Typography
    variant="h4"
    align="center"
    fontWeight="bold"
>

    Welcome Back 👋

</Typography>


                    <Typography

                        align="center"

                        color="text.secondary"

                        sx={{

                            mb: 2,

                            mt: 1

                        }}

                    >

                        Login to continue

                    </Typography>

                    <form onSubmit={handleLogin}>

                      <TextField
    fullWidth
    label="Email Address"
    margin="normal"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    autoComplete="off"
    InputProps={{
        startAdornment:(
            <InputAdornment position="start">

                <EmailRoundedIcon
                    color="primary"
                />

            </InputAdornment>
        )
    }}
    sx={{
        "& .MuiOutlinedInput-root":{

            borderRadius:3,

            transition:".3s",

            "&:hover":{

                boxShadow:
                    "0 10px 20px rgba(25,118,210,.08)"

            }

        }
    }}
/>

<TextField
    fullWidth
    label="Password"
    margin="normal"
    type={showPassword ? "text":"password"}
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    autoComplete="new-password"
    InputProps={{

        startAdornment:(

            <InputAdornment position="start">

                <LockRoundedIcon
                    color="primary"
                />

            </InputAdornment>

        ),

        endAdornment:(

            <InputAdornment position="end">

                <IconButton
                    onClick={()=>
                        setShowPassword(!showPassword)
                    }
                >

                    {

                        showPassword ?

                        <VisibilityOffRoundedIcon/>

                        :

                        <VisibilityRoundedIcon/>

                    }

                </IconButton>

            </InputAdornment>

        )

    }}
    sx={{
        "& .MuiOutlinedInput-root":{

            borderRadius:3,

            transition:".3s",

            "&:hover":{

                boxShadow:
                    "0 10px 20px rgba(25,118,210,.08)"

            }

        }
    }}
/>
<Box

    display="flex"

    justifyContent="space-between"

    alignItems="center"

    mt={1}

>

<FormControlLabel

    control={

        <Checkbox/>

    }

    label="Remember Me"

/>

<Link

    underline="hover"

    sx={{

        cursor:"pointer",

        fontWeight:600

    }}

>

Forgot Password?

</Link>

</Box>
<Button

    fullWidth

    variant="contained"

    size="large"

    type="submit"

    sx={{

        mt:4,

        py:1.7,

        fontWeight:"bold",

        fontSize:"1rem",

        borderRadius:3,

        textTransform:"none",

        background:

            "linear-gradient(135deg,#1565C0,#42A5F5)",

        transition:".35s",

        "&:hover":{

            transform:"translateY(-3px)",

            background:

                "linear-gradient(135deg,#0D47A1,#1976D2)",

            boxShadow:

                "0 20px 40px rgba(25,118,210,.30)"

        }

    }}

>

Login

</Button>
                   <Box

    mt={4}

    textAlign="center"

>

<Typography

    color="text.secondary"

    variant="body2"

>

Secure Login

</Typography>

<Typography

    mt={1}

    fontWeight="bold"

    color="primary"

>

👑 Admin &nbsp; • &nbsp;

📚 Librarian &nbsp; • &nbsp;

🎓 Student

</Typography>

</Box>

                    </form>

                </Paper>

            </Grid>

        </Grid>

    </Box>

</Container>
    );
}

export default Login;