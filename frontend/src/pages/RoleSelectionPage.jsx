import { Link } from 'react-router-dom'

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-sky-100 font-sans">
      <header className="p-6 text-center">
        <h1 className="font-oswald text-2xl font-bold text-[#006070] tracking-tight italic">PRO-SPORT</h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Choose Your Role
          </h2>
          <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '0.9375rem' }}>
            Select how you'd like to access the platform.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <Link to="/mobile/home" style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px',
                padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008ba3" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px', fontSize: '1rem' }}>Player / Member</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>Book courts, join matches &amp; connect with other players</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </Link>

            <Link to="/elite/dashboard" style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px',
                padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#cffafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px', fontSize: '1rem' }}>Court Staff / Manager</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>Manage schedules, walk-ins &amp; POS terminal</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </Link>

            <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px',
                padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px', fontSize: '1rem' }}>Administrator</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>Full system control, analytics &amp; management portal</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </Link>

          </div>
        </div>
      </main>
    </div>
  )
}

