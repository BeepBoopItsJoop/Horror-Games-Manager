const { Router } = require('express');

const indexRouter = Router();
const gamesRouter = require('./gamesRouter');

const indexController = require('../controllers/indexController');

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/about", indexController.aboutGet);

indexRouter.use("/games", gamesRouter);

module.exports = indexRouter;
