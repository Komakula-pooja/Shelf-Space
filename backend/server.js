import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import ProductRoutes from "./routes/product.route.js"

dotenv.config();
const app = express();
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

const server = app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to database:', error);
    }
});

export default app;