'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckSquare,
  ExternalLink,
  FileText,
  Lock,
  Network,
  Search,
  ShieldCheck,
  Square,
  Volume2,
} from 'lucide-react';
import {
  INITIAL_ROADMAP_PHASES,
  MINDMAP_MARKDOWN,
  MINDMAP_PILLARS,
  MindmapPillar,
  RoadmapPhase,
} from '@/data/mindmapData';

export default function MindmapAndRoadmapPage() {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('value-prop');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showRawMarkdown, setShowRawMarkdown] = useState<boolean>(false);
  const [phases, setPhases] = useState<RoadmapPhase[]>(INITIAL_ROADMAP_PHASES);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/roadmap')
      .then((r) => r.json())
      .then((data) => {
        if (data.roadmapPhases) {
          setPhases(data.roadmapPhases);
        }
      })
      .catch(() => {});
  }, []);

  async function handleToggleMilestone(milestoneId: string) {
    setUpdatingId(milestoneId);
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milestoneId }),
      });
      const data = await res.json();
      if (data.ok && data.roadmapPhases) {
        setPhases(data.roadmapPhases);
      }
    } finally {
      setUpdatingId(null);
    }
  }

  const activePillar: MindmapPillar =
    MINDMAP_PILLARS.find((p) => p.id === selectedPillarId) || MINDMAP_PILLARS[0];

  const filteredPillars = searchQuery.trim()
    ? MINDMAP_PILLARS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.sections.some(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.items.some(
                (i) => i.label.toLowerCase().includes(q) || i.detail.toLowerCase().includes(q)
              )
          )
        );
      })
    : MINDMAP_PILLARS;

  const totalMilestones = phases.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedMilestones = phases.reduce(
    (acc, p) => acc + p.milestones.filter((m) => m.completed).length,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Network className="w-3.5 h-3.5" />
            CANONICAL COMPANY MIND MAP · 5-YEAR EXECUTION ROADMAP · FAA CERT DOSSIER
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Retail &amp; Restaurant Drone Network — Master Blueprint
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every node from the attached Mind Map files is mapped directly to working software modules, financial
            targets, and checkable Year 1–5 execution milestones.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowRawMarkdown(!showRawMarkdown)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono bg-obsidian-900 border border-slate-700 hover:border-cyan-400 text-slate-200 transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            {showRawMarkdown ? 'Hide Raw Mind Map Markdown' : 'View Canonical Markdown'}
          </button>
          <a
            href="/interactive-mindmap.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 transition"
          >
            Open Interactive Markmap Diagram <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* OPTIONAL RAW MARKDOWN INSPECTOR */}
      {showRawMarkdown && (
        <div className="rounded-2xl bg-obsidian-900 border border-cyan-500/30 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
            <span>mindmap/mindmap.md (Exact Canonical Source)</span>
            <span>131 LINES</span>
          </div>
          <pre className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
            {MINDMAP_MARKDOWN}
          </pre>
        </div>
      )}

      {/* INTERACTIVE 8-PILLAR MIND MAP GRAPH & NODE EXPLORER */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">Interactive 8-Branch Mind Map Explorer</h2>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search nodes (e.g. Part 135, VTOL, Olo)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-obsidian-900 border border-slate-700 text-xs text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Interactive SVG Mind Map Diagram */}
        <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Branch Selector Tree */}
            <div className="lg:col-span-5 space-y-2">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/15 border border-cyan-400/40 text-xs font-mono font-bold text-white mb-3">
                ROOT: Retail &amp; Restaurant Drone Network
              </div>
              {filteredPillars.map((pillar) => {
                const isSelected = pillar.id === activePillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setSelectedPillarId(pillar.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm'
                        : 'bg-obsidian-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                          isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-cyan-300'
                        }`}
                      >
                        {pillar.number}
                      </span>
                      <div>
                        <div className="font-semibold text-sm">{pillar.title}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {pillar.sections.length} Sub-Branches ·{' '}
                          {pillar.sections.reduce((a, s) => a + s.items.length, 0)} Specs
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Expanded Sub-Branches & Leaf Nodes */}
            <div className="lg:col-span-7 rounded-2xl bg-obsidian-950 border border-slate-800 p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400">PILLAR {activePillar.number}</span>
                  <h3 className="text-xl font-bold text-white">{activePillar.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{activePillar.summary}</p>
                </div>
                <Link
                  href={activePillar.linkedModule.href}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono hover:bg-emerald-500/25 transition"
                >
                  {activePillar.linkedModule.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {activePillar.sections.map((sec) => (
                  <div key={sec.code} className="p-4 rounded-xl bg-obsidian-900 border border-slate-800 space-y-2.5">
                    <div className="text-xs font-mono font-bold text-cyan-300">
                      {sec.code} {sec.title}
                    </div>
                    <ul className="space-y-2">
                      {sec.items.map((item) => (
                        <li
                          key={item.label}
                          className="text-xs sm:text-sm flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-slate-300"
                        >
                          <span className="font-semibold text-white shrink-0">• {item.label}:</span>
                          <span className="text-slate-300">{item.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: 5-YEAR EXECUTION ROADMAP & INTERACTIVE MILESTONES */}
      <section id="milestones" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase mb-1">
              Mind Map Pillar 08 · Roadmap &amp; Milestones (Interactive Checklist)
            </div>
            <h2 className="text-2xl font-bold text-white">
              Year 1 Seed Validation → Year 5 Network Effect ($500M ARR)
            </h2>
          </div>
          <div className="px-4 py-2 rounded-xl bg-obsidian-900 border border-slate-800 text-xs font-mono">
            Milestones Verified:{' '}
            <strong className="text-emerald-400">
              {completedMilestones} / {totalMilestones}
            </strong>{' '}
            ({Math.round((completedMilestones / totalMilestones) * 100)}%)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((phase) => {
            const doneCount = phase.milestones.filter((m) => m.completed).length;
            const pct = Math.round((doneCount / phase.milestones.length) * 100);
            return (
              <div
                key={phase.id}
                className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-cyan-400">
                        {phase.code} · {phase.year.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-bold text-white">{phase.stage}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-obsidian-950 border border-slate-700 text-[11px] font-mono text-emerald-300">
                      {phase.targetCostPerDelivery}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{phase.headline}</p>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>{phase.fleetScale}</span>
                      <span className="text-cyan-300">{pct}% Ready</span>
                    </div>
                    <div className="h-2 rounded-full bg-obsidian-950 overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Checkable Milestones */}
                  <div className="space-y-2 pt-2">
                    {phase.milestones.map((ms) => (
                      <div
                        key={ms.id}
                        className={`p-3 rounded-xl border transition ${
                          ms.completed
                            ? 'bg-emerald-950/20 border-emerald-500/35'
                            : 'bg-obsidian-950 border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <button
                            type="button"
                            disabled={updatingId === ms.id}
                            onClick={() => handleToggleMilestone(ms.id)}
                            className="flex items-start gap-2.5 text-left group"
                          >
                            {ms.completed ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div
                                className={`text-xs sm:text-sm font-semibold ${
                                  ms.completed ? 'text-emerald-200' : 'text-white'
                                }`}
                              >
                                {ms.title}
                              </div>
                              <div className="text-[11px] font-mono text-slate-400 mt-0.5">{ms.metric}</div>
                            </div>
                          </button>

                          <Link
                            href={ms.linkedModule.href}
                            className="shrink-0 text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                          >
                            Open →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Capital Stage: {phase.capitalTarget}</span>
                  <span>Click any checkbox to simulate gate</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: REGULATORY, WAIVERS & COMMUNITY SAFETY DOSSIER */}
      <section id="regulatory" className="space-y-6 scroll-mt-24">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase mb-1">
            Mind Map Pillar 05 · Regulatory &amp; Risk Mitigation Dossier
          </div>
          <h2 className="text-2xl font-bold text-white">
            FAA Certification Pathway, Key Waivers &amp; Community Commitments
          </h2>
        </div>

        {/* 5.1 Certification Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-obsidian-900 border border-emerald-500/40 space-y-2">
            <div className="text-xs font-mono text-emerald-400">5.1 PHASE 1 (NOW · ACTIVE)</div>
            <h3 className="text-base font-bold text-white">Part 107 + Operational Waivers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Commercial suburban pilot corridor launches under 14 CFR Part 107 with VLOS, Night Ops, and Operations
              Over People waivers to log 500+ empirical safety &amp; noise sorties.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian-900 border border-cyan-500/40 space-y-2">
            <div className="text-xs font-mono text-cyan-300">5.1 PHASE 2 (YEAR 2–3 · FILED)</div>
            <h3 className="text-base font-bold text-white">Part 135 Air Carrier Certificate</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Following the proven Wing / UPS Flight Forward FAA certification precedent to unlock scheduled BVLOS
              commercial package carriage across multi-metro suburban corridors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-amber-300">5.1 PHASE 3 (YEAR 4+)</div>
            <h3 className="text-base font-bold text-white">Type + Production Certification</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Full airworthiness Type Certification + Production Certificate enabling high-rate autonomous fleet
              manufacturing (1,000+ drones) and EASA / Transport Canada / CASA alignment.
            </p>
          </div>
        </div>

        {/* 5.2 Waivers + 5.3 Community & Equity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              5.2 KEY FAA WAIVERS &amp; TECHNICAL CONOPS
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
                <strong className="text-white">BVLOS (Beyond Visual Line of Sight):</strong>{' '}
                <span className="text-slate-300">
                  Shielded low-altitude tree/rooftop ops + onboard 4D Radar / Optical / ADS-B In DAA system approval.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
                <strong className="text-white">Operations Over People (OOP):</strong>{' '}
                <span className="text-slate-300">
                  Kinetic energy envelope compliance + ASTM F3322 autonomous ballistic parachute recovery system.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
                <strong className="text-white">Night Operations:</strong>{' '}
                <span className="text-slate-300">
                  3-statute-mile high-visibility anti-collision strobes + illuminated RTK optical fiducial landing pads.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
                <strong className="text-white">One-to-Many Remote Pilot:</strong>{' '}
                <span className="text-slate-300">
                  Single certificated RPIC supervising 10–15 simultaneous autonomous aircraft ($3.00/drone-day).
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-900 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4" />
              5.3 COMMUNITY ACCEPTANCE, PRIVACY &amp; EQUITY CHARTER
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
                <strong className="text-white">Acoustic Mitigation (&lt;55 dB @ 50m):</strong>{' '}
                <span className="text-slate-300">
                  Shrouded electric ducted fans, blade-tip vortex optimization, and dynamic flight path altitude
                  rotation so no single street experiences repetitive overflight.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800 flex items-start gap-2">
                <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Strict Residential Privacy:</strong>{' '}
                  <span className="text-slate-300">
                    Zero downward video recording of private yards; geofenced arterial corridors + optical computer
                    vision restricted to AprilTag landing fiducials.
                  </span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-emerald-500/30">
                <strong className="text-emerald-300">Food Desert &amp; Low-Income Corridor Equity:</strong>{' '}
                <span className="text-slate-300">
                  Binding municipal service commitment allocating subsidized $3.00 flat-rate fresh grocery and pharmacy
                  sorties into underserved neighborhoods bypassed by ground retail.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
