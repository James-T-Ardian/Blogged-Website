"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller = require('../controller/signUpController');
const router = express_1.default.Router();
exports.signupRoute = router;
router.post('/', controller.createNewUser);