import type {
  FunnelStage,
  PartnerPerformance,
  PeriodMetric,
  SourceHealth,
  SourceId,
} from "@/lib/domain";

export interface Connector<T> {
  readonly id: SourceId;
  fetch(): Promise<T>;
  health(): Promise<SourceHealth>;
}

export interface PerformancePayload {
  metrics: PeriodMetric[];
  partners: PartnerPerformance[];
}

export interface CrmPayload {
  funnel: FunnelStage[];
}

export interface BillingPayload {
  billed: number;
  collected: number;
}

export interface ConnectorRegistry {
  performance: Connector<PerformancePayload>;
  crm: Connector<CrmPayload>;
  billing: Connector<BillingPayload>;
  warehouse: Connector<Record<string, never>>;
}
