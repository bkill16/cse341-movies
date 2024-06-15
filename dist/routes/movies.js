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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController = __importStar(require("../controllers/movies"));
const validator_1 = require("../validator");
const router = express_1.default.Router();
const { requiresAuth } = require("express-openid-connect");
router.get("/", requiresAuth(), moviesController.getAllMovies);
router.get("/:id", requiresAuth(), (0, validator_1.idValidationRules)(), validator_1.validate, moviesController.getSingleMovie);
router.post("/", requiresAuth(), (0, validator_1.movieValidationRules)(), validator_1.validate, moviesController.createMovie);
router.put("/:id", requiresAuth(), (0, validator_1.movieValidationRules)(), validator_1.validate, moviesController.updateMovie);
router.delete("/:id", requiresAuth(), (0, validator_1.idValidationRules)(), validator_1.validate, moviesController.deleteMovie);
exports.default = router;
