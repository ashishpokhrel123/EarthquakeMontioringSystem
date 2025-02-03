import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { AlertTriangle, AlertOctagon, CheckCircle } from 'lucide-react';
// import { earthquakeData } from '../lib/staticData';

const DANGER_LEVELS = {
  HIGH: 500,
  MEDIUM: 100
};

const getDangerLevel = (frequency) => {
  if (frequency >= DANGER_LEVELS.HIGH) return 'high';
  if (frequency >= DANGER_LEVELS.MEDIUM) return 'medium';
  return 'safe';
};

const DangerLevelIndicator = ({ level }) => {
  switch (level) {
    case 'high':
      return (
        <div className="flex items-center text-red-600">
          <AlertOctagon className="w-5 h-5 mr-1" />
          High Risk
        </div>
      );
    case 'medium':
      return (
        <div className="flex items-center text-yellow-600">
          <AlertTriangle className="w-5 h-5 mr-1" />
          Medium Risk
        </div>
      );
    default:
      return (
        <div className="flex items-center text-green-600">
          <CheckCircle className="w-5 h-5 mr-1" />
          Safe
        </div>
      );
  }
};

export function StatsDisplay() {
  const [date, setDate] = useState('');
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [earthquakeData, setEarthquakeData] = useState([]);
  const [isMonth, setIsMonth] = useState(false);
  const [dangerLevels, setDangerLevels] = useState({ high: 0, medium: 0, safe: 0 });

//   const fetchStats = () => {
//     if (!date) return;

//     let filteredData;
//     if (isMonth) {
//       const [year, month] = date.split('-');
//       filteredData = earthquakeData.filter(reading => {
//         const readingDate = new Date(reading.reading_date);
//         return readingDate.getFullYear() === parseInt(year) && 
//                readingDate.getMonth() === parseInt(month) - 1;
//       });
//     } else {
//       filteredData = earthquakeData.filter(reading => reading.reading_date === date);
//     }

//     if (filteredData.length > 0) {
//       const frequencies = filteredData.map(r => r.frequency);
//       setStats({
//         max_frequency: Math.max(...frequencies),
//         min_frequency: Math.min(...frequencies),
//         reading_count: frequencies.length,
//         reading_date: date
//       });

//       const levels = { high: 0, medium: 0, safe: 0 };
//       frequencies.forEach(freq => {
//         levels[getDangerLevel(freq)]++;
//       });
//       setDangerLevels(levels);

//       const groupedData = filteredData.reduce((acc, curr) => {
//         if (!acc[curr.reading_date]) {
//           acc[curr.reading_date] = [];
//         }
//         acc[curr.reading_date].push(curr.frequency);
//         return acc;
//       }, {});

//       const chartData = Object.entries(groupedData).map(([date, frequencies]) => ({
//         date: format(new Date(date), 'MMM dd'),
//         frequency: frequencies.reduce((a, b) => a + b, 0) / frequencies.length
//       }));

//       setChartData(chartData);
//     } else {
//       setStats(null);
//       setChartData([]);
//       setDangerLevels({ high: 0, medium: 0, safe: 0 });
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, [date, isMonth]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Select Date</h2>
        <input type={isMonth ? 'month' : 'date'} value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      {stats && (
        <div>
          <h3>Max Frequency: {stats.max_frequency} Hz</h3>
          <DangerLevelIndicator level={getDangerLevel(stats.max_frequency)} />
        </div>
      )}
      {chartData.length > 0 && (
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={DANGER_LEVELS.HIGH} stroke="red" label="High Risk" />
          <ReferenceLine y={DANGER_LEVELS.MEDIUM} stroke="orange" label="Medium Risk" />
          <Line type="monotone" dataKey="frequency" stroke="#8884d8" name="Avg Frequency" />
        </LineChart>
      )}
    </div>
  );
}
