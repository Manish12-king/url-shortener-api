import type { Request, Response, NextFunction } from "express";
import { Url } from "../models/url.model.js";
import { generateShortCode } from "../utils/generateShortCode.js";

export const createUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({
            message: "originalurl is req"
        });
    }

    try {
        new URL(originalUrl);
    } catch {
        return res.status(400).json({
            message: "INVALID URL"
        });
    }

    try {
        const shortCode = generateShortCode();

        const newUrl = await Url.create({
            originalUrl,
            shortCode
        });

        return res.status(201).json({
            message: "URL created successfully",
            data: newUrl
        });

    } catch (error) {
        next(error);
    }
};


export const getUrls = async (req: Request, res: Response) => {

    try {
        const urls = await Url.find();

        return res.status(200).json({
            message: "URLs fetched successfully",
            data: urls
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch URLs"
        });
    }
};


export const getUrlByShortCode = async (
    req: Request,
    res: Response
) => {

    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({
            shortCode
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        return res.status(200).json({
            message: "URL found",
            data: url
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch URL"
        });
    }
};


export const deleteUrl = async (
    req: Request,
    res: Response
) => {

    try {
        const { shortCode } = req.params;

        const deletedUrl = await Url.findOneAndDelete({
            shortCode
        });

        if (!deletedUrl) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        return res.status(200).json({
            message: "URL deleted successfully",
            data: deletedUrl
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete URL"
        });
    }
};