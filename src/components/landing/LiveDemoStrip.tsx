'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mic, Sparkles, RefreshCcw } from 'lucide-react'

const INPUT_TEXT = "Emma had a great day, she painted a butterfly and ate all her lunch."
const OUTPUT_TEXT = "Hi Sarah! Just a quick note — Emma had a wonderful afternoon. She painted a beautiful butterfly and finished every bite of her lunch. We love having her here! 🌟"

export default function LiveDemoStrip() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView && !hasStarted && !isGenerating) {
      const timer = setTimeout(() => {
        handleGenerate()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, hasStarted, isGenerating])

  useEffect(() => {
    if (isGenerating) {
      let currentIndex = 0
      setTypedText('')
      
      const interval = setInterval(() => {
        if (currentIndex < OUTPUT_TEXT.length) {
          setTypedText(OUTPUT_TEXT.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsGenerating(false)
          setIsComplete(true)
        }
      }, 28)

      return () => clearInterval(interval)
    }
  }, [isGenerating])

  const handleGenerate = () => {
    if (isGenerating) return
    setHasStarted(true)
    setIsGenerating(true)
    setIsComplete(false)
    setTypedText('')
  }

  const handleReset = () => {
    setIsGenerating(false)
    setHasStarted(false)
    setIsComplete(false)
    setTypedText('')
  }

  return (
    <section ref={sectionRef} className="bg-[#F5EFE8] py-28 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-cormorant)] font-light text-[#2A1F1A]">
            Watch Alia work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Card: Staff Input */}
          <motion.div 
            className="rounded-2xl border border-[#D9CFC5] bg-[#FDFAF7] shadow-[0_2px_20px_rgba(195,178,162,0.15)] hover:shadow-[0_8px_40px_rgba(195,178,162,0.25)] transition-shadow duration-500 p-8 md:p-12 flex flex-col h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#D9CFC5]/50">
              <div className="w-10 h-10 rounded-full bg-[#EDE4DA] flex items-center justify-center text-[#c3b2a2]">
                <Mic size={18} strokeWidth={2} />
              </div>
              <h3 className="text-xs uppercase tracking-[0.25em] font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
                Staff Input
              </h3>
            </div>
            
            <div className="flex-grow flex items-center min-h-[140px]">
              <p className="text-xl md:text-2xl font-[family-name:var(--font-cormorant)] text-[#483C35] italic leading-relaxed">
                "{INPUT_TEXT}"
              </p>
            </div>

            <div className="mt-10 pt-6 flex flex-col items-start gap-4">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || isComplete}
                className="rounded-full px-8 py-3.5 bg-[#c3b2a2] text-[#F5EFE8] font-[family-name:var(--font-dm-sans)] font-medium tracking-wide hover:bg-[#b09080] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#c3b2a2] flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                {isGenerating ? (
                  <>
                    <Sparkles size={18} className="animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Message
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Family Message & Preview */}
          <div className="flex flex-col gap-6 md:gap-8">
            
            {/* Right Card: Family Message */}
            <motion.div 
              className="rounded-2xl border border-[#D9CFC5] bg-[#FDFAF7] shadow-[0_2px_20px_rgba(195,178,162,0.15)] hover:shadow-[0_8px_40px_rgba(195,178,162,0.25)] transition-shadow duration-500 p-8 md:p-12 flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D9CFC5]/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c3b2a2] flex items-center justify-center text-[#F5EFE8]">
                    <Sparkles size={18} strokeWidth={2} />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.25em] font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
                    Family Message
                  </h3>
                </div>
                
                <button 
                  onClick={handleReset}
                  className="text-xs font-[family-name:var(--font-dm-sans)] font-medium tracking-widest uppercase text-[#8A7A6E] hover:text-[#483C35] transition-colors flex items-center gap-1.5"
                  aria-label="Replay Demo"
                >
                  <RefreshCcw size={12} />
                  Replay
                </button>
              </div>
              
              <div className="min-h-[120px]">
                {!hasStarted && !isGenerating && !isComplete ? (
                  <p className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] leading-relaxed text-[#8A7A6E] italic opacity-60">
                    Awaiting staff input...
                  </p>
                ) : (
                  <p className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] leading-relaxed text-[#483C35]">
                    {typedText}
                    {isGenerating && <span className="inline-block w-1.5 h-4 ml-1 bg-[#c3b2a2] animate-pulse align-middle" />}
                  </p>
                )}
              </div>
            </motion.div>

            {/* SMS Bubble Preview Below Card */}
            <motion.div 
              className="flex flex-col gap-2 pl-4 md:pl-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: typedText.length > 0 ? 1 : 0,
                y: typedText.length > 0 ? 0 : 10
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span className="text-[10px] uppercase tracking-widest font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] ml-[52px]">
                SMS Preview
              </span>
              <div className="flex items-end gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c3b2a2] flex items-center justify-center text-[#F5EFE8] flex-shrink-0 mb-1 border border-[#D9CFC5] shadow-sm">
                  <Sparkles size={16} strokeWidth={1.5} />
                </div>
                <div className="bg-[#FDFAF7] border border-[#D9CFC5] px-5 py-4 rounded-[20px] rounded-bl-[4px] shadow-[0_2px_10px_rgba(195,178,162,0.1)] max-w-[85%]">
                  <p className="text-[15px] leading-relaxed font-[family-name:var(--font-dm-sans)] text-[#483C35]">
                    {typedText || "..."}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
// LiveDemoStrip — Alia Company
