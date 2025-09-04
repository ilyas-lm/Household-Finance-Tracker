import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        console.log("req.headers:", req.headers);
        console.log("req.headers.authorization:", req.headers.authorization);

        try {
            token = req.headers.authorization.split(" ") [1];
            console.log("Token:", token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(404).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("JWT error:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } 
    
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
