const db = require('../db/queries');

const gameListGet = async (req, res) => {
     const games = await db.gameList();

     res.render('gameList', {
          title: 'Game list',
          games: games,
          id: req.params.id,
     });
}

const gameGet = async (req, res) => {
     const games = await db.game(req.params.id);
     res.render('gameList', {
          title: games[0].title,
          games: games,
     });
}

const gameMonsterListGet = async (req, res) => {
     const monsters = await db.gameMonsterList(req.params.id);
     const games = await db.game(req.params.id);

     res.render('monsterList', {
          title: games[0].title,
          gameTitle: games[0].title,
          monsters: monsters,
     });
}

const monsterGet = async (req, res) => {
     const monsters = await db.monster(req.params.monster_id);

     res.render('monsterList', {
          title: monsters[0].name,
          monsters: monsters,
     });
}

const gameLocationListGet = async (req, res) => {
     const locations = await db.gameLocationList(req.params.id);
     const games = await db.game(req.params.id);

     res.render('locationList', {
          title: games[0].title,
          gameTitle: games[0].title,
          locations: locations,
     });
}

const locationGet = async (req, res) => {
     const locations = await db.location(req.params.location_id);

     res.render('locationList', {
          title: locations[0].name,
          locations: locations,
     });
}

const gameCreateGet = async (req, res) => {
     const developers = await db.developerList();

     res.render("createGame", {
          title: "Create game",
          developers: developers
     });
}

const gameCreatePost = (req, res) => {

     const {title, release_date, developer} = req.body;
     // TODO: add validation
     // db.addGame({title, release_date, developer});
     res.redirect("/games");

}

const monsterCreateGet = (req, res) => {
     res.render('createMonster', {
          title: 'Add a new monster',
          id: req.params.id,
     });
}

const monsterCreatePost = (req, res) => {
     const {name, description} = req.body;
     const id = req.params.id;
     // TODO: add validation
     // db.addMonster({name, description, id});
     res.redirect(`/games/${id}/monsters`);
}

module.exports = {
     gameListGet,
     gameGet,
     gameMonsterListGet,
     monsterGet,
     gameLocationListGet,
     locationGet,
     gameCreateGet,
     gameCreatePost,
     monsterCreateGet,
     monsterCreatePost,
};
