import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useData } from "./Data";

// Function to transform raw data
const transformData = (data) => {
  const groupedData = {};

  data.forEach(entry => {
    const timestamp = new Date(entry[5]).toLocaleTimeString();
    const sensor = entry[9];
    const value = parseFloat(entry[6]);

    if (!groupedData[timestamp]) {
      groupedData[timestamp] = { timestamp };
    }
    groupedData[timestamp][sensor] = value;
  });

  return Object.values(groupedData);
};

const ChartVisualizer = () => {
  // Extract unique sensor IDs dynamically
  const [data, setData] = useData()
  //const dataSlice = data.length > 0 ? [...data.slice(1, 100), ...data.slice(1000, 1100)] : [];
  const dataSlice = data.length > 0 ? data.slice(1) : [];
  const sensors = [...new Set(dataSlice.map(entry => entry[9]))];

  const transformedData = transformData(dataSlice);

  return (
    <ResponsiveContainer width="100%" height={400}>
      {transformedData.length > 0 ? (
        <LineChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          {sensors.map((sensor, index) => (
            <Line 
              key={sensor} 
              type="monotone" 
              dataKey={sensor} 
              stroke={["#8884d8", "#82ca9d", "#ff7300"][index % 3]} // Cycle through colors
              strokeWidth={2} 
              name={sensor} // Legend label
              dot={false}
            />
          ))}
        </LineChart>
      ) : (
        <p>Loading data...</p>
      )}
    </ResponsiveContainer>
  );
};

export default ChartVisualizer;