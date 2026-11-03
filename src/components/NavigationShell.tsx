'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Calculator,
  Compass,
  Menu,
  Network,
  Radio,
  ShieldCheck,
  Smartphone,
  Store,
  Volume2,
  X,
  Zap,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Company Hub', icon: Compass },
  { href: '/fleet-os', label: 'Fleet OS & UTM', icon: Radio },
  { href: '/merchant', label: 'Merchant & POS API', icon: Store },
  { href: '/customer', label: 'Customer App', icon: Smartphone },
  { href: '/economics', label: 'Unit Economics', icon: Calculator },
  { href: '/roadmap', label: 'Mind Map & Roadmap', icon: Network },
];

export default function NavigationShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Aerospace Telemetry Ticker */}
      <div className="bg-obsidian-900 border-b border-slate-800/80 text-[11px] font-mono tracking-wide text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              FAA USS UTM: CONNECTED
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              CERT: PART 107 WAIVERS · PART 135 FILED
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              NOISE: 51.4 dB @ 50m (&lt;55dB SPEC)
            </span>
          </div>

          <div className="flex items-center gap-4 tabular-nums">
            <span className="hidden lg:inline-flex items-center gap-1 text-amber-300">
              <Zap className="w-3.5 h-3.5" />
              TURNAROUND: 90s AUTO-SWAP
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-200">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              DISPATCH RELIABILITY: <strong className="text-emerald-400">99.7%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-obsidian-950/90 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400/20 via-emerald-400/15 to-slate-900 border border-cyan-400/40 flex items-center justify-center shadow-sm shadow-cyan-500/10 group-hover:border-cyan-300 transition">
              <svg
                viewBox="0 0 32 32"
                className="w-5 h-5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 16h24M16 6v20M7 9l6 7-6 7M25 9l-6 7 6 7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="16" r="3" className="fill-emerald-400 stroke-emerald-300" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">
                  SKYNEST<span className="text-cyan-400 font-mono text-xs ml-1.5">ROBOTICS</span>
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Retail &amp; Restaurant Drone Network
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/35 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/merchant"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:brightness-110 transition shadow-sm"
            >
              Deploy Free Drone Port
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg border border-slate-800 bg-obsidian-900 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Drawer */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-obsidian-900 px-4 py-3 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                    active
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Aerospace Footer */}
      <footer className="border-t border-slate-800/80 bg-obsidian-900/90 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-white tracking-tight mb-2">
                SKYNEST <span className="text-cyan-400 font-mono text-xs">ROBOTICS</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Open autonomous aerial last-mile network replacing $8–15 gig drivers with $1–3 drone deliveries at
                scale (30+ deliveries/drone-day) across suburban retail, QSR, grocery, and medical corridors.
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                3–5× Cost Reduction · $150B+ TAM
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3">Platform Suite</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/fleet-os" className="hover:text-cyan-300 transition">
                    Fleet OS, DAA &amp; 1:10 Pilot Console
                  </Link>
                </li>
                <li>
                  <Link href="/merchant" className="hover:text-cyan-300 transition">
                    Merchant Self-Serve &amp; POS Sandbox (Toast/Square/Olo)
                  </Link>
                </li>
                <li>
                  <Link href="/customer" className="hover:text-cyan-300 transition">
                    Customer Tracking, Landing Zone UI &amp; POD
                  </Link>
                </li>
                <li>
                  <Link href="/economics" className="hover:text-cyan-300 transition">
                    At-Scale Unit Economics &amp; Payback Model
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3">Mind Map Blueprint</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/roadmap" className="hover:text-cyan-300 transition">
                    Interactive 8-Pillar Mind Map Explorer
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap#milestones" className="hover:text-cyan-300 transition">
                    Year 1 → Year 5 Execution Milestones ($500M ARR)
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap#regulatory" className="hover:text-cyan-300 transition">
                    FAA Part 107 → Part 135 → Type Certification
                  </Link>
                </li>
                <li>
                  <a
                    href="/interactive-mindmap.html"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-300 transition"
                  >
                    Open Original Markmap Diagram ↗
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3">
                Safety, Privacy &amp; Equity
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>• Electric Ducted Fans &lt; 55 dB @ 50m</li>
                <li>• Zero Downward Property Video Recording</li>
                <li>• Hexa/Octo Motor-Out + Parachute Recovery</li>
                <li>• Dedicated Food Desert &amp; Equity Corridors</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
            <span>© 2026 SkyNest Robotics Inc. · Open Suburban Aerial Logistics Network</span>
            <span>TAM $150B+ · SAM $45B · Yr 5 SOM $500M ARR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
