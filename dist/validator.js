"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.userValidationRules = exports.idValidationRules = void 0;
const express_validator_1 = require("express-validator");
const idValidationRules = () => {
    return [
        (0, express_validator_1.param)("id").exists().isString().isLength({ min: 24, max: 24 })
    ];
};
exports.idValidationRules = idValidationRules;
const userValidationRules = () => {
    return [
        (0, express_validator_1.body)("username").exists().isString(),
        (0, express_validator_1.body)("password").exists().isString().isLength({ min: 8 }),
        (0, express_validator_1.body)("email").exists().isEmail(),
    ];
};
exports.userValidationRules = userValidationRules;
function isValidationErrorWithParam(err) {
    return "param" in err;
}
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().forEach((err) => {
        if (isValidationErrorWithParam(err)) {
            extractedErrors.push({ [err.param]: err.msg });
        }
    });
};
exports.validate = validate;
