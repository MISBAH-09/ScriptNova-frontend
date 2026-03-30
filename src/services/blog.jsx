import axios from "axios";

// Your config/urls.py does: path('', include('ScriptNova.urls'))
// So routes are at root: /blogs/, /generate-blog/, etc. — NOT /api/blogs/
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

// Attach Bearer token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralised error handler
function handleError(error) {
  if (error.response) {
    const data = error.response.data;
    const message =
      data?.message ||
      data?.detail ||
      data?.error ||
      `Server Error (${error.response.status})`;
    throw new Error(message);
  } else if (error.request) {
    throw new Error("No response from server. Check your connection.");
  } else {
    throw new Error(error.message);
  }
}

// =========================
// GENERATE KEYWORDS
// =========================
export const generateKeywords = async (title) => {
  try {
    const response = await api.post(
      "/generate-keywords/",
      { title },
      { timeout: 150000 }
    );
    const result = response.data;
    if (!result || result.success === false) {
      throw new Error(result?.message || "Keyword generation failed");
    }
    return result.data || result.keywords || [];
  } catch (error) {
    console.error("❌ Keyword API Error:", error);
    handleError(error);
  }
};

// =========================
// GENERATE BLOG
// =========================
export const generateBlog = async ({ title, keywords, tone, length }) => {
  try {
    const response = await api.post(
      "/generate-blog/",
      { title, keywords, tone, length },
      { timeout: 30000000 }
    );
    const result = response.data;
    if (!result || result.success === false) {
      throw new Error(result?.message || "Blog generation failed");
    }
    return result.data || result;
  } catch (error) {
    console.error("❌ Blog Generate API Error:", error);
    handleError(error);
  }
};

// =========================
// SAVE BLOG  →  POST /blogs/
// =========================
export const saveBlog = async (blog) => {
  try {
    const response = await api.post("/blogs/", blog);
    const result = response.data;
    return result.data || result;
  } catch (error) {
    console.error("❌ Save Blog Error:", error);
    handleError(error);
  }
};

// =========================
// GET USER'S BLOGS  →  GET /blogs/
// =========================
export const getUserBlogs = async () => {
  try {
    const response = await api.get("/blogs/");
    const result = response.data;
    // Our view returns { success: true, data: [...] }
    const data = result.data || result;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("❌ Get Blogs Error:", error);
    handleError(error);
  }
};

// =========================
// GET SINGLE BLOG  →  GET /blogs/<id>/
// =========================
export const getBlog = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}/`);
    const result = response.data;
    return result.data || result;
  } catch (error) {
    console.error("❌ Get Blog Error:", error);
    handleError(error);
  }
};

// =========================
// UPDATE BLOG  →  PATCH /blogs/<id>/
// =========================
export const updateBlog = async (id, updates) => {
  try {
    const response = await api.patch(`/blogs/${id}/`, updates);
    const result = response.data;
    return result.data || result;
  } catch (error) {
    console.error("❌ Update Blog Error:", error);
    handleError(error);
  }
};

// =========================
// DELETE BLOG  →  DELETE /blogs/<id>/
// =========================
export const deleteBlog = async (id) => {
  try {
    await api.delete(`/blogs/${id}/`);
    return true;
  } catch (error) {
    console.error("❌ Delete Blog Error:", error);
    handleError(error);
  }
};


// blog by id
export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}/`)
    const result = response.data
    return result.data || result
  } catch (error) {
    console.error("❌ Get Blog By ID Error:", error)
    handleError(error)
  }
}

// =========================
// TOGGLE PUBLISH  →  POST /blogs/<id>/publish/
// =========================
export const togglePublish = async (id) => {
  try {
    const response = await api.post(`/blogs/${id}/publish/`);
    const result = response.data;
    return result.data || result;
  } catch (error) {
    console.error("❌ Publish Toggle Error:", error);
    handleError(error);
  }
};

// =========================
// BLOG STATS  →  GET /blogs/stats/
// =========================
export const getBlogStats = async () => {
  try {
    const response = await api.get("/blogs/stats/");
    const result = response.data;
    return result.data || result;
  } catch (error) {
    console.error("❌ Blog Stats Error:", error);
    handleError(error);
  }
};


