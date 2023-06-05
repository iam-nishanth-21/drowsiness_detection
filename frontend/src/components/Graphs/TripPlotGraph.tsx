import React from "react";
import { Line } from "react-chartjs-2";
export const TripPlotGraph = ({ data }) => {
  const transformedData = data.map((item) => {
    return {
      y: item.data.threshold,
      x: new Date(item.data.currentTime).getTime(),
    };
  });

  const labels = data.map((item) => item.data.currentTime);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Driver wide view",
        data: transformedData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        // suggestedMin: 1000,
      },
      y: {
        beginAtZero: true,
        // suggestedMin: 1000,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
