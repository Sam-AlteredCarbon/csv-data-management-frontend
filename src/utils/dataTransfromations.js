
export const normalizeData = (data) => {
    const values = data.map(item => item.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    return data.map(item => ({
        ...item,
        value: (item.value - min) / (max - min)
    }));
};
