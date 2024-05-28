import React, {useEffect, useState} from 'react';

// const SensorSelection = ({ samples, onSampleChange, onSensorChange }) => {
//     const sampleOptions = samples.map(sample => (
//         <option key={sample.sampleIndex} value={sample.sampleIndex}>
//             {`Sample ${sample.sampleIndex}`}
//         </option>
//     ));
//
//     const sensorOptions = samples.length > 0 ? Object.keys(samples[0].data[0].sensorData).map(sensor => (
//         <option key={sensor} value={sensor}>
//             {sensor}
//         </option>
//     )) : [];
//
//     return (
//         <div className="sensor-selection">
//             <div>
//                 <label htmlFor="sample-select">Select Sample:</label>
//                 <select id="sample-select" onChange={e => onSampleChange(e.target.value)}>
//                     <option value="">--Select Sample--</option>
//                     {sampleOptions}
//                 </select>
//             </div>
//             <div>
//                 <label htmlFor="sensor-select">Select Sensor:</label>
//                 <select id="sensor-select" onChange={e => onSensorChange(e.target.value)}>
//                     <option value="">--Select Sensor--</option>
//                     {sensorOptions}
//                 </select>
//             </div>
//         </div>
//     );
// };
const SensorSelection = ({ samples, onSampleChange, onSensorChange }) => {
    useEffect(() => {
        console.log("SensorSelection samples:", samples);
    }, [samples]);

    if (!samples || samples.length === 0) {
        return null; // Return nothing if samples are not available
    }

    const sampleOptions = samples.map(sample => (
        <option key={sample.sampleIndex} value={sample.sampleIndex}>
            {`Sample ${sample.sampleIndex} - Class: ${sample.class} - Samples: ${sample.data.length}`}
        </option>
    ));

    // Extract sensor keys from the first sample's data
    const sensorOptions = samples.length > 0 && samples[0].data.length > 0
        ? Object.keys(samples[0].data[0]).filter(key => key !== 'DATETIME').map(sensor => (
            <option key={sensor} value={sensor}>
                {sensor}
            </option>
        )) : [];

    return (
        <div className="sensor-selection">
            <div>
                <label htmlFor="sample-select">Select Sample:</label>
                <select id="sample-select" onChange={e => onSampleChange(e.target.value)}>
                    <option value="">--Select Sample--</option>
                    {sampleOptions}
                </select>
            </div>
            {sensorOptions.length > 0 && (
                <div>
                    <label htmlFor="sensor-select">Select Sensor:</label>
                    <select id="sensor-select" onChange={e => onSensorChange(e.target.value)}>
                        <option value="">--Select Sensor--</option>
                        {sensorOptions}
                    </select>
                </div>
            )}
        </div>
    );
};


export default SensorSelection;

// const SensorSelection = ({ samples, onSelectSensor }) => {
//   const [selectedSample, setSelectedSample] = useState('');
//   const [selectedSensor, setSelectedSensor] = useState('');
//
//   // Extract unique sample indices and sensor labels from samples
//   const sampleOptions = Object.keys(samples);
//   const sensorLabels = ['DATETTIME', 'ARRAY_S0', 'ARRAY_S1', 'ARRAY_S2', 'ARRAY_S3', 'ARRAY_S4', 'ARRAY_S5',
//       'ARRAY_S6', 'ARRAY_S7', 'ARRAY_S8', 'ARRAY_S9', 'MOX_1', 'MOX_2', 'MOX_3', 'MOX_4', 'SHT_HUMID', 'SHT_TEMP'];
//
//   const handleSampleChange = (event) => {
//     setSelectedSample(event.target.value);
//     setSelectedSensor('');
//   };
//
//   // const handleSensorChange = (event) => {
//   //   const newSelectedSensor = event.target.value;
//   //   setSelectedSensor(newSelectedSensor);
//   //   // console.log('Selected Sample:', selectedSample);
//   //   onSelectSensor(selectedSample, newSelectedSensor);
//   // };
//     const handleSensorChange = (event) => {
//       setSelectedSensor(event.target.value);
//       onSelectSensor(selectedSample, event.target.value);
//     };
//
//   return (
//       <div>
//           <h3>Select a Sample and Sensor:</h3>
//           <select value={selectedSample} onChange={handleSampleChange}>
//               <option value="">Select Sample</option>
//               {sampleOptions.map(sample => (
//                   <option key={sample} value={sample}>{sample}</option>
//               ))}
//           </select>
//
//           <select value={selectedSensor} onChange={handleSensorChange} disabled={!selectedSample}>
//               <option value="">Select Sensor</option>
//               {selectedSample && ['s0', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 'm1', 'm2', 'm3', 'm4', 'humidity', 'temperature'].map(sensor => (
//                   <option key={sensor} value={sensor}>{sensor}</option>
//               ))}
//           </select>
//           {/*<select value={selectedSensor} onChange={handleSensorChange} disabled={!selectedSample}>*/}
//           {/*  <option value="">Select Sensor</option>*/}
//           {/*  {sensorLabels.map(sensor => (*/}
//           {/*    <option key={sensor} value={sensor}>{sensor}</option>*/}
//           {/*  ))}*/}
//           {/*</select>*/}
//       </div>
//   );
// };


// import React, { useState, useEffect } from 'react';
//
// const SensorSelection = ({ data, onSelectSensor }) => {
//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedSample, setSelectedSample] = useState('');
//   const [selectedSensor, setSelectedSensor] = useState('');
//
//   console.log('Data:', data);
//   // Extract class names from data
//   const classNames = Object.keys(data);
//
//   // Update available samples when class changes
//   const [availableSamples, setAvailableSamples] = useState([]);
//   useEffect(() => {
//     if (selectedClass) {
//       setAvailableSamples(Object.keys(data[selectedClass]));
//       setSelectedSample('');
//       setSelectedSensor('');
//     }
//   }, [selectedClass, data]);
//
//   // Handle changes
//   const handleClassChange = event => {
//     setSelectedClass(event.target.value);
//   };
//
//   const handleSampleChange = event => {
//     setSelectedSample(event.target.value);
//     setSelectedSensor('');
//   };
//
//   const handleSensorChange = event => {
//     setSelectedSensor(event.target.value);
//     onSelectSensor(selectedClass, selectedSample, event.target.value);
//   };
//
//   return (
//     <div>
//       <h3>Select Class, Sample, and Sensor:</h3>
//       <select value={selectedClass} onChange={handleClassChange}>
//         <option value="">Select Class</option>
//         {classNames.map(className => (
//           <option key={className} value={className}>{className}</option>
//         ))}
//       </select>
//
//       <select value={selectedSample} onChange={handleSampleChange} disabled={!selectedClass}>
//         <option value="">Select Sample</option>
//         {availableSamples.map(sample => (
//           <option key={sample} value={sample}>{sample}</option>
//         ))}
//       </select>
//
//       <select value={selectedSensor} onChange={handleSensorChange} disabled={!selectedSample}>
//         <option value="">Select Sensor</option>
//         {selectedSample && ['DATETTIME', 'ARRAY_S0', 'ARRAY_S1', 'ARRAY_S2', 'ARRAY_S3', 'ARRAY_S4', 'ARRAY_S5',
//             'ARRAY_S6', 'ARRAY_S7', 'ARRAY_S8', 'ARRAY_S9', 'MOX_1', 'MOX_2', 'MOX_3', 'MOX_4', 'SHT_HUMID',
//             'SHT_TEMP'].map(sensor => (
//           <option key={sensor} value={sensor}>{sensor}</option>
//         ))}
//       </select>
//     </div>
//   );
// };
// export default SensorSelection;