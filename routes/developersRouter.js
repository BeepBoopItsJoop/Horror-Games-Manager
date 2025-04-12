const { Router } = require("express");

const developersRouter = Router();
const developersController = require('../controllers/developersController');
const InvalidParamError = require("../errors/InvalidParamError");

developersRouter.param('id', (req, res, next, id) => {
     if(isNaN(id)) {
          next(new InvalidParamError('ID parameter is invalid', req.originalUrl));
     } else {
          next();
     }
});

developersRouter.get("/", developersController.developerListGet);

developersRouter.route('/new')
     .get(developersController.developerCreateGet)
     .post(developersController.developerCreatePost);

developersRouter.get('/:id', developersController.developerGet);

developersRouter.route('/:id/modify')
     .get(developersController.developerUpdateGet)
     .post(developersController.developerUpdatePost);

developersRouter.route('/:id/delete')
     .get(developersController.developerDeleteGet)
     .post(developersController.developerDeletePost);

module.exports = developersRouter;
