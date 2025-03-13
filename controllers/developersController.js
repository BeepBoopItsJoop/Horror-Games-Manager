const db = require('../db/queries');

const { body, validationResult } = require("express-validator"); 

const alphaErr = 'must only contain letters';
const nameLengthErr = "must be between 1 and 50 characters.";

const validateDeveloper = [
     body("name").trim()
          .isAlpha().withMessage(`Developer name ${alphaErr}`)
          .isLength({ min: 1, max: 50 }).withMessage(`Developer name ${nameLengthErr}`),
          body("country").trim()
          .isAlpha().withMessage(`Country ${alphaErr}`)
          .isLength({ min: 1, max: 50 }).withMessage(`Country ${nameLengthErr}`),
];

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
          // await db.addDeveloper({name, country});
          res.redirect("/developers");
     }
];

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

const developerDeleteGet = async (req, res) => {
     const developer = (await db.developer(req.params.id))[0];
     developer.id = req.params.id;

     res.render("delete/deleteDeveloper", {
          title: `Delete ${developer.name}`,
          developer: developer,
     });
}

const developerDeletePost = async (req, res) => {
     const id = req.body.id;
     // TODO: add validation
     // await db.deleteDeveloper(id);
     res.redirect(`/../../`);
}

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
