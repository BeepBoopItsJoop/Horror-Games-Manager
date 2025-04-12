const { body, param} = require("express-validator"); 

const alphaErr = 'must only contain letters';
const alphaNumErr = 'must only contain letters or numbers';
const nameLengthErr = "must be between 1 and 50 characters.";
const emptyErr = "is required";
const intErr = "must be an integer";
const dateErr = 'is not a valid date';

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
     body("developer_id").trim().escape()
          .isInt().withMessage(`Developer ID ${intErr} (shouldnt normally get this)`)
          .notEmpty().withMessage(`Developer ID ${emptyErr} (shouldnt normally get this)`),
];

const validateMonster = [
     body("name").trim()
          .isLength({ min: 1, max: 50 }).withMessage(`Monster name ${nameLengthErr}`)   
          .notEmpty().withMessage(`Monster name ${emptyErr}`),
     body("description").trim()
          .isLength({ min: 1, max: 400 }).withMessage(`Monster Description ${nameLengthErr}`)   
          .notEmpty().withMessage(`Monster Description ${emptyErr}`),
];
const validateLocation = [
     body("name").trim()
          .isLength({ min: 1, max: 50 }).withMessage(`Location name ${nameLengthErr}`)   
          .notEmpty().withMessage(`Location name ${emptyErr}`),
     body("description").trim()
          .isLength({ min: 1, max: 400 }).withMessage(`Location Description  ${nameLengthErr}`)   
          .notEmpty().withMessage(`Location Description ${emptyErr}`),
];

module.exports = { validateDeveloper, validateGame, validateMonster, validateLocation };
