const db = require('../db/queries');

exports.developerListGet = async (req, res) => {
     const developers = await db.developerList();

     res.render('developerList', {
          title: 'Developer List',
          developers: developers,
          id: req.params.id,
     });
};

exports.developerGet = async(req, res) => {
     const developers = await db.developer(req.params.id);

     res.render('developerList', {
          title: 'Developer List',
          developers: developers,
     });
}
