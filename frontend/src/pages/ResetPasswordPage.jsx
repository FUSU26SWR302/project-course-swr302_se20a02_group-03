import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar theme="light" />

      <div className="flex-1 pt-[68px] px-6 pb-[60px] flex items-center justify-center bg-gradient-to-br from-[#eaf4fb] to-[#daedf8]">
        <div className="bg-white rounded-[32px] py-11 px-6 sm:px-10 w-full max-w-[440px] shadow-[0_8px_32px_rgba(0,0,0,0.14)] flex flex-col items-center animate-[fadeInUp_0.6s_ease_both]">
          <div className="w-[60px] h-[60px] rounded-full bg-[#00c8aa] flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(0,200,170,0.35)]">
            {step === 0 ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            )}
          </div>

          <h1 className="font-['Oswald'] text-[1.8rem] font-bold text-slate-900 mb-1.5 text-center">Reset Password</h1>
          <p className="text-[0.875rem] text-slate-500 text-center mb-7 max-w-[340px]">
            {step === 0 
              ? "Enter the email address associated with your account to receive an OTP."
              : step === 1
                ? `We sent a 6-digit OTP to ${email}. Please enter it below.`
                : "Create a new strong password for your account."}
          </p>

          {error && (
            <div className="w-full bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-5 text-center">
              {error}
            </div>
          )}

          <form className="w-full flex flex-col gap-4" onSubmit={step === 0 ? handleSendOtp : step === 1 ? handleVerifyOtp : handleResetPassword} noValidate>
            {step === 0 && (
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="reset-email" className="text-[0.825rem] font-semibold text-slate-900">Email Address</label>
                <div className="relative flex items-center group">
                  <svg className="absolute left-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#00c8aa] transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input id="reset-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="athlete@pro-sport.com" className="w-full py-2.5 pr-3.5 pl-10 border-[1.5px] border-slate-200 rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none placeholder:text-slate-400 focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[0.825rem] font-semibold text-slate-900 text-center mb-1">Enter OTP Code</label>
                <div className="flex justify-center gap-2 mb-2">
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
                      className="w-[42px] h-[48px] text-center text-[1.2rem] font-bold border-2 border-slate-200 rounded-md font-['Inter'] text-slate-900 outline-none transition-all focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]" 
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-1.5 w-full relative">
                <label htmlFor="reset-new-password" className="text-[0.825rem] font-semibold text-slate-900">New Password</label>
                <div className="relative flex items-center group">
                  <svg className="absolute left-3.5 pointer-events-none text-slate-400 group-focus-within:text-[#00c8aa] transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input id="reset-new-password" type={showPass ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} required placeholder="••••••••" className="w-full py-2.5 pr-10 pl-10 border-[1.5px] border-slate-200 rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none placeholder:text-slate-400 focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]" />
                  <button type="button" className="absolute right-3 bg-transparent text-slate-400 transition-colors hover:text-[#00c8aa] flex" onClick={() => setShowPass(!showPass)} aria-label="Toggle">
                    {showPass
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {newPassword && <PasswordStrengthMeter password={newPassword} />}
              </div>
            )}

            <button disabled={loading} type="submit" className="w-full flex justify-center items-center py-3 text-[0.95rem] font-semibold rounded-xl mt-3 bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white tracking-[0.03em] transition-all disabled:opacity-70 disabled:pointer-events-none">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : step === 0 ? 'Send OTP →' : step === 1 ? 'Verify OTP →' : 'Reset Password →'}
            </button>
          </form>

          <Link to="/login" className="mt-5 text-[0.85rem] font-semibold text-slate-500 transition-colors hover:text-[#00c8aa]">← Back to Login</Link>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
