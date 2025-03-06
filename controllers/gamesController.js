const db = require('../db/queries');

exports.gameListGet = async (req, res) => {
     const games = await db.gameList();

     res.render('gameList', {
          title: 'Game list',
          games: games,
          id: req.params.id,
     });
}

exports.gameGet = async (req, res) => {
     const games = await db.game(req.params.id);
     res.render('gameList', {
          title: games[0].title,
          games: games,
     });
}

exports.gameMonsterListGet = async (req, res) => {
     const monsters = await db.gameMonsterList(req.params.id);
     const games = await db.game(req.params.id);

     res.render('monsterList', {
          title: games[0].title,
          gameTitle: games[0].title,
          monsters: monsters,
     });
}

exports.monsterGet = async (req, res) => {
     const monsters = await db.monster(req.params.monster_id);

     res.render('monsterList', {
          title: monsters[0].name,
          monsters: monsters,
     });
}

exports.gameLocationListGet = async (req, res) => {
     const locations = await db.gameLocationList(req.params.id);
     const games = await db.game(req.params.id);

     res.render('locationList', {
          title: games[0].title,
          gameTitle: games[0].title,
          locations: locations,
     });
}

exports.locationGet = async (req, res) => {
     const locations = await db.location(req.params.location_id);

     res.render('locationList', {
          title: locations[0].name,
          locations: locations,
     });
}
