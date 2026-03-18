import { useState } from "react"
import { generateBlog, generateKeywords } from "../../services/blog"

export default function BlogGenerator({
  generated,
  setGenerated,
  setPosts,
  setPage,
  setCurrentEdit
}) {

  const [prompt, setPrompt] = useState("")
  const [tone, setTone] = useState("Informative & Friendly")
  const [length, setLength] = useState("Medium (1000-1500 words)")
  const [loading, setLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const [keywords, setKeywords] = useState([])
  const [keywordInput, setKeywordInput] = useState("")
  const [loadingKeywords, setLoadingKeywords] = useState(false)

  const calcWordCount = (text) =>
    text ? text.trim().split(/\s+/).length : 0

  // ── Inline: **bold**, *italic*, `code` ──
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

      // Fix broken "# ## Heading" or "# # Heading" patterns from Qwen
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
        html += `<h1 style="font-size:1.5rem;font-weight:800;margin:1.5rem 0 0.5rem">${renderInline(fixedLine.slice(2))}</h1>`
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

    if (inList) html += "</ul>"
    return html
  }

  const addKeyword = () => {
    if (!keywordInput.trim()) return
    setKeywords((prev) => [...prev, keywordInput.trim()])
    setKeywordInput("")
  }

  const removeKeyword = (index) => {
    setKeywords((prev) => prev.filter((_, i) => i !== index))
  }

  const handleGenerateKeywords = async () => {
    if (!prompt.trim()) return alert("Enter topic first")
    try {
      setLoadingKeywords(true)
      const res = await generateKeywords(prompt)
      setKeywords(res)
    } catch (err) {
      alert(err.message || "Failed to generate keywords")
    } finally {
      setLoadingKeywords(false)
    }
  }

  const handleGenerateBlog = async () => {
    if (!prompt.trim()) return alert("Enter a topic")
    setLoading(true)
    try {
      const res = await generateBlog({ title: prompt, keywords, tone, length })
      setGenerated({
        title: res.title,
        content: res.content,
        date: new Date().toISOString()
      })
      setWordCount(calcWordCount(res.content))
    } catch (err) {
      console.error("Error generating blog:", err)
      alert(err.message || "Failed to generate blog")
    } finally {
      setLoading(false)
    }
  }

  const saveGenerated = () => {
    if (!generated.content) return
    setPosts((prev) => [generated, ...prev])
    alert("Saved to library")
  }

  const openEditor = (blog) => {
    setCurrentEdit(blog || generated)
    setWordCount(calcWordCount((blog || generated).content))
    setPage("editor")
  }

  const downloadFile = (format, text) => {
    const name = (generated.title || "blog").replace(/\s+/g, "_")
    const blob = new Blob([text], { type: format === "md" ? "text/markdown" : "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${name}.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* ── Generate Form ── */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Generate Blog</h2>

        <div className="space-y-4">

          {/* Blog Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Topic</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your blog topic..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>

            {/* Input row + Add button */}
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                placeholder="Add SEO keywords or click on generate to genrate by AI"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                onClick={addKeyword}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 rounded-md border border-gray-300 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Keyword chips */}
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {keywords.map((k, i) => (
                  <span
                    key={i}
                    className="bg-pink-50 text-pink-700 border border-pink-200 px-3 py-1 rounded-full text-sm flex items-center gap-1.5"
                  >
                    {k}
                    <button
                      onClick={() => removeKeyword(i)}
                      className="text-pink-400 hover:text-pink-700 font-bold leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Generate Keywords — pushed to the right */}
            <div className="flex justify-end">
              <button
                onClick={handleGenerateKeywords}
                disabled={loadingKeywords}
                className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white font-medium px-4 py-2 rounded-md transition-colors"
              >
                {loadingKeywords ? "Generating..." : "Generate Keywords"}
              </button>
            </div>
          </div>

          {/* Tone + Length */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option>Informative & Friendly</option>
              <option>Professional</option>
              <option>Casual</option>
              <option>Humorous</option>
            </select>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option>Short (500-800 words)</option>
              <option>Medium (1000-1500 words)</option>
              <option>Long (2000+ words)</option>
            </select>
          </div>

          {/* Generate Blog button — pink */}
          <button
            onClick={handleGenerateBlog}
            disabled={loading || !prompt.trim()}
            className="w-full text-lg bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-md transition-colors"
          >
            {loading ? "Generating..." : "Generate Blog"}
          </button>

        </div>
      </div>

      {/* ── Blog Preview ── */}
      {generated && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900">{generated.title}</h2>
          <p className="text-sm text-gray-400 mb-5">Word count: {wordCount}</p>

          <div
            className="prose max-w-none max-h-[600px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(generated.content) }}
          />

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={saveGenerated}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => openEditor()}
              className="bg-blue-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
