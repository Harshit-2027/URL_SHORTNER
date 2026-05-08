import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)

    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-xl">
        Error: {error.message}
      </div>
    )
  }

  const list = urls?.urls ? [...urls.urls].reverse() : []

  if (!list.length) {
    return (
      <div className="text-center text-slate-400 py-10">
        <p className="text-lg font-semibold">No URLs found</p>
        <p className="text-sm mt-1">Create your first shortened URL 🚀</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      <div className="p-4 border-b border-slate-800">
        <h2 className="text-white text-lg font-semibold">
          Your URLs
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">

          <thead className="text-xs uppercase bg-slate-800 text-slate-400">
            <tr>
              <th className="px-6 py-3">Original</th>
              <th className="px-6 py-3">Short URL</th>
              <th className="px-6 py-3">Clicks</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((url) => {
              const shortLink = `https://url-shortner-ak9z.onrender.com/${url.short_url}`

              return (
                <tr
                  key={url._id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition"
                >
                  <td className="px-6 py-4 max-w-xs truncate">
                    {url.full_url}
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href={shortLink}
                      target="_blank"
                      className="text-blue-400 hover:underline"
                    >
                      {shortLink}
                    </a>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                      {url.clicks}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCopy(shortLink, url._id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                        copiedId === url._id
                          ? "bg-green-600 text-white"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                    >
                      {copiedId === url._id ? "Copied" : "Copy"}
                    </button>
                  </td>

                </tr>
              )
            })}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default UserUrl