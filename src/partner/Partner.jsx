import { useState } from 'react'
import { claims, getGrant } from '../consentStore'
import { signClaims, verifyToken } from '../tokens'

export default function Partner(){
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const appId = 'partner1'

  const requestNow = async () => {
    setError('')
    setResult(null)
    const grant = getGrant(appId)
    if(!grant){ setError('No grant for this app'); return }
    const allowed = claims.filter(c => grant.allowed.includes(c.type))
    const payload = Object.fromEntries(allowed.map(c => [c.type, c.value]))
    const token = await signClaims('demo-user', appId, Object.keys(payload))
    try{
      const verified = await verifyToken(token)
      setResult({ appId, payload, token, verified })
    }catch(e){
      setError('Verification failed')
    }
  }

  return (
    <div style={{ padding:24 }}>
      <h1>Partner app</h1>
      <p>We request organization and location. We only receive what was approved.</p>
      <button className="btn" onClick={requestNow}>Request now</button>
      {error && <div className="card" style={{ color:'red', marginTop:12 }}>Error: {error}</div>}
      {result && <div className="card" style={{ marginTop:12 }}><pre>{JSON.stringify(result, null, 2)}</pre></div>}
    </div>
  )
}
