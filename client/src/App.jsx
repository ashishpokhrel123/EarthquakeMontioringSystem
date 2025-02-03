import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomButtom } from "./component/Form/Button";
import StatsCard from "./component/StatsCard";
import EarthQuakeTrendCharts from "./component/EarthQuakeTrendCharts";
import FrequencyCharts from "./component/FrequencyCharts";
import { getDailyEarthquakeReading, getMonthlyEarthquakeReading } from "./api/earthquakeReading";

const getLastSixDates = (type) => {
  const dates = [];
  const today = new Date();

  for (let i = 6; i >= 1; i--) {
    const date = new Date();
    if (type === "daily") {
      date.setDate(today.getDate() - i);
      dates.push(date);
    } else if (type === "monthly") {
      date.setMonth(today.getMonth() - i);
      dates.push(date);
    }
  }

  return dates;
};

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState("daily");
  const [earthquakeData, setEarthquakeData] = useState([]);
  

  useEffect(() => {
    const fetchReading = async () => {
      try {
      const formattedDate = type === "daily"
  ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
  : `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}`; // For monthly format: YYYY-MM


        const response =
          type === "daily"
            ? await getDailyEarthquakeReading(formattedDate)
            : await getMonthlyEarthquakeReading(formattedDate);

        setEarthquakeData(response || null);
      } catch (err) {
        console.error("Failed to fetch reading:", err);
        setEarthquakeData(null);
      }
    };

    fetchReading();
  }, [selectedDate, type]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Earthquake Monitoring System</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 rounded bg-white sm:col-span-2 md:col-span-3"
          >
            <option value="daily">Daily Statistics</option>
            <option value="monthly">Monthly Statistics</option>
          </select>

          <div className="flex gap-4">
            {getLastSixDates(type).map((date, index) => (
              <span
                key={index}
                className="flex items-center justify-center px-3 py-1 bg-white rounded-full text-sm text-center shadow-sm hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => setSelectedDate(new Date(date))}
              >
                {type === "daily"
                  ? date.toLocaleDateString("en-US", { day: "numeric", month: "short" })
                  : `${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`}
              </span>
            ))}

            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select Date"
              className="p-2 border rounded"
              dateFormat={type === "daily" ? "yyyy-MM-dd" : "MMMM yyyy"}
              showMonthYearPicker={type === "monthly"}
            />
            <CustomButtom>Search</CustomButtom>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <StatsCard
              title="Total Earthquakes"
              value={earthquakeData?.count || 0}
              gradient="bg-gradient-to-r from-blue-500 to-indigo-600"
            />
            <StatsCard
              title="Max Frequency"
              value={earthquakeData?.maxFrequency || 0}
              gradient="bg-gradient-to-r from-red-500 to-teal-600"
            />
            <StatsCard
              title="Min Frequency"
              value={earthquakeData?.minFrequency || 0}
              gradient="bg-gradient-to-r from-orange-500 to-red-600"
            />
          </div>

          <EarthQuakeTrendCharts earthquakeData={earthquakeData} />
          <FrequencyCharts earthquakeData={earthquakeData} />
        </div>
      </main>
    </div>
  );
}

export default App;
