'use client';

import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  Cpu,
  Lock,
  Navigation,
  Play,
  Radio,
  RefreshCw,
  Send,
  ShieldCheck,
  Volume2,
  Wind,
  Wrench,
} from 'lucide-react';
import type { DroneUnit, NetworkState } from '@/lib/networkStore';

export default function FleetOsPage() {
  const [network, setNetwork] = useState<NetworkState | null>(null);
  const [selectedDroneId, setSelectedDroneId] = useState<string>('SN-101');
  const [simRunning, setSimRunning] = useState<boolean>(true);
  const [dispatchMerchantId, setDispatchMerchantId] = useState<string>('PORT-QSR-01');
  const [dispatchDropZoneId, setDispatchDropZoneId] = useState<string>('DZ-101');
  const [dispatchFeedback, setDispatchFeedback] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/network')
      .then((r) => r.json())
      .then((data: NetworkState) => {
        setNetwork(data);
      })
      .catch(() => {});
  }, []);

  // Smooth client-side corridor flight animation loop
  useEffect(() => {
    if (!simRunning) return;
    const interval = setInterval(() => {
      setNetwork((prev) => {
        if (!prev) return prev;
        const nextDrones = prev.drones.map((d) => {
          if (d.status === 'STAGED_READY' || d.status === 'BATTERY_SWAP_90S') {
            return d;
          }
          const nextProg = d.progress + 0.025;
          if (nextProg >= 1.0) {
            // Flip leg between origin and destination so corridor stays lively
            return {
              ...d,
              originCoords: d.destCoords,
              destCoords: d.originCoords,
              coords: d.destCoords,
              progress: 0.04,
              status: d.status === 'RETURNING_TO_PORT' ? ('IN_TRANSIT' as const) : ('RETURNING_TO_PORT' as const),
              batteryPct: d.batteryPct < 45 ? 98 : Math.max(42, d.batteryPct - 2),
            };
          }
          const nx = d.originCoords.x + (d.destCoords.x - d.originCoords.x) * nextProg;
          const ny = d.originCoords.y + (d.destCoords.y - d.originCoords.y) * nextProg;
          return {
            ...d,
            progress: nextProg,
            coords: { x: Number(nx.toFixed(2)), y: Number(ny.toFixed(2)) },
          };
        });
        return { ...prev, drones: nextDrones };
      });
    }, 650);
    return () => clearInterval(interval);
  }, [simRunning]);

  const selectedDrone: DroneUnit | undefined =
    network?.drones.find((d) => d.id === selectedDroneId) || network?.drones[0];

  async function handleDroneCommand(action: 'TOGGLE_MOTOR_OUT_TEST' | 'TRIGGER_90S_SWAP' | 'DAA_DECONFLICT_SIM') {
    if (!selectedDrone) return;
    setBusyAction(true);
    try {
      const res = await fetch('/api/network', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ droneId: selectedDrone.id, action }),
      });
      if (res.ok) {
        const updated: NetworkState = await res.json();
        setNetwork(updated);
      }
    } finally {
      setBusyAction(false);
    }
  }

  async function handleQuickDispatch(e: React.FormEvent) {
    e.preventDefault();
    setBusyAction(true);
    setDispatchFeedback(null);
    try {
      const res = await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: dispatchMerchantId,
          dropZoneId: dispatchDropZoneId,
          customItemsSummary: 'Autonomous Fleet OS Priority Parcel',
          customPayloadKg: 2.6,
          customOrderValueUsd: 36.0,
        }),
      });
      const json = await res.json();
      if (json.ok && json.state) {
        setNetwork(json.state);
        setSelectedDroneId(json.mission.droneId);
        setDispatchFeedback(
          `Dispatched ${json.mission.droneId} on ${json.mission.id} · ETA ${json.mission.etaMinutes} min ($${json.mission.skynestFeeUsd} fee)`
        );
      } else {
        setDispatchFeedback(json.error || 'Dispatch rejected');
      }
    } finally {
      setBusyAction(false);
    }
  }

  if (!network) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-mono text-sm text-cyan-300">
        Initializing SkyNest Fleet OS &amp; FAA USS UTM Telemetry...
      </div>
    );
  }

  const totalSortiesToday = network.drones.reduce((acc, d) => acc + d.sortiesToday, 0);
  const avgNoise =
    network.drones.filter((d) => d.noiseDbAt50m > 0).reduce((a, d) => a + d.noiseDbAt50m, 0) /
    Math.max(1, network.drones.filter((d) => d.noiseDbAt50m > 0).length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Radio className="w-3.5 h-3.5" />
            MIND MAP 2.2 · 2.3 · 2.4 · 6.1 · 6.2 · 6.3 — AUTONOMOUS FLEET OS &amp; UTM CONSOLE
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {network.corridorName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Density Sweet Spot: <strong className="text-slate-200">{network.densityPopPerSqMi.toLocaleString()} pop/sq mi</strong> ·
            Remote Pilot Command: <strong className="text-cyan-300">{network.remotePilotRatio}</strong> · Weather:{' '}
            <strong className="text-emerald-400">{network.weatherWindMps} m/s ({network.weatherRating})</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSimRunning(!simRunning)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono border border-slate-700 bg-obsidian-900 hover:border-cyan-400/50 text-slate-200 transition"
          >
            {simRunning ? <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            {simRunning ? 'LIVE CORRIDOR SIM: ON' : 'SIM PAUSED'}
          </button>
          <div className="px-3.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
            FAA USS: {network.utmUssStatus}
          </div>
        </div>
      </div>

      {/* Top Operational KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">ACTIVE FLEET (1:10 RPIC)</div>
          <div className="text-2xl font-bold text-white tabular-nums mt-1">{network.drones.length} SN-V1</div>
          <div className="text-[11px] text-cyan-400 font-mono">1 Pilot : 10 Aircraft</div>
        </div>
        <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">SORTIES COMPLETED TODAY</div>
          <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-1">{totalSortiesToday}</div>
          <div className="text-[11px] text-slate-400 font-mono">~{(totalSortiesToday / 10).toFixed(1)} / Drone-Day</div>
        </div>
        <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">PORT AUTO-SWAP TIME</div>
          <div className="text-2xl font-bold text-amber-300 tabular-nums mt-1">90 sec</div>
          <div className="text-[11px] text-slate-400 font-mono">Battery + Parcel Load</div>
        </div>
        <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">CORRIDOR ACOUSTICS</div>
          <div className="text-2xl font-bold text-cyan-300 tabular-nums mt-1">{avgNoise.toFixed(1)} dB</div>
          <div className="text-[11px] text-emerald-400 font-mono">Compliant (&lt;55dB @ 50m)</div>
        </div>
        <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800 col-span-2 md:col-span-1">
          <div className="text-[11px] font-mono text-slate-400">DISPATCH RELIABILITY</div>
          <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-1">{network.dispatchReliabilityPct}%</div>
          <div className="text-[11px] text-slate-400 font-mono">Target &gt; 99.5%</div>
        </div>
      </div>

      {/* Main Tactical Airspace Grid + Right Avionics Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tactical Radar & Hub-and-Spoke Map */}
        <div className="lg:col-span-8 rounded-2xl bg-obsidian-900 border border-slate-800 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-800 bg-obsidian-950 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-200 font-semibold">
              SUBURBAN HUB-AND-SPOKE TOPOLOGY (&lt;5 MI SAM RADIUS)
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" /> Vertiport
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Merchant Port
              </span>
              <span className="inline-flex items-center gap-1 text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Drop Zone
              </span>
            </div>
          </div>

          <div className="relative w-full aspect-[16/11] bg-obsidian-950">
            <svg viewBox="0 0 100 100" className="w-full h-full select-none">
              {/* Tactical Grid Lines */}
              <defs>
                <pattern id="airgrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(51,65,85,0.28)" strokeWidth="0.25" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#airgrid)" />

              {/* 5-Mile SAM Suburban Radius Rings around Central Vertiport (50,50) */}
              <circle
                cx="50"
                cy="50"
                r="43"
                fill="none"
                stroke="rgba(6,182,212,0.18)"
                strokeWidth="0.35"
                strokeDasharray="1.5 1.5"
              />
              <circle
                cx="50"
                cy="50"
                r="26"
                fill="none"
                stroke="rgba(6,182,212,0.14)"
                strokeWidth="0.3"
                strokeDasharray="1 1.5"
              />
              <text x="51" y="9" fill="rgba(148,163,184,0.65)" fontSize="2.3" fontFamily="monospace">
                5.0 MI SUBURBAN CORRIDOR GEOFENCE · PRIVACY LOCK ACTIVE
              </text>

              {/* Hub-and-Spoke Geofenced Flight Corridors */}
              {network.merchantPorts.map((mp) => (
                <line
                  key={`hub-${mp.id}`}
                  x1={network.vertiport.coords.x}
                  y1={network.vertiport.coords.y}
                  x2={mp.coords.x}
                  y2={mp.coords.y}
                  stroke="rgba(16,185,129,0.2)"
                  strokeWidth="0.45"
                  strokeDasharray="1.2 1.2"
                />
              ))}

              {/* Active Drone Flight Vectors */}
              {network.drones
                .filter((d) => d.status !== 'STAGED_READY')
                .map((d) => (
                  <line
                    key={`vec-${d.id}`}
                    x1={d.originCoords.x}
                    y1={d.originCoords.y}
                    x2={d.destCoords.x}
                    y2={d.destCoords.y}
                    stroke={d.id === selectedDrone?.id ? 'rgba(0,229,255,0.75)' : 'rgba(56,189,248,0.25)'}
                    strokeWidth={d.id === selectedDrone?.id ? '0.65' : '0.35'}
                  />
                ))}

              {/* Central Vertiport Hub (50, 50) */}
              <g transform={`translate(${network.vertiport.coords.x}, ${network.vertiport.coords.y})`}>
                <rect x="-3.2" y="-3.2" width="6.4" height="6.4" rx="1.2" fill="#083344" stroke="#22d3ee" strokeWidth="0.6" />
                <text x="0" y="0.9" textAnchor="middle" fill="#67e8f9" fontSize="2.6" fontWeight="bold" fontFamily="monospace">
                  H
                </text>
                <text x="0" y="6.2" textAnchor="middle" fill="#e2e8f0" fontSize="2.3" fontFamily="monospace">
                  VP-DFW-01 (HUB)
                </text>
              </g>

              {/* Merchant Rooftop Drone Ports */}
              {network.merchantPorts.map((mp) => (
                <g key={mp.id} transform={`translate(${mp.coords.x}, ${mp.coords.y})`}>
                  <circle r="2.6" fill="#064e3b" stroke="#34d399" strokeWidth="0.6" />
                  <circle r="1.0" fill="#34d399" />
                  <text x="0" y="-3.8" textAnchor="middle" fill="#a7f3d0" fontSize="2.2" fontFamily="monospace">
                    {mp.id} {mp.equityCorridor ? '(EQUITY)' : ''}
                  </text>
                  <text x="0" y="5.1" textAnchor="middle" fill="#cbd5e1" fontSize="2.0">
                    {mp.posProvider} · {mp.chargedPacksReady}/{mp.totalPacks} Packs
                  </text>
                </g>
              ))}

              {/* Suburban Drop Zones */}
              {network.dropZones.map((dz) => (
                <g key={dz.id} transform={`translate(${dz.coords.x}, ${dz.coords.y})`}>
                  <polygon points="0,-2.3 2.2,1.8 -2.2,1.8" fill="#451a03" stroke="#fbbf24" strokeWidth="0.55" />
                  <text x="0" y="4.5" textAnchor="middle" fill="#fde68a" fontSize="2.0" fontFamily="monospace">
                    {dz.id} · {dz.type.split(' ')[0]}
                  </text>
                </g>
              ))}

              {/* Autonomous SN-V1 Drones */}
              {network.drones.map((drone) => {
                const isSelected = drone.id === selectedDrone?.id;
                const isMotorOut = drone.redundancyState === '7/8_HEX_OCTO_SAFE';
                return (
                  <g
                    key={drone.id}
                    transform={`translate(${drone.coords.x}, ${drone.coords.y})`}
                    onClick={() => setSelectedDroneId(drone.id)}
                    className="cursor-pointer"
                  >
                    {isSelected && (
                      <circle
                        r="3.8"
                        fill="none"
                        stroke={isMotorOut ? '#f59e0b' : '#00e5ff'}
                        strokeWidth="0.45"
                        strokeDasharray="1 0.8"
                      />
                    )}
                    <circle
                      r="1.9"
                      fill={isMotorOut ? '#f59e0b' : isSelected ? '#00e5ff' : '#38bdf8'}
                      stroke="#06090f"
                      strokeWidth="0.4"
                    />
                    <text
                      x="2.6"
                      y="0.8"
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize="2.1"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="monospace"
                    >
                      {drone.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Map Overlay Bar */}
            <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-obsidian-950/90 backdrop-blur border border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                PRIVACY INTERLOCK: DOWNWARD PROPERTY CAMERAS DISABLED (OPTICAL FIDUCIAL ONLY)
              </span>
              <span className="text-slate-400">CLICK ANY AIRCRAFT NODE TO INSPECT AVIONICS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Drone Avionics + 1:10 Pilot Controls */}
        <div className="lg:col-span-4 space-y-5">
          {selectedDrone && (
            <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-5 space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="text-[11px] font-mono text-cyan-400">{selectedDrone.model}</div>
                  <h2 className="text-xl font-bold text-white font-mono">{selectedDrone.callsign}</h2>
                  <div className="text-xs text-slate-400">{selectedDrone.assignedPilot}</div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold ${
                    selectedDrone.redundancyState === '7/8_HEX_OCTO_SAFE'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {selectedDrone.status}
                </span>
              </div>

              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">BATTERY / PACK</span>
                  <span className="text-emerald-400 font-semibold text-sm">{selectedDrone.batteryPct}%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">PAYLOAD / BAY</span>
                  <span className="text-white font-semibold text-sm">
                    {selectedDrone.payloadKg.toFixed(1)} / 5.0 kg ({selectedDrone.bayTempC}°C)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">NOISE @ 50M</span>
                  <span className="text-cyan-300 font-semibold text-sm">
                    {selectedDrone.noiseDbAt50m > 0 ? `${selectedDrone.noiseDbAt50m} dB` : '0 dB (Standby)'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">SORTIES TODAY</span>
                  <span className="text-amber-300 font-semibold text-sm">{selectedDrone.sortiesToday} Sorties</span>
                </div>
              </div>

              {/* 2.2 Detect-and-Avoid (DAA) & Redundancy Status */}
              <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 space-y-2 text-xs">
                <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  2.2 DAA MULTI-SENSOR FUSION &amp; REDUNDANCY
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Propulsion Redundancy</span>
                  <span
                    className={`font-mono font-semibold ${
                      selectedDrone.redundancyState === '8/8_NOMINAL' ? 'text-emerald-400' : 'text-amber-300'
                    }`}
                  >
                    {selectedDrone.redundancyState}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">4D mmWave Radar</span>
                  <span className="font-mono text-cyan-300">{selectedDrone.daaState.radar}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Optical Fiducial / RTK</span>
                  <span className="font-mono text-emerald-400">{selectedDrone.daaState.optical}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">ADS-B In Receiver</span>
                  <span
                    className={`font-mono ${
                      selectedDrone.daaState.adsbIn === 'DECONFLICTING' ? 'text-amber-300' : 'text-emerald-400'
                    }`}
                  >
                    {selectedDrone.daaState.adsbIn}
                  </span>
                </div>
              </div>

              {/* Interactive Avionics Commands */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-mono text-slate-400">REMOTE PILOT OVERRIDE &amp; SAFETY TESTS</div>
                <button
                  type="button"
                  disabled={busyAction}
                  onClick={() => handleDroneCommand('TOGGLE_MOTOR_OUT_TEST')}
                  className="w-full py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/35 text-amber-300 text-xs font-mono flex items-center justify-between transition"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Simulate Hexa/Octo Motor-Out Fault
                  </span>
                  <span>{selectedDrone.redundancyState === '8/8_NOMINAL' ? 'TEST' : 'RESET'}</span>
                </button>

                <button
                  type="button"
                  disabled={busyAction}
                  onClick={() => handleDroneCommand('DAA_DECONFLICT_SIM')}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/35 text-cyan-300 text-xs font-mono flex items-center justify-between transition"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5" />
                    Trigger ADS-B / Radar DAA Deconfliction
                  </span>
                  <span>SIM</span>
                </button>

                <button
                  type="button"
                  disabled={busyAction}
                  onClick={() => handleDroneCommand('TRIGGER_90S_SWAP')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 text-xs font-mono flex items-center justify-between transition"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5" />
                    Command 90-Sec Auto Battery Swap
                  </span>
                  <span>90s</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Mission Dispatcher */}
          <form onSubmit={handleQuickDispatch} className="rounded-2xl bg-obsidian-900 border border-slate-800 p-5 space-y-3.5">
            <div className="text-xs font-mono text-emerald-400 uppercase flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" />
              Dispatch Autonomous Corridor Sortie
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Origin Merchant Rooftop Port</label>
              <select
                value={dispatchMerchantId}
                onChange={(e) => setDispatchMerchantId(e.target.value)}
                className="w-full rounded-lg bg-obsidian-950 border border-slate-700 px-3 py-2 text-xs text-white"
              >
                {network.merchantPorts.map((mp) => (
                  <option key={mp.id} value={mp.id}>
                    {mp.id} — {mp.name} ({mp.vertical})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Target Suburban Drop Zone</label>
              <select
                value={dispatchDropZoneId}
                onChange={(e) => setDispatchDropZoneId(e.target.value)}
                className="w-full rounded-lg bg-obsidian-950 border border-slate-700 px-3 py-2 text-xs text-white"
              >
                {network.dropZones.map((dz) => (
                  <option key={dz.id} value={dz.id}>
                    {dz.id} — {dz.name} ({dz.type})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={busyAction}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-semibold text-xs hover:brightness-110 transition"
            >
              Launch Autonomous Sortie
            </button>
            {dispatchFeedback && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                {dispatchFeedback}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Fleet Roster + 6.3 Maintenance & Reliability Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-2xl bg-obsidian-900 border border-slate-800 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">1:10 Remote Pilot Fleet Roster (RP-ALPHA-01)</h3>
            <span className="text-xs font-mono text-slate-400">500hr Heavy Maint Interval Tracked</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-950 text-[11px] font-mono text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Aircraft</th>
                  <th className="py-2.5 px-4">State</th>
                  <th className="py-2.5 px-4">Battery</th>
                  <th className="py-2.5 px-4">Payload</th>
                  <th className="py-2.5 px-4">Sorties</th>
                  <th className="py-2.5 px-4">Maint Airframe Hrs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 font-mono">
                {network.drones.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelectedDroneId(d.id)}
                    className={`cursor-pointer transition ${
                      d.id === selectedDrone?.id ? 'bg-cyan-500/10' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-2.5 px-4 font-semibold text-white">{d.id}</td>
                    <td className="py-2.5 px-4 text-cyan-300">{d.status}</td>
                    <td className="py-2.5 px-4 text-emerald-400">{d.batteryPct}%</td>
                    <td className="py-2.5 px-4 text-slate-300">{d.payloadKg.toFixed(1)} kg</td>
                    <td className="py-2.5 px-4 text-amber-300">{d.sortiesToday}/day</td>
                    <td className="py-2.5 px-4 text-slate-300">
                      {d.flightHoursTotal} / {d.nextHeavyMaintHr} hr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6.3 Line & Heavy Maintenance + Vertiport Charging */}
        <div className="lg:col-span-4 rounded-2xl bg-obsidian-900 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Wrench className="w-4 h-4" />
            6.3 VERTIPORT &amp; MAINTENANCE OPS
          </div>
          <h3 className="text-lg font-bold text-white">{network.vertiport.name}</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800">
              <div className="flex items-center justify-between font-mono mb-1">
                <span className="text-slate-400">3-Phase Fast Chargers (20m)</span>
                <span className="text-emerald-400 font-semibold">
                  {network.vertiport.activeChargers3Phase} / {network.vertiport.totalChargers3Phase} Active
                </span>
              </div>
              <p className="text-slate-400">Distributed 20-minute turnaround pack replenishment across hub &amp; ports.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800">
              <div className="flex items-center justify-between font-mono mb-1">
                <span className="text-slate-400">Line Maintenance (Daily)</span>
                <span className="text-cyan-300 font-semibold">10/10 Pre-Flight OK</span>
              </div>
              <p className="text-slate-400">Swappable propulsion, optical fiducial lens &amp; payload latch checks.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800">
              <div className="flex items-center justify-between font-mono mb-1">
                <span className="text-slate-400">Heavy Maintenance Cycle</span>
                <span className="text-amber-300 font-semibold">500 hr / 6 mo</span>
              </div>
              <p className="text-slate-400">
                SN-106 approaching scheduled 500hr central hub tear-down (462 hrs logged).
              </p>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 font-mono pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Dispatch Reliability: {network.dispatchReliabilityPct}% (&gt;99.5% SLA)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
