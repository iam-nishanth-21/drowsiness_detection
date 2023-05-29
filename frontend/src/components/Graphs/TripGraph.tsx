import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart } from "chart.js";
import dayjs from "dayjs";

const TripGraph = ({ trips }) => {
  // Grouping trips by day and counting the number of trips for each day
  const tripCountByDay = trips.reduce((countByDay, trip) => {
    const day = dayjs(trip.created_at).format("MMMM D, YYYY"); // Extract day from created_at
    countByDay[day] = (countByDay[day] || 0) + 1; // Increment trip count for the day
    return countByDay;
  }, {});

  // Extracting the days and trip counts for chart data
  const labels = Object.keys(tripCountByDay);
  const data = Object.values(tripCountByDay);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Trips per Day",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Trips",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TripGraph;
