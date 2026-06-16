import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useToast } from '../components/Toast'
import authApi from '../api/authApi'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await authApi.forgotPassword({ email })
      setStep(1)
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to send OTP. Email might not exist.')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = async (index, value) => {
    if (value && isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`reset-otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    const currentOtpCode = newOtp.join('')
    if (currentOtpCode.length === 6 && currentOtpCode.trim().length === 6) {
      await autoVerifyOtp(currentOtpCode)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`reset-otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handlePaste = async (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').trim()
    const match = pastedData.match(/^\d{6}$/)
    if (match) {
      const digits = match[0].split('')
      setOtp(digits)
      const lastInput = document.getElementById('reset-otp-5')
      if (lastInput) lastInput.focus()
      
      await autoVerifyOtp(match[0])
    }
  }

  const autoVerifyOtp = async (otpCode) => {
    setError(null)
    setLoading(true)
    try {
      await authApi.verifyOtp({ email, otpCode, type: 'ResetPassword' })
      setStep(2)
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Invalid or expired OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    await autoVerifyOtp(otp.join(''))
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    const otpCode = otp.join('')
    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setError(null)
    setLoading(true)
    try {
      await authApi.resetPassword({ email, otpCode, newPassword })
      toast('Password reset successfully! Please login.', 'success')
      navigate('/login')
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to reset password.')
    } finally {
      setLoading(false)
    }
  }

  /* ── Visual panel content per step ── */
  const visualContent = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      ),
      title: 'RECOVER\nYOUR\nACCESS.',
      subtitle: 'Enter the email associated with your account and we\'ll send a verification code.'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      ),
      title: 'CHECK\nYOUR\nINBOX.',
      subtitle: `We sent a 6-digit code to your email. Enter it below to verify.`
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      ),
      title: 'SET A\nNEW\nPASSWORD.',
      subtitle: 'Choose a strong password to secure your Pro-Sport account.'
    },
  ]

  return (
    <div className="auth-layout">
      {/* ── Visual Panel (Left) ── */}
      <div className="auth-visual">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />

        {/* Radial glow */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start max-w-[480px] px-14" key={step}>
          {/* Logo */}
          <Link to="/" className="font-heading text-3xl font-bold tracking-tight mb-16 flex items-center gap-0.5">
            <span className="text-white">PRO</span>
            <span className="text-accent">-</span>
            <span className="text-white">SPORT</span>
          </Link>

          <div className="auth-animate-in">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-8">
              {visualContent[step].icon}
            </div>

            {/* Tagline */}
            <h2 className="font-heading text-[clamp(2.2rem,3.5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.01em] text-white mb-6 whitespace-pre-line">
              {visualContent[step].title.split('\n').map((line, i) => (
                <span key={i}>
                  {i === visualContent[step].title.split('\n').length - 1 
                    ? <span className="text-accent">{line}</span> 
                    : line}
                  {i < visualContent[step].title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>

            <p className="text-brand-400 text-[0.95rem] leading-relaxed max-w-[380px] mb-12">
              {visualContent[step].subtitle}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= step ? 'bg-accent scale-100' : 'bg-brand-700 scale-75'}`} />
                {i < 2 && (
                  <div className={`w-8 h-px transition-all duration-500 ${i < step ? 'bg-accent' : 'bg-brand-700'}`} />
                )}
              </div>
            ))}
            <span className="ml-3 text-xs font-medium text-brand-500 tracking-wider uppercase">
              Step {step + 1} of 3
            </span>
          </div>
        </div>

        <p className="absolute bottom-8 left-14 text-brand-600 text-xs font-medium tracking-wider">
          © 2024 PRO-SPORT COMPLEX
        </p>
      </div>

      {/* ── Form Panel (Right) ── */}
      <section className="auth-form">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link to="/" className="font-heading text-xl font-bold tracking-tight flex items-center gap-0.5">
            <span className="text-brand-900">PRO</span>
            <span className="text-accent">-</span>
            <span className="text-brand-900">SPORT</span>
          </Link>
        </div>

        <div className="auth-form-inner auth-animate-in-delayed">
          {/* Header */}
          <header className="mb-8">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">Account recovery</p>
            <h1 className="font-heading text-[2rem] font-bold text-brand-900 tracking-tight leading-tight">
              {step === 0 && <>Reset your<br />password</>}
              {step === 1 && <>Enter verification<br />code</>}
              {step === 2 && <>Create new<br />password</>}
            </h1>
            <p className="text-sm text-brand-500 mt-3 leading-relaxed">
              {step === 0 
                ? "Enter the email address associated with your account."
                : step === 1
                  ? `We sent a 6-digit OTP to ${email}`
                  : "Choose a strong password for your account."}
            </p>
          </header>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-700 text-sm font-medium p-4 rounded-xl border border-red-200 mb-6 text-center auth-animate-fade">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={step === 0 ? handleSendOtp : step === 1 ? handleVerifyOtp : handleResetPassword} noValidate>
            {/* Step 0: Email */}
            {step === 0 && (
              <div className="flex flex-col gap-2 auth-animate-slide">
                <label htmlFor="reset-email" className="text-sm font-semibold text-brand-900">Email Address</label>
                <div className="relative group">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-400 group-focus-within:text-accent transition-colors duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input id="reset-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="athlete@example.com" className="auth-input pl-11" />
                </div>
              </div>
            )}

            {/* Step 1: OTP */}
            {step === 1 && (
              <div className="flex flex-col items-center gap-6 auth-animate-slide">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <label className="text-sm font-semibold text-brand-900 text-center">Enter OTP Code</label>
                <div className="flex gap-2.5">
                  {[0,1,2,3,4,5].map(i => (
                    <input 
                      key={i} 
                      id={`reset-otp-${i}`}
                      type="text" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete={i === 0 ? "one-time-code" : "off"}
                      maxLength={1} 
                      value={otp[i]}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={i === 0 ? handlePaste : undefined}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-brand-200 rounded-xl font-sans text-brand-900 outline-none transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 bg-brand-50/50 focus:bg-white" 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: New Password */}
            {step === 2 && (
              <div className="flex flex-col gap-2 auth-animate-slide">
                <label htmlFor="reset-new-password" className="text-sm font-semibold text-brand-900">New Password</label>
                <div className="relative group">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-400 group-focus-within:text-accent transition-colors duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input id="reset-new-password" type={showPass ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} required placeholder="••••••••" className="auth-input pl-11 pr-11" />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-accent transition-colors duration-300" onClick={() => setShowPass(!showPass)} aria-label="Toggle password visibility">
                    {showPass
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {newPassword && <PasswordStrengthMeter password={newPassword} />}
              </div>
            )}

            {/* Submit */}
            <button disabled={loading} type="submit" className="auth-btn mt-4">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : step === 0 ? 'Send OTP' : step === 1 ? 'Verify OTP' : 'Reset Password'}
            </button>
          </form>

          {/* Back to login */}
          <Link to="/login" className="mt-10 text-sm font-semibold text-brand-500 transition-colors duration-200 hover:text-accent self-center flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Login
          </Link>
        </div>
      </section>
    </div>
  )
}
