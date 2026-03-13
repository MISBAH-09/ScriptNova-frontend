import React from 'react'

export default function DashboardEditor({
  title,
  setTitle,
  content,
  setContent,
  prompt,
  setPrompt,
  tone,
  setTone,
  length,
  setLength,
  onGenerate,
  onSave,
  onDownload,
  loading,
  wordCount
}) {
  return (
    <main className="bg-gray-900 rounded-xl p-6 h-full flex flex-col">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Blog Generator</h2>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Enter prompt or topic..."
          className="w-full h-24 p-3 rounded bg-gray-800 border border-gray-700 resize-none"
        />
        <div className="grid grid-cols-2 gap-4">
          <select
            value={tone}
            onChange={e => setTone(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          >
            <option>Informative & Friendly</option>
            <option>Formal & Technical</option>
            <option>Casual & Conversational</option>
          </select>
          <select
            value={length}
            onChange={e => setLength(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          >
            <option>Short (300-500 words)</option>
            <option>Medium (1000-1500 words)</option>
            <option>Long (2000+ words)</option>
          </select>
        </div>
        <button
          onClick={onGenerate}
          disabled={loading}
          className="w-full bg-yellow-500 text-black py-3 rounded font-semibold hover:bg-yellow-400 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate SEO Blog'}
        </button>
        {content && (
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Generated blog will appear here..."
            className="w-full h-48 p-3 rounded bg-gray-800 border border-gray-700 resize-none"
          />
        )}
        <div className="flex gap-3">
          <button onClick={onSave} className="bg-indigo-600 px-4 py-2 rounded">Save</button>
          <button onClick={onDownload} className="bg-white text-black px-4 py-2 rounded">Download</button>
        </div>
        <div className="text-xs text-gray-400">Words: {wordCount} • Autosave: localStorage</div>
      </div>
    </main>
  )
}
