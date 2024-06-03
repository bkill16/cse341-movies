import { Request, Response, NextFunction } from "express";
import { body, param, validationResult, ValidationError } from "express-validator";

const idValidationRules = () => {
    return [
        param("id").exists().isString().isLength({ min: 24, max: 24 })
    ];
};

const userValidationRules = () => {
  return [
    body("username").exists().isString(),
    body("password").exists().isString().isLength({ min: 8 }),
    body("email").exists().isEmail(),
  ];
};

interface ExtractedError {
  [key: string]: string;
}

function isValidationErrorWithParam(
  err: ValidationError
): err is ValidationError & { param: string } {
  return "param" in err;
}

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: ExtractedError[] = [];
  errors.array().forEach((err) => {
    if (isValidationErrorWithParam(err)) {
      extractedErrors.push({ [err.param]: err.msg });
    }
  });
};

export { idValidationRules,userValidationRules, validate };
