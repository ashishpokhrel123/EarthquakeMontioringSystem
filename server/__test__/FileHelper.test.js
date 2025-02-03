const { LoadData } = require("../helper/ReadFile");
const fs = require("fs");

jest.mock("fs", () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

describe("LoadData Function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should correctly parse valid dataset", async () => {
    const mockData = "20240101 1.2 2.3 3.4\n20240102 4.5 5.6 6.7\n";
    fs.promises.readFile.mockResolvedValue(mockData);

    const result = await LoadData("input.txt");

    expect(result).toEqual([
      {
        date: "2024-01-01",
        values: ["1.2", "2.3", "3.4"],
      },
      {
        date: "2024-01-02",
        values: ["4.5", "5.6", "6.7"],
      },
    ]);
  });

  it("should handle invalid dates correctly", async () => {
    const mockData = "20241301 1.2 2.3 3.4\n20240230 4.5 5.6 6.7\n";
    fs.promises.readFile.mockResolvedValue(mockData);

    const result = await LoadData("input.txt");

    expect(result).toEqual([
      {
        date: "2024-02-30",
        values: ["4.5", "5.6", "6.7"],
      },
    ]);
  });

  it("should ignore negative frequency in reading", async() => {
    const mockData = "20240101 1.2 2.3 -3.4 4.5\n20240102 -4.5 5.6 6.7\n";
     fs.promises.readFile.mockResolvedValue(mockData);

    const result = await LoadData("input.txt");
    expect(result).toEqual([
      {
        date: "2024-01-01",
        values: ["1.2", "2.3"],
      },
      {
        date: "2024-01-02",
        values: [],
      },
      
    ]);
  })
});
