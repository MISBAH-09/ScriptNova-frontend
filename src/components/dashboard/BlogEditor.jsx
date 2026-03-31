import { useState, useEffect } from "react"
import { getBlogById, updateBlog } from "../../services/blog"

export default function BlogEditor({ blog, setPage }) {

  const [currentEdit, setCurrentEdit] = useState({ title: "", content: "" })
  const [wordCount, setWordCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const calcWordCount = (text) =>
    text ? text.trim().split(/\s+/).length : 0

  // ✅ FETCH BLOG
  useEffect(() => {
    if (!blog?.id) return

    const fetchBlog = async () => {
      try {
        setLoading(true)
        const data = await getBlogById(blog.id)

        setCurrentEdit(data)
        setWordCount(calcWordCount(data.content))
      } catch (err) {
        console.error("Failed to load blog:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blog?.id])

  // ✅ SAVE
  const saveEdited = async () => {
    if (!blog?.id) return

    try {
      setSaving(true)

      await updateBlog(blog.id, {
        title: currentEdit.title,
        content: currentEdit.content,
        word_count: calcWordCount(currentEdit.content)
      })

      alert("✅ Saved to database")
    } catch (err) {
      console.error("Save failed:", err)
      alert("❌ Failed to save")
    } finally {
      setSaving(false)
    }
  }

  // ✅ SAME RENDERER AS GENERATOR
  const renderInline = (text) => {
    return text
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
  }

  const renderMarkdown = (md) => {
    if (!md) return ""
    let html = ""
    const lines = md.split("\n")
    let inList = false

    for (let line of lines) {
      const t = line.trim()

      if (!t) {
        if (inList) { html += "</ul>"; inList = false }
        continue
      }

      const fixedLine = t
        .replace(/^# #{1,3} /, "## ")
        .replace(/^# (?!#)/, "## ")

      if (fixedLine.startsWith("### ")) {
        if (inList) { html += "</ul>"; inList = false }
        html += `<h3 style="font-size:1.1rem;font-weight:700;margin:1.2rem 0 0.4rem">${renderInline(fixedLine.slice(4))}</h3>`
      } else if (fixedLine.startsWith("## ")) {
        if (inList) { html += "</ul>"; inList = false }
        html += `<h2 style="font-size:1.3rem;font-weight:700;margin:1.8rem 0 0.6rem;border-bottom:1px solid #fce7f3;padding-bottom:4px;color:#be185d">${renderInline(fixedLine.slice(3))}</h2>`
      } else if (fixedLine.startsWith("# ")) {
        if (inList) { html += "</ul>"; inList = false }
        html += `<h1 style="font-size:1.6rem;font-weight:800;margin:1.5rem 0 0.5rem">${renderInline(fixedLine.slice(2))}</h1>`
      } else if (fixedLine.startsWith("- ") || fixedLine.startsWith("* ")) {
        if (!inList) {
          html += `<ul style="list-style:disc;padding-left:1.5rem;margin:0.75rem 0">`
          inList = true
        }
        html += `<li style="margin:0.25rem 0">${renderInline(fixedLine.slice(2))}</li>`
      } else if (fixedLine.startsWith("---")) {
        if (inList) { html += "</ul>"; inList = false }
        html += `<hr style="border:none;border-top:1px solid #fce7f3;margin:1rem 0" />`
      } else {
        if (inList) { html += "</ul>"; inList = false }
        html += `<p style="margin:0.6rem 0;line-height:1.75;color:#374151">${renderInline(fixedLine)}</p>`
      }
    }

    if (inList) html += "</ul"
    return html
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading blog...</p>
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Editor</h2>

        <div className="flex gap-3">
          <button
            onClick={() => setPage("manage")}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            ← Back
          </button>

          <button
            onClick={saveEdited}
            disabled={saving}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            {saving ? "Saving..." : "💾 Save"}
          </button>
        </div>
      </div>

      {/* ✅ SIDE BY SIDE LAYOUT */}
     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* LEFT: EDITOR */}
        <div className="bg-white p-6 rounded-lg border flex flex-col h-[625px]">
          
          <input
            type="text"
            value={currentEdit.title}
            onChange={(e) =>
              setCurrentEdit({ ...currentEdit, title: e.target.value })
            }
            className="w-full mb-4 px-3 py-2 border rounded text-lg font-semibold"
          />

          {/* SCROLLABLE TEXTAREA */}
          <textarea
            value={currentEdit.content}
            onChange={(e) => {
              setCurrentEdit({ ...currentEdit, content: e.target.value })
              setWordCount(calcWordCount(e.target.value))
            }}
            className="w-full flex-1 px-3 py-2 border rounded font-mono text-sm overflow-y-auto"
          />

        </div>

        {/* RIGHT: PREVIEW */}
        <div className="bg-white p-6 rounded-lg border flex flex-col h-[625px]">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">Preview</h3>
            <p className="text-sm text-gray-500">
              Word count: {wordCount}
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            {currentEdit.title}
          </h2>

          {/* SCROLLABLE PREVIEW */}
          <div
            className="prose max-w-none flex-1 overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(currentEdit.content)
            }}
          />

        </div>

      </div>
    </div>
  )
}