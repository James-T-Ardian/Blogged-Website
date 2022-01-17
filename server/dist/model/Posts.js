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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const db_1 = require("../config/db");
const mysql = db_1.pool.promise();
class Posts {
    constructor(username) {
        this.getAllUserPostsTitleAndTime = () => __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT post_id, title, created_at FROM posts WHERE uploader = ? ORDER BY post_id DESC';
            const [result, _] = yield mysql.execute(sql, [this.username]);
            return result;
        });
        this.getUserPostByPostID = (postID) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT title, body, created_at FROM posts WHERE post_id = ? && uploader = ?';
            const [result, _] = yield mysql.execute(sql, [postID, this.username]);
            return result;
        });
        this.createNewUserPost = (title, body, created_at) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO posts(title, body, created_at, uploader) VALUES (?, ?, ?, ?)';
            const [result, _] = yield mysql.execute(sql, [title, body, created_at, this.username]);
            return result;
        });
        this.updateUserPost = (postID, title, body) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'UPDATE posts SET title = ?, body = ? WHERE post_id  = ?';
            const [result, _] = yield mysql.execute(sql, [title, body, postID]);
            return result;
        });
        this.deleteUserPost = (postID) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM posts WHERE post_id  = ?';
            const [result, _] = yield mysql.execute(sql, [postID]);
            return result;
        });
        this.deleteAllUserPosts = () => __awaiter(this, void 0, void 0, function* () {
            const sql = 'DELETE FROM posts WHERE uploader = ?';
            const [result, _] = yield mysql.execute(sql, [this.username]);
            return result;
        });
        this.username = username;
    }
}
exports.Posts = Posts;
