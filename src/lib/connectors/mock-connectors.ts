import type {
  BillingPayload,
  Connector,
  ConnectorRegistry,
  CrmPayload,
  PerformancePayload,
} from "@/lib/connectors/connector";
import type { SourceHealth, SourceId } from "@/lib/domain";
import { funnel, metrics, partners, sourceHealth } from "@/lib/data/synthetic";

class SyntheticConnector<T> implements Connector<T> {
  constructor(
    readonly id: SourceId,
    private readonly payload: T,
  ) {}

  async fetch(): Promise<T> {
    return structuredClone(this.payload);
  }

  async health(): Promise<SourceHealth> {
    const status = sourceHealth.find((source) => source.id === this.id);
    if (!status) throw new Error(`Missing synthetic health state for ${this.id}`);
    return structuredClone(status);
  }
}

export function createSyntheticRegistry(): ConnectorRegistry {
  return {
    performance: new SyntheticConnector<PerformancePayload>("performance", { metrics, partners }),
    crm: new SyntheticConnector<CrmPayload>("crm", { funnel }),
    billing: new SyntheticConnector<BillingPayload>("billing", { billed: 706_000, collected: 648_000 }),
    warehouse: new SyntheticConnector<Record<string, never>>("warehouse", {}),
  };
}
