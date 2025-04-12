const db = require('../db/queries');

const asyncHandler = require('express-async-handler');
const NotFoundError = require('../errors/NotFoundError');

const { validationResult } = require("express-validator"); 
const { validateDeveloper } = require('../validators/validator');

const devNotFoundMessage = 'Developer not found';

const developerListGet = asyncHandler(async (req, res) => {
     const developers = await db.developerList();
     if(!developers) {
          throw new NotFoundError("No developers found", req.originalUrl);
     }

     res.render('list', {
          type: 'developer',
          title: 'Developer List',
          items: developers,
          breadcrumbs: '/developers/',
     });
})

const developerGet = asyncHandler(async (req, res) => {
     const developer = await db.developer(req.params.id);
     const games = await db.developerGameList(req.params.id);

     if(!developer) {
          throw new NotFoundError(devNotFoundMessage, req.originalUrl);
     }
     if(!games) {
          throw new NotFoundError('Games list of developers not found', req.originalUrl);
     }

     res.render('developerPage', {
          title: developer.name,
          item: developer,
          games: games,
          breadcrumbs: '/developers/', 
     });
})

const developerCreateGet = (req, res) => {
     res.render("createPage", {
          title: "Add a new developer",
          type: 'developer',
          breadcrumbs: '/developers/',
     });
}

const developerCreatePost = [
     validateDeveloper,
     asyncHandler(async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).render("createPage", {
                    title: "Add a new developer",
                    type: 'developer',
                    breadcrumbs: '/developers/',
                    // Failed validation, preserve user input and give feedback errors
                    item: req.body,
                    errors: errors.array(),
               });
          }

          const {name, country} = req.body;
          await db.addDeveloper({name, country});
          res.redirect("/developers");
     })
];

const developerUpdateGet = asyncHandler(async (req, res) => {
     const developer = await db.developer(req.params.id);
     if(!developer) {
          throw new NotFoundError(devNotFoundMessage, req.originalUrl);
     }

     res.render("modifyPage", {
          title: `Update ${developer.name}`,
          type: 'developer',
          breadcrumbs: `/developers/${developer.id}/`,
          item: developer,
     });
})

const developerUpdatePost = [
     validateDeveloper,
     // TODO: Check if user has rights to update
     asyncHandler(async (req, res) => {
          const id = req.params.id;

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               const developer = await db.developer(id);
               if(!developer) {
                    throw new NotFoundError(devNotFoundMessage, req.originalUrl);
               }
               
               return res.status(400).render("modifyPage", {
                    title: `Update ${developer.name}`,
                    type: 'developer',
                    breadcrumbs: `/developers/${developer.id}/`,
                    // Failed validation, preserve user input and give feedback errors
                    item: req.body,
                    errors: errors.array(),
               });
          }

          const { name, country } = req.body;
          await db.updateDeveloper({name, country, id});
          res.redirect(`/developers/${id}`);
     })
];

const developerDeleteGet = asyncHandler(async (req, res) => {
     const developer = await db.developer(req.params.id);
     if(!developer) {
          throw new NotFoundError(devNotFoundMessage, req.originalUrl);
     }

     res.render("deletePage", {
          title: `Delete ${developer.name}`,
          name: developer.name,
          breadcrumbs: `/developers/${developer.id}/`,
     });
})

const developerDeletePost = asyncHandler(async (req, res) => {
     // TODO: Check if user has right to delete
     const id = req.params.id;

     // (Not sure) Prevent sending delete request to an unexisting entry
     const developer = await db.developer(id);
     if(!developer) {
          throw new NotFoundError(devNotFoundMessage, req.originalUrl);
     }

     await db.deleteDeveloper(id);
     res.redirect(`/developers/`);
});

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
