import type {
  FunnelStage,
  PartnerPerformance,
  PeriodMetric,
  SourceHealth,
} from "@/lib/domain";

export const metrics: PeriodMetric[] = [
  { period: "Apr", revenue: 520_000, cost: 374_000, goal: 500_000 },
  { period: "May", revenue: 561_000, cost: 393_000, goal: 540_000 },
  { period: "Jun", revenue: 598_000, cost: 414_000, goal: 575_000 },
  { period: "Jul", revenue: 637_000, cost: 438_000, goal: 620_000 },
  { period: "Aug", revenue: 681_000, cost: 457_000, goal: 660_000 },
  { period: "Sep", revenue: 724_000, cost: 476_000, goal: 710_000 },
];

export const funnel: FunnelStage[] = [
  { label: "Leads", value: 184 },
  { label: "Qualified", value: 96 },
  { label: "Ops approved", value: 63 },
  { label: "Negotiation", value: 29 },
  { label: "Won", value: 18 },
];

export const partners: PartnerPerformance[] = [
  { partner: "Northstar Media", revenue: 184_400, cost: 119_900, margin: 35.0, trend: 12.4 },
  { partner: "Atlas Network", revenue: 151_800, cost: 104_700, margin: 31.0, trend: 8.7 },
  { partner: "Signal Works", revenue: 127_600, cost: 92_400, margin: 27.6, trend: -2.1 },
  { partner: "Blue Peak", revenue: 98_200, cost: 70_300, margin: 28.4, trend: 5.2 },
];

export const sourceHealth: SourceHealth[] = [
  { id: "performance", label: "Performance API", state: "healthy", lastSync: "2 min ago", latencyMs: 284, records: 12_481 },
  { id: "crm", label: "CRM", state: "healthy", lastSync: "6 min ago", latencyMs: 391, records: 1_842 },
  { id: "billing", label: "Billing sheets", state: "delayed", lastSync: "28 min ago", latencyMs: 812, records: 426 },
  { id: "warehouse", label: "Data warehouse", state: "healthy", lastSync: "1 min ago", latencyMs: 96, records: 84_219 },
];
