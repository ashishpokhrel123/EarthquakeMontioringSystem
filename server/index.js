const cors = require("cors");
const express = require("express");
const {errorHandler, errorConverter}  = require("./middleware/error.js");
const config = require("./config/keys.js");
const router = require("./routes/index.js");

const PORT = require("./config/keys").port;

const app = express();

app.use(cors());

app.use("/api", router);

// Global error handling
app.use(errorConverter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
