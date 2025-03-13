const { body } = require("express-validator"); 

const alphaErr = 'must only contain letters';
const alphaNumErr = 'must only contain letters or numbers';
const nameLengthErr = "must be between 1 and 50 characters.";
const emptyErr = "is required";
const intErr = "must be an integer (you shouldnt normally get this message)";
const dateErr = 'is not a valid date (shouldnt normally happen)';

const validateDeveloper = [
     body("name").trim()
          .isAlphanumeric('en-US', { ignore: ' .-_\'' }).withMessage(`Developer name ${alphaNumErr}`)
          .isLength({ min: 1, max: 50 }).withMessage(`Developer name ${nameLengthErr}`)   
          .notEmpty().withMessage(`Developer name ${emptyErr}`),
     body("country").trim()
          .isAlpha('en-US', { ignore: ' ' }).withMessage(`Country ${alphaErr}`)
          .isLength({ min: 1, max: 50 }).withMessage(`Country ${nameLengthErr}`)
          .notEmpty().withMessage(`Country ${emptyErr}`),
];

const validateGame = [
     body("title").trim()
          .isLength({min: 1, max: 50}).withMessage(`Game title ${nameLengthErr}`)
          .notEmpty().withMessage(`Game title ${emptyErr}`),
     body("release_date").trim()
          .isDate().withMessage(`Release date ${dateErr}`)
          .notEmpty().withMessage(`Release date ${emptyErr}`),
     body("developer").trim().escape()
          .isInt().withMessage(`Developer ID ${intErr} (shouldnt normally get this)`)
          .notEmpty().withMessage(`Developer ID ${emptyErr} (shouldnt normally get this)`),
];

const validateID = [
     body("id").trim().escape()
          .isInt().withMessage(`ID ${intErr}`)
          .notEmpty().withMessage(`ID ${emptyErr}`),
];

module.exports = { validateDeveloper, validateGame, validateID };
