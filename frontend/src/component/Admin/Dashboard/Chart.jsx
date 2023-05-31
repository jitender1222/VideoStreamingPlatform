import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement
);

export const LineChart = () => {
  const labels = getLastYearMonth();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Yearly Years",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Views",
        data: [1, 2, 3, 4],
        borderColor: "rgba(107,70,193,0.5)",
        backgroundColor: "#6b46c1",
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export const DoughnutChart = () => {
  const data = {
    labels: ["Subscribed", "Not Subscribed"],
    datasets: [
      {
        label: "Views",
        data: [3, 20],
        borderColor: ["rgba(62,12,171,0.3)", "rgba(214,43,129,0.3)"],
        backgroundColor: ["rgba(62,12,171,0.3)", "rgba(214,43,129,0.3)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

function getLastYearMonth() {
  const labels = [];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();
  const remain = 11 - currentMonth;

  for (let i = currentMonth; i < months.length; i--) {
    const element = months[i];
    labels.unshift(element);
    if (i === 0) break;
  }

  for (let i = 11; i > remain; i--) {
    const element = months[i];
    if (i === currentMonth) break;
    labels.unshift(element);
  }

  return labels;
}
