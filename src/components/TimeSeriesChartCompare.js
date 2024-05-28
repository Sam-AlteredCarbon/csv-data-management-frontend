import {Line} from "react-chartjs-2";
import React from "react";

const TimeSeriesChartCompare = ({ data1, data2 }) => {
  const chartData = {
    labels: data1.map(item => item.datetime), // Assume both data sets have the same time stamps or aligned
    datasets: [
      {
        label: 'Sample 1',
        data: data1.map(item => item.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      },
      {
        label: 'Sample 2',
        data: data2.map(item => item.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute'
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default TimeSeriesChartCompare;