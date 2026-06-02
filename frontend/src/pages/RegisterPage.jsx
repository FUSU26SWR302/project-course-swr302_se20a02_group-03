import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useToast } from '../components/Toast'
import authApi from '../api/authApi'

const steps = ['Details', 'Preferences', 'Verify']

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  
  // Form Data
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  
  const [registeredUserId, setRegisteredUserId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sportPreferences, setSportPreferences] = useState([])
  const toast = useToast()
  
  // Real-time Field Errors
  const [fieldErrors, setFieldErrors] = useState({})

  const validateField = (name, value) => {
    let errMsg = ""
    switch (name) {
      case 'fullName':
        if (!value.trim()) errMsg = "Required field."
        else if (!/^[a-zA-Z\sÀ-ỹ]+$/.test(value.trim())) errMsg = "No numbers or special chars allowed."
        break;
      case 'phoneNumber':
        if (value.trim() && !/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value.trim())) errMsg = "Invalid VN phone number."
        break;
      case 'email':
        if (!value.trim()) errMsg = "Required field."
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) errMsg = "Please enter a valid email format."
        break;
      case 'password':
        if (!value) errMsg = "Required field."
        else if (!/^(?=.*[0-9]).{8,}$/.test(value)) errMsg = "Min 8 chars, at least 1 number."
        if (confirmPassword && confirmPassword !== value) {
          setFieldErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match." }))
        } else if (confirmPassword) {
          setFieldErrors(prev => ({ ...prev, confirmPassword: "" }))
        }
        break;
      case 'confirmPassword':
        if (value !== password) errMsg = "Passwords do not match."
        break;
      default:
        break;
    }
    setFieldErrors(prev => ({ ...prev, [name]: errMsg }))
    return errMsg === ""
  }

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value)
  }

  const handleRegister = async () => {
    const isNameValid = validateField('fullName', fullName)
    const isPhoneValid = validateField('phoneNumber', phoneNumber)
    const isEmailValid = validateField('email', email)
    const isPassValid = validateField('password', password)
    const isConfirmValid = validateField('confirmPassword', confirmPassword)

    if (!isNameValid || !isPhoneValid || !isEmailValid || !isPassValid || !isConfirmValid) {
      return false
    }

    if (!agreed) {
      setError("You must agree to the Terms & Conditions.")
      return false
    }

    setError(null)
    setLoading(true)
    try {
      const response = await authApi.register({
        fullName,
        email,
        password,
        phoneNumber
      })
      // Save UserId for OTP verification
      setRegisteredUserId(response.data || 0)
      return true
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Registration failed. Email might already exist.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtpWithCode = async (otpCodeToVerify) => {
    setError(null)
    setLoading(true)
    try {
      await authApi.verifyOtp({
        userId: registeredUserId,
        otpCode: otpCodeToVerify,
        type: 'Register'
      })
      return true
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Invalid or expired OTP.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('')
    if (otpCode.length < 6) {
      setError("Please enter the 6-digit OTP.")
      return false
    }
    return await handleVerifyOtpWithCode(otpCode)
  }

  const handleResendOtp = async () => {
    setError(null)
    setLoading(true)
    try {
      await authApi.resendOtp({ email, type: 'Register' })
      toast("A new OTP has been sent to your email.", 'info')
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to resend OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setError(null)
    setLoading(true)
    try {
      const response = await authApi.googleLogin({ googleIdToken: credentialResponse.credential })
      const token = response.data?.accessToken || response.accessToken || response.data?.token || response.token
      if (token) {
        localStorage.setItem('token', token)
        if (response.data?.isProfileComplete === false) {
          navigate('/complete-profile')
        } else {
          navigate('/')
        }
      } else {
        setError('Google Login failed. Token not received.')
      }
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Google Login failed.')
    } finally {
      setLoading(false)
    }
  }

  const next = async (e) => {
    e.preventDefault()
    
    if (step === 0) {
      const success = await handleRegister()
      if (success) setStep(1)
    } else if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      const success = await handleVerifyOtp()
      if (success) {
        toast('Account created successfully! Please login.', 'success')
        navigate('/login')
      }
    }
  }

  const handleOtpChange = async (index, value) => {
    if (value && isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    const currentOtpCode = newOtp.join('')
    if (currentOtpCode.length === 6 && currentOtpCode.trim().length === 6) {
      const success = await handleVerifyOtpWithCode(currentOtpCode)
      if (success) {
        toast('Account created successfully! Please login.', 'success')
        navigate('/login')
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
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
      const lastInput = document.getElementById('otp-5')
      if (lastInput) lastInput.focus()
      
      const success = await handleVerifyOtpWithCode(match[0])
      if (success) {
        toast('Account created successfully! Please login.', 'success')
        navigate('/login')
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme="light" />

      <div className="flex-1 px-6 pt-[68px] pb-[60px] flex items-center justify-center bg-gradient-to-br from-[#e8f2f8] via-[#daedf6] to-[#cee8f5] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554068865-24cecd4e34d8?w=1200&q=80')] bg-cover bg-center opacity-15" />

        <div className="bg-white rounded-[32px] px-5 sm:px-8 py-10 sm:py-12 w-full max-w-[480px] shadow-[0_8px_32px_rgba(0,0,0,0.14)] relative z-10 flex flex-col items-center animate-[fadeInUp_0.6s_ease_both] mt-10">
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-[#00c8aa] flex items-center justify-center shadow-[0_4px_16px_rgba(0,200,170,0.35)] border-4 border-[#e8f2f8]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          </div>
          {/* Step indicator */}
          <div className="flex justify-between items-center w-full max-w-[320px] mb-7 mx-auto">
            {steps.map((s, i) => (
              <div key={s} className={`flex items-center gap-2 relative ${i <= step ? 'group-active' : ''} ${i < step ? 'group-done' : ''}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[0.8rem] shrink-0 transition-colors ${i <= step ? 'bg-[#00c8aa] border-[#00c8aa] text-white font-semibold' : 'bg-white border-slate-200 text-slate-400 font-semibold'}`}>
                  {i < step
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    : <span>{i + 1}</span>
                  }
                </div>
                <span className={`text-[0.78rem] whitespace-nowrap ${i <= step ? 'text-[#00c8aa] font-semibold' : 'text-slate-400 font-medium'}`}>{s}</span>
              </div>
            ))}
          </div>

          <h1 className="text-[1.8rem] font-bold text-slate-900 tracking-tight text-center mb-2">Create an account</h1>
          <p className="text-[0.875rem] text-slate-500 text-center mb-7 max-w-[340px]">Enter your details to register for Pro-Sport and start booking courts.</p>

          {error && error.includes('Email already exists') ? (
            <div className="w-full bg-amber-50 p-4 rounded-xl border border-amber-200 mb-5 flex flex-col items-center text-center animate-[fadeIn_0.3s_ease]">
              <span className="text-amber-800 text-[0.875rem] font-medium mb-3">
                This email is already registered.
              </span>
              <div className="flex gap-3 w-full">
                <Link to="/login" className="flex-1 py-2 text-[0.85rem] font-semibold bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Login Now
                </Link>
                <Link to="/reset-password" className="flex-1 py-2 text-[0.85rem] font-semibold bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>
          ) : error && (
            <div className="w-full bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-5 text-center">
              {error}
            </div>
          )}

          <form className="w-full flex flex-col gap-4" onSubmit={next} noValidate>
            {step === 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 w-full relative">
                    <label htmlFor="reg-name" className="text-[0.825rem] font-semibold text-slate-900">Full Name</label>
                    <div className="relative flex items-center group">
                      <svg className={`absolute left-3.5 pointer-events-none transition-colors ${fieldErrors.fullName ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#00c8aa]'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <input id="reg-name" name="fullName" type="text" value={fullName} onBlur={handleBlur} onChange={e => { setFullName(e.target.value); if (fieldErrors.fullName) validateField('fullName', e.target.value) }} required placeholder="John Doe" className={`w-full py-2.5 pr-3.5 pl-10 border-[1.5px] rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none placeholder:text-slate-400 ${fieldErrors.fullName ? 'border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]' : 'border-slate-200 focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]'}`} />
                    </div>
                    {fieldErrors.fullName && <span className="text-[0.75rem] text-red-500 absolute -bottom-5 left-0">{fieldErrors.fullName}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5 w-full relative">
                    <label htmlFor="reg-phone" className="text-[0.825rem] font-semibold text-slate-900">Phone Number</label>
                    <div className="relative flex items-center group">
                      <svg className={`absolute left-3.5 pointer-events-none transition-colors ${fieldErrors.phoneNumber ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#00c8aa]'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"/></svg>
                      <input id="reg-phone" name="phoneNumber" type="tel" value={phoneNumber} onBlur={handleBlur} onChange={e => { setPhoneNumber(e.target.value); if (fieldErrors.phoneNumber) validateField('phoneNumber', e.target.value) }} placeholder="+84 0000 0000" className={`w-full py-2.5 pr-3.5 pl-10 border-[1.5px] rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none placeholder:text-slate-400 ${fieldErrors.phoneNumber ? 'border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]' : 'border-slate-200 focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]'}`} />
                    </div>
                    {fieldErrors.phoneNumber && <span className="text-[0.75rem] text-red-500 absolute -bottom-5 left-0">{fieldErrors.phoneNumber}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 w-full relative mt-1">
                  <label htmlFor="reg-email" className="text-[0.825rem] font-semibold text-slate-900">Email Address</label>
                  <div className="relative flex items-center group">
                    <svg className={`absolute left-3.5 pointer-events-none transition-colors ${fieldErrors.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#00c8aa]'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input id="reg-email" name="email" type="email" value={email} onBlur={handleBlur} onChange={e => { setEmail(e.target.value); if (fieldErrors.email) validateField('email', e.target.value) }} required placeholder="john.doe@pro-sport.com" className={`w-full py-2.5 pr-3.5 pl-10 border-[1.5px] rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none placeholder:text-slate-400 ${fieldErrors.email ? 'border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]' : 'border-slate-200 focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]'}`} />
                  </div>
                  {fieldErrors.email && <span className="text-[0.75rem] text-red-500 absolute -bottom-5 left-0">{fieldErrors.email}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                  <div className="flex flex-col gap-1.5 w-full relative">
                    <label htmlFor="reg-password" className="text-[0.825rem] font-semibold text-slate-900">Password</label>
                    <div className="relative flex items-center group">
                      <svg className={`absolute left-3.5 pointer-events-none transition-colors ${fieldErrors.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#00c8aa]'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input id="reg-password" name="password" type={showPass ? 'text' : 'password'} value={password} onBlur={handleBlur} onChange={e => { setPassword(e.target.value); if (fieldErrors.password) validateField('password', e.target.value); if (confirmPassword) validateField('confirmPassword', confirmPassword) }} required placeholder="••••••••" className={`w-full py-2.5 pr-10 pl-10 border-[1.5px] rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none placeholder:text-slate-400 ${fieldErrors.password ? 'border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]' : 'border-slate-200 focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]'}`} />
                      <button type="button" className="absolute right-3 bg-transparent text-slate-400 transition-colors hover:text-[#00c8aa] flex" onClick={() => setShowPass(!showPass)} aria-label="Toggle">
                        {showPass
                          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/></svg>
                          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        }
                      </button>
                    </div>
                    {password && <PasswordStrengthMeter password={password} />}
                    {fieldErrors.password && !password && <span className="text-[0.7rem] text-red-500 absolute -bottom-5 left-0 whitespace-nowrap">{fieldErrors.password}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5 w-full relative">
                    <label htmlFor="reg-confirm" className="text-[0.825rem] font-semibold text-slate-900">Confirm Password</label>
                    <div className="relative flex items-center group">
                      <svg className={`absolute left-3.5 pointer-events-none transition-colors ${fieldErrors.confirmPassword ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#00c8aa]'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input id="reg-confirm" name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={confirmPassword} onBlur={handleBlur} onChange={e => { setConfirmPassword(e.target.value); if (fieldErrors.confirmPassword) validateField('confirmPassword', e.target.value) }} required placeholder="••••••••" className={`w-full py-2.5 pr-10 pl-10 border-[1.5px] rounded-md font-['Inter'] text-[0.9rem] text-slate-900 bg-white transition-all outline-none placeholder:text-slate-400 ${fieldErrors.confirmPassword ? 'border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]' : 'border-slate-200 focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]'}`} />
                      <button type="button" className="absolute right-3 bg-transparent text-slate-400 transition-colors hover:text-[#00c8aa] flex" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle">
                        {showConfirm
                          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/></svg>
                          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        }
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && <span className="text-[0.7rem] text-red-500 absolute -bottom-5 left-0">{fieldErrors.confirmPassword}</span>}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-[0.84rem] text-slate-500 select-none group mt-3" htmlFor="agree-terms">
                  <input type="checkbox" id="agree-terms" checked={agreed} onChange={() => setAgreed(!agreed)} className="hidden peer" />
                  <span className="w-4 h-4 border-[1.5px] border-slate-200 rounded flex items-center justify-center transition-all shrink-0 peer-checked:bg-[#00c8aa] peer-checked:border-[#00c8aa]">
                    {agreed && <span className="w-2 h-1.5 border-l-[1.5px] border-b-[1.5px] border-white -rotate-45 -translate-y-px" />}
                  </span>
                  <span>I agree to the <Link to="#" className="text-[#00c8aa] font-semibold hover:underline">Terms &amp; Conditions</Link> and our <Link to="#" className="text-[#00c8aa] font-semibold hover:underline">Privacy Policy</Link></span>
                </label>
              </>
            )}

            {step === 1 && (
              <div className="w-full flex flex-col gap-3">
                <p className="text-[0.9rem] font-semibold text-slate-900 mb-1">Select your sport preferences</p>
                {['Cầu lông', 'Pickleball'].map(sport => (
                  <label key={sport} className="group flex items-center gap-[10px] text-sm text-[#0d2d3a] font-medium cursor-pointer p-3 border-[1.5px] border-slate-200 rounded-xl hover:border-[#00c8aa] transition-colors bg-white">
                    <input 
                      type="checkbox" 
                      className="hidden peer" 
                      checked={sportPreferences.includes(sport)}
                      onChange={() => {
                        setSportPreferences(prev => 
                          prev.includes(sport) 
                            ? prev.filter(s => s !== sport) 
                            : [...prev, sport]
                        )
                      }}
                    />
                    <span className={`w-4 h-4 border-[1.5px] border-slate-300 rounded flex items-center justify-center transition-all shrink-0 ${sportPreferences.includes(sport) ? 'bg-[#00c8aa] !border-[#00c8aa]' : ''}`}>
                       {sportPreferences.includes(sport) && <span className="w-2 h-1.5 border-l-[1.5px] border-b-[1.5px] border-white -rotate-45 -translate-y-px" />}
                    </span>
                    <span>{sport}</span>
                  </label>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="w-full flex flex-col items-center gap-4">
                <p className="text-[0.9rem] text-slate-500 text-center">Check your email for a 6-digit verification code.</p>
                <div className="flex gap-2.5">
                  {[0,1,2,3,4,5].map(i => (
                    <input 
                      key={i} 
                      id={`otp-${i}`}
                      type="text" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete={i === 0 ? "one-time-code" : "off"}
                      maxLength={1} 
                      value={otp[i]}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onPaste={i === 0 ? handlePaste : undefined}
                      className="w-12 h-14 text-center text-[1.4rem] font-bold border-2 border-slate-200 rounded-md font-['Inter'] text-slate-900 outline-none transition-all focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]" 
                    />
                  ))}
                </div>
              </div>
            )}

            <button disabled={loading} type="submit" className="w-full flex justify-center items-center py-3 text-[0.95rem] font-semibold rounded-xl mt-2 bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white tracking-[0.03em] transition-all disabled:opacity-70 disabled:pointer-events-none">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : step < steps.length - 1 ? 'Continue →' : 'Create Account →'}
            </button>

            {step === 1 && (
              <button 
                type="button" 
                onClick={() => setStep(2)} 
                className="w-full py-2.5 text-[0.9rem] font-semibold rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                Skip for now
              </button>
            )}
          </form>

          {step === 2 && (
            <button onClick={handleResendOtp} disabled={loading} className="mt-5 text-[0.85rem] font-semibold text-slate-500 hover:text-[#00c8aa] transition-colors">
              Didn't receive the code? Resend OTP
            </button>
          )}

          {step === 0 && (
            <div className="w-full flex flex-col items-center mt-1">
              <div className="flex items-center gap-3 text-slate-400 text-[0.82rem] w-full my-5 before:content-[''] before:flex-1 before:h-px before:bg-slate-200 after:content-[''] after:flex-1 after:h-px after:bg-slate-200">
                <span className="uppercase tracking-wider font-semibold">OR</span>
              </div>

              <div className="w-full flex justify-center mb-5">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Login Failed')}
                  theme="outline"
                  size="large"
                  text="signup_with"
                  shape="rectangular"
                  width="400"
                />
              </div>

              <p className="text-[0.85rem] text-slate-500 text-center">
                Already have an account? <Link to="/login" className="text-[#00c8aa] font-semibold hover:underline">Login</Link>
              </p>
            </div>
          )}

          <div className="flex gap-4 sm:gap-8 mt-7 pt-6 border-t border-slate-200 w-full justify-center">
            <div className="flex flex-col items-center gap-2 text-[0.78rem] text-slate-400 font-medium text-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#00c8aa]"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <span>High Performance</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-[0.78rem] text-slate-400 font-medium text-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#00c8aa]"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>Global Community</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-[0.78rem] text-slate-400 font-medium text-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#00c8aa]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Easy Booking</span>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
