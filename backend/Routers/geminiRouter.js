const express = require("express");
const { geminiController } = require("../Controllers/geminiControllers");

const geminiRouter = express.Router();

geminiRouter.get("/response/:roadmap/:title", geminiController);

module.exports = geminiRouter;
