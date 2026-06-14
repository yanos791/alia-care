'use client'

import React, { createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SheetContextProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = createContext<SheetContextProps | undefined>(undefined)

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

export function SheetTrigger({
  asChild,
  children,
}: {
  asChild?: boolean
  children: React.ReactNode
}) {
  const context = useContext(SheetContext)
  if (!context) {
    throw new Error('SheetTrigger must be used within a Sheet')
  }

  const { onOpenChange } = context

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        if (child.props.onClick) {
          child.props.onClick(e)
        }
        onOpenChange(true)
      },
    })
  }

  return (
    <button onClick={() => onOpenChange(true)}>
      {children}
    </button>
  )
}

export function SheetContent({
  side = 'right',
  className = '',
  children,
}: {
  side?: 'left' | 'right' | 'top' | 'bottom'
  className?: string
  children: React.ReactNode
}) {
  const context = useContext(SheetContext)
  if (!context) {
    throw new Error('SheetContent must be used within a Sheet')
  }

  const { open, onOpenChange } = context

  const slideVariants = {
    hidden: { x: side === 'right' ? '100%' : '-100%', opacity: 0.9 },
    visible: { x: 0, opacity: 1 },
    exit: { x: side === 'right' ? '100%' : '-100%', opacity: 0.9 },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`fixed top-0 bottom-0 z-50 h-full w-full max-w-sm bg-[#c3b2a2] shadow-2xl p-6 ${
              side === 'right' ? 'right-0' : 'left-0'
            } ${className}`}
          >
            {/* Close Button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#F5EFE8] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function SheetHeader({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
}

export function SheetTitle({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
}
