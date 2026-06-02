import EliteLayout from '../../layouts/EliteLayout'

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']

export default function EliteSchedulePage() {
  return (
    <EliteLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#006070] mb-1">Realtime Schedule</h1>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full border bg-white text-[0.8125rem] font-medium cursor-pointer border-[#00c2ff] text-[#00c2ff]">All Sports</button>
              <button className="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-500 text-[0.8125rem] font-medium cursor-pointer hover:bg-slate-50">Cầu lông</button>
              <button className="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-500 text-[0.8125rem] font-medium cursor-pointer hover:bg-slate-50">Pickleball</button>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-slate-800"><span className="w-3 h-3 rounded-sm bg-slate-50 border border-slate-300"></span> Available</span>
              <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-slate-800"><span className="w-3 h-3 rounded-sm bg-blue-100"></span> Booked</span>
              <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-slate-800"><span className="w-3 h-3 rounded-sm bg-red-100"></span> In-Use</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Timeline Header */}
            <div className="flex border-b border-slate-200 py-4">
              <div className="w-[120px] shrink-0"></div>
              {timeSlots.map(time => (
                <div key={time} className="flex-1 text-left text-[0.8125rem] font-semibold text-slate-500 pl-2.5">{time}</div>
              ))}
            </div>

            {/* Grid Body */}
            <div className="relative bg-slate-50">
              {/* Grid Lines Overlay */}
              <div className="absolute top-0 left-[120px] right-0 bottom-0 flex pointer-events-none z-0">
                {timeSlots.map((_, i) => (
                  <div key={i} className="flex-1 border-l border-dashed border-slate-200"></div>
                ))}
              </div>

              {/* Court 1 */}
              <div className="flex min-h-[80px] border-b border-slate-200 relative z-[1]">
                <div className="w-[120px] shrink-0 bg-white flex items-center px-5 text-sm font-bold text-slate-800 border-r border-slate-200">Court 1</div>
                <div className="flex-1 relative my-2.5">
                  <div className="absolute top-0 bottom-0 bg-blue-100 border-l-4 border-l-blue-500 rounded-md px-3 py-2.5 overflow-hidden flex flex-col justify-center" style={{ left: '0%', width: '25%' }}>
                    <p className="text-[0.8125rem] font-bold text-blue-900 whitespace-nowrap text-ellipsis overflow-hidden">Team Alpha vs Beta</p>
                    <p className="text-[0.75rem] text-blue-500 mt-1">08:00 - 10:00</p>
                  </div>
                  <div className="absolute top-0 bottom-0 bg-red-100 border-l-4 border-l-red-500 rounded-md px-3 py-2.5 overflow-hidden flex flex-col justify-center" style={{ left: '25%', width: '12.5%' }}>
                    <p className="text-[0.8125rem] font-bold text-red-900 whitespace-nowrap text-ellipsis overflow-hidden">Private Lesson</p>
                    <p className="text-[0.75rem] text-red-700 mt-1">10:00 - 11:00</p>
                  </div>
                </div>
              </div>

              {/* Court 2 */}
              <div className="flex min-h-[80px] border-b border-slate-200 relative z-[1]">
                <div className="w-[120px] shrink-0 bg-white flex items-center px-5 text-sm font-bold text-slate-800 border-r border-slate-200">Court 2</div>
                <div className="flex-1 relative my-2.5">
                  <div className="absolute top-0 bottom-0 bg-amber-100 border-l-4 border-l-amber-500 rounded-md px-3 py-2.5 overflow-hidden flex flex-col justify-center" style={{ left: '12.5%', width: '31.25%' }}>
                    <p className="text-[0.8125rem] font-bold text-amber-800 whitespace-nowrap text-ellipsis overflow-hidden flex items-center gap-1.5 justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                      Net Replacement
                    </p>
                  </div>
                  <div className="absolute top-0 bottom-0 bg-blue-100 border-l-4 border-l-blue-500 rounded-md px-3 py-2.5 overflow-hidden flex flex-col justify-center" style={{ left: '50%', width: '37.5%' }}>
                    <p className="text-[0.8125rem] font-bold text-blue-900 whitespace-nowrap text-ellipsis overflow-hidden">Regional Tournament Quarterfinals</p>
                    <p className="text-[0.75rem] text-blue-500 mt-1">12:00 - 15:00</p>
                  </div>
                </div>
              </div>

              {/* Court 3 */}
              <div className="flex min-h-[80px] relative z-[1]">
                <div className="w-[120px] shrink-0 bg-white flex items-center px-5 text-sm font-bold text-slate-800 border-r border-slate-200">Court 3</div>
                <div className="flex-1 relative my-2.5">
                  <div className="absolute top-0 bottom-0 bg-blue-100 border-l-4 border-l-blue-500 rounded-md px-3 py-2.5 overflow-hidden flex flex-col justify-center" style={{ left: '0%', width: '18.75%' }}>
                    <p className="text-[0.8125rem] font-bold text-blue-900 whitespace-nowrap text-ellipsis overflow-hidden">Open Play</p>
                  </div>
                  <div className="absolute top-0 bottom-0 bg-blue-100 border-l-4 border-l-blue-500 rounded-md px-3 py-2.5 overflow-hidden flex flex-col justify-center" style={{ left: '25%', width: '12.5%' }}>
                    <p className="text-[0.8125rem] font-bold text-blue-900 whitespace-nowrap text-ellipsis overflow-hidden">Clinic</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </EliteLayout>
  )
}
