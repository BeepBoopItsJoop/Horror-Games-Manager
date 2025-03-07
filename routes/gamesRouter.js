const { Router } = require('express');

const gamesRouter = Router();
const gamesController = require('../controllers/gamesController');

gamesRouter.get("/", gamesController.gameListGet);

gamesRouter.get("/new", gamesController.gameCreateGet);
gamesRouter.post("/new", gamesController.gameCreatePost);
gamesRouter.get("/:id", gamesController.gameGet);

gamesRouter.get("/:id/monsters", gamesController.gameMonsterListGet);
gamesRouter.get("/:id/monsters/:monster_id", gamesController.monsterGet);
gamesRouter.get("/monsters/:monster_id", gamesController.monsterGet);

gamesRouter.get("/:id/locations", gamesController.gameLocationListGet);
gamesRouter.get("/:id/locations/:location_id", gamesController.locationGet);
gamesRouter.get("/locations/:location_id", gamesController.locationGet);


module.exports = gamesRouter;

