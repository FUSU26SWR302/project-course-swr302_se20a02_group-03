import { useState } from 'react'
import ApexLayout from '../../layouts/ApexLayout'
import './ApexSettingsPage.css'

const sections = ['Account', 'Notifications', 'Privacy', 'Payments']

export default function ApexSettingsPage() {
  const [activeSection, setActiveSection] = useState('Account')
  const [notifs, setNotifs] = useState({ bookingReminder: true, matchInvite: true, payments: true, marketing: false, sms: false, email: true })
  const [privacy, setPrivacy] = useState({ publicProfile: true, showActivity: true, showMatches: false })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <ApexLayout title="Settings">
      <div className="apex-settings">
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-sub">Manage your account preferences.</p>
        </div>

        <div className="settings-layout">
          {/* Sidebar nav */}
          <nav className="settings-nav">
            {sections.map(s => (
              <button key={s} className={`settings-nav-btn ${activeSection === s ? 'active' : ''}`} onClick={() => setActiveSection(s)}>{s}</button>
            ))}
          </nav>

          {/* Content */}
          <div className="settings-content">
            {/* Account */}
            {activeSection === 'Account' && (
              <div className="settings-panel">
                <h2 className="settings-panel__title">Account Settings</h2>
                <div className="settings-form">
                  {[
                    { label: 'Full Name', id: 'set-name', type: 'text', default: 'Alex Johnson' },
                    { label: 'Email Address', id: 'set-email', type: 'email', default: 'alex@prosport.com' },
                    { label: 'Phone Number', id: 'set-phone', type: 'tel', default: '+84 901 234 567' },
                  ].map(f => (
                    <div key={f.id} className="settings-field">
                      <label htmlFor={f.id}>{f.label}</label>
                      <input id={f.id} type={f.type} defaultValue={f.default} className="settings-input" />
                    </div>
                  ))}
                  <div className="settings-field">
                    <label htmlFor="set-password">New Password</label>
                    <input id="set-password" type="password" placeholder="Leave blank to keep current" className="settings-input" />
                  </div>
                  <div className="settings-field">
                    <label htmlFor="set-confirm">Confirm Password</label>
                    <input id="set-confirm" type="password" placeholder="Confirm new password" className="settings-input" />
                  </div>
                </div>
                <div className="settings-danger">
                  <h3>Danger Zone</h3>
                  <button className="btn-danger">Delete Account</button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'Notifications' && (
              <div className="settings-panel">
                <h2 className="settings-panel__title">Notification Preferences</h2>
                <div className="settings-toggles">
                  {[
                    { key: 'bookingReminder', label: 'Booking Reminders', desc: 'Get reminded 2 hours before your court session.' },
                    { key: 'matchInvite', label: 'Match Invitations', desc: 'Receive notifications for match invitations from other players.' },
                    { key: 'payments', label: 'Payment Receipts', desc: 'Get a receipt for every payment and refund.' },
                    { key: 'email', label: 'Email Notifications', desc: 'Receive important updates via email.' },
                    { key: 'sms', label: 'SMS Alerts', desc: 'Receive critical alerts via SMS.' },
                    { key: 'marketing', label: 'Promotions & Offers', desc: 'Receive promotional emails and special offers.' },
                  ].map(item => (
                    <div key={item.key} className="toggle-row">
                      <div>
                        <p className="toggle-row__label">{item.label}</p>
                        <p className="toggle-row__desc">{item.desc}</p>
                      </div>
                      <button
                        className={`toggle-switch ${notifs[item.key] ? 'on' : ''}`}
                        onClick={() => setNotifs(p => ({ ...p, [item.key]: !p[item.key] }))}
                        aria-label={item.label}
                      >
                        <span className="toggle-switch__thumb" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy */}
            {activeSection === 'Privacy' && (
              <div className="settings-panel">
                <h2 className="settings-panel__title">Privacy Settings</h2>
                <div className="settings-toggles">
                  {[
                    { key: 'publicProfile', label: 'Public Profile', desc: 'Allow other players to view your profile.' },
                    { key: 'showActivity', label: 'Show Activity', desc: 'Display your recent bookings and match history on your profile.' },
                    { key: 'showMatches', label: 'Show Match Results', desc: 'Let others see your win/loss record.' },
                  ].map(item => (
                    <div key={item.key} className="toggle-row">
                      <div>
                        <p className="toggle-row__label">{item.label}</p>
                        <p className="toggle-row__desc">{item.desc}</p>
                      </div>
                      <button
                        className={`toggle-switch ${privacy[item.key] ? 'on' : ''}`}
                        onClick={() => setPrivacy(p => ({ ...p, [item.key]: !p[item.key] }))}
                        aria-label={item.label}
                      >
                        <span className="toggle-switch__thumb" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments */}
            {activeSection === 'Payments' && (
              <div className="settings-panel">
                <h2 className="settings-panel__title">Payment Methods</h2>
                <div className="payment-methods">
                  <div className="payment-card">
                    <div className="payment-card__info">
                      <span className="payment-card__icon">💳</span>
                      <div>
                        <p className="payment-card__name">Visa ending in 4242</p>
                        <p className="payment-card__expire">Expires 08/26</p>
                      </div>
                    </div>
                    <span className="payment-card__default">Default</span>
                  </div>
                  <button className="btn-outline payment-add">+ Add Payment Method</button>
                </div>
                <div className="wallet-card">
                  <div>
                    <p className="wallet-card__label">PRO-SPORT Wallet</p>
                    <p className="wallet-card__balance">$120.00</p>
                  </div>
                  <button className="btn-primary">Top Up</button>
                </div>
              </div>
            )}

            <button className="btn-primary settings-save" onClick={handleSave}>
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </ApexLayout>
  )
}
