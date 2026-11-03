export interface MindmapNode {
  content: string;
  children: MindmapNode[];
  payload?: {
    tag: string;
    lines: string;
  };
}

export interface RoadmapMilestone {
  id: string;
  phaseId: string;
  title: string;
  metric: string;
  owner: string;
  completed: boolean;
  linkedModule: {
    label: string;
    href: string;
  };
}

export interface RoadmapPhase {
  id: string;
  code: string;
  year: string;
  stage: string;
  headline: string;
  capitalTarget: string;
  fleetScale: string;
  targetCostPerDelivery: string;
  milestones: RoadmapMilestone[];
}

export const MINDMAP_MARKDOWN = `# Retail & Restaurant Drone Network

## 1. Value Proposition
### 1.1 Cost Disruption
- **Current Cost:** $8–15/delivery (Gig Drivers)
- **Target Cost:** $1–3/delivery (At Scale)
- **Margin Improvement:** 3–5× Cost Reduction
- **Unit Economics:** 30+ Deliveries / Drone / Day
### 1.2 Speed & Reliability
- **ETA:** 5–15 min radius (vs 30–60 min ground)
- **Deterministic Routing:** No traffic, parking, or building access delays
- **Order Integrity:** Secure, climate-controlled payload bays
### 1.3 Merchant Benefits
- **Zero Commission Fees:** Replace 20–30% marketplace take-rates
- **Brand Ownership:** Direct customer relationship & data
- **Inventory Sync:** Real-time POS integration for stock-out prevention

## 2. Technology Stack
### 2.1 Aircraft Platform
- **Airframe:** VTOL Fixed-Wing Hybrid (Range + Precision Landing)
- **Payload:** 2–5 kg (Standard meal / grocery bag)
- **Propulsion:** Electric Ducted Fans (Low Noise < 55dB @ 50m)
- **Redundancy:** Hexa/Octo-copter motor out capability
### 2.2 Autonomy & Avionics
- **Detect-and-Avoid (DAA):** Multi-sensor fusion (Radar, Optical, ADS-B In)
- **Precision Landing:** Visual fiducials / RTK-GPS on merchant rooftops & drop zones
- **Weather Hardening:** IP54+, Wind tolerance 15m/s sustained
### 2.3 Ground Infrastructure
- **Drone Ports:** Automated battery swap + parcel load/unload (Merchant rooftop)
- **Charging Network:** Distributed 3-phase fast charge (20-min turnaround)
- **Vertiports:** Strategic hubs for fleet staging & maintenance
### 2.4 Software & Connectivity
- **Fleet OS:** Mission planning, deconfliction, health monitoring
- **Merchant API:** POS Integration (Toast, Square, Olo, Custom)
- **Customer App:** Live tracking, "Prepare Landing Zone" UI, POD (Photo on Delivery)
- **UTM Integration:** FAA UAS Service Supplier (USS) compliance

## 3. Business Model & Economics
### 3.1 Revenue Streams
- **Per-Delivery Fee:** $3–5 charged to Merchant (vs $8–15 gig)
- **Subscription:** Monthly fleet access / software seat fees
- **Data & Ads:** Aggregated demand heatmaps, promoted placement
### 3.2 Cost Structure (At Scale)
- **CapEx:** $15k–$25k / Drone (Airframe + Avionics + Port Hardware)
- **OpEx/Drone-Day:**
  - Energy: $0.50
  - Maintenance Reserve: $2.00
  - Insurance: $1.50
  - Remote Pilot Ops (1:10 ratio): $3.00
  - **Total Variable Cost:** ~$7.00 / Drone-Day → **$0.23 / Delivery (30/day)**
- **Fixed Overhead:** UTM fees, Regulatory compliance, HQ/Support
### 3.3 Unit Economic Target
- **Revenue/Delivery:** $4.00
- **Variable Cost/Delivery:** $1.50 (incl. energy, maint, pilot share)
- **Contribution Margin:** $2.50 / Delivery (62%)
- **Payback Period:** < 6 Months per Drone Asset

## 4. Market Strategy
### 4.1 Beachhead Markets
- **Density Sweet Spot:** Suburban corridors (8k–15k pop/sq mi) - Low air complexity, high car delivery cost
- **Vertical 1:** QSR Chains (High volume, standardized packaging, rooftop access)
- **Vertical 2:** Grocery / Pharmacy (High frequency, time-sensitive, larger baskets)
- **Vertical 3:** Medical Logistics (Lab samples, prescriptions - Premium pricing anchor)
### 4.2 Go-to-Market Motion
- **Pilot Programs:** "Drone Port as a Service" - Install port free, revenue share
- **Partnerships:** POS Providers (Toast/Olo), Real Estate (REITs for rooftop rights), Insurers
- **Expansion Loop:** Merchant Density → Route Density → Lower Cost → Lower Price → More Merchants
### 4.3 TAM/SAM/SOM
- **TAM:** $150B+ (US Food & Parcel Last Mile)
- **SAM:** $45B (Suburban Restaurant + Grocery < 5mi radius)
- **SOM (Yr 5):** $500M Rev (500 Drones, 15k Del/Day, 20 Metros)

## 5. Regulatory & Risk Mitigation
### 5.1 Certification Pathway
- **Phase 1 (Now):** Part 107 + Waivers (VLOS, Night, Over People) → Commercial Pilots
- **Phase 2 (Yr 2-3):** Part 135 Air Carrier Cert (Wing/UPS Flight Forward path) → BVLOS
- **Phase 3 (Yr 4+):** Type Certification + Production Cert (Scalable autonomous ops)
### 5.2 Key Waivers Required
- **BVLOS:** Shielded ops / DAA system approval
- **Operations Over People:** Kinetic energy limits / Parachute recovery
- **Night Ops:** Anti-collision lighting
- **One-to-Many:** Single Remote Pilot commanding multiple aircraft
### 5.3 Community & Safety
- **Noise Mitigation:** Propeller optimization, Flight path altitude management
- **Privacy:** No downward cameras recording property; Geofenced corridors
- **Equity:** Service commitment to food deserts / low-income corridors

## 6. Operational Model
### 6.1 Network Topology
- **Hub-and-Spoke:** Central Vertiport (Maintenance, Fleet Storage, Pilot Ops Center)
- **Merchant Nodes:** Drone Ports on Rooftops / Parking Lots (Load/Charge)
- **Drop Zones:** Curbside, Driveway Markers, Apartment Lockers, "Drone Mailboxes"
### 6.2 Fleet Operations
- **Sortie Rate:** 4 Flights/Hour × 8 Peak Hours = 32 Sorties
- **Turnaround:** 90 sec (Auto Battery Swap + Parcel Load)
- **Pilot Ratio:** 1 Remote Pilot : 10-15 Simultaneous Aircraft (BVLOS maturity)
### 6.3 Maintenance & Reliability
- **Line Maintenance:** Daily pre-flight @ Vertiport (Swappable modules)
- **Heavy Maintenance:** 500hr / 6mo intervals @ Central Hub
- **Target Dispatch Reliability:** > 99.5%

## 7. Competitive Landscape
### 7.1 Incumbents
- **DoorDash/UberEats:** High cost structure, driver shortage, no air assets
- **Wing (Alphabet) / Zipline:** Tech leaders, but locked ecosystems / Medical focus
- **Amazon Prime Air:** Massive capital, proprietary, limited merchant openness
### 7.2 Differentiation
- **Open Network:** Merchant agnostic, POS agnostic
- **Asset Light(er):** Merchant hosts Port (Real Estate), We provide Fleet/Tech
- **Suburban Focus:** Avoiding dense urban regulatory morass initially

## 8. Roadmap & Milestones
### 8.1 Year 1: Validation (Pre-Seed/Seed)
- [ ] FAA Part 135 Application Submitted
- [ ] 2 Pilot Merchants (1 QSR, 1 Grocery) + 1 Vertiport
- [ ] 500 Deliveries Flown (Safety/Noise Data)
- [ ] Unit Economics Proven < $5/Del at 10/day
### 8.2 Year 2: Density (Series A)
- [ ] Part 135 Cert Granted
- [ ] 20 Drones / 3 Metro Areas
- [ ] 150 Deliveries/Day/Drone (Network Density)
- [ ] Merchant Self-Serve Onboarding Portal Live
### 8.3 Year 3: Scale (Series B)
- [ ] Type Cert Application (Custom Airframe)
- [ ] 200 Drones / 10 Metros
- [ ] One-to-Many Pilot Ops Approved
- [ ] Positive Unit Economics ($1.50/Del)
### 8.4 Year 5: Network Effect
- [ ] 1,000+ Drones
- [ ] $500M ARR
- [ ] International Expansion (EU/Canada/AUS Reg Alignment)`;

export interface MindmapPillar {
  id: string;
  number: string;
  title: string;
  summary: string;
  linkedModule: { label: string; href: string };
  sections: {
    code: string;
    title: string;
    items: { label: string; detail: string }[];
  }[];
}

export const MINDMAP_PILLARS: MindmapPillar[] = [
  {
    id: 'value-prop',
    number: '01',
    title: 'Value Proposition',
    summary: '3–5× delivery cost reduction with 5–15 min deterministic aerial ETAs and 0% marketplace commissions.',
    linkedModule: { label: 'Unit Economics & Merchant ROI', href: '/economics' },
    sections: [
      {
        code: '1.1',
        title: 'Cost Disruption',
        items: [
          { label: 'Current Cost', detail: '$8–15/delivery (Gig Drivers)' },
          { label: 'Target Cost', detail: '$1–3/delivery (At Scale)' },
          { label: 'Margin Improvement', detail: '3–5× Cost Reduction' },
          { label: 'Unit Economics', detail: '30+ Deliveries / Drone / Day' },
        ],
      },
      {
        code: '1.2',
        title: 'Speed & Reliability',
        items: [
          { label: 'ETA', detail: '5–15 min radius (vs 30–60 min ground)' },
          { label: 'Deterministic Routing', detail: 'No traffic, parking, or building access delays' },
          { label: 'Order Integrity', detail: 'Secure, climate-controlled payload bays' },
        ],
      },
      {
        code: '1.3',
        title: 'Merchant Benefits',
        items: [
          { label: 'Zero Commission Fees', detail: 'Replace 20–30% marketplace take-rates' },
          { label: 'Brand Ownership', detail: 'Direct customer relationship & data' },
          { label: 'Inventory Sync', detail: 'Real-time POS integration for stock-out prevention' },
        ],
      },
    ],
  },
  {
    id: 'tech-stack',
    number: '02',
    title: 'Technology Stack',
    summary: 'SN-V1 Hybrid VTOL aircraft, multi-sensor DAA avionics, 90-sec swap rooftop Drone Ports, and UTM-connected Fleet OS.',
    linkedModule: { label: 'Live Fleet OS & UTM Console', href: '/fleet-os' },
    sections: [
      {
        code: '2.1',
        title: 'Aircraft Platform',
        items: [
          { label: 'Airframe', detail: 'VTOL Fixed-Wing Hybrid (Range + Precision Landing)' },
          { label: 'Payload', detail: '2–5 kg (Standard meal / grocery bag)' },
          { label: 'Propulsion', detail: 'Electric Ducted Fans (Low Noise < 55dB @ 50m)' },
          { label: 'Redundancy', detail: 'Hexa/Octo-copter motor out capability' },
        ],
      },
      {
        code: '2.2',
        title: 'Autonomy & Avionics',
        items: [
          { label: 'Detect-and-Avoid (DAA)', detail: 'Multi-sensor fusion (Radar, Optical, ADS-B In)' },
          { label: 'Precision Landing', detail: 'Visual fiducials / RTK-GPS on merchant rooftops & drop zones' },
          { label: 'Weather Hardening', detail: 'IP54+, Wind tolerance 15m/s sustained' },
        ],
      },
      {
        code: '2.3',
        title: 'Ground Infrastructure',
        items: [
          { label: 'Drone Ports', detail: 'Automated battery swap + parcel load/unload (Merchant rooftop)' },
          { label: 'Charging Network', detail: 'Distributed 3-phase fast charge (20-min turnaround)' },
          { label: 'Vertiports', detail: 'Strategic hubs for fleet staging & maintenance' },
        ],
      },
      {
        code: '2.4',
        title: 'Software & Connectivity',
        items: [
          { label: 'Fleet OS', detail: 'Mission planning, deconfliction, health monitoring' },
          { label: 'Merchant API', detail: 'POS Integration (Toast, Square, Olo, Custom)' },
          { label: 'Customer App', detail: 'Live tracking, "Prepare Landing Zone" UI, POD (Photo on Delivery)' },
          { label: 'UTM Integration', detail: 'FAA UAS Service Supplier (USS) compliance' },
        ],
      },
    ],
  },
  {
    id: 'business-model',
    number: '03',
    title: 'Business Model & Economics',
    summary: '$4.00 target revenue/delivery against $1.50 loaded variable cost (62% contribution margin) and <6 month drone payback.',
    linkedModule: { label: 'Interactive Financial Simulator', href: '/economics' },
    sections: [
      {
        code: '3.1',
        title: 'Revenue Streams',
        items: [
          { label: 'Per-Delivery Fee', detail: '$3–5 charged to Merchant (vs $8–15 gig)' },
          { label: 'Subscription', detail: 'Monthly fleet access / software seat fees' },
          { label: 'Data & Ads', detail: 'Aggregated demand heatmaps, promoted placement' },
        ],
      },
      {
        code: '3.2',
        title: 'Cost Structure (At Scale)',
        items: [
          { label: 'CapEx', detail: '$15k–$25k / Drone (Airframe + Avionics + Port Hardware)' },
          { label: 'Daily OpEx Breakdown', detail: 'Energy $0.50 + Maint $2.00 + Insurance $1.50 + Pilot (1:10) $3.00 = ~$7.00/day ($0.23/del @ 30/day)' },
          { label: 'Fixed Overhead', detail: 'UTM fees, Regulatory compliance, HQ/Support' },
        ],
      },
      {
        code: '3.3',
        title: 'Unit Economic Target',
        items: [
          { label: 'Revenue/Delivery', detail: '$4.00' },
          { label: 'Variable Cost/Delivery', detail: '$1.50 (incl. energy, maint, pilot share, port ops)' },
          { label: 'Contribution Margin', detail: '$2.50 / Delivery (62%)' },
          { label: 'Payback Period', detail: '< 6 Months per Drone Asset' },
        ],
      },
    ],
  },
  {
    id: 'market-strategy',
    number: '04',
    title: 'Market Strategy',
    summary: 'Suburban corridors (8k–15k pop/sq mi) beachhead across QSR, Grocery/Pharmacy & Medical in a $150B+ TAM.',
    linkedModule: { label: 'Merchant Portal & POS Sandbox', href: '/merchant' },
    sections: [
      {
        code: '4.1',
        title: 'Beachhead Markets',
        items: [
          { label: 'Density Sweet Spot', detail: 'Suburban corridors (8k–15k pop/sq mi) - Low air complexity, high car delivery cost' },
          { label: 'Vertical 1', detail: 'QSR Chains (High volume, standardized packaging, rooftop access)' },
          { label: 'Vertical 2', detail: 'Grocery / Pharmacy (High frequency, time-sensitive, larger baskets)' },
          { label: 'Vertical 3', detail: 'Medical Logistics (Lab samples, prescriptions - Premium pricing anchor)' },
        ],
      },
      {
        code: '4.2',
        title: 'Go-to-Market Motion',
        items: [
          { label: 'Pilot Programs', detail: '"Drone Port as a Service" - Install port free, revenue share' },
          { label: 'Partnerships', detail: 'POS Providers (Toast/Olo), Real Estate (REITs for rooftop rights), Insurers' },
          { label: 'Expansion Loop', detail: 'Merchant Density → Route Density → Lower Cost → Lower Price → More Merchants' },
        ],
      },
      {
        code: '4.3',
        title: 'TAM / SAM / SOM',
        items: [
          { label: 'TAM', detail: '$150B+ (US Food & Parcel Last Mile)' },
          { label: 'SAM', detail: '$45B (Suburban Restaurant + Grocery < 5mi radius)' },
          { label: 'SOM (Yr 5)', detail: '$500M Rev (500–1,000+ Drones, 15k+ Del/Day, 20 Metros)' },
        ],
      },
    ],
  },
  {
    id: 'regulatory',
    number: '05',
    title: 'Regulatory & Risk Mitigation',
    summary: 'Staged FAA Part 107 → Part 135 Air Carrier → Type Certification pathway with acoustic, privacy, and equity safeguards.',
    linkedModule: { label: 'FAA Cert & Roadmap Center', href: '/roadmap' },
    sections: [
      {
        code: '5.1',
        title: 'Certification Pathway',
        items: [
          { label: 'Phase 1 (Now)', detail: 'Part 107 + Waivers (VLOS, Night, Over People) → Commercial Pilots' },
          { label: 'Phase 2 (Yr 2-3)', detail: 'Part 135 Air Carrier Cert (Wing/UPS Flight Forward path) → BVLOS' },
          { label: 'Phase 3 (Yr 4+)', detail: 'Type Certification + Production Cert (Scalable autonomous ops)' },
        ],
      },
      {
        code: '5.2',
        title: 'Key Waivers Required',
        items: [
          { label: 'BVLOS', detail: 'Shielded ops / DAA system approval' },
          { label: 'Operations Over People', detail: 'Kinetic energy limits / Parachute recovery' },
          { label: 'Night Ops', detail: 'Anti-collision lighting' },
          { label: 'One-to-Many', detail: 'Single Remote Pilot commanding multiple aircraft' },
        ],
      },
      {
        code: '5.3',
        title: 'Community & Safety',
        items: [
          { label: 'Noise Mitigation', detail: 'Propeller optimization, Flight path altitude management (<55dB @ 50m)' },
          { label: 'Privacy', detail: 'No downward cameras recording property; Geofenced corridors' },
          { label: 'Equity', detail: 'Service commitment to food deserts / low-income corridors' },
        ],
      },
    ],
  },
  {
    id: 'operations',
    number: '06',
    title: 'Operational Model',
    summary: 'Hub-and-spoke Vertiports + Merchant Rooftop Ports executing 32 peak sorties/day with 90-second turnarounds and >99.5% reliability.',
    linkedModule: { label: 'Fleet OS & Vertiport Ops', href: '/fleet-os' },
    sections: [
      {
        code: '6.1',
        title: 'Network Topology',
        items: [
          { label: 'Hub-and-Spoke', detail: 'Central Vertiport (Maintenance, Fleet Storage, Pilot Ops Center)' },
          { label: 'Merchant Nodes', detail: 'Drone Ports on Rooftops / Parking Lots (Load/Charge)' },
          { label: 'Drop Zones', detail: 'Curbside, Driveway Markers, Apartment Lockers, "Drone Mailboxes"' },
        ],
      },
      {
        code: '6.2',
        title: 'Fleet Operations',
        items: [
          { label: 'Sortie Rate', detail: '4 Flights/Hour × 8 Peak Hours = 32 Sorties' },
          { label: 'Turnaround', detail: '90 sec (Auto Battery Swap + Parcel Load)' },
          { label: 'Pilot Ratio', detail: '1 Remote Pilot : 10-15 Simultaneous Aircraft (BVLOS maturity)' },
        ],
      },
      {
        code: '6.3',
        title: 'Maintenance & Reliability',
        items: [
          { label: 'Line Maintenance', detail: 'Daily pre-flight @ Vertiport (Swappable modules)' },
          { label: 'Heavy Maintenance', detail: '500hr / 6mo intervals @ Central Hub' },
          { label: 'Target Dispatch Reliability', detail: '> 99.5%' },
        ],
      },
    ],
  },
  {
    id: 'competitive',
    number: '07',
    title: 'Competitive Landscape',
    summary: 'Open, POS-agnostic, asset-lighter suburban aerial network vs high-cost gig apps and closed vertical drone silos.',
    linkedModule: { label: 'Executive Competitive Matrix', href: '/' },
    sections: [
      {
        code: '7.1',
        title: 'Incumbents',
        items: [
          { label: 'DoorDash / UberEats', detail: 'High cost structure ($8–15/del), driver shortage, no air assets' },
          { label: 'Wing (Alphabet) / Zipline', detail: 'Tech leaders, but locked ecosystems / Medical focus' },
          { label: 'Amazon Prime Air', detail: 'Massive capital, proprietary, limited merchant openness' },
        ],
      },
      {
        code: '7.2',
        title: 'Differentiation',
        items: [
          { label: 'Open Network', detail: 'Merchant agnostic, POS agnostic (Toast, Square, Olo, Custom)' },
          { label: 'Asset Light(er)', detail: 'Merchant hosts Port (Real Estate), SkyNest provides Fleet/Tech' },
          { label: 'Suburban Focus', detail: 'Avoiding dense urban regulatory morass initially (8k–15k pop/sq mi)' },
        ],
      },
    ],
  },
  {
    id: 'roadmap',
    number: '08',
    title: 'Roadmap & Milestones',
    summary: 'Disciplined 5-year execution plan from Part 135 Seed validation to 1,000+ drones and $500M ARR.',
    linkedModule: { label: 'Interactive Milestone Tracker', href: '/roadmap' },
    sections: [
      {
        code: '8.1',
        title: 'Year 1: Validation (Pre-Seed/Seed)',
        items: [
          { label: 'Regulatory', detail: 'FAA Part 135 Application Submitted' },
          { label: 'Footprint', detail: '2 Pilot Merchants (1 QSR, 1 Grocery) + 1 Vertiport' },
          { label: 'Flight Validation', detail: '500 Deliveries Flown (Safety/Noise Data)' },
          { label: 'Unit Economics', detail: 'Unit Economics Proven < $5/Del at 10/day' },
        ],
      },
      {
        code: '8.2',
        title: 'Year 2: Density (Series A)',
        items: [
          { label: 'Certification', detail: 'Part 135 Cert Granted' },
          { label: 'Expansion', detail: '20 Drones / 3 Metro Areas' },
          { label: 'Density', detail: '150 Deliveries/Day/Drone (Network Density)' },
          { label: 'Platform', detail: 'Merchant Self-Serve Onboarding Portal Live' },
        ],
      },
      {
        code: '8.3',
        title: 'Year 3: Scale (Series B)',
        items: [
          { label: 'Airworthiness', detail: 'Type Cert Application (Custom Airframe)' },
          { label: 'Scale', detail: '200 Drones / 10 Metros' },
          { label: 'Autonomy', detail: 'One-to-Many Pilot Ops Approved' },
          { label: 'Profitability', detail: 'Positive Unit Economics ($1.50/Del)' },
        ],
      },
      {
        code: '8.4',
        title: 'Year 5: Network Effect',
        items: [
          { label: 'Fleet Size', detail: '1,000+ Drones' },
          { label: 'Revenue Scale', detail: '$500M ARR' },
          { label: 'Global', detail: 'International Expansion (EU/Canada/AUS Reg Alignment)' },
        ],
      },
    ],
  },
];

export const INITIAL_ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'year-1',
    code: '8.1',
    year: 'Year 1',
    stage: 'Validation (Pre-Seed / Seed)',
    headline: 'Prove commercial safety, <55dB acoustic profile, and sub-$5/delivery pilot unit economics in 1 suburban corridor.',
    capitalTarget: '$4.5M Seed',
    fleetScale: '4–6 SN-V1 Drones · 1 Vertiport · 2+ Pilot Ports',
    targetCostPerDelivery: '< $5.00 / Del (@ 10/day)',
    milestones: [
      {
        id: 'm-1-1',
        phaseId: 'year-1',
        title: 'FAA Part 135 Application Submitted',
        metric: 'Part 107 Waivers Active + Part 135 Pre-App Docket Filed',
        owner: 'Flight Ops & Regulatory',
        completed: true,
        linkedModule: { label: 'FAA Compliance Dossier', href: '/roadmap#regulatory' },
      },
      {
        id: 'm-1-2',
        phaseId: 'year-1',
        title: '2 Pilot Merchants (1 QSR, 1 Grocery) + 1 Vertiport',
        metric: 'VP-DFW-01 + Firebird QSR + FreshMarket Rooftop Ports Live',
        owner: 'Ground Infrastructure & GTM',
        completed: true,
        linkedModule: { label: 'View Live Corridor Nodes', href: '/fleet-os' },
      },
      {
        id: 'm-1-3',
        phaseId: 'year-1',
        title: '500 Deliveries Flown (Safety/Noise Data)',
        metric: '518 Sorties · 51.4 dB @ 50m · 99.7% Dispatch Reliability',
        owner: 'Avionics & Safety Assurance',
        completed: true,
        linkedModule: { label: 'Inspect Fleet Telemetry', href: '/fleet-os' },
      },
      {
        id: 'm-1-4',
        phaseId: 'year-1',
        title: 'Unit Economics Proven < $5/Del at 10/day',
        metric: '$4.38/Del Verified in Pilot Sortie Cohort',
        owner: 'Finance & Fleet Ops',
        completed: false,
        linkedModule: { label: 'Model in Unit Economics Sim', href: '/economics' },
      },
    ],
  },
  {
    id: 'year-2',
    code: '8.2',
    year: 'Year 2',
    stage: 'Density (Series A)',
    headline: 'Unlock Part 135 BVLOS commercial air carrier operations and scale route density across 3 suburban metros.',
    capitalTarget: '$22M Series A',
    fleetScale: '20 Drones · 3 Metro Areas · 25+ Rooftop Ports',
    targetCostPerDelivery: '$2.65 / Del',
    milestones: [
      {
        id: 'm-2-1',
        phaseId: 'year-2',
        title: 'Part 135 Cert Granted',
        metric: 'FAA Standard Part 135 Air Carrier Certificate (BVLOS)',
        owner: 'Regulatory & Flight Standards',
        completed: false,
        linkedModule: { label: 'Part 135 Pathway', href: '/roadmap#regulatory' },
      },
      {
        id: 'm-2-2',
        phaseId: 'year-2',
        title: '20 Drones / 3 Metro Areas',
        metric: 'DFW, Phoenix East Valley, Charlotte Suburban Corridors',
        owner: 'Network Deployment',
        completed: false,
        linkedModule: { label: 'Fleet OS Topology', href: '/fleet-os' },
      },
      {
        id: 'm-2-3',
        phaseId: 'year-2',
        title: '150 Deliveries/Day/Drone (Network Density)',
        metric: 'High-density multi-merchant corridor batching & 90s swaps',
        owner: 'Fleet OS & Dispatch AI',
        completed: false,
        linkedModule: { label: 'Simulate Sortie Density', href: '/economics' },
      },
      {
        id: 'm-2-4',
        phaseId: 'year-2',
        title: 'Merchant Self-Serve Onboarding Portal Live',
        metric: 'Toast, Square & Olo 1-Click POS + Rooftop Port Wizard',
        owner: 'Merchant Platform Engineering',
        completed: false,
        linkedModule: { label: 'Open Self-Serve Portal', href: '/merchant' },
      },
    ],
  },
  {
    id: 'year-3',
    code: '8.3',
    year: 'Year 3',
    stage: 'Scale (Series B)',
    headline: 'Approve 1:10+ One-to-Many Remote Pilot operations and hit $1.50/delivery positive unit economics across 10 metros.',
    capitalTarget: '$75M Series B',
    fleetScale: '200 Drones · 10 Metros · 1:10–1:15 Pilot Ratio',
    targetCostPerDelivery: '$1.50 / Del (62% CM)',
    milestones: [
      {
        id: 'm-3-1',
        phaseId: 'year-3',
        title: 'Type Cert Application (Custom Airframe)',
        metric: 'SN-V2 Production Airframe 14 CFR §21.17(b) Type Cert Docket',
        owner: 'Aerospace Engineering',
        completed: false,
        linkedModule: { label: 'Aircraft Specs', href: '/#tech-stack' },
      },
      {
        id: 'm-3-2',
        phaseId: 'year-3',
        title: '200 Drones / 10 Metros',
        metric: '6,000+ Daily Sorties Across Sunbelt & Midwest Suburbs',
        owner: 'Operations & Manufacturing',
        completed: false,
        linkedModule: { label: 'Scale Trajectory Chart', href: '/economics' },
      },
      {
        id: 'm-3-3',
        phaseId: 'year-3',
        title: 'One-to-Many Pilot Ops Approved',
        metric: '1 Remote Pilot : 10–15 Simultaneous BVLOS Aircraft ($3/day)',
        owner: 'Autonomy & Avionics',
        completed: false,
        linkedModule: { label: '1:10 Pilot Console', href: '/fleet-os' },
      },
      {
        id: 'm-3-4',
        phaseId: 'year-3',
        title: 'Positive Unit Economics ($1.50/Del)',
        metric: '$4.00 Rev - $1.50 Var Cost = $2.50 CM (62%) · <6 Mo Payback',
        owner: 'Executive & Finance',
        completed: false,
        linkedModule: { label: 'Verify $1.50 Target Model', href: '/economics' },
      },
    ],
  },
  {
    id: 'year-5',
    code: '8.4',
    year: 'Year 5',
    stage: 'Network Effect',
    headline: 'Category-defining autonomous suburban logistics utility capturing $500M ARR and international airspace alignment.',
    capitalTarget: 'Growth / Cash-Flow Self-Funding',
    fleetScale: '1,000+ Drones · 20+ US Metros + EU/CA/AUS',
    targetCostPerDelivery: '$1.10 – $1.50 / Del',
    milestones: [
      {
        id: 'm-5-1',
        phaseId: 'year-5',
        title: '1,000+ Drones',
        metric: '30,000+ Autonomous Deliveries / Day · Production Cert Active',
        owner: 'Manufacturing & Fleet Ops',
        completed: false,
        linkedModule: { label: 'Year 5 Fleet Projections', href: '/economics' },
      },
      {
        id: 'm-5-2',
        phaseId: 'year-5',
        title: '$500M ARR',
        metric: 'Delivery Fees + Fleet Subscriptions + Demand Heatmap Ads',
        owner: 'Commercial & Partnerships',
        completed: false,
        linkedModule: { label: 'TAM/SAM/SOM Model', href: '/economics' },
      },
      {
        id: 'm-5-3',
        phaseId: 'year-5',
        title: 'International Expansion (EU/Canada/AUS Reg Alignment)',
        metric: 'EASA SORA SAIL III / Transport Canada / CASA BVLOS Corridors',
        owner: 'Global Regulatory Affairs',
        completed: false,
        linkedModule: { label: 'Regulatory Alignment', href: '/roadmap#regulatory' },
      },
    ],
  },
];
