import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { claims, setGrant, getLatestAudit } from './consentStore'
import './App.css'

function Dashboard(){
  const [showModal, setShowModal] = useState(false)
  const appId = 'partner1'
  
  const approve = (type) => {
    setGrant(appId, [type])
    toast.success(`Approved ${type}`)
    setShowModal(false)
  }
  
  const denyAll = () => {
    setGrant(appId, [])
    toast('Data leak blocked', { icon: '🔒' })
    setShowModal(false)
  }
  
  const audit = getLatestAudit()
  
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <span className="text-2xl">🛡️</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Your Data Claims</h1>
          </div>
          <p className="text-gray-400 text-lg">Control what you share with apps</p>
        </div>
        
        {/* Claims Grid - using existing data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {claims.map(claim => (
            <div key={claim.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-white">{claim.type}</strong>
                <span className={`px-2 py-1 rounded text-xs ${claim.verified ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {claim.verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <div className="text-gray-400">{claim.value}</div>
            </div>
          ))}
        </div>
        
        {/* Consent Request */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Partner App requests access</h3>
          <div className="flex gap-3">
            <button 
              onClick={() => approve('organization')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Approve Organization
            </button>
            <button 
              onClick={() => approve('email')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Approve Email
            </button>
            <button 
              onClick={denyAll} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Deny All
            </button>
          </div>
        </div>
        
        {/* Audit Log */}
        {audit && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-sm">
              Audit: {audit.appId} granted [{audit.claims.join(', ')}] at {new Date(audit.ts).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App(){
  return (
    <div style={{ padding:24 }}>
      <Toaster />
      <div className="row">
        <h1>Sovereign Sign In</h1>
      </div>
      <p style={{marginTop:8}}>SAFE MODE is enabled. This runs without Clerk so you can demo the consent and sharing flow.</p>
      <Dashboard />
    </div>
  )
}
