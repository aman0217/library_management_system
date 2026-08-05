import { useEffect, useState } from "react";

import { getNeverBorrowedBooks } from "../../services/dashboardService";

import {
    Paper,
    Typography,
    Box,
    Avatar,
    Chip
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function NeverBorrowedBooks() {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        loadBooks();

    }, []);

    const loadBooks = async () => {

        try {

            const data = await getNeverBorrowedBooks();

            setBooks(data);

        }

        catch (error) {

            console.error(error);

        }

    };

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
                    "0 12px 30px rgba(255,152,0,.08)"

            }}
        >

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
            >

                ⚠ Never Borrowed Books

            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >

                Books that have never been issued

            </Typography>

            {

                books.length === 0 ?

                (

                    <Box
                        sx={{
                            textAlign:"center",
                            py:5
                        }}
                    >

                        <Typography
                            color="success.main"
                            fontWeight="bold"
                        >

                            🎉 Great!

                        </Typography>

                        <Typography
                            color="text.secondary"
                        >

                            Every book has been borrowed at least once.

                        </Typography>

                    </Box>

                )

                :

                books.map((book)=>(

                    <Box

                        key={book.bookId}

                        sx={{

                            display:"flex",

                            alignItems:"center",

                            p:2,

                            mb:2,

                            borderRadius:4,

                            transition:".3s",

                            "&:hover":{

                            

                                transform:"translateX(6px)"

                            }

                        }}

                    >

                        <Avatar

                            sx={{

                                bgcolor:"#FB8C00",

                                mr:2,

                                width:52,

                                height:52

                            }}

                        >

                            <MenuBookIcon/>

                        </Avatar>

                        <Box sx={{flex:1}}>

                            <Typography
                                fontWeight="bold"
                            >

                                {book.title}

                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >

                                {book.author}

                            </Typography>

                        </Box>

                    <Chip
    icon={<WarningAmberIcon />}
    label={book.category}
    sx={{
        width: 150,
        justifyContent: "center",
        fontWeight: "bold",
        bgcolor: "#FFF4E5",
        color: "#ED6C02",
        border: "1px solid #FFCC80",

        "& .MuiChip-label": {
            width: "100%",
            textAlign: "center"
        },

        "& .MuiChip-icon": {
            color: "#ED6C02"
        }
    }}
/>

                    </Box>

                ))

            }

        </Paper>

    );

}

export default NeverBorrowedBooks;