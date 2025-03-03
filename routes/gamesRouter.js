const { Router } = require('express');

const gamesRouter = Router();
const gamesController = require('../controllers/gamesController');

gamesRouter.get("/", gamesController.gameListGet);
gamesRouter.get("/:id", gamesController.gameGet);
gamesRouter.get("/:id/monsters", gamesController.gameMonsterListGet);
// gamesRouter.get("/:id/locations", gamesController.gameGet);

module.exports = gamesRouter;
