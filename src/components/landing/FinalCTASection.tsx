'use client'

import { motion } from 'framer-motion'

export default function FinalCTASection() {
  return (
    <section id="booking-section" className="bg-[#c3b2a2] py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-cormorant)] font-light text-[#F5EFE8] mb-6 tracking-tight">
            Your families deserve better communication.
          </h2>
          
          <p className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] text-[#F5EFE8]/90 mb-12">
            Simple for staff. Meaningful for families.
          </p>

          <form className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Your Name" 
              required
              className="w-full md:w-1/3 bg-white/5 border border-[#F5EFE8]/30 rounded-full px-6 py-3.5 text-sm text-[#F5EFE8] placeholder:text-[#F5EFE8]/70 focus:outline-none focus:border-[#F5EFE8] transition-colors"
            />
            <input 
              type="email" 
              placeholder="Facility Email" 
              required
              className="w-full md:w-1/3 bg-white/5 border border-[#F5EFE8]/30 rounded-full px-6 py-3.5 text-sm text-[#F5EFE8] placeholder:text-[#F5EFE8]/70 focus:outline-none focus:border-[#F5EFE8] transition-colors"
            />
            <button 
              type="submit"
              className="w-full md:w-1/3 rounded-full px-8 py-3.5 bg-[#F5EFE8] text-[#2A1F1A] font-[family-name:var(--font-dm-sans)] font-medium tracking-wide transition-all duration-300 hover:bg-white hover:scale-[1.02]"
            >
              Request Invite
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
// FinalCTASection — Alia Company
