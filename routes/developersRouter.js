const { Router } = require("express");

const developersRouter = Router();
const developersController = require('../controllers/developersController');

developersRouter.get("/", developersController.developerListGet);
developersRouter.get("/:id", developersController.developerGet);

module.exports = developersRouter;
