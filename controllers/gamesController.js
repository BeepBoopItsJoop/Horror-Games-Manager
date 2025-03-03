const db = require('../db/queries');

exports.gameListGet = async (req, res) => {
     const games = await db.gameList();

     res.render('gameList', {
          title: 'Game list',
          games: games,
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

     console.log(games[0].title);

     res.render('monsterList', {
          title: monsters[0].name,
          gameTitle: games[0].title,
          monsters: monsters,
     });
}
