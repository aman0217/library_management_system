import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import PaidRoundedIcon from "@mui/icons-material/Paid";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import autoTable from "jspdf-autotable";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getReports } from "../../services/reportService";
import * as XLSX from "xlsx";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

function Reports() {

    const [reports, setReports] = useState([]);

    const [search, setSearch] = useState("");
    const [reportFilter, setReportFilter] = useState("ALL");
    const [fromDate, setFromDate] = useState(null);

const [toDate, setToDate] = useState(null);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const data = await getReports();

            setReports(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Library Report", 14, 20);

    autoTable(doc, {

        startY: 30,

        head: [[
            "Student",
            "Book",
            "Issue Date",
            "Due Date",
            "Return Date",
            "Late Days",
            "Fine",
            "Status"
        ]],

        body: filteredReports.map((item) => [

            item.studentName,
            item.bookTitle,
            item.issueDate,
            item.dueDate,
            item.returnDate || "-",
            item.lateDays,
            item.fineAmount,
            item.returned ? "Returned" : "Borrowed"

        ])

    });

    doc.save("Library_Report.pdf");

};

const exportExcel = () => {

    const data = filteredReports.map((item) => ({

        Student: item.studentName,

        Book: item.bookTitle,

        IssueDate: item.issueDate,

        DueDate: item.dueDate,

        ReturnDate: item.returnDate || "-",

        LateDays: item.lateDays,

        Fine: item.fineAmount,

        Status: item.returned ? "Returned" : "Borrowed"

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Library Report"
    );

    XLSX.writeFile(
        workbook,
        "Library_Report.xlsx"
    );

};
const printReport = () => {

    window.print();

};
const filteredReports = useMemo(() => {

    return reports.filter((item) => {

        const keyword = search.toLowerCase();

        const matchesSearch =

            item.studentName.toLowerCase().includes(keyword) ||

            item.bookTitle.toLowerCase().includes(keyword);

        const issueDate = new Date(item.issueDate);

        const matchesFrom =
            !fromDate ||
            issueDate >= fromDate.toDate();

        const matchesTo =
            !toDate ||
            issueDate <= toDate.toDate();

        let matchesStatus = true;

        if (reportFilter === "BORROWED") {

            matchesStatus = !item.returned;

        }

        else if (reportFilter === "RETURNED") {

            matchesStatus = item.returned;

        }

        else if (reportFilter === "FINE") {

            matchesStatus = item.fineAmount > 0;

        }


        return (

            matchesSearch &&

            matchesFrom &&

            matchesTo &&

            matchesStatus

        );

    });

}, [reports, search, fromDate, toDate, reportFilter]);

const stats = {

    totalReports: filteredReports.length,

    borrowed: filteredReports.filter(
        item => !item.returned
    ).length,

    returned: filteredReports.filter(
        item => item.returned
    ).length,

    totalFine: filteredReports.reduce(

        (sum, item) => sum + (item.fineAmount || 0),

        0

    )

};

    const columns = [

        {
            field: "issueId",
            headerName: "ID",
            width: 80
        },

        {
            field: "studentName",
            headerName: "Student",
            flex: 1
        },

        {
            field: "bookTitle",
            headerName: "Book",
            flex: 1
        },

        {
            field: "issueDate",
            headerName: "Issue Date",
            width: 120
        },

        {
            field: "dueDate",
            headerName: "Due Date",
            width: 120
        },

        {
            field: "returnDate",
            headerName: "Return Date",
            width: 120,

            valueGetter: (value) => value || "-"
        },

        {
            field: "lateDays",
            headerName: "Late Days",
            width: 120
        },

        {
    field: "fineAmount",

    headerName: "Fine",

    width: 130,

    sortable: false,

    align: "center",

    headerAlign: "center",

    renderCell: (params) => (

        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}
        >

            <Chip

                label={`₹${params.row.fineAmount}`}

                size="small"

                sx={{

                    minWidth: 75,

                    fontWeight: "bold",

                    borderRadius: 5,

                    bgcolor:

                        params.row.fineAmount > 0

                            ? "#FFEBEE"

                            : "#E8F5E9",

                    color:

                        params.row.fineAmount > 0

                            ? "#D32F2F"

                            : "#2E7D32"

                }}

            />

        </Box>

    )

},

        {
    field: "returned",

    headerName: "Status",

    width: 150,

    sortable: false,

    align: "center",

    headerAlign: "center",

    renderCell: (params) => (

        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}
        >

            <Chip

                label={
                    params.row.returned
                        ? "Returned"
                        : "Borrowed"
                }

                color={
                    params.row.returned
                        ? "success"
                        : "warning"
                }

                size="small"

                sx={{

                    fontWeight: "bold",

                    minWidth: 90,

                    borderRadius: 5

                }}

            />

        </Box>

    )

}

    ];
    const borrowChart = [

    {

        name: "Borrowed",

        count: stats.borrowed

    },

    {

        name: "Returned",

        count: stats.returned

    }

];

const fineChart = [

    {

        name: "No Fine",

        value:

            stats.totalReports -

            reports.filter(

                r => r.fineAmount > 0

            ).length

    },

    {

        name: "Fine",

        value:

            reports.filter(

                r => r.fineAmount > 0

            ).length

    }

];
const CustomTooltip = ({ active, payload }) => {

    if (active && payload && payload.length) {

        return (

            <Paper
                sx={{
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >

                <Typography
                    fontWeight="bold"
                >
                    {payload[0].name}
                </Typography>

                <Typography>

                    Value : {payload[0].value}

                </Typography>

            </Paper>

        );

    }

    return null;

};

    return (

        <DashboardLayout>

           <Card
    sx={{
        mb: 4,
        borderRadius: 5,
        background:
            "linear-gradient(135deg,#1565C0,#512DA8)",
        color: "#fff"
    }}
>

    <CardContent>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <Box>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    📊 Reports & Analytics
                </Typography>

                <Typography
                    mt={1}
                    sx={{
                        opacity: .95
                    }}
                >
                    Analyze borrowing activity, fines, returns and generate reports.
                </Typography>

            </Box>

            <Avatar
                sx={{
                    width: 90,
                    height: 90,
                    mr: 5,
                    bgcolor: "#fff",
                    color: "#1565C0",
                    border:
                        "4px solid rgba(255,255,255,.25)"
                }}
            >

                <AssessmentRoundedIcon
                    sx={{
                        fontSize: 55
                    }}
                />

            </Avatar>

        </Box>

    </CardContent>

</Card>
<Grid
    container
    spacing={3}
    sx={{ mb: 4 }}
>

    <Grid size={{ xs: 12, md: 3 }}>

        <Card
        onClick={() => setReportFilter("ALL")}
            sx={{
                borderRadius: 4,
                color: "#fff",
                cursor:"pointer",
                background:

reportFilter==="ALL"

?

"linear-gradient(135deg,#1565C0,#42A5F5)"

:

"linear-gradient(135deg,#1976D2,#42A5F5)",

                transition: ".3s",

                "&:hover": {

                    transform: "translateY(-6px)",

                    boxShadow:
                        "0 18px 35px rgba(25,118,210,.25)"

                }

            }}
        >

            <CardContent>

                <MenuBookRoundedIcon
                    sx={{
                        fontSize: 40
                    }}
                />

                <Typography mt={2}>
                    Total Reports
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    {stats.totalReports}
                </Typography>

            </CardContent>

        </Card>

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <Card
        onClick={() => setReportFilter("BORROWED")}
            sx={{
                borderRadius: 4,
                color: "#fff",
                 cursor:"pointer",
               background:

reportFilter === "BORROWED"

    ?

"linear-gradient(135deg,#E65100,#FB8C00)"

    :

"linear-gradient(135deg,#EF6C00,#FFA726)",

                transition: ".3s",

                "&:hover": {

                    transform: "translateY(-6px)",

                    boxShadow:
                        "0 18px 35px rgba(239,108,0,.25)"

                }

            }}
        >

            <CardContent>

                <AutorenewRoundedIcon
                    sx={{
                        fontSize: 40
                    }}
                />

                <Typography mt={2}>
                    Borrowed
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    {stats.borrowed}
                </Typography>

            </CardContent>

        </Card>

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <Card
        onClick={() => setReportFilter("RETURNED")}
            sx={{
                borderRadius: 4,
                 cursor:"pointer",
                color: "#fff",

                background:

reportFilter === "RETURNED"

    ?

"linear-gradient(135deg,#1B5E20,#43A047)"

    :

"linear-gradient(135deg,#2E7D32,#66BB6A)",

                transition: ".3s",

                "&:hover": {

                    transform: "translateY(-6px)",

                    boxShadow:
                        "0 18px 35px rgba(46,125,50,.25)"

                }

            }}
        >

            <CardContent>

                <TaskAltRoundedIcon
                    sx={{
                        fontSize: 40
                    }}
                />

                <Typography mt={2}>
                    Returned
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    {stats.returned}
                </Typography>

            </CardContent>

        </Card>

    </Grid>

    <Grid size={{ xs: 12, md: 3 }}>

        <Card
        onClick={() => setReportFilter("FINE")}
            sx={{
                borderRadius: 4,
                 cursor:"pointer",
                color: "#fff",

background:

reportFilter === "FINE"

    ?

"linear-gradient(135deg,#4A148C,#8E24AA)"

    :

"linear-gradient(135deg,#6A1B9A,#AB47BC)",

                transition: ".3s",

                "&:hover": {

                    transform: "translateY(-6px)",

                    boxShadow:
                        "0 18px 35px rgba(106,27,154,.25)"

                }

            }}
        >

            <CardContent>

                <PaidRoundedIcon
                    sx={{
                        fontSize: 40
                    }}
                />

                <Typography mt={2}>
                    Total Fine
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    ₹{stats.totalFine}
                </Typography>

            </CardContent>

        </Card>

    </Grid>


</Grid>


         <Paper
    elevation={0}
    sx={{
        p:3,
        mb:4,

        borderRadius:5,

        background:
            "linear-gradient(135deg,#FCFCFF,#F7F4FF)",

        border:"1px solid #8bb8d8",

        boxShadow:
            "0 10px 25px rgba(103,58,183,.08)"
    }}
>

               <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    flexWrap="wrap"
    useFlexGap
    sx={{
        width: "100%",
        overflow: "visible"
    }}
>

<TextField
    fullWidth

    label="Search Reports"

    placeholder="Student or Book Name"

    value={search}

    onChange={(e)=>setSearch(e.target.value)}

    InputProps={{

        startAdornment:(

            <InputAdornment position="start">

                <SearchRoundedIcon
                    color="primary"
                />

            </InputAdornment>

        )

    }}

    sx={{

        flexGrow:1,

        minWidth:280,

        "& .MuiOutlinedInput-root":{

            borderRadius:4,

            background:"#fff"

        }

    }}
/>
<LocalizationProvider dateAdapter={AdapterDayjs}>

    <Box
        sx={{
            display: "flex",
            gap: 2
        }}
    >

        <DatePicker
            label="From"
            value={fromDate}
            onChange={(value) => setFromDate(value)}
            format="DD/MM/YYYY"
            slotProps={{
                textField: {
                    size: "small",
                    sx: {
                        width: 170,

                        "& .MuiOutlinedInput-root": {
                            borderRadius: 4,
                            background: "#fff",
                            transition: ".3s",

                            "&:hover": {
                                boxShadow:
                                    "0 8px 20px rgba(25,118,210,.10)"
                            }
                        },

                        "& .MuiInputLabel-root": {
    fontWeight: 600,
    backgroundColor: "#fff",
    px: 0.75,
    zIndex: 1
},

"& .MuiOutlinedInput-notchedOutline legend": {
    maxWidth: "1000px"
}
                    }
                }
            }}
        />

        <DatePicker
            label="To"
            value={toDate}
            onChange={(value) => setToDate(value)}
            format="DD/MM/YYYY"
            slotProps={{
                textField: {
                    size: "small",
                    sx: {
                        width: 170,

                        "& .MuiOutlinedInput-root": {
                            borderRadius: 4,
                            background: "#fff",
                            transition: ".3s",

                            "&:hover": {
                                boxShadow:
                                    "0 8px 20px rgba(25,118,210,.10)"
                            }
                        },

                        "& .MuiInputLabel-root": {
    fontWeight: 600,
    backgroundColor: "#fff",
    px: 0.75,
    zIndex: 1
},

"& .MuiOutlinedInput-notchedOutline legend": {
    maxWidth: "1000px"
}
                    }
                }
            }}
        />

    </Box>

</LocalizationProvider>
   <Button
    variant="contained"

    startIcon={<PictureAsPdfRoundedIcon/>}

    onClick={exportPDF}

    sx={{

        height:48,

        px:3,

        borderRadius:3,

        textTransform:"none",

        fontWeight:"bold",

        background:
            "linear-gradient(135deg,#E53935,#F44336)",

        "&:hover":{

            background:
                "linear-gradient(135deg,#C62828,#E53935)"
                
        },
        transition: ".3s",

"&:hover": {

    transform: "translateY(-3px)"

}


    }}
>

    Export PDF

</Button>

<Button
    variant="contained"

    startIcon={<TableViewRoundedIcon/>}

    onClick={exportExcel}

    sx={{

        height:48,

        px:3,

        borderRadius:3,

        textTransform:"none",

        fontWeight:"bold",

        background:
            "linear-gradient(135deg,#2E7D32,#43A047)",

        "&:hover":{

            background:
                "linear-gradient(135deg,#1B5E20,#2E7D32)"

        },
        transition: ".3s",

"&:hover": {

    transform: "translateY(-3px)"

}

    }}
>

    Export Excel

</Button>

<Button
    variant="contained"
    startIcon={<PrintIcon />}
    onClick={printReport}
    sx={{
        height: 48,
        px: 3,
        borderRadius: 3,
        textTransform: "none",
        fontWeight: "bold",

        color: "#1565C0",

        background:
            "linear-gradient(135deg,#E3F2FD,#BBDEFB)",

        boxShadow:
            "0 6px 18px rgba(25,118,210,.15)",

        "&:hover": {
            background:
                "linear-gradient(135deg,#BBDEFB,#90CAF9)"
        },
        transition: ".3s",

"&:hover": {

    transform: "translateY(-3px)"

}
    }}
>
    Print
</Button>

</Stack>

            </Paper>
           
          <Paper
    sx={{
        p: 2,
        borderRadius: 3,
    
         background:
            "linear-gradient(135deg,#FCFCFF,#F7F4FF)",

        border:"1px solid #92cee0",

        boxShadow:
            "0 10px 25px rgba(103,58,183,.08)"
    }}
>

    {

        filteredReports.length === 0 ?

        (

            <Paper

                elevation={0}

                sx={{

                    height: 500,

                    display: "flex",

                    flexDirection: "column",

                    justifyContent: "center",

                    alignItems: "center",

                    borderRadius: 4,

                    background: "#FAFBFF"

                }}

            >

                <Typography

                    variant="h5"

                    fontWeight="bold"

                >

                    No Reports Found

                </Typography>

                <Typography

                    color="text.secondary"

                    mt={1}

                >

                    Try changing search or date filters.

                </Typography>

            </Paper>

        )

        :

        (

            <Box
                sx={{
                    height: 600
                }}
            >

                <DataGrid

                    rows={filteredReports}

                    columns={columns}

                    getRowId={(row) => row.issueId}

                    disableRowSelectionOnClick

                    pageSizeOptions={[10,25,50]}

                    initialState={{

                        pagination:{

                            paginationModel:{

                                pageSize:10,

                                page:0

                            }

                        }

                    }}

                    sx={{

                        border:"none",

                        "& .MuiDataGrid-columnHeaders":{

                            background:"#1976D2",

                            color:"#fff",

                            borderRadius:"10px 10px 0 0"

                        },

                        "& .MuiDataGrid-columnHeader":{

                            background:"#1976D2"

                        },

                        "& .MuiDataGrid-columnHeaderTitle":{

                            color:"#fff",

                            fontWeight:700

                        },

                        "& .MuiDataGrid-columnSeparator":{

                            display:"none"

                        },

                        "& .MuiDataGrid-menuIcon":{

                            display:"none"

                        },

                        "& .MuiDataGrid-sortIcon":{

                            display:"none"

                        },

                        "& .MuiDataGrid-row:nth-of-type(even)":{

                            background:"#FAFBFF"

                        },

                        "& .MuiDataGrid-row:hover":{

                            background:"#EEF4FF"

                        }

                    }}

                />

            </Box>

        )

    }

</Paper>
<Grid
    container
    spacing={3}
    sx={{ mb: 4, mt: 4 }}
>

    <Grid size={{ xs: 12, md: 6 }}>

        <Paper
            sx={{
                   background:
            "linear-gradient(135deg,#FCFCFF,#F7F4FF)",

        border:"1px solid #92cee0",

        boxShadow:
            "0 10px 25px rgba(103,58,183,.08)",
                p: 3,
    borderRadius: 5,
    height: 360,
    transition: ".35s",

    "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 18px 40px rgba(0,0,0,.12)"
    }
            }}
        >

           <Typography
    variant="h6"
    fontWeight="bold"
    color="primary"
    mb={2}
>

                Borrow Overview

            </Typography>

            <ResponsiveContainer
    width="100%"
    height={280}
>

    <BarChart
        data={borrowChart}
    >

        <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
        />

        <XAxis
            dataKey="name"
        />

        <YAxis
            allowDecimals={false}
        />

        <Tooltip content={<CustomTooltip />} />

        <Bar
            dataKey="count"
            radius={[8,8,0,0]}
            animationDuration={1200}
        >

            <Cell fill="#FB8C00" />

            <Cell fill="#43A047" />

        </Bar>

    </BarChart>

</ResponsiveContainer>

        </Paper>

    </Grid>

    <Grid size={{ xs: 12, md: 6 }}>

        <Paper
            sx={{
                   background:
            "linear-gradient(135deg,#FCFCFF,#F7F4FF)",

        border:"1px solid #92cee0",

        boxShadow:
            "0 10px 25px rgba(103,58,183,.08)",
                p: 3,
    borderRadius: 5,
    height: 360,
    transition: ".35s",

    "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 18px 40px rgba(0,0,0,.12)"
    }
            }}
        >

<Typography
    variant="h6"
    fontWeight="bold"
    color="primary"
    mb={2}
>

                Fine Distribution

            </Typography>

            <ResponsiveContainer
    width="100%"
    height={280}
>

    <PieChart>

        <Pie

            data={fineChart}

            dataKey="value"

            nameKey="name"

            outerRadius={90}

            innerRadius={55}

            paddingAngle={4}
            animationDuration={1200}
            label

        >

            <Cell fill="#4CAF50" />

            <Cell fill="#E53935" />

        </Pie>

       <Tooltip content={<CustomTooltip />} />

        <Legend />

    </PieChart>

</ResponsiveContainer>

        </Paper>

    </Grid>

</Grid>
        </DashboardLayout>

    );

}

export default Reports;