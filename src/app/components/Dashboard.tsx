"use client";

import { useMemo, useState } from "react";
import type { ExecutiveSnapshot } from "@/lib/domain";
import { summarizeMetrics } from "@/lib/metrics";

const tabs = ["Overview", "Revenue", "Sales", "P&L", "System health"] as const;
type Tab = (typeof tabs)[number];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const percent = (value: number) => `${value.toFixed(1)}%`;

export function Dashboard({ snapshot }: { snapshot: ExecutiveSnapshot }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const summary = useMemo(() => summarizeMetrics(snapshot), [snapshot]);

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span>A</span><div><strong>Adtex</strong><small>Operations OS</small></div></div>
        <nav>{tabs.map((tab) => <button className={activeTab === tab ? "active" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav>
        <div className="sidebarFoot"><span className="statusDot" /> Demo environment<small>Synthetic data only</small></div>
      </aside>

      <section className="content">
        <header><div><p className="eyebrow">EXECUTIVE COMMAND CENTER</p><h1>{activeTab}</h1><p>One operating view across revenue, finance, sales, and system health.</p></div><div className="headerMeta"><span>Live demo</span><small>Updated {new Date(snapshot.generatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</small></div></header>

        <div className="kpis">
          <Kpi label="Revenue" value={money.format(summary.revenue)} detail={`${percent(summary.goalAttainment)} of goal`} tone="blue" />
          <Kpi label="Gross profit" value={money.format(summary.profit)} detail={`${percent(summary.margin)} margin`} tone="green" />
          <Kpi label="Collection rate" value={percent(summary.collectionRate)} detail={`${money.format(snapshot.collections.collected)} collected`} tone="violet" />
          <Kpi label="Pipeline conversion" value={percent(summary.pipelineConversion)} detail={`${snapshot.funnel.at(-1)?.value ?? 0} deals won`} tone="amber" />
        </div>

        <div className="grid">
          <article className="panel wide"><PanelTitle title="Revenue performance" subtitle="Actual revenue against operating goal" badge="6 months" /><RevenueChart snapshot={snapshot} /></article>
          <article className="panel"><PanelTitle title="Operating signals" subtitle="Rules surface issues before reporting" badge={`${snapshot.alerts.length} active`} /><div className="alerts">{snapshot.alerts.map((alert) => <div key={alert}><span>!</span><p>{alert}<small>Review recommended</small></p></div>)}</div></article>
          <article className="panel"><PanelTitle title="Sales funnel" subtitle="CRM stage conversion" /><Funnel snapshot={snapshot} /></article>
          <article className="panel"><PanelTitle title="Source health" subtitle="Freshness and reliability" /><SourceList snapshot={snapshot} /></article>
          <article className="panel wide"><PanelTitle title="Partner performance" subtitle="Revenue quality and margin movement" badge="Synthetic portfolio data" /><PartnerTable snapshot={snapshot} /></article>
        </div>
      </section>
    </main>
  );
}

function Kpi({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) {
  return <article className={`kpi ${tone}`}><div className="kpiTop"><span>{label}</span><i /></div><strong>{value}</strong><small>{detail}</small></article>;
}

function PanelTitle({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) {
  return <div className="panelTitle"><div><h2>{title}</h2><p>{subtitle}</p></div>{badge && <span>{badge}</span>}</div>;
}

function RevenueChart({ snapshot }: { snapshot: ExecutiveSnapshot }) {
  const max = Math.max(...snapshot.metrics.map((metric) => Math.max(metric.revenue, metric.goal)));
  return <div className="chart">{snapshot.metrics.map((metric) => <div className="barGroup" key={metric.period}><div className="bars"><div className="goalBar" style={{ height: `${(metric.goal / max) * 100}%` }} /><div className="actualBar" style={{ height: `${(metric.revenue / max) * 100}%` }} /></div><span>{metric.period}</span></div>)}</div>;
}

function Funnel({ snapshot }: { snapshot: ExecutiveSnapshot }) {
  const max = snapshot.funnel.at(0)?.value || 1;
  return <div className="funnel">{snapshot.funnel.map((stage) => <div key={stage.label}><div><span>{stage.label}</span><strong>{stage.value}</strong></div><i><b style={{ width: `${(stage.value / max) * 100}%` }} /></i></div>)}</div>;
}

function SourceList({ snapshot }: { snapshot: ExecutiveSnapshot }) {
  return <div className="sources">{snapshot.sources.map((source) => <div key={source.id}><span className={`health ${source.state}`} /><p>{source.label}<small>{source.records.toLocaleString()} records · {source.latencyMs}ms</small></p><time>{source.lastSync}</time></div>)}</div>;
}

function PartnerTable({ snapshot }: { snapshot: ExecutiveSnapshot }) {
  return <div className="table"><div className="tableHead"><span>Partner</span><span>Revenue</span><span>Cost</span><span>Margin</span><span>Trend</span></div>{snapshot.partners.map((partner) => <div className="tableRow" key={partner.partner}><strong>{partner.partner}</strong><span>{money.format(partner.revenue)}</span><span>{money.format(partner.cost)}</span><span>{percent(partner.margin)}</span><span className={partner.trend >= 0 ? "up" : "down"}>{partner.trend >= 0 ? "+" : ""}{percent(partner.trend)}</span></div>)}</div>;
}
