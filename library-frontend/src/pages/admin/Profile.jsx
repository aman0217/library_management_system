import { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Grid,
    Typography,
    Stack,
    TextField,
    Button,
    Divider,
    Card,
    CardContent,
    Avatar,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    getCurrentUser,
    updateProfile,
    changePassword
} from "../../services/userService";

import { toast } from "react-toastify";


function Profile() {

    // ============================================
    // Password Visibility
    // ============================================

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    // ============================================
    // Dialog States
    // ============================================

    const [editOpen, setEditOpen] = useState(false);

    const [passwordOpen, setPasswordOpen] = useState(false);


    // ============================================
    // Error States
    // ============================================

    const [confirmPasswordError, setConfirmPasswordError] =
        useState("");

    const [currentPasswordError, setCurrentPasswordError] =
        useState("");


    // ============================================
    // Password Validation
    // ============================================

    const [passwordValidation, setPasswordValidation] = useState({

        length: false,

        uppercase: false,

        lowercase: false,

        number: false,

        special: false

    });


    // ============================================
    // Profile Data
    // ============================================

    const [profile, setProfile] = useState({

        firstName: "",

        lastName: "",

        username: "",

        email: "",

        phoneNumber: "",

        role: ""

    });


    // ============================================
    // Edit Profile Form
    // ============================================

    const [profileForm, setProfileForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phoneNumber: ""

    });


    // ============================================
    // Password Form
    // ============================================

    const [passwordForm, setPasswordForm] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    });


    // ============================================
    // Load Profile
    // ============================================

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            const data = await getCurrentUser();

            setProfile(data);

            setProfileForm({

                firstName: data.firstName || "",

                lastName: data.lastName || "",

                email: data.email || "",

                phoneNumber: data.phoneNumber || ""

            });

            setPasswordForm({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load profile");

        }

    };


    // ============================================
    // Password Validation
    // ============================================

    const validateNewPassword = (password) => {

        setPasswordValidation({

            length: password.length >= 8,

            uppercase: /[A-Z]/.test(password),

            lowercase: /[a-z]/.test(password),

            number: /\d/.test(password),

            special: /[@#$%^&+=!]/.test(password)

        });

    };


    // ============================================
    // Close Edit Dialog
    // ============================================

    const handleEditClose = () => {

        setEditOpen(false);

        setProfileForm({

            firstName: profile.firstName || "",

            lastName: profile.lastName || "",

            email: profile.email || "",

            phoneNumber: profile.phoneNumber || ""

        });

    };


    // ============================================
    // Close Password Dialog
    // ============================================

    const handlePasswordClose = () => {

        setPasswordOpen(false);

        setPasswordForm({

            currentPassword: "",

            newPassword: "",

            confirmPassword: ""

        });

        setPasswordValidation({

            length: false,

            uppercase: false,

            lowercase: false,

            number: false,

            special: false

        });

        setCurrentPasswordError("");

        setConfirmPasswordError("");

        setShowCurrentPassword(false);

        setShowNewPassword(false);

        setShowConfirmPassword(false);

    };


    // ============================================
    // Profile Form Change
    // ============================================

    const handleProfileChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setProfileForm(prev => ({

            ...prev,

            [name]: value

        }));

    };


    // ============================================
    // Password Form Change
    // ============================================

    const handlePasswordFormChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setPasswordForm(prev => ({

            ...prev,

            [name]: value

        }));


        // Current Password

        if (name === "currentPassword") {

            setCurrentPasswordError("");

        }


        // New Password

        if (name === "newPassword") {

            validateNewPassword(value);

            if (

                passwordForm.confirmPassword &&

                passwordForm.confirmPassword !== value

            ) {

                setConfirmPasswordError(
                    "Passwords do not match"
                );

            }

            else {

                setConfirmPasswordError("");

            }

        }


        // Confirm Password

        if (name === "confirmPassword") {

            if (value !== passwordForm.newPassword) {

                setConfirmPasswordError(
                    "Passwords do not match"
                );

            }

            else {

                setConfirmPasswordError("");

            }

        }

    };


    // ============================================
    // Update Profile
    // ============================================

    const handleProfileUpdate = async () => {

        try {

            const updated = await updateProfile(profileForm);

            setProfile(updated);

            setProfileForm({

                firstName: updated.firstName || "",

                lastName: updated.lastName || "",

                email: updated.email || "",

                phoneNumber: updated.phoneNumber || ""

            });

            toast.success(
                "Profile updated successfully"
            );

            setEditOpen(false);

        }

        catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Profile update failed"

            );

        }

    };


    // ============================================
    // Update Password
    // ============================================

    const handlePasswordUpdate = async () => {

        if (!passwordForm.currentPassword) {

            setCurrentPasswordError(
                "Current password is required"
            );

            return;

        }


        if (!passwordForm.newPassword) {

            toast.error(
                "Please enter new password"
            );

            return;

        }


        if (

            passwordForm.newPassword !==
            passwordForm.confirmPassword

        ) {

            setConfirmPasswordError(
                "Passwords do not match"
            );

            toast.error(
                "Passwords do not match"
            );

            return;

        }


        const isPasswordValid =

            passwordValidation.length &&

            passwordValidation.uppercase &&

            passwordValidation.lowercase &&

            passwordValidation.number &&

            passwordValidation.special;


        if (!isPasswordValid) {

            toast.error(
                "New password does not meet all requirements"
            );

            return;

        }


        try {

            await changePassword(passwordForm);

            toast.success(
                "Password changed successfully"
            );

            handlePasswordClose();

        }

        catch (error) {

            console.error(error);

            const message =

                error.response?.data?.message ||

                "Password change failed";


            if (

                message
                    .toLowerCase()
                    .includes("current") ||

                message
                    .toLowerCase()
                    .includes("invalid")

            ) {

                setCurrentPasswordError(message);

            }

            toast.error(message);

        }

    };


    // ============================================
    // Helper
    // ============================================

    const initials =

        `${profile.firstName?.charAt(0) || ""}${profile.lastName?.charAt(0) || ""}`;


    // ============================================
    // UI
    // ============================================

    return (

        <DashboardLayout>

            {/* =====================================================
                HERO / WELCOME CARD
            ====================================================== */}

            <Card
                sx={{
                    mb: {
                        xs: 3,
                        md: 4
                    },

                    borderRadius: {
                        xs: 3,
                        md: 5
                    },

                    background:
                        "linear-gradient(135deg,#1976d2,#512DA8)",

                    color: "#fff",

                    overflow: "hidden",

                    boxShadow:
                        "0 12px 35px rgba(25,118,210,.25)"
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

                            flexDirection: {
                                xs: "column",
                                sm: "row"
                            },

                            justifyContent:
                                "space-between",

                            alignItems: {
                                xs: "flex-start",
                                sm: "center"
                            },

                            gap: {
                                xs: 3,
                                sm: 2
                            }
                        }}
                    >

                        {/* ================= LEFT ================= */}

                        <Box
                            sx={{
                                minWidth: 0,
                                flex: 1
                            }}
                        >

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    fontSize: {
                                        xs: "1.65rem",
                                        sm: "2rem",
                                        md: "2.125rem"
                                    },

                                    lineHeight: 1.2
                                }}
                            >
                                👤 My Profile
                            </Typography>


                            <Typography
                                mt={1}
                                sx={{
                                    opacity: .95,

                                    fontSize: {
                                        xs: ".9rem",
                                        sm: "1rem"
                                    },

                                    maxWidth: 650
                                }}
                            >
                                Manage your personal information
                                and account security.
                            </Typography>


                            <Box
                                sx={{
                                    mt: 2,

                                    display: "flex",

                                    alignItems: {
                                        xs: "flex-start",
                                        sm: "center"
                                    },

                                    flexDirection: {
                                        xs: "column",
                                        sm: "row"
                                    },

                                    gap: 1.2
                                }}
                            >

                                <Chip
                                    label={
                                        profile.role || "USER"
                                    }
                                    sx={{
                                        bgcolor: "#2E7D32",
                                        color: "#fff",
                                        fontWeight: "bold"
                                    }}
                                />


                                <Typography
                                    variant="body2"
                                    sx={{
                                        opacity: .95,

                                        maxWidth: {
                                            xs: "100%",
                                            sm: 450
                                        },

                                        overflow:
                                            "hidden",

                                        textOverflow:
                                            "ellipsis",

                                        whiteSpace: {
                                            xs: "normal",
                                            sm: "nowrap"
                                        },

                                        wordBreak:
                                            "break-word"
                                    }}
                                >
                                    {profile.email}
                                </Typography>

                            </Box>

                        </Box>


                        {/* ================= RIGHT AVATAR ================= */}

                        <Box
                            sx={{
                                display: "flex",

                                alignItems: "center",

                                justifyContent: {
                                    xs: "flex-start",
                                    sm: "center"
                                },

                                flexShrink: 0
                            }}
                        >

                            <Avatar
                                sx={{
                                    width: {
                                        xs: 72,
                                        sm: 90,
                                        md: 95
                                    },

                                    height: {
                                        xs: 72,
                                        sm: 90,
                                        md: 95
                                    },

                                    bgcolor: "#fff",

                                    color: "#1976d2",

                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "2rem"
                                    },

                                    fontWeight: "bold",

                                    border:
                                        "4px solid rgba(255,255,255,.25)",

                                    boxShadow:
                                        "0 8px 25px rgba(0,0,0,.25)"
                                }}
                            >
                                {initials}
                            </Avatar>

                        </Box>

                    </Box>

                </CardContent>

            </Card>


            {/* =====================================================
                PERSONAL INFORMATION
            ====================================================== */}

            <Card
                sx={{
                    borderRadius: {
                        xs: 3,
                        md: 5
                    },

                    background:
                        "linear-gradient(135deg,#FCFCFF,#F4F0FF)",

                    border:
                        "1px solid #90bae4",

                    boxShadow:
                        "0 8px 24px rgba(103,58,183,.10)",

                    transition: ".35s",

                    overflow: "hidden",

                    "&:hover": {
                        transform: {
                            xs: "none",
                            md: "translateY(-5px)"
                        },

                        boxShadow:
                            "0 18px 35px rgba(103,58,183,.15)"
                    }
                }}
            >

                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            sm: 3,
                            md: 4
                        }
                    }}
                >

                    {/* ================= HEADER ================= */}

                    <Box
                        sx={{
                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                md: "row"
                            },

                            justifyContent:
                                "space-between",

                            alignItems: {
                                xs: "flex-start",
                                md: "center"
                            },

                            gap: 2,

                            mb: 3
                        }}
                    >

                        <Box
                            sx={{
                                minWidth: 0
                            }}
                        >

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    color: "#1565C0",

                                    letterSpacing: .5,

                                    fontSize: {
                                        xs: "1.45rem",
                                        sm: "1.75rem",
                                        md: "2.125rem"
                                    }
                                }}
                            >
                                Personal Information
                            </Typography>


                            <Typography
                                mt={1}
                                color="text.secondary"
                                sx={{
                                    fontSize: {
                                        xs: ".85rem",
                                        sm: ".95rem"
                                    }
                                }}
                            >
                                View and manage your profile
                                details.
                            </Typography>

                        </Box>


                        {/* ================= BUTTONS ================= */}

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

                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={
                                    <EditIcon />
                                }

                                onClick={() =>
                                    setEditOpen(true)
                                }

                                sx={{
                                    borderRadius: 3,

                                    textTransform:
                                        "none",

                                    fontWeight:
                                        "bold",

                                    px: 3,

                                    height: 46,

                                    minWidth: {
                                        xs: "100%",
                                        sm: 150
                                    },

                                    background:
                                        "linear-gradient(135deg,#1976D2,#1565C0)",

                                    boxShadow:
                                        "0 8px 18px rgba(25,118,210,.25)",

                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg,#1565C0,#0D47A1)"
                                    }
                                }}
                            >
                                Edit Profile
                            </Button>


                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={
                                    <LockResetIcon />
                                }

                                onClick={() =>
                                    setPasswordOpen(true)
                                }

                                sx={{
                                    borderRadius: 3,

                                    textTransform:
                                        "none",

                                    fontWeight:
                                        "bold",

                                    height: 46,

                                    px: 3,

                                    minWidth: {
                                        xs: "100%",
                                        sm: 170
                                    }
                                }}
                            >
                                Change Password
                            </Button>

                        </Stack>

                    </Box>


                    <Divider
                        sx={{
                            mb: 3
                        }}
                    />


                    {/* =================================================
                        PROFILE COMPLETION
                    ================================================== */}

                    <Paper
                        elevation={0}
                        sx={{
                            mb: 3,

                            p: {
                                xs: 2,
                                sm: 2.5
                            },

                            background:
                                "#E8F5E9",

                            borderRadius: 4,

                            border:
                                "1px solid #C8E6C9"
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",

                                flexDirection: {
                                    xs: "column",
                                    sm: "row"
                                },

                                justifyContent:
                                    "space-between",

                                alignItems: {
                                    xs: "flex-start",
                                    sm: "center"
                                },

                                gap: 1.5
                            }}
                        >

                            <Box>

                                <Typography
                                    fontWeight="bold"
                                >
                                    Profile Completion
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={.5}
                                >
                                    Your profile is
                                    100% complete.
                                </Typography>

                            </Box>


                            <Chip
                                label="Completed"
                                color="success"
                                icon={
                                    <VerifiedUserIcon />
                                }

                                sx={{
                                    fontWeight:
                                        "bold"
                                }}
                            />

                        </Box>

                    </Paper>


                    {/* =================================================
                        PROFILE DETAILS
                    ================================================== */}

                    <Grid
                        container
                        spacing={{
                            xs: 2,
                            sm: 2.5,
                            md: 3
                        }}
                    >

                        {/* First Name */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <ProfileField
                                icon={
                                    <PersonIcon />
                                }
                                label="First Name"
                                value={
                                    profile.firstName
                                }
                            />

                        </Grid>


                        {/* Last Name */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <ProfileField
                                icon={
                                    <PersonIcon />
                                }
                                label="Last Name"
                                value={
                                    profile.lastName
                                }
                            />

                        </Grid>


                        {/* Username */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <ProfileField
                                icon={
                                    <BadgeIcon />
                                }
                                label="Username"
                                value={
                                    profile.username
                                }
                            />

                        </Grid>


                        {/* Role */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Paper
                                elevation={0}
                                sx={{
                                    p: {
                                        xs: 2,
                                        sm: 2.5
                                    },

                                    borderRadius: 4,

                                    background:
                                        "#FFFFFF",

                                    border:
                                        "1px solid #EEF2FF",

                                    height: "100%",

                                    transition: ".3s",

                                    "&:hover": {
                                        transform: {
                                            xs: "none",
                                            md: "translateY(-5px)"
                                        },

                                        boxShadow:
                                            "0 12px 25px rgba(0,0,0,.12)"
                                    }
                                }}
                            >

                                <Typography
                                    fontWeight={600}
                                    color="text.secondary"
                                    mb={1.5}
                                >
                                    Role
                                </Typography>

                                <Chip
                                    label={
                                        profile.role ||
                                        "USER"
                                    }

                                    color="primary"

                                    sx={{
                                        fontWeight:
                                            "bold",

                                        px: 2,

                                        height: 36,

                                        borderRadius: 5
                                    }}
                                />

                            </Paper>

                        </Grid>


                        {/* Email */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <ProfileField
                                icon={
                                    <EmailIcon />
                                }
                                label="Email"
                                value={
                                    profile.email
                                }
                            />

                        </Grid>


                        {/* Phone */}

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <ProfileField
                                icon={
                                    <PhoneIcon />
                                }
                                label="Phone Number"
                                value={
                                    profile.phoneNumber
                                }
                            />

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>


            {/* =====================================================
                EDIT PROFILE DIALOG
            ====================================================== */}

            <Dialog
                open={editOpen}
                onClose={handleEditClose}
                fullWidth
                maxWidth="sm"

                PaperProps={{
                    sx: {
                        borderRadius: {
                            xs: 3,
                            sm: 5
                        },

                        width: {
                            xs: "calc(100% - 24px)",
                            sm: "100%"
                        },

                        m: {
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


                <DialogContent
                    sx={{
                        pt: 1,

                        overflow: "visible"
                    }}
                >

                    <Stack spacing={2}>

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
                        />


                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={
                                profileForm.email
                            }
                            onChange={
                                handleProfileChange
                            }
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
                        />

                    </Stack>

                </DialogContent>


                <DialogActions
                    sx={{
                        p: {
                            xs: 2,
                            sm: 3
                        },

                        flexDirection: {
                            xs: "column-reverse",
                            sm: "row"
                        },

                        gap: 1
                    }}
                >

                    <Button
                        fullWidth={{
                            xs: true,
                            sm: false
                        }}

                        onClick={
                            handleEditClose
                        }

                        variant="outlined"

                        sx={{
                            borderRadius: 3,

                            textTransform:
                                "none",

                            px: 3
                        }}
                    >
                        Cancel
                    </Button>


                    <Button
                        fullWidth={{
                            xs: true,
                            sm: false
                        }}

                        variant="contained"

                        onClick={
                            handleProfileUpdate
                        }

                        sx={{
                            borderRadius: 3,

                            textTransform:
                                "none",

                            px: 3
                        }}
                    >
                        Save Changes
                    </Button>

                </DialogActions>

            </Dialog>


            {/* =====================================================
                CHANGE PASSWORD DIALOG
            ====================================================== */}

            <Dialog
                open={passwordOpen}
                onClose={handlePasswordClose}
                fullWidth
                maxWidth="sm"

                PaperProps={{
                    sx: {
                        borderRadius: {
                            xs: 3,
                            sm: 5
                        },

                        width: {
                            xs: "calc(100% - 24px)",
                            sm: "100%"
                        },

                        m: {
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
                    Change Password
                </DialogTitle>


                <DialogContent>

                    <Stack
                        spacing={2}
                        mt={1}
                    >

                        {/* Current Password */}

                        <TextField
                            fullWidth
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
                                handlePasswordFormChange
                            }

                            error={
                                currentPasswordError !== ""
                            }

                            helperText={
                                currentPasswordError
                            }

                            slotProps={{
                                input: {

                                    endAdornment: (

                                        <InputAdornment
                                            position="end"
                                        >

                                            <IconButton
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        prev =>
                                                            !prev
                                                    )
                                                }

                                                edge="end"
                                            >

                                                {
                                                    showCurrentPassword

                                                        ?

                                                        <VisibilityOff />

                                                        :

                                                        <Visibility />
                                                }

                                            </IconButton>

                                        </InputAdornment>

                                    )
                                }
                            }}
                        />


                        {/* New Password */}

                        <TextField
                            fullWidth
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
                                handlePasswordFormChange
                            }

                            slotProps={{
                                input: {

                                    endAdornment: (

                                        <InputAdornment
                                            position="end"
                                        >

                                            <IconButton
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        prev =>
                                                            !prev
                                                    )
                                                }

                                                edge="end"
                                            >

                                                {
                                                    showNewPassword

                                                        ?

                                                        <VisibilityOff />

                                                        :

                                                        <Visibility />
                                                }

                                            </IconButton>

                                        </InputAdornment>

                                    )
                                }
                            }}
                        />


                        {/* Password Validation */}

                        <Box
                            sx={{
                                p: 2,

                                borderRadius: 3,

                                bgcolor: "#F8FAFC",

                                border:
                                    "1px solid #E5EAF2"
                            }}
                        >

                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                mb={1}
                            >
                                Password Requirements
                            </Typography>


                            <Stack spacing={.5}>

                                <PasswordRule
                                    valid={
                                        passwordValidation.length
                                    }
                                    text="Minimum 8 characters"
                                />


                                <PasswordRule
                                    valid={
                                        passwordValidation.uppercase
                                    }
                                    text="One Uppercase Letter"
                                />


                                <PasswordRule
                                    valid={
                                        passwordValidation.lowercase
                                    }
                                    text="One Lowercase Letter"
                                />


                                <PasswordRule
                                    valid={
                                        passwordValidation.number
                                    }
                                    text="One Number"
                                />


                                <PasswordRule
                                    valid={
                                        passwordValidation.special
                                    }
                                    text="One Special Character"
                                />

                            </Stack>

                        </Box>


                        {/* Confirm Password */}

                        <TextField
                            fullWidth
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
                                handlePasswordFormChange
                            }

                            error={
                                confirmPasswordError !== ""
                            }

                            helperText={
                                confirmPasswordError
                            }

                            slotProps={{
                                input: {

                                    endAdornment: (

                                        <InputAdornment
                                            position="end"
                                        >

                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        prev =>
                                                            !prev
                                                    )
                                                }

                                                edge="end"
                                            >

                                                {
                                                    showConfirmPassword

                                                        ?

                                                        <VisibilityOff />

                                                        :

                                                        <Visibility />
                                                }

                                            </IconButton>

                                        </InputAdornment>

                                    )
                                }
                            }}
                        />

                    </Stack>

                </DialogContent>


                <DialogActions
                    sx={{
                        p: {
                            xs: 2,
                            sm: 3
                        },

                        flexDirection: {
                            xs: "column-reverse",
                            sm: "row"
                        },

                        gap: 1
                    }}
                >

                    <Button
                        fullWidth={{
                            xs: true,
                            sm: false
                        }}

                        variant="outlined"

                        onClick={
                            handlePasswordClose
                        }

                        sx={{
                            borderRadius: 3,

                            textTransform:
                                "none",

                            px: 3
                        }}
                    >
                        Cancel
                    </Button>


                    <Button
                        fullWidth={{
                            xs: true,
                            sm: false
                        }}

                        variant="contained"

                        onClick={
                            handlePasswordUpdate
                        }

                        sx={{
                            borderRadius: 3,

                            textTransform:
                                "none",

                            px: 3
                        }}
                    >
                        Change Password
                    </Button>

                </DialogActions>

            </Dialog>

        </DashboardLayout>

    );

}


// ============================================================
// PROFILE FIELD COMPONENT
// ============================================================

function ProfileField({
    icon,
    label,
    value
}) {

    return (

        <Paper
            elevation={0}
            sx={{
                p: {
                    xs: 2,
                    sm: 2.5
                },

                borderRadius: 4,

                background: "#FFFFFF",

                border:
                    "1px solid #EEF2FF",

                height: "100%",

                minHeight: {
                    xs: 105,
                    sm: 120
                },

                transition: ".3s",

                "&:hover": {

                    transform: {
                        xs: "none",
                        md: "translateY(-5px)"
                    },

                    boxShadow:
                        "0 12px 25px rgba(0,0,0,.12)"
                }
            }}
        >

            <Box
                sx={{
                    display: "flex",

                    alignItems: "center",

                    gap: 1,

                    mb: 1
                }}
            >

                <Box
                    sx={{
                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        width: 30,

                        height: 30,

                        borderRadius: 2,

                        bgcolor: "#EAF4FF",

                        color: "#1976D2"
                    }}
                >
                    {icon}
                </Box>


                <Typography
                    fontWeight={600}
                    color="text.secondary"
                    sx={{
                        fontSize: {
                            xs: ".82rem",
                            sm: ".9rem"
                        }
                    }}
                >
                    {label}
                </Typography>

            </Box>


            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                    color: "#172B4D",

                    fontSize: {
                        xs: "1rem",
                        sm: "1.1rem"
                    },

                    wordBreak: "break-word",

                    overflowWrap:
                        "anywhere"
                }}
            >
                {value || "—"}
            </Typography>

        </Paper>

    );

}


// ============================================================
// PASSWORD RULE COMPONENT
// ============================================================

function PasswordRule({
    valid,
    text
}) {

    return (

        <Typography
            variant="caption"
            sx={{
                color: valid
                    ? "success.main"
                    : "error.main",

                fontWeight: 500
            }}
        >
            {valid ? "✔" : "✖"} {text}
        </Typography>

    );

}


export default Profile;