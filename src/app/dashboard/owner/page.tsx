'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, Variants } from 'framer-motion'
import { Users, Activity, Star, BellRing, ArrowUpRight, ArrowDownRight, Clock, MapPin, MoreHorizontal, MessageSquareHeart } from 'lucide-react'

// --- 21st.dev / motion.dev Animation Primitives ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

// Fluid Count-Up Utility
function CountUp({ 
  to, 
  duration = 1.2, 
  decimals = 0, 
  prefix = "", 
  suffix = "" 
}: { 
  to: number; 
  duration?: number; 
  decimals?: number; 
  prefix?: string; 
  suffix?: string 
}) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`
          }
        }
      })
      return controls.stop
    }
  }, [to, duration, decimals, prefix, suffix, inView])

  return <span ref={nodeRef}>{prefix}0{suffix}</span>
}

// --- MOCK DATA ---

const KPI_DATA = [
  { id: 'res', label: 'Total Active Residents', value: 184, trend: '+4.2%', isPositive: true, icon: Users },
  { id: 'staff', label: 'Staff Active on Shift', value: 42, trend: '-1.5%', isPositive: false, icon: Activity },
  { id: 'sat', label: 'Avg Family Satisfaction', value: 4.9, decimals: 1, suffix: '/5 ★', trend: '+0.1', isPositive: true, icon: Star },
  { id: 'disp', label: 'System Dispatches Today', value: 1056, trend: '+12.4%', isPositive: true, icon: BellRing },
]

const ROSTER_DATA = [
  { id: 1, name: 'Sarah Jenkins', role: 'RN - Charge Nurse', wing: 'North Wing (Memory Care)', status: 'Active', time: 'Started 6:00 AM' },
  { id: 2, name: 'David Chen', role: 'LPN', wing: 'East Wing', status: 'Active', time: 'Started 7:00 AM' },
  { id: 3, name: 'Maria Rodriguez', role: 'CNA', wing: 'West Wing', status: 'On Break', time: 'Break at 10:30 AM' },
  { id: 4, name: 'James Wilson', role: 'CNA', wing: 'North Wing (Memory Care)', status: 'Active', time: 'Started 6:00 AM' },
  { id: 5, name: 'Emily Thompson', role: 'Activities Director', wing: 'Main Commons', status: 'Active', time: 'Started 8:00 AM' },
]

const REVIEWS_DATA = [
  { id: 1, family: 'The Henderson Family', time: '2 hours ago', text: 'Mom looked so happy in the photos from music therapy today. Thank you for keeping us updated!', rating: 5 },
  { id: 2, family: 'Robert Chen', time: '4 hours ago', text: 'Appreciate the quick notification about dad\'s medication adjustment. Very professional.', rating: 5 },
  { id: 3, family: 'Alice Williams', time: 'Yesterday', text: 'The new sunroom activities are wonderful. She loves the extra light.', rating: 4 },
]

export default function OwnerDashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12"
    >
      {/* ─── Header ─── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-cormorant)] font-light tracking-tight text-[#2A1F1A]">
          Business Overview
        </h1>
        <p className="text-sm font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
          Real-time facility metrics, roster deployment, and reputation monitoring.
        </p>
      </motion.div>

      {/* ─── Grid Row (Top Analytics) ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {KPI_DATA.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div 
              key={kpi.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#D9CFC5]/60 p-5 md:p-6 shadow-[0_4px_20px_rgba(42,31,26,0.03)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
                  {kpi.label}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#EDE4DA] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#c3b2a2]" />
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="text-4xl md:text-5xl font-[family-name:var(--font-cormorant)] font-light text-[#2A1F1A]">
                  <CountUp to={kpi.value} decimals={kpi.decimals} suffix={kpi.suffix} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium font-[family-name:var(--font-dm-sans)] mb-1.5 ${kpi.isPositive ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {kpi.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.trend}
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* ─── Main Workspace Layout (Two Columns) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column: Roster Management Table */}
        <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[family-name:var(--font-cormorant)] text-[#2A1F1A]">Active Roster</h2>
            <button className="text-xs font-[family-name:var(--font-dm-sans)] text-[#c3b2a2] hover:text-[#2A1F1A] transition-colors cursor-pointer">
              View Full Schedule →
            </button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#D9CFC5]/60 overflow-hidden shadow-[0_4px_20px_rgba(42,31,26,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D9CFC5]/40 text-xs uppercase tracking-widest font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] bg-[#F5EFE8]/30">
                    <th className="px-6 py-4 font-medium">Staff Member</th>
                    <th className="px-6 py-4 font-medium">Assignment</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9CFC5]/30">
                  {ROSTER_DATA.map((staff) => (
                    <motion.tr 
                      key={staff.id}
                      whileHover={{ x: 4, backgroundColor: "rgba(237, 228, 218, 0.4)" }}
                      transition={{ duration: 0.2 }}
                      className="group cursor-pointer text-sm font-[family-name:var(--font-dm-sans)] bg-transparent"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#2A1F1A]">{staff.name}</span>
                          <span className="text-[#8A7A6E] text-xs mt-0.5">{staff.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[#483C35]">
                          <MapPin className="w-3.5 h-3.5 text-[#c3b2a2]" />
                          {staff.wing}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center w-fit px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${staff.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {staff.status}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-[#8A7A6E]">
                            <Clock className="w-3 h-3" />
                            {staff.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-full text-[#8A7A6E] hover:text-[#2A1F1A] hover:bg-[#D9CFC5]/30 transition-colors cursor-pointer">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Reputation Management Stream */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[family-name:var(--font-cormorant)] text-[#2A1F1A]">Family Feedback</h2>
            <button className="text-xs font-[family-name:var(--font-dm-sans)] text-[#c3b2a2] hover:text-[#2A1F1A] transition-colors cursor-pointer">
              View All →
            </button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#D9CFC5]/60 shadow-[0_4px_20px_rgba(42,31,26,0.03)] flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
              {REVIEWS_DATA.map((review, i) => (
                <div key={review.id} className={`${i !== REVIEWS_DATA.length - 1 ? 'pb-6 border-b border-[#D9CFC5]/40' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="font-[family-name:var(--font-dm-sans)] font-medium text-sm text-[#2A1F1A]">
                        {review.family}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#8A7A6E]">
                        {review.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} className={`w-3.5 h-3.5 ${index < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-[family-name:var(--font-dm-sans)] text-[#483C35] leading-relaxed mt-3">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <button className="mt-4 flex items-center gap-1.5 text-xs font-[family-name:var(--font-dm-sans)] font-medium text-[#c3b2a2] hover:text-[#2A1F1A] transition-colors cursor-pointer">
                    <MessageSquareHeart className="w-3.5 h-3.5" />
                    Reply to family
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#F5EFE8]/40 border-t border-[#D9CFC5]/40">
               <button className="w-full py-2.5 rounded-xl bg-white border border-[#D9CFC5] text-[#2A1F1A] text-sm font-[family-name:var(--font-dm-sans)] font-medium hover:bg-[#F5EFE8] transition-colors cursor-pointer shadow-sm">
                 Generate Monthly Report
               </button>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
