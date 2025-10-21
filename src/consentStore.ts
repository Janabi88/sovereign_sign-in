export type Claim = { id: string; type: string; value: string; verified: boolean };
export type Grant = { appId: string; allowed: string[]; ts: number };
export type Audit = { appId: string; action: 'grant'; claims: string[]; ts: number };

export const claims: Claim[] = [
  { id: 'c1', type: 'email',        value: 'sarandahalitaj@gmail.com', verified: true },
  { id: 'c2', type: 'organization', value: 'Stealth',                 verified: true },
  { id: 'c3', type: 'location',     value: 'San Francisco, CA',   verified: false },
];

let grants: Grant[] = [];
let audits: Audit[] = [];

export function setGrant(appId: string, allowed: string[]) {
  const ts = Date.now();
  const i = grants.findIndex(g => g.appId === appId);
  if (i >= 0) grants[i] = { appId, allowed, ts };
  else grants.push({ appId, allowed, ts });
  audits.push({ appId, action: 'grant', claims: allowed, ts });
}

export function getGrant(appId: string) {
  return grants.find(g => g.appId === appId) || null;
}

export function getLatestAudit() {
  return audits[ audits.length - 1 ] || null;
}
