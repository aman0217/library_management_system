import { useEffect, useState } from "react";

import {
    Bar
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import {
    Paper,
    Typography,
    Box
} from "@mui/material";

import {
    getMonthlyBorrowStatistics
} from "../../services/dashboardService";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function MonthlyBorrowChart() {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {

        loadChart();

    }, []);

    const loadChart = async () => {

        try {

            const data =
                await getMonthlyBorrowStatistics();

            setChartData({

                labels: data.map(item =>
                    `${item.month}/${item.year}`
                ),

                datasets: [

                    {

                        label: "Borrowed",

                        data: data.map(item =>
                            item.borrowCount
                        ),

                        borderRadius: 12,

                        borderSkipped: false,

                        // Responsive bar width
                        barPercentage: 0.7,

                        categoryPercentage: 0.7,

                        backgroundColor: (context) => {

                            const chart = context.chart;

                            const {
                                ctx,
                                chartArea
                            } = chart;

                            if (!chartArea) {
                                return "#1976D2";
                            }

                            const gradient =
                                ctx.createLinearGradient(
                                    0,
                                    chartArea.bottom,
                                    0,
                                    chartArea.top
                                );

                            gradient.addColorStop(
                                0,
                                "#1976D2"
                            );

                            gradient.addColorStop(
                                0.5,
                                "#42A5F5"
                            );

                            gradient.addColorStop(
                                1,
                                "#90CAF9"
                            );

                            return gradient;

                        }

                    }

                ]

            });

        } catch (error) {

            console.error(
                "Monthly borrow chart error:",
                error
            );

        }

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        animation: {
            duration: 500
        },

        plugins: {

            legend: {
                display: false
            },

            tooltip: {

                backgroundColor: "#1E293B",

                padding: 12,

                cornerRadius: 8,

                titleFont: {
                    size: 14
                },

                bodyFont: {
                    size: 13
                }

            }

        },

        scales: {

            x: {

                grid: {
                    display: false
                },

                ticks: {

                    color: "#64748B",

                    font: {
                        weight: "bold"
                    },

                    // Mobile par labels overlap na karein
                    autoSkip: true,

                    maxRotation: 45,

                    minRotation: 0
                }

            },

            y: {

                beginAtZero: true,

                ticks: {

                    stepSize: 1,

                    color: "#64748B",

                    precision: 0
                },

                grid: {

                    color: "#E2E8F0"
                }

            }

        }

    };

    return (

        <Paper

            elevation={0}

            sx={{

                mt: {
                    xs: 2,
                    sm: 3,
                    md: 4
                },

                p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                },

                borderRadius: {
                    xs: 3,
                    sm: 4,
                    md: 5
                },

                background:
                    "linear-gradient(135deg,#F6FAFF 0%,#EDF5FF 50%,#F9FCFF 100%)",

                border:
                    "1px solid #b2d0f8",

                boxShadow:
                    "0 12px 30px rgba(30, 136, 243, 0.08)",

                width: "100%",

                overflow: "hidden"

            }}

        >

            {/* ================= TITLE ================= */}

            <Typography

                variant="h5"

                fontWeight="bold"

                sx={{

                    color: "#0F172A",

                    fontSize: {

                        xs: "1.15rem",

                        sm: "1.35rem",

                        md: "1.5rem"

                    },

                    lineHeight: 1.3

                }}

                mb={1}

            >

                📈 Monthly Borrow Analytics

            </Typography>


            {/* ================= DESCRIPTION ================= */}

            <Typography

                sx={{

                    color: "#64748B",

                    fontSize: {

                        xs: "0.85rem",

                        sm: "0.95rem",

                        md: "1rem"

                    },

                    lineHeight: 1.5

                }}

                mb={{

                    xs: 2,

                    sm: 3

                }}

            >

                Monthly borrowing statistics of library books

            </Typography>


            {/* ================= CHART ================= */}

            <Box

                sx={{

                    position: "relative",

                    width: "100%",

                    height: {

                        xs: 260,

                        sm: 320,

                        md: 380

                    },

                    overflowX: "auto",

                    overflowY: "hidden"

                }}

            >

                {chartData && (

                    <Box

                        sx={{

                            height: "100%",

                            width: {

                                xs:
                                    chartData.labels.length > 6
                                        ? `${Math.max(
                                            100,
                                            chartData.labels.length * 75
                                        )}%`
                                        : "100%",

                                sm: "100%",

                                md: "100%"

                            },

                            minWidth: {

                                xs:
                                    chartData.labels.length > 6
                                        ? 450
                                        : "100%",

                                sm: 0,

                                md: 0

                            }

                        }}

                    >

                        <Bar

                            data={chartData}

                            options={options}

                        />

                    </Box>

                )}

            </Box>

        </Paper>

    );

}

export default MonthlyBorrowChart;