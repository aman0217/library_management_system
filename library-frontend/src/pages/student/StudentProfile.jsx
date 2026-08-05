import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { updateProfile } from "../../services/userService";
import EditIcon from "@mui/icons-material/Edit";
import { changePassword } from "../../services/userService";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LockResetIcon from "@mui/icons-material/LockReset";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StudentDashboardLayout from "../../components/layout/StudentDashboardLayout";

import {

    Box,

    Card,

    CardContent,

    Typography,

    Avatar,

    CircularProgress

} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { getCurrentUser } from "../../services/userService";

import { toast } from "react-toastify";

function StudentProfile() {

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
const [passwordForm, setPasswordForm] = useState({

    currentPassword: "",

    newPassword: "",

    confirmPassword: ""

});

const [showCurrentPassword, setShowCurrentPassword] = useState(false);

const [showNewPassword, setShowNewPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [passwordOpen, setPasswordOpen] = useState(false);
const [profileForm, setProfileForm] = useState({

    firstName: "",

    lastName: "",

    email: "",

    phoneNumber: ""

});

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getCurrentUser();

            setProfile(data);
            setProfileForm({

    firstName: data.firstName,

    lastName: data.lastName,

    email: data.email,

    phoneNumber: data.phoneNumber

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
    const handleProfileChange = (e) => {

    const { name, value } = e.target;

    setProfileForm(prev => ({

        ...prev,

        [name]: value

    }));

};
const handlePasswordChange = (e) => {

    const { name, value } = e.target;

    setPasswordForm(prev => ({

        ...prev,

        [name]: value

    }));

};
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

    setShowCurrentPassword(false);

    setShowNewPassword(false);

    setShowConfirmPassword(false);

};
const handlePasswordUpdate = async () => {
    const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,100}$/;

if (!passwordRegex.test(passwordForm.newPassword)) {

    toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
    );

    return;

}

    if (
        passwordForm.newPassword !==
        passwordForm.confirmPassword
    ) {

        toast.error(
            "New password and Confirm password do not match."
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
const handleProfileUpdate = async () => {

    try {

        const updatedUser = await updateProfile(profileForm);

        setProfile(updatedUser);

        setProfileForm({

            firstName: updatedUser.firstName,

            lastName: updatedUser.lastName,

            email: updatedUser.email,

            phoneNumber: updatedUser.phoneNumber

        });

        toast.success("Profile updated successfully");

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

    if (loading) {

        return (

            <StudentDashboardLayout>

                <Box

                    sx={{

                        display: "flex",

                        justifyContent: "center",

                        mt: 10

                    }}

                >

                    <CircularProgress />

                </Box>

            </StudentDashboardLayout>

        );

    }

    return (

        <StudentDashboardLayout>

            <Card

                sx={{

                    borderRadius: 5,

                    background:

                        "linear-gradient(135deg,#1976d2,#512DA8)",

                    color: "#fff",

                    mb: 4

                }}

            >

                <CardContent>

<Box
sx={{
display:"flex",
justifyContent:"space-between",
alignItems:"stretch",
width:"100%"
}}
>

                        <Box>

                            <Typography

                                variant="h4"

                                fontWeight="bold"

                            >

                                👤 My Profile

                            </Typography>

                            <Typography mt={1}>

                                Manage your personal information.

                            </Typography>

                        </Box>

<Box
sx={{
display:"flex",
justifyContent:"flex-end",
alignItems:"center",
flexShrink:0,
ml:3
}}
>
<Avatar

sx={{

width:90,

height:90,

bgcolor:"#fff",

color:"#1976d2",
mr: 5

}}

>

<PersonIcon

sx={{

fontSize:55

}}

/>

</Avatar>

</Box>

                    </Box>

                </CardContent>

            </Card>
 <Box mb={4}>

<Card
sx={{
borderRadius:5,

background:
"linear-gradient(135deg,#FCFCFF,#F4F0FF)",

border:"1px solid #E7DDFE",

boxShadow:"0 8px 24px rgba(103,58,183,.10)",

transition:".35s",

"&:hover":{

transform:"translateY(-4px)",

boxShadow:"0 16px 32px rgba(103,58,183,.15)"

}

}}
>

<CardContent>

<Box
display="flex"
justifyContent="space-between"
alignItems="center"
mb={3}
>

<Typography
variant="h5"
fontWeight="bold"
sx={{
color:"#1565C0",
letterSpacing:.5
}}
>

Personal Information

</Typography>
<Box
sx={{
display: "flex",
alignItems: "center",
columnGap: 2
}}
>

<Button

variant="contained"

startIcon={<EditIcon />}

onClick={() => setEditOpen(true)}

>

Edit Profile

</Button>

<Button

variant="outlined"

startIcon={<LockResetIcon />}

onClick={() => setPasswordOpen(true)}

>

Change Password

</Button>

</Box>

</Box>

<Grid
container
spacing={3}
>

<Grid size={{xs:12,md:6}}>

<Typography
sx={{
fontSize:"0.95rem",
fontWeight:600,
color:"text.secondary",
mb:.8,
display:"block"
}}
>

First Name

</Typography>

<Typography
    variant="h6"
    fontWeight="bold"
    sx={{
        mt: .5,
        fontSize: {
            xs: "1.1rem",
            md: "1.3rem"
        }
    }}
>

{profile.firstName}

</Typography>

</Grid>

<Grid size={{xs:12,md:6}}>

<Typography
sx={{
fontSize:"0.95rem",
fontWeight:600,
color:"text.secondary",
mb:.8,
display:"block"
}}
>

Last Name

</Typography>

<Typography
    variant="h6"
    fontWeight="bold"
    sx={{
        mt: .5,
        fontSize: {
            xs: "1.1rem",
            md: "1.3rem"
        }
    }}
>

{profile.lastName}

</Typography>

</Grid>

<Grid size={{xs:12,md:6}}>

<Typography
sx={{
fontSize:"0.95rem",
fontWeight:600,
color:"text.secondary",
mb:.8,
display:"block"
}}
>

Username

</Typography>

<Typography
    variant="h6"
    fontWeight="bold"
    sx={{
        mt: .5,
        fontSize: {
            xs: "1.1rem",
            md: "1.3rem"
        }
    }}
>

{profile.username}

</Typography>

</Grid>

<Grid size={{xs:12,md:6}}>

<Box>

<Typography
sx={{
fontSize:"0.95rem",
fontWeight:600,
color:"text.secondary"
}}
>

Role

</Typography>

<Box mt={1.5}>

<Chip

label={profile.role}

color="primary"

sx={{
fontWeight:"bold",
px:1,
height:34
}}

/>

</Box>

</Box>
</Grid>

<Grid size={{xs:12,md:6}}>

<Typography
sx={{
fontSize:"0.95rem",
fontWeight:600,
color:"text.secondary",
mb:.8,
display:"block"
}}
>

Email

</Typography>

<Typography
    variant="h6"
    fontWeight="bold"
    sx={{
        mt: .5,
        fontSize: {
            xs: "1.1rem",
            md: "1.3rem"
        }
    }}
>

{profile.email}

</Typography>

</Grid>

<Grid size={{xs:12,md:6}}>

<Typography
sx={{
fontSize:"0.95rem",
fontWeight:600,
color:"text.secondary",
mb:.8,
display:"block"
}}
>

Phone Number

</Typography>

<Typography
    variant="h6"
    fontWeight="bold"
    sx={{
        mt: .5,
        fontSize: {
            xs: "1.1rem",
            md: "1.3rem"
        }
    }}
>

{profile.phoneNumber}

</Typography>

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

            background:
                "linear-gradient(135deg,#FCFCFF,#F4F0FF)",

            border: "1px solid #E7DDFE",

            boxShadow: "0 8px 24px rgba(103,58,183,.10)",

            transition: ".35s",

            "&:hover": {

                transform: "translateY(-4px)",

                boxShadow: "0 16px 32px rgba(103,58,183,.15)"

            }

        }
    }}
>

<DialogTitle>

Edit Profile

</DialogTitle>

<DialogContent>

<Box mt={1}>

<TextField

fullWidth

label="First Name"

name="firstName"

value={profileForm.firstName}

onChange={handleProfileChange}

margin="normal"

/>

<TextField

fullWidth

label="Last Name"

name="lastName"

value={profileForm.lastName}

onChange={handleProfileChange}

margin="normal"

/>

<TextField

fullWidth

label="Email"

name="email"

value={profileForm.email}

onChange={handleProfileChange}

margin="normal"

/>

<TextField

fullWidth

label="Phone Number"

name="phoneNumber"

value={profileForm.phoneNumber}

onChange={handleProfileChange}

margin="normal"

/>

</Box>

</DialogContent>

<DialogActions>

<Button
onClick={handleEditClose}
variant="outlined"
sx={{

color:"#EF6C00",

borderColor:"#EF6C00",

fontWeight:"bold",

borderRadius:3,

px:3,

"&:hover":{

borderColor:"#E65100",

background:"#FFF3E0"

}

}}
>

Cancel

</Button>

<Button
variant="contained"
onClick={handleProfileUpdate}
sx={{

background:"#FB8C00",

fontWeight:"bold",

borderRadius:3,

px:3,

"&:hover":{

background:"#EF6C00"

}

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

            background:
                "linear-gradient(135deg,#FCFCFF,#F4F0FF)",

            border: "1px solid #E7DDFE",

            boxShadow: "0 8px 24px rgba(103,58,183,.10)",

            transition: ".35s",

            "&:hover": {

                transform: "translateY(-4px)",

                boxShadow: "0 16px 32px rgba(103,58,183,.15)"

            }

        }
    }}
>

<DialogTitle>

Change Password

</DialogTitle>

<DialogContent>

<Box mt={1}>

<TextField

    fullWidth
    margin="normal"
    label="Current Password"
    name="currentPassword"
    type={showCurrentPassword ? "text" : "password"}
    value={passwordForm.currentPassword}
    onChange={handlePasswordChange}
    slotProps={{
    input: {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    onClick={() =>
                        setShowCurrentPassword(
                            !showCurrentPassword
                        )
                    }
                >
                    {showCurrentPassword
                        ? <VisibilityOff />
                        : <Visibility />}
                </IconButton>
            </InputAdornment>
        )
    }
}}
/>

<TextField
    fullWidth
    margin="normal"
    label="New Password"
    name="newPassword"
    type={showNewPassword ? "text" : "password"}
    value={passwordForm.newPassword}
    onChange={handlePasswordChange}
    helperText="Must be 8+ characters with uppercase, lowercase, number and special character."
    slotProps={{
    input: {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    onClick={() =>
                        setShowNewPassword(
                            !showNewPassword
                        )
                    }
                >
                    {showNewPassword
                        ? <VisibilityOff />
                        : <Visibility />}
                </IconButton>
            </InputAdornment>
        )
    }
}}
/>
<TextField
    fullWidth
    margin="normal"
    label="Confirm Password"
    name="confirmPassword"
    type={showConfirmPassword ? "text" : "password"}
    value={passwordForm.confirmPassword}
    onChange={handlePasswordChange}
    slotProps={{
    input: {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    onClick={() =>
                        setShowConfirmPassword(
                            !showConfirmPassword
                        )
                    }
                >
                    {showConfirmPassword
                        ? <VisibilityOff />
                        : <Visibility />}
                </IconButton>
            </InputAdornment>
        )
    }
}}
/>
</Box>

</DialogContent>

<DialogActions>

<Button
onClick={handlePasswordClose}
variant="outlined"
sx={{

color:"#EF6C00",

borderColor:"#EF6C00",

fontWeight:"bold",

borderRadius:3,

px:3,

"&:hover":{

borderColor:"#E65100",

background:"#FFF3E0"

}

}}
>

Cancel

</Button>

<Button
variant="contained"
onClick={handlePasswordUpdate}
sx={{

background:"#FB8C00",

fontWeight:"bold",

borderRadius:3,

px:3,

"&:hover":{

background:"#EF6C00"

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