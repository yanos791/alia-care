'use client'

import { motion, Variants } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const TIERS = [
  {
    id: 'core',
    name: 'Core',
    price: '$149',
    period: '/mo',
    subtitle: 'Single-location facilities',
    features: [
      'Unlimited Voice Notes',
      'Daily Family SMS Updates',
      'Basic Incident Logging',
      'Standard Google Reviews',
      'Email Support',
    ],
    isPopular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$299',
    period: '/mo',
    subtitle: 'Growing or multi-location facilities',
    features: [
      'Unlimited Voice Notes',
      'Daily Family SMS Updates',
      'Advanced Incident Reports',
      'Automated Review Generation',
      'Multi-Location Analytics',
      'Custom SMS Branding',
      'Priority 24/7 Support',
    ],
    isPopular: true,
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

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#F5EFE8] py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-xs uppercase tracking-[0.25em] font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-cormorant)] font-light text-[#2A1F1A]">
            One decision. Total clarity.
          </h2>
          <p className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] text-[#483C35] leading-relaxed mt-2">
            No contracts. Cancel any time.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {TIERS.map((tier) => {
            const isPro = tier.isPopular

            return (
              <motion.div 
                key={tier.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className={`relative rounded-2xl border flex flex-col p-8 md:p-12 transition-shadow duration-500 ${
                  isPro 
                    ? 'border-[#c3b2a2] bg-[#c3b2a2] shadow-[0_8px_40px_rgba(195,178,162,0.25)]' 
                    : 'border-[#D9CFC5] bg-[#FDFAF7] shadow-[0_2px_20px_rgba(195,178,162,0.15)] hover:shadow-[0_8px_40px_rgba(195,178,162,0.25)]'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full px-4 py-1 text-xs tracking-widest uppercase bg-[#EDE4DA] text-[#8A7A6E] border border-[#D9CFC5] shadow-sm whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-2xl font-[family-name:var(--font-cormorant)] font-light mb-2 ${isPro ? 'text-[#F5EFE8]' : 'text-[#2A1F1A]'}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-5xl font-[family-name:var(--font-cormorant)] font-light ${isPro ? 'text-[#F5EFE8]' : 'text-[#2A1F1A]'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm font-[family-name:var(--font-dm-sans)] ${isPro ? 'text-[#F5EFE8]/80' : 'text-[#8A7A6E]'}`}>
                      {tier.period}
                    </span>
                  </div>
                  <p className={`text-sm font-[family-name:var(--font-dm-sans)] ${isPro ? 'text-[#F5EFE8]/90' : 'text-[#483C35]'}`}>
                    {tier.subtitle}
                  </p>
                </div>

                <div className={`flex-grow border-t mb-8 pt-8 ${isPro ? 'border-[#F5EFE8]/20' : 'border-[#D9CFC5]/50'}`}>
                  <ul className="flex flex-col gap-4">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle 
                          size={18} 
                          strokeWidth={2}
                          className={`flex-shrink-0 mt-0.5 ${isPro ? 'text-[#F5EFE8]' : 'text-[#c3b2a2]'}`} 
                        />
                        <span className={`text-base font-[family-name:var(--font-dm-sans)] ${isPro ? 'text-[#F5EFE8]' : 'text-[#483C35]'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full rounded-full px-8 py-3.5 font-[family-name:var(--font-dm-sans)] font-medium tracking-wide flex items-center justify-center transition-all duration-300 ${
                    isPro 
                      ? 'bg-[#F5EFE8] text-[#2A1F1A] hover:bg-white hover:scale-[1.02]' 
                      : 'border border-[#c3b2a2] text-[#2A1F1A] hover:bg-[#EDE4DA]'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
// PricingSection — Alia Company
