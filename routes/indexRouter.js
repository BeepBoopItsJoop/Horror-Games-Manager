const { Router } = require('express');

const indexRouter = Router();
const gamesRouter = require('./gamesRouter');
const developersRouter = require('./developersRouter');

const indexController = require('../controllers/indexController');

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/about", indexController.aboutGet);

indexRouter.use("/games", gamesRouter);
indexRouter.use("/developers", developersRouter);

module.exports = indexRouter;
