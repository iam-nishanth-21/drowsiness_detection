import React from "react";
import { Line } from "react-chartjs-2";

export const TripPlotGraph = ({ data }) => {
  // Transform the data array to extract x and y values
  const transformedData = data.map((item) => {
    return {
      x: item.data.threshold,
      y: item.data.threshold,
    };
  });
  console.log(data, "---------");
  const chartData = {
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
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
