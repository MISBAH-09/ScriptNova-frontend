import NavButton from "./NavButton"
import { Zap, BookOpen, PenSquare, Settings ,Sparkles} from "lucide-react";

export default function Sidebar({
  page,
  setPage,
  posts,
  navigate,
  mobileMenu,
  setMobileMenu
  }) {

  return (

  <div
    className={`fixed md:static top-0 left-0 z-40
    h-screen w-64 bg-slate-900 text-white
    transform transition-transform duration-300
    ${mobileMenu ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    flex flex-col p-6`}
  >

    <h2 className="flex items-center gap-2 text-2xl font-bold mb-8 text-pink-400">
      <Sparkles className="w-6 h-6" />
      ScriptNova
    </h2>

    <nav className="space-y-2">

      <NavButton
        active={page==="generate"}
        onClick={()=>{setPage("generate");setMobileMenu(false)}}
        icon={<Zap size={18} />}
        label="Generate Blog"
      />

      <NavButton
        active={page==="manage"}
        onClick={()=>{setPage("manage");setMobileMenu(false)}}
        icon={<BookOpen size={18} />}
        label="My Blogs"
      />

      <NavButton
        active={page==="editor"}
        onClick={()=>{setPage("editor");setMobileMenu(false)}}
        icon={<PenSquare size={18} />}
        label="Editor"
      />

      <NavButton
        active={page==="settings"}
        onClick={()=>{setPage("settings");setMobileMenu(false)}}
        icon={<Settings size={18} />}
        label="Settings"
      />

    </nav>

    <div className="mt-auto pt-6 border-t border-slate-700">

      <p className="text-xs text-gray-400">
        Total Blogs
      </p>

      <p className="text-2xl font-bold">
        {posts.length}
      </p>

      <button
        className="mt-4 w-full bg-red-600 py-2 rounded"
        onClick={()=>{
        localStorage.clear()
        navigate("/")
        }}
      >
      Logout
      </button>

    </div>

  </div>

  )

}