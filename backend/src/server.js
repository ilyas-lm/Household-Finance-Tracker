import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionsRoutes from "./routes/transactionRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.get("/", (req, res) => {res.send(" API is running... ")});
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
