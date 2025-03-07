const db = require('../db/queries');

const developerListGet = async (req, res) => {
     const developers = await db.developerList();

     res.render('developerList', {
          title: 'Developer List',
          developers: developers,
          id: req.params.id,
     });
}

const developerGet = async (req, res) => {
     const developers = await db.developer(req.params.id);
     let games = null;
     if (developers.length === 1) {
          games = await db.developerGameList(req.params.id);
     }     

     res.render('developerList', {
          title: 'Developer List',
          developers: developers,
          games: games,
     });
}

module.exports = {
     developerListGet,
     developerGet,
};
