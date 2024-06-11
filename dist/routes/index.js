"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_1 = __importDefault(require("./movies"));
const reviews_1 = __importDefault(require("./reviews"));
const users_1 = __importDefault(require("./users"));
const swaggerConfig_1 = require("../swaggerConfig");
const router = (0, express_1.Router)();
router.use("/movies", movies_1.default);
router.use("/reviews", reviews_1.default);
router.use("/users", users_1.default);
router.use("/api-docs", swaggerConfig_1.swaggerUi.serve, swaggerConfig_1.swaggerUi.setup(swaggerConfig_1.swaggerDocument));
exports.default = router;
