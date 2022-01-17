"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller = require('../controller/signInController'); // Change after migrating controller
const router = express_1.default.Router();
exports.signinRoute = router;
router.get('/', controller.checkIfLoggedIn);
router.post('/', controller.logInUser);
