'use client';

import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  DollarSign,
  Layers,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';

export default function UnitEconomicsPage() {
  // Interactive Sliders initialized to exact Mind Map 3.2 & 3.3 At-Scale Targets
  const [deliveriesPerDay, setDeliveriesPerDay] = useState<number>(30);
  const [pilotRatio, setPilotRatio] = useState<number>(10); // 1 : 10 ratio
  const [capexPerDrone, setCapexPerDrone] = useState<number>(16500); // $15k-$25k range
  const [revenuePerDelivery, setRevenuePerDelivery] = useState<number>(4.0); // $3-$5 merchant fee
  const [saasAdsPerDroneMonth, setSaasAdsPerDroneMonth] = useState<number>(550); // Subscription + Heatmap Ads share
  const [gigBenchmarkCost, setGigBenchmarkCost] = useState<number>(11.5); // $8-$15 gig driver
  const [portTurnaroundUtmPerDel, setPortTurnaroundUtmPerDel] = useState<number>(1.27); // Bridges $0.23 pure daily opex -> $1.50 loaded variable target
  const [fleetSize, setFleetSize] = useState<number>(500);

  // Mind Map 3.2 Daily Fleet OpEx Calculation
  const dailyEnergy = 0.5 * (deliveriesPerDay / 30);
  const dailyMaintenance = 2.0 * (deliveriesPerDay / 30);
  const dailyInsurance = 1.5;
  const dailyRemotePilot = 30.0 / pilotRatio; // At 1:10 ratio = $3.00/drone-day!
  const totalDailyFleetOpex = dailyEnergy + dailyMaintenance + dailyInsurance + dailyRemotePilot;
  const pureDailyOpexPerDelivery = totalDailyFleetOpex / deliveriesPerDay; // $7.00 / 30 = $0.233/del!

  // Mind Map 3.3 Loaded Variable Cost & Contribution Margin
  const loadedVariableCostPerDel = pureDailyOpexPerDelivery + portTurnaroundUtmPerDel; // $0.233 + $1.27 = $1.50/del!
  const contributionMarginPerDel = revenuePerDelivery - loadedVariableCostPerDel; // $4.00 - $1.50 = $2.50/del!
  const contributionMarginPct = (contributionMarginPerDel / revenuePerDelivery) * 100; // 62.5%

  // Monthly & Payback Math
  const monthlyDeliveryContribution = contributionMarginPerDel * deliveriesPerDay * 30.4;
  const totalMonthlyContributionPerDrone = monthlyDeliveryContribution + saasAdsPerDroneMonth;
  const paybackMonths =
    totalMonthlyContributionPerDrone > 0 ? capexPerDrone / totalMonthlyContributionPerDrone : 99;

  const costReductionMultiple = gigBenchmarkCost / Math.max(0.5, loadedVariableCostPerDel);

  // Fleet-Wide Annualized ARR
  const annualDeliveries = fleetSize * deliveriesPerDay * 365;
  const annualDeliveryRev = annualDeliveries * revenuePerDelivery;
  const annualSaasAdsRev = fleetSize * saasAdsPerDroneMonth * 12;
  const totalArrUsd = annualDeliveryRev + annualSaasAdsRev;

  function applyPreset(preset: 'seed' | 'target' | 'year5') {
    if (preset === 'seed') {
      setDeliveriesPerDay(10);
      setPilotRatio(2);
      setCapexPerDrone(24000);
      setRevenuePerDelivery(4.75);
      setPortTurnaroundUtmPerDel(2.45);
      setSaasAdsPerDroneMonth(250);
      setFleetSize(6);
    } else if (preset === 'target') {
      setDeliveriesPerDay(30);
      setPilotRatio(10);
      setCapexPerDrone(16500);
      setRevenuePerDelivery(4.0);
      setPortTurnaroundUtmPerDel(1.27);
      setSaasAdsPerDroneMonth(550);
      setFleetSize(500);
    } else {
      setDeliveriesPerDay(34);
      setPilotRatio(15);
      setCapexPerDrone(15000);
      setRevenuePerDelivery(3.85);
      setPortTurnaroundUtmPerDel(0.95);
      setSaasAdsPerDroneMonth(750);
      setFleetSize(1050);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Calculator className="w-3.5 h-3.5" />
            MIND MAP 1.1 · 3.1 · 3.2 · 3.3 · 4.3 — BUSINESS MODEL &amp; AT-SCALE UNIT ECONOMICS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Interactive Drone Unit Economics &amp; ARR Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Model how 30+ sorties/drone-day and 1:10 BVLOS remote pilot operations compress delivery cost from $8–15
            (gig drivers) to $1.50/delivery (62% contribution margin, &lt;6-month asset payback).
          </p>
        </div>

        {/* Scenario Presets */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset('seed')}
            className="px-3 py-2 rounded-lg text-xs font-mono bg-obsidian-900 border border-slate-800 hover:border-amber-400/50 text-slate-300 transition"
          >
            Yr 1 Seed (&lt;$5 @ 10/day)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('target')}
            className="px-3 py-2 rounded-lg text-xs font-mono bg-cyan-500 text-slate-950 font-semibold transition"
          >
            Mind Map Target ($1.50 / 30/day)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('year5')}
            className="px-3 py-2 rounded-lg text-xs font-mono bg-obsidian-900 border border-slate-800 hover:border-emerald-400/50 text-emerald-300 transition"
          >
            Yr 5 Scale (1,000+ Drones)
          </button>
        </div>
      </div>

      {/* Top Executive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-obsidian-900 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">PURE FLEET OPEX / DEL</div>
          <div className="text-2xl font-bold text-cyan-300 tabular-nums mt-1">
            ${pureDailyOpexPerDelivery.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            ${totalDailyFleetOpex.toFixed(2)} / Drone-Day (3.2)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900 border border-emerald-500/40">
          <div className="text-[11px] font-mono text-emerald-300">LOADED COST / DELIVERY</div>
          <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-1">
            ${loadedVariableCostPerDel.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-300 font-mono">Target Band: $1.00–$3.00</div>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">CONTRIBUTION MARGIN</div>
          <div className="text-2xl font-bold text-white tabular-nums mt-1">
            ${contributionMarginPerDel.toFixed(2)}{' '}
            <span className="text-sm text-emerald-400">({Math.round(contributionMarginPct)}%)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">On ${revenuePerDelivery.toFixed(2)} Merchant Fee</div>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">DRONE ASSET PAYBACK</div>
          <div
            className={`text-2xl font-bold tabular-nums mt-1 ${
              paybackMonths <= 6.0 ? 'text-emerald-400' : 'text-amber-300'
            }`}
          >
            {paybackMonths.toFixed(1)} mos
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Target: &lt; 6.0 Months</div>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-900 border border-slate-800 col-span-2 lg:col-span-1">
          <div className="text-[11px] font-mono text-slate-400">VS GIG DRIVER ($8–15)</div>
          <div className="text-2xl font-bold text-amber-300 tabular-nums mt-1">
            {costReductionMultiple.toFixed(1)}× Cheaper
          </div>
          <div className="text-[11px] text-slate-400 font-mono">vs ${gigBenchmarkCost.toFixed(2)} Gig Baseline</div>
        </div>
      </div>

      {/* Interactive Controls + Side-by-Side Mind Map Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Panel */}
        <div className="lg:col-span-6 rounded-2xl bg-obsidian-900 border border-slate-800 p-6 space-y-5">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Operational &amp; Pricing Levers
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-mono mb-1">
                <span className="text-slate-300">Deliveries / Drone / Day (Sortie Utilization)</span>
                <span className="text-cyan-300 font-bold">{deliveriesPerDay} sorties/day</span>
              </div>
              <input
                type="range"
                min={8}
                max={42}
                value={deliveriesPerDay}
                onChange={(e) => setDeliveriesPerDay(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>10/day (Seed Pilot)</span>
                <span>30–32/day (Target Peak)</span>
                <span>42/day</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono mb-1">
                <span className="text-slate-300">Remote Pilot Ratio (One-to-Many BVLOS)</span>
                <span className="text-emerald-400 font-bold">1 Pilot : {pilotRatio} Drones</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={pilotRatio}
                onChange={(e) => setPilotRatio(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1:1 (VLOS)</span>
                <span>1:10 ($3.00/drone-day)</span>
                <span>1:15 (Maturity)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono mb-1">
                <span className="text-slate-300">Per-Delivery Fee Charged to Merchant ($3–5 Band)</span>
                <span className="text-white font-bold">${revenuePerDelivery.toFixed(2)} / del</span>
              </div>
              <input
                type="range"
                min={3.0}
                max={5.5}
                step={0.25}
                value={revenuePerDelivery}
                onChange={(e) => setRevenuePerDelivery(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between font-mono mb-1">
                <span className="text-slate-300">Drone + Rooftop Port CapEx ($15k–$25k Band)</span>
                <span className="text-amber-300 font-bold">${capexPerDrone.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={15000}
                max={25000}
                step={500}
                value={capexPerDrone}
                onChange={(e) => setCapexPerDrone(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <div>
              <div className="flex justify-between font-mono mb-1">
                <span className="text-slate-300">Active Network Fleet Scale (Drones)</span>
                <span className="text-emerald-300 font-bold">{fleetSize.toLocaleString()} Drones</span>
              </div>
              <input
                type="range"
                min={5}
                max={1200}
                step={5}
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Right: Exact Mind Map 3.2 & 3.3 Breakdown Ledger */}
        <div className="lg:col-span-6 space-y-5">
          {/* 3.2 Daily Drone-Day Cost Structure */}
          <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-cyan-400">3.2 COST STRUCTURE (OPEX / DRONE-DAY)</div>
              <span className="text-xs font-mono text-emerald-400">
                ${pureDailyOpexPerDelivery.toFixed(2)} / del Direct Fleet
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-300">3-Phase Fast-Charge Energy</span>
                <span className="text-white">${dailyEnergy.toFixed(2)} / day</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-300">Line &amp; 500hr Maintenance Reserve</span>
                <span className="text-white">${dailyMaintenance.toFixed(2)} / day</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-300">Aviation Hull &amp; Liability Insurance</span>
                <span className="text-white">${dailyInsurance.toFixed(2)} / day</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-300">Remote Pilot Ops (1:{pilotRatio} Ratio)</span>
                <span className="text-cyan-300">${dailyRemotePilot.toFixed(2)} / day</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold">
                <span className="text-white">Total Daily Fleet Variable OpEx</span>
                <span className="text-emerald-400">
                  ${totalDailyFleetOpex.toFixed(2)} / day → ${pureDailyOpexPerDelivery.toFixed(2)} / del
                </span>
              </div>
            </div>
          </div>

          {/* 3.3 Full Unit Economic & Fleet ARR Projection */}
          <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 space-y-4">
            <div className="text-xs font-mono text-emerald-400">
              3.1 &amp; 3.3 LOADED UNIT TARGET + NETWORK ARR ({fleetSize.toLocaleString()} DRONES)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800">
                <div className="text-slate-400 font-mono">Loaded Variable / Del</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  ${loadedVariableCostPerDel.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-400">
                  Includes ${pureDailyOpexPerDelivery.toFixed(2)} flight + ${portTurnaroundUtmPerDel.toFixed(2)} port,
                  UTM &amp; ops allocation
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-950 border border-emerald-500/30">
                <div className="text-emerald-300 font-mono">Annualized Network ARR</div>
                <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                  ${(totalArrUsd / 1_000_000).toFixed(1)}M ARR
                </div>
                <div className="text-[11px] text-slate-400">
                  {(annualDeliveries / 1_000_000).toFixed(2)}M deliveries/yr + SaaS &amp; Heatmap Ads
                </div>
              </div>
            </div>

            {/* Visual Bar Comparing Gig Cost vs SkyNest */}
            <div className="space-y-2 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-mono mb-1">
                  <span className="text-rose-300">Gig Driver Cost ($8–$15/del)</span>
                  <span className="text-rose-400 font-bold">${gigBenchmarkCost.toFixed(2)}</span>
                </div>
                <div className="h-3 rounded-full bg-obsidian-950 overflow-hidden border border-slate-800">
                  <div className="h-full bg-rose-500/80 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono mb-1">
                  <span className="text-emerald-300">SkyNest Loaded Cost ($1–$3 Target)</span>
                  <span className="text-emerald-400 font-bold">${loadedVariableCostPerDel.toFixed(2)}</span>
                </div>
                <div className="h-3 rounded-full bg-obsidian-950 overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (loadedVariableCostPerDel / gigBenchmarkCost) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Year Financial Scaling Table (Mind Map 4.3 & 8.1-8.4) */}
      <div className="rounded-2xl bg-obsidian-900 border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white">
              5-Year Capital &amp; Network Scaling Trajectory ($150B+ TAM → $500M ARR)
            </h3>
            <p className="text-xs text-slate-400">
              Synchronized directly with Mind Map Section 4.3 (TAM/SAM/SOM) &amp; Section 8 (Roadmap &amp; Milestones).
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300">
            <TrendingUp className="w-4 h-4" />
            Asset-Lighter Merchant Port Hosting
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-obsidian-950 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Stage / Horizon</th>
                <th className="py-3 px-4">Active Fleet &amp; Metros</th>
                <th className="py-3 px-4">FAA Airspace Regime</th>
                <th className="py-3 px-4">Unit Cost / Del</th>
                <th className="py-3 px-4">ARR Run-Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-mono text-xs">
              <tr>
                <td className="py-3.5 px-4 font-sans font-semibold text-white">Year 1 · Validation (Seed)</td>
                <td className="py-3.5 px-4 text-slate-300">4–6 Drones · 1 Vertiport · 2 Pilots</td>
                <td className="py-3.5 px-4 text-cyan-300">Part 107 Waivers + Part 135 App</td>
                <td className="py-3.5 px-4 text-amber-300">&lt; $5.00 (@ 10/day)</td>
                <td className="py-3.5 px-4 text-slate-300">$0.6M Pilot</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-sans font-semibold text-white">Year 2 · Density (Series A)</td>
                <td className="py-3.5 px-4 text-slate-300">20 Drones · 3 Metro Areas</td>
                <td className="py-3.5 px-4 text-cyan-300">Part 135 Air Carrier Granted</td>
                <td className="py-3.5 px-4 text-emerald-300">$2.65 / Del</td>
                <td className="py-3.5 px-4 text-slate-200">$14M ARR</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-sans font-semibold text-white">Year 3 · Scale (Series B)</td>
                <td className="py-3.5 px-4 text-slate-300">200 Drones · 10 Metros</td>
                <td className="py-3.5 px-4 text-cyan-300">1:10 One-to-Many + Type Cert App</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">$1.50 / Del (62% CM)</td>
                <td className="py-3.5 px-4 text-emerald-300">$96M ARR</td>
              </tr>
              <tr className="bg-emerald-500/5">
                <td className="py-3.5 px-4 font-sans font-bold text-white">Year 5 · Network Effect</td>
                <td className="py-3.5 px-4 text-emerald-300 font-bold">1,000+ Drones · 20+ Metros + Intl</td>
                <td className="py-3.5 px-4 text-cyan-300">Type + Production Cert + EU/CA/AUS</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">$1.15 – $1.50 / Del</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">$500M ARR</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
