// import { useState } from "react"
// import { generateBlog, generateKeywords } from "../../services/blog"

// export default function BlogGenerator({
//   generated,
//   setGenerated,
//   setPosts,
//   setPage,
//   setCurrentEdit
// }) {

//   const [prompt, setPrompt] = useState("")
//   const [tone, setTone] = useState("Informative & Friendly")
//   const [length, setLength] = useState("Medium (1000-1500 words)")
//   const [loading, setLoading] = useState(false)
//   const [wordCount, setWordCount] = useState(0)

//   const [keywords, setKeywords] = useState([])
//   const [keywordInput, setKeywordInput] = useState("")
//   const [loadingKeywords, setLoadingKeywords] = useState(false)

//   const calcWordCount = (text) =>
//     text ? text.trim().split(/\s+/).length : 0

//   // ── Inline: **bold**, *italic*, `code` ──
//   const renderInline = (text) => {
//     return text
//       .replace(/`([^`]+)`/g, "<code>$1</code>")
//       .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
//       .replace(/\*([^*]+)\*/g, "<em>$1</em>")
//   }

//   const renderMarkdown = (md) => {
//     if (!md) return ""
//     let html = ""
//     const lines = md.split("\n")
//     let inList = false

//     for (let line of lines) {
//       const t = line.trim()

//       if (!t) {
//         if (inList) { html += "</ul>"; inList = false }
//         continue
//       }

//       // Fix broken "# ## Heading" or "# # Heading" patterns from Qwen
//       const fixedLine = t
//         .replace(/^# #{1,3} /, "## ")
//         .replace(/^# (?!#)/, "## ")

//       if (fixedLine.startsWith("### ")) {
//         if (inList) { html += "</ul>"; inList = false }
//         html += `<h3 style="font-size:1.1rem;font-weight:700;margin:1.2rem 0 0.4rem">${renderInline(fixedLine.slice(4))}</h3>`
//       } else if (fixedLine.startsWith("## ")) {
//         if (inList) { html += "</ul>"; inList = false }
//         html += `<h2 style="font-size:1.3rem;font-weight:700;margin:1.8rem 0 0.6rem;border-bottom:1px solid #fce7f3;padding-bottom:4px;color:#be185d">${renderInline(fixedLine.slice(3))}</h2>`
//       } else if (fixedLine.startsWith("# ")) {
//         if (inList) { html += "</ul>"; inList = false }
//         html += `<h1 style="font-size:1.5rem;font-weight:800;margin:1.5rem 0 0.5rem">${renderInline(fixedLine.slice(2))}</h1>`
//       } else if (fixedLine.startsWith("- ") || fixedLine.startsWith("* ")) {
//         if (!inList) {
//           html += `<ul style="list-style:disc;padding-left:1.5rem;margin:0.75rem 0">`
//           inList = true
//         }
//         html += `<li style="margin:0.25rem 0">${renderInline(fixedLine.slice(2))}</li>`
//       } else if (fixedLine.startsWith("---")) {
//         if (inList) { html += "</ul>"; inList = false }
//         html += `<hr style="border:none;border-top:1px solid #fce7f3;margin:1rem 0" />`
//       } else {
//         if (inList) { html += "</ul>"; inList = false }
//         html += `<p style="margin:0.6rem 0;line-height:1.75;color:#374151">${renderInline(fixedLine)}</p>`
//       }
//     }

//     if (inList) html += "</ul>"
//     return html
//   }

//   const addKeyword = () => {
//     if (!keywordInput.trim()) return
//     setKeywords((prev) => [...prev, keywordInput.trim()])
//     setKeywordInput("")
//   }

//   const removeKeyword = (index) => {
//     setKeywords((prev) => prev.filter((_, i) => i !== index))
//   }

//   const handleGenerateKeywords = async () => {
//     if (!prompt.trim()) return alert("Enter topic first")
//     try {
//       setLoadingKeywords(true)
//       const res = await generateKeywords(prompt)
//       setKeywords(res)
//     } catch (err) {
//       alert(err.message || "Failed to generate keywords")
//     } finally {
//       setLoadingKeywords(false)
//     }
//   }

//   const handleGenerateBlog = async () => {
//     if (!prompt.trim()) return alert("Enter a topic")
//     setLoading(true)
//     try {
//       const res = await generateBlog({ title: prompt, keywords, tone, length })
//       setGenerated({
//         title: res.title,
//         content: res.content,
//         date: new Date().toISOString()
//       })
//       setWordCount(calcWordCount(res.content))
//     } catch (err) {
//       console.error("Error generating blog:", err)
//       alert(err.message || "Failed to generate blog")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const saveGenerated = () => {
//     if (!generated.content) return
//     setPosts((prev) => [generated, ...prev])
//     alert("Saved to library")
//   }

//   const openEditor = (blog) => {
//     setCurrentEdit(blog || generated)
//     setWordCount(calcWordCount((blog || generated).content))
//     setPage("editor")
//   }

//   const downloadFile = (format, text) => {
//     const name = (generated.title || "blog").replace(/\s+/g, "_")
//     const blob = new Blob([text], { type: format === "md" ? "text/markdown" : "text/plain" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `${name}.${format}`
//     a.click()
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">

//       {/* ── Generate Form ── */}
//       <div className="bg-white p-6 rounded-lg shadow-sm border">
//         <h2 className="text-xl font-semibold mb-4">Generate Blog</h2>

//         <div className="space-y-4">

//           {/* Blog Topic */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Blog Topic</label>
//             <input
//               type="text"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Enter your blog topic..."
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           </div>

//           {/* Keywords */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>

//             {/* Input row + Add button */}
//             <div className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={keywordInput}
//                 onChange={(e) => setKeywordInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && addKeyword()}
//                 placeholder="Add SEO keywords or click on generate to genrate by AI"
//                 className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
//               />
//               <button
//                 onClick={addKeyword}
//                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 rounded-md border border-gray-300 transition-colors"
//               >
//                 Add
//               </button>
//             </div>

//             {/* Keyword chips */}
//             {keywords.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {keywords.map((k, i) => (
//                   <span
//                     key={i}
//                     className="bg-pink-50 text-pink-700 border border-pink-200 px-3 py-1 rounded-full text-sm flex items-center gap-1.5"
//                   >
//                     {k}
//                     <button
//                       onClick={() => removeKeyword(i)}
//                       className="text-pink-400 hover:text-pink-700 font-bold leading-none"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* Generate Keywords — pushed to the right */}
//             <div className="flex justify-end">
//               <button
//                 onClick={handleGenerateKeywords}
//                 disabled={loadingKeywords}
//                 className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white font-medium px-4 py-2 rounded-md transition-colors"
//               >
//                 {loadingKeywords ? "Generating..." : "Generate Keywords"}
//               </button>
//             </div>
//           </div>

//           {/* Tone + Length */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <select
//               value={tone}
//               onChange={(e) => setTone(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
//             >
//               <option>Informative & Friendly</option>
//               <option>Professional</option>
//               <option>Casual</option>
//               <option>Humorous</option>
//             </select>
//             <select
//               value={length}
//               onChange={(e) => setLength(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
//             >
//               <option>Short (500-800 words)</option>
//               <option>Medium (1000-1500 words)</option>
//               <option>Long (2000+ words)</option>
//             </select>
//           </div>

//           {/* Generate Blog button — pink */}
//           <button
//             onClick={handleGenerateBlog}
//             disabled={loading || !prompt.trim()}
//             className="w-full text-lg bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-md transition-colors"
//           >
//             {loading ? "Generating..." : "Generate Blog"}
//           </button>

//         </div>
//       </div>

//       {/* ── Blog Preview ── */}
//       {generated && (
//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <h2 className="text-2xl font-bold text-gray-900">{generated.title}</h2>
//           <p className="text-sm text-gray-400 mb-5">Word count: {wordCount}</p>

//           <div
//             className="prose max-w-none max-h-[600px] overflow-y-auto"
//             dangerouslySetInnerHTML={{ __html: renderMarkdown(generated.content) }}
//           />

//           <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
//             <button
//               onClick={saveGenerated}
//               className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => openEditor()}
//               className="bg-blue-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
//             >
//               Edit
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   )
// }
import { useState, useEffect } from "react"
import { generateBlog, generateKeywords, saveBlog, getUserBlogs, deleteBlog } from "../../services/blog"

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
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState("")

  const [keywords, setKeywords] = useState([])
  const [keywordInput, setKeywordInput] = useState("")
  const [loadingKeywords, setLoadingKeywords] = useState(false)

  // Saved blogs shown side-by-side
  const [savedBlogs, setSavedBlogs] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(false)

  const calcWordCount = (text) =>
    text ? text.trim().split(/\s+/).length : 0

  // Load saved blogs on mount
  useEffect(() => {
    fetchSavedBlogs()
  }, [])

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
    setSavedMsg("")
    try {
      const res = await generateBlog({ title: prompt, keywords, tone, length })
      const blog = {
        title: res.title,
        content: res.content,
        keywords: keywords,
        tone: tone,
        length: length,
        date: new Date().toISOString()
      }
      setGenerated(blog)
      setWordCount(calcWordCount(res.content))

      // Auto-save to backend after generation
      try {
        setSaving(true)
        const saved = await saveBlog({
          title: res.title,
          content: res.content,
          keywords: keywords.join(", "),
          tone: tone,
          length_preference: length,
          status: "draft",
          word_count: calcWordCount(res.content)
        })
        console.log("Auto-saved blog:", saved)
        setSavedMsg("✓ Auto-saved to your library")
        // Refresh the saved blogs panel
        fetchSavedBlogs()
        // Also update parent posts list if provided
        if (setPosts) setPosts((prev) => [blog, ...prev])
      } catch (saveErr) {
        console.error("Auto-save failed:", saveErr)
        setSavedMsg("⚠ Generated but couldn't auto-save")
      } finally {
        setSaving(false)
      }
    } catch (err) {
      console.error("Error generating blog:", err)
      alert(err.message || "Failed to generate blog")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Delete this blog?")) return
    try {
      await deleteBlog(blogId)
      setSavedBlogs((prev) => prev.filter((b) => b.id !== blogId))
    } catch (err) {
      alert("Failed to delete blog")
    }
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

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    } catch { return "" }
  }

  return (
    <div className="space-y-6">
      {/* ── Two-column layout: Generator + Saved Blogs ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT: Generator Form (takes 2/3 width on xl) */}
        <div className="xl:col-span-2 space-y-6">
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
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                    placeholder="Add SEO keywords or click generate by AI"
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    onClick={addKeyword}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 rounded-md border border-gray-300 transition-colors"
                  >
                    Add
                  </button>
                </div>

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

              <button
                onClick={handleGenerateBlog}
                disabled={loading || !prompt.trim()}
                className="w-full text-lg bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Generating...
                  </span>
                ) : "Generate Blog"}
              </button>
            </div>
          </div>

          {/* ── Blog Preview ── */}
          {generated && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-2xl font-bold text-gray-900 flex-1">{generated.title}</h2>
                {saving && (
                  <span className="text-xs text-gray-400 ml-3 mt-1 flex items-center gap-1">
                    <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Saving...
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mb-5">
                <p className="text-sm text-gray-400">Word count: {wordCount}</p>
                {savedMsg && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${savedMsg.startsWith("✓") ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                    {savedMsg}
                  </span>
                )}
              </div>

              <div
                className="prose max-w-none max-h-[600px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(generated.content) }}
              />

              {/* Actions — Save button removed, auto-save handles it */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openEditor()}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => downloadFile("md", generated.content)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-md font-medium transition-colors border"
                >
                  ↓ Markdown
                </button>
                <button
                  onClick={() => downloadFile("txt", generated.content)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-md font-medium transition-colors border"
                >
                  ↓ Text
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Saved Blogs panel (1/3 width on xl) */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border h-fit sticky top-6">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Saved Blogs</h3>
              <span className="text-xs bg-pink-50 text-pink-600 font-medium px-2 py-0.5 rounded-full">
                {savedBlogs.length}
              </span>
            </div>

            <div className="divide-y divide-gray-50 max-h-[700px] overflow-y-auto">
              {loadingBlogs ? (
                <div className="p-6 text-center text-gray-400 text-sm">
                  <svg className="animate-spin w-5 h-5 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Loading blogs...
                </div>
              ) : savedBlogs.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">
                  <div className="text-3xl mb-2">✦</div>
                  <p>No blogs yet.</p>
                  <p className="text-xs mt-1">Generated blogs auto-save here.</p>
                </div>
              ) : (
                savedBlogs.map((blog) => (
                  <div key={blog.id} className="p-4 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{blog.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{formatDate(blog.created_at)}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                            blog.status === 'published'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-yellow-50 text-yellow-600'
                          }`}>
                            {blog.status || 'draft'}
                          </span>
                        </div>
                        {blog.word_count > 0 && (
                          <p className="text-xs text-gray-400 mt-0.5">{blog.word_count} words</p>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditor(blog)}
                          className="p-1.5 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded transition-colors"
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
