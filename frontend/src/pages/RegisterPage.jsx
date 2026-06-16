import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
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

  /* ── Visual panel content per step ── */
  const visualContent = [
    { title: 'JOIN THE\nELITE\nNETWORK.', subtitle: 'Create your account and start booking courts, connecting with players, and more.' },
    { title: 'TELL US\nWHAT YOU\nPLAY.', subtitle: 'Help us personalize your experience with your sport preferences.' },
    { title: 'ALMOST\nTHERE.', subtitle: 'Verify your email to activate your Pro-Sport account.' },
  ]

  return (
    <div className="auth-layout">
      {/* ── Visual Panel (Left) ── */}
      <div className="auth-visual">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />

        {/* Radial glow */}
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start max-w-[480px] px-14" key={step}>
          {/* Logo */}
          <Link to="/" className="font-heading text-3xl font-bold tracking-tight mb-16 flex items-center gap-0.5">
            <span className="text-white">PRO</span>
            <span className="text-accent">-</span>
            <span className="text-white">SPORT</span>
          </Link>

          {/* Step-based tagline */}
          <div className="auth-animate-in">
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

          {/* Progress indicator */}
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= step ? 'bg-accent scale-100' : 'bg-brand-700 scale-75'}`} />
                  {i < steps.length - 1 && (
                    <div className={`w-8 h-px transition-all duration-500 ${i < step ? 'bg-accent' : 'bg-brand-700'}`} />
                  )}
                </div>
              ))}
              <span className="ml-3 text-xs font-medium text-brand-500 tracking-wider uppercase">
                Step {step + 1} of {steps.length}
              </span>
            </div>
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
          {/* Mobile step indicator */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= step ? 'bg-accent' : 'bg-brand-300'}`} />
                {i < steps.length - 1 && (
                  <div className={`w-6 h-px transition-all duration-500 ${i < step ? 'bg-accent' : 'bg-brand-200'}`} />
                )}
              </div>
            ))}
            <span className="ml-2 text-xs font-medium text-brand-400">{step + 1}/{steps.length}</span>
          </div>

          {/* Header */}
          <header className="mb-8">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">Create account</p>
            <h1 className="font-heading text-[2rem] font-bold text-brand-900 tracking-tight leading-tight">
              {step === 0 && <>Get started with<br />Pro-Sport</>}
              {step === 1 && <>Choose your<br />sports</>}
              {step === 2 && <>Verify your<br />email</>}
            </h1>
            <p className="text-sm text-brand-500 mt-3 leading-relaxed">
              {step === 0 && 'Fill in your details to create your athlete account.'}
              {step === 1 && 'Select the sports you play to personalize your feed.'}
              {step === 2 && `We sent a 6-digit code to ${email}`}
            </p>
          </header>

          {/* Error */}
          {error && error.includes('Email already exists') ? (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6 flex flex-col items-center text-center auth-animate-fade">
              <span className="text-amber-800 text-sm font-semibold mb-3">
                This email is already registered.
              </span>
              <div className="flex gap-3 w-full">
                <Link to="/login" className="flex-1 py-2.5 text-sm font-semibold bg-white text-brand-700 border border-brand-200 rounded-xl text-center hover:bg-brand-50 transition-colors duration-200">
                  Login Now
                </Link>
                <Link to="/reset-password" className="flex-1 py-2.5 text-sm font-semibold bg-amber-100 text-amber-800 rounded-xl text-center hover:bg-amber-200 transition-colors duration-200">
                  Forgot Password?
                </Link>
              </div>
            </div>
          ) : error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl border border-red-200 mb-6 text-center auth-animate-fade">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={next} noValidate>
            {/* ── Step 0: Details ── */}
            {step === 0 && (
              <div className="flex flex-col gap-5 auth-animate-slide" key="step-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="reg-name" className="text-sm font-semibold text-brand-900">Full Name</label>
                    <div className="relative group">
                      <svg className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${fieldErrors.fullName ? 'text-red-400' : 'text-brand-400 group-focus-within:text-accent'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <input id="reg-name" name="fullName" type="text" value={fullName} onBlur={handleBlur} onChange={e => { setFullName(e.target.value); if (fieldErrors.fullName) validateField('fullName', e.target.value) }} required placeholder="John Doe" className={`auth-input pl-11 ${fieldErrors.fullName ? 'border-red-400 focus:border-red-500 focus:ring-red-400/20' : ''}`} />
                    </div>
                    {fieldErrors.fullName && <span className="text-xs text-red-500 font-medium">{fieldErrors.fullName}</span>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="reg-phone" className="text-sm font-semibold text-brand-900">Phone Number</label>
                    <div className="relative group">
                      <svg className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${fieldErrors.phoneNumber ? 'text-red-400' : 'text-brand-400 group-focus-within:text-accent'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"/></svg>
                      <input id="reg-phone" name="phoneNumber" type="tel" value={phoneNumber} onBlur={handleBlur} onChange={e => { setPhoneNumber(e.target.value); if (fieldErrors.phoneNumber) validateField('phoneNumber', e.target.value) }} placeholder="+84 0000 0000" className={`auth-input pl-11 ${fieldErrors.phoneNumber ? 'border-red-400 focus:border-red-500 focus:ring-red-400/20' : ''}`} />
                    </div>
                    {fieldErrors.phoneNumber && <span className="text-xs text-red-500 font-medium">{fieldErrors.phoneNumber}</span>}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="reg-email" className="text-sm font-semibold text-brand-900">Email Address</label>
                  <div className="relative group">
                    <svg className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${fieldErrors.email ? 'text-red-400' : 'text-brand-400 group-focus-within:text-accent'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input id="reg-email" name="email" type="email" value={email} onBlur={handleBlur} onChange={e => { setEmail(e.target.value); if (fieldErrors.email) validateField('email', e.target.value) }} required placeholder="john.doe@example.com" className={`auth-input pl-11 ${fieldErrors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-400/20' : ''}`} />
                  </div>
                  {fieldErrors.email && <span className="text-xs text-red-500 font-medium">{fieldErrors.email}</span>}
                </div>

                {/* Password + Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="reg-password" className="text-sm font-semibold text-brand-900">Password</label>
                    <div className="relative group">
                      <svg className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${fieldErrors.password ? 'text-red-400' : 'text-brand-400 group-focus-within:text-accent'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input id="reg-password" name="password" type={showPass ? 'text' : 'password'} value={password} onBlur={handleBlur} onChange={e => { setPassword(e.target.value); if (fieldErrors.password) validateField('password', e.target.value); if (confirmPassword) validateField('confirmPassword', confirmPassword) }} required placeholder="••••••••" className={`auth-input pl-11 pr-11 ${fieldErrors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-400/20' : ''}`} />
                      <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-accent transition-colors duration-300" onClick={() => setShowPass(!showPass)} aria-label="Toggle">
                        {showPass
                          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/></svg>
                          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        }
                      </button>
                    </div>
                    {password && <PasswordStrengthMeter password={password} />}
                    {fieldErrors.password && !password && <span className="text-xs text-red-500 font-medium">{fieldErrors.password}</span>}
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="reg-confirm" className="text-sm font-semibold text-brand-900">Confirm Password</label>
                    <div className="relative group">
                      <svg className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${fieldErrors.confirmPassword ? 'text-red-400' : 'text-brand-400 group-focus-within:text-accent'}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input id="reg-confirm" name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={confirmPassword} onBlur={handleBlur} onChange={e => { setConfirmPassword(e.target.value); if (fieldErrors.confirmPassword) validateField('confirmPassword', e.target.value) }} required placeholder="••••••••" className={`auth-input pl-11 pr-11 ${fieldErrors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-400/20' : ''}`} />
                      <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-accent transition-colors duration-300" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle">
                        {showConfirm
                          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/></svg>
                          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        }
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && <span className="text-xs text-red-500 font-medium">{fieldErrors.confirmPassword}</span>}
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer text-sm text-brand-600 select-none group mt-1" htmlFor="agree-terms">
                  <input type="checkbox" id="agree-terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only" />
                  <span className={`w-[18px] h-[18px] border-[1.5px] rounded flex items-center justify-center transition-all duration-200 shrink-0 mt-0.5 ${agreed ? 'bg-accent border-accent' : 'border-brand-300 group-hover:border-accent'}`}>
                    {agreed && <span className="w-2 h-1.5 border-l-2 border-b-2 border-white -rotate-45 -translate-y-px" />}
                  </span>
                  <span className="leading-relaxed">I agree to the <Link to="#" className="text-accent font-semibold hover:underline">Terms &amp; Conditions</Link> and our <Link to="#" className="text-accent font-semibold hover:underline">Privacy Policy</Link></span>
                </label>
              </div>
            )}

            {/* ── Step 1: Preferences ── */}
            {step === 1 && (
              <div className="flex flex-col gap-4 auth-animate-slide" key="step-1">
                <p className="text-sm font-semibold text-brand-900 mb-1">Select your sport preferences</p>
                {['Cầu lông', 'Pickleball'].map(sport => (
                  <label key={sport} className={`group flex items-center gap-4 cursor-pointer p-5 border rounded-xl transition-all duration-300 ${sportPreferences.includes(sport) ? 'bg-accent/5 border-accent text-accent shadow-sm' : 'bg-brand-50/50 border-brand-200/70 text-brand-700 hover:border-brand-300 hover:bg-white hover:-translate-y-px hover:shadow-sm'}`}>
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={sportPreferences.includes(sport)}
                      onChange={() => {
                        setSportPreferences(prev => 
                          prev.includes(sport) 
                            ? prev.filter(s => s !== sport) 
                            : [...prev, sport]
                        )
                      }}
                    />
                    {/* Sport icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${sportPreferences.includes(sport) ? 'bg-accent/10' : 'bg-brand-100'}`}>
                      {sport === 'Cầu lông' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 4-8 4 8"/><path d="M12 4v16"/></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-sm">{sport}</span>
                      <p className={`text-xs mt-0.5 ${sportPreferences.includes(sport) ? 'text-accent/70' : 'text-brand-400'}`}>
                        {sport === 'Cầu lông' ? 'Badminton courts & matches' : 'Pickleball courts & community'}
                      </p>
                    </div>
                    <span className={`w-5 h-5 border-[1.5px] rounded flex items-center justify-center transition-all duration-200 shrink-0 ${sportPreferences.includes(sport) ? 'bg-accent border-accent' : 'border-brand-300'}`}>
                       {sportPreferences.includes(sport) && <span className="w-2 h-1.5 border-l-2 border-b-2 border-white -rotate-45 -translate-y-px" />}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* ── Step 2: OTP Verify ── */}
            {step === 2 && (
              <div className="flex flex-col items-center gap-6 auth-animate-slide" key="step-2">
                {/* Email icon */}
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <p className="text-sm text-brand-600 font-medium text-center">Enter the verification code sent to<br /><span className="font-semibold text-brand-900">{email}</span></p>
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
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-brand-200 rounded-xl font-sans text-brand-900 outline-none transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20 bg-brand-50/50 focus:bg-white" 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <button disabled={loading} type="submit" className="auth-btn mt-2">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : step < steps.length - 1 ? 'Continue' : 'Create Account'}
            </button>

            {step === 1 && (
              <button 
                type="button" 
                onClick={() => setStep(2)} 
                className="w-full py-3 text-sm font-semibold text-brand-500 hover:text-brand-900 transition-colors duration-200"
              >
                Skip for now
              </button>
            )}
          </form>

          {step === 2 && (
            <button onClick={handleResendOtp} disabled={loading} className="mt-6 text-sm font-semibold text-brand-500 hover:text-accent transition-colors duration-200 self-center">
              Didn't receive the code? <span className="text-accent">Resend OTP</span>
            </button>
          )}

          {step === 0 && (
            <div className="flex flex-col items-center mt-2">
              {/* Divider */}
              <div className="flex items-center gap-4 w-full my-6">
                <div className="flex-1 h-px bg-brand-200" />
                <span className="text-xs font-medium text-brand-400 tracking-wider uppercase">or</span>
                <div className="flex-1 h-px bg-brand-200" />
              </div>

              <div className="w-full flex justify-center mb-8">
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

              <p className="text-sm text-brand-500 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-accent font-semibold hover:text-accent-hover transition-colors duration-200">Sign in</Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
