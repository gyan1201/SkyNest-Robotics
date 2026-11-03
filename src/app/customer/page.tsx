'use client';

import React, { useEffect, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Clock,
  Lock,
  MapPin,
  PackageCheck,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Thermometer,
  Volume2,
} from 'lucide-react';
import type { DeliveryMission, DropZoneType, NetworkState } from '@/lib/networkStore';

const DROP_ZONE_MODES: {
  type: DropZoneType;
  desc: string;
  precision: string;
}[] = [
  {
    type: 'Driveway Fiducial Marker',
    desc: 'Weatherproof AprilTag mat on driveway; optical + RTK-GPS touchdown.',
    precision: '1.8 cm RTK Lock',
  },
  {
    type: 'Curbside Pad',
    desc: 'Designated HOA/suburban cul-de-sac precision drop zone.',
    precision: '2.1 cm RTK Lock',
  },
  {
    type: 'Apartment Smart Locker',
    desc: 'Automated rooftop/courtyard induction hatch with PIN pickup.',
    precision: '1.4 cm Docking',
  },
  {
    type: 'Drone Mailbox',
    desc: 'Dedicated residential pedestal receptacle with auto-closing lid.',
    precision: '1.2 cm Tether Guide',
  },
];

export default function CustomerAppPage() {
  const [network, setNetwork] = useState<NetworkState | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string>('MSN-9041');
  const [selectedZoneMode, setSelectedZoneMode] = useState<DropZoneType>('Driveway Fiducial Marker');
  const [zoneCleared, setZoneCleared] = useState<boolean>(true);
  const [fiducialCalibrated, setFiducialCalibrated] = useState<boolean>(true);
  const [stageOverride, setStageOverride] = useState<'IN_FLIGHT' | 'DESCENDING' | 'DELIVERED_POD'>('IN_FLIGHT');
  const [orderingBusy, setOrderingBusy] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/network')
      .then((r) => r.json())
      .then((data: NetworkState) => {
        setNetwork(data);
        if (data.missions[0]) {
          setSelectedMissionId(data.missions[0].id);
          setSelectedZoneMode(data.missions[0].dropZoneType);
        }
      })
      .catch(() => {});
  }, []);

  const activeMission: DeliveryMission | undefined =
    network?.missions.find((m) => m.id === selectedMissionId) || network?.missions[0];

  async function placeInstantOrder(merchantId: string, dropZoneId: string, label: string, kg: number, price: number) {
    setOrderingBusy(true);
    try {
      const res = await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          dropZoneId,
          customItemsSummary: label,
          customPayloadKg: kg,
          customOrderValueUsd: price,
        }),
      });
      const json = await res.json();
      if (json.ok && json.mission) {
        setNetwork(json.state);
        setSelectedMissionId(json.mission.id);
        setSelectedZoneMode(json.mission.dropZoneType);
        setStageOverride('IN_FLIGHT');
      }
    } finally {
      setOrderingBusy(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            MIND MAP 1.2 · 2.2 · 2.4 · 5.3 · 6.1 — CUSTOMER LIVE TRACKING, LANDING ZONE UI &amp; POD
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            5–15 Minute Deterministic Aerial Delivery Experience
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Direct merchant brand ordering, live flight telemetry, interactive &ldquo;Prepare Landing Zone&rdquo;
            verification, and privacy-safe Photo-on-Delivery (POD).
          </p>
        </div>

        {/* Instant 1-Tap Demo Order Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={orderingBusy}
            onClick={() =>
              placeInstantOrder('PORT-QSR-01', 'DZ-101', 'Hot Crispy Chicken Family Feast', 2.5, 34.0)
            }
            className="px-3.5 py-2 rounded-lg bg-obsidian-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            + Order QSR Meal (6.5m ETA)
          </button>
          <button
            type="button"
            disabled={orderingBusy}
            onClick={() =>
              placeInstantOrder('PORT-GRO-02', 'DZ-104', 'Chilled Grocery Express Bag', 3.9, 44.5)
            }
            className="px-3.5 py-2 rounded-lg bg-obsidian-900 border border-slate-700 hover:border-emerald-400 text-xs font-mono text-emerald-300 flex items-center gap-1.5 transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            + Order Grocery Bag (8m ETA)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Order Flight Selector & "Prepare Landing Zone" UI */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Orders Strip */}
          <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-5 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase">Select Active Customer Delivery</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {network?.missions.slice(0, 4).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedMissionId(m.id);
                    setSelectedZoneMode(m.dropZoneType);
                    setStageOverride('IN_FLIGHT');
                  }}
                  className={`p-3 rounded-xl border text-left transition ${
                    m.id === activeMission?.id
                      ? 'bg-cyan-500/10 border-cyan-400/60'
                      : 'bg-obsidian-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-cyan-300">{m.orderNumber}</span>
                    <span className="text-emerald-400 font-semibold">{m.etaMinutes} min ETA</span>
                  </div>
                  <div className="text-xs font-semibold text-white mt-1 truncate">{m.itemsSummary}</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {m.merchantName} → {m.dropZoneName}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* "Prepare Landing Zone" Interactive Calibration Panel */}
          <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-cyan-400">2.4 CUSTOMER APP · 6.1 DROP ZONES</div>
                <h2 className="text-lg font-bold text-white">&ldquo;Prepare Landing Zone&rdquo; Interactive Check</h2>
              </div>
              <span
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold ${
                  zoneCleared && fiducialCalibrated
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/35'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/35'
                }`}
              >
                {zoneCleared && fiducialCalibrated ? 'PAD ARMED & VERIFIED' : 'AWAITING CLEARANCE'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DROP_ZONE_MODES.map((mode) => (
                <button
                  key={mode.type}
                  type="button"
                  onClick={() => setSelectedZoneMode(mode.type)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    selectedZoneMode === mode.type
                      ? 'bg-emerald-500/10 border-emerald-400/60'
                      : 'bg-obsidian-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{mode.type}</span>
                    <span className="text-[10px] font-mono text-emerald-300">{mode.precision}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{mode.desc}</p>
                </button>
              ))}
            </div>

            {/* Safety & Clearance Toggles */}
            <div className="space-y-2.5 pt-1">
              <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-slate-800 cursor-pointer">
                <span className="text-xs text-slate-200">
                  1. Landing pad perimeter (2m radius) clear of pets, vehicles &amp; obstacles
                </span>
                <input
                  type="checkbox"
                  checked={zoneCleared}
                  onChange={(e) => setZoneCleared(e.target.checked)}
                  className="w-4 h-4 accent-emerald-400"
                />
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl bg-obsidian-950 border border-slate-800 cursor-pointer">
                <span className="text-xs text-slate-200">
                  2. Optical Fiducial / RTK Beacon handshake verified ({selectedZoneMode})
                </span>
                <input
                  type="checkbox"
                  checked={fiducialCalibrated}
                  onChange={(e) => setFiducialCalibrated(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400"
                />
              </label>
            </div>

            {/* Privacy & Noise Assurance */}
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="inline-flex items-center gap-2 text-cyan-200">
                <Lock className="w-4 h-4 text-cyan-400" />
                <strong>Privacy Guarantee:</strong> No downward property recording; camera masked to fiducial ID only.
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-emerald-300">
                <Volume2 className="w-3.5 h-3.5" /> 51.2 dB @ 50m
              </span>
            </div>
          </div>
        </div>

        {/* Right: Mobile-Style Live Flight Card + POD (Photo on Delivery) */}
        <div className="lg:col-span-5">
          {activeMission && (
            <div className="rounded-3xl bg-obsidian-900 border-2 border-slate-800 p-6 shadow-2xl space-y-5">
              {/* Top Phone Pill */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                  <Radio className="w-3 h-3 animate-pulse" />
                  {activeMission.droneId} · LIVE
                </span>
                <span className="text-xs font-mono text-slate-400">{activeMission.orderNumber}</span>
              </div>

              {/* Deterministic ETA Comparison */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-obsidian-950 to-slate-900 border border-slate-800">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Deterministic Aerial ETA</div>
                    <div className="text-3xl font-bold text-emerald-400 tabular-nums mt-0.5">
                      {stageOverride === 'DELIVERED_POD'
                        ? 'Arrived!'
                        : stageOverride === 'DESCENDING'
                        ? '0.8 min'
                        : `${activeMission.etaMinutes} min`}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-mono text-slate-500 line-through">
                      Ground Car: {activeMission.groundEquivalentMinutes} min
                    </div>
                    <div className="text-xs font-mono text-cyan-300 mt-1">
                      Saved {Math.round(activeMission.groundEquivalentMinutes - activeMission.etaMinutes)} mins
                    </div>
                  </div>
                </div>

                {/* Flight Progress Steps */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[
                    { id: 'IN_FLIGHT', label: '1. Cruise' },
                    { id: 'DESCENDING', label: '2. Fiducial Drop' },
                    { id: 'DELIVERED_POD', label: '3. POD Verified' },
                  ].map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setStageOverride(step.id as 'IN_FLIGHT' | 'DESCENDING' | 'DELIVERED_POD')}
                      className={`py-2 px-2 rounded-lg text-[11px] font-mono border transition ${
                        stageOverride === step.id
                          ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                          : 'bg-obsidian-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order & Climate Bay Integrity */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-[11px]">Merchant Direct Order</div>
                    <div className="font-semibold text-white">{activeMission.itemsSummary}</div>
                  </div>
                  <span className="font-mono text-slate-300">{activeMission.payloadKg} kg</span>
                </div>

                <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <Thermometer className="w-4 h-4 text-amber-400" />
                    Climate-Controlled Bay
                  </span>
                  <span className="font-mono text-emerald-400 font-semibold">{activeMission.bayTempLabel}</span>
                </div>

                <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Drop Target
                  </span>
                  <span className="font-mono text-cyan-300">{selectedZoneMode}</span>
                </div>
              </div>

              {/* POD (Photo on Delivery) Verification Card */}
              {stageOverride === 'DELIVERED_POD' ? (
                <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300">
                      <Camera className="w-4 h-4" />
                      POD (PHOTO ON DELIVERY) CONFIRMED
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{activeMission.podCode}</span>
                  </div>

                  {/* Stylized Precision Fiducial Parcel Pad Snapshot */}
                  <div className="rounded-xl bg-obsidian-950 border border-slate-800 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                        <PackageCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Parcel Released on Fiducial Center</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Offset: 1.4 cm · Seal Intact · Background Cropped
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setStageOverride('DELIVERED_POD')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition"
                >
                  <Clock className="w-4 h-4" />
                  Simulate Precision Touchdown &amp; Generate POD Receipt
                </button>
              )}

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> 0% Marketplace Markup
                </span>
                <span>Delivery Fee: ${activeMission.skynestFeeUsd.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
