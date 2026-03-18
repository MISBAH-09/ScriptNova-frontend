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

  // ✅ NEW STATES (keywords)
  const [keywords, setKeywords] = useState([])
  const [keywordInput, setKeywordInput] = useState("")
  const [loadingKeywords, setLoadingKeywords] = useState(false)

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

  // ✅ KEYWORD FUNCTIONS
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

  // ✅ FIXED BLOG GENERATION
  const handleGenerateBlog = async () => {
    if (!prompt.trim()) return alert("Enter a topic")

    setLoading(true)

    try {
      const res = await generateBlog({
        title: prompt,
        keywords,
        tone,
        length
      })

      const content = res.content
      const title = res.title

      setGenerated({
        title,
        content,
        date: new Date().toISOString()
      })

      setWordCount(calcWordCount(content))

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
    const name = (generated.title || "blog")
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Generate Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Generate Blog</h2>

        <div className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Topic</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your blog topic..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* ✅ KEYWORDS UI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keywords
            </label>

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Add keyword..."
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <button onClick={addKeyword} className="bg-gray-200 px-3 rounded">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {keywords.map((k, i) => (
                <span key={i} className="bg-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {k}
                  <button onClick={() => removeKeyword(i)}>✕</button>
                </span>
              ))}
            </div>

            <button
              onClick={handleGenerateKeywords}
              disabled={loadingKeywords}
              className="text-sm bg-purple-600 text-white px-3 py-1 rounded"
            >
              {loadingKeywords ? "Generating..." : "✨ Generate Keywords"}
            </button>
          </div>

          {/* Tone + Length */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="px-3 py-2 border rounded-md">
              <option>Informative & Friendly</option>
              <option>Professional</option>
              <option>Casual</option>
              <option>Humorous</option>
            </select>

            <select value={length} onChange={(e) => setLength(e.target.value)} className="px-3 py-2 border rounded-md">
              <option>Short (500-800 words)</option>
              <option>Medium (1000-1500 words)</option>
              <option>Long (2000+ words)</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateBlog}
            disabled={loading || !prompt.trim()}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Generating..." : "✦ Generate Blog"}
          </button>

        </div>
      </div>

      {/* Generated Blog */}
      {generated && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold">{generated.title}</h2>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(generated.content) }}
          />

          <div className="flex gap-3 mt-4">
            <button onClick={saveGenerated} className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button onClick={() => openEditor()} className="bg-blue-600 text-white px-4 py-2 rounded">
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
// import { useState } from "react"
// import { generateBlog } from "../../services/blog"
// import axios from "axios"
// import { title } from "framer-motion/client"

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

//   const calcWordCount = (text) =>
//     text ? text.trim().split(/\s+/).length : 0

//   const renderMarkdown = (md) => {
//     if (!md) return ""
//     let html = ""
//     const lines = md.split("\n")
//     let inList = false

//     for (let line of lines) {
//       const t = line.trim()

//       if (!t) {
//         if (inList) {
//           html += "</ul>"
//           inList = false
//         }
//         continue
//       }

//       if (t.startsWith("# ")) {
//         html += `<h1>${t.slice(2)}</h1>`
//       } else if (t.startsWith("## ")) {
//         html += `<h2>${t.slice(3)}</h2>`
//       } else if (t.startsWith("- ") || t.startsWith("* ")) {
//         if (!inList) {
//           html += "<ul>"
//           inList = true
//         }
//         html += `<li>${t.slice(2)}</li>`
//       } else {
//         if (inList) {
//           html += "</ul>"
//           inList = false
//         }
//         html += `<p>${t}</p>`
//       }
//     }

//     if (inList) html += "</ul>"

//     return html
//   }

//   const generateBlog = () => {
//     if (!prompt.trim()) return alert("Enter a topic")
//     setLoading(true)

//     response = generateBlog(prompt, tone, length)
//     .then((res) => {
//       const content = res.data.blog_content
//       const title = res.data.blog_title
//       setGenerated({

//         title,
//         content,
//         date: new Date().toISOString()
//       })
//       setWordCount(calcWordCount(content))
//     })
//     .catch((err) => {
//       console.error("Error generating blog:", err)
//       alert(err.message || "Failed to generate blog")
//     })
//     .finally(() => setLoading(false)) 
//   }




  

// //   const generateDummy = () => {
// //     if (!prompt.trim()) return alert("Enter a topic")

// //     setLoading(true)

// //     setTimeout(() => {
// //       const content = `# ${prompt}

// // This is a generated blog based on:

// // "${prompt}"

// // ## Introduction
// // This section introduces the topic.

// // ## Main Points
// // - Key idea 1
// // - Key idea 2
// // - Key idea 3

// // ## Conclusion
// // Final thoughts about the topic.`

// //       const title = prompt.slice(0, 40)

// //       setGenerated({
// //         title,
// //         content,
// //         date: new Date().toISOString()
// //       })

// //       setWordCount(calcWordCount(content))
// //       setLoading(false)
// //     }, 800)
// //   }

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
//     const name = (generated.title || "blog")
//       .replace(/\s+/g, "_")

//     const blob = new Blob([text], {
//       type: format === "md" ? "text/markdown" : "text/plain"
//     })

//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `${name}.${format}`
//     a.click()
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Generate Form */}
//       <div className="bg-white p-6 rounded-lg shadow-sm border">
//         <h2 className="text-xl font-semibold mb-4">Generate Blog</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Blog Topic</label>
//             <input
//               type="text"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Enter your blog topic..."
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
//               <select
//                 value={tone}
//                 onChange={(e) => setTone(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option>Informative & Friendly</option>
//                 <option>Professional</option>
//                 <option>Casual</option>
//                 <option>Humorous</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
//               <select
//                 value={length}
//                 onChange={(e) => setLength(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option>Short (500-800 words)</option>
//                 <option>Medium (1000-1500 words)</option>
//                 <option>Long (2000+ words)</option>
//               </select>
//             </div>
//           </div>
//           <button
//             // onClick={generateDummy}
//             onClick={generateBlog}
//             disabled={loading || !prompt.trim()}
//             className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
//           >
//             {loading ? "Generating..." : "✦ Generate Blog"}
//           </button>
//         </div>
//       </div>

//       {/* Generated Blog */}
//       {generated && (
//         <div className="bg-white p-6 rounded-lg shadow-sm border">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">{generated.title}</h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 {new Date(generated.date).toLocaleDateString()} • {wordCount} words
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => downloadFile("md", generated.content)}
//                 className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
//               >
//                 Download MD
//               </button>
//               <button
//                 onClick={() => downloadFile("txt", generated.content)}
//                 className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
//               >
//                 Download TXT
//               </button>
//             </div>
//           </div>

//           <div
//             className="prose max-w-none"
//             dangerouslySetInnerHTML={{ __html: renderMarkdown(generated.content) }}
//           />

//           <div className="flex gap-3 mt-6 pt-4 border-t">
//             <button
//               onClick={saveGenerated}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
//             >
//               💾 Save to Library
//             </button>
//             <button
//               onClick={() => openEditor()}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
//             >
//               ✎ Edit Blog
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// <div className="flex gap-3">

// <button
// // onClick={saveBlog}
// className="bg-green-600 text-white px-4 py-2 rounded"
// >
// Save Blog
// </button>

// <button
// // onClick={editBlog}
// className="bg-yellow-500 text-white px-4 py-2 rounded"
// >
// Edit
// </button>

// </div>

// // </div>

// // )}

// // </div>

// //   )
// // }