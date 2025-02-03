import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function EarthQuakeTrendCharts({ earthquakeData }) {
  if (!earthquakeData || !earthquakeData.frequencies || earthquakeData.frequencies.length === 0) {
    return (
      <div className="shadow-lg p-4 bg-white rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Earthquake Trends</h2>
        <p className="text-center text-gray-500">No data available</p>
      </div>
    );
  }

  // Format data for the chart
  const formattedData = earthquakeData.frequencies.map((count, index) => ({
    date: `${earthquakeData.date}`, 
    count,
  }));

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="shadow-lg p-4 bg-white rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Earthquake Trends</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formattedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EarthQuakeTrendCharts;
