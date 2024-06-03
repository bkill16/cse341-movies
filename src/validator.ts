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

function isValidationErrorWithPath(
  err: ValidationError
): err is ValidationError & { path: string } {
  return "path" in err;
}

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: Record<string, string> = {};
  errors.array().forEach((err) => {
    if (isValidationErrorWithPath(err)) {
      extractedErrors[err.path] = err.msg;
    }
  });

  return res.status(400).json({ errors: extractedErrors });
};

export { validate, idValidationRules, userValidationRules }