import { NextResponse } from 'next/server';
import { dispatchNewMission, getNetworkState, POSProvider } from '@/lib/networkStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const state = getNetworkState();
  return NextResponse.json({
    protocol: 'SkyNest Open Merchant API v1.0',
    supportedPosProviders: ['Toast', 'Square', 'Olo', 'Custom API'],
    commissionRatePct: 0,
    perDeliveryFeeBandUsd: '$3.00 - $5.00',
    merchants: state.merchantPorts,
    dropZones: state.dropZones,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const merchantId: string = body.merchantId || 'PORT-QSR-01';
    const dropZoneId: string = body.dropZoneId || 'DZ-101';
    const posProvider: POSProvider = body.posProvider || 'Toast';

    const result = dispatchNewMission({
      merchantId,
      dropZoneId,
      sku: body.sku,
      customItemsSummary: body.itemsSummary,
      customPayloadKg: body.payloadKg ? Number(body.payloadKg) : undefined,
      customOrderValueUsd: body.orderValueUsd ? Number(body.orderValueUsd) : undefined,
      posProviderOverride: posProvider,
    });

    if (!result.ok || !result.mission) {
      return NextResponse.json(
        {
          ok: false,
          code: 'INVENTORY_OR_PAYLOAD_GUARD',
          error: result.error,
        },
        { status: 422 }
      );
    }

    const m = result.mission;
    return NextResponse.json({
      ok: true,
      webhookAckId: `wh_ack_${Date.now()}`,
      posProvider: m.posProvider,
      commissionChargedUsd: 0.0,
      brandDataOwnership: 'MERCHANT_DIRECT_100_PCT',
      merchantSavingsVsMarketplaceUsd: Number(
        (m.marketplaceCommissionSavedUsd + (m.gigEquivalentCostUsd - m.skynestFeeUsd)).toFixed(2)
      ),
      mission: m,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed POS webhook JSON' }, { status: 400 });
  }
}
