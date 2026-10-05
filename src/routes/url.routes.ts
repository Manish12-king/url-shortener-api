import { Router } from "express";
import {
    createUrl,
    getUrls,
    getUrlByShortCode,
    deleteUrl
} from "../controllers/url.controller.js";

const router = Router();

router.post("/", createUrl);
router.get("/", getUrls);
router.get("/:shortCode", getUrlByShortCode);
router.delete("/:shortCode", deleteUrl);

export default router;