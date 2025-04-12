const db = require('../db/queries');

const asyncHandler = require('express-async-handler');
const NotFoundError = require('../errors/NotFoundError');
const CustomError = require('../errors/CustomError');

const { validationResult } = require("express-validator"); 
const { validateGame, validateMonster, validateLocation } = require('../validators/validator');

const gameListGet = asyncHandler(async (req, res) => {
     const games = await db.gameList();
     if(!games) {
          throw new NotFoundError("No games found", req.originalURL);
     }

     res.render('list', {
          type: 'game',
          title: 'Game list',
          items: games,
          breadcrumbs: '/games/',
     });
})

const gameGet = asyncHandler(async (req, res) => {
     const game = await db.game(req.params.id);

     if(!game) {
          throw new NotFoundError("Game not found", req.originalURL);
     }

     res.render('gamePage', {
          title: game.title,
          item: game,
          breadcrumbs: '/games/',
     });
})

const gameCreateGet = asyncHandler(async (req, res) => {
     const developers = await db.developerList();
     if(!developers) {
          throw new CustomError('Developers not found', 500);
     }

     res.render("createPage", {
          title: "Create game",
          type: 'game',
          breadcrumbs: '/games/',
          developers: developers
     });
})

const gameCreatePost = [
     validateGame,
     asyncHandler(async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               const developers = await db.developerList();
               if(!developers) {
                    throw new CustomError('Developers not found', 500);
               }
               
               return res.status(400).render("createPage", {
                    title: "Create game",
                    type: 'game',
                    breadcrumbs: '/games/',
                    developers: developers,
                    // Failed validation, preserve user input and give feedback errors
                    item: req.body,
                    errors: errors.array(),
               });
          }
          
          const {title, release_date, developer_id} = req.body;
          await db.addGame({title, release_date, developer_id});
          res.redirect("/games");
     })
];

const gameUpdateGet = asyncHandler(async (req, res) => {
// TODO: Check if user has right to delete
     const id = req.params.id

     const game = await db.game(id);
     const developers = await db.developerList();

     if(!game) {
          throw new NotFoundError('Game not found', req.originalUrl);
     }
     if(!developers) {
          throw new CustomError('No developers in database', 500);
     }

     res.render("modifyPage", {
          title: `Update ${game.title}`,
          type: 'game',
          breadcrumbs: `/games/${game.id}/`,
          item: game,
          developers: developers,
     });
})

const gameUpdatePost = [ 
     validateGame,
     async (req, res) => {
          const id = req.params.id;

          const errors = validationResult(req);
          if(!errors.isEmpty()) {
               const game = await db.game(id);
               const developers = await db.developerList();

               if(!game) {
                    throw new NotFoundError('Game not found, req', req.originalUrl)
               }

               return res.status(400).render('modifyPage', {
                    title: `Update ${game.title}`,
                    type: 'game',
                    breadcrumbs: `/games/${game.id}/`,
                    developers: developers,
                    // Failed validation, preserve user input and give feedback errors
                    item: req.body,
                    errors: errors.array(),
               });
          }

          const { title, release_date, developer_id } = req.body;
          await db.updateGame({title, release_date, developer_id, id});
          res.redirect(`/games/${id}`);
     }
];

const gameDeleteGet = asyncHandler(async (req, res) => {
     const game = await(db.game(req.params.id));
     if(!game) {
          throw new NotFoundError('Game not found', req.originalUrl)
     }

     res.render('deletePage', {
          title: `Delete ${game.title}`,
          name: game.title,
          breadcrumbs: `/games/${game.id}/`,
     });
})

const gameDeletePost = asyncHandler(async (req, res) => {
     // TODO: Check if user has right to delete
     const id = req.params.id;

     const game = await db.game(id);
     if(!game) {
          throw new NotFoundError('Game not found', req.originalUrl);
     }

     await db.deleteGame(id);
     res.redirect('/games/');
})

const gameMonsterListGet = asyncHandler(async (req, res) => {
     const monsters = await db.gameMonsterList(req.params.id);
     const game = await db.game(req.params.id);

     if(!game) {
          throw new NotFoundError('Game not found', req.originalUrl);
     }
     
     if(!monsters) {
          throw new NotFoundError('Monster list not found', req.originalUrl)
     }

     res.render('monstersList', {
          type: 'monster',
          title: `${game.title} monsters`,
          items: monsters,
          game: game,
          breadcrumbs: `/games/${game.id}/`,
     });
})

const monsterGet = asyncHandler(async (req, res) => {
     const monster = await db.monster(req.params.monster_id);
     if(!monster) {
          throw new NotFoundError('Monster not found', req.originalUrl);
     }

     res.render('monsterPage', {
          title: monster.name,
          item: monster,
          breadcrumbs: `/games/${monster.game_id}/monsters/`,
     });
})

const monsterCreateGet = (req, res) => {
     const id = req.params.id;

     res.render('createPage', {
          title: 'Add a new monster',
          type: 'monster',
          breadcrumbs: `/games/${id}/monsters/`,
     });
}

const monsterCreatePost = [
     validateMonster,
     asyncHandler(async (req, res) => {
          const game_id = req.params.id;

          const errors = validationResult(req);
          if(!errors.isEmpty()) {
               return res.status(400).render('createPage', {
                    title: 'Add a new monster',
                    type: 'monster',
                    breadcrumbs: `/games/${game_id}/monsters/`,
                    // Failed validation, preserve user input and give feedback errors
                    item: req.body,
                    errors: errors.array(),
               });
          }

          const {name, description} = req.body;
          await db.addMonster({name, description, game_id});
          res.redirect(`/games/${game_id}/monsters`);
     })
]

const monsterUpdateGet = asyncHandler(async (req,res) => {
     const monster = await db.monster(req.params.monster_id);
     if(!monster) {
          throw new NotFoundError('Monster not found', req.originalUrl);
     }

     res.render('modifyPage', {
          title: `Update ${monster.name}`,
          type: 'monster',
          breadcrumbs: `/games/${monster.game_id}/monsters/${monster.id}/`,
          item: monster,
     })
})

const monsterUpdatePost = [
     validateMonster,
     asyncHandler(async (req, res) => {
          const monster_id = req.params.monster_id;
          const game_id = req.params.id;

          const monster = await db.monster(monster_id);
          if(!monster) {
               throw new NotFoundError('Monster not found', req.originalUrl);
          }

          const errors = validationResult(req);
          if(!errors.isEmpty()) {
               return res.status(400).render('modifyPage', {
                    title: `Update ${monster.name}`,
                    type: 'monster',
                    breadcrumbs: `/games/${game_id}/monsters/${monster_id}/`,
                    // Failed validation, preserve user input and give feedback errors
                    item: req.body,
                    errors: errors.array(),
               });
          }

          const { name, description } = req.body;
          await db.updateMonster({name, description, monster_id});
          res.redirect(`/games/${game_id}/monsters/${monster_id}/`);
     })
];

const monsterDeleteGet = asyncHandler(async (req, res) => {
     const monster = await db.monster(req.params.monster_id);
     if(!monster) {
          throw new NotFoundError('Monster not found', req.originalUrl);
     }

     res.render("deletePage", {
          title: `Delete ${monster.name}`,
          name: monster.name,
          breadcrumbs: `/games/${monster.game_id}/monsters/${monster.id}/`,
     });
})

const monsterDeletePost = asyncHandler(async (req, res) => {
     // TODO: Check if user has right to delete
     const id = req.params.monster_id;
     const monster = await db.monster(id);
     if(!monster) {
          throw new NotFoundError('Monster not found', req.originalUrl);
     }

     await db.deleteMonster(id);
     res.redirect(`/games/${monster.game_id}/monsters`);
})

const locationGet = asyncHandler(async (req, res) => {
     const location = await db.location(req.params.location_id);
     if(!location) {
          throw new NotFoundError('location not found', req.originalUrl);
     }

     res.render('locationPage', {
          title: location.name,
          item: location,
          breadcrumbs: `/games/${location.game_id}/locations/`,
     });
})

const gameLocationListGet = asyncHandler(async (req, res) => {
     const locations = await db.gameLocationList(req.params.id);
     const game = await db.game(req.params.id);

     if(!game) {
          throw new NotFoundError('Game not found', req.originalUrl);
     }
     
     if(!locations) {
          throw new NotFoundError('Location list not found', req.originalUrl)
     }

     res.render('locationList', {
          type: 'location',
          title: `${game.title} locationss`,
          items: locations,
          game: game,
          breadcrumbs: `/games/${game.id}/`,
     });
})

const locationCreateGet = (req, res) => {
     const id = req.params.id;

     res.render('createPage', {
          title: 'Add a new location',
          type: 'location',
          breadcrumbs: `/games/${id}/locations/`,
     });
}

const locationCreatePost = [
     validateLocation,
     asyncHandler(async (req, res) => {
          const id = req.params.id;

          const errors = validationResult(req);
          if(!errors.isEmpty()) {
               return res.status(400).render('createPage', {
                    title: 'Add a new location',
                    type: 'location',
                    breadcrumbs: `/games/${id}/locations/`,
                    // Failed validation, preserve user input and give feedback errors
                    item: req.body,
                    errors: errors.array(),
               });
          }

          const {name, description} = req.body;
          console.log('id is ', id);
          await db.addLocation({name, description, id});
          res.redirect(`/games/${id}/locations`);
     })
]


const locationUpdateGet = asyncHandler(async (req, res) => {
     const location = await db.location(req.params.location_id);
     if(!location) {
          throw new NotFoundError('location not found', req.originalUrl);
     }

     res.render('modifyPage', {
          title: `Update ${location.name}`,
          type: 'location',
          breadcrumbs: `/games/${location.game_id}/locations/${location.id}/`,
          item: location,
     })
})

const locationUpdatePost = [
     validateLocation,
     asyncHandler(async (req, res) => {
          const location_id = req.params.location_id;
          const game_id = req.params.id;

          const location = await db.location(location_id);
          if(!location) {
               throw new NotFoundError('location not found', req.originalUrl);
          }

          const errors = validationResult(req);
          if(!errors.isEmpty()) {
               return res.status(400).render('modifyPage', {
                    title: `Update ${location.name}`,
                    type: 'location',
                    breadcrumbs: `/games/${game_id}/locations/${location_id}/`,
                    // Failed validation, preserve user input and give feedback errors
                    item: req.body,
                    errors: errors.array(),
               });
          }

          const { name, description } = req.body;
          await db.updateLocation({name, description, location_id});
          res.redirect(`/games/${game_id}/locations/${location_id}/`);
     })
];

const locationDeleteGet = asyncHandler(async (req, res) => {
     const location = await db.location(req.params.location_id);
     if(!location) {
          throw new NotFoundError('location not found', req.originalUrl);
     }

     res.render("deletePage", {
          title: `Delete ${location.name}`,
          name: location.name,
          breadcrumbs: `/games/${location.game_id}/locations/${location.id}/`,
     });
})

const locationDeletePost = asyncHandler(async (req, res) => {
     // TODO: Check if user has right to delete
     const id = req.params.location_id;
     const location = await db.location(id);
     if(!location) {
          throw new NotFoundError('location not found', req.originalUrl);
     }

     await db.deleteLocation(id);
     res.redirect(`/games/${location.game_id}/locations`);
})

module.exports = {
     gameGet,
     monsterGet,
     locationGet,

     gameListGet,
     gameMonsterListGet,
     gameLocationListGet,

     gameCreateGet,
     gameCreatePost,
     monsterCreateGet,
     monsterCreatePost,
     locationCreateGet,
     locationCreatePost,

     gameUpdateGet,
     gameUpdatePost,
     monsterUpdateGet,
     monsterUpdatePost,
     locationUpdateGet,
     locationUpdatePost,

     gameDeleteGet,
     gameDeletePost,
     monsterDeleteGet,
     monsterDeletePost,
     locationDeleteGet,
     locationDeletePost,
};
