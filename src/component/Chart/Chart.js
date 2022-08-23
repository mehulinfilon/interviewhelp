/* eslint-disable no-sequences */
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
ChartJS.defaults.font.family = "Quicksand";

function getDate(value) {
  if (!value) value = "";
  return value.toString().slice(0, 10);
}

function Chart(data) {
  const dataChart = data.logs.reduce(
    (r, o) => (
      r[getDate(o.time)]
        ? (r[getDate(o.time)].revenue += o.revenue)
        : (r[getDate(o.time)] = { ...o }),
      r
    ),
    {}
  );

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const labels = Object.keys(dataChart);
  const chartdata = {
    labels,
    datasets: [
      {
        label: "Revenue",
        lineTension: 0.2,
        display: false,
        data: labels.map((e) => dataChart[e].revenue),
        borderColor: "#aaa",
      },
    ],
  };

  return <Line options={options} data={chartdata} />;
}

Chart.prototype = {
  data: PropTypes.object,
};

export default Chart;
