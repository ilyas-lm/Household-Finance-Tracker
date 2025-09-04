import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//JWT generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d"});
};

//Registration 
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body; 

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields"});
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({ message: error.mesage });
    }
};


//Login
export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try { 
        const user = await User.findOne({ email });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
 //current user 
export const getMe = async (req, res) => {
    console.log("Auth Header:", req.headers.authorization);
    res.json(req.user);
}; 
