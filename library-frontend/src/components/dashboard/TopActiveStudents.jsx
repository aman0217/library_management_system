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
            ? Math.max(...students.map(student => student.borrowCount))
            : 1;

    return (

        <Paper
            elevation={0}
            sx={{

                mt:4,

                p:4,

                borderRadius:5,

                background:
                    "linear-gradient(145deg,#F8FBFF,#EEF5FF)",

                border:"1px solid #b2d0f8",

                boxShadow:
                    "0 12px 30px rgba(25,118,210,.08)"

            }}
        >

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
            >

                👨‍🎓 Top Active Students

            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >

                Students with the highest borrowing activity

            </Typography>

            {

                students.map((student,index)=>(

                    <Box

                        key={student.userId}

                        sx={{

                            display:"flex",

                            alignItems:"center",

                            p:2,

                            mb:2,

                            borderRadius:4,

                            transition:".3s",

                            "&:hover":{

                                bgcolor:"#F5F9FF",

                                transform:"translateX(6px)"

                            }

                        }}

                    >

                        <Avatar

                            sx={{

                                width:52,

                                height:52,

                                mr:2,

                                bgcolor:"#2E7D32"

                            }}

                        >

                            <PersonIcon/>

                        </Avatar>

                        <Box sx={{flex:1}}>

                            <Typography
                                fontWeight="bold"
                            >

                                {student.studentName}

                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >

                                Library Member

                            </Typography>

                            <LinearProgress

                                variant="determinate"

                                value={
                                    (student.borrowCount/maxBorrow)*100
                                }

                                sx={{

                                    mt:1,

                                    height:8,

                                    borderRadius:10,

                                    bgcolor:"#E8F5E9",

                                    "& .MuiLinearProgress-bar":{

                                        borderRadius:10,

                                        background:
                                            "linear-gradient(90deg,#2E7D32,#66BB6A)"

                                    }

                                }}

                            />

                        </Box>

                        <Box
                            sx={{
                                ml:3,
                                textAlign:"center"
                            }}
                        >

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                color="#2E7D32"
                            >

                                #{index+1}

                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
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