'use client'

import { motion, Variants } from 'framer-motion'
import { Mic, Sparkles, MessageSquare } from 'lucide-react'

const STEPS = [
  {
    id: '01',
    title: 'Staff speaks',
    description: 'Caregivers verbally log updates naturally without touching a screen.',
    icon: Mic,
  },
  {
    id: '02',
    title: 'Alia writes',
    description: 'Our AI translates clinical notes into warm, family-friendly updates.',
    icon: Sparkles,
  },
  {
    id: '03',
    title: 'Family receives',
    description: 'Families get a beautifully formatted SMS instantly, offering peace of mind.',
    icon: MessageSquare,
  }
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#F5EFE8] py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20 md:mb-24 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-xs uppercase tracking-[0.25em] font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-cormorant)] font-light text-[#2A1F1A]">
            From voice to family, in seconds.
          </h2>
        </motion.div>

        {/* Steps Flow */}
        <div className="relative">
          
          {/* Animated Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-[2px] z-0">
            <svg width="100%" height="2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <motion.line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="#D9CFC5"
                strokeWidth="2"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              />
            </svg>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <motion.div 
                  key={step.id}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-7xl leading-none font-[family-name:var(--font-cormorant)] font-light text-[#D9CFC5] mb-4 select-none">
                    {step.id}
                  </div>
                  
                  <div className="w-16 h-16 rounded-full bg-[#FDFAF7] border border-[#D9CFC5] flex items-center justify-center text-[#c3b2a2] mb-6 shadow-[0_2px_20px_rgba(195,178,162,0.15)] relative z-10">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-bold font-[family-name:var(--font-dm-sans)] text-[#2A1F1A] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] leading-relaxed max-w-[260px]">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
