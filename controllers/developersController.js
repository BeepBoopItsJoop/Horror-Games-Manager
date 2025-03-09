const db = require('../db/queries');

const developerListGet = async (req, res) => {
     const developers = await db.developerList();

     res.render('lists/developerList', {
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

     res.render('lists/developerList', {
          title: 'Developer List',
          developers: developers,
          games: games,
     });
}

const developerCreateGet = async (req, res) => {
     res.render("create/createDeveloper", {
          title: "Create developer",
     });
}

const developerCreatePost = (req, res) => {
     const {name, country} = req.body;
     // TODO: add validation
     // db.addDeveloper({name, country});
     res.redirect("/developers");
}

const developerUpdateGet = async (req, res) => {
     const developer = (await db.developer(req.params.id))[0];
     developer.id = req.params.id;

     
     res.render("update/updateDeveloper", {
          title: `Update ${developer.name}`,
          developer: developer,
     });
}

const developerUpdatePost = async (req, res) => {
     const { name, country, id } = req.body;
     // TODO: add validation
     // await db.updateDeveloper({name, country, id});
     res.redirect(`/developers/${id}`);

}

module.exports = {
     developerListGet,
     developerGet,
     developerCreateGet,
     developerCreatePost,
     developerUpdateGet,
     developerUpdatePost,
};
