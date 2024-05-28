import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import FileUploader from './components/FileUploader'; // Adjust the path as necessary
import SensorSelection from './components/SensorSelection';  // Ensure this import is correct
import SensorSelectionCompare from './components/SensorSelectionCompare';  // Ensure this import is correct
import DataViewer from './components/DataViewer';  // Import DataViewer
import TimeSeriesChart from './components/TimeSeriesChart';
import TimeSeriesChartCompare from "./components/TimeSeriesChartCompare";
import ClassDistributionChart from './components/ClassDistributionChart'; // Import the new chart component
import ClassSamplesTable from './components/ClassSamplesTable'; // Import the new table component
import DataTransformer from './components/DataTransformer'; // Import the new data transformer component
import { verifyCSV } from './utils/verifyCSV'; // Ensure the path matches the location of verifyCSV.js
import { processCSVData } from './utils/processData';  // Updated import
import { normalizeData } from './utils/dataTransfromations';
import ClassFilter from "./components/ClassFilter";  // Import the new data normalization function
import TransformationSelector from './components/TransformationSelector'; // Import the new transformation selector component
import ClassDistributionChartCompare from './components/ClassDistributionChart'; // Import the new class distribution chart component
import DataSplitter from './components/DataSplitter';
import ModelSelector from './components/ModelSelector';

function App() {
     const [samples, setSamples] = useState([]);
    const [classCounts, setClassCounts] = useState(null);
    const [selectedSampleIndex, setSelectedSampleIndex] = useState(null);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [selectedClassName, setSelectedClassName] = useState(null);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [transformedData, setTransformedData] = useState([]);
    const [splitData, setSplitData] = useState({ train: [], val: [], test: [] });
    const [validationScore, setValidationScore] = useState(null);

    useEffect(() => {
        console.log("Samples updated:", samples);
    }, [samples]);

    const handleSampleChange = (sampleIndex) => {
        setSelectedSampleIndex(sampleIndex);
        setSelectedSensor(null); // Reset sensor selection when sample changes
        const sample = samples.find(sample => sample.sampleIndex === parseInt(sampleIndex));
        if (sample) {
            setSelectedClassName(sample.class);
        }
    };

    const handleSensorChange = (sensor) => {
        setSelectedSensor(sensor);
    };

    const handleClassChange = (className) => {
        setSelectedClasses(prevSelectedClasses =>
            prevSelectedClasses.includes(className)
                ? prevSelectedClasses.filter(c => c !== className)
                : [...prevSelectedClasses, className]
        );
    };

    const handleModelSubmit = async (model, parameters) => {
        try {
            const response = await fetch('http://localhost:5000/train_model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model,
                    parameters,
                    train_data: splitData.train,
                    val_data: splitData.val
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const result = await response.json();
            setValidationScore(result.validation_score);
        } catch (error) {
            console.error('Error training model:', error);
        }
    };
    const getFilteredSamples = () => {
        return samples.filter(sample => selectedClasses.includes(sample.class));
    };


    const getSelectedSampleData = () => {
        if (!selectedSampleIndex || !selectedSensor) return [];
        const sample = samples.find(sample => sample.sampleIndex === parseInt(selectedSampleIndex));
        return sample ? sample.data.map(entry => ({
            timestamp: entry.DATETIME,
            value: entry[selectedSensor]
        })) : [];
    };

    const filteredSamples = getFilteredSamples();
    const selectedSampleData = getSelectedSampleData();

    return (
        <div className="App">
            <header className="App-header">
                <h1>CSV Data Management App</h1>
            </header>
            <main>
                <FileUploader setSamples={setSamples} setClassCounts={setClassCounts} />
                 {classCounts && (
                    <>
                    <ClassFilter classCounts={classCounts} selectedClasses={selectedClasses} onClassChange={handleClassChange} />
                    <ClassDistributionChart classCounts={classCounts} />
                    </>
                )}
                {filteredSamples.length > 0 && (
                    <>
                        <SensorSelection samples={filteredSamples} onSampleChange={handleSampleChange} onSensorChange={handleSensorChange} />
                        <TransformationSelector data={selectedSampleData} setTransformedData={setTransformedData} />
                        <TimeSeriesChart data={transformedData.length > 0 ? transformedData : selectedSampleData} sensor={selectedSensor} className={selectedClassName} />
                    </>
                )}

                {classCounts && (
                    <DataSplitter samples={samples} classCounts={classCounts} setSplitData={setSplitData} />
                )}
                {splitData.train.length > 0 && (
                    <>
                        <ModelSelector onModelSubmit={handleModelSubmit} />
                        {validationScore && <p>Validation Score: {validationScore}</p>}
                    </>
                )}
            </main>
        </div>
    );
}


// export default App;
// function App() {
//   const [file, setFile] = useState(null);
//   const [processedData, setProcessedData] = useState({});
//   const [classDistribution, setClassDistribution] = useState({});
//   const [selectedData, setSelectedData] = useState([]);
//   const [selectedData2, setSelectedData2] = useState([]);
//   const [lastSelectedSensor, setLastSelectedSensor] = useState('defaultSensor'); // default sensor
//   const [activeGraph, setActiveGraph] = useState(1);
//   const [selectedSampleIndex1, setSelectedSampleIndex1] = useState(null);
//   const [selectedSampleIndex2, setSelectedSampleIndex2] = useState(null);
//   const [apiUrl, setApiUrl] = useState('');
//   const [transformedData, setTransformedData] = useState([]);
//   const [transformationResult, setTransformationResult] = useState([]);
//   const [errors, setErrors] = useState('');
//
//   const handleFileAccepted = file => {
//     setErrors('');
//     verifyCSV(file[0], setErrors)
//       .then(data => {
//         const { samples, classDistribution } = processCSVData(data);
//         setProcessedData(samples);
//         setClassDistribution(classDistribution);
//
//       })
//       .catch(error => {
//         setProcessedData({});
//         setClassDistribution({});
//         console.error('Verification failed:', error);
//       });
//   };
//
// const handleSensorSelection = (sampleIndex, sensorName, sampleNumber) => {
//     setLastSelectedSensor(sensorName); // Update the global sensor name whenever a new sensor is selected
//     if (processedData[sampleIndex] && processedData[sampleIndex].data) {
//         const selectedData = processedData[sampleIndex].data.map(entry => ({
//             datetime: entry.datetime, // Ensuring datetime is passed correctly
//             value: entry[sensorName]  // Sensor value from the selected sensor
//         }));
//
//         // if (sampleNumber === 1) {
//         //     setSelectedData(selectedData);
//         // } else if (sampleNumber === 2) {
//         //     setSelectedData2(selectedData);
//         // }
//         if (activeGraph === 1) {
//             setSelectedData(selectedData);
//         } else {
//             setSelectedData2(selectedData);
//         }
//     } else {
//         setSelectedData([]);
//         setSelectedData2([]);
//     }
// };
//
// const handleTransformationResult = (transformedData) => {
//
//     if (!transformedData.datetime || !transformedData.result) {
//         console.error('Invalid data structure:', transformedData);
//
//         return;
//     }
//
//     if (transformedData.datetime.length !== transformedData.result.length) {
//         console.error('Mismatched data lengths:', transformedData.datetime.length, transformedData.result.length);
//
//         return;
//     }
//
//     // Combine the datetime and result arrays into a single array of objects
//     const combinedData = transformedData.datetime.map((time, index) => ({
//         datetime: time,
//         value: transformedData.result[index]
//     }));
//     console.log('Updated Data:', combinedData);
//     setTransformationResult(combinedData);
//
// };
//
//
// // const onSelectSample = (sampleIndex) => {
// //     // Assuming a default sensor for simplicity
// //     handleSensorSelection(sampleIndex, lastSelectedSensor, 1);
// // };
// const onSelectSample = (sampleIndex) => {
//
//     if (activeGraph === 1) {
//         setSelectedSampleIndex1(sampleIndex);
//         handleSensorSelection(sampleIndex, lastSelectedSensor, 1);
//     } else {
//         setSelectedSampleIndex2(sampleIndex);
//         handleSensorSelection(sampleIndex, lastSelectedSensor, 2);
//     }
// };
//
// const selectGraph = (graphNumber) => {
//     setActiveGraph(graphNumber);
// };
//
// return (
//     <div className="App">
//         <h1>Upload your CSV File</h1>
//         <div className="file-upload">
//             <FileUploader onFileAccepted={handleFileAccepted}/>
//             {errors && <p className="error">Error: {errors}</p>}
//         </div>
//
//         <div className="selectors">
//             <SensorSelectionCompare samples={processedData} onSelectSensor={handleSensorSelection}/>
//         </div>
//
//         <div className="chart-container">
//             <div className={activeGraph === 1 ? "chart active-chart" : "chart"} onClick={() => selectGraph(1)}>
//                 <h2>Sample {selectedSampleIndex1} Data</h2>
//                 <TimeSeriesChart data={selectedData}/>
//             </div>
//             <div className={activeGraph === 2 ? "chart active-chart" : "chart"} onClick={() => selectGraph(2)}>
//                 <h2>Sample {selectedSampleIndex2} Data</h2>
//                 <TimeSeriesChart data={selectedData2}/>
//             </div>
//
//
//         </div>
//
//         <div className="data-tables">
//             <ClassSamplesTable classDistribution={classDistribution} onSelectSample={onSelectSample}
//                                selectedSampleIndex1={selectedSampleIndex1} selectedSampleIndex2={selectedSampleIndex2}/>
//         </div>
//
//         <div>
//             <h1>Enter API URL</h1>
//             <input type="text" placeholder="Enter API URL" value={apiUrl} onChange={e => setApiUrl(e.target.value)}/>
//             <hr/>
//             {apiUrl && <DataTransformer apiUrl={apiUrl} selectedSampleData={selectedData}
//                                         selectedSensor={lastSelectedSensor}
//                                         onTransformationComplete={handleTransformationResult}/>}
//             {/*{apiUrl && transformationResult && <TimeSeriesChart data={transformationResult}/>}*/}
//
//         </div>
//
//         <div className="chart-container">
//             <div className= 'chart'>
//                 <h2>Sample Data</h2>
//                 <TimeSeriesChart data={selectedData}/>
//             </div>
//             <div className= 'chart'>
//                 <h2>Transformed Data</h2>
//                 <TimeSeriesChart data={transformationResult}/>
//             </div>
//         </div>
//         {/*<div>*/}
//         {/*    <h3>Selected Sample and Sensor:</h3>*/}
//         {/*    <SensorSelection samples={processedData} onSelectSensor={handleSensorSelection}/>*/}
//         {/*    <button onClick={handleTransform}>Normalize Data</button>*/}
//         {/*    <TimeSeriesChart data={transformedData}/>*/}
//         {/*</div>*/}
//         <div className="class-distribution">
//             <h2>Class Distribution</h2>
//             <ClassDistributionChart distribution={classDistribution}/>
//         </div>
//     </div>
// );
// }

// function App() {
//   const [file, setFile] = useState(null);
//   const [processedData, setProcessedData] = useState({});
//   const [classDistribution, setClassDistribution] = useState({});
//   const [selectedData, setSelectedData] = useState([]);
//   const [errors, setErrors] = useState('');
//
//   const handleFileAccepted = file => {
//     setErrors('');
//     verifyCSV(file[0], setErrors)
//       .then(data => {
//         const { samples, classDistribution } = processCSVData(data);
//         setProcessedData(samples);
//         setClassDistribution(classDistribution);
//         // console.log('Processed Data:', samples);
//         // console.log('Class Distribution:', classDistribution);
//
//       })
//       .catch(error => {
//         setProcessedData({});
//         setClassDistribution({});
//         console.error('Verification failed:', error);
//       });
//   };
//
//   //   const handleSensorSelection = (sampleIndex, sensor) => {
//   //        // Ensure the sample exists and has data for the chosen sensor
//   //       console.log('Selected data:', processedData[2].data);
//   //       console.log('Selected Sensor:', sensor);
//   //         if (processedData[sampleIndex] && processedData[sampleIndex].data[0][sensor])  {
//   //           setSelectedData(processedData[sampleIndex].data.map(entry => entry[sensor]));
//   //           // setSelectedData(processedData[sampleIndex].data[sensor]);
//   //         } else {
//   //           // If no data found for the selected sensor, set selectedData to an empty array or a suitable default
//   //           setSelectedData([]);
//   //           console.error('No data found for selected sample and sensor');
//   //         }
//   //   // if (processedData[sampleIndex]) {
//   //   //   setSelectedData(processedData[sampleIndex][sensor]);
//   //   // }
//   // };
//   //   const handleSensorSelection = (sampleIndex, sensorName) => {
//   //       if (processedData[sampleIndex] && processedData[sampleIndex].data) {
//   //           const selectedData = processedData[sampleIndex].data.map(entry => entry[sensorName]);
//   //           setSelectedData(selectedData);
//   //       } else {
//   //           setSelectedData([]);
//   //       }
//   //   };
//
//  // const handleSensorSelection = (sampleIndex, sensorName) => {
//  //        if (processedData[sampleIndex] && processedData[sampleIndex].data) {
//  //            const selectedData = processedData[sampleIndex].data.map(entry => {
//  //                return { timestamp: entry.datetime, value: entry[sensorName] };
//  //            });
//  //            setSelectedData(selectedData);
//  //        } else {
//  //            setSelectedData([]);
//  //        }
//  //    };
// const handleSensorSelection = (sampleIndex, sensorName) => {
//     if (processedData[sampleIndex] && processedData[sampleIndex].data) {
//         const selectedData = processedData[sampleIndex].data.map(entry => ({
//             datetime: entry.datetime, // Ensuring datetime is passed correctly
//             value: entry[sensorName]  // Sensor value from the selected sensor
//         }));
//
//         setSelectedData(selectedData);
//     } else {
//         setSelectedData([]);
//     }
// };
//
//   return (
//     <div className="App">
//       <h1>Upload your CSV File</h1>
//       <FileUploader onFileAccepted={handleFileAccepted} />
//       {errors && <p className="error">Error: {errors}</p>}
//       <div>
//         <h2>Class Distribution</h2>
//           <ClassDistributionChart distribution={classDistribution} />
//         {/*{Object.entries(classDistribution).map(([className, samples]) => (*/}
//         {/*  <p key={className}>{className}: {samples.length} unique samples</p>*/}
//         {/*))}*/}
//       </div>
//         <SensorSelection samples={processedData} onSelectSensor={handleSensorSelection} />
//                 {selectedData && selectedData.length > 0 && (
//             <TimeSeriesChart data={selectedData} />
//         )}
//         {/*<DataViewer data={selectedData} />*/}
//             {/*{selectedData.length > 0 && (*/}
//             {/*    <div>*/}
//             {/*        <h3>Selected Sensor Data:</h3>*/}
//             {/*        <ul>*/}
//             {/*            {selectedData.map((value, index) => <li key={index}>{value}</li>)}*/}
//             {/*        </ul>*/}
//             {/*    </div>*/}
//             {/*)}*/}
//       {/*  <SensorSelection samples={processedData} onSelectSensor={handleSensorSelection} />*/}
//       {/*{selectedData.length > 0 && (*/}
//       {/*  <div>*/}
//       {/*    <h3>Selected Sensor Data:</h3>*/}
//       {/*    <ul>*/}
//       {/*      {selectedData.map((entry, index) => <li key={index}>{entry.join(', ')}</li>)}*/}
//       {/*    </ul>*/}
//       {/*  </div>*/}
//       {/*  )}*/}
//     </div>
//   );
// }

// function App() {
//   const [file, setFile] = useState(null);
//   const [processedData, setProcessedData] = useState({});  // Updated state to reflect processed data structure
//   const [errors, setErrors] = useState('');
//
//   const handleFileAccepted = file => {
//     setErrors('');
//     verifyCSV(file[0], setErrors)
//       .then(data => {
//         const processed = processCSVData(data);
//         setProcessedData(processed);
//         console.log('Processed Data:', processed);
//       })
//       .catch(error => {
//         console.error('Verification failed:', error);
//       });
//   };
//
//   return (
//     <div className="App">
//       <h1>Upload your CSV File</h1>
//       <FileUploader onFileAccepted={handleFileAccepted} />
//       {errors && <p className="error">Error: {errors}</p>}
//       {Object.keys(processedData).length > 0 && (
//         <div>
//           <h2>Organized Data by Sample and Class</h2>
//           {Object.entries(processedData).map(([sampleNum, classGroups]) => (
//             <div key={sampleNum}>
//               <h3>Sample {sampleNum}</h3>
//               {Object.entries(classGroups).map(([className, entries]) => (
//                 <div key={className}>
//                   <h4>Class {className} ({entries.length} entries)</h4>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
  // return (
  //   <div className="App">
  //     <h1>Upload your CSV File</h1>
  //     <FileUploader onFileAccepted={handleFileAccepted} />
  //     {errors && <p className="error">Error: {errors}</p>}
  //     {Object.keys(processedData).length > 0 && (
  //       <div>
  //         <h2>Organized Data</h2>
  //         {Object.entries(processedData).map(([sampleNum, classGroups], index) => (
  //           <div key={index}>
  //             <h3>Sample {sampleNum}</h3>
  //             {Object.entries(classGroups).map(([className, entries]) => (
  //               <p key={className}>Class {className} has {entries.length} entries</p>
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// function App() {
//   // State to store the uploaded file
//   const [file, setFile] = useState(null);
//
//   // Function to handle file selection
//   const handleFileAccepted = file => {
//     console.log('File accepted:', file);
//     setFile(file); // Update state with the selected file
//   };
//
//   return (
//     <div className="App">
//         <h1>Altered Carbon Data Handler</h1>
//       <h1>Upload your CSV File</h1>
//       <FileUploader onFileAccepted={handleFileAccepted} />
//
//       {file && (
//           <div>
//         <p>File name: {file[0].name}</p>
//         <p>File size: {file[0].size}</p>
//           </div>
//       )}
//     </div>
//   );
// }
// function App() {
//   const [file, setFile] = useState(null);
//   const [csvData, setCsvData] = useState([]);
//   const [errors, setErrors] = useState('');
//
//   const handleFileAccepted = file => {
//     setErrors(''); // Reset errors on new file upload
//     verifyCSV(file[0], setErrors)
//       .then(data => {
//         setCsvData(data);
//         console.log('CSV Data:', data);
//       })
//       .catch(error => {
//         console.error('Verification failed:', error);
//       });
//   };
//
//   return (
//     <div className="App">
//       <h1>Upload your CSV File</h1>
//       <FileUploader onFileAccepted={handleFileAccepted} />
//       {errors && <p className="error">Error: {errors}</p>}
//       {csvData.length > 0 && <div>CSV Data Loaded Successfully</div>}
//     </div>
//   );
// }


export default App;
