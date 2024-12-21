import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors';
import ProductRoutes from "./routes/product.route.js"

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://shelf-space-fe.vercel.app',  // Adjust this with your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],   // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Add other headers as needed
  }));

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", ProductRoutes);

app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}else {
    app.get("/", (req, res) => {
        res.send("API is running in development mode");
    });
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});

export default app;