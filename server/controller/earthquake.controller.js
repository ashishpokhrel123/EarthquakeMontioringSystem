const httpStatus = require("http-status");
const EarthQuakeService = require("../services/earthquake.service");
const catchAsync = require("../utils/Error/catchAsync");
const { LoadData } = require("../helper/ReadFile");


const saveEarthQuakeReading = catchAsync(async (req, res) => {
  const file = "/home/ashish/Documents/office/full-stack-take-away-assignment/server/inputs/readings.txt"
  const earthquakeData = await LoadData(file);
  const earthquakeReading = await EarthQuakeService.addEarthQuakeReading(earthquakeData);
  res.status(201).send({message:"Data saved to database", data: earthquakeReading});
});

const getMonthlyEarthQuakeReading = catchAsync(async (req, res) => {
  const { date } = req.query;
  const earthquakeReading = await EarthQuakeService.fetchEarthQuakeMonthlyReading(date);
  res.status(200).send({message:"Fetch Earthqukae monthly data", data: earthquakeReading});
});

const getDailyEarthQuakeReading = catchAsync(async (req, res) => {
  console.log(req.query)
    const { date } = req.query;
  const earthquakeReading = await EarthQuakeService.fetchEarthQuakeDailyReading(date);
  res.status(200).send({message:"Fetch Earthqukae monthly data", data: earthquakeReading});
});

module.exports = {
  saveEarthQuakeReading,
  getMonthlyEarthQuakeReading,
  getDailyEarthQuakeReading
};