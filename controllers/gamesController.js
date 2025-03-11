const db = require('../db/queries');

const gameListGet = async (req, res) => {
     const games = await db.gameList();

     res.render('lists/gameList', {
          title: 'Game list',
          games: games,
          id: req.params.id,
     });
}

const gameGet = async (req, res) => {
     const games = await db.game(req.params.id);
     res.render('lists/gameList', {
          title: games[0].title,
          games: games,
     });
}

const gameUpdateGet = async (req, res) => {
     const game = (await db.game(req.params.id))[0];
     game.id = req.params.id;

     const developers = await db.developerList();

     res.render("update/updateGame", {
          title: `Update ${game.title}`,
          game: game,
          developers: developers,
     });
}

const gameUpdatePost = async (req, res) => {
     const { title, release_date, developer_id, id } = req.body;
     // TODO: add validation
     // await db.updateGame({title, release_date, developer_id, id});
     res.redirect(`/games/${id}`);
}

const gameMonsterListGet = async (req, res) => {
     const monsters = await db.gameMonsterList(req.params.id);
     const games = await db.game(req.params.id);

     res.render('lists/monsterList', {
          title: games[0].title,
          gameTitle: games[0].title,
          monsters: monsters,
     });
}

const monsterGet = async (req, res) => {
     const monsters = await db.monster(req.params.monster_id);

     res.render('lists/monsterList', {
          title: monsters[0].name,
          monsters: monsters,
     });
}

const gameLocationListGet = async (req, res) => {
     const locations = await db.gameLocationList(req.params.id);
     const games = await db.game(req.params.id);

     res.render('lists/locationList', {
          title: games[0].title,
          gameTitle: games[0].title,
          locations: locations,
     });
}

const locationGet = async (req, res) => {
     const locations = await db.location(req.params.location_id);

     res.render('lists/locationList', {
          title: locations[0].name,
          locations: locations,
     });
}

const gameCreateGet = async (req, res) => {
     const developers = await db.developerList();

     res.render("create/createGame", {
          title: "Create game",
          developers: developers
     });
}

const gameCreatePost = async (req, res) => {

     const {title, release_date, developer} = req.body;
     // TODO: add validation
     // await db.addGame({title, release_date, developer});
     res.redirect("/games");

}

const monsterCreateGet = (req, res) => {
     res.render('create/createMonster', {
          title: 'Add a new monster',
          id: req.params.id,
     });
}

const monsterCreatePost = async (req, res) => {
     const {name, description} = req.body;
     const id = req.params.id;
     // TODO: add validation
     // await db.addMonster({name, description, id});
     res.redirect(`/games/${id}/monsters`);
}

const locationCreateGet = (req, res) => {
     res.render('create/createLocation', {
          title: 'Add a new location',
          id: req.params.id,
     });
}

const locationCreatePost = async (req, res) => {
     const {name, description} = req.body;
     const id = req.params.id;
     // TODO: add validation
     // await db.addLocation({name, description, id});
     res.redirect(`/games/${id}/locations`);
}

const monsterUpdateGet = async (req,res) => {
     const monster = (await db.monster(req.params.monster_id))[0];
     monster.id = req.params.monster_id;

     res.render("update/updateMonster", {
          title: `Update ${monster.name}`,
          monster: monster,
     });
}

const monsterUpdatePost = async (req,res) => {
     const { name, description, id } = req.body;
     // TODO: add validation
     // await db.updateMonster({name, description, id});
     res.redirect(`/games/monsters/${id}`);
}

const locationUpdateGet = async (req, res) => {
     const location = (await db.location(req.params.location_id))[0];
     location.id = req.params.location_id;

     res.render("update/updateLocation", {
          title: `Update ${location.name}`,
          location: location,
     });
}

const locationUpdatePost = async (req, res) => {
     const { name, description, id } = req.body;
     // TODO: add validation
     await db.updateLocation({name, description, id});
     res.redirect(`/games/locations/${id}`);
}

const monsterDeleteGet = async (req, res) => {
     const monster = (await db.monster(req.params.monster_id))[0];
     monster.id = req.params.monster_id;

     res.render("delete/deleteMonster", {
          title: `Delete ${monster.name}`,
          monster: monster,
     });
}

const monsterDeletePost = async (req, res) => {
     const id = req.body.id;
     await db.deleteMonster(id);
     res.redirect(`/../..`);
}

const locationDeleteGet = async (req, res) => {
     const location = (await db.location(req.params.location_id))[0];
     location.id = req.params.location_id;

     res.render("delete/deleteLocation", {
          title: `Delete ${location.name}`,
          monster: location,
     });
}

const locationDeletePost = async (req, res) => {
     const id = req.body.id;
     // await db.deleteLocation(id);
     res.redirect(`/../..`);
}

module.exports = {
     gameGet,
     monsterGet,
     locationGet,

     gameListGet,
     gameMonsterListGet,
     gameLocationListGet,

     gameCreateGet,
     gameCreatePost,
     monsterCreateGet,
     monsterCreatePost,
     locationCreateGet,
     locationCreatePost,

     gameUpdateGet,
     gameUpdatePost,
     monsterUpdateGet,
     monsterUpdatePost,
     locationUpdateGet,
     locationUpdatePost,

     monsterDeleteGet,
     monsterDeletePost,
     locationDeleteGet,
     locationDeletePost,
};
