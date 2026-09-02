# Security

## Portfolio boundary

This repository is a clean-room portfolio implementation. It contains only synthetic organizations, partners, financial figures, source identifiers, and timestamps. It does not contain production source code, credentials, customer data, internal identifiers, or private endpoints.

The provider modules are contracts and deterministic demo adapters. Connecting real systems requires a separate private implementation and server-side secret management.

## Controls demonstrated

- No client-side secrets
- Environment-based configuration
- Read-only synthetic mode by default
- Least-privilege CI permissions
- Typed provider boundaries
- Source-health and freshness reporting
- Explicit operational alerts
- Audit-friendly snapshot model

## Reporting

If you find a security concern in this portfolio repository, please report it privately through GitHub rather than opening a public issue.
