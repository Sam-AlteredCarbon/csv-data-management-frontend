import Papa from 'papaparse';

// Function to verify CSV file
export const verifyCSV = (file, setErrors) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const columns = results.meta.fields;
        const requiredColumns = ['DATETIME',  'CLASS_NAME', 'SAMPLE_INDEX'];

        // Check for required columns
        const hasAllColumns = requiredColumns.every(column => columns.includes(column));
        if (!hasAllColumns) {
          const missingColumns = requiredColumns.filter(column => !columns.includes(column));
          setErrors(`Missing required columns: ${missingColumns.join(', ')}`);
          reject(new Error(`Missing required columns: ${missingColumns.join(', ')}`));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => {
        setErrors(`Error parsing file: ${error.message}`);
        reject(error);
      }
    });
  });
};