"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidationRules = exports.movieValidationRules = exports.userValidationRules = exports.idValidationRules = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const idValidationRules = () => {
    return [
        (0, express_validator_1.param)("id")
            .exists()
            .notEmpty()
            .withMessage("ID must not be empty")
            .isMongoId()
            .withMessage("Must be a valid MongoDB ID"),
    ];
};
exports.idValidationRules = idValidationRules;
const movieValidationRules = () => {
    return [
        (0, express_validator_1.body)("title")
            .exists()
            .notEmpty()
            .withMessage("Movie title cannot be empty")
            .isString()
            .withMessage("Movie title must be a string"),
        (0, express_validator_1.body)("releaseYear")
            .exists()
            .notEmpty()
            .withMessage("Release year cannot be empty")
            .isString()
            .isLength({ min: 4, max: 4 })
            .withMessage("Release year must be a 4 characters long")
            .matches(/^\d{4}$/)
            .withMessage("Release year must be a valid 4-digit year"),
        (0, express_validator_1.body)("director")
            .exists()
            .notEmpty()
            .withMessage("Director name cannot be empty")
            .isString()
            .withMessage("Movie director must be a string"),
        (0, express_validator_1.body)("rated")
            .exists()
            .notEmpty()
            .withMessage("Movie must have a rating")
            .isString()
            .withMessage("Rating must be a string")
            .isIn(["G", "PG", "PG-13", "R", "NC-17"])
            .withMessage("Rating must be one of the following: G, PG, PG-13, R, NC-17"),
        (0, express_validator_1.body)("runtime")
            .exists()
            .notEmpty()
            .withMessage("Movie runtime cannot be empty")
            .isString()
            .withMessage("Movie runtime must be a string")
            .custom((value) => {
            if (!value.match(/^\d+\s+mins$/)) {
                throw new Error("Runtime must be in the format '120 mins'");
            }
            return true;
        }),
        (0, express_validator_1.body)("description")
            .exists()
            .notEmpty()
            .withMessage("Movie description cannot be empty")
            .isString()
            .withMessage("Movie description must be a string"),
        (0, express_validator_1.body)("cast")
            .exists()
            .notEmpty()
            .withMessage("Movie cast cannot be empty")
            .isArray()
            .withMessage("Movie cast must be formatted as an array"),
        (0, express_validator_1.body)("genres")
            .exists()
            .notEmpty()
            .withMessage("Movie genres cannot be empty")
            .isArray()
            .withMessage("Movie genres must be formatted as an array"),
    ];
};
exports.movieValidationRules = movieValidationRules;
const reviewValidationRules = () => {
    return [
        (0, express_validator_1.body)("movieId")
            .exists()
            .notEmpty()
            .withMessage("Movie ID must not be empty")
            .isMongoId()
            .withMessage("Movie ID must be a valid MongoDB ID"),
        (0, express_validator_1.body)("userId")
            .exists()
            .notEmpty()
            .withMessage("User ID must not empty")
            .isMongoId()
            .withMessage("User ID must be a valid MongoDB ID"),
        (0, express_validator_1.body)("score")
            .exists()
            .notEmpty()
            .withMessage("Score cannot be empty")
            .isNumeric()
            .withMessage("Score must be a number")
            .custom((value) => {
            if (value < 0.5 || value > 5) {
                throw new Error("Score must be between 0.5 and 5");
            }
            return true;
        }),
        (0, express_validator_1.body)("comment")
            .exists()
            .notEmpty()
            .withMessage("Comment cannot be empty")
            .isString()
            .withMessage("Comment must be a string"),
    ];
};
exports.reviewValidationRules = reviewValidationRules;
const userValidationRules = () => {
    return [
        (0, express_validator_1.body)("username")
            .exists()
            .notEmpty()
            .withMessage("Username cannot be empty")
            .isString()
            .withMessage("Username must be a string"),
        (0, express_validator_1.body)("password")
            .exists()
            .notEmpty()
            .withMessage("Password cannot be empty")
            .isString()
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
            .matches(/[a-z]/)
            .withMessage("Password must contain at least one lowercase letter")
            .matches(/[A-Z]/)
            .withMessage("Password must contain at least one uppercase letter")
            .matches(/[0-9]/)
            .withMessage("Password must contain at least one number")
            .matches(/[@$!%*?&]/)
            .withMessage("Password must contain at least one special character"),
        (0, express_validator_1.body)("email")
            .exists()
            .notEmpty()
            .withMessage("Email cannot be empty")
            .isEmail()
            .withMessage("Must be a valid email address"),
    ];
};
exports.userValidationRules = userValidationRules;
function isValidationErrorWithPath(err) {
    return "path" in err;
}
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = {};
    errors.array().forEach((err) => {
        if (isValidationErrorWithPath(err)) {
            extractedErrors[err.path] = err.msg;
        }
    });
    return res.status(400).json({ errors: extractedErrors });
};
exports.validate = validate;
