const db = require('../db/queries');

const { body, validationResult } = require("express-validator"); 

const alphaErr = 'must only contain letters';
const alphaNumErr = 'must only contain letters or numbers';
const nameLengthErr = "must be between 1 and 50 characters.";
const emptyErr = "is required";
const intErr = "must be an integer (you shouldnt normally get this message)";

const validateDeveloper = [
     body("name").trim()
          .isAlphanumeric('en-US', { ignore: ' .-_\'' }).withMessage(`Developer name ${alphaNumErr}`)
          .isLength({ min: 1, max: 50 }).withMessage(`Developer name ${nameLengthErr}`)   
          .notEmpty().withMessage(`Developer name ${emptyErr}`),
     body("country").trim()
          .isAlpha('en-US', { ignore: ' ' }).withMessage(`Country ${alphaErr}`)
          .isLength({ min: 1, max: 50 }).withMessage(`Country ${nameLengthErr}`)
          .notEmpty().withMessage(`Country ${emptyErr}`)
];

const validateID = [
     body("id").trim().escape()
          .isInt().withMessage(`ID ${intErr}`),
]

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
     validateID,
     // TODO: Validate if user can update
     async (req, res) => {
          const developer = (await db.developer(req.params.id))[0];
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).render("update/updateDeveloper", {
                    title: `Update ${developer.name}`,
                    errors: errors.array(),
                    developer: developer,
               });
          }

          const { name, country, id } = req.body;
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
     // TODO: Validate if user can delete
     validateID,
     async (req, res) => {
          const developer = (await db.developer(req.params.id))[0];
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).render("delete/deleteDeveloper", {
                    title: `Delete ${developer.name}`,
                    errors: errors.array(),
                    developer: developer,
               });
          }

          const id = req.body.id;
          await db.deleteDeveloper(id);
          res.redirect(`/../../`);
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
