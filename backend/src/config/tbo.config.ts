import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TBO_BASE_URL = process.env.TBO_BASE_URL;
const TBO_USERNAME = process.env.TBO_USERNAME;
const TBO_PASSWORD = process.env.TBO_PASSWORD;

if (!TBO_BASE_URL || !TBO_USERNAME || !TBO_PASSWORD) {
    console.warn("TBO config variables are not fully set in .env");
}

const authHeader = `Basic ${Buffer.from(`${TBO_USERNAME}:${TBO_PASSWORD}`).toString("base64")}`;

const tboClient = axios.create({
    baseURL: TBO_BASE_URL,
    timeout: 30000, // 30 seconds timeout
    headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
    },
});

// Optionally add an interceptor for logging or handling responses
tboClient.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        console.error("TBO API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default tboClient;
