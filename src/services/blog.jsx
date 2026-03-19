// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // ✅ Helper for auth headers
// const getAuthHeaders = () => {
//   const accessToken = localStorage.getItem("userToken");
//   return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
// };



// // =========================
// // ✅ GENERATE KEYWORDS
// // =========================
// export const generateKeywords = async (title) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/generate-keywords/`,
//       { title },
//       {
        
      
//       headers: getAuthHeaders(),
//         timeout: 150000
//       }
//     );

//     const result = response.data;

//     if (!result || result.success === false) {
//       throw new Error(result?.message || "Keyword generation failed");
//     }

//     return result.data; // ✅ array of keywords

//   } catch (error) {
//     console.error("❌ Keyword API Error:", error);

//     if (error.response) {
//       throw new Error(
//         error.response.data?.message ||
//         `Server Error (${error.response.status})`
//       );
//     } else if (error.request) {
//       throw new Error("No response from server.");
//     } else {
//       throw new Error(error.message);
//     }
//   }
// };



// // =========================
// // ✅ GENERATE BLOG
// // =========================
// export const generateBlog = async ({ title, keywords, tone, length }) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/generate-blog/`,
//       { title, keywords, tone, length },
//       {
//         headers: getAuthHeaders(),
//         timeout: 300000 // 5 minutes
//       }
//     );
//     const result = response.data;
//     if (!result || result.success === false) {
//       throw new Error(result?.message || "Blog generation failed");
//     }
//     return result.data;
//   } catch (error) {
//     console.error("❌ Blog API Error:", error);
//     if (error.response) {
//       throw new Error(error.response.data?.message || `Server Error (${error.response.status})`);
//     } else if (error.request) {
//       throw new Error("No response from server.");
//     } else {
//       throw new Error(error.message);
//     }
//   }
// };











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
      { timeout: 3000000 }
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







// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// // ── Axios instance ─────────────────────────────────────────────────────────────
// const api = axios.create({
//   baseURL: API_BASE,
// });

// // Attach auth token automatically to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("userToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Centralised error extractor — picks the most useful message from any shape
// function handleError(error) {
//   if (error.response) {
//     const data = error.response.data;
//     const message =
//       data?.message ||
//       data?.detail ||
//       data?.error ||
//       `Server Error (${error.response.status})`;
//     throw new Error(message);
//   } else if (error.request) {
//     throw new Error("No response from server. Check your connection.");
//   } else {
//     throw new Error(error.message);
//   }
// }

// // =========================
// // GENERATE KEYWORDS
// // =========================
// export const generateKeywords = async (title) => {
//   try {
//     const response = await api.post(
//       "/generate-keywords/",
//       { title },
//       { timeout: 150000 }
//     );

//     const result = response.data;
//     if (!result || result.success === false) {
//       throw new Error(result?.message || "Keyword generation failed");
//     }

//     // Support both { data: [...] } and { keywords: [...] } shapes
//     return result.data || result.keywords || [];
//   } catch (error) {
//     console.error("❌ Keyword API Error:", error);
//     handleError(error);
//   }
// };

// // =========================
// // GENERATE BLOG
// // =========================
// export const generateBlog = async ({ title, keywords, tone, length }) => {
//   try {
//     const response = await api.post(
//       "/generate-blog/",
//       { title, keywords, tone, length },
//       { timeout: 300000 } // 5 minutes — AI generation can be slow
//     );

//     const result = response.data;
//     if (!result || result.success === false) {
//       throw new Error(result?.message || "Blog generation failed");
//     }

//     return result.data || result;
//   } catch (error) {
//     console.error("❌ Blog Generate API Error:", error);
//     handleError(error);
//   }
// };

// // =========================
// // SAVE BLOG
// // =========================
// export const saveBlog = async (blog) => {
//   try {
//     const response = await api.post("/blogs/", blog);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Save Blog Error:", error);
//     handleError(error);
//   }
// };

// // =========================
// // GET USER'S BLOGS
// // =========================
// export const getUserBlogs = async () => {
//   try {
//     const response = await api.get("/blogs/");
//     const data = response.data;
//     // Handle both paginated { results: [] } and plain array responses
//     return Array.isArray(data) ? data : data.results || [];
//   } catch (error) {
//     console.error("❌ Get Blogs Error:", error);
//     handleError(error);
//   }
// };

// // =========================
// // GET SINGLE BLOG
// // =========================
// export const getBlog = async (id) => {
//   try {
//     const response = await api.get(`/blogs/${id}/`);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Get Blog Error:", error);
//     handleError(error);
//   }
// };

// // =========================
// // UPDATE BLOG
// // =========================
// export const updateBlog = async (id, updates) => {
//   try {
//     const response = await api.patch(`/blogs/${id}/`, updates);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Update Blog Error:", error);
//     handleError(error);
//   }
// };

// // =========================
// // DELETE BLOG
// // =========================
// export const deleteBlog = async (id) => {
//   try {
//     await api.delete(`/blogs/${id}/`);
//     return true;
//   } catch (error) {
//     console.error("❌ Delete Blog Error:", error);
//     handleError(error);
//   }
// };

// // =========================
// // TOGGLE PUBLISH / DRAFT
// // =========================
// export const togglePublish = async (id) => {
//   try {
//     const response = await api.post(`/blogs/${id}/publish/`);
//     return response.data; // { id, status }
//   } catch (error) {
//     console.error("❌ Publish Toggle Error:", error);
//     handleError(error);
//   }
// };

// // =========================
// // GET BLOG STATS
// // =========================
// export const getBlogStats = async () => {
//   try {
//     const response = await api.get("/blogs/stats/");
//     return response.data; // { total, published, drafts, total_words }
//   } catch (error) {
//     console.error("❌ Blog Stats Error:", error);
//     handleError(error);
//   }
// };