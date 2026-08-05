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

                        barThickness: 38,

                        backgroundColor: (context) => {

                            const chart = context.chart;

                            const {
                                ctx,
                                chartArea
                            } = chart;

                            if (!chartArea)
                                return "#1976D2";

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
                                .5,
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

        }

        catch (error) {

            console.error(error);

        }

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

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

                    }

                }

            },

            y: {

                beginAtZero: true,

                ticks: {

                    stepSize: 1,

                    color: "#64748B"

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
        mt: 4,
        p: 4,
        borderRadius: 5,

background:
"linear-gradient(135deg,#F6FAFF 0%,#EDF5FF 50%,#F9FCFF 100%)",

        border: "1px solid #b2d0f8",

        boxShadow:
            "0 12px 30px rgba(30, 136, 243, 0.08)"
    }}
>

<Typography
    variant="h5"
    fontWeight="bold"
    sx={{
        color: "#0F172A"
    }}
    mb={1}
>
    📈 Monthly Borrow Analytics
</Typography>

<Typography
    sx={{
        color: "#64748B"
    }}
    mb={3}
>
    Monthly borrowing statistics of library books
</Typography>


            <Box sx={{ height: 380 }}>

                {

                    chartData &&

                    <Bar
                        data={chartData}
                        options={options}
                    />

                }

            </Box>

        </Paper>

    );

}

export default MonthlyBorrowChart;