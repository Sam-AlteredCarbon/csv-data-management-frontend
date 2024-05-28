// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto'; // Ensures Chart.js is automatically registered
//
// const TimeSeriesChart = ({ data }) => {
//   const chartData = {
//     labels: data.map(item => item.timestamp), // Assuming each entry has a 'timestamp'
//     datasets: [
//       {
//         label: 'Sensor Value',
//         data: data.map(item => item.value), // Assuming each entry has a 'value'
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }
//     ]
//   };
//
//   const options = {
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           unit: 'minute'
//         },
//         title: {
//           display: true,
//           text: 'Time'
//         }
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Value'
//         }
//       }
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top'
//       }
//     }
//   };
//
//   return <Line data={chartData} options={options} />;
// };
//
// export default TimeSeriesChart;

import React, {useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensures Chart.js is automatically registered
import 'chartjs-adapter-date-fns';  // Ensure the adapter is imported


const TimeSeriesChart = ({ data, sensor, className }) => {
    useEffect(() => {
        console.log("TimeSeriesChart data:", data);
        console.log("TimeSeriesChart sensor:", sensor);
        console.log("TimeSeriesChart className:", className);
    }, [data, sensor, className]);

    if (!data || !sensor) return null;

    const chartData = {
        labels: data.map(entry => entry.timestamp),
        datasets: [
            {
                label: sensor,
                data: data.map(entry => entry.value),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)'
            }
        ]
    };

    const options = {
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'yyyy-MM-dd HH:mm:ss',
              unit: 'minute',
              displayFormats: {
                                minute: 'yyyy-MM-dd HH:mm'
                            }
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

    return (
        <div className="time-series-chart">
            <h3>{`Class: ${className}`}</h3>
            <Line data={chartData} options={options}/>
        </div>
    );
};


// const TimeSeriesChart = ({ data }) => {
//
//   const chartData = {
//
//     labels: data.map(item => item.datetime), // Using 'datetime' as the x-axis labels
//     datasets: [
//       {
//         label: 'Sensor Value',
//         data: data.map(item => item.value), // 'value' is the sensor measurement
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }
//     ]
//   };
//
//   const options = {
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           parser: 'yyyy-MM-dd HH:mm:ss',
//           unit: 'minute',
//           displayFormats: {
//                             minute: 'yyyy-MM-dd HH:mm'
//                         }
//         },
//         title: {
//           display: true,
//           text: 'Time'
//         }
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Value'
//         }
//       }
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top'
//       }
//     }
//   };
//
//   return <Line data={chartData} options={options} />;
// };

export default TimeSeriesChart;

