import { describe, expect, it } from "vitest";
import { createSyntheticRegistry } from "../src/lib/connectors/mock-connectors";
import { buildExecutiveSnapshot } from "../src/lib/orchestrator";

describe("snapshot orchestration", () => {
  it("combines isolated connectors into one executive model", async () => {
    const now = new Date("2026-09-01T08:00:00.000Z");
    const snapshot = await buildExecutiveSnapshot(createSyntheticRegistry(), now);
    expect(snapshot.generatedAt).toBe(now.toISOString());
    expect(snapshot.sources).toHaveLength(4);
    expect(snapshot.metrics.length).toBeGreaterThan(0);
    expect(snapshot.funnel.at(-1)?.label).toBe("Won");
    expect(snapshot.alerts).toContain("Conversion into Negotiation is below 50%");
  });
});
