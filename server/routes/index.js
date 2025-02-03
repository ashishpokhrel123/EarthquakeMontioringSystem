const express = require("express");
const earthquakeRoute = require("./earthquake.route");

const router = express.Router();
const defaultRoutes = [
  {
    path: "/earthquake",
    route: earthquakeRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
