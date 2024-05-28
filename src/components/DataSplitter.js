import React, { useState } from 'react';

const DataSplitter = ({ samples, classCounts, setSplitData }) => {
    const [classMapping, setClassMapping] = useState({});
    const [trainSize, setTrainSize] = useState(0.7);
    const [valSize, setValSize] = useState(0.15);
    const [testSize, setTestSize] = useState(0.15);

    const handleClassMappingChange = (className, customClass) => {
        setClassMapping(prevMapping => ({ ...prevMapping, [className]: customClass }));
    };

    const handleSplit = async () => {
        if (trainSize + valSize + testSize !== 1.0) {
            alert("Train, validation, and test sizes must sum to 1.0");
            return;
        }

        const filteredSamples = samples.filter(sample => classMapping[sample.class] !== undefined);
        const mappedSamples = filteredSamples.map(sample => ({
            ...sample,
            class: classMapping[sample.class]
        }));

        try {
            const response = await fetch('http://localhost:5000/split', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ samples: mappedSamples, train_size: trainSize, val_size: valSize, test_size: testSize })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const splitData = await response.json();
            setSplitData(splitData);
        } catch (error) {
            console.error('Error splitting data:', error);
        }
    };

    return (
        <div className="data-splitter">
            <h3>Class Mapping</h3>
            {Object.keys(classCounts).map(className => (
                <div key={className}>
                    <label>
                        {className}:
                        <input
                            type="number"
                            value={classMapping[className] || ''}
                            onChange={(e) => handleClassMappingChange(className, parseInt(e.target.value))}
                        />
                    </label>
                </div>
            ))}
            <h3>Split Ratios</h3>
            <label>
                Train Size:
                <input type="number" value={trainSize} onChange={(e) => setTrainSize(parseFloat(e.target.value))} step="0.01" min="0" max="1" />
            </label>
            <label>
                Validation Size:
                <input type="number" value={valSize} onChange={(e) => setValSize(parseFloat(e.target.value))} step="0.01" min="0" max="1" />
            </label>
            <label>
                Test Size:
                <input type="number" value={testSize} onChange={(e) => setTestSize(parseFloat(e.target.value))} step="0.01" min="0" max="1" />
            </label>
            <button onClick={handleSplit}>Split Data</button>
        </div>
    );
};

export default DataSplitter;