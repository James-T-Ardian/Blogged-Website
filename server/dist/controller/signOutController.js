"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutUser = void 0;
const logOutUser = (req, res) => {
    if (req.session.user) {
        // Destroy cookie
        req.session.destroy((err) => {
            return res.status(500).json({ loggedOut: false, msg: "Server error" });
        });
        res.clearCookie("username");
        return res.status(200).json({ loggedOut: true, msg: "User has been logged out" });
    }
    else {
        return res.status(409).json({ loggedOut: false, msg: "Cannot log out if user hasnt logged in" });
    }
};
exports.logOutUser = logOutUser;
