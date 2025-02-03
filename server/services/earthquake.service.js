const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ApiError = require("../utils/Error/ApiError");
const httpStatus = require("http-status");
const { convertMonthNumberToName } = require("../helper/monthConvertor");

const addEarthQuakeReading = async (earthquakeData) => {
  const formattedEarthQuakeReading = earthquakeData.flatMap((reading) => {
    return reading.values.map((value) => ({
      date: new Date(`${reading.date}T00:00:00Z`).toISOString(),
      frequency: Number(value),
    }));
  });

  try {
    const existingReadings = await prisma.earthquakeReading.findMany({
      select: { date: true, frequency: true },
    });
    console.log(existingReadings.length);

    let dataToBeInsert;
    if (existingReadings.length === 0) {
      dataToBeInsert = formattedEarthQuakeReading;
    } else {
      dataToBeInsert = formattedEarthQuakeReading.filter((record) =>
        existingReadings.includes(`${record.date}-${record.frequency}`)
      );
    }

    if (dataToBeInsert.length === 0) {
      return "No data found";
    }

    const newEarthQuakeReading = await prisma.earthquakeReading.createMany({
      data: dataToBeInsert.map((read) => ({
        date: read.date,
        frequency: read.frequency,
      })),
      skipDuplicates: true,
    });

    return newEarthQuakeReading;
  } catch (error) {
    throw new ApiError(`500`, "Error adding earthquake data");
  }
};

const fetchEarthQuakeMonthlyReading = async (date) => {
  try {
    const [year, month] = date.split("-");
    

    const startOfMonth = new Date(`${year}-${month}-01T00:00:00Z`);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    const monthlyReadings = await prisma.earthquakeReading.findMany({
      where: {
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
      select: {
        date: true, 
        frequency: true
      },
    });
    
      

    if (monthlyReadings.length === 0) {
      return { year, month, minFrequency: null, maxFrequency: null, count: 0 };
    }

   
    
   
    const frequencies = monthlyReadings.map((reading) => reading.frequency);
    return {
      year,
      date,
      month: convertMonthNumberToName(month),
      minFrequency: Math.min(...frequencies),
      maxFrequency: Math.max(...frequencies),
      frequencies,
      count: frequencies.length,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching earthquake data for the given month');
  }
};

const fetchEarthQuakeDailyReading = async (date) => {
  try {
   const startOfDay = date ? new Date(`${date}T00:00:00Z`) : new Date();

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1); 

    const dailyReadings = await prisma.earthquakeReading.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    if (dailyReadings.length === 0) {
      throw new Error('No readings found for this day');
    }

    const frequencies = dailyReadings.map((reading) => reading.frequency);
    const minFrequency = Math.min(...frequencies);
    const maxFrequency = Math.max(...frequencies);
    const count = frequencies.length;

    return {
      date,
      minFrequency,
      maxFrequency,
      frequencies,
      count,
    };
  } catch (error) {
    if(error) {
        throw new ApiError('404', "No data from thse dates ");
    }
    throw new Error('Error fetching earthquake data for the given day');
  }
};



module.exports = { addEarthQuakeReading, fetchEarthQuakeMonthlyReading, fetchEarthQuakeDailyReading };
