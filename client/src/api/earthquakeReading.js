import axios from "axios";

const API_URL =  "http://127.0.0.1:9797/api" ;

// Daily earthquake reading
export const getDailyEarthquakeReading = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/earthquake/readings-daily`, {
      params: { date },
    });
    return response.data.data; // return the actual data from the response
  } catch (error) {
    throw new Error(`Failed to load daily earthquake reading: ${error.message}`);
  }
};

// Monthly earthquake reading
export const getMonthlyEarthquakeReading = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/earthquake/readings-monthly`, {
      params: { date },
    });
    return response.data.data; 
  } catch (error) {
    throw new Error(`Failed to load monthly earthquake reading: ${error.message}`);
  }
};
