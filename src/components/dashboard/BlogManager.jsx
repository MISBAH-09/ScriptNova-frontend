
import { getUserBlogs, deleteBlog } from "../../services/blog"
import { useState, useEffect } from "react"

export default function BlogManager({ setPage, setCurrentEdit }) {

  const [savedBlogs, setSavedBlogs] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(false)

  const calcWordCount = (text) =>
    text ? text.trim().split(/\s+/).length : 0

  const openEditor = (blog) => {
    setCurrentEdit(blog)
    setPage("editor")
  }

  const fetchSavedBlogs = async () => {
    try {
      setLoadingBlogs(true)
      const blogs = await getUserBlogs()
      setSavedBlogs(blogs)
    } catch (err) {
      console.error("Failed to load blogs:", err)
    } finally {
      setLoadingBlogs(false)
    }
  }

  // ✅ Fetch blogs on mount
  useEffect(() => {
    fetchSavedBlogs()
  }, [])

  // ✅ Optional: Delete blog + refresh
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id)
      fetchSavedBlogs() // refresh list
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Click on any blog to edit or preview</p>
        <button
          onClick={() => setPage("generate")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          ✦ New Blog
        </button>
      </div>

      {loadingBlogs ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : savedBlogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-400 text-lg mb-2">📭 No blogs saved yet</p>
          <p className="text-gray-500 text-sm">Generate your first blog to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{savedBlogs.map((b, i) => (
  <div
    key={b.id || i}
    className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
  >
    <div onClick={() => openEditor(b)} className="cursor-pointer">
      <h3 className="font-semibold text-lg mb-2">
        {b.title || "Untitled"}
      </h3>

      <p className="text-gray-600 text-sm mb-2 line-clamp-3">
        {(b.content || "").slice(0, 150)}...
      </p>
    </div>

    <div className="flex justify-between items-center text-xs text-gray-500">
      <span>
        {b.date ? new Date(b.date).toLocaleDateString() : "No date"}
      </span>
      <span>{calcWordCount(b.content || "")} words</span>
    </div>
  </div>
))}
        </div>
      )}
    </div>
  )
}