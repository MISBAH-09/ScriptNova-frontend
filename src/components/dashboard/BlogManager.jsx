export default function BlogManager({ posts, setPage, setCurrentEdit }) {

  const calcWordCount = (text) =>
    text ? text.trim().split(/\s+/).length : 0

  const openEditor = (blog) => {
    setCurrentEdit(blog)
    setPage("editor")
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

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-400 text-lg mb-2">📭 No blogs saved yet</p>
          <p className="text-gray-500 text-sm">Generate your first blog to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((b, i) => (
            <div
              key={i}
              onClick={() => openEditor(b)}
              className="bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">{b.content.slice(0, 150)}...</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{new Date(b.date).toLocaleDateString()}</span>
                <span>{calcWordCount(b.content)} words</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// </div>

// )}

// </div>

// )
// }