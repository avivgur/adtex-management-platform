export type SourceId = "performance" | "crm" | "billing" | "warehouse";
export type HealthState = "healthy" | "delayed" | "degraded";

export interface PeriodMetric {
  period: string;
  revenue: number;
  cost: number;
  goal: number;
}

export interface FunnelStage {
  label: string;
  value: number;
}

export interface SourceHealth {
  id: SourceId;
  label: string;
  state: HealthState;
  lastSync: string;
  latencyMs: number;
  records: number;
}

export interface PartnerPerformance {
  partner: string;
  revenue: number;
  cost: number;
  margin: number;
  trend: number;
}

export interface ExecutiveSnapshot {
  generatedAt: string;
  metrics: PeriodMetric[];
  funnel: FunnelStage[];
  sources: SourceHealth[];
  partners: PartnerPerformance[];
  collections: { billed: number; collected: number };
  alerts: string[];
}

export interface ExecutiveSummary {
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  goalAttainment: number;
  collectionRate: number;
  pipelineConversion: number;
}
