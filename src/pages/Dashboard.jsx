import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// import Sidebar from "../components/dashboard/Sidebar"
// import MobileSidebar from "../components/dashboard/MobileSidebar"
import Sidebar from "../components/dashboard/Sidebar"
import Header from "../components/dashboard/Header"

import BlogGenerator from "../components/dashboard/BlogGenerator"
import BlogManager from "../components/dashboard/BlogManager"
import BlogEditor from "../components/dashboard/BlogEditor"
import Settings from "../components/dashboard/Settings"

export default function Dashboard() {

  const navigate = useNavigate()

  const [posts,setPosts] = useState([])
  const [page,setPage] = useState("generate")
  const [generated,setGenerated] = useState(null)
  const [currentEdit,setCurrentEdit] = useState(null)

  const [mobileMenu,setMobileMenu] = useState(false)

  useEffect(()=>{
    const saved = localStorage.getItem("sn_posts")
    if(saved) setPosts(JSON.parse(saved))
  },[])

  useEffect(()=>{
    localStorage.setItem("sn_posts",JSON.stringify(posts))
  },[posts])

  const renderPage = () => {

    switch(page){

      case "manage":
        return (
          <BlogManager
            posts={posts}
            setPage={setPage}
            setCurrentEdit={setCurrentEdit}
          />
        )

      case "editor":
        return (
          <BlogEditor
            blog={currentEdit}
            setPosts={setPosts}
            setPage={setPage}
          />
        )

      case "settings":
        return <Settings/>

      default:
        return (
          <BlogGenerator
            generated={generated}
            setGenerated={setGenerated}
            setPosts={setPosts}
            setPage={setPage}
            setCurrentEdit={setCurrentEdit}
          />
        )
    }
  }

  return (

    <div className="flex min-h-screen bg-gray-50 text-slate-900">
      
      
      {mobileMenu && (
        <div
        className="fixed inset-0 bg-black/40 z-30 md:hidden"
        onClick={()=>setMobileMenu(false)}
        ></div>
        )}
      <Sidebar
        page={page}
        setPage={setPage}
        posts={posts}
        navigate={navigate}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />

      <div className="flex-1 flex flex-col">

        <Header
          page={page}
          setMobileMenu={setMobileMenu}
        />

        <div className="flex-1 p-4 md:p-8 overflow-auto">
          {renderPage()}
        </div>

      </div>

    </div>
  )
}




// import React, { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// export default function Dashboard() {
//   const navigate = useNavigate()

//   // ---------------- STATE ----------------
//   const [posts, setPosts] = useState([])
//   const [page, setPage] = useState("generate") // generate | manage | editor | settings

//   const [prompt, setPrompt] = useState("")
//   const [tone, setTone] = useState("Informative & Friendly")
//   const [length, setLength] = useState("Medium (1000-1500 words)")
//   const [loading, setLoading] = useState(false)

//   const [generated, setGenerated] = useState({
//     title: "",
//     content: "",
//     date: ""
//   })

//   const [currentEdit, setCurrentEdit] = useState(null)
//   const [wordCount, setWordCount] = useState(0)

//   // ---------------- LOAD POSTS ----------------
//   useEffect(() => {
//     const saved = localStorage.getItem("sn_posts")
//     if (saved) setPosts(JSON.parse(saved))
//   }, [])

//   useEffect(() => {
//     localStorage.setItem("sn_posts", JSON.stringify(posts))
//   }, [posts])

//   // ---------------- UTILITIES ----------------
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

//   // ---------------- GENERATE (DUMMY) ----------------
//   const generateDummy = () => {
//     if (!prompt.trim()) return alert("Enter a topic")

//     setLoading(true)

//     setTimeout(() => {
//       const content = `# ${prompt}

// This is a generated blog based on:

// "${prompt}"

// ## Introduction
// This section introduces the topic.

// ## Main Points
// - Key idea 1
// - Key idea 2
// - Key idea 3

// ## Conclusion
// Final thoughts about the topic.`

//       const title = prompt.slice(0, 40)

//       setGenerated({
//         title,
//         content,
//         date: new Date().toISOString()
//       })

//       setWordCount(calcWordCount(content))
//       setLoading(false)
//     }, 800)
//   }

//   // ---------------- SAVE ----------------
//   const saveGenerated = () => {
//     if (!generated.content) return
//     setPosts((prev) => [generated, ...prev])
//     alert("Saved to library")
//   }

//   const saveEdited = () => {
//     if (!currentEdit) return
//     setPosts((prev) => [
//       { ...currentEdit, date: new Date().toISOString() },
//       ...prev
//     ])
//     alert("Saved")
//   }

//   // ---------------- DOWNLOAD ----------------
//   const downloadFile = (format, text) => {
//     const name = (currentEdit?.title || generated.title || "blog")
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

//   // ---------------- OPEN EDITOR ----------------
//   const openEditor = (blog) => {
//     setCurrentEdit(blog || generated)
//     setWordCount(calcWordCount((blog || generated).content))
//     setPage("editor")
//   }

//   // ---------------- PAGE TITLE ----------------
//   const pageTitle = {
//     generate: "Generate Blog",
//     manage: "My Blogs",
//     editor: "Blog Editor",
//     settings: "Settings"
//   }[page]

//   // ---------------- RENDER PAGE ----------------
//   const renderPage = () => {
//     switch (page) {
//       case "manage":
//         return (
//           <div>
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-gray-600">Click on any blog to edit or preview</p>
//               <button
//                 onClick={() => setPage("generate")}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
//               >
//                 ✦ New Blog
//               </button>
//             </div>

//             {posts.length === 0 ? (
//               <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
//                 <p className="text-gray-400 text-lg mb-2">📭 No blogs saved yet</p>
//                 <p className="text-gray-500 text-sm">Generate your first blog to get started</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {posts.map((b, i) => (
//                   <div
//                     key={i}
//                     className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5 border border-gray-200"
//                   >
//                     <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
//                       {b.title || "Untitled"}
//                     </h3>
//                     <p className="text-xs text-gray-500 mb-4">
//                       {new Date(b.date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric"
//                       })}
//                     </p>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => openEditor(b)}
//                         className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
//                       >
//                         ✎ Edit
//                       </button>
//                       <button
//                         onClick={() => downloadFile("md", b.content)}
//                         className="flex-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors"
//                       >
//                         ↓ Download
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )

//       case "editor":
//         return (
//           <div>
//             <div className="flex gap-2 mb-6 pb-4 border-b border-gray-200">
//               <button
//                 onClick={saveEdited}
//                 className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
//               >
//                 ✓ Save Changes
//               </button>
//               <button
//                 onClick={() => downloadFile("md", currentEdit.content)}
//                 className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors"
//               >
//                 ↓ Download .md
//               </button>
//               <button
//                 onClick={() => downloadFile("txt", currentEdit.content)}
//                 className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors"
//               >
//                 ↓ Download .txt
//               </button>
//               <button
//                 onClick={() => setPage("manage")}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors ml-auto"
//               >
//                 ← Back
//               </button>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               {/* Editor */}
//               <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow border border-gray-200">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Blog Title
//                   </label>
//                   <input
//                     value={currentEdit?.title || ""}
//                     onChange={(e) =>
//                       setCurrentEdit((c) => ({
//                         ...c,
//                         title: e.target.value
//                       }))
//                     }
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your blog title..."
//                   />
//                 </div>

//                 <div className="flex-1 flex flex-col">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Content (Markdown)
//                   </label>
//                   <textarea
//                     value={currentEdit?.content || ""}
//                     onChange={(e) => {
//                       const txt = e.target.value
//                       setCurrentEdit((c) => ({
//                         ...c,
//                         content: txt
//                       }))
//                       setWordCount(calcWordCount(txt))
//                     }}
//                     className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
//                     placeholder="Write your blog content here..."
//                   />
//                   <p className="text-xs text-gray-500 mt-2">
//                     📊 {wordCount} words
//                   </p>
//                 </div>
//               </div>

//               {/* Preview */}
//               <div className="bg-white p-6 rounded-lg shadow border border-gray-200 overflow-auto">
//                 <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
//                   📖 Live Preview
//                 </h3>
//                 <div
//                   className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
//                   dangerouslySetInnerHTML={{
//                     __html: renderMarkdown(currentEdit?.content || "")
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         )

//       case "settings":
//         return (
//           <div className="max-w-2xl bg-white rounded-lg shadow border border-gray-200 p-8">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
//             <p className="text-gray-600">
//               Settings page coming soon... You'll be able to customize tone preferences, content length, SEO settings, and more.
//             </p>
//           </div>
//         )

//       default:
//         return (
//           <div className="grid text-black grid-cols-3 gap-6">
//             {/* Input Section */}
//             <div className="col-span-2 space-y-6">
//               {/* Generation Form */}
//               <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
//                 <h2 className="text-lg font-bold text-gray-900 mb-4">📝 Blog Details</h2>
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Topic or Prompt
//                   </label>
//                   <textarea
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                     placeholder="e.g., The future of AI in healthcare"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     rows="4"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Tone
//                     </label>
//                     <select
//                       value={tone}
//                       onChange={(e) => setTone(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option>Informative & Friendly</option>
//                       <option>Formal & Technical</option>
//                       <option>Casual & Conversational</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Length
//                     </label>
//                     <select
//                       value={length}
//                       onChange={(e) => setLength(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option>Short (800-1000 words)</option>
//                       <option>Medium (1000-1500 words)</option>
//                       <option>Long (1500-2500 words)</option>
//                     </select>
//                   </div>
//                 </div>

//                 <button
//                   onClick={generateDummy}
//                   disabled={loading}
//                   className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition-all ${
//                     loading
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
//                   }`}
//                 >
//                   {loading ? "⟳ Generating..." : "✦ Generate SEO Blog"}
//                 </button>
//               </div>

//               {/* Generated Output */}
//               {generated.content && (
//                 <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
//                   <h2 className="text-lg font-bold text-gray-900 mb-4">📄 Generated Content</h2>
//                   <div
//                     className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 mb-4"
//                     dangerouslySetInnerHTML={{
//                       __html: renderMarkdown(generated.content)
//                     }}
//                   />
//                   <p className="text-sm text-gray-600 mb-4">📊 Approximately {wordCount} words</p>

//                   <div className="flex gap-2 flex-wrap">
//                     <button
//                       onClick={saveGenerated}
//                       className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
//                     >
//                       ◈ Save to Library
//                     </button>
//                     <button
//                       onClick={() => openEditor()}
//                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
//                     >
//                       ✎ Open in Editor
//                     </button>
//                     <button
//                       onClick={() => downloadFile("md", generated.content)}
//                       className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
//                     >
//                       ↓ Download .md
//                     </button>
//                     <button
//                       onClick={() => downloadFile("txt", generated.content)}
//                       className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
//                     >
//                       ↓ Download .txt
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {!generated.content && !loading && (
//                 <div className="bg-white rounded-lg shadow border border-dashed border-gray-300 p-12 text-center">
//                   <p className="text-gray-400 text-lg mb-2">✦</p>
//                   <p className="text-gray-500 font-medium">Your generated blog will appear here</p>
//                   <p className="text-gray-400 text-sm mt-1">
//                     Enter a topic and click Generate to get started
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* SEO Checklist Sidebar */}
//             <div className="col-span-1">
//               <div className="bg-white rounded-lg shadow border border-gray-200 p-6 sticky top-8">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">✓ SEO Checklist</h3>
//                 <div className="space-y-3">
//                   {[
//                     { label: "Meta Title present", default: true },
//                     { label: "Meta Description present", default: true },
//                     { label: "3+ H2 headings", default: true },
//                     { label: "FAQ section included", default: false },
//                     { label: "Conclusion section", default: true },
//                     { label: `Word count (${wordCount}+)`, default: wordCount >= 800 }
//                   ].map((item, i) => (
//                     <div key={i} className="flex items-center gap-2">
//                       <span className={`text-lg ${item.default ? "text-green-500" : "text-gray-300"}`}>
//                         {item.default ? "✓" : "○"}
//                       </span>
//                       <span className={item.default ? "text-gray-700" : "text-gray-400"}>
//                         {item.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )
//     }
//   }

//   // ---------------- RETURN ----------------
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-lg flex flex-col">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold">✦ BlogForge</h2>
//           <p className="text-xs text-slate-400 mt-1">CMS v2.0</p>
//         </div>

//         <nav className="flex-1 space-y-2">
//           <NavButton
//             active={page === "generate"}
//             onClick={() => setPage("generate")}
//             icon="✦"
//             label="Generate Blog"
//           />
//           <NavButton
//             active={page === "manage"}
//             onClick={() => setPage("manage")}
//             icon="📚"
//             label="My Blogs"
//           />
//           <NavButton
//             active={page === "editor"}
//             onClick={() => setPage("editor")}
//             icon="✎"
//             label="Editor"
//           />
//           <NavButton
//             active={page === "settings"}
//             onClick={() => setPage("settings")}
//             icon="⚙"
//             label="Settings"
//           />
//         </nav>

//         <div className="border-t border-slate-700 pt-4">
//           <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
//             <p className="text-xs text-slate-400">Total Blogs</p>
//             <p className="text-2xl font-bold">{posts.length}</p>
//           </div>

//           <button
//             className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
//             onClick={() => {
//               localStorage.clear()
//               navigate("/")
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
//           <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             {page === "generate" && "Create a new AI-powered blog post"}
//             {page === "manage" && "Browse and manage all your saved blogs"}
//             {page === "editor" && "Edit and refine your blog content"}
//             {page === "settings" && "Customize your preferences"}
//           </p>
//         </div>

//         {/* Page Content */}
//         <div className="flex-1 overflow-auto p-8">
//           {renderPage()}
//         </div>
//       </div>
//     </div>
//   )
// }

// // NavButton Component
// function NavButton({ active, onClick, icon, label }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//         active
//           ? "bg-blue-600 text-white shadow-md"
//           : "text-slate-300 hover:bg-slate-700/50"
//       }`}
//     >
//       <span className="text-lg">{icon}</span>
//       <span className="font-medium">{label}</span>
//     </button>
//   )
// }