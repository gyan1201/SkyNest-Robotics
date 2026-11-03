import { INITIAL_ROADMAP_PHASES, RoadmapPhase } from '@/data/mindmapData';

export type POSProvider = 'Toast' | 'Square' | 'Olo' | 'Custom API';
export type VerticalType = 'QSR Chain' | 'Grocery / Pharmacy' | 'Medical Logistics';
export type DropZoneType =
  | 'Driveway Fiducial Marker'
  | 'Curbside Pad'
  | 'Apartment Smart Locker'
  | 'Drone Mailbox';

export type DroneStatus =
  | 'IN_TRANSIT'
  | 'PRECISION_DESCENT'
  | 'BATTERY_SWAP_90S'
  | 'RETURNING_TO_PORT'
  | 'STAGED_READY'
  | 'MOTOR_OUT_RECOVERY';

export interface MerchantPort {
  id: string;
  name: string;
  vertical: VerticalType;
  posProvider: POSProvider;
  mountType: 'Merchant Rooftop' | 'Parking Lot Canopy';
  coords: { x: number; y: number };
  swapTurnaroundSec: number;
  chargerKw: number;
  chargedPacksReady: number;
  totalPacks: number;
  ordersToday: number;
  avgEtaMin: number;
  equityCorridor: boolean;
  inventoryItems: {
    sku: string;
    name: string;
    weightKg: number;
    priceUsd: number;
    tempZone: 'HOT_65C' | 'CHILLED_4C' | 'MEDICAL_2_8C' | 'AMBIENT';
    inStock: boolean;
    stockCount: number;
  }[];
}

export interface DropZoneNode {
  id: string;
  name: string;
  neighborhood: string;
  type: DropZoneType;
  coords: { x: number; y: number };
  fiducialId: string;
  rtkPrecisionCm: number;
  equityZone: boolean;
}

export interface DroneUnit {
  id: string;
  callsign: string;
  model: 'SN-V1 Hybrid VTOL';
  status: DroneStatus;
  assignedPilot: string;
  coords: { x: number; y: number };
  originCoords: { x: number; y: number };
  destCoords: { x: number; y: number };
  progress: number;
  batteryPct: number;
  payloadKg: number;
  maxPayloadKg: number;
  bayTempC: number;
  noiseDbAt50m: number;
  speedMps: number;
  altitudeFt: number;
  windSustainedMps: number;
  sortiesToday: number;
  flightHoursTotal: number;
  nextHeavyMaintHr: number;
  activeMissionId: string | null;
  redundancyState: '8/8_NOMINAL' | '7/8_HEX_OCTO_SAFE';
  daaState: {
    radar: 'CLEAR' | 'TRACKING_TRAFFIC';
    optical: 'FIDUCIAL_READY' | 'LOCKED';
    adsbIn: 'CLEAR' | 'DECONFLICTING';
  };
  privacyLock: 'DOWNWARD_REC_DISABLED';
}

export interface DeliveryMission {
  id: string;
  orderNumber: string;
  createdAt: string;
  merchantId: string;
  merchantName: string;
  posProvider: POSProvider;
  dropZoneId: string;
  dropZoneName: string;
  dropZoneType: DropZoneType;
  droneId: string;
  itemsSummary: string;
  payloadKg: number;
  orderValueUsd: number;
  skynestFeeUsd: number;
  gigEquivalentCostUsd: number;
  marketplaceCommissionSavedUsd: number;
  etaMinutes: number;
  groundEquivalentMinutes: number;
  status: 'LOADING_AT_PORT' | 'AIRBORNE_CORRIDOR' | 'FIDUCIAL_DESCENT' | 'DELIVERED_POD';
  podCode: string;
  bayTempLabel: string;
}

export interface NetworkState {
  corridorName: string;
  densityPopPerSqMi: number;
  utmUssStatus: 'FAA_USS_CONNECTED';
  part135Status: 'PHASE_1_ACTIVE_PART_135_FILED';
  dispatchReliabilityPct: number;
  remotePilotRatio: string;
  weatherWindMps: number;
  weatherRating: 'IP54+ (15m/s Rated)';
  vertiport: {
    id: string;
    name: string;
    coords: { x: number; y: number };
    activeChargers3Phase: number;
    totalChargers3Phase: number;
    fastChargeTurnaroundMin: number;
    lineMaintCompletedToday: number;
    heavyMaintIntervalHr: number;
  };
  merchantPorts: MerchantPort[];
  dropZones: DropZoneNode[];
  drones: DroneUnit[];
  missions: DeliveryMission[];
  roadmapPhases: RoadmapPhase[];
}

const INITIAL_MERCHANT_PORTS: MerchantPort[] = [
  {
    id: 'PORT-QSR-01',
    name: 'Firebird Craft Grill #14',
    vertical: 'QSR Chain',
    posProvider: 'Toast',
    mountType: 'Merchant Rooftop',
    coords: { x: 24, y: 28 },
    swapTurnaroundSec: 90,
    chargerKw: 22,
    chargedPacksReady: 7,
    totalPacks: 8,
    ordersToday: 96,
    avgEtaMin: 7.4,
    equityCorridor: false,
    inventoryItems: [
      {
        sku: 'FB-COMBO-01',
        name: 'Chargrilled Chicken Family Pack + Sides',
        weightKg: 2.4,
        priceUsd: 34.0,
        tempZone: 'HOT_65C',
        inStock: true,
        stockCount: 42,
      },
      {
        sku: 'FB-BOWL-02',
        name: 'Double Protein Grain & Avocado Bowl (×2)',
        weightKg: 1.7,
        priceUsd: 26.5,
        tempZone: 'HOT_65C',
        inStock: true,
        stockCount: 19,
      },
      {
        sku: 'FB-WRAP-99',
        name: 'Limited Brioche Slider Trio (Stock-Out Guard)',
        weightKg: 1.3,
        priceUsd: 18.0,
        tempZone: 'HOT_65C',
        inStock: false,
        stockCount: 0,
      },
    ],
  },
  {
    id: 'PORT-GRO-02',
    name: 'FreshMarket Suburban Grocers',
    vertical: 'Grocery / Pharmacy',
    posProvider: 'Square',
    mountType: 'Merchant Rooftop',
    coords: { x: 74, y: 24 },
    swapTurnaroundSec: 88,
    chargerKw: 22,
    chargedPacksReady: 8,
    totalPacks: 8,
    ordersToday: 84,
    avgEtaMin: 9.2,
    equityCorridor: false,
    inventoryItems: [
      {
        sku: 'FM-BASKET-10',
        name: 'Evening Dinner Essentials Bag (Produce, Dairy, Pasta)',
        weightKg: 4.1,
        priceUsd: 48.0,
        tempZone: 'CHILLED_4C',
        inStock: true,
        stockCount: 31,
      },
      {
        sku: 'FM-EXPRESS-04',
        name: 'Organic Baby Formula & Cold Brew Bundle',
        weightKg: 2.8,
        priceUsd: 39.5,
        tempZone: 'CHILLED_4C',
        inStock: true,
        stockCount: 14,
      },
    ],
  },
  {
    id: 'PORT-PHM-03',
    name: 'CarePlus Urgent Rx & Diagnostics',
    vertical: 'Medical Logistics',
    posProvider: 'Custom API',
    mountType: 'Parking Lot Canopy',
    coords: { x: 78, y: 72 },
    swapTurnaroundSec: 85,
    chargerKw: 22,
    chargedPacksReady: 6,
    totalPacks: 6,
    ordersToday: 52,
    avgEtaMin: 6.1,
    equityCorridor: false,
    inventoryItems: [
      {
        sku: 'RX-COLD-01',
        name: 'Biologic Cold-Chain Prescription Kit (Tamper-Sealed)',
        weightKg: 1.2,
        priceUsd: 85.0,
        tempZone: 'MEDICAL_2_8C',
        inStock: true,
        stockCount: 27,
      },
      {
        sku: 'LAB-STAT-07',
        name: 'STAT Diagnostic Blood Panel Specimen Carrier',
        weightKg: 1.5,
        priceUsd: 110.0,
        tempZone: 'MEDICAL_2_8C',
        inStock: true,
        stockCount: 50,
      },
    ],
  },
  {
    id: 'PORT-QSR-04',
    name: 'Verde Fresh Kitchen (South Corridor)',
    vertical: 'QSR Chain',
    posProvider: 'Olo',
    mountType: 'Merchant Rooftop',
    coords: { x: 22, y: 74 },
    swapTurnaroundSec: 90,
    chargerKw: 22,
    chargedPacksReady: 7,
    totalPacks: 8,
    ordersToday: 78,
    avgEtaMin: 8.1,
    equityCorridor: true,
    inventoryItems: [
      {
        sku: 'VK-FAM-01',
        name: 'Fajita & Fresh Guacamole Family Bundle',
        weightKg: 3.2,
        priceUsd: 29.0,
        tempZone: 'HOT_65C',
        inStock: true,
        stockCount: 35,
      },
      {
        sku: 'VK-FRESH-03',
        name: 'Equity Corridor Subsidized Fresh Produce + Meal Box',
        weightKg: 4.4,
        priceUsd: 19.5,
        tempZone: 'CHILLED_4C',
        inStock: true,
        stockCount: 28,
      },
    ],
  },
];

const INITIAL_DROP_ZONES: DropZoneNode[] = [
  {
    id: 'DZ-101',
    name: 'Oakridge Estates #412',
    neighborhood: 'North Plano Corridor',
    type: 'Driveway Fiducial Marker',
    coords: { x: 14, y: 48 },
    fiducialId: 'APRIL-TAG-412A',
    rtkPrecisionCm: 1.8,
    equityZone: false,
  },
  {
    id: 'DZ-102',
    name: 'Maple Creek Cul-de-Sac Pad',
    neighborhood: 'West Legacy Suburb',
    type: 'Curbside Pad',
    coords: { x: 44, y: 15 },
    fiducialId: 'APRIL-TAG-109C',
    rtkPrecisionCm: 2.1,
    equityZone: false,
  },
  {
    id: 'DZ-103',
    name: 'Parkside Commons Tower B',
    neighborhood: 'Mid-Corridor Townhomes',
    type: 'Apartment Smart Locker',
    coords: { x: 62, y: 47 },
    fiducialId: 'LOCKER-RTK-88B',
    rtkPrecisionCm: 1.4,
    equityZone: false,
  },
  {
    id: 'DZ-104',
    name: 'Cedar Ridge Residence #89',
    neighborhood: 'East Ridge (<5mi Radius)',
    type: 'Drone Mailbox',
    coords: { x: 88, y: 46 },
    fiducialId: 'MAILBOX-FID-89D',
    rtkPrecisionCm: 1.2,
    equityZone: false,
  },
  {
    id: 'DZ-105',
    name: 'Southside Community Hub & Homes',
    neighborhood: 'South Equity Corridor (Food Desert Priority)',
    type: 'Curbside Pad',
    coords: { x: 46, y: 86 },
    fiducialId: 'EQUITY-PAD-05E',
    rtkPrecisionCm: 1.9,
    equityZone: true,
  },
];

const INITIAL_DRONES: DroneUnit[] = [
  {
    id: 'SN-101',
    callsign: 'SKYNEST-101',
    model: 'SN-V1 Hybrid VTOL',
    status: 'IN_TRANSIT',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 19, y: 38 },
    originCoords: { x: 24, y: 28 },
    destCoords: { x: 14, y: 48 },
    progress: 0.54,
    batteryPct: 86,
    payloadKg: 2.4,
    maxPayloadKg: 5.0,
    bayTempC: 64.8,
    noiseDbAt50m: 51.2,
    speedMps: 24.5,
    altitudeFt: 280,
    windSustainedMps: 7.8,
    sortiesToday: 31,
    flightHoursTotal: 312,
    nextHeavyMaintHr: 500,
    activeMissionId: 'MSN-9041',
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'FIDUCIAL_READY', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-102',
    callsign: 'SKYNEST-102',
    model: 'SN-V1 Hybrid VTOL',
    status: 'IN_TRANSIT',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 68, y: 36 },
    originCoords: { x: 74, y: 24 },
    destCoords: { x: 62, y: 47 },
    progress: 0.62,
    batteryPct: 81,
    payloadKg: 4.1,
    maxPayloadKg: 5.0,
    bayTempC: 3.8,
    noiseDbAt50m: 52.4,
    speedMps: 23.1,
    altitudeFt: 310,
    windSustainedMps: 8.2,
    sortiesToday: 33,
    flightHoursTotal: 418,
    nextHeavyMaintHr: 500,
    activeMissionId: 'MSN-9042',
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'FIDUCIAL_READY', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-103',
    callsign: 'SKYNEST-103',
    model: 'SN-V1 Hybrid VTOL',
    status: 'PRECISION_DESCENT',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 86, y: 51 },
    originCoords: { x: 78, y: 72 },
    destCoords: { x: 88, y: 46 },
    progress: 0.88,
    batteryPct: 77,
    payloadKg: 1.2,
    maxPayloadKg: 5.0,
    bayTempC: 4.5,
    noiseDbAt50m: 50.6,
    speedMps: 4.2,
    altitudeFt: 65,
    windSustainedMps: 7.4,
    sortiesToday: 29,
    flightHoursTotal: 194,
    nextHeavyMaintHr: 500,
    activeMissionId: 'MSN-9043',
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'LOCKED', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-104',
    callsign: 'SKYNEST-104',
    model: 'SN-V1 Hybrid VTOL',
    status: 'IN_TRANSIT',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 34, y: 80 },
    originCoords: { x: 22, y: 74 },
    destCoords: { x: 46, y: 86 },
    progress: 0.5,
    batteryPct: 91,
    payloadKg: 4.4,
    maxPayloadKg: 5.0,
    bayTempC: 4.1,
    noiseDbAt50m: 51.9,
    speedMps: 25.0,
    altitudeFt: 260,
    windSustainedMps: 8.6,
    sortiesToday: 32,
    flightHoursTotal: 276,
    nextHeavyMaintHr: 500,
    activeMissionId: 'MSN-9044',
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'FIDUCIAL_READY', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-105',
    callsign: 'SKYNEST-105',
    model: 'SN-V1 Hybrid VTOL',
    status: 'BATTERY_SWAP_90S',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 24, y: 28 },
    originCoords: { x: 24, y: 28 },
    destCoords: { x: 44, y: 15 },
    progress: 0.0,
    batteryPct: 99,
    payloadKg: 1.7,
    maxPayloadKg: 5.0,
    bayTempC: 64.2,
    noiseDbAt50m: 44.0,
    speedMps: 0,
    altitudeFt: 32,
    windSustainedMps: 7.5,
    sortiesToday: 30,
    flightHoursTotal: 155,
    nextHeavyMaintHr: 500,
    activeMissionId: null,
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'LOCKED', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-106',
    callsign: 'SKYNEST-106',
    model: 'SN-V1 Hybrid VTOL',
    status: 'RETURNING_TO_PORT',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 36, y: 21 },
    originCoords: { x: 44, y: 15 },
    destCoords: { x: 24, y: 28 },
    progress: 0.45,
    batteryPct: 64,
    payloadKg: 0.0,
    maxPayloadKg: 5.0,
    bayTempC: 22.0,
    noiseDbAt50m: 49.8,
    speedMps: 26.2,
    altitudeFt: 340,
    windSustainedMps: 8.1,
    sortiesToday: 34,
    flightHoursTotal: 462,
    nextHeavyMaintHr: 500,
    activeMissionId: null,
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'TRACKING_TRAFFIC', optical: 'FIDUCIAL_READY', adsbIn: 'DECONFLICTING' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-107',
    callsign: 'SKYNEST-107',
    model: 'SN-V1 Hybrid VTOL',
    status: 'STAGED_READY',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 74, y: 24 },
    originCoords: { x: 74, y: 24 },
    destCoords: { x: 74, y: 24 },
    progress: 0,
    batteryPct: 100,
    payloadKg: 0,
    maxPayloadKg: 5.0,
    bayTempC: 4.0,
    noiseDbAt50m: 0,
    speedMps: 0,
    altitudeFt: 28,
    windSustainedMps: 7.9,
    sortiesToday: 28,
    flightHoursTotal: 118,
    nextHeavyMaintHr: 500,
    activeMissionId: null,
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'LOCKED', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-108',
    callsign: 'SKYNEST-108',
    model: 'SN-V1 Hybrid VTOL',
    status: 'STAGED_READY',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 50, y: 50 },
    originCoords: { x: 50, y: 50 },
    destCoords: { x: 50, y: 50 },
    progress: 0,
    batteryPct: 100,
    payloadKg: 0,
    maxPayloadKg: 5.0,
    bayTempC: 20.0,
    noiseDbAt50m: 0,
    speedMps: 0,
    altitudeFt: 0,
    windSustainedMps: 7.6,
    sortiesToday: 31,
    flightHoursTotal: 229,
    nextHeavyMaintHr: 500,
    activeMissionId: null,
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'LOCKED', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-109',
    callsign: 'SKYNEST-109',
    model: 'SN-V1 Hybrid VTOL',
    status: 'RETURNING_TO_PORT',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 64, y: 61 },
    originCoords: { x: 62, y: 47 },
    destCoords: { x: 78, y: 72 },
    progress: 0.58,
    batteryPct: 71,
    payloadKg: 0,
    maxPayloadKg: 5.0,
    bayTempC: 5.0,
    noiseDbAt50m: 50.1,
    speedMps: 25.4,
    altitudeFt: 300,
    windSustainedMps: 8.4,
    sortiesToday: 30,
    flightHoursTotal: 340,
    nextHeavyMaintHr: 500,
    activeMissionId: null,
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'FIDUCIAL_READY', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
  {
    id: 'SN-110',
    callsign: 'SKYNEST-110',
    model: 'SN-V1 Hybrid VTOL',
    status: 'STAGED_READY',
    assignedPilot: 'RP-ALPHA-01 (1:10 Ratio)',
    coords: { x: 22, y: 74 },
    originCoords: { x: 22, y: 74 },
    destCoords: { x: 22, y: 74 },
    progress: 0,
    batteryPct: 100,
    payloadKg: 0,
    maxPayloadKg: 5.0,
    bayTempC: 63.0,
    noiseDbAt50m: 0,
    speedMps: 0,
    altitudeFt: 24,
    windSustainedMps: 8.0,
    sortiesToday: 29,
    flightHoursTotal: 205,
    nextHeavyMaintHr: 500,
    activeMissionId: null,
    redundancyState: '8/8_NOMINAL',
    daaState: { radar: 'CLEAR', optical: 'LOCKED', adsbIn: 'CLEAR' },
    privacyLock: 'DOWNWARD_REC_DISABLED',
  },
];

const INITIAL_MISSIONS: DeliveryMission[] = [
  {
    id: 'MSN-9041',
    orderNumber: 'TST-88412',
    createdAt: '2 min ago',
    merchantId: 'PORT-QSR-01',
    merchantName: 'Firebird Craft Grill #14',
    posProvider: 'Toast',
    dropZoneId: 'DZ-101',
    dropZoneName: 'Oakridge Estates #412',
    dropZoneType: 'Driveway Fiducial Marker',
    droneId: 'SN-101',
    itemsSummary: 'Chargrilled Chicken Family Pack + Sides',
    payloadKg: 2.4,
    orderValueUsd: 34.0,
    skynestFeeUsd: 4.0,
    gigEquivalentCostUsd: 11.8,
    marketplaceCommissionSavedUsd: 9.52,
    etaMinutes: 6.5,
    groundEquivalentMinutes: 38,
    status: 'AIRBORNE_CORRIDOR',
    podCode: 'POD-FB-412A',
    bayTempLabel: '64.8°C Active Hot Bay',
  },
  {
    id: 'MSN-9042',
    orderNumber: 'SQR-30919',
    createdAt: '4 min ago',
    merchantId: 'PORT-GRO-02',
    merchantName: 'FreshMarket Suburban Grocers',
    posProvider: 'Square',
    dropZoneId: 'DZ-103',
    dropZoneName: 'Parkside Commons Tower B',
    dropZoneType: 'Apartment Smart Locker',
    droneId: 'SN-102',
    itemsSummary: 'Evening Dinner Essentials Bag (4.1 kg)',
    payloadKg: 4.1,
    orderValueUsd: 48.0,
    skynestFeeUsd: 4.25,
    gigEquivalentCostUsd: 13.5,
    marketplaceCommissionSavedUsd: 12.0,
    etaMinutes: 8.0,
    groundEquivalentMinutes: 46,
    status: 'AIRBORNE_CORRIDOR',
    podCode: 'POD-FM-88B',
    bayTempLabel: '3.8°C Chilled Bay',
  },
  {
    id: 'MSN-9043',
    orderNumber: 'MED-77104',
    createdAt: '5 min ago',
    merchantId: 'PORT-PHM-03',
    merchantName: 'CarePlus Urgent Rx & Diagnostics',
    posProvider: 'Custom API',
    dropZoneId: 'DZ-104',
    dropZoneName: 'Cedar Ridge Residence #89',
    dropZoneType: 'Drone Mailbox',
    droneId: 'SN-103',
    itemsSummary: 'Biologic Cold-Chain Prescription Kit',
    payloadKg: 1.2,
    orderValueUsd: 85.0,
    skynestFeeUsd: 4.75,
    gigEquivalentCostUsd: 14.9,
    marketplaceCommissionSavedUsd: 21.25,
    etaMinutes: 5.5,
    groundEquivalentMinutes: 34,
    status: 'FIDUCIAL_DESCENT',
    podCode: 'POD-RX-89D',
    bayTempLabel: '4.5°C Medical Chain-of-Custody',
  },
  {
    id: 'MSN-9044',
    orderNumber: 'OLO-55201',
    createdAt: '3 min ago',
    merchantId: 'PORT-QSR-04',
    merchantName: 'Verde Fresh Kitchen (South Corridor)',
    posProvider: 'Olo',
    dropZoneId: 'DZ-105',
    dropZoneName: 'Southside Community Hub & Homes',
    dropZoneType: 'Curbside Pad',
    droneId: 'SN-104',
    itemsSummary: 'Equity Corridor Fresh Produce + Meal Box',
    payloadKg: 4.4,
    orderValueUsd: 19.5,
    skynestFeeUsd: 3.0,
    gigEquivalentCostUsd: 11.2,
    marketplaceCommissionSavedUsd: 5.46,
    etaMinutes: 7.2,
    groundEquivalentMinutes: 41,
    status: 'AIRBORNE_CORRIDOR',
    podCode: 'POD-EQ-05E',
    bayTempLabel: '4.1°C Chilled Bay',
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __skynestNetworkState: NetworkState | undefined;
}

export function getNetworkState(): NetworkState {
  if (!globalThis.__skynestNetworkState) {
    globalThis.__skynestNetworkState = {
      corridorName: 'DFW North Suburban Corridor (Plano–Frisco Sector)',
      densityPopPerSqMi: 11400,
      utmUssStatus: 'FAA_USS_CONNECTED',
      part135Status: 'PHASE_1_ACTIVE_PART_135_FILED',
      dispatchReliabilityPct: 99.7,
      remotePilotRatio: '1 : 10 Simultaneous Aircraft',
      weatherWindMps: 8.1,
      weatherRating: 'IP54+ (15m/s Rated)',
      vertiport: {
        id: 'VP-DFW-01',
        name: 'SkyNest Central Vertiport & Ops Hub',
        coords: { x: 50, y: 50 },
        activeChargers3Phase: 9,
        totalChargers3Phase: 12,
        fastChargeTurnaroundMin: 20,
        lineMaintCompletedToday: 10,
        heavyMaintIntervalHr: 500,
      },
      merchantPorts: structuredClone(INITIAL_MERCHANT_PORTS),
      dropZones: structuredClone(INITIAL_DROP_ZONES),
      drones: structuredClone(INITIAL_DRONES),
      missions: structuredClone(INITIAL_MISSIONS),
      roadmapPhases: structuredClone(INITIAL_ROADMAP_PHASES),
    };
  }
  return globalThis.__skynestNetworkState;
}

export function dispatchNewMission(params: {
  merchantId: string;
  dropZoneId: string;
  sku?: string;
  customItemsSummary?: string;
  customPayloadKg?: number;
  customOrderValueUsd?: number;
  posProviderOverride?: POSProvider;
}): { ok: boolean; error?: string; mission?: DeliveryMission; state: NetworkState } {
  const state = getNetworkState();
  const merchant = state.merchantPorts.find((m) => m.id === params.merchantId) || state.merchantPorts[0];
  const dropZone = state.dropZones.find((d) => d.id === params.dropZoneId) || state.dropZones[0];

  let itemsSummary = params.customItemsSummary || 'Standard Hot Meal Parcel';
  let payloadKg = params.customPayloadKg || 2.3;
  let orderValueUsd = params.customOrderValueUsd || 32.0;
  let bayTempC = 64.5;
  let bayTempLabel = '64.5°C Active Hot Bay';

  if (params.sku) {
    const item = merchant.inventoryItems.find((i) => i.sku === params.sku);
    if (!item) {
      return { ok: false, error: `SKU ${params.sku} not found in merchant POS catalog.`, state };
    }
    if (!item.inStock || item.stockCount <= 0) {
      return {
        ok: false,
        error: `Inventory Sync Guard: "${item.name}" (${item.sku}) is currently out of stock at ${merchant.name}. Order blocked prior to dispatch.`,
        state,
      };
    }
    item.stockCount = Math.max(0, item.stockCount - 1);
    if (item.stockCount === 0) item.inStock = false;
    itemsSummary = item.name;
    payloadKg = item.weightKg;
    orderValueUsd = item.priceUsd;
    if (item.tempZone === 'CHILLED_4C') {
      bayTempC = 3.9;
      bayTempLabel = '3.9°C Chilled Bay';
    } else if (item.tempZone === 'MEDICAL_2_8C') {
      bayTempC = 4.2;
      bayTempLabel = '4.2°C Medical Chain-of-Custody';
    }
  }

  if (payloadKg > 5.0) {
    return {
      ok: false,
      error: `Payload ${payloadKg.toFixed(1)} kg exceeds SN-V1 single-sortie 5.0 kg max capacity. Split into 2 drone sorties.`,
      state,
    };
  }

  // Pick a staged drone first, or battery swap drone, or returning drone
  const candidateDrone =
    state.drones.find((d) => d.status === 'STAGED_READY') ||
    state.drones.find((d) => d.status === 'BATTERY_SWAP_90S') ||
    state.drones[0];

  const dx = dropZone.coords.x - merchant.coords.x;
  const dy = dropZone.coords.y - merchant.coords.y;
  const distMiles = Math.max(1.4, Math.min(4.9, Math.hypot(dx, dy) * 0.068));
  const etaMinutes = Number((3.8 + distMiles * 1.35).toFixed(1));
  const groundEquivalentMinutes = Math.round(24 + distMiles * 5.8);

  const skynestFeeUsd = dropZone.equityZone ? 3.0 : Number((3.5 + payloadKg * 0.18).toFixed(2));
  const gigEquivalentCostUsd = Number((9.5 + distMiles * 1.05).toFixed(2));
  const marketplaceCommissionSavedUsd = Number((orderValueUsd * 0.28).toFixed(2));

  const msnNumber = 9045 + state.missions.length;
  const missionId = `MSN-${msnNumber}`;
  const posProvider = params.posProviderOverride || merchant.posProvider;
  const prefix =
    posProvider === 'Toast'
      ? 'TST'
      : posProvider === 'Square'
      ? 'SQR'
      : posProvider === 'Olo'
      ? 'OLO'
      : 'API';

  const newMission: DeliveryMission = {
    id: missionId,
    orderNumber: `${prefix}-${Math.floor(10000 + Math.random() * 89999)}`,
    createdAt: 'Just now',
    merchantId: merchant.id,
    merchantName: merchant.name,
    posProvider,
    dropZoneId: dropZone.id,
    dropZoneName: dropZone.name,
    dropZoneType: dropZone.type,
    droneId: candidateDrone.id,
    itemsSummary,
    payloadKg,
    orderValueUsd,
    skynestFeeUsd,
    gigEquivalentCostUsd,
    marketplaceCommissionSavedUsd,
    etaMinutes,
    groundEquivalentMinutes,
    status: 'AIRBORNE_CORRIDOR',
    podCode: `POD-${candidateDrone.id.split('-')[1]}-${dropZone.id.split('-')[1]}`,
    bayTempLabel,
  };

  candidateDrone.status = 'IN_TRANSIT';
  candidateDrone.originCoords = { ...merchant.coords };
  candidateDrone.destCoords = { ...dropZone.coords };
  candidateDrone.coords = {
    x: Number((merchant.coords.x + dx * 0.18).toFixed(1)),
    y: Number((merchant.coords.y + dy * 0.18).toFixed(1)),
  };
  candidateDrone.progress = 0.18;
  candidateDrone.payloadKg = payloadKg;
  candidateDrone.bayTempC = bayTempC;
  candidateDrone.noiseDbAt50m = 51.4;
  candidateDrone.speedMps = 24.8;
  candidateDrone.altitudeFt = 290;
  candidateDrone.sortiesToday += 1;
  candidateDrone.activeMissionId = missionId;

  merchant.ordersToday += 1;

  state.missions.unshift(newMission);
  if (state.missions.length > 16) {
    state.missions = state.missions.slice(0, 16);
  }

  return { ok: true, mission: newMission, state };
}

export function triggerDroneCommand(params: {
  droneId: string;
  action: 'TOGGLE_MOTOR_OUT_TEST' | 'TRIGGER_90S_SWAP' | 'DAA_DECONFLICT_SIM';
}): NetworkState {
  const state = getNetworkState();
  const drone = state.drones.find((d) => d.id === params.droneId);
  if (!drone) return state;

  if (params.action === 'TOGGLE_MOTOR_OUT_TEST') {
    if (drone.redundancyState === '8/8_NOMINAL') {
      drone.redundancyState = '7/8_HEX_OCTO_SAFE';
      drone.status = 'MOTOR_OUT_RECOVERY';
      drone.noiseDbAt50m = 53.6; // Still < 55dB @ 50m!
    } else {
      drone.redundancyState = '8/8_NOMINAL';
      drone.status = drone.activeMissionId ? 'IN_TRANSIT' : 'STAGED_READY';
      drone.noiseDbAt50m = drone.activeMissionId ? 51.2 : 0;
    }
  } else if (params.action === 'TRIGGER_90S_SWAP') {
    drone.status = 'BATTERY_SWAP_90S';
    drone.batteryPct = 100;
    drone.speedMps = 0;
    drone.noiseDbAt50m = 43.5;
  } else if (params.action === 'DAA_DECONFLICT_SIM') {
    drone.daaState =
      drone.daaState.adsbIn === 'CLEAR'
        ? { radar: 'TRACKING_TRAFFIC', optical: 'FIDUCIAL_READY', adsbIn: 'DECONFLICTING' }
        : { radar: 'CLEAR', optical: 'FIDUCIAL_READY', adsbIn: 'CLEAR' };
  }

  return state;
}

export function toggleRoadmapMilestone(milestoneId: string): RoadmapPhase[] {
  const state = getNetworkState();
  for (const phase of state.roadmapPhases) {
    const milestone = phase.milestones.find((m) => m.id === milestoneId);
    if (milestone) {
      milestone.completed = !milestone.completed;
      break;
    }
  }
  return state.roadmapPhases;
}
