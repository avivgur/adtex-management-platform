import { NextResponse } from "next/server";
import { createSyntheticRegistry } from "@/lib/connectors/mock-connectors";
import { buildExecutiveSnapshot } from "@/lib/orchestrator";

export async function GET() {
  const snapshot = await buildExecutiveSnapshot(createSyntheticRegistry());
  return NextResponse.json(snapshot, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
