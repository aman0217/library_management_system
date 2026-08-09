import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    IconButton,
    Link,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";

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
            email: email.trim(),
            password
        });


        // ============================================
        // CLEAR OLD AUTH DATA
        // ============================================

        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("role");


        // ============================================
        // SAVE NEW AUTH DATA
        // ============================================

        localStorage.setItem(
            "token",
            response.token
        );

        localStorage.setItem(
            "id",
            response.id
        );

        localStorage.setItem(
            "username",
            response.username
        );

        localStorage.setItem(
            "email",
            response.email
        );

        localStorage.setItem(
            "role",
            response.role
        );


        localStorage.setItem(
            "rememberMe",
            rememberMe ? "true" : "false"
        );


        toast.success("Login Successful");


        // ============================================
        // ROLE BASED NAVIGATION
        // ============================================

        if (
            response.role === "ADMIN" ||
            response.role === "LIBRARIAN"
        ) {

            navigate(
                "/admin/dashboard",
                {
                    replace: true
                }
            );

            return;

        }


        if (response.role === "STUDENT") {

            navigate(
                "/student/dashboard",
                {
                    replace: true
                }
            );

            return;

        }


        toast.error("Unknown User Role");

    }

    catch (error) {

        console.error(
            "Login error:",
            error
        );

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
            sx={{
                minHeight: "100vh",
                width: "100%",
                overflowX: "hidden"
            }}
        >

            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100%",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    background:
                        "linear-gradient(135deg,#EEF4FF,#FFFFFF)",

                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },

                    py: {
                        xs: 3,
                        md: 4
                    }
                }}
            >

                {/*
                 * IMPORTANT:
                 *
                 * Only spacing is used here.
                 * columnGap is NOT used.
                 *
                 * Therefore md=7 and md=5 remain
                 * inside MUI's 12-column grid.
                 */}

                <Grid
                    container
                    spacing={{
                        xs: 4,
                        md: 6
                    }}
                    alignItems="center"
                    sx={{
                        width: "100%",
                        maxWidth: 1400,
                        mx: "auto"
                    }}
                >

                    {/* ================================================= */}
                    {/* LEFT SIDE */}
                    {/* ================================================= */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 7
                        }}
                    >

                        <Box
                            sx={{
                                width: "100%"
                            }}
                        >

                            <Typography
                                component="h1"
                                fontWeight="bold"
                                color="primary"
                                sx={{
                                    fontSize: {
                                        xs: "2.3rem",
                                        sm: "3rem",
                                        md: "3.7rem",
                                        lg: "4.3rem"
                                    },

                                    lineHeight: 1.05
                                }}
                            >
                                📚 Library
                            </Typography>

                            <Typography
                                component="h1"
                                fontWeight="bold"
                                color="primary"
                                sx={{
                                    fontSize: {
                                        xs: "2.3rem",
                                        sm: "3rem",
                                        md: "3.7rem",
                                        lg: "4.3rem"
                                    },

                                    lineHeight: 1.05
                                }}
                            >
                                Management
                            </Typography>

                            <Typography
                                component="h1"
                                fontWeight="bold"
                                color="primary"
                                sx={{
                                    fontSize: {
                                        xs: "2.3rem",
                                        sm: "3rem",
                                        md: "3.7rem",
                                        lg: "4.3rem"
                                    },

                                    lineHeight: 1.05,

                                    mb: {
                                        xs: 2,
                                        md: 3
                                    }
                                }}
                            >
                                System
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        sm: "1.1rem",
                                        md: "1.2rem"
                                    },

                                    lineHeight: 1.6,

                                    color: "#555",

                                    maxWidth: 650,

                                    mb: {
                                        xs: 3,
                                        md: 4
                                    }
                                }}
                            >
                                Smart Digital Library Platform for
                                Admins, Librarians and Students.
                            </Typography>


                            {/* ========================================= */}
                            {/* ROLE CARDS */}
                            {/* ========================================= */}

                            <Grid
                                container
                                spacing={{
                                    xs: 2,
                                    sm: 2.5,
                                    md: 3
                                }}
                            >

                                {/* ADMIN */}

                                <Grid
                                    size={{
                                        xs: 12,
                                        sm: 4
                                    }}
                                >

                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            height: "100%",
                                            transition: ".35s",

                                            "&:hover": {
                                                transform:
                                                    "translateY(-8px)",

                                                boxShadow:
                                                    "0 20px 40px rgba(25,118,210,.18)"
                                            }
                                        }}
                                    >

                                        <CardContent
                                            sx={{
                                                textAlign: "center",
                                                py: 3
                                            }}
                                        >

                                            <Avatar
                                                sx={{
                                                    width: {
                                                        xs: 60,
                                                        md: 70
                                                    },

                                                    height: {
                                                        xs: 60,
                                                        md: 70
                                                    },

                                                    bgcolor: "#1976D2",

                                                    mx: "auto",
                                                    mb: 2
                                                }}
                                            >

                                                <AdminPanelSettingsRoundedIcon
                                                    sx={{
                                                        fontSize: {
                                                            xs: 32,
                                                            md: 38
                                                        }
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


                                {/* LIBRARIAN */}

                                <Grid
                                    size={{
                                        xs: 12,
                                        sm: 4
                                    }}
                                >

                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            height: "100%",
                                            transition: ".35s",

                                            "&:hover": {
                                                transform:
                                                    "translateY(-8px)",

                                                boxShadow:
                                                    "0 20px 40px rgba(46,125,50,.18)"
                                            }
                                        }}
                                    >

                                        <CardContent
                                            sx={{
                                                textAlign: "center",
                                                py: 3
                                            }}
                                        >

                                            <Avatar
                                                sx={{
                                                    width: {
                                                        xs: 60,
                                                        md: 70
                                                    },

                                                    height: {
                                                        xs: 60,
                                                        md: 70
                                                    },

                                                    bgcolor: "#2E7D32",

                                                    mx: "auto",
                                                    mb: 2
                                                }}
                                            >

                                                <LocalLibraryRoundedIcon
                                                    sx={{
                                                        fontSize: {
                                                            xs: 32,
                                                            md: 38
                                                        }
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


                                {/* STUDENT */}

                                <Grid
                                    size={{
                                        xs: 12,
                                        sm: 4
                                    }}
                                >

                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            height: "100%",
                                            transition: ".35s",

                                            "&:hover": {
                                                transform:
                                                    "translateY(-8px)",

                                                boxShadow:
                                                    "0 20px 40px rgba(251,140,0,.18)"
                                            }
                                        }}
                                    >

                                        <CardContent
                                            sx={{
                                                textAlign: "center",
                                                py: 3
                                            }}
                                        >

                                            <Avatar
                                                sx={{
                                                    width: {
                                                        xs: 60,
                                                        md: 70
                                                    },

                                                    height: {
                                                        xs: 60,
                                                        md: 70
                                                    },

                                                    bgcolor: "#FB8C00",

                                                    mx: "auto",
                                                    mb: 2
                                                }}
                                            >

                                                <SchoolRoundedIcon
                                                    sx={{
                                                        fontSize: {
                                                            xs: 32,
                                                            md: 38
                                                        }
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

                        </Box>

                    </Grid>


                    {/* ================================================= */}
                    {/* RIGHT SIDE - LOGIN FORM */}
                    {/* ================================================= */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 5
                        }}
                    >

                        <Paper
                            elevation={0}
                            sx={{
                                width: "100%",
                                maxWidth: 500,
                                mx: {
                                    xs: "auto",
                                    md: 0
                                },

                                ml: {
                                    md: "auto"
                                },

                                p: {
                                    xs: 2.5,
                                    sm: 4,
                                    md: 5
                                },

                                borderRadius: {
                                    xs: 4,
                                    md: 6
                                },

                                background:
                                    "rgba(255,255,255,.94)",

                                backdropFilter:
                                    "blur(20px)",

                                border:
                                    "1px solid rgba(255,255,255,.6)",

                                boxShadow:
                                    "0 25px 60px rgba(0,0,0,.12)"
                            }}
                        >

                            <Box
                                sx={{
                                    textAlign: "center"
                                }}
                            >

                                <Avatar
                                    sx={{
                                        width: 70,
                                        height: 70,

                                        mx: "auto",
                                        mb: 1,
                                        background:
                                            "linear-gradient(135deg,#1565C0,#42A5F5)"
                                    }}
                                >

                                    <CheckCircleRoundedIcon
                                        sx={{
                                            fontSize: 40
                                        }}
                                    />

                                </Avatar>

                               

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5,
                                        mb: 0.5
                                    }}
                                >
                                    Login to continue
                                </Typography>

                            </Box>


                            {/* ========================================= */}
                            {/* FORM */}
                            {/* ========================================= */}

                            <form onSubmit={handleLogin}>

                                {/* EMAIL */}

                                <TextField
                                    fullWidth
                                    required

                                    label="Email Address"

                                    margin="normal"

                                    value={email}

                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }

                                    autoComplete="username"

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">

                                                <EmailRoundedIcon
                                                    color="primary"
                                                />

                                            </InputAdornment>
                                        )
                                    }}

                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3,

                                            "&:hover": {
                                                boxShadow:
                                                    "0 10px 20px rgba(25,118,210,.08)"
                                            }
                                        }
                                    }}
                                />


                                {/* PASSWORD */}

                                <TextField
                                    fullWidth
                                    required

                                    label="Password"

                                    margin="normal"

                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    value={password}

                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }

                                    autoComplete="current-password"

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">

                                                <LockRoundedIcon
                                                    color="primary"
                                                />

                                            </InputAdornment>
                                        ),

                                        endAdornment: (
                                            <InputAdornment position="end">

                                                <IconButton
                                                    type="button"

                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >

                                                    {showPassword ? (
                                                        <VisibilityOffRoundedIcon />
                                                    ) : (
                                                        <VisibilityRoundedIcon />
                                                    )}

                                                </IconButton>

                                            </InputAdornment>
                                        )
                                    }}

                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 3,

                                            "&:hover": {
                                                boxShadow:
                                                    "0 10px 20px rgba(25,118,210,.08)"
                                            }
                                        }
                                    }}
                                />


                                {/* REMEMBER / FORGOT */}

                                <Box
                                    sx={{
                                        display: "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems: "center",

                                        flexWrap: "wrap",

                                        gap: 1,

                                        mt: 0.5
                                    }}
                                >

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={rememberMe}

                                                onChange={(e) =>
                                                    setRememberMe(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        }

                                        label="Remember Me"

                                        sx={{
                                            m: 0
                                        }}
                                    />

                                    <Link
                                        component="button"
                                        type="button"

                                        underline="hover"

                                        onClick={() =>
                                            toast.info(
                                                "Forgot Password feature is not available yet."
                                            )
                                        }

                                        sx={{
                                            border: 0,
                                            background: "none",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            p: 0
                                        }}
                                    >
                                        Forgot Password?
                                    </Link>

                                </Box>


                                {/* LOGIN BUTTON */}

                                <Button
                                    fullWidth

                                    variant="contained"

                                    size="large"

                                    type="submit"

                                    sx={{
                                        mt: 2,

                                        py: 1.7,

                                        fontWeight: "bold",

                                        fontSize: "1rem",

                                        borderRadius: 3,

                                        textTransform: "none",

                                        background:
                                            "linear-gradient(135deg,#1565C0,#42A5F5)",

                                        transition: ".35s",

                                        "&:hover": {
                                            transform:
                                                "translateY(-3px)",

                                            background:
                                                "linear-gradient(135deg,#0D47A1,#1976D2)",

                                            boxShadow:
                                                "0 20px 40px rgba(25,118,210,.30)"
                                        }
                                    }}
                                >
                                    Login
                                </Button>


                                {/* SECURITY */}

                                <Box
                                    sx={{
                                        mt: 2,
                                        textAlign: "center"
                                    }}
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

                                        sx={{
                                            fontSize: {
                                                xs: "0.78rem",
                                                sm: "0.9rem"
                                            }
                                        }}
                                    >
                                        👑 Admin
                                        {" • "}
                                        📚 Librarian
                                        {" • "}
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