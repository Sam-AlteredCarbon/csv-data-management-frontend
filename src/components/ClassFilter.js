import React from 'react';

const ClassFilter = ({ classCounts, selectedClasses, onClassChange }) => {
    const classOptions = Object.entries(classCounts).map(([className, count]) => (
        <div key={className}>
            <input
                type="checkbox"
                id={className}
                value={className}
                checked={selectedClasses.includes(className)}
                onChange={e => onClassChange(e.target.value)}
            />
            <label htmlFor={className}>{`${className} (${count})`}</label>
        </div>
    ));

    return (
        <div className="class-filter">
            <h3>Filter by Class</h3>
            {classOptions}
        </div>
    );
};

export default ClassFilter;