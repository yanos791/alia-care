'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, animate, Variants } from 'framer-motion'
import { Shield, Sparkles, Phone, CheckCircle } from 'lucide-react'

const STATS = [
  { prefix: '< ', value: 60, suffix: 's', text: 'to send a family update' },
  { prefix: '', value: 0, suffix: '', text: 'training required for staff' },
  { prefix: '', value: 100, suffix: '%', text: 'automated voice to delivery' },
] as const

const PILLARS = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'We never sell data. Patient information is strictly protected and isolated.'
  },
  {
    icon: Sparkles,
    title: 'Powered by GPT-4o',
    description: 'State-of-the-art models handle clinical translation securely and accurately.'
  },
  {
    icon: Phone,
    title: 'Delivered via Twilio',
    description: 'Enterprise-grade SMS infrastructure ensures 99.99% message delivery reliability.'
  },
  {
    icon: CheckCircle,
    title: 'Secure by Design',
    description: 'End-to-end encryption ensures your facility meets all rigorous compliance standards.'
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

function StatValue({ end, prefix = "", suffix = "" }: { end: number; prefix: string; suffix: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: false, amount: 0.5 })

  useEffect(() => {
    if (inView && nodeRef.current && end > 0) {
      const controls = animate(0, end, {
        duration: 0.65,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${Math.round(value)}${suffix}`
          }
        }
      })
      return controls.stop
    } else if (!inView && nodeRef.current) {
      nodeRef.current.textContent = `${prefix}${end > 0 ? 0 : end}${suffix}`
    }
  }, [end, prefix, suffix, inView])

  return <span ref={nodeRef}>{prefix}{end > 0 ? 0 : end}{suffix}</span>
}

export default function TrustSection() {
  return (
    <section className="bg-[#EDE4DA] py-28 md:py-40">
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
            Built for care. Designed for trust.
          </h2>
        </motion.div>

        {/* Top Row: Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24 md:mb-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {STATS.map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="text-center flex flex-col items-center">
              <div className="text-6xl md:text-7xl font-[family-name:var(--font-cormorant)] font-light text-[#2A1F1A] mb-4">
                <StatValue end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-base font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
                {stat.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Row: Trust Pillars */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                className="rounded-2xl border border-[#D9CFC5] bg-[#FDFAF7] shadow-[0_2px_20px_rgba(195,178,162,0.15)] hover:shadow-[0_8px_40px_rgba(195,178,162,0.25)] transition-shadow duration-500 p-8 md:p-12 flex flex-col items-start text-left"
              >
                <div className="w-12 h-12 rounded-full bg-[#EDE4DA] flex items-center justify-center text-[#c3b2a2] mb-6">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-dm-sans)] text-[#2A1F1A] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-base font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
// TrustSection — Alia Company
