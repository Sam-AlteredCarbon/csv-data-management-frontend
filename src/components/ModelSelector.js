import React, { useState, useEffect } from 'react';

const ModelSelector = ({ onModelSubmit }) => {
    const [availableModels, setAvailableModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [parameters, setParameters] = useState({});

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:5000/available_models');
                const models = await response.json();
                setAvailableModels(models);
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        fetchModels();
    }, []);

    const handleModelChange = async (e) => {
        setSelectedModel(e.target.value);
        try {
            const response = await fetch(`http://localhost:5000/model_parameters?model=${e.target.value}`);
            const params = await response.json();
            setParameters(params);
        } catch (error) {
            console.error('Error fetching model parameters:', error);
        }
    };

    const handleParameterChange = (e) => {
        const { name, value } = e.target;
        setParameters(prevParams => ({ ...prevParams, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onModelSubmit(selectedModel, parameters);
    };

    return (
        <div className="model-selector">
            <label htmlFor="model-select">Select Model:</label>
            <select id="model-select" onChange={handleModelChange}>
                <option value="">--Select Model--</option>
                {availableModels.map(model => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>
            {Object.keys(parameters).length > 0 && (
                <form onSubmit={handleSubmit}>
                    {Object.keys(parameters).map(param => (
                        <div key={param}>
                            <label htmlFor={param}>{param}:</label>
                            <input
                                type="text"
                                id={param}
                                name={param}
                                value={parameters[param]}
                                onChange={handleParameterChange}
                            />
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default ModelSelector;