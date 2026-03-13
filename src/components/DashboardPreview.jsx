import React from 'react'

export default function DashboardPreview({ title, content }) {
  return (
    <aside className="bg-gray-800 rounded-xl p-4 h-full overflow-auto sticky top-0">
      <div className="font-semibold mb-3">Preview</div>
      <div className="prose max-w-none text-white">
        <h2 className="text-xl font-bold mb-2">{title || 'Untitled'}</h2>
        <div>{content ? content.split('\n').map((l, i) => <p key={i} className="text-sm leading-relaxed">{l}</p>) : <p className="text-gray-400">No content yet</p>}</div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-400">
        <div>Tip: Use concise prompts like "Write a 700-word blog about AI-assisted writing for small businesses"</div>
      </div>
    </aside>
  )
}
