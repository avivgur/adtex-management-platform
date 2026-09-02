import type { ExecutiveSnapshot, ExecutiveSummary, FunnelStage, PeriodMetric } from "@/lib/domain";

const safePercent = (part: number, total: number) => (total === 0 ? 0 : (part / total) * 100);

export function summarizeMetrics(snapshot: ExecutiveSnapshot): ExecutiveSummary {
  const current = snapshot.metrics.at(-1) ?? emptyMetric();
  const firstStage = snapshot.funnel.at(0)?.value ?? 0;
  const lastStage = snapshot.funnel.at(-1)?.value ?? 0;
  const profit = current.revenue - current.cost;

  return {
    revenue: current.revenue,
    cost: current.cost,
    profit,
    margin: safePercent(profit, current.revenue),
    goalAttainment: safePercent(current.revenue, current.goal),
    collectionRate: safePercent(snapshot.collections.collected, snapshot.collections.billed),
    pipelineConversion: safePercent(lastStage, firstStage),
  };
}

export function buildAlerts(metrics: PeriodMetric[], funnel: FunnelStage[]): string[] {
  const current = metrics.at(-1) ?? emptyMetric();
  const alerts: string[] = [];
  const margin = safePercent(current.revenue - current.cost, current.revenue);
  if (margin < 30) alerts.push("Margin is below the 30% operating threshold");
  if (current.revenue < current.goal) alerts.push("Revenue is pacing below the monthly goal");

  for (let index = 1; index < funnel.length; index += 1) {
    const previous = funnel[index - 1];
    const stage = funnel[index];
    if (previous && stage && safePercent(stage.value, previous.value) < 50) {
      alerts.push(`Conversion into ${stage.label} is below 50%`);
    }
  }
  return alerts;
}

function emptyMetric(): PeriodMetric {
  return { period: "N/A", revenue: 0, cost: 0, goal: 0 };
}
