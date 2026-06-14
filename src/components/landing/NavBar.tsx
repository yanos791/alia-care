'use client'

import React, { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

const NAV_LINKS = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
]

export default function NavBar() {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20)
    })

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault()
        const targetId = href.replace(/.*\#/, "")
        const elem = document.getElementById(targetId)
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" })
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-500 bg-[#c3b2a2] ${isScrolled ? 'shadow-[0_2px_20px_rgba(195,178,162,0.3)]' : ''
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 md:px-16 flex items-center justify-between h-20 md:h-24">
                <a
                    href="/"
                    className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                    aria-label="Alia Home"
                >
                    <img
                        src="/logo.png"
                        alt="Alia Company Logo"
                        className="h-14 md:h-16 object-contain"
                    />
                </a>

                <nav className="hidden md:flex items-center gap-10">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-base font-[family-name:var(--font-dm-sans)] font-medium text-[#F5EFE8] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm cursor-pointer"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center shrink-0 gap-6">
                    <a
                        href="/auth/login"
                        className="text-base font-[family-name:var(--font-dm-sans)] font-medium text-[#F5EFE8] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm cursor-pointer"
                    >
                        Log In
                    </a>
                    <a
                        href="#booking-section"
                        onClick={(e) => handleScroll(e, '#booking-section')}
                        className="rounded-full px-8 py-3.5 bg-[#F5EFE8] text-[#2A1F1A] font-[family-name:var(--font-dm-sans)] font-medium tracking-wide hover:bg-white transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
                    >
                        Book a Demo
                    </a>
                </div>

                <div className="md:hidden flex items-center shrink-0">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <button
                                className="p-2 -mr-2 text-[#F5EFE8] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
                                aria-label="Open navigation menu"
                            >
                                <Menu strokeWidth={1.5} size={28} />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-[#c3b2a2] border-none shadow-2xl p-8 flex flex-col w-full max-w-sm">
                            <SheetHeader className="sr-only">
                                <SheetTitle>Navigation Menu</SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-8 mt-16">
                                {NAV_LINKS.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="text-3xl font-[family-name:var(--font-cormorant)] font-light text-[#F5EFE8] hover:text-white transition-colors cursor-pointer"
                                        onClick={(e) => handleScroll(e, link.href)}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href="/auth/login"
                                    className="text-3xl font-[family-name:var(--font-cormorant)] font-light text-[#F5EFE8] hover:text-white transition-colors cursor-pointer"
                                >
                                    Log In
                                </a>
                            </div>

                            <div className="mt-auto mb-8">
                                <a
                                    href="#booking-section"
                                    onClick={(e) => handleScroll(e, '#booking-section')}
                                    className="flex items-center justify-center w-full rounded-full px-8 py-4 bg-[#F5EFE8] text-[#2A1F1A] font-[family-name:var(--font-dm-sans)] font-medium text-lg hover:bg-white transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A1F1A]/50 cursor-pointer"
                                >
                                    Book a Demo
                                </a>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.section>
    )
}

// NavBar — Alia Company