'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogOut, ChevronRight } from 'lucide-react'

/* ───────────────────────────────────────────────
   Dashboard Shell Layout
   Premium top-bar + animated content wrapper
   ─────────────────────────────────────────────── */

function getRoleBadge(pathname: string) {
  if (pathname.includes('/owner')) {
    return { label: 'Owner', color: 'bg-[#2A1F1A] text-[#F5EFE8]' }
  }
  return { label: 'Caregiver', color: 'bg-[#EDE4DA] text-[#483C35]' }
}

function getBreadcrumb(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  return segments.map((seg) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1),
    href: '/' + segments.slice(0, segments.indexOf(seg) + 1).join('/'),
  }))
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const role = getRoleBadge(pathname)
  const crumbs = getBreadcrumb(pathname)

  const handleSignOut = () => {
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-[#F5EFE8] flex flex-col">
      {/* ─── Top Header Bar ─── */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 w-full border-b border-[#D9CFC5]/40 bg-[#F5EFE8]/80 backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Left: Brand + Breadcrumb */}
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="flex items-center cursor-pointer shrink-0"
            >
              <img
                src="/logo.png"
                alt="Alia Logo"
                className="h-9 md:h-10 w-auto object-contain"
              />
            </Link>

            {/* Separator */}
            <div className="hidden md:block w-px h-6 bg-[#D9CFC5]/50" />

            {/* Breadcrumb */}
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
              {crumbs.map((crumb, i) => (
                <React.Fragment key={crumb.href}>
                  {i > 0 && (
                    <ChevronRight className="w-3 h-3 text-[#D9CFC5]" />
                  )}
                  <Link
                    href={crumb.href}
                    className={`tracking-wide transition-colors cursor-pointer ${
                      i === crumbs.length - 1
                        ? 'text-[#2A1F1A] font-medium'
                        : 'hover:text-[#2A1F1A]'
                    }`}
                  >
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Right: Role Badge + Sign Out */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Role Indicator Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className={`px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-dm-sans)] font-bold ${role.color} border border-[#D9CFC5]/30`}
            >
              {role.label}
            </motion.div>

            {/* Separator */}
            <div className="w-px h-5 bg-[#D9CFC5]/40" />

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wide font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] hover:text-[#2A1F1A] hover:bg-[#EDE4DA]/60 transition-all duration-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Main Content Area ─── */}
      <main className="flex-1 w-full">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-16 py-8 md:py-12"
        >
          {children}
        </motion.div>
      </main>

      {/* ─── Minimal Dashboard Footer ─── */}
      <footer className="w-full border-t border-[#D9CFC5]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex items-center justify-between">
          <span className="text-[11px] font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]/50 tracking-wide">
            © 2026 Alia Company
          </span>
          <Link
            href="/"
            className="cursor-pointer text-[11px] font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]/50 hover:text-[#8A7A6E] transition-colors tracking-wide"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}
