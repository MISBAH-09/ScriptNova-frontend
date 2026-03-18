import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Helper for auth headers
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("userToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};



// =========================
// ✅ GENERATE KEYWORDS
// =========================
export const generateKeywords = async (title) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/generate-keywords/`,
      { title },
      {
        
      
      headers: getAuthHeaders(),
        timeout: 150000
      }
    );

    const result = response.data;

    if (!result || result.success === false) {
      throw new Error(result?.message || "Keyword generation failed");
    }

    return result.data; // ✅ array of keywords

  } catch (error) {
    console.error("❌ Keyword API Error:", error);

    if (error.response) {
      throw new Error(
        error.response.data?.message ||
        `Server Error (${error.response.status})`
      );
    } else if (error.request) {
      throw new Error("No response from server.");
    } else {
      throw new Error(error.message);
    }
  }
};



// =========================
// ✅ GENERATE BLOG
// =========================
export const generateBlog = async ({ title, keywords, tone, length }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/generate-blog/`,
      { title, keywords, tone, length },
      {
        headers: getAuthHeaders(),
        timeout: 300000 // 5 minutes
      }
    );
    const result = response.data;
    if (!result || result.success === false) {
      throw new Error(result?.message || "Blog generation failed");
    }
    return result.data;
  } catch (error) {
    console.error("❌ Blog API Error:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || `Server Error (${error.response.status})`);
    } else if (error.request) {
      throw new Error("No response from server.");
    } else {
      throw new Error(error.message);
    }
  }
};