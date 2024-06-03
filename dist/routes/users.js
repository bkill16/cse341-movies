"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController = __importStar(require("../controllers/users"));
const validator_1 = require("../validator");
const router = (0, express_1.Router)();
router.get("/", usersController.getAllUsers);
router.get("/:id", (0, validator_1.idValidationRules)(), validator_1.validate, usersController.getSingleUser);
router.post("/", (0, validator_1.userValidationRules)(), validator_1.validate, usersController.createUser);
router.put("/:id", (0, validator_1.userValidationRules)(), validator_1.validate, usersController.updateUser);
router.delete("/:id", (0, validator_1.idValidationRules)(), validator_1.validate, usersController.deleteUser);
exports.default = router;