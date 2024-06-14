"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth0UserInfo = exports.getAuth0ManagementToken = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getAuth0ManagementToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.SECRET_STRING,
            audience: process.env.AUDIENCE,
            grant_type: "client_credentials"
        });
        return response.data.access_token;
    });
}
exports.getAuth0ManagementToken = getAuth0ManagementToken;
function getAuth0UserInfo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield getAuth0ManagementToken();
        const response = yield axios_1.default.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    });
}
exports.getAuth0UserInfo = getAuth0UserInfo;
