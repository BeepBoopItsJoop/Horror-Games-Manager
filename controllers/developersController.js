const db = require('../db/queries');

const { validationResult } = require("express-validator"); 
const { validateDeveloper } = require('../validators/validator');

const developerListGet = async (req, res) => {
     const developers = await db.developerList();

     res.render('lists/developerList', {
          title: 'Developer List',
          developers: developers,
     });
}

const developerGet = async (req, res) => {
     const developers = await db.developer(req.params.id);
     let games = undefined;
     if (developers.length === 1) {
          games = await db.developerGameList(req.params.id);
     }     

     res.render('lists/developerList', {
          title: developers[0].name,
          developers: developers,
          games: games,
     });
}

const developerCreateGet = (req, res) => {
     res.render("create/createDeveloper", {
          title: "Create developer",
     });
}

const developerCreatePost = [
     validateDeveloper,
     async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).render("create/createDeveloper", {
                    title: "Create developer",
                    errors: errors.array(),
               });
          }

          const {name, country} = req.body;
          await db.addDeveloper({name, country});
          res.redirect("/developers");
     }
];

const developerUpdateGet = async (req, res) => {
     const developer = (await db.developer(req.params.id))[0];

     res.render("update/updateDeveloper", {
          title: `Update ${developer.name}`,
          developer: developer,
     });
}

const developerUpdatePost = [
     validateDeveloper,
     // TODO: Check if user has rights to update
     async (req, res) => {
          const id = req.params.id;

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               const developer = (await db.developer(id))[0];
               
               return res.status(400).render("update/updateDeveloper", {
                    title: `Update ${developer.name}`,
                    errors: errors.array(),
                    developer: developer,
               });
          }

          const { name, country } = req.body;
          await db.updateDeveloper({name, country, id});
          res.redirect(`/developers/${id}`);
     }
];

const developerDeleteGet = async (req, res) => {
     const developer = (await db.developer(req.params.id))[0];

     res.render("delete/deleteDeveloper", {
          title: `Delete ${developer.name}`,
          developer: developer,
     });
}

const developerDeletePost = [
     // TODO: Check if user has right to delete
     async (req, res) => {
          const id = req.params.id;

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               const developer = (await db.developer(id))[0];

               return res.status(400).render("delete/deleteDeveloper", {
                    title: `Delete ${developer.name}`,
                    errors: errors.array(),
                    developer: developer,
               });
          }

          await db.deleteDeveloper(id);
          res.redirect(`/developers/`);
     }
];

module.exports = {
     developerListGet,
     developerGet,
     developerCreateGet,
     developerCreatePost,
     developerUpdateGet,
     developerUpdatePost,
     developerDeleteGet,
     developerDeletePost,
};
