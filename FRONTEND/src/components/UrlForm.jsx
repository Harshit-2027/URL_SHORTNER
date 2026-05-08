import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")

  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    try {
      const data = await createShortUrl(url, customSlug)
      setShortUrl(data.shortUrl)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 text-white">

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
        placeholder="Enter URL"
      />

      {isAuthenticated && (
        <input
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
          placeholder="Custom slug (optional)"
        />
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold"
      >
        Shorten URL
      </button>

      {error && (
        <div className="text-red-400">{error}</div>
      )}

      {shortUrl && (
        <div className="bg-slate-800 p-3 rounded-lg flex justify-between items-center">
          <span className="text-sm">{shortUrl}</span>

          <button
            onClick={handleCopy}
            className="bg-slate-700 px-3 py-1 rounded"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}

    </div>
  )
}

export default UrlForm