import { useEffect, useState } from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    CircularProgress,
    Grid,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    InputAdornment,
    Divider,
    Stack
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";

import {
    getCurrentUser,
    updateProfile,
    changePassword
} from "../../services/userService";

import { toast } from "react-toastify";


function StudentProfile() {

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState(null);

    const [editOpen, setEditOpen] = useState(false);

    const [passwordOpen, setPasswordOpen] = useState(false);

    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    /* =========================
       LOAD PROFILE
    ========================= */

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            const data = await getCurrentUser();

            console.log("Current User =", data);

            setProfile(data);

            setProfileForm({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                phoneNumber: data.phoneNumber || ""
            });

        }
        catch (error) {

            console.error(error);

            toast.error("Failed to load profile");

        }
        finally {

            setLoading(false);

        }

    };


    /* =========================
       PROFILE FORM
    ========================= */

    const handleProfileChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setProfileForm(prev => ({

            ...prev,

            [name]: value

        }));

    };


    /* =========================
       PASSWORD FORM
    ========================= */

    const handlePasswordChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setPasswordForm(prev => ({

            ...prev,

            [name]: value

        }));

    };


    /* =========================
       EDIT PROFILE CLOSE
    ========================= */

    const handleEditClose = () => {

        setEditOpen(false);

        if (!profile) return;

        setProfileForm({

            firstName: profile.firstName || "",

            lastName: profile.lastName || "",

            email: profile.email || "",

            phoneNumber: profile.phoneNumber || ""

        });

    };


    /* =========================
       PASSWORD DIALOG CLOSE
    ========================= */

    const handlePasswordClose = () => {

        setPasswordOpen(false);

        setPasswordForm({

            currentPassword: "",

            newPassword: "",

            confirmPassword: ""

        });

        setShowCurrentPassword(false);

        setShowNewPassword(false);

        setShowConfirmPassword(false);

    };


    /* =========================
       UPDATE PROFILE
    ========================= */

    const handleProfileUpdate = async () => {

        try {

            const updatedUser =
                await updateProfile(profileForm);

            console.log(
                "Updated User =",
                updatedUser
            );

            setProfile(updatedUser);

            setProfileForm({

                firstName:
                    updatedUser.firstName || "",

                lastName:
                    updatedUser.lastName || "",

                email:
                    updatedUser.email || "",

                phoneNumber:
                    updatedUser.phoneNumber || ""

            });

            toast.success(
                "Profile updated successfully"
            );

            setEditOpen(false);

        }
        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Failed to update profile"

            );

        }

    };


    /* =========================
       CHANGE PASSWORD
    ========================= */

    const handlePasswordUpdate = async () => {

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,100}$/;


        /* Empty current password */

        if (!passwordForm.currentPassword.trim()) {

            toast.error(
                "Please enter your current password."
            );

            return;

        }


        /* Password validation */

        if (
            !passwordRegex.test(
                passwordForm.newPassword
            )
        ) {

            toast.error(
                "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
            );

            return;

        }


        /* Confirm password */

        if (
            passwordForm.newPassword !==
            passwordForm.confirmPassword
        ) {

            toast.error(
                "New password and Confirm password do not match."
            );

            return;

        }


        /* Same password */

        if (
            passwordForm.currentPassword ===
            passwordForm.newPassword
        ) {

            toast.error(
                "New password must be different from current password."
            );

            return;

        }


        try {

            await changePassword(passwordForm);

            toast.success(
                "Password changed successfully."
            );

            handlePasswordClose();

        }
        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Failed to change password."

            );

        }

    };


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        minHeight: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <CircularProgress />

                </Box>

            </StudentDashboardLayout>

        );

    }


    if (!profile) {

        return (

            <StudentDashboardLayout>

                <Box
                    sx={{
                        textAlign: "center",
                        mt: 8
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >

                        Unable to load profile.

                    </Typography>

                </Box>

            </StudentDashboardLayout>

        );

    }


    /* =========================
       MAIN UI
    ========================= */

    return (

        <StudentDashboardLayout>

            {/* =====================================
                HEADER
            ===================================== */}

            <Card
                sx={{
                    borderRadius: 5,
                    background:
                        "linear-gradient(135deg,#1976d2,#512DA8)",
                    color: "#fff",
                    mb: 4,
                    overflow: "hidden",
                    boxShadow: 6
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 3,
                            sm: 4,
                            md: 5
                        }
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 3
                        }}
                    >

                        {/* LEFT */}

                        <Box
                            sx={{
                                minWidth: 0
                            }}
                        >

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    fontSize: {
                                        xs: "1.8rem",
                                        sm: "2.2rem",
                                        md: "2.5rem"
                                    }
                                }}
                            >

                                👤 My Profile

                            </Typography>


                            <Typography
                                mt={1}
                                sx={{
                                    opacity: 0.9,
                                    fontSize: {
                                        xs: "0.95rem",
                                        sm: "1rem"
                                    }
                                }}
                            >

                                Manage your personal information.

                            </Typography>

                        </Box>


                        {/* RIGHT AVATAR */}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexShrink: 0
                            }}
                        >

                            <Avatar
                                sx={{
                                    width: {
                                        xs: 65,
                                        sm: 80,
                                        md: 90
                                    },

                                    height: {
                                        xs: 65,
                                        sm: 80,
                                        md: 90
                                    },

                                    bgcolor: "#fff",

                                    color: "#1976d2",

                                    boxShadow:
                                        "0 10px 25px rgba(0,0,0,.25)"
                                }}
                            >

                                <PersonIcon
                                    sx={{
                                        fontSize: {
                                            xs: 38,
                                            sm: 48,
                                            md: 55
                                        }
                                    }}
                                />

                            </Avatar>

                        </Box>

                    </Box>

                </CardContent>

            </Card>


            {/* =====================================
                PERSONAL INFORMATION CARD
            ===================================== */}

            <Card
                sx={{
                    borderRadius: 5,

                    background:
                        "linear-gradient(135deg,#FCFCFF,#F4F0FF)",

                    border:
                        "1px solid #E7DDFE",

                    boxShadow:
                        "0 8px 24px rgba(103,58,183,.10)",

                    transition: ".35s",

                    "&:hover": {

                        transform:
                            "translateY(-4px)",

                        boxShadow:
                            "0 16px 32px rgba(103,58,183,.15)"

                    },

                    mb: 4
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 2.5,
                            sm: 3.5,
                            md: 4
                        }
                    }}
                >

                    {/* TITLE + BUTTONS */}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                sm: "center"
                            },
                            flexDirection: {
                                xs: "column",
                                sm: "row"
                            },
                            gap: 2,
                            mb: 4
                        }}
                    >

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                color: "#1565C0",
                                letterSpacing: .5
                            }}
                        >

                            Personal Information

                        </Typography>


                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}
                            spacing={1.5}
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                }
                            }}
                        >

                            {/* EDIT */}

                            <Button
                                variant="contained"
                                startIcon={
                                    <EditIcon />
                                }
                                onClick={() =>
                                    setEditOpen(true)
                                }
                                sx={{
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    px: 2.5,
                                    width: {
                                        xs: "100%",
                                        sm: "auto"
                                    }
                                }}
                            >

                                Edit Profile

                            </Button>


                            {/* CHANGE PASSWORD */}

                            <Button
                                variant="outlined"
                                startIcon={
                                    <LockResetIcon />
                                }
                                onClick={() =>
                                    setPasswordOpen(true)
                                }
                                sx={{
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    px: 2.5,
                                    width: {
                                        xs: "100%",
                                        sm: "auto"
                                    }
                                }}
                            >

                                Change Password

                            </Button>

                        </Stack>

                    </Box>


                    <Divider
                        sx={{
                            mb: 4
                        }}
                    />


                    {/* =================================
                        INFORMATION GRID
                    ================================= */}

                    <Grid
                        container
                        spacing={{
                            xs: 2.5,
                            md: 3
                        }}
                    >

                        {/* FIRST NAME */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}
                        >

                            <Box>

                                <Typography
                                    sx={{
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: "text.secondary",
                                        mb: .8
                                    }}
                                >

                                    First Name

                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.1rem",
                                            md: "1.3rem"
                                        },
                                        wordBreak: "break-word"
                                    }}
                                >

                                    {profile.firstName || "—"}

                                </Typography>

                            </Box>

                        </Grid>


                        {/* LAST NAME */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}
                        >

                            <Box>

                                <Typography
                                    sx={{
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: "text.secondary",
                                        mb: .8
                                    }}
                                >

                                    Last Name

                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.1rem",
                                            md: "1.3rem"
                                        },
                                        wordBreak: "break-word"
                                    }}
                                >

                                    {profile.lastName || "—"}

                                </Typography>

                            </Box>

                        </Grid>


                        {/* USERNAME */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}
                        >

                            <Box>

                                <Typography
                                    sx={{
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: "text.secondary",
                                        mb: .8
                                    }}
                                >

                                    Username

                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.1rem",
                                            md: "1.3rem"
                                        },
                                        wordBreak: "break-word"
                                    }}
                                >

                                    {profile.username || "—"}

                                </Typography>

                            </Box>

                        </Grid>


                        {/* ROLE */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}
                        >

                            <Box>

                                <Typography
                                    sx={{
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: "text.secondary",
                                        mb: .8
                                    }}
                                >

                                    Role

                                </Typography>

                                <Chip
                                    label={
                                        profile.role || "—"
                                    }
                                    color="primary"
                                    sx={{
                                        fontWeight: "bold",
                                        px: 1,
                                        height: 34
                                    }}
                                />

                            </Box>

                        </Grid>


                        {/* EMAIL */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}
                        >

                            <Box>

                                <Typography
                                    sx={{
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: "text.secondary",
                                        mb: .8
                                    }}
                                >

                                    Email

                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.1rem",
                                            md: "1.3rem"
                                        },
                                        wordBreak:
                                            "break-word"
                                    }}
                                >

                                    {profile.email || "—"}

                                </Typography>

                            </Box>

                        </Grid>


                        {/* PHONE */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6
                            }}
                        >

                            <Box>

                                <Typography
                                    sx={{
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: "text.secondary",
                                        mb: .8
                                    }}
                                >

                                    Phone Number

                                </Typography>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.1rem",
                                            md: "1.3rem"
                                        }
                                    }}
                                >

                                    {profile.phoneNumber || "—"}

                                </Typography>

                            </Box>

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>


            {/* =================================================
                EDIT PROFILE DIALOG
            ================================================= */}

            <Dialog
                open={editOpen}
                onClose={handleEditClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        mx: {
                            xs: 1.5,
                            sm: 2
                        }
                    }
                }}
            >

                <DialogTitle
                    sx={{
                        fontWeight: "bold",
                        color: "#1565C0",
                        fontSize: {
                            xs: "1.3rem",
                            sm: "1.5rem"
                        }
                    }}
                >

                    Edit Profile

                </DialogTitle>


                <DialogContent>

                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={
                            profileForm.firstName
                        }
                        onChange={
                            handleProfileChange
                        }
                        margin="normal"
                    />


                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={
                            profileForm.lastName
                        }
                        onChange={
                            handleProfileChange
                        }
                        margin="normal"
                    />


                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={
                            profileForm.email
                        }
                        onChange={
                            handleProfileChange
                        }
                        margin="normal"
                    />


                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={
                            profileForm.phoneNumber
                        }
                        onChange={
                            handleProfileChange
                        }
                        margin="normal"
                    />

                </DialogContent>


                <DialogActions
                    sx={{
                        p: 3,
                        gap: 1,
                        flexDirection: {
                            xs: "column-reverse",
                            sm: "row"
                        }
                    }}
                >

                    <Button
                        onClick={
                            handleEditClose
                        }
                        variant="outlined"
                        sx={{
                            color: "#EF6C00",
                            borderColor: "#EF6C00",
                            fontWeight: "bold",
                            borderRadius: 3,
                            px: 3,
                            width: {
                                xs: "100%",
                                sm: "auto"
                            },

                            "&:hover": {
                                borderColor:
                                    "#E65100",
                                background:
                                    "#FFF3E0"
                            }
                        }}
                    >

                        Cancel

                    </Button>


                    <Button
                        variant="contained"
                        onClick={
                            handleProfileUpdate
                        }
                        sx={{
                            background: "#FB8C00",
                            fontWeight: "bold",
                            borderRadius: 3,
                            px: 3,
                            width: {
                                xs: "100%",
                                sm: "auto"
                            },

                            "&:hover": {
                                background: "#EF6C00"
                            }
                        }}
                    >

                        Save Changes

                    </Button>

                </DialogActions>

            </Dialog>


            {/* =================================================
                CHANGE PASSWORD DIALOG
            ================================================= */}

            <Dialog
                open={passwordOpen}
                onClose={handlePasswordClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        mx: {
                            xs: 1.5,
                            sm: 2
                        }
                    }
                }}
            >

                <DialogTitle
                    sx={{
                        fontWeight: "bold",
                        color: "#1565C0",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    <LockResetIcon />

                    Change Password

                </DialogTitle>


                <DialogContent>


                    {/* CURRENT PASSWORD */}

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Current Password"
                        name="currentPassword"
                        type={
                            showCurrentPassword
                                ? "text"
                                : "password"
                        }
                        value={
                            passwordForm.currentPassword
                        }
                        onChange={
                            handlePasswordChange
                        }
                        slotProps={{
                            input: {

                                endAdornment: (

                                    <InputAdornment
                                        position="end"
                                    >

                                        <IconButton
                                            edge="end"
                                            onClick={() =>
                                                setShowCurrentPassword(
                                                    prev => !prev
                                                )
                                            }
                                        >

                                            {showCurrentPassword
                                                ? <VisibilityOff />
                                                : <Visibility />
                                            }

                                        </IconButton>

                                    </InputAdornment>

                                )

                            }
                        }}
                    />


                    {/* NEW PASSWORD */}

                    <TextField
                        fullWidth
                        margin="normal"
                        label="New Password"
                        name="newPassword"
                        type={
                            showNewPassword
                                ? "text"
                                : "password"
                        }
                        value={
                            passwordForm.newPassword
                        }
                        onChange={
                            handlePasswordChange
                        }
                        helperText={
                            "Must be 8+ characters with uppercase, lowercase, number and special character."
                        }
                        slotProps={{
                            input: {

                                endAdornment: (

                                    <InputAdornment
                                        position="end"
                                    >

                                        <IconButton
                                            edge="end"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    prev => !prev
                                                )
                                            }
                                        >

                                            {showNewPassword
                                                ? <VisibilityOff />
                                                : <Visibility />
                                            }

                                        </IconButton>

                                    </InputAdornment>

                                )

                            }
                        }}
                    />


                    {/* CONFIRM PASSWORD */}

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        name="confirmPassword"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={
                            passwordForm.confirmPassword
                        }
                        onChange={
                            handlePasswordChange
                        }
                        slotProps={{
                            input: {

                                endAdornment: (

                                    <InputAdornment
                                        position="end"
                                    >

                                        <IconButton
                                            edge="end"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    prev => !prev
                                                )
                                            }
                                        >

                                            {showConfirmPassword
                                                ? <VisibilityOff />
                                                : <Visibility />
                                            }

                                        </IconButton>

                                    </InputAdornment>

                                )

                            }
                        }}
                    />

                </DialogContent>


                <DialogActions
                    sx={{
                        p: 3,
                        gap: 1,
                        flexDirection: {
                            xs: "column-reverse",
                            sm: "row"
                        }
                    }}
                >

                    <Button
                        onClick={
                            handlePasswordClose
                        }
                        variant="outlined"
                        sx={{
                            color: "#EF6C00",
                            borderColor: "#EF6C00",
                            fontWeight: "bold",
                            borderRadius: 3,
                            px: 3,
                            width: {
                                xs: "100%",
                                sm: "auto"
                            },

                            "&:hover": {
                                borderColor:
                                    "#E65100",
                                background:
                                    "#FFF3E0"
                            }
                        }}
                    >

                        Cancel

                    </Button>


                    <Button
                        variant="contained"
                        onClick={
                            handlePasswordUpdate
                        }
                        sx={{
                            background: "#FB8C00",
                            fontWeight: "bold",
                            borderRadius: 3,
                            px: 3,
                            width: {
                                xs: "100%",
                                sm: "auto"
                            },

                            "&:hover": {
                                background: "#EF6C00"
                            }
                        }}
                    >

                        Change Password

                    </Button>

                </DialogActions>

            </Dialog>

        </StudentDashboardLayout>

    );

}


export default StudentProfile;