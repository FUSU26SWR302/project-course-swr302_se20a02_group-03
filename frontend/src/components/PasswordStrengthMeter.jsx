import React from 'react'

export default function PasswordStrengthMeter({ password }) {
  const requirements = [
    { id: 'length', text: 'At least 8 characters', regex: /.{8,}/ },
    { id: 'number', text: 'Contains a number', regex: /[0-9]/ },
    { id: 'uppercase', text: 'Contains an uppercase letter', regex: /[A-Z]/ },
    { id: 'special', text: 'Contains a special character', regex: /[^A-Za-z0-9]/ },
  ]

  const strength = requirements.filter(req => req.regex.test(password)).length

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-brand-200'
    if (strength <= 2) return 'bg-red-500'
    if (strength === 3) return 'bg-amber-500'
    return 'bg-emerald-500'
  }
  
  const getTextColor = () => {
    if (strength === 0) return 'text-brand-400'
    if (strength <= 2) return 'text-red-600'
    if (strength === 3) return 'text-amber-600'
    return 'text-emerald-600'
  }

  const getStrengthText = () => {
    if (strength === 0) return ''
    if (strength <= 2) return 'Weak'
    if (strength === 3) return 'Good'
    return 'Strong'
  }

  return (
    <div className="w-full mt-2 flex flex-col gap-2">
      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-brand-100 rounded-full overflow-hidden flex">
          <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${(strength / 4) * 100}%` }} />
        </div>
        <span className={`text-xs font-semibold w-10 text-right ${getTextColor()}`}>
          {getStrengthText()}
        </span>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-2 mt-2">
        {requirements.map(req => {
          const isMet = req.regex.test(password)
          return (
            <div key={req.id} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${isMet ? 'bg-emerald-500' : 'bg-brand-200'}`}>
                {isMet ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
              <span className={`text-xs transition-colors ${isMet ? 'text-brand-800 font-medium' : 'text-brand-500'}`}>
                {req.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
