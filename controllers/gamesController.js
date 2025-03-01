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

exports.gameGet = (req, res) => {
     res.render('game', {
          title: 'Game',
     });
}
