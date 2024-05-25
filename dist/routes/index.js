"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_1 = __importDefault(require("./movies"));
const actors_1 = __importDefault(require("./actors"));
const router = (0, express_1.Router)();
router.use('/movies', movies_1.default);
router.use('/actors', actors_1.default);
exports.default = router;
