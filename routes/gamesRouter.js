const { Router } = require('express');

const gamesRouter = Router();
const gamesController = require('../controllers/gamesController');

gamesRouter.get("/", gamesController.gamesListGet);
gamesRouter.get("/:id", gamesController.gameGet);

module.exports = gamesRouter;
