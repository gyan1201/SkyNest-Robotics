import { NextResponse } from 'next/server';
import { getNetworkState, triggerDroneCommand } from '@/lib/networkStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const state = getNetworkState();
  return NextResponse.json(state);
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { droneId, action } = body as {
      droneId: string;
      action: 'TOGGLE_MOTOR_OUT_TEST' | 'TRIGGER_90S_SWAP' | 'DAA_DECONFLICT_SIM';
    };
    if (!droneId || !action) {
      return NextResponse.json({ error: 'droneId and action are required' }, { status: 400 });
    }
    const updated = triggerDroneCommand({ droneId, action });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }
}
