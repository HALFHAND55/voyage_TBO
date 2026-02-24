import { Request, Response } from "express";
import {
    hotelSearchService,
    preBookService,
    bookService,
    bookingDetailService,
    hotelDetailsService,
} from "../services/tbo.service.js";

export const searchHotels = async (req: Request, res: Response) => {
    try {
        const result = await hotelSearchService(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        console.error("Error in searchHotels:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Failed to search hotels",
            error: error.response?.data || error.message,
        });
    }
};

export const preBookHotel = async (req: Request, res: Response) => {
    try {
        const result = await preBookService(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        console.error("Error in preBookHotel:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Failed to prebook hotel",
            error: error.response?.data || error.message,
        });
    }
};

export const bookHotel = async (req: Request, res: Response) => {
    try {
        const result = await bookService(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        console.error("Error in bookHotel:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Failed to book hotel",
            error: error.response?.data || error.message,
        });
    }
};

export const getBookingDetails = async (req: Request, res: Response) => {
    try {
        const result = await bookingDetailService(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        console.error("Error in getBookingDetails:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch booking details",
            error: error.response?.data || error.message,
        });
    }
};

export const getHotelDetails = async (req: Request, res: Response) => {
    try {
        const result = await hotelDetailsService(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        console.error("Error in getHotelDetails:", error.message || error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch hotel details",
            error: error.response?.data || error.message,
        });
    }
};
