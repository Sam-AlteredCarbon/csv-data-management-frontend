// import csv from 'csv-parser';
// import fs from 'fs';

// Function to split data by 'sample number' and then group by 'class name' within each sample
// export const processCSVData = (csvData) => {
//   const samples = {};
//
//   // Splitting data into samples
//   csvData.forEach(row => {
//     const sampleNum = row['SAMPLE_INDEX'];
//     if (!samples[sampleNum]) {
//       samples[sampleNum] = [];
//     }
//     samples[sampleNum].push(row);
//   });
//
//   // Grouping each sample by 'class name'
//   const samplesWithClassGroups = {};
//   Object.keys(samples).forEach(sampleNum => {
//     const sampleData = samples[sampleNum];
//     const classGroups = {};
//     sampleData.forEach(row => {
//       const className = row['CLASS_NAME'];
//       if (!classGroups[className]) {
//         classGroups[className] = [];
//       }
//       classGroups[className].push(row);
//     });
//     samplesWithClassGroups[sampleNum] = classGroups;
//   });
//
//   return samplesWithClassGroups;
// };

// Function to reshape CSV data into a structured 3D format and analyze class distribution
export const processCSVData = (csvData) => {
  const samples = {};
  const classDistribution = {};

  csvData.forEach(row => {
    const sampleIndex = row['SAMPLE_INDEX'];
    const className = row['CLASS_NAME'];

    // Initialize the structure for each sample if it doesn't exist
    if (!samples[sampleIndex]) {
      samples[sampleIndex] = {
        className: className,
        data: []
      };
      // Track class distribution
      if (classDistribution[className]) {
        classDistribution[className].push(sampleIndex);
      } else {
        classDistribution[className] = [sampleIndex];
      }
    }

        // Append a structured object for each feature per sample, using sensor names as keys
    samples[sampleIndex].data.push({
      datetime: row['DATETIME'],
      s0: row['ARRAY_S0'],
      s1: row['ARRAY_S1'],
      s2: row['ARRAY_S2'],
      s3: row['ARRAY_S3'],
      s4: row['ARRAY_S4'],
      s5: row['ARRAY_S5'],
      s6: row['ARRAY_S6'],
      s7: row['ARRAY_S7'],
      s8: row['ARRAY_S8'],
      s9: row['ARRAY_S9'],
      m1: row['MOX_1'],
      m2: row['MOX_2'],
      m3: row['MOX_3'],
      m4: row['MOX_4'],
      humidity: row['SHT_HUMID'],
      temperature: row['SHT_TEMP']
    });
    // // Append data for each feature per sample
    // samples[sampleIndex].data.push([
    //   row['DATETIME'], row['ARRAY_S0'], row['ARRAY_S1'], row['ARRAY_S2'], row['ARRAY_S3'],
    //   row['ARRAY_S4'], row['ARRAY_S5'], row['ARRAY_S6'], row['ARRAY_S7'], row['ARRAY_S8'],
    //   row['ARRAY_S9'], row['MOX_1'], row['MOX_2'], row['MOX_3'], row['MOX_4'],
    //   row['SHT_HUMID'], row['SHT_TEMP']
    // ]);

  });

  return { samples, classDistribution };
};

/**
 * Parses a CSV file and processes it into samples while recording class counts.
 * @param {File} file - The CSV file to process.
 * @returns {Promise<object>} - A promise that resolves with an object containing samples and class counts.
 */
// export async function parseCSV(file) {
//     return new Promise((resolve, reject) => {
//         const samples = {};
//         const classCounts = {};
//         const sensorDataHeaders = new Set();
//
//         fs.createReadStream(file.path)
//             .pipe(csv())
//             .on('headers', (headers) => {
//                 // Collect all sensor data headers dynamically
//                 headers.forEach(header => {
//                     if (header !== 'DATETIME' && header !== 'CLASS_NAME' && header !== 'SAMPLE_INDEX') {
//                         sensorDataHeaders.add(header);
//                     }
//                 });
//             })
//             .on('data', (row) => {
//                 const sampleIndex = row['SAMPLE_INDEX'];
//                 const className = row['CLASS_NAME'];
//
//                 if (!samples[sampleIndex]) {
//                     samples[sampleIndex] = {
//                         sampleIndex,
//                         class: className,
//                         data: []
//                     };
//                 }
//
//                 if (!classCounts[className]) {
//                     classCounts[className] = 0;
//                 }
//                 classCounts[className]++;
//
//                 const sensorData = {};
//                 sensorDataHeaders.forEach(header => {
//                     sensorData[header] = row[header];
//                 });
//
//                 samples[sampleIndex].data.push({
//                     timestamp: row['DATETIME'],
//                     sensorData: sensorData
//                 });
//             })
//             .on('end', () => {
//                 resolve({ samples: Object.values(samples), classCounts });
//             })
//             .on('error', (error) => {
//                 reject(error);
//             });
//     });
// }


// export const processCSVData = (csvData) => {
//   const samples = {};
//
//   // Split data into samples based on 'sample number'
//   csvData.forEach(row => {
//     const sampleNum = row['SAMPLE_INDEX'];
//     if (!samples[sampleNum]) {
//       samples[sampleNum] = [];
//     }
//     samples[sampleNum].push(row);
//   });
//
//   // For each sample, group data by 'class name'
//   const samplesWithClassGroups = {};
//   Object.keys(samples).forEach(sampleNum => {
//     const sampleData = samples[sampleNum];
//     const classGroups = {};
//
//     sampleData.forEach(row => {
//       const className = row['CLASS_NAME'];
//       if (!classGroups[className]) {
//         classGroups[className] = [];
//       }
//       classGroups[className].push(row);
//     });
//
//     samplesWithClassGroups[sampleNum] = classGroups;
//   });
//
//   return samplesWithClassGroups;
// };