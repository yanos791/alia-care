'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'

/* ───────────────────────────────────────────────
   Floating Label Input — 21st.dev style
   Spring-animated label that lifts on focus/fill
   ─────────────────────────────────────────────── */
function FloatingInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  autoComplete,
  children,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  children?: React.ReactNode
}) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isActive = isFocused || value.length > 0

  return (
    <div
      className="relative w-full group"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Animated floating label */}
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: isActive ? -22 : 0,
          scale: isActive ? 0.75 : 1,
          color: isFocused ? '#8A7A6E' : '#A89B90',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 origin-left text-sm font-[family-name:var(--font-dm-sans)] tracking-wide pointer-events-none select-none z-10"
      >
        {label}
      </motion.label>

      {/* Focus ring glow */}
      <motion.div
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1 : 0.98,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 rounded-2xl ring-2 ring-[#c3b2a2]/30 pointer-events-none"
      />

      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete={autoComplete}
        className="w-full h-14 px-4 pt-3 pb-1 bg-white/60 backdrop-blur-sm border border-[#D9CFC5]/60 rounded-2xl text-[#2A1F1A] text-[15px] font-[family-name:var(--font-dm-sans)] outline-none transition-colors duration-200 hover:border-[#c3b2a2]/50 focus:border-[#c3b2a2]/70 focus:bg-white/80"
      />

      {/* Slot for trailing icon (e.g. password toggle) */}
      {children && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          {children}
        </div>
      )}
    </div>
  )
}

/* ───────────────────────────────────────────────
   Login Page — Premium Auth Screen
   ─────────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate auth delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (email === 'owner@alia.com') {
      router.push('/dashboard/owner')
    } else {
      router.push('/dashboard/worker')
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#F5EFE8] flex items-center justify-center p-4 overflow-hidden">
      {/* Ambient background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#c3b2a2]/20 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#D9CFC5]/25 blur-[100px] pointer-events-none"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Spinning border beam — 21st.dev Magic Border */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-100%] w-[300%] h-[300%] top-[-100%] left-[-100%] opacity-40"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0 300deg, #c3b2a2 360deg)',
            }}
          />
        </div>

        {/* Card Content */}
        <div className="relative z-10 m-[1.5px] bg-white/70 backdrop-blur-xl border border-[#D9CFC5]/60 rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(42,31,26,0.06)]">
          {/* Logo + Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo.png"
                alt="Alia Logo"
                className="h-10 md:h-12 w-auto mx-auto object-contain"
              />
            </Link>
            <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-cormorant)] font-light tracking-tight text-[#2A1F1A] mb-2">
              Welcome back
            </h1>
            <p className="text-sm font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]">
              Sign in to your care management platform
            </p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-6 rounded-xl bg-red-50 border border-red-200/60 p-3 text-center"
              >
                <p className="text-sm text-red-600 font-[family-name:var(--font-dm-sans)]">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleLoginSubmit}
            className="space-y-5"
          >
            <FloatingInput
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <FloatingInput
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            >
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-[#8A7A6E] hover:text-[#2A1F1A] transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </FloatingInput>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href="#"
                className="text-xs font-[family-name:var(--font-dm-sans)] text-[#8A7A6E] hover:text-[#2A1F1A] transition-colors tracking-wide"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="relative w-full h-13 rounded-full bg-[#c3b2a2] text-[#F5EFE8] font-[family-name:var(--font-dm-sans)] font-medium tracking-wide hover:bg-[#b09080] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center gap-2 py-3.5"
            >
              {/* Button shimmer */}
              <motion.div
                animate={{ x: ['-100%', '250%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none"
              />

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in…</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 my-8"
          >
            <div className="flex-1 h-px bg-[#D9CFC5]/40" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]/60">
              or
            </span>
            <div className="flex-1 h-px bg-[#D9CFC5]/40" />
          </motion.div>

          {/* Sign Up CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-center text-sm font-[family-name:var(--font-dm-sans)] text-[#8A7A6E]"
          >
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-[#2A1F1A] font-medium hover:text-[#c3b2a2] transition-colors underline underline-offset-4 decoration-[#D9CFC5]"
            >
              Create one
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
