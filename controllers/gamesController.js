const db = require('../db/queries');

exports.gamesListGet = async (req, res) => {
     const games = await db.getGamesList();

     // console.log("games :", games);
     // res.send('ok');
     res.render('gamesList', {
          title: 'Games list',
          games: games,
     });
}

exports.gameGet = async (req, res) => {
     console.log(req.params);
     const game = await db.getGame(req.params.id);

     console.log(game);

     res.render('gamesList', {
          title: game.title,
          games: game,
     });
}
