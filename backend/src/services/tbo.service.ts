import tboClient from "../config/tbo.config.js";

interface HotelSearchData {
    CheckIn: string;
    CheckOut: string;
    HotelCodes: string;
    GuestNationality: string;
    PaxRooms: Array<{
        Adults: number;
        Children: number;
        ChildrenAges?: number[];
    }>;
    Filters?: any;
}

export const hotelSearchService = async (data: HotelSearchData) => {
    const response = await tboClient.post("/Search", data);
    return response.data;
};

interface PreBookData {
    BookingCode: string;
    PaymentMode: string;
}

export const preBookService = async (data: PreBookData) => {
    const response = await tboClient.post("/PreBook", data);
    return response.data;
};

interface BookData {
    BookingCode: string;
    CustomerDetails: any[];
    ClientReferenceId: string;
    BookingReferenceId: string;
    TotalFare: number;
    EmailId: string;
    PhoneNumber: string;
    BookingType: string;
    PaymentMode: string;
}

export const bookService = async (data: BookData) => {
    const response = await tboClient.post("/Book", data);
    return response.data;
};

interface BookingDetailData {
    ConfirmationNumber: string;
    PaymentMode: string;
}

export const bookingDetailService = async (data: BookingDetailData) => {
    const response = await tboClient.post("/BookingDetail", data);
    return response.data;
};

interface HotelDetailsData {
    Hotelcodes: string;
    Language: string;
}

export const hotelDetailsService = async (data: HotelDetailsData) => {
    const response = await tboClient.post("/Hoteldetails", data);
    return response.data;
};
