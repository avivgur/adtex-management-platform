import { describe, expect, it } from "vitest";
import { summarizeMetrics } from "../src/lib/metrics";
import type { ExecutiveSnapshot } from "../src/lib/domain";

const snapshot: ExecutiveSnapshot = {
  generatedAt: "2026-09-01T00:00:00.000Z",
  metrics: [{ period: "Sep", revenue: 200, cost: 120, goal: 250 }],
  funnel: [{ label: "Lead", value: 100 }, { label: "Won", value: 20 }],
  sources: [], partners: [], alerts: [], collections: { billed: 100, collected: 90 },
};

describe("executive metrics", () => {
  it("derives business KPIs from source data", () => {
    expect(summarizeMetrics(snapshot)).toEqual({ revenue: 200, cost: 120, profit: 80, margin: 40, goalAttainment: 80, collectionRate: 90, pipelineConversion: 20 });
  });

  it("handles empty denominators safely", () => {
    const result = summarizeMetrics({ ...snapshot, metrics: [], funnel: [], collections: { billed: 0, collected: 0 } });
    expect(result.margin).toBe(0);
    expect(result.collectionRate).toBe(0);
  });
});
