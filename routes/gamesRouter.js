const { Router } = require('express');

const gamesRouter = Router();
const gamesController = require('../controllers/gamesController');



gamesRouter.get("/", gamesController.gameListGet);

gamesRouter.get("/new", gamesController.gameCreateGet);
gamesRouter.post("/new", gamesController.gameCreatePost);
gamesRouter.get("/:id", gamesController.gameGet);
gamesRouter.get("/:id/modify", gamesController.gameUpdateGet);
gamesRouter.post("/:id/modify", gamesController.gameUpdatePost);


gamesRouter.get("/:id/monsters", gamesController.gameMonsterListGet);
gamesRouter.get("/:id/monsters/new", gamesController.monsterCreateGet);
gamesRouter.post("/:id/monsters/new", gamesController.monsterCreatePost);

gamesRouter.get("/:id/monsters/:monster_id", gamesController.monsterGet);
gamesRouter.get("/monsters/:monster_id", gamesController.monsterGet);

gamesRouter.get("/:id/monsters/:monster_id/modify", gamesController.monsterUpdateGet);
gamesRouter.post("/:id/monsters/:monster_id/modify", gamesController.monsterUpdatePost);
gamesRouter.get("/monsters/:monster_id/modify", gamesController.monsterUpdateGet);
gamesRouter.post("/monsters/:monster_id/modify", gamesController.monsterUpdatePost);

gamesRouter.get("/:id/monsters/:monster_id/delete", gamesController.monsterDeleteGet);
gamesRouter.post("/:id/monsters/:monster_id/delete", gamesController.monsterDeletePost);
gamesRouter.get("/monsters/:monster_id/delete", gamesController.monsterDeleteGet);
gamesRouter.post("/monsters/:monster_id/delete", gamesController.monsterDeletePost);


gamesRouter.get("/:id/locations", gamesController.gameLocationListGet);
gamesRouter.get("/:id/locations/new", gamesController.locationCreateGet);
gamesRouter.post("/:id/locations/new", gamesController.locationCreatePost);

gamesRouter.get("/:id/locations/:location_id", gamesController.locationGet);
gamesRouter.get("/locations/:location_id", gamesController.locationGet);

gamesRouter.get("/:id/locations/:location_id/modify", gamesController.locationUpdateGet);
gamesRouter.post("/:id/locations/:location_id/modify", gamesController.locationUpdatePost);
gamesRouter.get("/locations/:location_id/modify", gamesController.locationUpdateGet);
gamesRouter.post("/locations/:location_id/modify", gamesController.locationUpdatePost);

gamesRouter.get("/:id/locations/:location_id/delete", gamesController.locationDeleteGet);
gamesRouter.post("/:id/locations/:location_id/delete", gamesController.locationDeletePost);
gamesRouter.get("/locations/:location_id/delete", gamesController.locationDeleteGet);
gamesRouter.post("/locations/:location_id/delete", gamesController.locationDeletePost);



module.exports = gamesRouter;

