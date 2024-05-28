import React from 'react';
import './ClassSamplesTable.css'; // Assume you have some basic styling in this CSS file

const ClassSamplesTable = ({ classDistribution, onSelectSample, selectedSampleIndex1, selectedSampleIndex2 }) => {
  if (!classDistribution || Object.keys(classDistribution).length === 0) {
    return <p>No class data available.</p>;
  }

  return (
    <div className="table-container">
      <h3>Class Samples Distribution</h3>
      <table>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Sample Indices</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(classDistribution).map(([className, samples]) => (
            <tr key={className}>
              <td>{className}</td>
              <td>{samples.map(sampleIndex => (
                <span key={sampleIndex}
                      className={(sampleIndex === selectedSampleIndex1 || sampleIndex === selectedSampleIndex2) ? 'highlighted' : ''}
                      style={{ cursor: 'pointer', padding: '0 5px' }}
                      onClick={() => onSelectSample(sampleIndex)}>
                  {sampleIndex}
                </span>
              ))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// const ClassSamplesTable = ({ classDistribution, onSelectSample }) => {
//   if (!classDistribution || Object.keys(classDistribution).length === 0) {
//     return <p>No class data available.</p>;
//   }
//
//   return (
//     <div>
//       <h3>Class Samples Distribution</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Class Name</th>
//             <th>Sample Indices</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(classDistribution).map(([className, samples]) => (
//             <tr key={className}>
//               <td>{className}</td>
//               <td>{samples.map(sampleIndex => (
//                 <span key={sampleIndex} style={{ cursor: 'pointer', padding: '0 5px' }}
//                       onClick={() => onSelectSample(sampleIndex)}>
//                   {sampleIndex}
//                 </span>
//               ))}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default ClassSamplesTable;


// const ClassSamplesTable = ({ classDistribution }) => {
//   if (!classDistribution || Object.keys(classDistribution).length === 0) {
//     return <p>No class data available.</p>;
//   }
//
//   return (
//     <div>
//       <h3>Class Samples Distribution</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Class Name</th>
//             <th>Sample Indices</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(classDistribution).map(([className, samples]) => (
//             <tr key={className}>
//               <td>{className}</td>
//               <td>{samples.join(', ')}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// export default ClassSamplesTable;