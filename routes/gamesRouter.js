const { Router } = require('express');

const InvalidParamError = require('../errors/InvalidParamError');
const gamesRouter = Router();
const gamesController = require('../controllers/gamesController');
const { developer } = require('../db/queries');

gamesRouter.param('id', (req, res, next, id) => {
     if(isNaN(id)) {
          next(new InvalidParamError('ID parameter is invalid', req.originalUrl));
     } else {
          next();
     }
});

gamesRouter.get("/", gamesController.gameListGet);
     
gamesRouter.route('/new')
     .get(gamesController.gameCreateGet)
     .post(gamesController.gameCreatePost);

gamesRouter.get('/:id', gamesController.gameGet)

gamesRouter.route('/:id/modify')
     .get(gamesController.gameUpdateGet)
     .post(gamesController.gameUpdatePost);

gamesRouter.route('/:id/delete')     
     .get(gamesController.gameDeleteGet)
     .post(gamesController.gameDeletePost);

gamesRouter.get("/:id/monsters", gamesController.gameMonsterListGet);
gamesRouter.get("/:id/monsters/new", gamesController.monsterCreateGet);
gamesRouter.post("/:id/monsters/new", gamesController.monsterCreatePost);

gamesRouter.get("/:id/monsters/:monster_id", gamesController.monsterGet);

gamesRouter.get("/:id/monsters/:monster_id/modify", gamesController.monsterUpdateGet);
gamesRouter.post("/:id/monsters/:monster_id/modify", gamesController.monsterUpdatePost);

gamesRouter.get("/:id/monsters/:monster_id/delete", gamesController.monsterDeleteGet);
gamesRouter.post("/:id/monsters/:monster_id/delete", gamesController.monsterDeletePost);


gamesRouter.get("/:id/locations", gamesController.gameLocationListGet);
gamesRouter.get("/:id/locations/new", gamesController.locationCreateGet);
gamesRouter.post("/:id/locations/new", gamesController.locationCreatePost);

gamesRouter.get("/:id/locations/:location_id", gamesController.locationGet);

gamesRouter.get("/:id/locations/:location_id/modify", gamesController.locationUpdateGet);
gamesRouter.post("/:id/locations/:location_id/modify", gamesController.locationUpdatePost);

gamesRouter.get("/:id/locations/:location_id/delete", gamesController.locationDeleteGet);
gamesRouter.post("/:id/locations/:location_id/delete", gamesController.locationDeletePost);

module.exports = gamesRouter;

