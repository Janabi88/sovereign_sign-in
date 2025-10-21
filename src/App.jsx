import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Toaster, toast } from 'react-hot-toast'
import { claims, setGrant, getLatestAudit } from './consentStore'
import './App.css'

function Dashboard(){
  const appId = 'partner1'
  const approve = async (type) => {
    setGrant(appId, [type])
    toast.success(`Approved ${type}`)
  }
  const denyAll = async () => {
    setGrant(appId, [])
    toast('Data leak blocked', { icon: '🔒' })
  }
  const audit = getLatestAudit()
  return (
    <div>
      <div className="row">
        <h2>Your claims</h2>
        <a className="btn" href="/partner">Open partner app</a>
      </div>
      <div className="grid">
        {claims.map(c => (
          <div key={c.id} className="card">
            <div className="row">
              <strong>{c.type}</strong>
              <span className="badge">{c.verified ? 'verified' : 'unverified'}</span>
            </div>
            <div style={{marginTop:8}}>{c.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3>Stalker App requests access</h3>
        <div className="row" style={{marginTop:8, gap:8}}>
          <button className="btn" onClick={() => approve('organization')}>Approve organization</button>
          <button className="btn" onClick={() => approve('email')}>Approve email</button>
          <button className="btn secondary" onClick={denyAll}>Deny all</button>
        </div>
      </div>

      {audit && (
        <div style={{ marginTop:12, fontSize:14 }}>
          Audit: {audit.appId} granted [{audit.claims.join(', ')}] at {new Date(audit.ts).toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

export default function App(){
  return (
    <div style={{ padding:24 }}>
      <Toaster />
      <div className="row">
        <h1>Sovereign Sign In</h1>
        <SignedIn><UserButton /></SignedIn>
        <SignedOut><SignInButton /></SignedOut>
      </div>
      <SignedOut><p>Sign in to manage your claims and connect apps.</p></SignedOut>
      <SignedIn><Dashboard /></SignedIn>
    </div>
  )
}
