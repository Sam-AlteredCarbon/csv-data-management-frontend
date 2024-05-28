import React, { useState, useEffect } from 'react';

const TransformationSelector = ({ data, setTransformedData }) => {
    const [availableTransformations, setAvailableTransformations] = useState([]);
    const [selectedTransformation, setSelectedTransformation] = useState('');

    useEffect(() => {
        const fetchTransformations = async () => {
            try {
                const response = await fetch('http://localhost:5000/available_transformations');
                const transformations = await response.json();
                setAvailableTransformations(transformations);
            } catch (error) {
                console.error('Error fetching transformations:', error);
            }
        };

        fetchTransformations();
    }, []);

    const handleTransformationChange = (e) => {
        setSelectedTransformation(e.target.value);
    };

    const applyTransformation = async () => {
        if (!data || data.length === 0 || !selectedTransformation) return;

        const timestamps = data.map(entry => entry.timestamp);
        const values = data.map(entry => entry.value);

        try {
            const response = await fetch('http://localhost:5000/transform', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transformation: selectedTransformation, data: values, datetime: timestamps })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const transformedResponse = await response.json();
            const transformedData = transformedResponse.result.map((value, index) => ({
                timestamp: transformedResponse.datetime[index],
                value
            }));

            setTransformedData(transformedData);
        } catch (error) {
            console.error('Error applying transformation:', error);
        }
    };

    const clearTransformation = () => {
        setTransformedData([]);
        setSelectedTransformation('');
    };

    return (
        <div className="transformation-selector">
            <label htmlFor="transformation-select">Select Transformation:</label>
            <select id="transformation-select" value={selectedTransformation} onChange={handleTransformationChange}>
                <option value="">--Select Transformation--</option>
                {availableTransformations.map(transformation => (
                    <option key={transformation} value={transformation}>
                        {transformation}
                    </option>
                ))}
            </select>
            <button onClick={applyTransformation}>Apply</button>
            <button onClick={clearTransformation}>Clear</button>
        </div>
    );
};

export default TransformationSelector;