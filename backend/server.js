import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import ProductRoutes from "./routes/product.route.js"

dotenv.config();
const app = express();


const __dirname = path.resolve();
app.use(express.json());
app.use("/api/products",(req,res,next)=>{
    console.log(`Request to ${req.method} ${req.url}`);
    next();
})

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });

    app.get("/", (req, res) => {
        console.log("root route accessed")
        res.send("Backend is working!")
    });

}

connectDB(); 

export default app;