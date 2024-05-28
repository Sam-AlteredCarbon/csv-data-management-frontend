import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const ClassDistributionChart = ({ classCounts }) => {
    const data = {
        labels: Object.keys(classCounts),
        datasets: [
            {
                label: 'Class Distribution',
                data: Object.values(classCounts),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="class-distribution-chart">
            <h3>Class Distribution</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ClassDistributionChart;
// const ClassDistributionChart = ({ distribution }) => {
//   const labels = Object.keys(distribution);
//   console.log("labels", labels);
//   const data = {
//     labels: labels,
//     datasets: [{
//       label: 'Number of Samples per Class',
//       data: Object.values(distribution), //labels.map(label => distribution[label].length),
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   };
//
//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   };
//
//    return (
//         <div className="class-distribution-chart">
//             <h3>Class Distribution</h3>
//             <Bar data={data} options={options} />
//         </div>
//     );
//   //<Bar data={data} options={options} />;
// };
//
// export default ClassDistributionChart;