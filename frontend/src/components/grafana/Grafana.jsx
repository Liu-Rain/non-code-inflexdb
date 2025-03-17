import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample raw data with multiple sensors

const rawData = [
    ["", "_result", "0", "2025-03-15T06:08:10.633363262Z", "2025-03-17T06:08:10.633363262Z", "2025-03-17T00:58:38Z", "0.4987", "co", "airSensors", "TLM0100"],
    ["", "_result", "0", "2025-03-15T06:08:10.633363262Z", "2025-03-17T06:08:10.633363262Z", "2025-03-17T01:58:38Z", "0.5123", "co", "airSensors", "TLM0100"],
    ["", "_result", "0", "2025-03-15T06:08:10.633363262Z", "2025-03-17T06:08:10.633363262Z", "2025-03-17T02:58:38Z", "0.5234", "co", "airSensors", "TLM0100"],
    ["", "_result", "0", "2025-03-15T06:08:10.633363262Z", "2025-03-17T06:08:10.633363262Z", "2025-03-17T00:58:38Z", "0.3987", "no2", "airSensors", "TLM0101"],
    ["", "_result", "0", "2025-03-15T06:08:10.633363262Z", "2025-03-17T06:08:10.633363262Z", "2025-03-17T01:58:38Z", "0.4223", "no2", "airSensors", "TLM0101"],
    ["", "_result", "0", "2025-03-15T06:08:10.633363262Z", "2025-03-17T06:08:10.633363262Z", "2025-03-17T02:58:38Z", "0.4374", "no2", "airSensors", "TLM0101"],
  ];

// Function to process data into multiple lines based on the sensor type
const processData = (data) => {
  const groupedData = {};

  data.forEach(entry => {
    const timestamp = new Date(entry[5]).getTime(); // Convert _time to timestamp
    const value = parseFloat(entry[6]); // Convert _value to number
    const sensorType = entry[7]; // Sensor type (e.g., "co", "no2")

    if (!groupedData[sensorType]) {
      groupedData[sensorType] = [];
    }

    groupedData[sensorType].push({ timestamp, value });
  });

  return groupedData;
};

// Function to format timestamps
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
};

// Line colors for differentiation
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000"];

// Line Chart Component
const LineChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" scale="time" type="number" tickFormatter={formatDate} domain={["auto", "auto"]} />
        <YAxis />
        <Tooltip labelFormatter={formatDate} />
        <Legend />

        {Object.keys(data).map((sensor, index) => (
          <Line
            key={sensor}
            data={data[sensor]}
            type="monotone"
            dataKey="value"
            name={sensor.toUpperCase()} // Display sensor name in legend
            stroke={colors[index % colors.length]} // Assign color
            strokeWidth={2}
            dot={{ r: 3 }} // Small dots for visibility
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Main App Component
const Visualizer = ({ data }) => {
    const [processedData, setProcessedData] = useState({});
  
    // Recalculate data when 'data' prop changes
    useEffect(() => {
      if (data) {
        setProcessedData(processData(data));
      }
    }, [data]); // Reacts to changes in `data`
  
    return (
      <div style={{ width: "800px", margin: "auto" }}>
        <h2>Air Sensor Readings</h2>
        <LineChartComponent data={processedData} />
      </div>
    );
  };

export default Visualizer;