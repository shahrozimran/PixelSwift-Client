import axios from "axios";

const API_BASE_URL = "https://pixelswift-server.onrender.com";

export const convertImage = async (file, format, quality) => {
  const formData = new FormData();
  
  formData.append("image", file);
  formData.append("format", format);
  formData.append("quality", quality.toString());

  try {
    const response = await axios.post(
      `${API_BASE_URL}/convert`,
      formData,
      { 
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error Status:", error.response.status);
    } else if (error.request) {
      console.error("No response received. Ensure the backend is running.");
    } else {
      console.error("Request Error:", error.message);
    }
    throw error;
  }
};