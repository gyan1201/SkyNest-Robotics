'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Code2,
  Database,
  DollarSign,
  Flame,
  Layers,
  Send,
  ShieldCheck,
  Store,
  Zap,
} from 'lucide-react';
import type { MerchantPort, NetworkState, POSProvider, VerticalType } from '@/lib/networkStore';

type ActiveTab = 'pos-sandbox' | 'onboarding' | 'heatmaps';

export default function MerchantPortalPage() {
  const [tab, setTab] = useState<ActiveTab>('pos-sandbox');
  const [network, setNetwork] = useState<NetworkState | null>(null);

  // POS Sandbox state
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('PORT-QSR-01');
  const [selectedSku, setSelectedSku] = useState<string>('FB-COMBO-01');
  const [selectedDropZoneId, setSelectedDropZoneId] = useState<string>('DZ-101');
  const [posOverride, setPosOverride] = useState<POSProvider>('Toast');
  const [apiResponse, setApiResponse] = useState<Record<string, unknown> | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Self-Serve Onboarding Wizard state (Mind Map 4.2 & 8.2)
  const [storeName, setStoreName] = useState<string>('Sunbelt Fresh Burgers #08');
  const [vertical, setVertical] = useState<VerticalType>('QSR Chain');
  const [posChoice, setPosChoice] = useState<POSProvider>('Toast');
  const [mountSurface, setMountSurface] = useState<'Flat Commercial Rooftop' | 'Parking Lot Smart Canopy'>(
    'Flat Commercial Rooftop'
  );
  const [dailyVolumeEst, setDailyVolumeEst] = useState<number>(65);
  const [avgTicketUsd, setAvgTicketUsd] = useState<number>(32);
  const [onboardSuccess, setOnboardSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/network')
      .then((r) => r.json())
      .then((data: NetworkState) => {
        setNetwork(data);
      })
      .catch(() => {});
  }, []);

  const currentMerchant: MerchantPort | undefined =
    network?.merchantPorts.find((m) => m.id === selectedMerchantId) || network?.merchantPorts[0];

  function handleMerchantChange(id: string) {
    setSelectedMerchantId(id);
    const m = network?.merchantPorts.find((p) => p.id === id);
    if (m) {
      setPosOverride(m.posProvider);
      if (m.inventoryItems[0]) {
        setSelectedSku(m.inventoryItems[0].sku);
      }
    }
    setApiResponse(null);
    setApiError(null);
  }

  async function firePosWebhook() {
    setSubmitting(true);
    setApiError(null);
    setApiResponse(null);
    try {
      const res = await fetch('/api/pos/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: selectedMerchantId,
          sku: selectedSku,
          dropZoneId: selectedDropZoneId,
          posProvider: posOverride,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setApiError(data.error || 'POS order rejected');
      } else {
        setApiResponse(data);
        // Refresh network state
        const netRes = await fetch('/api/network');
        if (netRes.ok) setNetwork(await netRes.json());
      }
    } finally {
      setSubmitting(false);
    }
  }

  const selectedItem = currentMerchant?.inventoryItems.find((i) => i.sku === selectedSku);
  const sampleTicket = selectedItem?.priceUsd || 34.0;
  const marketplaceTakeUsd = sampleTicket * 0.28; // 28% avg DoorDash/UberEats commission
  const gigFeeUsd = 11.5;
  const skynestFlatFeeUsd = 4.0;

  // Onboarding savings calculation
  const monthlyMarketplaceCost = dailyVolumeEst * 30 * (avgTicketUsd * 0.26);
  const monthlySkynestCost = dailyVolumeEst * 30 * 4.0 + 299; // $4/del + $299 Fleet SaaS seat
  const monthlyNetSavings = Math.max(0, monthlyMarketplaceCost - monthlySkynestCost);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Store className="w-3.5 h-3.5" />
            MIND MAP 1.3 · 2.4 · 3.1 · 4.2 · 8.2 — OPEN MERCHANT PORTAL &amp; POS API
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Zero-Commission Merchant Hub &amp; POS Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Replace 20–30% marketplace take-rates with flat $3–5 autonomous aerial delivery, 100% direct customer data
            ownership, and real-time POS stock-out prevention.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'pos-sandbox', label: 'POS Webhook Sandbox (Toast/Square/Olo)' },
            { id: 'onboarding', label: 'Self-Serve Port Onboarding ($0 Install)' },
            { id: 'heatmaps', label: 'Demand Heatmaps & Ads (3.1)' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id as ActiveTab)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono transition ${
                tab === t.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-obsidian-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: LIVE POS WEBHOOK SANDBOX */}
      {tab === 'pos-sandbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left POS Configurator */}
          <div className="lg:col-span-7 rounded-2xl bg-obsidian-900 border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-cyan-400">2.4 OPEN MERCHANT API</div>
                <h2 className="text-lg font-bold text-white">Simulate Live POS Order &amp; Inventory Sync</h2>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                0% COMMISSION
              </span>
            </div>

            {/* POS Provider Pills */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">POS Integration Adapter</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Toast', 'Square', 'Olo', 'Custom API'] as POSProvider[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPosOverride(p)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono border transition ${
                      posOverride === p
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 font-semibold'
                        : 'bg-obsidian-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Merchant Node Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Merchant Rooftop Port</label>
                <select
                  value={selectedMerchantId}
                  onChange={(e) => handleMerchantChange(e.target.value)}
                  className="w-full rounded-lg bg-obsidian-950 border border-slate-700 px-3 py-2.5 text-xs text-white"
                >
                  {network?.merchantPorts.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.vertical})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Customer Drop Zone</label>
                <select
                  value={selectedDropZoneId}
                  onChange={(e) => setSelectedDropZoneId(e.target.value)}
                  className="w-full rounded-lg bg-obsidian-950 border border-slate-700 px-3 py-2.5 text-xs text-white"
                >
                  {network?.dropZones.map((dz) => (
                    <option key={dz.id} value={dz.id}>
                      {dz.name} ({dz.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Real-Time POS Inventory Items (Includes Stock-Out Guard Test!) */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">
                Real-Time Synced Catalog (Select out-of-stock item to test Stock-Out Prevention Guard)
              </label>
              <div className="space-y-2">
                {currentMerchant?.inventoryItems.map((item) => (
                  <label
                    key={item.sku}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      selectedSku === item.sku
                        ? 'bg-cyan-500/10 border-cyan-400/60'
                        : 'bg-obsidian-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="sku"
                        checked={selectedSku === item.sku}
                        onChange={() => setSelectedSku(item.sku)}
                        className="accent-cyan-400"
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white">{item.name}</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          SKU: {item.sku} · {item.weightKg} kg · Bay: {item.tempZone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-sm font-semibold text-white">${item.priceUsd.toFixed(2)}</div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          item.inStock
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {item.inStock ? `${item.stockCount} IN STOCK` : 'STOCK-OUT (0)'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Unit Economics Comparison Box */}
            <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/25">
                <div className="font-mono text-rose-300 mb-1">LEGACY GIG MARKETPLACE</div>
                <div className="flex justify-between text-slate-300">
                  <span>28% Marketplace Commission:</span>
                  <span className="font-mono text-rose-400">-${marketplaceTakeUsd.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300 mt-1">
                  <span>Gig Driver Delivery Cost:</span>
                  <span className="font-mono text-rose-400">${gigFeeUsd.toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">Customer data owned by 3rd-party app</div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                <div className="font-mono text-emerald-300 mb-1">SKYNEST OPEN NETWORK</div>
                <div className="flex justify-between text-slate-200">
                  <span>Marketplace Commission:</span>
                  <span className="font-mono text-emerald-400 font-bold">$0.00 (0%)</span>
                </div>
                <div className="flex justify-between text-slate-200 mt-1">
                  <span>Flat Aerial Delivery Fee:</span>
                  <span className="font-mono text-emerald-400 font-bold">${skynestFlatFeeUsd.toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-emerald-300/90 mt-2">100% Direct Brand &amp; Customer Data</div>
              </div>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={firePosWebhook}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Dispatching via POS Webhook...' : `Fire ${posOverride} Webhook & Auto-Dispatch Drone`}
            </button>
          </div>

          {/* Right Live JSON Payload & API Response Inspector */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-cyan-300">
                  <Code2 className="w-4 h-4" />
                  POST /api/pos/orders
                </span>
                <span>JSON PAYLOAD</span>
              </div>
              <pre className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                {JSON.stringify(
                  {
                    posProvider: posOverride,
                    merchantId: selectedMerchantId,
                    sku: selectedSku,
                    dropZoneId: selectedDropZoneId,
                    commissionRate: 0.0,
                    directBrandCrmSync: true,
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            {apiError && (
              <div className="rounded-2xl bg-rose-950/30 border border-rose-500/40 p-5 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-mono text-xs font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  POS INVENTORY SYNC STOCK-OUT GUARD TRIGGERED
                </div>
                <p className="text-xs text-rose-200 leading-relaxed">{apiError}</p>
              </div>
            )}

            {apiResponse && (
              <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/40 p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  WEBHOOK ACCEPTED · DRONE LAUNCHED FROM ROOFTOP PORT
                </div>
                <pre className="p-3.5 rounded-xl bg-obsidian-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-72">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}

            <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-5 space-y-2.5 text-xs text-slate-300">
              <div className="font-mono text-slate-400 uppercase text-[11px] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                Supported Open Network Integrations
              </div>
              <p className="text-slate-400 leading-relaxed">
                Unlike closed ecosystems (Amazon Prime Air / proprietary silos), SkyNest connects directly to existing
                QSR, grocery, and pharmacy POS stacks in under 15 minutes with automatic rooftop parcel queue routing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SELF-SERVE ONBOARDING WIZARD ("DRONE PORT AS A SERVICE") */}
      {tab === 'onboarding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl bg-obsidian-900 border border-slate-800 p-6 space-y-5">
            <div>
              <div className="text-xs font-mono text-emerald-400">
                4.2 &ldquo;DRONE PORT AS A SERVICE&rdquo; · 8.2 SELF-SERVE ONBOARDING PORTAL
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Install Automated Rooftop Drone Port for $0 Upfront
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Merchant provides rooftop or parking-lot footprint (REIT pre-approved); SkyNest installs the 90-second
                auto-swap Drone Port free under a low per-delivery + SaaS seat agreement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Merchant / Chain Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-lg bg-obsidian-950 border border-slate-700 px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Beachhead Vertical (4.1)</label>
                <select
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value as VerticalType)}
                  className="w-full rounded-lg bg-obsidian-950 border border-slate-700 px-3 py-2 text-xs text-white"
                >
                  <option value="QSR Chain">Vertical 1: QSR Chain</option>
                  <option value="Grocery / Pharmacy">Vertical 2: Grocery / Pharmacy</option>
                  <option value="Medical Logistics">Vertical 3: Medical Logistics (Rx/Lab)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Port Mounting Footprint</label>
                <select
                  value={mountSurface}
                  onChange={(e) =>
                    setMountSurface(e.target.value as 'Flat Commercial Rooftop' | 'Parking Lot Smart Canopy')
                  }
                  className="w-full rounded-lg bg-obsidian-950 border border-slate-700 px-3 py-2 text-xs text-white"
                >
                  <option value="Flat Commercial Rooftop">Flat Commercial Rooftop (RTK Fiducial Pad)</option>
                  <option value="Parking Lot Smart Canopy">2-Spot Parking Lot Smart Canopy</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">POS Connector</label>
                <select
                  value={posChoice}
                  onChange={(e) => setPosChoice(e.target.value as POSProvider)}
                  className="w-full rounded-lg bg-obsidian-950 border border-slate-700 px-3 py-2 text-xs text-white"
                >
                  <option value="Toast">Toast POS</option>
                  <option value="Square">Square for Retail / Restaurants</option>
                  <option value="Olo">Olo Enterprise</option>
                  <option value="Custom API">Custom REST / HL7 Webhook</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Est. Daily Delivery Orders</span>
                  <span className="text-cyan-300">{dailyVolumeEst} orders/day</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={200}
                  value={dailyVolumeEst}
                  onChange={(e) => setDailyVolumeEst(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Average Basket Value</span>
                  <span className="text-emerald-300">${avgTicketUsd}</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={120}
                  value={avgTicketUsd}
                  onChange={(e) => setAvgTicketUsd(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOnboardSuccess(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-semibold text-sm hover:brightness-110 transition"
            >
              Reserve Free Rooftop Drone Port &amp; Generate RTK Site Survey
            </button>

            {onboardSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-xs space-y-1.5">
                <div className="font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  PORT RESERVATION CONFIRMED FOR {storeName.toUpperCase()}
                </div>
                <p className="text-slate-200">
                  Assigned {mountSurface} kit + 3-phase 20-min fast charger + {posChoice} OAuth token. Hardware CapEx to
                  Merchant: <strong>$0.00</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Right Live Merchant Savings Calculator */}
          <div className="lg:col-span-5 rounded-2xl bg-obsidian-900 border border-slate-800 p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                Projected Monthly Store Margin Recovery
              </div>
              <h3 className="text-xl font-bold text-white">{storeName}</h3>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly 3rd-Party Commission (26%):</span>
                  <span className="font-mono text-rose-400 font-semibold">
                    ${Math.round(monthlyMarketplaceCost).toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SkyNest ($4/del + $299 Fleet Seat):</span>
                  <span className="font-mono text-cyan-300 font-semibold">
                    ${Math.round(monthlySkynestCost).toLocaleString()}/mo
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-white font-semibold">Net Store Profit Saved:</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    +${Math.round(monthlyNetSavings).toLocaleString()}/mo
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>REIT-compliant non-penetrating rooftop ballast frame</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>90-second automated battery swap + parcel bay loading</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Aviation hull &amp; 3rd-party liability policy included</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-200">
              Annualized Single-Location Savings: +${Math.round(monthlyNetSavings * 12).toLocaleString()} / yr
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DEMAND HEATMAPS & PROMOTED PLACEMENT (MIND MAP 3.1) */}
      {tab === 'heatmaps' && (
        <div className="rounded-2xl bg-obsidian-900 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                3.1 REVENUE STREAM #3 · AGGREGATED SUBURBAN DEMAND HEATMAPS &amp; PROMOTED PLACEMENT
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Suburban Corridor Aerial Demand Intelligence (8k–15k pop/sq mi)
              </h2>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs font-mono text-amber-300">
              HIGH-MARGIN SAAS &amp; ADS LAYER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                zone: 'North Plano Family Suburbs',
                peakWindow: '5:30 PM – 8:30 PM',
                topCategory: 'QSR Family Bundles (2.6 kg)',
                unmetDemandIdx: '94 / 100',
                sponsoredSlot: 'Firebird Craft Grill (+38% Lift)',
              },
              {
                zone: 'West Legacy Townhomes',
                peakWindow: '11:30 AM – 1:30 PM',
                topCategory: 'Fast-Casual Bowls & Cold Brew',
                unmetDemandIdx: '89 / 100',
                sponsoredSlot: 'FreshMarket Express (+29% Lift)',
              },
              {
                zone: 'East Ridge <5mi Perimeter',
                peakWindow: '7:00 AM – 10:00 AM',
                topCategory: 'Urgent Rx & Baby Essentials',
                unmetDemandIdx: '91 / 100',
                sponsoredSlot: 'CarePlus Urgent Rx (Anchor)',
              },
              {
                zone: 'South Equity Corridor',
                peakWindow: '4:00 PM – 8:00 PM',
                topCategory: 'Fresh Produce & Staples (4.2 kg)',
                unmetDemandIdx: '97 / 100',
                sponsoredSlot: 'Zero-Markup Community Equity Slot',
              },
            ].map((cell) => (
              <div key={cell.zone} className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-300 inline-flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> {cell.unmetDemandIdx}
                  </span>
                  <span className="text-slate-500">{cell.peakWindow}</span>
                </div>
                <h3 className="font-bold text-white text-sm">{cell.zone}</h3>
                <p className="text-xs text-slate-400">Top Basket: {cell.topCategory}</p>
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-300">
                  {cell.sponsoredSlot}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
