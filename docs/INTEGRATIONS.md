# Integration map

The production problem behind Adtex involved systems with different owners, schemas, authentication mechanisms, and refresh cadences. The portfolio edition preserves those architectural responsibilities while replacing every real connection with a safe contract and fictional data.

## Performance platform

**Responsibility:** daily revenue, cost, profit, traffic, partner performance, and pair-level economics.

**Important behaviors represented:**

- daily and intraday snapshots;
- partner-level normalization;
- date-range backfills;
- source-versus-warehouse audit comparison;
- retry and token-refresh boundaries;
- margin and pacing signals.

The original provider name, endpoints, authentication flow, account identifiers, and payloads are not included.

## Monday.com

**Responsibility:** commercial and operations workflows across leads, qualification, operational approval, negotiation, signature, and won/lost outcomes.

**Important behaviors represented:**

- stage normalization into one funnel model;
- conversion rates and bottleneck detection;
- creation/activity timestamps;
- segmentation-ready dimensions;
- schema isolation through a CRM connector.

No board IDs, item IDs, column IDs, user details, company records, or API credentials are present.

## Google Sheets

**Responsibility:** financial planning and operational ledgers, including billing, goals, collections, and P&L inputs.

**Important behaviors represented:**

- month and entity normalization;
- revenue and cost classification;
- goal-versus-actual calculations;
- collection-rate visibility;
- server-side credential boundary.

No spreadsheet IDs, ranges from real workbooks, service-account details, vendor names, or financial records are present.

## Supabase

**Responsibility:** normalized persistence, historical snapshots, cached reporting views, audit logs, notification state, and access control.

**Important behaviors represented:**

- canonical warehouse boundary;
- idempotent writes and historical reads;
- row-level-security expectations;
- freshness and failure telemetry;
- report-ready models.

The public demo runs without a database. A production adapter would implement the same connector contract privately.

## Scheduled orchestration

**Responsibility:** independent update cadences for fast-changing operational data and slower financial or CRM sources.

The architecture supports:

- recurring incremental sync;
- hourly snapshots;
- a daily authoritative reconciliation;
- health verification;
- targeted backfill and self-healing;
- management summary generation.

The public demo builds the same canonical snapshot on demand and exposes it through `GET /api/dashboard`.

## Alerts and reporting

**Responsibility:** move the platform from passive reporting to operational intervention.

The represented rule layer includes margin thresholds, goal pacing, funnel conversion, source freshness, and sync failures. Delivery can be implemented through Web Push, email, or team messaging without coupling those channels to the core calculations.

Periodic executive reports consume the same canonical model as the dashboard, preventing competing KPI definitions across channels.

## Legacy authentication boundary

Some business systems do not provide durable API authentication. The production architecture isolated browser-based session renewal from business logic and stored refreshed credentials only in protected server-side configuration.

The public edition documents this boundary but deliberately contains no automation script, login URL, selectors, credentials, cookies, or token-storage implementation.
