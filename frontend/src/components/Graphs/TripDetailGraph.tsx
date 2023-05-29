import React from "react";
import { Bar } from "react-chartjs-2";

const BarChartComponent = ({ data }) => {
  const groupedData = data.reduce((acc, item) => {
    const existingItem = acc.find((el) => el.trip_id === item.trip_id);
    if (existingItem) {
      existingItem.name;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const chartData = {
    labels: groupedData.map((item) => `${item.trip_id} - ${item.name}`),
    datasets: [
      {
        label: "Threshold",
        data: groupedData.map((item) => item.data.threshold),
        backgroundColor: "rgba(75,192,192,0.4)", // Bar color
        borderColor: "rgba(75,192,192,1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        // Additional y-axis options can be added here if needed
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartComponent;
