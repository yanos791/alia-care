import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#2A1F1A] py-8 md:py-12 border-t border-[#F5EFE8]/10 font-[family-name:var(--font-dm-sans)]">
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Block: Logo & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link href="#hero" className="flex items-center">
            {/* Blending Wrapper to remove the taupe box background */}
            <div className="relative inline-flex items-center justify-center">
              <img 
                src="/footer-logo.png" 
                alt="Alia Company Logo" 
                className="h-12 md:h-16 w-auto object-contain rounded-md"
              />
            </div>
          </Link>
          <span className="text-[#F5EFE8]/40 text-xs">
            © 2026 Alia Company. All rights reserved.
          </span>
        </div>

        {/* Center Block: Navigation Links */}
        <nav className="flex items-center gap-8 text-[#F5EFE8]/70 text-sm">
          <Link 
            href="#how-it-works" 
            className="hover:text-[#F5EFE8] transition-colors"
          >
            How It Works
          </Link>
          <Link 
            href="#features" 
            className="hover:text-[#F5EFE8] transition-colors"
          >
            Features
          </Link>
          <Link 
            href="#pricing" 
            className="hover:text-[#F5EFE8] transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Right Block: Action Button */}
        <div className="flex items-center">
          <Link 
            href="#contact"
            className="border border-[#F5EFE8]/20 rounded-full px-5 py-2 text-sm text-[#F5EFE8] hover:bg-[#F5EFE8]/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </footer>
  )
}
