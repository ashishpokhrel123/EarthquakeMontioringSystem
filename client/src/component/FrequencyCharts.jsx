import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


function FrequencyCharts({earthquakeData}) {
   if (!earthquakeData || !earthquakeData.frequencies || earthquakeData.frequencies.length === 0) {
    return (
      <div className="shadow-lg p-4 bg-white rounded-lg">
        <h2 className="text-lg font-semibold mb-2">EarthQuake Frequency</h2>
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
    <div className="shadow-lg p-4 bg-white rounded-lg">
         
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={formattedData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
       
          
        </div>
  )
}

export default FrequencyCharts
