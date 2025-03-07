const { Router } = require("express");

const developersRouter = Router();
const developersController = require('../controllers/developersController');

developersRouter.get("/", developersController.developerListGet);
developersRouter.get("/new", developersController.developerCreateGet);
developersRouter.post("/new", developersController.developerCreatePost);
developersRouter.get("/:id", developersController.developerGet);

module.exports = developersRouter;
