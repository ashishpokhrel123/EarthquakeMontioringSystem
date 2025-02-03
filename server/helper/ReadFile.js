const fs = require("fs").promises;
const path = require("path");
const ApiError = require("../utils/Error/ApiError");
const httpStatus = require("http-status");

const isValidDates = (dates) => {
  const year = parseInt(dates.substring(0, 4), 10);
  const month = parseInt(dates.substring(4, 6), 10);
  const day = parseInt(dates.substring(6, 8), 10);

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  return !isNaN(Date.parse(`${year}-${month}-${day}`));
};

const LoadData = async (inputFile) => {
  try {
    const getFilePath = path.resolve(__dirname, inputFile);
    const data = await fs.readFile(getFilePath, "utf-8");
    const regex = /\d{8}/g;
    const dates = data.match(regex);

    const values = data
      .split(/\d{8}/g)
      .filter((x) => x !== "" || x < 0)
      .map((x) =>
        x
          .trim()
          .split(" ")
          .map((y) => y)
      );

    const result = dates
      .map((date, index) => {
        /* Validate Dates which have more than 12 months and 31 days */
        if (!isValidDates(date)) {
          return null;
        }
        /* ignore if reading frequency  have negative value */
        let validReadingFrequency;

        if (Array.isArray(values[index])) {
          const negativeIndex = values[index].findIndex((value) => value < 0);
          validReadingFrequency =
            negativeIndex !== -1
              ? values[index].slice(0, negativeIndex)
              : values[index];
        } else {
          validReadingFrequency = values[index] < 0 ? [] : [values[index]];
        }

        /* return valid earthquake readings */
        return {
          date: `${date.substring(0, 4)}-${date.substring(
            4,
            6
          )}-${date.substring(6, 8)}`,
          values: validReadingFrequency,
        };
      })
      .filter(Boolean);

    return result;
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Unable to process data"
    );
  }
};

module.exports = { LoadData };
