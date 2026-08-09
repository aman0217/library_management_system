import { useEffect, useState } from "react";

import { getTopActiveStudents } from "../../services/dashboardService";

import {
    Paper,
    Typography,
    Box,
    Avatar,
    LinearProgress
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

function TopActiveStudents() {

    const [students, setStudents] = useState([]);

    useEffect(() => {

        loadStudents();

    }, []);

    const loadStudents = async () => {

        try {

            const data = await getTopActiveStudents();

            setStudents(data);

        }
        catch (error) {

            console.error(error);

        }

    };

    const maxBorrow =
        students.length > 0
            ? Math.max(
                ...students.map(
                    student => student.borrowCount
                )
            )
            : 1;

    return (

        <Paper
            elevation={0}
            sx={{

                mt: 4,

                p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                },

                borderRadius: 5,

                background:
                    "linear-gradient(145deg,#F8FBFF,#EEF5FF)",

                border: "1px solid #b2d0f8",

                boxShadow:
                    "0 12px 30px rgba(25,118,210,.08)",

                width: "100%",

                overflow: "hidden"

            }}
        >

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
                sx={{
                    fontSize: {
                        xs: "1.25rem",
                        sm: "1.5rem"
                    }
                }}
            >

                👨‍🎓 Top Active Students

            </Typography>


            <Typography
                color="text.secondary"
                mb={{
                    xs: 2.5,
                    sm: 4
                }}
                sx={{
                    fontSize: {
                        xs: "0.875rem",
                        sm: "1rem"
                    }
                }}
            >

                Students with the highest borrowing activity

            </Typography>


            {

                students.map((student, index) => (

                    <Box

                        key={student.userId}

                        sx={{

                            display: "flex",

                            alignItems: {
                                xs: "flex-start",
                                sm: "center"
                            },

                            flexDirection: {
                                xs: "column",
                                sm: "row"
                            },

                            p: {
                                xs: 1.5,
                                sm: 2
                            },

                            mb: 2,

                            borderRadius: 4,

                            transition: ".3s",

                            width: "100%",

                            "&:hover": {

                                bgcolor: "#F5F9FF",

                                transform: "translateX(6px)"

                            }

                        }}

                    >

                        {/* STUDENT AVATAR */}

                        <Avatar

                            sx={{

                                width: {
                                    xs: 46,
                                    sm: 52
                                },

                                height: {
                                    xs: 46,
                                    sm: 52
                                },

                                mr: {
                                    xs: 0,
                                    sm: 2
                                },

                                mb: {
                                    xs: 1.5,
                                    sm: 0
                                },

                                bgcolor: "#2E7D32",

                                flexShrink: 0

                            }}

                        >

                            <PersonIcon />

                        </Avatar>


                        {/* STUDENT INFORMATION */}

                        <Box
                            sx={{

                                flex: 1,

                                minWidth: 0,

                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                }

                            }}
                        >

                            <Typography
                                fontWeight="bold"
                                sx={{

                                    wordBreak: "break-word",

                                    overflowWrap: "anywhere",

                                    fontSize: {
                                        xs: "0.95rem",
                                        sm: "1rem"
                                    }

                                }}
                            >

                                {student.studentName}

                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.3
                                }}
                            >

                                Library Member

                            </Typography>


                            {/* BORROW PROGRESS */}

                            <LinearProgress

                                variant="determinate"

                                value={
                                    (
                                        student.borrowCount /
                                        maxBorrow
                                    ) * 100
                                }

                                sx={{

                                    mt: 1,

                                    height: 8,

                                    borderRadius: 10,

                                    bgcolor: "#E8F5E9",

                                    "& .MuiLinearProgress-bar": {

                                        borderRadius: 10,

                                        background:
                                            "linear-gradient(90deg,#2E7D32,#66BB6A)"

                                    }

                                }}

                            />

                        </Box>


                        {/* RANK + BORROW COUNT */}

                        <Box

                            sx={{

                                ml: {
                                    xs: 0,
                                    sm: 3
                                },

                                mt: {
                                    xs: 1.5,
                                    sm: 0
                                },

                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                },

                                textAlign: "center",

                                display: {
                                    xs: "flex",
                                    sm: "block"
                                },

                                alignItems: "center",

                                justifyContent: {
                                    xs: "space-between",
                                    sm: "center"
                                },

                                flexShrink: 0

                            }}

                        >

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                color="#2E7D32"
                                sx={{
                                    fontSize: {
                                        xs: "1.2rem",
                                        sm: "1.5rem"
                                    }
                                }}
                            >

                                #{index + 1}

                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    fontSize: {
                                        xs: "0.8rem",
                                        sm: "0.875rem"
                                    }
                                }}
                            >

                                {student.borrowCount} Books

                            </Typography>

                        </Box>

                    </Box>

                ))

            }

        </Paper>

    );

}

export default TopActiveStudents;