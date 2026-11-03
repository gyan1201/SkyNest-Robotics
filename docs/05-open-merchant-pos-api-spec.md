# SkyNest Open Merchant POS API Reference (Mind Map 2.4)

SkyNest Robotics provides an open, POS-agnostic webhook and REST interface compatible with **Toast**, **Square**, **Olo**, and **Custom ERP/HL7** integrations — charging **0% commission** and preserving **100% merchant customer data ownership**.

## Endpoints

### 1. `GET /api/pos/orders`
Returns active merchant rooftop ports, real-time synced inventory counts (with stock-out flags), supported drop zones, and pricing bands.

### 2. `POST /api/pos/orders`
Validates real-time SKU stock availability, enforces the `5.0 kg` single-sortie payload envelope, computes merchant commission savings vs. 3rd-party gig marketplaces, and dispatches the nearest staged `SN-V1` drone.

#### Example Request
```json
{
  "posProvider": "Toast",
  "merchantId": "PORT-QSR-01",
  "sku": "FB-COMBO-01",
  "dropZoneId": "DZ-101"
}
```

#### Example `200 OK` Response
```json
{
  "ok": true,
  "webhookAckId": "wh_ack_1793712000123",
  "posProvider": "Toast",
  "commissionChargedUsd": 0,
  "brandDataOwnership": "MERCHANT_DIRECT_100_PCT",
  "merchantSavingsVsMarketplaceUsd": 17.32,
  "mission": {
    "id": "MSN-9049",
    "orderNumber": "TST-49102",
    "droneId": "SN-107",
    "etaMinutes": 6.4,
    "skynestFeeUsd": 3.93,
    "bayTempLabel": "64.5°C Active Hot Bay"
  }
}
```

#### Stock-Out Prevention Guard (`422 Unprocessable Entity`)
If POS inventory sync indicates `stockCount === 0`, the API prevents drone launch before kitchen/rooftop staging:
```json
{
  "ok": false,
  "code": "INVENTORY_OR_PAYLOAD_GUARD",
  "error": "Inventory Sync Guard: \"Limited Brioche Slider Trio (Stock-Out Guard)\" (FB-WRAP-99) is currently out of stock at Firebird Craft Grill #14. Order blocked prior to dispatch."
}
```
