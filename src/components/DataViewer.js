import React from 'react';

const DataViewer = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data selected or available for display.</p>;
  }

  return (
    <div>
      <h3>Selected Sensor Data:</h3>
      <ul>
        {data.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataViewer;