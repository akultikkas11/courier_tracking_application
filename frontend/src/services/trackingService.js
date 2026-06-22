import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"

const trackingApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getTrackingDetails(trackingId) {
    try {
        const response = await trackingApi.get(`/track/${encodeURIComponent(trackingId)}`);
        return response.data;
    } 
    
    catch (error) {
        console.error("Error fetching tracking details:", error);

        throw (
            error.response?.data ||
            new Error("Failed to fetch tracking details")
        );
    }
}
