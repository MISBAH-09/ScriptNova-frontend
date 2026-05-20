// // import { useState, useEffect } from "react"
// // import { humanizeBlog, getUserBlogs, updateBlog } from "../../services/blog"
// // import { Wand2, Copy, Check, ChevronDown } from "lucide-react"

// // const Spin = ({ cls = "w-4 h-4" }) => (
// //   <svg className={`animate-spin ${cls}`} fill="none" viewBox="0 0 24 24">
// //     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
// //     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
// //   </svg>
// // )

// // const STYLES = [
// //   {
// //     key: "natural",
// //     label: "Natural",
// //     desc: "Reads like a knowledgeable person wrote it — balanced, clear, human",
// //   },
// //   {
// //     key: "conversational",
// //     label: "Conversational",
// //     desc: "Warm and casual — like explaining to a smart friend over coffee",
// //   },
// //   {
// //     key: "storytelling",
// //     label: "Storytelling",
// //     desc: "Narrative-driven — opens with a scene, weaves in information",
// //   },
// //   {
// //     key: "professional",
// //     label: "Professional",
// //     desc: "Senior expert voice — authoritative, confident, zero filler",
// //   },
// // ]

// // const renderInline = (t) =>
// //   t.replace(/`([^`]+)`/g, "<code>$1</code>")
// //    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
// //    .replace(/\*([^*]+)\*/g, "<em>$1</em>")

// // // const renderMarkdown = (md) => {
// // //   if (!md) return ""
// // //   let html = "", inList = false
// // //   for (let line of md.split("\n")) {
// // //     const t = line.trim()
// // //     if (!t) { if (inList) { html += "</ul>"; inList = false }; continue }
// // //     const f = t.replace(/^# #{1,3} /, "## ").replace(/^# (?!#)/, "## ")
// // //     if (f.startsWith("### ")) {
// // //       if (inList) { html += "</ul>"; inList = false }
// // //       html += `<h3 style="font-size:1.1rem;font-weight:700;margin:1.2rem 0 0.4rem">${renderInline(f.slice(4))}</h3>`
// // //     } else if (f.startsWith("## ")) {
// // //       if (inList) { html += "</ul>"; inList = false }
// // //       html += `<h2 style="font-size:1.3rem;font-weight:700;margin:1.8rem 0 0.6rem;border-bottom:1px solid #fce7f3;padding-bottom:4px;color:#be185d">${renderInline(f.slice(3))}</h2>`
// // //     } else if (f.startsWith("# ")) {
// // //       if (inList) { html += "</ul>"; inList = false }
// // //       html += `<h1 style="font-size:1.6rem;font-weight:800;margin:1.5rem 0 0.5rem">${renderInline(f.slice(2))}</h1>`
// // //     } else if (f.startsWith("- ") || f.startsWith("* ")) {
// // //       if (!inList) { html += `<ul style="list-style:disc;padding-left:1.5rem;margin:0.75rem 0">`; inList = true }
// // //       html += `<li style="margin:0.25rem 0">${renderInline(f.slice(2))}</li>`
// // //     } else if (f.startsWith("---")) {
// // //       if (inList) { html += "</ul>"; inList = false }
// // //       html += `<hr style="border:none;border-top:1px solid #fce7f3;margin:1rem 0" />`
// // //     } else {
// // //       if (inList) { html += "</ul>"; inList = false }
// // //       html += `<p style="margin:0.6rem 0;line-height:1.75;color:#374151">${renderInline(f)}</p>`
// // //     }
// // //   }
// // //   if (inList) html += "</ul>"
// // //   return html
// // // }
// // const renderMarkdown = (md) => {
// //   if (!md) return ""

// //   // ── Normalize: ensure ## headings always have a blank line before them ──
// //   // This handles the case where backend returns "...last sentence.## Heading" on one line
// //   const normalized = md
// //     .replace(/([^\n])(## )/g, "$1\n\n$2")   // blank line before ##
// //     .replace(/(## [^\n]+)([^\n])/g, "$1\n$2") // newline after ## heading

// //   let html = ""
// //   let inList = false

// //   for (let line of normalized.split("\n")) {
// //     const t = line.trim()

// //     if (!t) {
// //       if (inList) { html += "</ul>"; inList = false }
// //       continue
// //     }

// //     if (t.startsWith("### ")) {
// //       if (inList) { html += "</ul>"; inList = false }
// //       html += `<h3 style="font-size:1.05rem;font-weight:700;margin:1.2rem 0 0.4rem;color:#374151">${renderInline(t.slice(4))}</h3>`
// //     } else if (t.startsWith("## ")) {
// //       if (inList) { html += "</ul>"; inList = false }
// //       html += `<h2 style="font-size:1.25rem;font-weight:700;margin:2rem 0 0.6rem;padding-bottom:4px;border-bottom:2px solid #fce7f3;color:#be185d">${renderInline(t.slice(3))}</h2>`
// //     } else if (t.startsWith("# ")) {
// //       if (inList) { html += "</ul>"; inList = false }
// //       html += `<h1 style="font-size:1.5rem;font-weight:800;margin:1.5rem 0 0.5rem;color:#111827">${renderInline(t.slice(2))}</h1>`
// //     } else if (t.startsWith("- ") || t.startsWith("* ")) {
// //       if (!inList) { html += `<ul style="list-style:disc;padding-left:1.5rem;margin:0.75rem 0">`; inList = true }
// //       html += `<li style="margin:0.3rem 0;line-height:1.75;color:#374151">${renderInline(t.slice(2))}</li>`
// //     } else if (t.startsWith("---")) {
// //       if (inList) { html += "</ul>"; inList = false }
// //       html += `<hr style="border:none;border-top:1px solid #fce7f3;margin:1.25rem 0"/>`
// //     } else {
// //       if (inList) { html += "</ul>"; inList = false }
// //       html += `<p style="margin:0.6rem 0;line-height:1.8;color:#374151">${renderInline(t)}</p>`
// //     }
// //   }

// //   if (inList) html += "</ul>"
// //   return html
// // }

// // export default function Humanize({ setPage, setCurrentEdit }) {
// //   // Source options
// //   const [mode, setMode]           = useState("custom")  // "custom" | "blog"
// //   const [customText, setCustomText] = useState("")
// //   const [blogs, setBlogs]         = useState([])
// //   const [selectedBlog, setSelectedBlog] = useState(null)
// //   const [loadingBlogs, setLoadingBlogs] = useState(false)

// //   // Humanize options
// //   const [style, setStyle]         = useState("natural")
// //   const [loading, setLoading]     = useState(false)
// //   const [result, setResult]       = useState("")
// //   const [saved, setSaved]         = useState(false)
// //   const [copied, setCopied]       = useState(false)
// //   const [statusMsg, setStatusMsg] = useState("")

// //   // View toggle
// //   const [viewMode, setViewMode]   = useState("preview")  // "preview" | "raw"

// //   useEffect(() => {
// //     if (mode === "blog") fetchBlogs()
// //   }, [mode])

// //   const fetchBlogs = async () => {
// //     try {
// //       setLoadingBlogs(true)
// //       setBlogs(await getUserBlogs())
// //     } catch (e) { console.error(e) }
// //     finally { setLoadingBlogs(false) }
// //   }

// //   const getSourceContent = () => {
// //     if (mode === "custom") return customText.trim()
// //     if (mode === "blog" && selectedBlog) return selectedBlog.content || ""
// //     return ""
// //   }

// //   const wordCount = (t) => t ? t.trim().split(/\s+/).filter(Boolean).length : 0

// //   const handleHumanize = async () => {
// //     const content = getSourceContent()
// //     if (!content) return alert(mode === "custom" ? "Paste some content first" : "Select a blog first")

// //     try {
// //       setLoading(true)
// //       setResult("")
// //       setSaved(false)
// //       setStatusMsg("")

// //       const humanized = await humanizeBlog({
// //         content,
// //         style,
// //         // Only save to DB if a blog is selected
// //         blog_id: mode === "blog" && selectedBlog ? selectedBlog.id : null,
// //       })

// //       setResult(humanized)
// //       if (mode === "blog" && selectedBlog) {
// //         setSaved(true)
// //         setStatusMsg("✓ Humanized & saved to your blog")
// //       }
// //     } catch (e) {
// //       alert(e.message || "Humanize failed")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleCopy = () => {
// //     navigator.clipboard.writeText(result)
// //     setCopied(true)
// //     setTimeout(() => setCopied(false), 2000)
// //   }

// //   const handleOpenEditor = () => {
// //     if (!selectedBlog) return
// //     setCurrentEdit({ id: selectedBlog.id, slug: selectedBlog.slug })
// //     setPage("editor")
// //   }

// //   const sourceContent = getSourceContent()

// //   return (
// //     <div className="space-y-6">

// //       {/* ── Header ── */}
// //       <div className="flex items-center gap-3">
// //         <div className="p-2 bg-pink-50 rounded-lg">
// //           <Wand2 className="w-6 h-6 text-pink-500" />
// //         </div>
// //         <div>
// //           <h2 className="text-2xl font-bold text-gray-900">Humanize Layer</h2>
// //           <p className="text-sm text-gray-500">Make AI-written content sound like a real person wrote it</p>
// //         </div>
// //         {statusMsg && (
// //           <span className="ml-auto text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600">
// //             {statusMsg}
// //           </span>
// //         )}
// //       </div>

// //       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

// //         {/* ── LEFT: Input ── */}
// //         <div className="space-y-4">

// //           {/* Source toggle */}
// //           <div className="bg-white rounded-lg border p-5 space-y-4">
// //             <div>
// //               <p className="text-sm font-medium text-gray-700 mb-2">Content source</p>
// //               <div className="flex gap-2">
// //                 {[
// //                   { key: "custom", label: "✎ Paste custom text" },
// //                   { key: "blog",   label: "📄 Pick from My Blogs" },
// //                 ].map(({ key, label }) => (
// //                   <button key={key} onClick={() => { setMode(key); setResult(""); setSaved(false) }}
// //                     className={`flex-1 text-sm py-2 px-3 rounded-lg border font-medium transition-colors ${
// //                       mode === key ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-600 border-gray-300 hover:border-pink-400"
// //                     }`}>
// //                     {label}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Custom text */}
// //             {mode === "custom" && (
// //               <div>
// //                 <div className="flex justify-between items-center mb-1">
// //                   <label className="text-xs font-medium text-gray-500">Paste your content</label>
// //                   <span className="text-xs text-gray-400">{wordCount(customText)} words</span>
// //                 </div>
// //                 <textarea
// //                   value={customText}
// //                   onChange={e => setCustomText(e.target.value)}
// //                   placeholder="Paste any AI-generated content here — blog post, article, paragraph, anything..."
// //                   className="w-full h-64 px-3 py-2 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
// //                 />
// //               </div>
// //             )}

// //             {/* Blog picker */}
// //             {mode === "blog" && (
// //               <div>
// //                 <label className="text-xs font-medium text-gray-500 mb-1 block">Select a blog</label>
// //                 {loadingBlogs ? (
// //                   <div className="flex items-center gap-2 text-gray-400 text-sm py-3">
// //                     <Spin />Loading blogs...
// //                   </div>
// //                 ) : (
// //                   <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
// //                     {blogs.length === 0 ? (
// //                       <p className="text-sm text-gray-400 py-3 text-center">No blogs yet — generate one first</p>
// //                     ) : blogs.map(b => (
// //                       <button key={b.id} onClick={() => setSelectedBlog(b)}
// //                         className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
// //                           selectedBlog?.id === b.id
// //                             ? "border-pink-400 bg-pink-50 text-pink-700"
// //                             : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"
// //                         }`}>
// //                         <div className="flex items-center justify-between gap-2">
// //                           <span className="font-medium truncate">{b.title}</span>
// //                           {b.is_humanized && (
// //                             <span className="flex-shrink-0 text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
// //                               ✦ Humanized
// //                             </span>
// //                           )}
// //                         </div>
// //                         {b.prompt && <p className="text-xs text-gray-400 truncate mt-0.5 italic">{b.prompt}</p>}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 )}
// //                 {selectedBlog && (
// //                   <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-500">
// //                     {wordCount(selectedBlog.content || "")} words selected
// //                     {selectedBlog.is_humanized && " · Already has a humanized version (will overwrite)"}
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Style picker */}
// //           <div className="bg-white rounded-lg border p-5">
// //             <p className="text-sm font-medium text-gray-700 mb-3">Humanize style</p>
// //             <div className="grid grid-cols-2 gap-2">
// //               {STYLES.map(s => (
// //                 <button key={s.key} onClick={() => setStyle(s.key)}
// //                   className={`text-left p-3 rounded-lg border transition-colors ${
// //                     style === s.key
// //                       ? "border-pink-400 bg-pink-50"
// //                       : "border-gray-200 hover:border-pink-300"
// //                   }`}>
// //                   <p className={`text-sm font-semibold ${style === s.key ? "text-pink-600" : "text-gray-800"}`}>
// //                     {s.label}
// //                   </p>
// //                   <p className="text-xs text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Humanize button */}
// //           <button
// //             onClick={handleHumanize}
// //             disabled={loading || !sourceContent}
// //             className="w-full py-3 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
// //             {loading
// //               ? <><Spin />Humanizing... this may take a moment</>
// //               : <><Wand2 className="w-4 h-4" />Humanize Content</>
// //             }
// //           </button>
// //         </div>

// //         {/* ── RIGHT: Output ── */}
// //         <div className="bg-white rounded-lg border flex flex-col h-[700px]">
// //           <div className="p-4 border-b border-gray-100 flex items-center justify-between">
// //             <div>
// //               <h3 className="font-semibold text-gray-800">Humanized Output</h3>
// //               {result && <p className="text-xs text-gray-400 mt-0.5">{wordCount(result)} words</p>}
// //             </div>
// //             {result && (
// //               <div className="flex items-center gap-2">
// //                 {/* View toggle */}
// //                 <div className="flex bg-gray-100 rounded-lg p-0.5">
// //                   {["preview", "raw"].map(v => (
// //                     <button key={v} onClick={() => setViewMode(v)}
// //                       className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
// //                         viewMode === v ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
// //                       }`}>
// //                       {v === "preview" ? "Preview" : "Raw"}
// //                     </button>
// //                   ))}
// //                 </div>
// //                 {/* Copy */}
// //                 <button onClick={handleCopy}
// //                   className="flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors">
// //                   {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
// //                   {copied ? "Copied!" : "Copy"}
// //                 </button>
// //                 {/* Open in editor (only if blog mode) */}
// //                 {mode === "blog" && selectedBlog && (
// //                   <button onClick={handleOpenEditor}
// //                     className="text-xs bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg transition-colors">
// //                     Open in Editor →
// //                   </button>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex-1 overflow-y-auto p-5">
// //             {!result && !loading && (
// //               <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm gap-2">
// //                 <Wand2 className="w-10 h-10 opacity-20" />
// //                 <p>Your humanized content will appear here</p>
// //                 <p className="text-xs text-center max-w-xs opacity-70">
// //                   Paste text or pick a blog, choose a style, and click Humanize
// //                 </p>
// //               </div>
// //             )}
// //             {loading && (
// //               <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
// //                 <Spin cls="w-8 h-8" />
// //                 <p className="text-sm">Rewriting in {STYLES.find(s => s.key === style)?.label} style...</p>
// //                 <p className="text-xs opacity-60">This usually takes 30–60 seconds</p>
// //               </div>
// //             )}
// //             {result && !loading && (
// //               viewMode === "preview"
// //                 ? <div className="prose max-w-none"
// //                     dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }} />
// //                 : <textarea
// //                     readOnly
// //                     value={result}
// //                     className="w-full h-full text-sm font-mono bg-gray-50 border rounded p-3 resize-none focus:outline-none" />
// //             )}
// //           </div>

// //           {/* Saved badge */}
// //           {saved && (
// //             <div className="px-5 py-3 border-t border-gray-100 bg-green-50 text-green-700 text-xs font-medium rounded-b-lg">
// //               ✓ Humanized version saved to "<span className="font-semibold">{selectedBlog?.title}</span>" — open the Editor to view both versions side by side
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }



// import { useState, useEffect } from "react"
// import { humanizeBlog, detectAI, getUserBlogs, updateBlog } from "../../services/blog"
// import { Wand2, Copy, Check, ChevronDown } from "lucide-react"

// const Spin = ({ cls = "w-4 h-4" }) => (
//   <svg className={`animate-spin ${cls}`} fill="none" viewBox="0 0 24 24">
//     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//   </svg>
// )

// const STYLES = [
//   {
//     key: "natural",
//     label: "Natural",
//     desc: "Reads like a knowledgeable person wrote it — balanced, clear, human",
//   },
//   {
//     key: "conversational",
//     label: "Conversational",
//     desc: "Warm and casual — like explaining to a smart friend over coffee",
//   },
//   {
//     key: "storytelling",
//     label: "Storytelling",
//     desc: "Narrative-driven — opens with a scene, weaves in information",
//   },
//   {
//     key: "professional",
//     label: "Professional",
//     desc: "Senior expert voice — authoritative, confident, zero filler",
//   },
// ]

// // ── AI score badge ────────────────────────────────────────────────────────
// const ScoreBadge = ({ percent, label, small = false }) => {
//   if (!percent) return null
//   const pct = parseFloat(percent)
//   const color = pct < 20
//     ? "bg-green-50 text-green-700 border-green-200"
//     : pct < 45
//     ? "bg-yellow-50 text-yellow-700 border-yellow-200"
//     : "bg-red-50 text-red-700 border-red-200"
//   return (
//     <span className={`inline-flex items-center gap-1 border rounded-full font-medium
//       ${small ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"} ${color}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${
//         pct < 20 ? "bg-green-500" : pct < 45 ? "bg-yellow-500" : "bg-red-500"
//       }`} />
//       {percent} AI {label ? `· ${label}` : ""}
//     </span>
//   )
// }

// // ── Score history bar ─────────────────────────────────────────────────────
// const ScoreHistory = ({ history }) => {
//   if (!history?.length) return null
//   return (
//     <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
//       <p className="text-xs font-medium text-gray-500 mb-2">Score per loop pass</p>
//       <div className="flex items-end gap-1.5 h-8">
//         {history.map((pct, i) => {
//           const h = Math.max(8, Math.round((pct / 100) * 32))
//           const color = pct < 20 ? "bg-green-400" : pct < 45 ? "bg-yellow-400" : "bg-red-400"
//           return (
//             <div key={i} className="flex flex-col items-center gap-0.5">
//               <span className="text-xs text-gray-400" style={{ fontSize: 9 }}>{Math.round(pct)}%</span>
//               <div className={`w-5 rounded-t ${color}`} style={{ height: h }} title={`Pass ${i + 1}: ${Math.round(pct)}%`} />
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// const renderInline = (t) =>
//   t.replace(/`([^`]+)`/g, "<code>$1</code>")
//    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
//    .replace(/\*([^*]+)\*/g, "<em>$1</em>")

// const renderMarkdown = (md) => {
//   if (!md) return ""
//   const normalized = md
//     .replace(/([^\n])(## )/g, "$1\n\n$2")
//     .replace(/(## [^\n]+)([^\n])/g, "$1\n$2")

//   let html = ""
//   let inList = false

//   for (let line of normalized.split("\n")) {
//     const t = line.trim()
//     if (!t) {
//       if (inList) { html += "</ul>"; inList = false }
//       continue
//     }
//     if (t.startsWith("### ")) {
//       if (inList) { html += "</ul>"; inList = false }
//       html += `<h3 style="font-size:1.05rem;font-weight:700;margin:1.2rem 0 0.4rem;color:#374151">${renderInline(t.slice(4))}</h3>`
//     } else if (t.startsWith("## ")) {
//       if (inList) { html += "</ul>"; inList = false }
//       html += `<h2 style="font-size:1.25rem;font-weight:700;margin:2rem 0 0.6rem;padding-bottom:4px;border-bottom:2px solid #fce7f3;color:#be185d">${renderInline(t.slice(3))}</h2>`
//     } else if (t.startsWith("# ")) {
//       if (inList) { html += "</ul>"; inList = false }
//       html += `<h1 style="font-size:1.5rem;font-weight:800;margin:1.5rem 0 0.5rem;color:#111827">${renderInline(t.slice(2))}</h1>`
//     } else if (t.startsWith("- ") || t.startsWith("* ")) {
//       if (!inList) { html += `<ul style="list-style:disc;padding-left:1.5rem;margin:0.75rem 0">`; inList = true }
//       html += `<li style="margin:0.3rem 0;line-height:1.75;color:#374151">${renderInline(t.slice(2))}</li>`
//     } else if (t.startsWith("---")) {
//       if (inList) { html += "</ul>"; inList = false }
//       html += `<hr style="border:none;border-top:1px solid #fce7f3;margin:1.25rem 0"/>`
//     } else {
//       if (inList) { html += "</ul>"; inList = false }
//       html += `<p style="margin:0.6rem 0;line-height:1.8;color:#374151">${renderInline(t)}</p>`
//     }
//   }
//   if (inList) html += "</ul>"
//   return html
// }

// export default function Humanize({ setPage, setCurrentEdit }) {
//   const [mode, setMode]               = useState("custom")
//   const [customText, setCustomText]   = useState("")
//   const [blogs, setBlogs]             = useState([])
//   const [selectedBlog, setSelectedBlog] = useState(null)
//   const [loadingBlogs, setLoadingBlogs] = useState(false)

//   const [style, setStyle]             = useState("natural")
//   const [loading, setLoading]         = useState(false)
//   const [result, setResult]           = useState("")
//   const [saved, setSaved]             = useState(false)
//   const [copied, setCopied]           = useState(false)
//   const [statusMsg, setStatusMsg]     = useState("")
//   const [viewMode, setViewMode]       = useState("preview")

//   // ── New: score state ──────────────────────────────────────────────────
//   const [inputScore, setInputScore]   = useState(null)   // score before humanizing
//   const [outputScore, setOutputScore] = useState(null)   // score after
//   const [scoreHistory, setScoreHistory] = useState([])
//   const [detecting, setDetecting]     = useState(false)

//   useEffect(() => { if (mode === "blog") fetchBlogs() }, [mode])

//   // Auto-detect score when input changes (debounced)
//   useEffect(() => {
//     const text = mode === "custom" ? customText : (selectedBlog?.content || "")
//     if (!text || text.length < 100) { setInputScore(null); return }
//     const timer = setTimeout(() => runDetect(text), 800)
//     return () => clearTimeout(timer)
//   }, [customText, selectedBlog, mode])

//   const fetchBlogs = async () => {
//     try {
//       setLoadingBlogs(true)
//       setBlogs(await getUserBlogs())
//     } catch (e) { console.error(e) }
//     finally { setLoadingBlogs(false) }
//   }

//   const runDetect = async (text) => {
//     try {
//       setDetecting(true)
//       const r = await detectAI(text)
//       setInputScore(r)
//     } catch (e) { /* silent */ }
//     finally { setDetecting(false) }
//   }

//   const getSourceContent = () => {
//     if (mode === "custom") return customText.trim()
//     if (mode === "blog" && selectedBlog) return selectedBlog.content || ""
//     return ""
//   }

//   const wordCount = (t) => t ? t.trim().split(/\s+/).filter(Boolean).length : 0

//   const handleHumanize = async () => {
//     const content = getSourceContent()
//     if (!content) return alert(mode === "custom" ? "Paste some content first" : "Select a blog first")

//     try {
//       setLoading(true)
//       setResult("")
//       setSaved(false)
//       setStatusMsg("")
//       setOutputScore(null)
//       setScoreHistory([])

//       const data = await humanizeBlog({
//         content,
//         style,
//         blog_id:      mode === "blog" && selectedBlog ? selectedBlog.id : null,
//         run_loop:     true,
//         target_score: 0.15,
//       })

//       // data is the full object now: { humanized_content, ai_score, score_history, ... }
//       setResult(data.humanized_content || "")
//       setOutputScore({ percent: data.ai_score, label: data.target_reached ? "✓ Target reached" : "" })
//       setScoreHistory(data.score_history || [])

//       if (mode === "blog" && selectedBlog && data.saved) {
//         setSaved(true)
//         setStatusMsg("✓ Humanized & saved to your blog")
//       }
//     } catch (e) {
//       alert(e.message || "Humanize failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCopy = () => {
//     navigator.clipboard.writeText(result)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   const handleOpenEditor = () => {
//     if (!selectedBlog) return
//     setCurrentEdit({ id: selectedBlog.id, slug: selectedBlog.slug })
//     setPage("editor")
//   }

//   const sourceContent = getSourceContent()

//   return (
//     <div className="space-y-6">

//       {/* ── Header ── */}
//       <div className="flex items-center gap-3">
//         <div className="p-2 bg-pink-50 rounded-lg">
//           <Wand2 className="w-6 h-6 text-pink-500" />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Humanize Layer</h2>
//           <p className="text-sm text-gray-500">Make AI-written content sound like a real person wrote it</p>
//         </div>
//         {statusMsg && (
//           <span className="ml-auto text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600">
//             {statusMsg}
//           </span>
//         )}
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

//         {/* ── LEFT: Input ── */}
//         <div className="space-y-4">

//           <div className="bg-white rounded-lg border p-5 space-y-4">
//             <div>
//               <p className="text-sm font-medium text-gray-700 mb-2">Content source</p>
//               <div className="flex gap-2">
//                 {[
//                   { key: "custom", label: "✎ Paste custom text" },
//                   { key: "blog",   label: "📄 Pick from My Blogs" },
//                 ].map(({ key, label }) => (
//                   <button key={key} onClick={() => { setMode(key); setResult(""); setSaved(false); setInputScore(null) }}
//                     className={`flex-1 text-sm py-2 px-3 rounded-lg border font-medium transition-colors ${
//                       mode === key ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-600 border-gray-300 hover:border-pink-400"
//                     }`}>
//                     {label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Custom text */}
//             {mode === "custom" && (
//               <div>
//                 <div className="flex justify-between items-center mb-1">
//                   <label className="text-xs font-medium text-gray-500">Paste your content</label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-gray-400">{wordCount(customText)} words</span>
//                     {detecting && <Spin cls="w-3 h-3 text-gray-400" />}
//                     {inputScore && !detecting && <ScoreBadge percent={inputScore.percent} small />}
//                   </div>
//                 </div>
//                 <textarea
//                   value={customText}
//                   onChange={e => setCustomText(e.target.value)}
//                   placeholder="Paste any AI-generated content here — blog post, article, paragraph, anything..."
//                   className="w-full h-64 px-3 py-2 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
//                 />
//               </div>
//             )}

//             {/* Blog picker */}
//             {mode === "blog" && (
//               <div>
//                 <label className="text-xs font-medium text-gray-500 mb-1 block">Select a blog</label>
//                 {loadingBlogs ? (
//                   <div className="flex items-center gap-2 text-gray-400 text-sm py-3">
//                     <Spin />Loading blogs...
//                   </div>
//                 ) : (
//                   <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
//                     {blogs.length === 0 ? (
//                       <p className="text-sm text-gray-400 py-3 text-center">No blogs yet — generate one first</p>
//                     ) : blogs.map(b => (
//                       <button key={b.id} onClick={() => setSelectedBlog(b)}
//                         className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${
//                           selectedBlog?.id === b.id
//                             ? "border-pink-400 bg-pink-50 text-pink-700"
//                             : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"
//                         }`}>
//                         <div className="flex items-center justify-between gap-2">
//                           <span className="font-medium truncate">{b.title}</span>
//                           {b.is_humanized && (
//                             <span className="flex-shrink-0 text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
//                               ✦ Humanized
//                             </span>
//                           )}
//                         </div>
//                         {b.prompt && <p className="text-xs text-gray-400 truncate mt-0.5 italic">{b.prompt}</p>}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//                 {selectedBlog && (
//                   <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-500 flex items-center justify-between">
//                     <span>
//                       {wordCount(selectedBlog.content || "")} words selected
//                       {selectedBlog.is_humanized && " · Already humanized (will overwrite)"}
//                     </span>
//                     {detecting && <Spin cls="w-3 h-3 text-gray-400" />}
//                     {inputScore && !detecting && <ScoreBadge percent={inputScore.percent} small />}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Style picker */}
//           <div className="bg-white rounded-lg border p-5">
//             <p className="text-sm font-medium text-gray-700 mb-3">Humanize style</p>
//             <div className="grid grid-cols-2 gap-2">
//               {STYLES.map(s => (
//                 <button key={s.key} onClick={() => setStyle(s.key)}
//                   className={`text-left p-3 rounded-lg border transition-colors ${
//                     style === s.key ? "border-pink-400 bg-pink-50" : "border-gray-200 hover:border-pink-300"
//                   }`}>
//                   <p className={`text-sm font-semibold ${style === s.key ? "text-pink-600" : "text-gray-800"}`}>
//                     {s.label}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-0.5 leading-snug">{s.desc}</p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Humanize button */}
//           <button
//             onClick={handleHumanize}
//             disabled={loading || !sourceContent}
//             className="w-full py-3 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
//             {loading
//               ? <><Spin />Humanizing... this may take a moment</>
//               : <><Wand2 className="w-4 h-4" />Humanize Content</>
//             }
//           </button>

//           {/* Score comparison — shown after humanizing */}
//           {outputScore && (
//             <div className="bg-white rounded-lg border p-4 space-y-2">
//               <p className="text-xs font-medium text-gray-500 mb-2">Detection score</p>
//               <div className="flex items-center gap-3">
//                 {inputScore && (
//                   <>
//                     <div className="text-center">
//                       <p className="text-xs text-gray-400 mb-1">Before</p>
//                       <ScoreBadge percent={inputScore.percent} />
//                     </div>
//                     <span className="text-gray-300 text-lg">→</span>
//                   </>
//                 )}
//                 <div className="text-center">
//                   <p className="text-xs text-gray-400 mb-1">After</p>
//                   <ScoreBadge percent={outputScore.percent} label={outputScore.label} />
//                 </div>
//               </div>
//               <ScoreHistory history={scoreHistory} />
//             </div>
//           )}
//         </div>

//         {/* ── RIGHT: Output — unchanged ── */}
//         <div className="bg-white rounded-lg border flex flex-col h-[700px]">
//           <div className="p-4 border-b border-gray-100 flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-gray-800">Humanized Output</h3>
//               {result && <p className="text-xs text-gray-400 mt-0.5">{wordCount(result)} words</p>}
//             </div>
//             {result && (
//               <div className="flex items-center gap-2">
//                 <div className="flex bg-gray-100 rounded-lg p-0.5">
//                   {["preview", "raw"].map(v => (
//                     <button key={v} onClick={() => setViewMode(v)}
//                       className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
//                         viewMode === v ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
//                       }`}>
//                       {v === "preview" ? "Preview" : "Raw"}
//                     </button>
//                   ))}
//                 </div>
//                 <button onClick={handleCopy}
//                   className="flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors">
//                   {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
//                   {copied ? "Copied!" : "Copy"}
//                 </button>
//                 {mode === "blog" && selectedBlog && (
//                   <button onClick={handleOpenEditor}
//                     className="text-xs bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg transition-colors">
//                     Open in Editor →
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="flex-1 overflow-y-auto p-5">
//             {!result && !loading && (
//               <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm gap-2">
//                 <Wand2 className="w-10 h-10 opacity-20" />
//                 <p>Your humanized content will appear here</p>
//                 <p className="text-xs text-center max-w-xs opacity-70">
//                   Paste text or pick a blog, choose a style, and click Humanize
//                 </p>
//               </div>
//             )}
//             {loading && (
//               <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
//                 <Spin cls="w-8 h-8" />
//                 <p className="text-sm">Rewriting in {STYLES.find(s => s.key === style)?.label} style...</p>
//                 <p className="text-xs opacity-60">Detecting AI patterns and fixing flagged sentences...</p>
//               </div>
//             )}
//             {result && !loading && (
//               viewMode === "preview"
//                 ? <div className="prose max-w-none"
//                     dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }} />
//                 : <textarea
//                     readOnly
//                     value={result}
//                     className="w-full h-full text-sm font-mono bg-gray-50 border rounded p-3 resize-none focus:outline-none" />
//             )}
//           </div>

//           {saved && (
//             <div className="px-5 py-3 border-t border-gray-100 bg-green-50 text-green-700 text-xs font-medium rounded-b-lg">
//               ✓ Humanized version saved to "<span className="font-semibold">{selectedBlog?.title}</span>" — open the Editor to view both versions side by side
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from "react"
import { humanizeBlog, detectAI, getUserBlogs } from "../../services/blog"
import { Wand2, Copy, Check } from "lucide-react"

const Spin = ({ cls = "w-4 h-4" }) => (
  <svg className={`animate-spin ${cls}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

const STYLES = [
  { key: "natural", label: "Natural", desc: "Reads like a knowledgeable person wrote it — balanced, clear, human" },
  { key: "conversational", label: "Conversational", desc: "Warm and casual — like explaining to a smart friend over coffee" },
  { key: "storytelling", label: "Storytelling", desc: "Narrative-driven — opens with a scene, weaves in information" },
  { key: "professional", label: "Professional", desc: "Senior expert voice — authoritative, confident, zero filler" },
]

// ── AI score badge ────────────────────────────────────────────────────────
const ScoreBadge = ({ percent, label, small = false }) => {
  if (!percent) return null
  const pct = parseFloat(percent)
  const color = pct < 30
    ? "bg-green-50 text-green-700 border-green-200"
    : pct < 60
      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
      : "bg-red-50 text-red-700 border-red-200"
  return (
    <span className={`inline-flex items-center gap-1 border rounded-full font-medium
      ${small ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"} ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${pct < 30 ? "bg-green-500" : pct < 60 ? "bg-yellow-500" : "bg-red-500"
        }`} />
      {percent} AI {label ? `· ${label}` : ""}
    </span>
  )
}

const renderInline = (t) =>
  t.replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")

const renderMarkdown = (md) => {
  if (!md) return ""
  const normalized = md
    .replace(/([^\n])(## )/g, "$1\n\n$2")
    .replace(/(## [^\n]+)([^\n])/g, "$1\n$2")
  let html = "", inList = false
  for (let line of normalized.split("\n")) {
    const t = line.trim()
    if (!t) { if (inList) { html += "</ul>"; inList = false } continue }
    if (t.startsWith("### ")) {
      if (inList) { html += "</ul>"; inList = false }
      html += `<h3 style="font-size:1.05rem;font-weight:700;margin:1.2rem 0 0.4rem;color:#374151">${renderInline(t.slice(4))}</h3>`
    } else if (t.startsWith("## ")) {
      if (inList) { html += "</ul>"; inList = false }
      html += `<h2 style="font-size:1.25rem;font-weight:700;margin:2rem 0 0.6rem;padding-bottom:4px;border-bottom:2px solid #fce7f3;color:#be185d">${renderInline(t.slice(3))}</h2>`
    } else if (t.startsWith("# ")) {
      if (inList) { html += "</ul>"; inList = false }
      html += `<h1 style="font-size:1.5rem;font-weight:800;margin:1.5rem 0 0.5rem;color:#111827">${renderInline(t.slice(2))}</h1>`
    } else if (t.startsWith("- ") || t.startsWith("* ")) {
      if (!inList) { html += `<ul style="list-style:disc;padding-left:1.5rem;margin:0.75rem 0">`; inList = true }
      html += `<li style="margin:0.3rem 0;line-height:1.75;color:#374151">${renderInline(t.slice(2))}</li>`
    } else if (t.startsWith("---")) {
      if (inList) { html += "</ul>"; inList = false }
      html += `<hr style="border:none;border-top:1px solid #fce7f3;margin:1.25rem 0"/>`
    } else {
      if (inList) { html += "</ul>"; inList = false }
      html += `<p style="margin:0.6rem 0;line-height:1.8;color:#374151">${renderInline(t)}</p>`
    }
  }
  if (inList) html += "</ul>"
  return html
}

export default function Humanize({ setPage, setCurrentEdit }) {
  const [mode, setMode] = useState("custom")
  const [customText, setCustomText] = useState("")
  const [blogs, setBlogs] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [loadingBlogs, setLoadingBlogs] = useState(false)

  const [style, setStyle] = useState("natural")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [statusMsg, setStatusMsg] = useState("")
  const [viewMode, setViewMode] = useState("preview")

  const [inputScore, setInputScore] = useState(null)
  const [outputScore, setOutputScore] = useState(null)
  const [detecting, setDetecting] = useState(false)

  useEffect(() => { if (mode === "blog") fetchBlogs() }, [mode])

  // Auto-detect score when input changes
  useEffect(() => {
    const text = mode === "custom" ? customText : (selectedBlog?.content || "")
    if (!text || text.length < 100) { setInputScore(null); return }
    const timer = setTimeout(() => runDetect(text), 800)
    return () => clearTimeout(timer)
  }, [customText, selectedBlog, mode])

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true)
      setBlogs(await getUserBlogs())
    } catch (e) { console.error(e) }
    finally { setLoadingBlogs(false) }
  }

  const runDetect = async (text) => {
    try {
      setDetecting(true)
      const r = await detectAI(text)
      console.log('AI Detect:', r)
      setInputScore(r)
    } catch (e) { /* silent */ }
    finally { setDetecting(false) }
  }

  const getSourceContent = () => {
    if (mode === "custom") return customText.trim()
    if (mode === "blog" && selectedBlog) return selectedBlog.content || ""
    return ""
  }

  const wordCount = (t) => t ? t.trim().split(/\s+/).filter(Boolean).length : 0

  const handleHumanize = async () => {
    const content = getSourceContent()
    if (!content) return alert(mode === "custom" ? "Paste some content first" : "Select a blog first")
    try {
      setLoading(true)
      setResult("")
      setSaved(false)
      setStatusMsg("")
      setOutputScore(null)

      const data = await humanizeBlog({
        content,
        style,
        blog_id: mode === "blog" && selectedBlog ? selectedBlog.id : null,
      })

      setResult(data.humanized_content || "")
      setOutputScore({ percent: data.ai_score?.percent, label: data.ai_score?.label })

      if (mode === "blog" && selectedBlog && data.saved) {
        setSaved(true)
        setStatusMsg("✓ Humanized & saved to your blog")
      }
    } catch (e) {
      alert(e.message || "Humanize failed")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenEditor = () => {
    if (!selectedBlog) return
    setCurrentEdit({ id: selectedBlog.id, slug: selectedBlog.slug })
    setPage("editor")
  }

  const sourceContent = getSourceContent()

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-pink-50 rounded-lg">
          <Wand2 className="w-6 h-6 text-pink-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Humanize Layer</h2>
          <p className="text-sm text-gray-500">Make AI-written content sound like a real person wrote it</p>
        </div>
        {statusMsg && (
          <span className="ml-auto text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600">
            {statusMsg}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ── LEFT: Input ── */}
        <div className="space-y-4 flex flex-col h-[700px]">

          <div className="bg-white rounded-lg border p-5 flex flex-col flex-1 min-h-0">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Content source</p>
              <div className="flex gap-2">
                {[
                  { key: "custom", label: "✎ Paste custom text" },
                  { key: "blog", label: "📄 Pick from My Blogs" },
                ].map(({ key, label }) => (
                  <button key={key}
                    onClick={() => { setMode(key); setResult(""); setSaved(false); setInputScore(null) }}
                    className={`flex-1 text-sm py-2 px-3 rounded-lg border font-medium transition-colors ${mode === key
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-white text-gray-600 border-gray-300 hover:border-pink-400"
                      }`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom text */}
            {mode === "custom" && (
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-gray-500">Paste your content</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{wordCount(customText)} words</span>
                    {detecting && <Spin cls="w-3 h-3 text-gray-400" />}
                    {inputScore && !detecting && <ScoreBadge percent={inputScore.percent} small />}
                  </div>
                </div>
                <textarea
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="Paste any AI-generated content here — blog post, article, paragraph, anything..."
                  className="w-full flex-1 px-3 py-2 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                />
              </div>
            )}

            {/* Blog picker */}
            {mode === "blog" && (
              <div className="flex flex-col flex-1 min-h-0">
                <label className="text-xs font-medium text-gray-500 mb-1 block">Select a blog</label>
                {loadingBlogs ? (
                  <div className="flex items-center gap-2 text-gray-400 text-sm py-3">
                    <Spin />Loading blogs...
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                    {blogs.length === 0 ? (
                      <p className="text-sm text-gray-400 py-3 text-center">No blogs yet — generate one first</p>
                    ) : blogs.map(b => (
                      <button key={b.id} onClick={() => setSelectedBlog(b)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${selectedBlog?.id === b.id
                            ? "border-pink-400 bg-pink-50 text-pink-700"
                            : "border-gray-200 hover:border-pink-300 hover:bg-gray-50"
                          }`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate">{b.title}</span>
                          {b.is_humanized && (
                            <span className="flex-shrink-0 text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                              ✦ Humanized
                            </span>
                          )}
                        </div>
                        {b.prompt && <p className="text-xs text-gray-400 truncate mt-0.5 italic">{b.prompt}</p>}
                      </button>
                    ))}
                  </div>
                )}
                {selectedBlog && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-500 flex items-center justify-between">
                    <span>
                      {wordCount(selectedBlog.content || "")} words selected
                      {selectedBlog.is_humanized && " · Already humanized (will overwrite)"}
                    </span>
                    {detecting && <Spin cls="w-3 h-3 text-gray-400" />}
                    {inputScore && !detecting && <ScoreBadge percent={inputScore.percent} small />}
                  </div>
                )}
              </div>
            )}
          </div>



          {/* Humanize button */}
          <button
            onClick={handleHumanize}
            disabled={loading || !sourceContent}
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors">
            {loading
              ? <><Spin />Humanizing... this may take a moment</>
              : <><Wand2 className="w-4 h-4" />Humanize Content</>
            }
          </button>


        </div>

        {/* ── RIGHT: Output ── */}
        <div className="bg-white rounded-lg border flex flex-col h-[700px]">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Humanized Output</h3>
              {result && <p className="text-xs text-gray-400 mt-0.5">{wordCount(result)} words</p>}
            </div>
            {result && (
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  {["preview", "raw"].map(v => (
                    <button key={v} onClick={() => setViewMode(v)}
                      className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${viewMode === v ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
                        }`}>
                      {v === "preview" ? "Preview" : "Raw"}
                    </button>
                  ))}
                </div>
                <button onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                {mode === "blog" && selectedBlog && (
                  <button onClick={handleOpenEditor}
                    className="text-xs bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg transition-colors">
                    Open in Editor →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Score comparison — shown after humanizing (Moved to Right Side) */}
          {outputScore && (
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <p className="text-xs font-medium text-gray-500 mb-2">Detection score comparison</p>
              <div className="flex items-center gap-3">
                {inputScore && (
                  <>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-1">Before</p>
                      <ScoreBadge percent={inputScore.percent} />
                    </div>
                    <span className="text-gray-300 text-lg">→</span>
                  </>
                )}
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">After</p>
                  <ScoreBadge percent={outputScore.percent} label={outputScore.label} />
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-5">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm gap-2">
                <Wand2 className="w-10 h-10 opacity-20" />
                <p>Your humanized content will appear here</p>
                <p className="text-xs text-center max-w-xs opacity-70">
                  Paste text or pick a blog, choose a style, and click Humanize
                </p>
              </div>
            )}
            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                <Spin cls="w-8 h-8" />
                <p className="text-sm">Rewriting in {STYLES.find(s => s.key === style)?.label} style...</p>
                <p className="text-xs opacity-60">This usually takes 30–60 seconds</p>
              </div>
            )}
            {result && !loading && (
              viewMode === "preview"
                ? <div className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }} />
                : <textarea readOnly value={result}
                  className="w-full h-full text-sm font-mono bg-gray-50 border rounded p-3 resize-none focus:outline-none" />
            )}
          </div>

          {saved && (
            <div className="px-5 py-3 border-t border-gray-100 bg-green-50 text-green-700 text-xs font-medium rounded-b-lg">
              ✓ Humanized version saved to "<span className="font-semibold">{selectedBlog?.title}</span>" — open the Editor to view both versions side by side
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

