# IKP DASHBOARD — Pipeline Status & Analytics

## Purpose

Provide real-time visibility into the intake pipeline: how many leads are
at each stage, which leads need follow-up, which leads have approaching
SOL deadlines, and conversion analytics by lead source.

## Dashboard Views

### 1. Pipeline Funnel (ikp_pipeline view)

Shows lead counts by status with case-type breakdown:

```
INTAKE PIPELINE — {date}
================================================
Status                | Total | MVC | Premises | Med Mal | WD | High Value
-------------------------------------------------------------------
NEW                   |   {n} | {n} |    {n}   |   {n}   | {n}|    {n}
CONTACTED             |   {n} | {n} |    {n}   |   {n}   | {n}|    {n}
SCREENED              |   {n} | {n} |    {n}   |   {n}   | {n}|    {n}
CONSULTATION-SCHED    |   {n} | {n} |    {n}   |   {n}   | {n}|    {n}
CONSULTATION-COMPLETE |   {n} | {n} |    {n}   |   {n}   | {n}|    {n}
ACCEPTED              |   {n} | {n} |    {n}   |   {n}   | {n}|    {n}
SIGNED                |   {n} | {n} |    {n}   |   {n}   | {n}|    {n}
================================================
```

### 2. SOL Watchlist (ikp_statute_watchlist view)

Critical: leads with approaching statute deadlines that have NOT yet signed.

```
SOL WATCHLIST — {date}
=======================================================
Lead ID  | Name     | Type | DOI      | SOL Date   | Days | Urgency  | Status   | Assigned To
---------------------------------------------------------------------------
{id}     | {name}   | {t}  | {doi}    | {sol}      | {d}  | CRITICAL | {status} | {staff}
{id}     | {name}   | {t}  | {doi}    | {sol}      | {d}  | URGENT   | {status} | {staff}
{id}     | {name}   | {t}  | {doi}    | {sol}      | {d}  | WATCH    | {status} | {staff}
=======================================================

GOVERNMENT NOTICE DEADLINES (90-day Tort Claims)
{separate listing for government entity leads with notice deadlines}
```

### 3. Follow-Up Queue (ikp_followup_queue view)

Leads that need contact, sorted by urgency:

```
FOLLOW-UP QUEUE — {date}
=======================================================
Lead ID  | Name     | Status  | Last Contact | Days Ago | Next Follow-Up | Urgency
---------------------------------------------------------------------------
{id}     | {name}   | {s}     | {date}       | {d}      | OVERDUE        | OVERDUE-FOLLOWUP
{id}     | {name}   | {s}     | {date}       | {d}      | {date}         | STALE
{id}     | {name}   | {s}     | {date}       | {d}      | {date}         | NEEDS-CONTACT
=======================================================
```

### 4. Conversion Analytics (ikp_conversion_analytics view)

By lead source:

```
CONVERSION ANALYTICS — {date range}
=======================================================
Source           | Total | Signed | Rate  | Lost | Loss Rate | High Value
---------------------------------------------------------------------------
REFERRAL         |  {n}  |  {n}   | {n}%  | {n}  |   {n}%    |    {n}
WEBSITE          |  {n}  |  {n}   | {n}%  | {n}  |   {n}%    |    {n}
GOOGLE-ADS       |  {n}  |  {n}   | {n}%  | {n}  |   {n}%    |    {n}
...
=======================================================
```

## Key Metrics

| Metric | Target | Calculation |
|--------|--------|-------------|
| Speed to lead | < 15 min | Time from lead_date to first activity_date |
| Contact rate | > 90% | CONTACTED+ / NEW total |
| Screen-to-consult | > 70% | CONSULTATION-COMPLETE / SCREENED |
| Accept rate | > 50% | ACCEPTED / CONSULTATION-COMPLETE |
| Sign rate | > 80% | SIGNED / ACCEPTED |
| Overall conversion | > 25% | SIGNED / Total leads |
| Avg. time to sign | < 7 days | retainer_signed_date - lead_date |
| SOL compliance | 100% | Zero EXPIRED leads that were in active pipeline |

## Filters

Dashboard supports filtering by:
- Date range (lead_date)
- Assigned staff member
- Incident type
- Estimated value tier
- Lead source
- Status
