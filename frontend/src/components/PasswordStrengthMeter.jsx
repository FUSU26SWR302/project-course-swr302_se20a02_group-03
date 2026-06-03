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
    if (strength === 0) return 'bg-slate-200'
    if (strength <= 2) return 'bg-red-400'
    if (strength === 3) return 'bg-amber-400'
    return 'bg-[#00c8aa]'
  }

  const getStrengthText = () => {
    if (strength === 0) return ''
    if (strength <= 2) return 'Weak'
    if (strength === 3) return 'Good'
    return 'Strong'
  }

  return (
    <div className="w-full mt-2 flex flex-col gap-2 animate-[fadeIn_0.3s_ease]">
      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
          <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${(strength / 4) * 100}%` }} />
        </div>
        <span className={`text-[0.75rem] font-semibold w-10 text-right ${getStrengthColor().replace('bg-', 'text-')}`}>
          {getStrengthText()}
        </span>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 mt-1">
        {requirements.map(req => {
          const isMet = req.regex.test(password)
          return (
            <div key={req.id} className="flex items-center gap-1.5">
              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${isMet ? 'bg-[#00c8aa]' : 'bg-slate-200'}`}>
                {isMet ? (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <div className="w-1 h-1 bg-white rounded-full" />
                )}
              </div>
              <span className={`text-[0.7rem] transition-colors ${isMet ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                {req.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
