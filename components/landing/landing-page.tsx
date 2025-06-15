"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, Smartphone, BarChart3, Receipt, Users, Shield, Play, ArrowRight, CheckCircle, Zap, TrendingUp, Clock, Mail, Cpu, Layers3, Sparkles, Copy, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

// Extend Window interface for particles.js
declare global {
  interface Window {
    particlesJS: any;
  }
}

export function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Initialize particles and animations
    if (typeof window !== 'undefined') {
      // Load external scripts
      const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = src
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      const loadScripts = async () => {
        try {
          await loadScript('https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js')
          
          // Initialize particles after loading
          if (window.particlesJS) {
            window.particlesJS('particles-js', {
              particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#3b82f6' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: '#3b82f6',
                  opacity: 0.4,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 6,
                  direction: 'none',
                  random: false,
                  straight: false,
                  out_mode: 'out',
                  bounce: false
                }
              },
              interactivity: {
                detect_on: 'canvas',
                events: {
                  onhover: { enable: true, mode: 'repulse' },
                  onclick: { enable: true, mode: 'push' },
                  resize: true
                },
                modes: {
                  grab: { distance: 400, line_linked: { opacity: 1 } },
                  bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                  repulse: { distance: 200, duration: 0.4 },
                  push: { particles_nb: 4 },
                  remove: { particles_nb: 2 }
                }
              },
              retina_detect: true
            })
          }
        } catch (error) {
          console.log('External scripts failed to load:', error)
        }
      }

      loadScripts()

      // Smooth scroll animation observer
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, observerOptions)

      document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in').forEach(el => {
        observer.observe(el)
      })

      // Interactive hover effects for glass elements
      document.querySelectorAll('.glass-card').forEach(element => {
        const htmlElement = element as HTMLElement;
        element.addEventListener('mouseenter', () => {
          htmlElement.style.transform = 'translateY(-4px)'
          htmlElement.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.2)'
        })
        
        element.addEventListener('mouseleave', () => {
          htmlElement.style.transform = 'translateY(0)'
          htmlElement.style.boxShadow = 'none'
        })
      })

      // Countdown Timer
      const countdownDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
      const timerElement = document.getElementById('timer')

      const updateCountdown = () => {
        const now = new Date()
        const distance = countdownDate.getTime() - now.getTime()
        if (distance <= 0) {
          if (timerElement) timerElement.innerHTML = "Offer ended"
          return
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        if (timerElement) {
          timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`
        }
      }

      const countdownInterval = setInterval(updateCountdown, 1000)
      updateCountdown()

      // Cleanup function
      return () => {
        clearInterval(countdownInterval)
      }
    }
  }, [])

  useEffect(() => {
    // Add global styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slide-left {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slide-right {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slide-up {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes scale-in {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      
      .fade-in {
        animation: fade-in 0.8s ease-out forwards;
      }
      
      .slide-left {
        animation: slide-left 0.8s ease-out forwards;
      }
      
      .slide-right {
        animation: slide-right 0.8s ease-out forwards;
      }
      
      .slide-up {
        animation: slide-up 0.8s ease-out forwards;
      }
      
      .scale-in {
        animation: scale-in 0.8s ease-out forwards;
      }
      
      .delay-600 { animation-delay: 0.6s; }
      .delay-700 { animation-delay: 0.7s; }
      .delay-800 { animation-delay: 0.8s; }
      .delay-900 { animation-delay: 0.9s; }
      .delay-1000 { animation-delay: 1s; }
      
      .glass-card {
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        background: rgba(17, 24, 39, 0.5);
        border: 1px solid rgba(75, 85, 99, 0.3);
      }
      
      .glass-card:hover {
        background: rgba(17, 24, 39, 0.7);
        border-color: rgba(59, 130, 246, 0.5);
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      
      .font-mono {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
        {/* Particles Background */}
        <div id="particles-js" className="fixed inset-0 z-0"></div>
        
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
        </div>
      
      {/* Header */}
      <header className="relative z-50 border-b border-border/30 backdrop-blur-xl bg-background/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary via-accent to-primary rounded-lg sm:rounded-xl flex items-center justify-center relative">
                <BarChart3 className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-lg sm:rounded-xl blur opacity-50 animate-pulse"></div>
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                <span className="hidden sm:inline">Biashara Pro</span>
                <span className="sm:hidden">Biashara</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 text-sm lg:text-base">Features</a>
              <a href="#demo" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 text-sm lg:text-base">Demo</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 text-sm lg:text-base">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 text-sm lg:text-base">Contact</a>
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-300 text-sm px-3 py-2"
                onClick={() => {
                  // Handle sign in - could navigate to login page or open modal
                  console.log('Sign In clicked')
                  // Example: router.push('/auth/login')
                }}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/80 hover:via-accent/80 hover:to-primary/80 text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2"
                onClick={() => {
                  // Handle get started - could scroll to signup form or navigate to registration
                  console.log('Get Started clicked')
                  // Example: document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
              </Button>
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/30 z-40">
              <div className="px-4 py-6 space-y-4">
                <nav className="space-y-4">
                  <a 
                    href="#features" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-muted-foreground hover:text-foreground transition-all duration-300 text-base py-2"
                  >
                    Features
                  </a>
                  <a 
                    href="#demo" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-white transition-all duration-300 text-base py-2"
                  >
                    Demo
                  </a>
                  <a 
                    href="#pricing" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-white transition-all duration-300 text-base py-2"
                  >
                    Pricing
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-white transition-all duration-300 text-base py-2"
                  >
                    Contact
                  </a>
                </nav>
                <div className="pt-4 border-t border-border/50 space-y-3">
                   <Button 
                     variant="ghost" 
                     className="w-full text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-300 text-sm justify-start"
                     onClick={() => {
                       setIsMobileMenuOpen(false)
                       // Handle sign in - could navigate to login page or open modal
                       console.log('Mobile Sign In clicked')
                       // Example: router.push('/auth/login')
                     }}
                   >
                     Sign In
                   </Button>
                   <Button 
                     className="w-full bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/80 hover:via-accent/80 hover:to-primary/80 text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                     onClick={() => {
                       setIsMobileMenuOpen(false)
                       // Handle get started - could scroll to signup form or navigate to registration
                       console.log('Mobile Get Started clicked')
                       // Example: document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })
                     }}
                   >
                     Get Started
                     <ArrowRight className="w-4 h-4 ml-2" />
                   </Button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left fade-in order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Trusted by 10,000+ SMBs in Kenya</span>
                <span className="sm:hidden">10,000+ SMBs Trust Us</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Business Today
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Complete business management solution for <span className="text-blue-400 font-semibold">small and medium businesses</span>. 
                Streamline operations, boost sales, and grow faster with our <span className="text-purple-400 font-semibold">AI-powered platform</span>.
              </p>
              
              {/* Email Signup Form */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-3 sm:py-3 text-sm sm:text-base bg-background/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
                    />
                  </div>
                  <Button className="px-6 sm:px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/80 hover:via-accent/80 hover:to-primary/80 text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl whitespace-nowrap">
                    Get Started
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 text-center lg:text-left">
                  ✓ Free 30-day trial • ✓ No credit card required • ✓ Cancel anytime
                </p>
              </div>
              
              {/* Benefit Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-card/30 rounded-lg backdrop-blur-sm border border-border">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-card-foreground">M-Pesa Integration</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-card/30 rounded-lg backdrop-blur-sm border border-border">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-card-foreground">Real-time Analytics</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-card/30 rounded-lg backdrop-blur-sm border border-border">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-card-foreground">Cloud Backup</span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-border/50">
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 font-mono">10K+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent mb-1 font-mono">99.9%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 font-mono">24/7</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Interactive Demo */}
            <div className="relative scale-in delay-600 order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="relative">
                {/* Globe Container */}
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto relative" style={{animation: 'float 6s ease-in-out infinite'}}>
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full backdrop-blur-sm border border-gray-700 flex items-center justify-center">
                    <div className="w-[85%] h-[85%] bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full flex items-center justify-center relative overflow-hidden">
                      {/* Animated rings */}
                      <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping"></div>
                      <div className="absolute inset-4 border-2 border-purple-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                      <div className="absolute inset-8 border-2 border-cyan-400/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                      
                      {/* Center content */}
                      <div className="text-center z-10">
                        <BarChart3 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white mx-auto mb-2 sm:mb-4" />
                        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400 font-mono">SMB</div>
                        <div className="text-xs sm:text-sm text-gray-400">Management</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                </div>
                
                {/* Floating Glassmorphism Elements */}
                <div className="absolute -top-4 sm:-top-6 md:-top-8 -right-2 sm:-right-3 md:-right-4 glass-card rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 hover:scale-105 transition-all duration-300" style={{animation: 'float 4s ease-in-out infinite', animationDelay: '1s'}}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs sm:text-sm">Sales: +15%</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -left-4 sm:-left-6 md:-left-8 glass-card rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 hover:scale-105 transition-all duration-300" style={{animation: 'float 5s ease-in-out infinite'}}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    <span className="font-mono text-xs sm:text-sm">M-Pesa: Active</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -right-8 sm:-right-12 md:-right-16 glass-card rounded-lg sm:rounded-xl p-2 sm:p-3 hover:scale-105 transition-all duration-300" style={{animation: 'float 3s ease-in-out infinite', animationDelay: '2s'}}>
                  <div className="font-mono text-xs text-cyan-400">KSh 45,230</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Code Preview Section */}
          <section className="relative z-10 py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">
                  Code <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Preview</span>
                </h2>
                <p className="text-xl text-gray-300">See how our M-Pesa integration works</p>
              </div>
              
              <div className="glass-card rounded-2xl p-8 mb-20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400 text-sm font-mono">mpesa-integration.js</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Copy className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                  <pre className="text-left">
<span className="text-gray-500">// M-Pesa STK Push Integration</span>
<span className="text-blue-400">const</span> <span className="text-white">mpesaPayment</span> <span className="text-yellow-400">=</span> <span className="text-blue-400">async</span> <span className="text-white">(</span><span className="text-orange-400">amount</span><span className="text-white">, </span><span className="text-orange-400">phoneNumber</span><span className="text-white">) </span><span className="text-yellow-400">=&gt;</span> <span className="text-white">&#123;</span>
  <span className="text-blue-400">const</span> <span className="text-white">response</span> <span className="text-yellow-400">=</span> <span className="text-blue-400">await</span> <span className="text-green-400">fetch</span><span className="text-white">(</span><span className="text-red-400">'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'</span><span className="text-white">, &#123;</span>
    <span className="text-orange-400">method</span><span className="text-white">: </span><span className="text-red-400">'POST'</span><span className="text-white">,</span>
    <span className="text-orange-400">headers</span><span className="text-white">: &#123;</span>
      <span className="text-red-400">'Authorization'</span><span className="text-white">: </span><span className="text-red-400">`Bearer $&#123;token&#125;`</span><span className="text-white">,</span>
      <span className="text-red-400">'Content-Type'</span><span className="text-white">: </span><span className="text-red-400">'application/json'</span>
    <span className="text-white">&#125;</span><span className="text-white">,</span>
    <span className="text-orange-400">body</span><span className="text-white">: </span><span className="text-green-400">JSON</span><span className="text-white">.</span><span className="text-green-400">stringify</span><span className="text-white">(&#123;</span>
      <span className="text-orange-400">BusinessShortCode</span><span className="text-white">: </span><span className="text-purple-400">174379</span><span className="text-white">,</span>
      <span className="text-orange-400">Password</span><span className="text-white">: </span><span className="text-white">password,</span>
      <span className="text-orange-400">Timestamp</span><span className="text-white">: </span><span className="text-white">timestamp,</span>
      <span className="text-orange-400">TransactionType</span><span className="text-white">: </span><span className="text-red-400">'CustomerPayBillOnline'</span><span className="text-white">,</span>
      <span className="text-orange-400">Amount</span><span className="text-white">: </span><span className="text-white">amount,</span>
      <span className="text-orange-400">PartyA</span><span className="text-white">: </span><span className="text-white">phoneNumber,</span>
      <span className="text-orange-400">PartyB</span><span className="text-white">: </span><span className="text-purple-400">174379</span><span className="text-white">,</span>
      <span className="text-orange-400">PhoneNumber</span><span className="text-white">: </span><span className="text-white">phoneNumber,</span>
      <span className="text-orange-400">CallBackURL</span><span className="text-white">: </span><span className="text-red-400">'https://yourdomain.com/callback'</span><span className="text-white">,</span>
      <span className="text-orange-400">AccountReference</span><span className="text-white">: </span><span className="text-red-400">'BiasharaPro'</span><span className="text-white">,</span>
      <span className="text-orange-400">TransactionDesc</span><span className="text-white">: </span><span className="text-red-400">'Payment for services'</span>
    <span className="text-white">&#125;</span><span className="text-white">)</span>
  <span className="text-white">&#125;</span><span className="text-white">);</span>
  <span className="text-blue-400">return</span> <span className="text-white">response.</span><span className="text-green-400">json</span><span className="text-white">();</span>
<span className="text-white">&#125;</span><span className="text-white">;</span>
                  </pre>
                </div>
              </div>
            </div>
          </section>
          
          {/* Interactive Demo Cards */}
          <section id="demo" className="relative z-10 py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 fade-in delay-700">
                <h2 className="text-4xl font-medium tracking-tight mb-4">
                  Experience <span className="text-blue-400">Smart Business</span> Management
                </h2>
                <p className="text-gray-400 text-lg">
                  See how our platform transforms Kenyan businesses with real-time demos
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* M-Pesa Integration Card */}
                <div className="glass-card bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-300 group slide-left delay-800">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="font-mono text-sm">M-Pesa Integration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Copy className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
                      <div className="font-mono text-sm leading-relaxed">
                        <div className="text-purple-400">mpesa</div>
                        <div className="text-blue-400 ml-2">.payment</div>
                        <div className="text-white ml-4">(&#123;</div>
                        <div className="text-cyan-400 ml-6">amount: 2500,</div>
                        <div className="text-cyan-400 ml-6">phone: "0722123456",</div>
                        <div className="text-cyan-400 ml-6">reference: "INV001"</div>
                        <div className="text-white ml-4">&#125;)</div>
                        <div className="text-green-400 ml-2">.then(success)</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Smartphone className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Instant Payments</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Accept M-Pesa payments with real-time confirmation and automatic reconciliation
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Transaction Status</span>
                          <span className="text-xs text-green-400">✓ Confirmed</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400 mb-1">KSh 2,500</div>
                        <div className="text-xs text-gray-400">From: 0722***456 • 2 min ago</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sales Analytics Card */}
                <div className="glass-card bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group slide-up delay-900">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="font-mono text-sm">Analytics Engine</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Copy className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BarChart3 className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Advanced sales insights with AI-powered predictions and trend analysis
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-300">Weekly Performance</span>
                          <span className="text-sm text-blue-400 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +23.5%
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Revenue</span>
                            <span className="text-sm font-semibold text-white">KSh 156,780</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>Target: KSh 200K</span>
                            <span>78% achieved</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-green-400">342</div>
                          <div className="text-xs text-gray-400">Orders</div>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-purple-400">89%</div>
                          <div className="text-xs text-gray-400">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Inventory Management Card */}
                <div className="glass-card bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group slide-right delay-1000">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="font-mono text-sm">Smart Inventory</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Copy className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Store className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">AI-Powered Stock</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Predictive inventory management with automated reorder points and supplier integration
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-gray-800/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-sm font-medium text-white">Maize Flour 2kg</div>
                              <div className="text-xs text-gray-400">SKU: MF001</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-green-400">45 units</div>
                              <div className="text-xs text-green-400">✓ In Stock</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-sm font-medium text-white">Cooking Oil 1L</div>
                              <div className="text-xs text-gray-400">SKU: CO001</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-orange-400">8 units</div>
                              <div className="text-xs text-orange-400">⚠ Low Stock</div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-purple-300">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">AI Recommendation</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Reorder 50 units of Cooking Oil based on sales trend
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="relative z-10 py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Performance <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Metrics</span>
            </h2>
            <p className="text-xl text-gray-300">Real-time business analytics and processing power</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400 mb-2">2.4M+</div>
              <div className="text-sm text-gray-400 mb-4">Transactions/sec</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">85% Capacity</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">156K</div>
              <div className="text-sm text-gray-400 mb-4">Active Users</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">92% Online</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-sm text-gray-400 mb-4">Uptime</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{width: '99%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">Real-time</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400 mb-2">12ms</div>
              <div className="text-sm text-gray-400 mb-4">Response Time</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">Ultra-fast</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Countdown Timer Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Limited Time Offer
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Get early access to AutoBooks AI - Save hours weekly on bookkeeping!
            </p>
            <div className="countdown text-2xl font-bold text-red-400 mb-4" id="countdown-timer">
              Offer ends in: <span id="timer">Loading...</span>
            </div>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl">
              Get Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="glass-card rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Join the Waitlist
              </span>
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl">
                Join Now
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Loved by Kenyan SMBs
            </span>
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Join 100+ early access users saving time and money every week.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
              <div className="text-gray-400">Early Users</div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">10hrs</div>
              <div className="text-gray-400">Saved Weekly</div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* AutoBooks AI Features Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Why <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AutoBooks AI?</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6 flex items-center gap-4">
              <div className="text-2xl">⏱️</div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Real-time Cash Flow Tracking</h4>
                <p className="text-gray-400">Monitor your business finances in real-time</p>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 flex items-center gap-4">
              <div className="text-2xl">💼</div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Automated Invoice Generation</h4>
                <p className="text-gray-400">Create professional invoices automatically</p>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 flex items-center gap-4">
              <div className="text-2xl">📊</div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Tax Reports in 1 Click</h4>
                <p className="text-gray-400">Generate tax-ready reports instantly</p>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 flex items-center gap-4">
              <div className="text-2xl">📱</div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">WhatsApp & M-Pesa Integration</h4>
                <p className="text-gray-400">Seamless integration with popular platforms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Visuals Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              See It in Action
            </span>
          </h3>
          <div className="glass-card rounded-2xl p-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white mx-auto mb-4" />
                  <p className="text-gray-300">Product Dashboard Demo</p>
                  <p className="text-sm text-gray-400 mt-2">Click to watch interactive demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              What Our <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Users Say</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  G
                </div>
                <div>
                  <p className="text-gray-300 mb-4 italic">
                    "AutoBooks has saved me over 10 hours a week. It's like having a virtual accountant!"
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-white">Grace</div>
                    <div className="text-gray-400">Nairobi boutique owner</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div>
                  <p className="text-gray-300 mb-4 italic">
                    "Finally an affordable solution tailored for Kenyan businesses. I love the M-Pesa integration!"
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-white">Peter</div>
                    <div className="text-gray-400">Freelance Developer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-xl p-6 text-center border-2 border-green-500/50">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                Limited Time
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Early Access</h4>
              <div className="text-3xl font-bold text-green-400 mb-2">FREE</div>
              <p className="text-gray-400 mb-4">while in beta</p>
              <p className="text-sm text-gray-300 mb-6">Includes all features. Limited spots.</p>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 rounded-lg">
                Get Started
              </Button>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold text-white mb-2">Starter</h4>
              <div className="text-3xl font-bold text-blue-400 mb-2">KES 500</div>
              <p className="text-gray-400 mb-4">/month</p>
              <p className="text-sm text-gray-300 mb-6">Automated bookkeeping, invoices, and reports</p>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 py-2 rounded-lg">
                Coming Soon
              </Button>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold text-white mb-2">Pro</h4>
              <div className="text-3xl font-bold text-purple-400 mb-2">KES 1,200</div>
              <p className="text-gray-400 mb-4">/month</p>
              <p className="text-sm text-gray-300 mb-6">Everything in Starter + integrations & support</p>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 py-2 rounded-lg">
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h3>
          </div>
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Is this for Kenyan businesses only?
              </h4>
              <p className="text-gray-300">
                We're focused on Kenya first, but global rollout is coming. Our platform is specifically designed for Kenyan business needs and regulations.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                What does it cost?
              </h4>
              <p className="text-gray-300">
                Early access is completely free during our beta phase. Paid tiers will launch later with affordable pricing for Kenyan SMBs.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                How does M-Pesa integration work?
              </h4>
              <p className="text-gray-300">
                Our platform seamlessly integrates with Safaricom's M-Pesa API to automatically track payments, generate receipts, and update your books in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Everything You Need to <span className="text-green-400">Scale Your Business</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive tools designed specifically for Kenyan entrepreneurs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:scale-105 hover:-translate-y-2 transition-all duration-300 bg-gray-900/50 border-gray-700/50 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Store className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">Inventory Management</CardTitle>
              <CardDescription className="text-gray-400">Track stock levels, manage products, and get low-stock alerts with real-time updates</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:scale-105 hover:-translate-y-2 transition-all duration-300 bg-gray-900/50 border-gray-700/50 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">M-Pesa Integration</CardTitle>
              <CardDescription className="text-gray-400">Accept payments instantly with Safaricom M-Pesa integration and automatic receipts</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:scale-105 hover:-translate-y-2 transition-all duration-300 bg-gray-900/50 border-gray-700/50 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">Sales Analytics</CardTitle>
              <CardDescription className="text-gray-400">Track performance with detailed sales reports, insights, and growth predictions</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:scale-105 hover:-translate-y-2 transition-all duration-300 bg-gray-900/50 border-gray-700/50 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">Customer Management</CardTitle>
              <CardDescription className="text-gray-400">Build customer database, track purchase history, and manage relationships</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:scale-105 hover:-translate-y-2 transition-all duration-300 bg-gray-900/50 border-gray-700/50 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">Digital Receipts</CardTitle>
              <CardDescription className="text-gray-400">Generate professional invoices and receipts automatically for every transaction</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:scale-105 hover:-translate-y-2 transition-all duration-300 bg-gray-900/50 border-gray-700/50 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/20">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white group-hover:text-green-400 transition-colors duration-300">Secure & Reliable</CardTitle>
              <CardDescription className="text-gray-400">Bank-level security with reliable cloud infrastructure and 99.9% uptime</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600/20 to-emerald-600/20 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of Kenyan businesses already using Biashara Pro to grow their revenue and streamline operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button size="lg" className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Your Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 rounded-xl transition-all duration-300 hover:scale-105">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gray-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p>&copy; 2024 Biashara Pro. Made with ❤️ for Kenyan businesses.</p>
        </div>
      </footer>
      </div>
    </>
  )
}
