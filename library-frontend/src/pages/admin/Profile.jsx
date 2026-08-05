import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {

    getCurrentUser,

    updateProfile,

    changePassword

} from "../../services/userService";

import {
    Box,
    Paper,
    Grid,
    Typography,

    Stack,

    TextField,

    Button,

    Divider

} from "@mui/material";

import { toast } from "react-toastify";

function Profile() {

    // =========================
    // Password Visibility
    // =========================

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // =========================
    // Dialog States
    // =========================

    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);

    // =========================
    // Error States
    // =========================

    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");

    // =========================
    // Password Validation
    // =========================

    const [passwordValidation, setPasswordValidation] = useState({

        length: false,

        uppercase: false,

        lowercase: false,

        number: false,

        special: false

    });

    // =========================
    // Profile Data
    // =========================

    const [profile, setProfile] = useState({

        firstName: "",

        lastName: "",

        username: "",

        email: "",

        phoneNumber: "",

        role: ""

    });

    // =========================
    // Edit Form
    // =========================

    const [profileForm, setProfileForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phoneNumber: ""

    });

    // =========================
    // Password Form
    // =========================

    const [passwordForm, setPasswordForm] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    // =========================
    // Load Profile
    // =========================

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
    
    // =========================
// Password Validation
// =========================

const validateNewPassword = (password) => {

    setPasswordValidation({

        length: password.length >= 8,

        uppercase: /[A-Z]/.test(password),

        lowercase: /[a-z]/.test(password),

        number: /\d/.test(password),

        special: /[@#$%^&+=!]/.test(password)

    });

};

// =========================
// Dialog Close
// =========================

const handleEditClose = () => {

    setEditOpen(false);

    setProfileForm({

        firstName: profile.firstName,

        lastName: profile.lastName,

        email: profile.email,

        phoneNumber: profile.phoneNumber

    });

};

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

};

// =========================
// Profile Form Change
// =========================

const handleProfileChange = (e) => {

    const { name, value } = e.target;

    setProfileForm(prev => ({

        ...prev,

        [name]: value

    }));

};

// =========================
// Password Form Change
// =========================

const handlePasswordFormChange = (e) => {

    const { name, value } = e.target;

    setPasswordForm(prev => ({

        ...prev,

        [name]: value

    }));

    if (name === "currentPassword") {

        setCurrentPasswordError("");

    }

    if (name === "newPassword") {

        validateNewPassword(value);

        if (

            passwordForm.confirmPassword &&

            passwordForm.confirmPassword !== value

        ) {

            setConfirmPasswordError("Passwords do not match");

        }

        else {

            setConfirmPasswordError("");

        }

    }

    if (name === "confirmPassword") {

        if (value !== passwordForm.newPassword) {

            setConfirmPasswordError("Passwords do not match");

        }

        else {

            setConfirmPasswordError("");

        }

    }

};

// =========================
// Update Profile
// =========================

const handleProfileUpdate = async () => {

    try {

        const updated = await updateProfile(profileForm);

        setProfile(updated);

        setProfileForm({

            firstName: updated.firstName,

            lastName: updated.lastName,

            email: updated.email,

            phoneNumber: updated.phoneNumber

        });

        toast.success("Profile updated successfully");

        setEditOpen(false);

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Profile update failed"

        );

    }

};

// =========================
// Update Password
// =========================

const handlePasswordUpdate = async () => {

    if (

        passwordForm.newPassword !==

        passwordForm.confirmPassword

    ) {

        toast.error("Passwords do not match");

        return;

    }

    try {

        await changePassword(passwordForm);

        toast.success("Password changed successfully");

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

    }

    catch (error) {

        const message =

            error.response?.data?.message ||

            "Password change failed";

        if (

            message.toLowerCase().includes("current") ||

            message.toLowerCase().includes("invalid")

        ) {

            setCurrentPasswordError(message);

        }

        toast.error(message);

    }

};
return (

    <DashboardLayout>
<Card
    sx={{
        mb: 4,
        borderRadius: 5,
        background: "linear-gradient(135deg,#1976d2,#512DA8)",
        color: "#fff"
    }}
>
    <CardContent>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch"
            }}
        >

            {/* Left */}

            <Box>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    👤 My Profile
                </Typography>

                <Typography
                    mt={1}
                    sx={{
                        opacity: .95
                    }}
                >
                    Manage your personal information and account security.
                </Typography>

                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    <Chip
                        label={profile.role}
                        sx={{
                            bgcolor: "green",
                            color: "#fff",
                            fontWeight: "bold",
                            backdropFilter: "blur(10px)"
                        }}
                    />

                    <Typography
                        variant="body2"
                        sx = {{
                            mr: 18
                        }}
                    >
                        {profile.email}
                    </Typography>

                </Box>

            </Box>

            {/* Right */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 140
                }}
            >

              <Avatar
    sx={{
        width:95,
        height:95,
        bgcolor:"#fff",
        color:"#1976d2",
        fontSize:"2rem",
        fontWeight:"bold",
        border:"4px solid rgba(255,255,255,.25)",
        boxShadow:"0 8px 25px rgba(0,0,0,.25)"
    }}
>

{profile.firstName?.charAt(0)}
{profile.lastName?.charAt(0)}

</Avatar>
            </Box>

        </Box>

    </CardContent>

</Card>
<Box mb={4}>

<Card

sx={{

borderRadius:5,

background:"linear-gradient(135deg,#FCFCFF,#F4F0FF)",

border:"1px solid #90bae4",

boxShadow:"0 8px 24px rgba(103,58,183,.10)",

transition:".35s",

overflow:"hidden",

"&:hover":{

transform:"translateY(-5px)",

boxShadow:"0 18px 35px rgba(103,58,183,.15)"

}

}}

>

<CardContent sx={{p:4}}>

<Box

display="flex"

justifyContent="space-between"

alignItems="center"

mb={1}

>

<Box>

<Typography

variant="h4"

fontWeight="bold"

sx={{

color:"#1565C0",

letterSpacing:.5

}}

>

Personal Information

</Typography>

<Typography

mt={1}

color="text.secondary"

>

View and manage your profile details.

</Typography>

</Box>

<Box

display="flex"

alignItems="center"

columnGap={1}

>

<Button

variant="contained"

startIcon={<EditIcon />}

onClick={()=>setEditOpen(true)}

sx={{

borderRadius:3,

textTransform:"none",

fontWeight:"bold",

px:3,
mr: 2,
mb:1,
height:46,

background:

"linear-gradient(135deg,#1976D2,#1565C0)",

boxShadow:"0 8px 18px rgba(25,118,210,.25)",

"&:hover":{

background:

"linear-gradient(135deg,#1565C0,#0D47A1)"

}

}}

>

Edit Profile

</Button>

<Button

variant="outlined"

startIcon={<LockResetIcon/>}

onClick={()=>setPasswordOpen(true)}

sx={{

borderRadius:3,

textTransform:"none",

fontWeight:"bold",

height:46,

px:3,
mb:1,

}}

>

Change Password

</Button>

</Box>

</Box>

<Divider sx={{mb:2}}/>

<Grid

container

spacing={2}
>
<Grid
    size={{xs:12}}
>

<Card
sx={{

mb:2,

background:"#E8F5E9",

borderRadius:4,

boxShadow:0

}}
>

<CardContent>

<Box

display="flex"

justifyContent="space-between"

alignItems="center"

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
>

Your profile is 100% complete.

</Typography>

</Box>

<Chip

label="Completed"

color="success"

icon={<VerifiedUserIcon/>}

/>

</Box>

</CardContent>

</Card>

</Grid>
{/* First Name */}

<Grid size={{xs:12,md:6}}>

<Paper

elevation={0}

sx={{

p:2.5,

borderRadius:4,

background:"#FFFFFF",

border:"1px solid #EEF2FF",

height:"100%",
transition:".3s",

"&:hover":{

transform:"translateY(-5px)",

boxShadow:"0 12px 25px rgba(0,0,0,.12)"

}


}}

>

<Typography

fontWeight={600}

color="text.secondary"

mb={1}

>

First Name

</Typography>

<Typography

variant="h6"

fontWeight="bold"

>

{profile.firstName}

</Typography>

</Paper>

</Grid>

{/* Last Name */}

<Grid size={{xs:12,md:6}}>

<Paper

elevation={0}

sx={{

p:2.5,

borderRadius:4,

background:"#FFFFFF",

border:"1px solid #EEF2FF",

height:"100%",
transition:".3s",

"&:hover":{

transform:"translateY(-5px)",

boxShadow:"0 12px 25px rgba(0,0,0,.12)"

}

}}

>

<Typography

fontWeight={600}

color="text.secondary"

mb={1}

>

Last Name

</Typography>

<Typography

variant="h6"

fontWeight="bold"

>

{profile.lastName}

</Typography>

</Paper>

</Grid>

{/* Username */}

<Grid size={{xs:12,md:6}}>

<Paper

elevation={0}

sx={{

p:2.5,

borderRadius:4,

background:"#FFFFFF",

border:"1px solid #EEF2FF",

height:"100%", transition:".3s",

"&:hover":{

transform:"translateY(-5px)",

boxShadow:"0 12px 25px rgba(0,0,0,.12)"

}

}}

>

<Typography

fontWeight={600}

color="text.secondary"

mb={1}

>

Username

</Typography>

<Typography

variant="h6"

fontWeight="bold"

>

{profile.username}

</Typography>

</Paper>

</Grid>

{/* Role */}

<Grid size={{xs:12,md:6}}>

<Paper

elevation={0}

sx={{

p:2.5,

borderRadius:4,

background:"#FFFFFF",

border:"1px solid #EEF2FF",

height:"100%",
transition:".3s",

"&:hover":{

transform:"translateY(-5px)",

boxShadow:"0 12px 25px rgba(0,0,0,.12)"

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

label={profile.role}

color="primary"

sx={{

fontWeight:"bold",

px:2,

height:36,

borderRadius:5

}}

/>

</Paper>

</Grid>

{/* Email */}

<Grid size={{xs:12,md:6}}>

<Paper

elevation={0}

sx={{

p:2.5,

borderRadius:4,

background:"#FFFFFF",

border:"1px solid #EEF2FF",

height:"100%",
transition:".3s",

"&:hover":{

transform:"translateY(-5px)",

boxShadow:"0 12px 25px rgba(0,0,0,.12)"

}

}}

>

<Typography

fontWeight={600}

color="text.secondary"

mb={1}

>

Email

</Typography>

<Typography

variant="h6"

fontWeight="bold"

>

{profile.email}

</Typography>

</Paper>

</Grid>

{/* Phone */}

<Grid size={{xs:12,md:6}}>

<Paper

elevation={0}

sx={{

p:2.5,

borderRadius:4,

background:"#FFFFFF",

border:"1px solid #EEF2FF",

height:"100%",
transition:".3s",

"&:hover":{

transform:"translateY(-5px)",

boxShadow:"0 12px 25px rgba(0,0,0,.12)"

}

}}

>

<Typography

fontWeight={600}

color="text.secondary"

mb={1}

>

Phone Number

</Typography>

<Typography

variant="h6"

fontWeight="bold"

>

{profile.phoneNumber}

</Typography>

</Paper>

</Grid>

</Grid>

</CardContent>

</Card>

</Box>
       

    <Dialog
    open={editOpen}
    onClose={handleEditClose}
    fullWidth
    maxWidth="sm"
    PaperProps={{
        sx: {
            borderRadius: 5,
          
        }
    }}
>

    <DialogTitle
        sx={{
            fontWeight: "bold",
            color: "#1565C0",
            mb: 3,
            pb: 1

        }}
    >
        Edit Profile
    </DialogTitle>

    <DialogContent
    dividers={false}
    sx={{
        pt: 2,
        overflow : "visible"
    }}
>

        <Stack spacing={2}>

            <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileChange}
                margin = "normal"
            />

            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileChange}
                margin = "normal"
            />

            <TextField
                fullWidth
                label="Email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                margin= "normal"
            />

            <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={profileForm.phoneNumber}
                onChange={handleProfileChange}
                margin = "normal"
            />

        </Stack>

    </DialogContent>

    <DialogActions
        sx={{
            p: 3
        }}
    >

        <Button

            onClick={handleEditClose}

            variant="outlined"

            sx={{

                borderRadius: 3,

                textTransform: "none",

                px: 3

            }}

        >

            Cancel

        </Button>

        <Button

            variant="contained"

            onClick={handleProfileUpdate}

            sx={{

                borderRadius: 3,

                textTransform: "none",

                px: 3

            }}

        >

            Save Changes

        </Button>

    </DialogActions>

</Dialog> 
<Dialog
    open={passwordOpen}
    onClose={handlePasswordClose}
    fullWidth
    maxWidth="sm"
    PaperProps={{
        sx: {
            borderRadius: 5,
            p: 1
        }
    }}
>

    <DialogTitle
        sx={{
            fontWeight: "bold",
            color: "#1565C0"
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

                value={passwordForm.currentPassword}

                onChange={handlePasswordFormChange}

                error={currentPasswordError !== ""}

                helperText={currentPasswordError}

                slotProps={{

                    input:{

                        endAdornment:(

                            <InputAdornment position="end">

                                <IconButton
                                    onClick={()=>
                                        setShowCurrentPassword(
                                            !showCurrentPassword
                                        )
                                    }
                                >

                                    {
                                        showCurrentPassword
                                        ?

                                        <VisibilityOff/>

                                        :

                                        <Visibility/>
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

                value={passwordForm.newPassword}

                onChange={handlePasswordFormChange}

                slotProps={{

                    input:{

                        endAdornment:(

                            <InputAdornment position="end">

                                <IconButton
                                    onClick={()=>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }
                                >

                                    {
                                        showNewPassword
                                        ?

                                        <VisibilityOff/>

                                        :

                                        <Visibility/>
                                    }

                                </IconButton>

                            </InputAdornment>

                        )

                    }

                }}

            />

            {/* Password Validation */}

            <Stack spacing={0.5}>

                <Typography
                    variant="caption"
                    color={
                        passwordValidation.length
                            ? "success.main"
                            : "error.main"
                    }
                >
                    {passwordValidation.length ? "✔" : "✖"} Minimum 8 characters
                </Typography>

                <Typography
                    variant="caption"
                    color={
                        passwordValidation.uppercase
                            ? "success.main"
                            : "error.main"
                    }
                >
                    {passwordValidation.uppercase ? "✔" : "✖"} One Uppercase Letter
                </Typography>

                <Typography
                    variant="caption"
                    color={
                        passwordValidation.lowercase
                            ? "success.main"
                            : "error.main"
                    }
                >
                    {passwordValidation.lowercase ? "✔" : "✖"} One Lowercase Letter
                </Typography>

                <Typography
                    variant="caption"
                    color={
                        passwordValidation.number
                            ? "success.main"
                            : "error.main"
                    }
                >
                    {passwordValidation.number ? "✔" : "✖"} One Number
                </Typography>

                <Typography
                    variant="caption"
                    color={
                        passwordValidation.special
                            ? "success.main"
                            : "error.main"
                    }
                >
                    {passwordValidation.special ? "✔" : "✖"} One Special Character
                </Typography>

            </Stack>

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

                value={passwordForm.confirmPassword}

                onChange={handlePasswordFormChange}

                error={confirmPasswordError !== ""}

                helperText={confirmPasswordError}

                slotProps={{

                    input:{

                        endAdornment:(

                            <InputAdornment position="end">

                                <IconButton
                                    onClick={()=>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >

                                    {
                                        showConfirmPassword
                                        ?

                                        <VisibilityOff/>

                                        :

                                        <Visibility/>
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
            p:3
        }}
    >

        <Button

            variant="outlined"

            onClick={handlePasswordClose}

            sx={{
                borderRadius:3,
                textTransform:"none",
                px:3
            }}

        >

            Cancel

        </Button>

        <Button

            variant="contained"

            onClick={handlePasswordUpdate}

            sx={{
                borderRadius:3,
                textTransform:"none",
                px:3
            }}

        >

            Change Password

        </Button>

    </DialogActions>

</Dialog>
    </DashboardLayout>

);

}

export default Profile;