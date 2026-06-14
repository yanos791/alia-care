'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Star, FileText, BarChart2, Send, ArrowUpRight, TrendingUp } from 'lucide-react'

const TABS = [
  {
    id: 'family-updates',
    label: 'Family Updates',
    icon: MessageSquare,
  },
  {
    id: 'reputation',
    label: 'Reputation Management',
    icon: Star,
  },
  {
    id: 'incident',
    label: 'Incident Reports',
    icon: FileText,
  },
  {
    id: 'analytics',
    label: 'Owner Analytics',
    icon: BarChart2,
  },
] as const

const MOCK_DATA = {
  'family-updates': {
    title: 'New Update for Mrs. Sterling',
    body: "Mom finished her physical therapy early today. Her vitals are excellent and she's resting well in the sunroom. ☀️"
  },
  'reputation': {
    title: 'Request a Review',
    body: 'Hi David, thanks for visiting today! If you have a moment, we’d love your feedback on Google.'
  },
  'incident': {
    title: 'Incident Log #4092',
    date: 'Oct 12, 2:45 PM',
    body: 'Resident experienced slight dizziness during afternoon walk. Assisted to chair. Vitals stable. Family notified.'
  },
  'analytics': {
    stats: [
      { label: 'Weekly Updates', value: '412', trend: '+12%' },
      { label: 'Family Engagement', value: '98%', trend: '+4%' },
      { label: 'Avg Review Score', value: '4.9', trend: '+0.2' },
    ]
  }
} as const

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>(TABS[0].id)

  return (
    <section id="features" className="bg-[#EDE4DA] py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-cormorant)] font-light text-[#2A1F1A]">
            Everything your facility needs.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Left Vertical Tabs */}
          <motion.div 
            className="md:col-span-4 flex flex-col gap-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-6 py-4 text-left transition-all duration-300 ${
                    isActive 
                      ? 'border-l-2 border-[#c3b2a2] text-[#2A1F1A]' 
                      : 'border-l-2 border-transparent text-[#8A7A6E] hover:text-[#483C35]'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-[#c3b2a2]' : 'text-[#8A7A6E]'} strokeWidth={1.5} />
                  <span className="text-base md:text-lg font-[family-name:var(--font-dm-sans)] font-medium">
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </motion.div>

          {/* Right Content Panel */}
          <motion.div 
            className="md:col-span-8 relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="rounded-2xl border border-[#D9CFC5] bg-[#FDFAF7] shadow-[0_2px_20px_rgba(195,178,162,0.15)] hover:shadow-[0_8px_40px_rgba(195,178,162,0.25)] transition-shadow duration-500 overflow-hidden aspect-[4/3] md:aspect-[16/10] relative flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                
                {activeTab === 'family-updates' && (
                  <motion.div
                    key="family-updates"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-full max-w-sm flex flex-col gap-4"
                  >
                    <div className="bg-white rounded-xl border border-[#D9CFC5]/50 p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#D9CFC5]/30">
                        <span className="text-sm font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] uppercase tracking-wider">
                          {MOCK_DATA['family-updates'].title}
                        </span>
                        <MessageSquare size={16} className="text-[#c3b2a2]" />
                      </div>
                      <p className="text-[#483C35] font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed mb-6">
                        {MOCK_DATA['family-updates'].body}
                      </p>
                      <button className="w-full rounded-full bg-[#c3b2a2] text-[#F5EFE8] py-3.5 flex items-center justify-center gap-2 font-[family-name:var(--font-dm-sans)] font-medium tracking-wide transition-all duration-300 hover:bg-[#b09080] hover:scale-[1.02]">
                        <Send size={16} /> Send Update
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reputation' && (
                  <motion.div
                    key="reputation"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-full max-w-sm flex flex-col gap-4"
                  >
                    <div className="bg-white rounded-xl border border-[#D9CFC5]/50 p-5 shadow-sm text-center">
                      <div className="flex justify-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} size={24} className="text-[#c3b2a2] fill-[#c3b2a2]" strokeWidth={1} />
                        ))}
                      </div>
                      <h4 className="font-[family-name:var(--font-dm-sans)] font-bold text-[#2A1F1A] mb-2">
                        {MOCK_DATA['reputation'].title}
                      </h4>
                      <p className="text-[#8A7A6E] font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed mb-6 px-2">
                        {MOCK_DATA['reputation'].body}
                      </p>
                      <button className="w-full rounded-full border border-[#c3b2a2] text-[#2A1F1A] py-3.5 flex items-center justify-center gap-2 font-[family-name:var(--font-dm-sans)] font-medium transition-all duration-300 hover:bg-[#EDE4DA]">
                        Preview Request <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'incident' && (
                  <motion.div
                    key="incident"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-full max-w-sm flex flex-col gap-4"
                  >
                    <div className="bg-white rounded-xl border border-[#D9CFC5]/50 p-5 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-[family-name:var(--font-dm-sans)] font-bold text-[#2A1F1A]">
                            {MOCK_DATA['incident'].title}
                          </h4>
                          <p className="text-xs text-[#8A7A6E] font-[family-name:var(--font-dm-sans)] mt-1">
                            {MOCK_DATA['incident'].date}
                          </p>
                        </div>
                        <span className="rounded-full px-3 py-1 text-[10px] tracking-widest uppercase bg-[#EDE4DA] text-[#8A7A6E] border border-[#D9CFC5]">
                          Draft
                        </span>
                      </div>
                      <div className="p-4 bg-[#F5EFE8] rounded-lg border border-[#D9CFC5]/30 mb-6">
                        <p className="text-[#483C35] font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed">
                          {MOCK_DATA['incident'].body}
                        </p>
                      </div>
                      <button className="w-full rounded-full bg-[#2A1F1A] text-[#F5EFE8] py-3.5 flex items-center justify-center font-[family-name:var(--font-dm-sans)] font-medium tracking-wide transition-all duration-300 hover:scale-[1.02]">
                        File Report
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-full max-w-sm flex flex-col gap-3"
                  >
                    {MOCK_DATA['analytics'].stats.map((stat, i) => (
                      <div key={i} className="bg-white rounded-xl border border-[#D9CFC5]/50 p-4 shadow-sm flex items-center justify-between transition-shadow duration-300 hover:shadow-md">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#EDE4DA] flex items-center justify-center text-[#8A7A6E]">
                            <TrendingUp size={16} />
                          </div>
                          <div>
                            <p className="text-xs text-[#8A7A6E] uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-[family-name:var(--font-cormorant)] font-light text-[#2A1F1A] mt-1">
                              {stat.value}
                            </p>
                          </div>
                        </div>
                        <div className="text-[#c3b2a2] font-[family-name:var(--font-dm-sans)] text-xs font-bold bg-[#FDFAF7] px-3 py-1.5 rounded-full border border-[#D9CFC5]/50">
                          {stat.trend}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
// FeatureShowcase — Alia Company
