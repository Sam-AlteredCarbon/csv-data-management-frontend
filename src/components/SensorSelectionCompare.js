import React, { useState } from 'react';
import './SensorSelectionCompare.css'; // Assume you have some basic styling in this CSS file

const SensorSelectionCompare = ({ samples, onSelectSensor }) => {
  const [selectedSample1, setSelectedSample1] = useState('');
  const [selectedSensor1, setSelectedSensor1] = useState('');
  const [selectedSample2, setSelectedSample2] = useState('');
  const [selectedSensor2, setSelectedSensor2] = useState('');

  const handleSampleChange1 = (event) => {
    setSelectedSample1(event.target.value);
    setSelectedSensor1('');
  };

  const handleSensorChange1 = (event) => {
    setSelectedSensor1(event.target.value);
    onSelectSensor(selectedSample1, event.target.value, 1);
  };

  const handleSampleChange2 = (event) => {
    setSelectedSample2(event.target.value);
    setSelectedSensor2('');
  };

  const handleSensorChange2 = (event) => {
    setSelectedSensor2(event.target.value);
    onSelectSensor(selectedSample2, event.target.value, 2);
  };

  return (
      <div className="selection-container">
          <div className="selection-group">
              <h3>Select First Sample and Sensor:</h3>
              <select value={selectedSample1} onChange={handleSampleChange1}>
                  <option value="">Select Sample</option>
                  {Object.keys(samples).map(sample => (
                      <option key={sample} value={sample}>{sample}</option>
                  ))}
              </select>
              <select value={selectedSensor1} onChange={handleSensorChange1} disabled={!selectedSample1}>
                  <option value="">Select Sensor</option>
                  {selectedSample1 && Object.keys(samples[selectedSample1].data[0]).map(sensor => (
                      <option key={sensor} value={sensor}>{sensor}</option>
                  ))}
              </select>
          </div>

          <div className="selection-group">
              <h3>Select Second Sample and Sensor:</h3>
              <select value={selectedSample2} onChange={handleSampleChange2}>
                  <option value="">Select Sample</option>
                  {Object.keys(samples).map(sample => (
                      <option key={sample} value={sample}>{sample}</option>
                  ))}
              </select>
              <select value={selectedSensor2} onChange={handleSensorChange2} disabled={!selectedSample2}>
                  <option value="">Select Sensor</option>
                  {selectedSample2 && Object.keys(samples[selectedSample2].data[0]).map(sensor => (
                      <option key={sensor} value={sensor}>{sensor}</option>
                  ))}
              </select>
          </div>
      </div>
      // <div>
      //   <h3>Select First Sample and Sensor:</h3>
      //   <select value={selectedSample1} onChange={handleSampleChange1}>
      //     <option value="">Select Sample</option>
      //     {Object.keys(samples).map(sample => (
      //       <option key={sample} value={sample}>{sample}</option>
      //     ))}
      //   </select>
      //   <select value={selectedSensor1} onChange={handleSensorChange1} disabled={!selectedSample1}>
      //     <option value="">Select Sensor</option>
      //     {selectedSample1 && Object.keys(samples[selectedSample1].data[0]).map(sensor => (
      //       <option key={sensor} value={sensor}>{sensor}</option>
      //     ))}
      //   </select>
      //
      //   <h3>Select Second Sample and Sensor:</h3>
      //   <select value={selectedSample2} onChange={handleSampleChange2}>
      //     <option value="">Select Sample</option>
      //     {Object.keys(samples).map(sample => (
      //       <option key={sample} value={sample}>{sample}</option>
      //     ))}
      //   </select>
      //   <select value={selectedSensor2} onChange={handleSensorChange2} disabled={!selectedSample2}>
      //     <option value="">Select Sensor</option>
      //     {selectedSample2 && Object.keys(samples[selectedSample2].data[0]).map(sensor => (
      //       <option key={sensor} value={sensor}>{sensor}</option>
      //     ))}
      //   </select>
      // </div>
  );
};

export default SensorSelectionCompare;