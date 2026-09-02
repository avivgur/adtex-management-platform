import type { ConnectorRegistry } from "@/lib/connectors/connector";
import type { ExecutiveSnapshot } from "@/lib/domain";
import { buildAlerts } from "@/lib/metrics";

export async function buildExecutiveSnapshot(
  connectors: ConnectorRegistry,
  now = new Date(),
): Promise<ExecutiveSnapshot> {
  const [performance, crm, billing, ...sources] = await Promise.all([
    connectors.performance.fetch(),
    connectors.crm.fetch(),
    connectors.billing.fetch(),
    connectors.performance.health(),
    connectors.crm.health(),
    connectors.billing.health(),
    connectors.warehouse.health(),
  ]);

  return {
    generatedAt: now.toISOString(),
    metrics: performance.metrics,
    partners: performance.partners,
    funnel: crm.funnel,
    collections: billing,
    sources,
    alerts: buildAlerts(performance.metrics, crm.funnel),
  };
}
