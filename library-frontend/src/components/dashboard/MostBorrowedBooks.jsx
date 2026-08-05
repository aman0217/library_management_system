import { useEffect, useState } from "react";

import {
    getMostBorrowedBooks
} from "../../services/dashboardService";

import {

    Paper,
    Typography,
    Box,
    Avatar,
    LinearProgress

} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";

function MostBorrowedBooks() {

    const [books, setBooks] = useState([]);

    useEffect(() => {

        loadBooks();

    }, []);

    const loadBooks = async () => {

        try {

            const data = await getMostBorrowedBooks();

            setBooks(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const maxBorrow =
        books.length > 0
            ? Math.max(...books.map(book => book.borrowCount))
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

                📚 Most Borrowed Books

            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >

                Top performing books in your library

            </Typography>

            {

                books.map((book,index)=>(

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

                                bgcolor:"#F5F9FF",

                                transform:"translateX(6px)"

                            }

                        }}

                    >

                        <Avatar

                            sx={{

                                bgcolor:"#1976D2",

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

                            <LinearProgress

                                variant="determinate"

                                value={
                                    (book.borrowCount/maxBorrow)*100
                                }

                                sx={{

                                    mt:1,

                                    height:8,

                                    borderRadius:10,

                                    bgcolor:"#E3F2FD",

                                    "& .MuiLinearProgress-bar":{

                                        borderRadius:10,

                                        background:
                                            "linear-gradient(90deg,#1976D2,#42A5F5)"

                                    }

                                }}

                            />

                        </Box>

                        <Box
                            sx={{
                                textAlign:"center",
                                ml:3
                            }}
                        >

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                color="#1976D2"
                            >

                                #{index+1}

                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >

                                {book.borrowCount} Times

                            </Typography>

                        </Box>

                    </Box>

                ))

            }

        </Paper>

    );

}

export default MostBorrowedBooks;