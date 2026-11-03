# SkyNest Robotics — Retail & Restaurant Drone Network

> **Replaces:** Gig delivery drivers (`$8–$15` per delivery, `30–60 min` ETAs, `20–30%` marketplace commissions).  
> **Economics:** At scale, **`$1–$3` per delivery** (`$1.50` loaded target; `$0.23` pure daily fleet OpEx) with **`30+` deliveries per drone-day**.  
> **Impact:** **3–5× cost reduction** across a **$150B+ US last-mile delivery market** (`$45B` suburban SAM → `$500M` Year 5 ARR).

---

## Architecture & Interactive Platform Modules

This repository implements the complete **SkyNest Robotics** full-stack operating system, commercial portals, financial simulator, and canonical Mind Map & 5-Year Roadmap:

| Route | Module | Mind Map Alignment |
|---|---|---|
| `/` | **Executive & Company Hub** | Value Proposition (`1.1–1.3`), Hardware & Rooftop Port Specs (`2.1–2.4`), Beachhead Strategy (`4.1–4.3`), Incumbent Comparison (`7.1–7.2`) |
| `/fleet-os` | **Fleet OS, UTM & 1:10 Remote Pilot Console** | Live Hub-and-Spoke Suburban Airspace Map (`6.1`), `1:10` BVLOS Pilot Roster (`6.2`), Hexa/Octo Motor-Out & Radar/Optical/ADS-B DAA Sim (`2.1–2.2`), 90s Auto-Swap & 500hr Maintenance (`6.3`) |
| `/merchant` | **Open Merchant Portal & POS API Sandbox** | Live **Toast / Square / Olo / Custom** Webhook Simulator (`POST /api/pos/orders`), Stock-Out Guard (`1.3`), Free "Drone Port as a Service" Onboarding Wizard (`4.2`, `8.2`), Demand Heatmaps (`3.1`) |
| `/customer` | **Customer Live Tracking, Landing Zone UI & POD** | `5–15 min` Deterministic ETA, Climate Bay Telemetry (`1.2`), Interactive "Prepare Landing Zone" Calibration (`Driveway`, `Curbside`, `Locker`, `Drone Mailbox`), Privacy Lock (`5.3`), Photo-on-Delivery (`2.4`) |
| `/economics` | **Interactive Unit Economics & ARR Simulator** | Dynamic sliders modeling `$15k–$25k` CapEx, `$7.00/day` Fleet OpEx (`$0.23/del`), `$1.50` Loaded Cost, `$4.00` Fee (`62%` Contribution Margin), `<6 Mo` Payback (`3.1–3.3`), and Year 1 → Year 5 `$500M ARR` |
| `/roadmap` | **Canonical Mind Map Explorer, Milestones & FAA Dossier** | Interactive 8-Pillar Mind Map Explorer (`mindmap/mindmap.json` & `mindmap.md`), Checkable Year 1–5 Milestones (`8.1–8.4`), and Part 107 → Part 135 → Type Cert Regulatory Matrix (`5.1–5.3`) |

---

## Repository Blueprint & Canonical Mind Map Files

- `mindmap/mindmap.md` — Exact canonical Markdown company blueprint & roadmap
- `mindmap/mindmap.json` — Exact structured JSON mind map hierarchy
- `mindmap/interactive-mindmap.html` (also served at `/interactive-mindmap.html`) — Interactive Markmap visualization
- `docs/` — Executive summary, SN-V1 VTOL & Drone Port engineering specs, FAA Part 135 regulatory dossier, GTM strategy, and Open POS API reference

---

## Local Development & Production Build

```bash
npm install
npm run dev      # Starts on http://0.0.0.0:3000
npm run build    # Production build verification
```
