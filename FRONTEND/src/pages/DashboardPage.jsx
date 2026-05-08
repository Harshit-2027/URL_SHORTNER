import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white text-center">
            URL Dashboard
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <UrlForm />
        </div>

        {/* URLs List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <UserUrl />
        </div>

      </div>

    </div>
  )
}

export default DashboardPage