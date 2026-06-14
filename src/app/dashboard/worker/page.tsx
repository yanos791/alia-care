'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, CheckCircle2, UserCircle2, Clock, Send, Loader2 } from 'lucide-react'

// --- Mock Data ---

const RESIDENTS = [
  { id: '1', name: 'Mrs. Sterling', room: '104' },
  { id: '2', name: 'Mr. Chen', room: '112' },
  { id: '3', name: 'Emma W.', room: '201' },
  { id: '4', name: 'Dr. Hayes', room: '108' },
]

type HistoryItem = {
  id: string
  residentName: string
  updateText: string
  timeStr: string
}

const INITIAL_HISTORY: HistoryItem[] = [
  { id: 'h1', residentName: 'Emma W.', updateText: 'Emma completed her morning physical therapy exercises with great energy. She\'s resting in the sunroom now.', timeStr: '2 hours ago' },
  { id: 'h2', residentName: 'Mr. Chen', updateText: 'Medication administered as scheduled. Vitals are stable.', timeStr: '4 hours ago' },
]

export default function WorkerDashboardPage() {
  const [selectedResident, setSelectedResident] = useState<string>('1')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordedText, setRecordedText] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY)

  // Simulation of voice dictation logic
  const handleToggleRecord = () => {
    if (isRecording) {
      // Stop recording and process
      setIsRecording(false)
      setIsProcessing(true)
      
      // Simulate AI processing speech to text
      setTimeout(() => {
        setIsProcessing(false)
        setRecordedText("Mrs. Sterling had a wonderful lunch today. She really enjoyed the new garden view and was very chatty with the other residents.")
      }, 1500)
    } else {
      // Start recording
      setRecordedText('')
      setIsRecording(true)
    }
  }

  const handleDispatchUpdate = () => {
    if (!recordedText.trim()) return

    const resident = RESIDENTS.find(r => r.id === selectedResident)
    
    const newUpdate: HistoryItem = {
      id: `h-${Date.now()}`,
      residentName: resident?.name || 'Unknown',
      updateText: recordedText,
      timeStr: 'Just Now',
    }

    setHistory(prev => [newUpdate, ...prev])
    setRecordedText('')
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 pb-20">
      
      {/* ─── Header ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center md:text-left"
      >
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-cormorant)] font-light tracking-tight text-[#2A1F1A]">
          Care Action Hub
        </h1>
        <p className="mt-2 text-sm font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
          Quickly log updates and notify families seamlessly.
        </p>
      </motion.div>

      {/* ─── Target Asset Directory (Resident Selector) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3"
      >
        <span className="text-xs uppercase tracking-widest font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] px-2">
          Select Resident
        </span>
        <div className="flex overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 gap-3 no-scrollbar">
          {RESIDENTS.map((res) => {
            const isSelected = selectedResident === res.id
            return (
              <button
                key={res.id}
                onClick={() => setSelectedResident(res.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 cursor-pointer shrink-0 ${
                  isSelected 
                    ? 'bg-[#2A1F1A] border-[#2A1F1A] text-[#F5EFE8] shadow-md' 
                    : 'bg-white/60 backdrop-blur-sm border-[#D9CFC5]/60 text-[#483C35] hover:border-[#c3b2a2] hover:bg-white/80'
                }`}
              >
                <UserCircle2 className={`w-4 h-4 ${isSelected ? 'text-[#c3b2a2]' : 'text-[#8A7A6E]'}`} />
                <span className="text-sm font-[family-name:var(--font-dm-sans)] font-medium">
                  {res.name}
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="activeResidentIndicator"
                    className="absolute inset-0 rounded-full border-2 border-[#2A1F1A] pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* ─── Core Quick-Action Block (Voice Dictation) ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] border border-[#D9CFC5]/60 shadow-[0_8px_30px_rgba(42,31,26,0.04)] p-6 md:p-8 flex flex-col items-center justify-center min-h-[320px]"
      >
        <AnimatePresence mode="wait">
          {!recordedText && !isProcessing && (
            <motion.div
              key="record-ui"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-8 w-full"
            >
              <div className="relative flex items-center justify-center">
                {/* Breathing Aura Waveform Container */}
                {isRecording && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-rose-400 blur-md"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute -inset-4 rounded-full bg-rose-50 border border-rose-100"
                    />
                  </>
                )}

                {/* Main Circular Dictation Target */}
                <button
                  onClick={handleToggleRecord}
                  className={`relative z-10 flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 cursor-pointer shadow-lg ${
                    isRecording 
                      ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/25' 
                      : 'bg-[#2A1F1A] text-[#F5EFE8] hover:bg-[#483C35] shadow-[#2A1F1A]/20 hover:scale-105'
                  }`}
                >
                  {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
                </button>
              </div>

              <div className="text-center h-8">
                <span className={`text-sm font-[family-name:var(--font-dm-sans)] tracking-wide uppercase transition-colors duration-300 ${isRecording ? 'text-rose-500 font-bold' : 'text-[#8A7A6E]'}`}>
                  {isRecording ? 'Listening... Tap to stop' : 'Tap to record update'}
                </span>
              </div>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              key="processing-ui"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center gap-6 w-full py-12"
            >
              <Loader2 className="w-10 h-10 text-[#c3b2a2] animate-spin" />
              <p className="text-sm font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] tracking-wide uppercase">
                Processing Audio...
              </p>
            </motion.div>
          )}

          {recordedText && !isProcessing && (
            <motion.div
              key="review-ui"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-[family-name:var(--font-dm-sans)] text-[#c3b2a2] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Ready to Dispatch
                </span>
                <button 
                  onClick={() => setRecordedText('')}
                  className="text-xs font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] hover:text-[#2A1F1A] underline underline-offset-4 cursor-pointer"
                >
                  Discard
                </button>
              </div>
              
              <div className="bg-[#F5EFE8]/50 p-5 rounded-2xl border border-[#D9CFC5]/50">
                <p className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] text-[#2A1F1A] leading-relaxed">
                  {recordedText}
                </p>
              </div>

              <button
                onClick={handleDispatchUpdate}
                className="w-full py-4 rounded-xl bg-[#c3b2a2] text-[#F5EFE8] text-base font-[family-name:var(--font-dm-sans)] font-medium hover:bg-[#b09080] transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Dispatch to Family
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ─── Recent History Reel ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-xl font-[family-name:var(--font-cormorant)] text-[#2A1F1A] px-2">
          Recent Dispatches
        </h2>
        
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {history.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 350, 
                  damping: 30,
                  layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
                }}
                className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-[#D9CFC5]/60 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCircle2 className="w-4 h-4 text-[#c3b2a2]" />
                    <span className="text-sm font-[family-name:var(--font-dm-sans)] font-medium text-[#2A1F1A]">
                      {item.residentName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#8A7A6E]">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
                      {item.timeStr}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-[family-name:var(--font-dm-sans)] text-[#483C35] leading-relaxed">
                  {item.updateText}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

    </div>
  )
}
