import React, {useState} from 'react';
// import { parseCSV } from './utils/processData';
import { useDropzone } from 'react-dropzone';
import './FileUploader.css'; // Assume you have some basic styling in this CSS file


const FileUploader = ({ setSamples, setClassCounts }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }
                const data = await response.json();
                setClassCounts(data.classCounts);
                setSamples(data.samples);
                setError(null);
            } catch (error) {
                console.error('Error uploading file:', error);
                setError(error.message);
            }
        }
    };

    return (
        <div className="file-upload">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            {error && <div className="error">{`Error: ${error}`}</div>}
            {/*{classCounts && (*/}
            {/*    <div>*/}
            {/*        <h3>Class Counts:</h3>*/}
            {/*        <ul>*/}
            {/*            {Object.entries(classCounts).map(([className, count]) => (*/}
            {/*                <li key={className}>{`${className}: ${count}`}</li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

// const FileUploader = () => {
//     const [file, setFile] = useState(null);
//     const [classCounts, setClassCounts] = useState(null);
//     const [samples, setSamples] = useState(null);
//     const [error, setError] = useState(null);
//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };
//
//     const handleFileUpload = async () => {
//         if (file) {
//             const formData = new FormData();
//             formData.append('file', file);
//
//             try {
//                 const response = await fetch('http://localhost:5000/upload', {
//                     method: 'POST',
//                     body: formData,
//                 });
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.error);
//                 }
//                 const data = await response.json();
//                 console.log(data); // Handle data as needed
//                 setClassCounts(data.classCounts);
//                 setSamples(data.samples);
//                 setError(null);
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//                 setError(error.message);
//             }
//         }
//     };
//
//     return (
//         <div className="file-upload">
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleFileUpload}>Upload</button>
//             {error && <div className="error">{`Error: ${error}`}</div>}
//             {classCounts && (
//                 <div>
//                     <h3>Class Counts:</h3>
//                     <ul>
//                         {Object.entries(classCounts).map(([className, count]) => (
//                             <li key={className}>{`${className}: ${count}`}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//             {samples && (
//                 <div>
//                     <h3>Samples:</h3>
//                     <ul>
//                         {samples.map(sample => (
//                             <li key={sample.sampleIndex}>{`Sample ${sample.sampleIndex} - Class: ${sample.class}`}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

export default FileUploader;

// const FileUploader = () => {
//     const [file, setFile] = useState(null);
//     const [classCounts, setClassCounts] = useState(null);
//
//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };
//
//     const handleFileUpload = async () => {
//         if (file) {
//             try {
//                 const { samples, classCounts } = await parseCSV(file);
//                 console.log(samples); // Handle samples as needed
//                 setClassCounts(classCounts);
//             } catch (error) {
//                 console.error('Error processing file:', error);
//             }
//         }
//     };
//
//     return (
//         <div className="file-upload">
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleFileUpload}>Upload</button>
//             {classCounts && (
//                 <div>
//                     <h3>Class Counts:</h3>
//                     <ul>
//                         {Object.entries(classCounts).map(([className, count]) => (
//                             <li key={className}>{`${className}: ${count}`}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default FileUploader;

// const FileUploader = ({ onFileAccepted }) => {
//
//   const onDrop = (acceptedFiles, fileRejections) => {
//   acceptedFiles.forEach(file => {
//     console.log(`Accepted: ${file.path}`);
//   });
//   fileRejections.forEach(file => {
//     console.log(`Rejected: ${file.path} - ${file.errors.map(e => e.message).join(', ')}`);
//   });
// };
//   // Customize the behavior of the dropzone
//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     acceptedFiles
//   } = useDropzone({
//     onDrop,
//     onDropAccepted: onFileAccepted,
//     accept: 'text/csv, application/vnd.ms-excel', // Accept CSV files only
//     multiple: false // Allow only one file to be uploaded at a time
//   });
//
//   // Message to display based on user interaction
//   const activeMessage = isDragActive ? "Release to drop the file here..." : "Drag 'n' drop a CSV file here, or click to select the file";
//
//   // Handle file information display
//   const files = acceptedFiles.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));
//
//   return (
//     <section className="container">
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()} />
//         <p>{activeMessage}</p>
//       </div>
//       <aside>
//         <h4>Files:</h4>
//         <ul>{files}</ul>
//       </aside>
//     </section>
//   );
// };
//
// export default FileUploader;