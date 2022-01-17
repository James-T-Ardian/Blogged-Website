"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signoutRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller = require('../controller/signOutController'); // Change after migrating controller
const router = express_1.default.Router();
exports.signoutRoute = router;
router.post('/', controller.logOutUser);
