import express from "express";
import {
    searchHotels,
    preBookHotel,
    bookHotel,
    getBookingDetails,
    getHotelDetails,
} from "../controllers/hotel.controller.js";

const router = express.Router();

router.post("/search", searchHotels);
router.post("/prebook", preBookHotel);
router.post("/book", bookHotel);
router.post("/details", getHotelDetails);
router.post("/booking-detail", getBookingDetails);

export default router;
