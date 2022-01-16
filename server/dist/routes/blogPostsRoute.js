"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostsRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller = require('../controller/blogPostsController');
const router = express_1.default.Router();
exports.blogPostsRoute = router;
router.get('/:username', controller.getBlogPostsTitleTime);
router.post('/:username', controller.createBlogPost);
router.put('/:username/:postId', controller.updateBlogPost);
router.delete('/:username/:postId', controller.deleteBlogPost);
router.get('/:username/:postId', controller.getSpecificPost);
