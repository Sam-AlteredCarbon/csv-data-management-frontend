import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

// function DataTransformer({ apiUrl }) {
//     const [transformations, setTransformations] = useState([]);
//     const [selectedTransformation, setSelectedTransformation] = useState('');
//     const [value, setValue] = useState('');
//     const [result, setResult] = useState('');
//
//     useEffect(() => {
//         axios.get(`${apiUrl}/available_transformations`)
//             .then(response => {
//                 setTransformations(response.data);
//                 setSelectedTransformation(response.data[0]);
//             })
//             .catch(error => console.error('Error fetching transformations', error));
//     }, [apiUrl]); // Dependency on apiUrl to reload when it changes
//
//     function handleSubmit(event) {
//         event.preventDefault();
//         axios.post(`${apiUrl}/transform`, { transformation: selectedTransformation, value: Number(value) })
//             .then(response => {
//                 setResult(`Result: ${response.data.result}`);
//             })
//             .catch(error => {
//                 console.error('Error applying transformation', error);
//                 setResult(`Error: ${error.message}`);
//             });
//     }
//
//     return (
//         <div>
//             <h1>Transform Your Data</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Transformation:
//                     <select value={selectedTransformation} onChange={e => setSelectedTransformation(e.target.value)}>
//                         {transformations.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                 </label>
//                 <label>
//                     Value:
//                     <input type="number" value={value} onChange={e => setValue(e.target.value)} />
//                 </label>
//                 <button type="submit">Transform</button>
//             </form>
//             <p>{result}</p>
//         </div>
//     );
// }

// function DataTransformer({ apiUrl, selectedSampleData, selectedSensor }) {
//     const [transformations, setTransformations] = useState([]);
//     const [selectedTransformation, setSelectedTransformation] = useState('');
//     const [result, setResult] = useState('');
//
//     useEffect(() => {
//         // Fetch available transformations when the component mounts or apiUrl changes
//         axios.get(`${apiUrl}/available_transformations`)
//             .then(response => {
//                 setTransformations(response.data);
//                 setSelectedTransformation(response.data[0]);
//             })
//             .catch(error => console.error('Error fetching transformations', error));
//     }, [apiUrl]);
//
//     function handleSubmit(event) {
//         event.preventDefault();
//         if (!selectedSampleData || !selectedSensor) {
//             setResult("No sample or sensor data selected.");
//             return;
//         }
//
//         // Assuming selectedSampleData is the array of data points from the selected sample and sensor
//         const payload = {
//             transformation: selectedTransformation,
//             data: selectedSampleData.map(item => item[selectedSensor])
//         };
//
//         axios.post(`${apiUrl}/transform`, payload)
//             .then(response => {
//                 setResult(`Result: ${JSON.stringify(response.data)}`);
//             })
//             .catch(error => {
//                 console.error('Error applying transformation', error);
//                 setResult(`Error: ${error.message}`);
//             });
//     }
//
//     return (
//         <div>
//             <h1>Transform Your Data</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Transformation:
//                     <select value={selectedTransformation} onChange={e => setSelectedTransformation(e.target.value)}>
//                         {transformations.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                 </label>
//                 <button type="submit">Transform</button>
//             </form>
//             <p>{result}</p>
//         </div>
//     );
// }

function DataTransformer({ apiUrl, selectedSampleData, selectedSensor, onTransformationComplete }) {
    const [transformations, setTransformations] = useState([]);
    const [selectedTransformation, setSelectedTransformation] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        axios.get(`${apiUrl}/available_transformations`)
            .then(response => {
                setTransformations(response.data);
                setSelectedTransformation(response.data[0]);
            })
            .catch(error => console.error('Error fetching transformations', error));
    }, [apiUrl]);

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Selected Sample Data:', selectedSampleData);
        console.log('Selected Sensor:', selectedSensor);
        if (!selectedSampleData || !selectedSensor) {
            console.error('No sample or sensor data selected');
            return;
        }

        const payload = {
            transformation: selectedTransformation,
            data: selectedSampleData.map(item =>  item.value),  // Ensure this mapping is correct based on your data structure
            datetime: selectedSampleData.map(item => item.datetime)  // Ensure this mapping is correct based on your data structure
        };
        console.log('Payload:', payload);

        axios.post(`${apiUrl}/transform`, payload)
            .then(response => {
                console.log('Transformation result:', response.data);
                // setResult(response.data);
                onTransformationComplete(response.data);
            })
            .catch(error => {
                console.error('Error applying transformation', error);
            });

        // axios.post(`${apiUrl}/transform`, { transformation: selectedTransformation })
        //     .then(response => {
        //         setResult(`Result: ${response.data.result}`);
        //         onTransformationComplete(response.data.result);  // Call the callback with the result
        //     })
        //     .catch(error => {
        //         console.error('Error applying transformation', error);
        //         setResult(`Error: ${error.message}`);
        //     });
    }

    return (
        <div>
            <h1>Transform Your Data</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedTransformation} onChange={e => setSelectedTransformation(e.target.value)}>
                    {transformations.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <button type="submit">Transform</button>
            </form>
            <p>{result}</p>
        </div>
    );
}

export default DataTransformer;