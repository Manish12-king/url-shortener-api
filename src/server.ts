import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Url } from "./models/url.model.js";
import urlRouter from "./routes/url.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/urls", urlRouter);

app.get("/", (req, res) => {
    res.send("URL Shortener API is running!");
});

app.get("/:shortCode", async (req, res) => {

    console.log(req.params);

    const url = await Url.findOne({
        shortCode: req.params.shortCode
    });

    console.log("URL FROM DB:", url);

    if (!url) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }

    console.log("REDIRECTING TO:", url.originalUrl);

    res.redirect(url.originalUrl);
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});
// Global error handler — always keep this near the end
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URL!)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

app.listen(5000, () => {
    console.log("Server running on port 5000");
});