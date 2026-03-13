import { useState, useEffect } from "react"

export default function BlogEditor({ blog, setPosts, setPage }) {

  const [currentEdit, setCurrentEdit] = useState(blog || { title: "", content: "" })
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    setWordCount(calcWordCount(currentEdit.content))
  }, [currentEdit.content])

  const calcWordCount = (text) =>
    text ? text.trim().split(/\s+/).length : 0

  const renderMarkdown = (md) => {
    if (!md) return ""
    let html = ""
    const lines = md.split("\n")
    let inList = false

    for (let line of lines) {
      const t = line.trim()

      if (!t) {
        if (inList) {
          html += "</ul>"
          inList = false
        }
        continue
      }

      if (t.startsWith("# ")) {
        html += `<h1>${t.slice(2)}</h1>`
      } else if (t.startsWith("## ")) {
        html += `<h2>${t.slice(3)}</h2>`
      } else if (t.startsWith("- ") || t.startsWith("* ")) {
        if (!inList) {
          html += "<ul>"
          inList = true
        }
        html += `<li>${t.slice(2)}</li>`
      } else {
        if (inList) {
          html += "</ul>"
          inList = false
        }
        html += `<p>${t}</p>`
      }
    }

    if (inList) html += "</ul>"

    return html
  }

  const saveEdited = () => {
    if (!currentEdit) return
    setPosts((prev) => [
      { ...currentEdit, date: new Date().toISOString() },
      ...prev.filter(p => p !== blog)
    ])
    alert("Saved")
  }

  const downloadFile = (format, text) => {
    const name = (currentEdit.title || "blog")
      .replace(/\s+/g, "_")

    const blob = new Blob([text], {
      type: format === "md" ? "text/markdown" : "text/plain"
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${name}.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Editor</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setPage("manage")}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
          >
            ← Back to Library
          </button>
          <button
            onClick={saveEdited}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            💾 Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={currentEdit.title}
            onChange={(e) => setCurrentEdit({ ...currentEdit, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
          <textarea
            value={currentEdit.content}
            onChange={(e) => {
              setCurrentEdit({ ...currentEdit, content: e.target.value })
              setWordCount(calcWordCount(e.target.value))
            }}
            rows={20}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Word count: {wordCount}</span>
          <div className="flex gap-2">
            <button
              onClick={() => downloadFile("md", currentEdit.content)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Download MD
            </button>
            <button
              onClick={() => downloadFile("txt", currentEdit.content)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Download TXT
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(currentEdit.content) }}
        />
      </div>
    </div>
  )
}
// </button>

// </div>

// {/* preview */}

// <div className="bg-white p-6 rounded-xl shadow">

// <h2 className="text-xl font-bold mb-4">
// Preview
// </h2>

// <h3 className="text-2xl font-bold mb-2">
// {title}
// </h3>

// <pre className="whitespace-pre-wrap text-gray-700">
// {content}
// </pre>

// </div>

// </div>

// )
// }