'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  CheckCircle2,
  Clock,
  Cpu,
  DollarSign,
  Layers,
  Lock,
  MapPin,
  Navigation,
  Radio,
  Shield,
  Sparkles,
  Store,
  Thermometer,
  TrendingDown,
  Volume2,
  Wind,
  Zap,
} from 'lucide-react';

type TechTab = 'aircraft' | 'avionics' | 'ports' | 'software';

export default function HomePage() {
  const [techTab, setTechTab] = useState<TechTab>('aircraft');

  return (
    <div className="bg-obsidian-950">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-grid-tactical bg-[size:36px_36px]">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-obsidian-950/85 to-obsidian-950 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                OPEN SUBURBAN AERIAL LOGISTICS NETWORK · $150B+ TAM
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.08]">
                Retail &amp; Restaurant{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-400">
                  Drone Network.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Replacing <strong className="text-white">$8–15 gig delivery drivers</strong> with autonomous hybrid-VTOL
                sorties at <strong className="text-emerald-400">$1–3 per delivery at scale</strong> and{' '}
                <strong className="text-cyan-300">30+ deliveries per drone-day</strong> — unlocking a{' '}
                <strong className="text-white">3–5× cost reduction</strong>, 5–15 minute deterministic ETAs, and{' '}
                <strong className="text-emerald-400">0% marketplace commissions</strong> for merchants.
              </p>

              {/* Top KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-obsidian-900/90 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Target Unit Cost</div>
                  <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-0.5">$1–$3</div>
                  <div className="text-[11px] text-slate-400">vs $8–15 Gig Driver</div>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-900/90 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Utilization</div>
                  <div className="text-2xl font-bold text-cyan-300 tabular-nums mt-0.5">30+ / Day</div>
                  <div className="text-[11px] text-slate-400">32 Peak Sorties/Drone</div>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-900/90 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Cost Reduction</div>
                  <div className="text-2xl font-bold text-white tabular-nums mt-0.5">3–5×</div>
                  <div className="text-[11px] text-slate-400">62% Contrib. Margin</div>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-900/90 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Deterministic ETA</div>
                  <div className="text-2xl font-bold text-amber-300 tabular-nums mt-0.5">5–15 min</div>
                  <div className="text-[11px] text-slate-400">0% Take-Rate Fee</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/fleet-os"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 hover:brightness-110 transition shadow-lg shadow-cyan-500/15"
                >
                  Launch Live Fleet OS
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/economics"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-obsidian-900 border border-slate-700 hover:border-cyan-400/50 text-white transition"
                >
                  Model Unit Economics
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition"
                >
                  Explore Exact Mind Map &amp; Yr 1–5 Roadmap →
                </Link>
              </div>
            </div>

            {/* Right Visual Aircraft Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-obsidian-900 shadow-2xl shadow-cyan-950/40">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/skynest-vtol-hero.png"
                    alt="SkyNest SN-V1 Autonomous Hybrid VTOL Delivery Drone"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/30" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-obsidian-950/85 backdrop-blur border border-cyan-400/40 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    SN-V1 HYBRID VTOL · CORRIDOR ACTIVE
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
                    <div className="px-2.5 py-1.5 rounded-lg bg-obsidian-950/85 backdrop-blur border border-slate-800 text-[11px] font-mono">
                      <span className="text-slate-400 block">PAYLOAD</span>
                      <span className="text-white font-semibold">2–5 kg Climate</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-lg bg-obsidian-950/85 backdrop-blur border border-slate-800 text-[11px] font-mono">
                      <span className="text-slate-400 block">ACOUSTIC</span>
                      <span className="text-emerald-400 font-semibold">&lt;55 dB @ 50m</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-lg bg-obsidian-950/85 backdrop-blur border border-slate-800 text-[11px] font-mono">
                      <span className="text-slate-400 block">TURNAROUND</span>
                      <span className="text-cyan-300 font-semibold">90s Auto-Swap</span>
                    </div>
                  </div>
                </div>

                {/* Live Interactive Module Quick-Bar */}
                <div className="p-4 bg-obsidian-900 border-t border-slate-800 grid grid-cols-2 gap-2.5 text-xs">
                  <Link
                    href="/merchant"
                    className="p-2.5 rounded-lg bg-obsidian-850 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition"
                  >
                    <span className="font-medium text-slate-200">POS API Sandbox</span>
                    <span className="font-mono text-cyan-400">Toast/Olo →</span>
                  </Link>
                  <Link
                    href="/customer"
                    className="p-2.5 rounded-lg bg-obsidian-850 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition"
                  >
                    <span className="font-medium text-slate-200">Customer Drop UI</span>
                    <span className="font-mono text-emerald-400">Live POD →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: VALUE PROPOSITION (MINDMAP 1.1, 1.2, 1.3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              Mind Map Pillar 01 · Value Proposition
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Structural Cost, Speed &amp; Margin Transformation
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Gig delivery networks are structurally trapped by human labor costs, urban/suburban traffic congestion, and
            predatory 20–30% merchant commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1.1 Cost Disruption */}
          <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-emerald-400 mb-1">1.1 COST DISRUPTION</div>
              <h3 className="text-lg font-bold text-white mb-3">3–5× Delivery Cost Reduction</h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800/70">
                  <span className="text-slate-400">Current Gig Driver Cost</span>
                  <span className="font-mono text-rose-400 font-semibold">$8–$15 / del</span>
                </li>
                <li className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800/70">
                  <span className="text-slate-400">SkyNest Target (At Scale)</span>
                  <span className="font-mono text-emerald-400 font-semibold">$1–$3 / del</span>
                </li>
                <li className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800/70">
                  <span className="text-slate-400">Pure Fleet Daily Variable</span>
                  <span className="font-mono text-cyan-300">$0.23 / del ($7/day)</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="text-slate-400">Asset Throughput</span>
                  <span className="font-mono text-white font-semibold">30+ Del / Drone-Day</span>
                </li>
              </ul>
            </div>
            <Link
              href="/economics"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300"
            >
              Open Interactive Unit Economics Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 1.2 Speed & Reliability */}
          <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-cyan-400 mb-1">1.2 SPEED &amp; RELIABILITY</div>
              <h3 className="text-lg font-bold text-white mb-3">5–15 Min Deterministic Radius</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">5–15 min aerial ETA</strong> across a 5-mile suburban radius vs
                    30–60 min congested ground delivery.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Deterministic Routing:</strong> Zero traffic lights, parking hunt,
                    or apartment gate delays.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Order Integrity:</strong> Tamper-sealed, climate-controlled payload
                    bays (65°C hot / 2–4°C chilled).
                  </span>
                </li>
              </ul>
            </div>
            <Link
              href="/customer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300"
            >
              Try Customer Live Tracking &amp; Landing UI <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 1.3 Merchant Benefits */}
          <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Store className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-amber-400 mb-1">1.3 MERCHANT BENEFITS</div>
              <h3 className="text-lg font-bold text-white mb-3">0% Commission &amp; Direct Brand Data</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Zero Commission Fees:</strong> Eliminate 20–30% DoorDash/UberEats
                    take-rates; pay flat $3–5/delivery.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Brand Ownership:</strong> Merchants keep 100% of direct customer
                    relationships, loyalty, and basket data.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Inventory Sync:</strong> Real-time Toast, Square &amp; Olo POS
                    integration prevents stock-out dispatches.
                  </span>
                </li>
              </ul>
            </div>
            <Link
              href="/merchant"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300"
            >
              Test Live POS API &amp; Zero-Commission ROI <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: TECHNOLOGY STACK & INFRASTRUCTURE (MINDMAP 2.1 - 2.4 & 6.1 - 6.3) */}
      <section id="tech-stack" className="border-y border-slate-800/80 bg-obsidian-900/60 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
                Mind Map Pillar 02 &amp; 06 · Full-Stack Hardware, Avionics &amp; Ground Ops
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Engineered for 32 Peak Sorties/Day &amp; &gt;99.5% Dispatch Reliability
              </h2>
            </div>

            {/* Interactive Subsystem Switcher */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'aircraft', label: '2.1 Aircraft Platform' },
                { id: 'avionics', label: '2.2 Autonomy & Avionics' },
                { id: 'ports', label: '2.3 Rooftop Drone Ports' },
                { id: 'software', label: '2.4 Software & UTM' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTechTab(t.id as TechTab)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono transition ${
                    techTab === t.id
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'bg-obsidian-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Dynamic Spec Detail */}
            <div className="lg:col-span-7 rounded-2xl bg-obsidian-950 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
              {techTab === 'aircraft' && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Navigation className="w-4 h-4" />
                    2.1 SN-V1 VTOL FIXED-WING HYBRID AIRFRAME
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Fixed-Wing Cruise Efficiency + Precision Vertical Rooftop Landing
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Purpose-built for suburban 5-mile corridors, combining aerodynamic wing-borne cruise efficiency
                    with shrouded low-acoustic electric ducted fans and full multi-rotor motor-out fault tolerance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">AIRFRAME ARCHITECTURE</div>
                      <div className="text-base font-semibold text-white mt-1">VTOL Fixed-Wing Hybrid</div>
                      <div className="text-xs text-slate-400 mt-1">Extended 15-mile ferry range + cm-level hover</div>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">CLIMATE PAYLOAD BAY</div>
                      <div className="text-base font-semibold text-emerald-400 mt-1">2.0 – 5.0 kg Capacity</div>
                      <div className="text-xs text-slate-400 mt-1">Standard family meal or suburban grocery bag</div>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">ACOUSTIC PROPULSION</div>
                      <div className="text-base font-semibold text-cyan-300 mt-1">Electric Ducted Fans (&lt;55 dB)</div>
                      <div className="text-xs text-slate-400 mt-1">Measured &lt;55 dB @ 50m — blends into suburbia</div>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">FAULT REDUNDANCY</div>
                      <div className="text-base font-semibold text-amber-300 mt-1">Hexa / Octo Motor-Out Safe</div>
                      <div className="text-xs text-slate-400 mt-1">Controlled landing + ballistic parachute backup</div>
                    </div>
                  </div>
                </div>
              )}

              {techTab === 'avionics' && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Cpu className="w-4 h-4" />
                    2.2 AUTONOMY, DETECT-AND-AVOID (DAA) &amp; ALL-WEATHER AVIONICS
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Multi-Sensor BVLOS Safety &amp; Centimeter-Accurate Fiducial Touchdown
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Designed for FAA Part 135 BVLOS and One-to-Many (1:10–1:15) Remote Pilot supervision with
                    hardware-enforced residential privacy guarantees.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <Radio className="w-5 h-5 text-cyan-400 mb-2" />
                      <div className="font-semibold text-white text-sm">Detect-and-Avoid (DAA)</div>
                      <p className="text-xs text-slate-400 mt-1">
                        4D mmWave Radar + Stereo Optical + ADS-B In sensor fusion for cooperative &amp; non-cooperative
                        deconfliction.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <MapPin className="w-5 h-5 text-emerald-400 mb-2" />
                      <div className="font-semibold text-white text-sm">Precision RTK + Fiducials</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Dual-band RTK-GPS (&lt;2cm) + optical AprilTag fiducials on merchant rooftops &amp; residential
                        drop pads.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <Wind className="w-5 h-5 text-amber-400 mb-2" />
                      <div className="font-semibold text-white text-sm">IP54+ Weather Hardened</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Sustained 15 m/s (33 mph) wind tolerance, rain-sealed avionics, and active thermal battery
                        conditioning.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {techTab === 'ports' && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400">
                    <BatteryCharging className="w-4 h-4" />
                    2.3 GROUND INFRASTRUCTURE · DRONE PORTS &amp; VERTIPORTS
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    90-Second Automated Rooftop Turnaround &amp; Hub-and-Spoke Staging
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Merchants host compact rooftop or parking-lot Drone Ports under our zero-upfront &ldquo;Drone Port
                    as a Service&rdquo; model while Central Vertiports handle staging and 500-hour heavy maintenance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <Zap className="w-5 h-5 text-amber-400 mb-2" />
                      <div className="font-semibold text-white text-sm">90-Sec Rooftop Swap</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Robotic battery swap + automated parcel bay load/unload enables 4 sorties/hr/drone.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <BatteryCharging className="w-5 h-5 text-emerald-400 mb-2" />
                      <div className="font-semibold text-white text-sm">20-Min 3-Phase Charge</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Distributed 3-phase fast-charging magazines keep fresh packs continuously buffered.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
                      <Building2 className="w-5 h-5 text-cyan-400 mb-2" />
                      <div className="font-semibold text-white text-sm">Central Vertiports</div>
                      <p className="text-xs text-slate-400 mt-1">
                        Daily swappable-module line checks, 500hr/6mo heavy maintenance, and 1:10 Remote Pilot Ops.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {techTab === 'software' && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Layers className="w-4 h-4" />
                    2.4 SOFTWARE SUITE &amp; FAA USS UTM CONNECTIVITY
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    End-to-End Autonomous Dispatch from POS Ticket to Photo-on-Delivery
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Every software component specified in the Mind Map is live and interactive inside this platform:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <Link
                      href="/fleet-os"
                      className="p-4 rounded-xl bg-obsidian-900 border border-slate-800 hover:border-cyan-400/50 transition"
                    >
                      <div className="font-mono text-cyan-400 mb-1">FLEET OS + UTM USS</div>
                      <div className="font-semibold text-white text-sm">Mission Planning &amp; Deconfliction</div>
                      <p className="text-slate-400 mt-1">
                        FAA UAS Service Supplier compliance, geofenced corridors, health telemetry &amp; 1:10 RPIC.
                      </p>
                    </Link>
                    <Link
                      href="/merchant"
                      className="p-4 rounded-xl bg-obsidian-900 border border-slate-800 hover:border-emerald-400/50 transition"
                    >
                      <div className="font-mono text-emerald-400 mb-1">OPEN MERCHANT API</div>
                      <div className="font-semibold text-white text-sm">Toast, Square, Olo &amp; Custom POS</div>
                      <p className="text-slate-400 mt-1">
                        Real-time menu &amp; stock-out sync, instant rooftop port dispatch, 0% commission billing.
                      </p>
                    </Link>
                    <Link
                      href="/customer"
                      className="p-4 rounded-xl bg-obsidian-900 border border-slate-800 hover:border-amber-400/50 transition sm:col-span-2"
                    >
                      <div className="font-mono text-amber-400 mb-1">CUSTOMER EXPERIENCE</div>
                      <div className="font-semibold text-white text-sm">
                        Live Tracking, &ldquo;Prepare Landing Zone&rdquo; Calibration &amp; POD Verification
                      </div>
                      <p className="text-slate-400 mt-1">
                        Supports Curbside Pads, Driveway Fiducials, Apartment Smart Lockers, and Drone Mailboxes.
                      </p>
                    </Link>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                <span>PEAK SORTIE RATE: 4 FLIGHTS/HR × 8 HRS = 32 SORTIES</span>
                <span className="text-emerald-400">TARGET DISPATCH RELIABILITY: &gt; 99.5%</span>
              </div>
            </div>

            {/* Right Rooftop Port Visual & Network Topology Card */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-obsidian-950">
                <div className="relative aspect-[16/10]">
                  <img
                    src="/images/rooftop-drone-port.png"
                    alt="SkyNest Automated Merchant Rooftop Drone Port"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded bg-obsidian-950/90 border border-slate-700 text-cyan-300">
                      MERCHANT ROOFTOP DRONE PORT
                    </span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                      $0 FREE INSTALL (REV SHARE)
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-xs font-mono text-slate-400">6.1 HUB-AND-SPOKE NETWORK TOPOLOGY</div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-white font-medium">1. Central Vertiport Hub</span>
                      <span className="font-mono text-cyan-300">Maint · Fleet Staging · 1:10 Ops</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-white font-medium">2. Merchant Rooftop Nodes</span>
                      <span className="font-mono text-emerald-300">90s Auto-Swap · Parcel Load</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-white font-medium">3. Precision Drop Zones</span>
                      <span className="font-mono text-amber-300">Driveway · Curb · Locker · Mailbox</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 & 7: MARKET STRATEGY, FLYWHEEL & COMPETITIVE LANDSCAPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        {/* Market Strategy & TAM/SAM/SOM */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            Mind Map Pillar 04 · Market Strategy &amp; Beachhead Expansion
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
            Suburban Corridor Beachhead (8k–15k pop/sq mi) → $150B+ Market Capture
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 3 Verticals */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
                <div className="text-xs font-mono text-cyan-400 mb-2">VERTICAL 01</div>
                <h3 className="font-bold text-white text-base mb-2">QSR Chains</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High daily order volume, standardized 1.5–3.5 kg packaging, and abundant standalone suburban rooftop
                  &amp; parking-lot access.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
                <div className="text-xs font-mono text-emerald-400 mb-2">VERTICAL 02</div>
                <h3 className="font-bold text-white text-base mb-2">Grocery &amp; Pharmacy</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High repeat frequency, urgent fill-in baskets up to 5 kg, cold-chain integrity, and high willingness
                  to bypass gig markups.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
                <div className="text-xs font-mono text-amber-400 mb-2">VERTICAL 03</div>
                <h3 className="font-bold text-white text-base mb-2">Medical Logistics</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  STAT lab specimens, urgent biologics, and prescriptions — high-margin premium pricing anchor across
                  suburban clinic spokes.
                </p>
              </div>

              {/* Expansion Flywheel */}
              <div className="sm:col-span-3 p-5 rounded-2xl bg-gradient-to-r from-obsidian-900 via-cyan-950/25 to-obsidian-900 border border-cyan-500/30">
                <div className="text-xs font-mono text-cyan-300 mb-2">
                  4.2 GO-TO-MARKET FLYWHEEL · &ldquo;DRONE PORT AS A SERVICE&rdquo; (FREE INSTALL + REV SHARE)
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                  <span className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-slate-800">
                    Merchant Density
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                  <span className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-slate-800">Route Density</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                  <span className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-slate-800">
                    Lower Unit Cost ($1.50)
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-slate-800">
                    Lower Fee ($3–5)
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                    More Merchants
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Accelerated by strategic channel partnerships with <strong className="text-slate-200">Toast &amp; Olo</strong>{' '}
                  (POS distribution), <strong className="text-slate-200">Suburban Retail REITs</strong> (blanket rooftop
                  rights), and <strong className="text-slate-200">Aviation Insurers</strong>.
                </p>
              </div>
            </div>

            {/* TAM / SAM / SOM Funnel */}
            <div className="lg:col-span-5 rounded-2xl bg-obsidian-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase">4.3 Market Sizing (TAM / SAM / SOM)</div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-mono text-slate-400">TAM · US Food &amp; Parcel Last Mile</span>
                    <span className="text-2xl font-bold text-white tabular-nums">$150B+</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-obsidian-950 border border-cyan-500/30">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-mono text-cyan-300">
                      SAM · Suburban Restaurant + Grocery (&lt;5mi)
                    </span>
                    <span className="text-2xl font-bold text-cyan-300 tabular-nums">$45B</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-mono text-emerald-300">SOM · Year 5 Network Target</span>
                    <span className="text-2xl font-bold text-emerald-400 tabular-nums">$500M ARR</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    20+ Suburban Metros · 500–1,000+ Drones · 15,000–30,000+ Deliveries/Day
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                Asset Payback Period: <strong className="text-white">&lt; 6 Months per Drone</strong> at 62%
                Contribution Margin.
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Matrix (Mind Map 7.1 & 7.2) */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Mind Map Pillar 07 · Competitive Differentiation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
            Open, POS-Agnostic &amp; Asset-Lighter vs. Closed Silos &amp; Gig Apps
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-obsidian-900">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-obsidian-950 text-[11px] font-mono uppercase text-slate-400">
                  <th className="py-3.5 px-4">Platform / Network</th>
                  <th className="py-3.5 px-4">Delivery Cost</th>
                  <th className="py-3.5 px-4">Merchant Openness</th>
                  <th className="py-3.5 px-4">Real-Estate Model</th>
                  <th className="py-3.5 px-4">Primary Airspace Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr className="bg-cyan-500/5">
                  <td className="py-4 px-4 font-bold text-white">
                    SkyNest Robotics{' '}
                    <span className="ml-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      OPEN NETWORK
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-emerald-400 font-semibold">$1–$3 cost ($3–5 fee)</td>
                  <td className="py-4 px-4 text-slate-200">Open POS-Agnostic (Toast, Square, Olo) · 0% Commission</td>
                  <td className="py-4 px-4 text-slate-200">Asset-Light(er): Merchant hosts Rooftop Port</td>
                  <td className="py-4 px-4 text-cyan-300">Suburban Sweet Spot (8k–15k pop/sq mi)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-300">DoorDash / UberEats</td>
                  <td className="py-4 px-4 font-mono text-rose-400">$8–$15 / delivery</td>
                  <td className="py-4 px-4 text-slate-400">20–30% marketplace take-rate; owns customer data</td>
                  <td className="py-4 px-4 text-slate-400">Human gig drivers; chronic driver shortages</td>
                  <td className="py-4 px-4 text-slate-400">Congested ground roads (30–60 min ETA)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-300">Wing (Alphabet) / Zipline</td>
                  <td className="py-4 px-4 font-mono text-slate-300">Proprietary / Subsidized</td>
                  <td className="py-4 px-4 text-slate-400">Locked enterprise ecosystems / heavy medical focus</td>
                  <td className="py-4 px-4 text-slate-400">Bespoke dedicated nest / dock installations</td>
                  <td className="py-4 px-4 text-slate-400">Enterprise anchor pads &amp; medical hubs</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-300">Amazon Prime Air</td>
                  <td className="py-4 px-4 font-mono text-slate-300">High CapEx internal</td>
                  <td className="py-4 px-4 text-slate-400">100% closed to independent restaurants &amp; grocers</td>
                  <td className="py-4 px-4 text-slate-400">Massive centralized fulfillment centers</td>
                  <td className="py-4 px-4 text-slate-400">1P warehouse-to-yard parcel only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Community, Safety & Regulatory Trust Strip (Mind Map 5.1 - 5.3) */}
        <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono text-cyan-400 uppercase">
                Mind Map Pillar 05 · FAA Certification, Community Privacy &amp; Equity
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Built for Neighbor Trust &amp; FAA Part 135 Air Carrier Compliance
              </h3>
              <p className="text-sm text-slate-400">
                Staged certification from active Part 107 waivers → Part 135 BVLOS Air Carrier → Custom Type
                Certification, backed by non-negotiable community commitments.
              </p>
            </div>
            <Link
              href="/roadmap#regulatory"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 hover:border-cyan-400/50 text-xs font-mono text-cyan-300 transition"
            >
              Inspect FAA &amp; Roadmap Dossier <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
              <Volume2 className="w-4 h-4 text-emerald-400 mb-2" />
              <div className="font-semibold text-white text-sm">Whisper-Quiet &lt;55 dB</div>
              <p className="text-xs text-slate-400 mt-1">
                Shrouded ducted fans + dynamic altitude corridor routing prevent residential noise fatigue.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
              <Lock className="w-4 h-4 text-cyan-400 mb-2" />
              <div className="font-semibold text-white text-sm">Zero Property Recording</div>
              <p className="text-xs text-slate-400 mt-1">
                No downward video recording over homes; optical sensors lock strictly onto encrypted AprilTag fiducials.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
              <Shield className="w-4 h-4 text-amber-400 mb-2" />
              <div className="font-semibold text-white text-sm">OOP &amp; Parachute Safety</div>
              <p className="text-xs text-slate-400 mt-1">
                Kinetic energy compliance, ASTM ballistic parachute recovery, and shielded BVLOS DAA corridors.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
              <Thermometer className="w-4 h-4 text-emerald-400 mb-2" />
              <div className="font-semibold text-white text-sm">Food Desert Equity</div>
              <p className="text-xs text-slate-400 mt-1">
                Dedicated subsidized grocery &amp; Rx aerial corridors serving underserved low-income neighborhoods.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
