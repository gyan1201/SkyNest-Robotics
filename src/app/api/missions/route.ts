import { NextResponse } from 'next/server';
import { dispatchNewMission } from '@/lib/networkStore';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = dispatchNewMission({
      merchantId: body.merchantId,
      dropZoneId: body.dropZoneId,
      sku: body.sku,
      customItemsSummary: body.customItemsSummary,
      customPayloadKg: body.customPayloadKg ? Number(body.customPayloadKg) : undefined,
      customOrderValueUsd: body.customOrderValueUsd ? Number(body.customOrderValueUsd) : undefined,
      posProviderOverride: body.posProviderOverride,
    });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error, state: result.state }, { status: 422 });
    }

    return NextResponse.json({
      ok: true,
      mission: result.mission,
      state: result.state,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid mission payload' }, { status: 400 });
  }
}
