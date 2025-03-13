const { body } = require("express-validator"); 

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
];

module.exports = { validateDeveloper, validateID };
