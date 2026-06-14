'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const SMS_MOCK = {
  message: "Mom finished her physical therapy early today. Her vitals are excellent and she's resting well in the sunroom. ☀️"
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full bg-[#F5EFE8] py-20 md:py-32 overflow-hidden antialiased">
      <div className="max-w-6xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-start text-left space-y-6 max-w-xl z-10"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase bg-[#EDE4DA] text-[#8A7A6E] border border-[#D9CFC5] font-[family-name:var(--font-dm-sans)]"
          >
            AI FOR CARE FACILITIES
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-[family-name:var(--font-cormorant)] font-light leading-[1.05] tracking-tight text-[#2A1F1A]"
          >
            Every family,<br />always informed.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] leading-relaxed text-[#483C35]"
          >
            Empower your care team with intelligent tools that effortlessly keep families updated, ensuring peace of mind and elevating the standard of communication.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
          >
            <button 
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 bg-[#c3b2a2] text-[#F5EFE8] font-[family-name:var(--font-dm-sans)] font-medium tracking-wide hover:bg-[#b09080] transition-all duration-300 hover:scale-[1.02]"
            >
              See How It Works <ArrowRight className="w-4 h-4"/>
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-full px-8 py-3.5 border border-[#c3b2a2] text-[#2A1F1A] font-[family-name:var(--font-dm-sans)] hover:bg-[#EDE4DA] transition-all duration-300"
            >
              Book a Demo
            </button>
          </motion.div>
        </motion.div>

        <div className="relative w-full flex justify-center lg:justify-end z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-[1.5rem] border border-[#D9CFC5] shadow-[0_2px_20px_rgba(195,178,162,0.15)] bg-[#EDE4DA]"
          >
            <div className="w-full aspect-[4/5] relative overflow-hidden">
              <motion.div
                initial={{ scale: 1.05, filter: 'blur(4px)' }}
                whileInView={{ scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full h-full"
              >
                <motion.img
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  src="/hero-bg.png" 
                  alt="Caregiver with elderly resident" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                duration: 1, 
                delay: 0.4, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              style={{ perspective: 1000 }}
              className="absolute bottom-6 left-6 right-6 z-20"
            >
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotateX: [2, -2, 2],
                  rotateY: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.4 
                }}
                className="relative rounded-[1.35rem] shadow-[0_30px_60px_rgba(42,31,26,0.2)] group"
              >
                <div className="absolute inset-0 rounded-[1.35rem] overflow-hidden">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-100%] w-[300%] h-[300%] top-[-100%] left-[-100%] opacity-80"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0 280deg, #c3b2a2 360deg)'
                    }}
                  />
                </div>

                <div className="relative z-10 m-[2px] bg-[#FDFAF7] border border-[#D9CFC5]/50 rounded-[1.25rem] p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <motion.div 
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[#c3b2a2] rounded-full blur-md"
                      />
                      <motion.div 
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="relative w-10 h-10 rounded-full bg-[#EDE4DA] flex items-center justify-center border border-[#D9CFC5] z-10 shadow-sm"
                      >
                        <Sparkles className="w-4 h-4 text-[#8A7A6E]"/>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="relative overflow-hidden inline-flex items-center gap-2"
                    >
                      <motion.div 
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 rounded-full bg-[#8A7A6E]"
                      />
                      <span className="text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] font-bold">
                        Alia Update
                      </span>
                      <motion.div
                        animate={{ x: ["-100%", "250%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-xl border border-white bg-white/80 p-4 shadow-sm overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                      className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[#EDE4DA]/30 to-transparent -skew-x-12"
                    />
                    <p className="relative z-10 text-[15px] font-[family-name:var(--font-dm-sans)] text-[#483C35] leading-relaxed">
                      {SMS_MOCK.message}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
