-- ============================================================================
-- SDC v1.0 — SCHEMA EXTENSION for Law-OS v7.0
-- Strategic Disclosure Controller — Disclosure Tracking Hub
-- ============================================================================
--
-- This extension adds disclosure tracking tables to the Law-OS schema.
-- SDC operates as an overlay — it references existing Hub tables via
-- source_hub, source_id, and element_id without modifying them.
--
-- INSTALL: Run after the core schema.sql has been applied.
-- ============================================================================

-- ============================================================================
-- SDC HUB: Disclosure Tracking — <strategic_layer> extension
-- Tracks what has been disclosed, when, how, and to whom.
-- Maintains the Surprise Inventory and Bluff Register.
-- ============================================================================

-- SDC.1 Disclosure Ledger — one row per tracked information item
CREATE TABLE IF NOT EXISTS sdc_disclosure_ledger (
    ledger_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    -- Source reference (links to existing Hub data)
    source_hub      TEXT NOT NULL CHECK (source_hub IN (
                        'CFP', 'LPB', 'DPB', 'DVP', 'AIP', 'PCM', 'ADR', 'MANUAL'
                    )),
    source_table    TEXT NOT NULL,               -- e.g., "cfp_facts", "lpb_law", "dpb_requests"
    source_id       TEXT NOT NULL,               -- primary key in source table
    element_id      TEXT,                         -- universal relational key
    -- Item description
    item_summary    TEXT NOT NULL,               -- brief description of the information
    item_type       TEXT NOT NULL CHECK (item_type IN (
                        'Fact', 'Quote', 'Admission', 'Timeline-Event',
                        'Legal-Theory', 'Legal-Authority', 'Witness',
                        'Document', 'Damages-Category', 'Damages-Amount',
                        'Discovery-Request', 'Discovery-Response',
                        'Settlement-Position', 'Expert-Opinion',
                        'Pattern', 'Impeachment-Material', 'Other'
                    )),
    -- Disclosure classification
    disclosure_status TEXT NOT NULL DEFAULT 'UNKNOWN' CHECK (disclosure_status IN (
                        'UNDISCLOSED', 'PARTIALLY-DISCLOSED', 'DISCLOSED-VAGUE',
                        'DISCLOSED-SPECIFIC', 'DISCLOSED-BY-THEM',
                        'DISCLOSED-BY-COURT', 'INFERRED', 'UNKNOWN'
                    )),
    disclosure_method TEXT CHECK (disclosure_method IN (
                        'COMPLAINT', 'DISCOVERY-RESPONSE', 'DISCOVERY-REQUEST',
                        'PRODUCTION', 'DEPOSITION', 'MOTION', 'SETTLEMENT',
                        'MEDIATION', 'TRIAL', 'CORRESPONDENCE', 'INADVERTENT',
                        'COURT-ORDER', NULL
                    )),
    disclosure_date TEXT,                         -- ISO 8601
    disclosure_audience TEXT,                     -- "OC-Smith", "Adj-Martinez", "Court", "Public"
    -- Strategic assessment
    surprise_value  INTEGER CHECK (surprise_value BETWEEN 1 AND 5),
    advantage_category TEXT CHECK (advantage_category IN (
                        'SMOKING-GUN', 'THEORY-HIDDEN', 'WITNESS-UNKNOWN',
                        'TIMELINE-GAP', 'IMPEACHMENT', 'DAMAGES-HIDDEN',
                        'PATTERN', 'ADMISSION-UNUSED', NULL
                    )),
    -- Inference tracking
    inference_chain TEXT,                         -- description of how this could be inferred
    inferred_from   TEXT,                         -- comma-separated ledger_ids that enable inference
    -- Metadata
    classified_by   TEXT,                         -- "SDC-AUDIT", "MANUAL", "SDC-DEBRIEF"
    classified_at   TEXT NOT NULL DEFAULT (datetime('now')),
    last_reviewed   TEXT,
    notes           TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sdc_ledger_status ON sdc_disclosure_ledger(disclosure_status);
CREATE INDEX IF NOT EXISTS idx_sdc_ledger_element ON sdc_disclosure_ledger(element_id);
CREATE INDEX IF NOT EXISTS idx_sdc_ledger_source ON sdc_disclosure_ledger(source_hub, source_id);
CREATE INDEX IF NOT EXISTS idx_sdc_ledger_surprise ON sdc_disclosure_ledger(surprise_value);
CREATE INDEX IF NOT EXISTS idx_sdc_ledger_category ON sdc_disclosure_ledger(advantage_category);


-- SDC.2 Disclosure Events — audit trail of every disclosure that occurred
CREATE TABLE IF NOT EXISTS sdc_disclosure_events (
    event_id        INTEGER PRIMARY KEY AUTOINCREMENT,
    -- What happened
    event_type      TEXT NOT NULL CHECK (event_type IN (
                        'INTENTIONAL', 'INADVERTENT', 'COMPELLED',
                        'RECEIVED', 'INFERRED'
                    )),
    event_date      TEXT NOT NULL,               -- ISO 8601
    event_description TEXT NOT NULL,              -- "Deposition of Dr. Smith", "Filed MTC"
    -- Who and how
    method          TEXT NOT NULL,                -- from Disclosure Method taxonomy
    audience        TEXT NOT NULL,                -- who learned the information
    vehicle         TEXT,                         -- "Depo transcript pp. 45-48", "Motion ECF #32"
    -- What was disclosed
    ledger_ids      TEXT NOT NULL,                -- comma-separated ledger_ids affected
    -- Impact assessment
    items_newly_disclosed INTEGER DEFAULT 0,
    items_upgraded      INTEGER DEFAULT 0,        -- VAGUE → SPECIFIC, etc.
    items_inferred      INTEGER DEFAULT 0,
    surprise_value_lost INTEGER DEFAULT 0,        -- aggregate SV lost
    -- Source
    logged_by       TEXT DEFAULT 'SDC-DEBRIEF',
    notes           TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sdc_events_date ON sdc_disclosure_events(event_date);
CREATE INDEX IF NOT EXISTS idx_sdc_events_type ON sdc_disclosure_events(event_type);


-- SDC.3 Posture History — track posture changes over time
CREATE TABLE IF NOT EXISTS sdc_posture_history (
    posture_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    posture         TEXT NOT NULL CHECK (posture IN (
                        'TIGHT', 'SELECTIVE', 'PROGRESSIVE',
                        'OVERWHELMING', 'DEFENSIVE'
                    )),
    effective_date  TEXT NOT NULL,                -- ISO 8601
    litigation_phase TEXT NOT NULL CHECK (litigation_phase IN (
                        'Pre-Suit', 'Early-Discovery', 'Mid-Discovery',
                        'Late-Discovery', 'Pre-Mediation', 'Post-Mediation',
                        'Pre-Trial', 'Trial', 'Post-Trial'
                    )),
    rationale       TEXT NOT NULL,                -- why this posture was selected
    approved_by     TEXT,                         -- senior attorney who approved
    -- Context at time of selection
    pcm_readiness   TEXT,                         -- from pcm_claim_summary
    surprise_count  INTEGER,                      -- items with SV ≥ 3
    momentum        TEXT,                         -- from cfp_timeline
    oc_profile_ref  TEXT,                         -- aip_opposing_counsel.oc_id
    judge_profile_ref TEXT,                       -- aip_judges.judge_id
    notes           TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);


-- SDC.4 Bluff Register — track active bluff strategies
CREATE TABLE IF NOT EXISTS sdc_bluff_register (
    bluff_id        TEXT PRIMARY KEY,             -- e.g., "BLUFF-2025-001"
    bluff_type      TEXT NOT NULL CHECK (bluff_type IN (
                        'STRENGTH-PROJECTION', 'THEORY-DECOY',
                        'READINESS-BLUFF', 'NUMBERS-ANCHOR',
                        'DISCOVERY-FEINT', 'WITNESS-IMPLICATION',
                        'TIMELINE-PRESSURE', 'SILENCE-AS-STRENGTH'
                    )),
    target          TEXT NOT NULL,                -- OC name, adjuster name, etc.
    target_aip_ref  TEXT,                         -- aip table reference
    objective       TEXT NOT NULL,                -- what we want them to believe
    -- Status tracking
    status          TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN (
                        'ACTIVE', 'CALLED', 'CONVERTED', 'ABANDONED', 'EXPOSED'
                    )),
    risk_level      TEXT NOT NULL CHECK (risk_level IN (
                        'LOW', 'MODERATE', 'HIGH', 'CRITICAL'
                    )),
    -- Strategy details
    setup_moves     TEXT,                         -- what was done to set up
    the_play        TEXT NOT NULL,                -- the bluff itself
    maintenance_plan TEXT,                        -- how to sustain
    exit_strategy   TEXT NOT NULL,                -- what if called
    ethical_analysis TEXT NOT NULL,               -- RPC compliance analysis
    -- Approval
    approved_by     TEXT,                         -- senior attorney
    approved_date   TEXT,
    -- Lifecycle
    started_date    TEXT,
    last_maintained TEXT,
    resolved_date   TEXT,
    resolution_notes TEXT,
    notes           TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sdc_bluff_status ON sdc_bluff_register(status);
CREATE INDEX IF NOT EXISTS idx_sdc_bluff_type ON sdc_bluff_register(bluff_type);


-- SDC.5 Reveal Plans — planned disclosure sequences
CREATE TABLE IF NOT EXISTS sdc_reveal_plans (
    plan_id         TEXT PRIMARY KEY,             -- e.g., "REVEAL-2025-001"
    plan_name       TEXT NOT NULL,
    timing_type     TEXT NOT NULL CHECK (timing_type IN (
                        'AMBUSH-DEPO', 'AMBUSH-TRIAL', 'MEDIATION-BOMB',
                        'MOTION-REVEAL', 'DEMAND-LEVERAGE',
                        'PROGRESSIVE-DRIP', 'PREEMPTIVE'
                    )),
    -- What to reveal
    ledger_ids      TEXT NOT NULL,                -- comma-separated ledger_ids to reveal
    -- Planning
    target_audience TEXT NOT NULL,
    target_date     TEXT,                         -- planned reveal date
    vehicle         TEXT,                         -- "Deposition of X", "Mediation", "Motion"
    framing_notes   TEXT,                         -- how to present for max impact
    sequence_notes  TEXT,                         -- ordering if multi-item
    -- Status
    status          TEXT NOT NULL DEFAULT 'PLANNED' CHECK (status IN (
                        'PLANNED', 'APPROVED', 'EXECUTING', 'COMPLETED',
                        'ABORTED', 'DEFERRED'
                    )),
    approved_by     TEXT,
    executed_date   TEXT,
    -- Post-execution
    execution_notes TEXT,
    impact_assessment TEXT,
    ledger_updates  TEXT,                         -- what changed in the Ledger
    notes           TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sdc_reveal_status ON sdc_reveal_plans(status);
CREATE INDEX IF NOT EXISTS idx_sdc_reveal_date ON sdc_reveal_plans(target_date);


-- ============================================================================
-- SDC VIEWS — Analytical overlays
-- ============================================================================

-- SDC.V1 Surprise Inventory VIEW — items with active information advantage
CREATE VIEW IF NOT EXISTS sdc_surprise_inventory AS
SELECT
    l.ledger_id,
    l.source_hub,
    l.source_id,
    l.element_id,
    l.item_summary,
    l.item_type,
    l.disclosure_status,
    l.surprise_value,
    l.advantage_category,
    l.inference_chain,
    l.notes
FROM sdc_disclosure_ledger l
WHERE l.disclosure_status IN ('UNDISCLOSED', 'PARTIALLY-DISCLOSED')
  AND l.surprise_value >= 3
ORDER BY l.surprise_value DESC, l.advantage_category;

-- SDC.V2 Disclosure Summary VIEW — aggregate statistics
CREATE VIEW IF NOT EXISTS sdc_disclosure_summary AS
SELECT
    disclosure_status,
    COUNT(*) AS item_count,
    ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM sdc_disclosure_ledger), 1) AS pct,
    AVG(surprise_value) AS avg_surprise_value,
    SUM(CASE WHEN advantage_category IS NOT NULL THEN 1 ELSE 0 END) AS categorized_items
FROM sdc_disclosure_ledger
GROUP BY disclosure_status
ORDER BY
    CASE disclosure_status
        WHEN 'UNDISCLOSED' THEN 1
        WHEN 'PARTIALLY-DISCLOSED' THEN 2
        WHEN 'DISCLOSED-VAGUE' THEN 3
        WHEN 'INFERRED' THEN 4
        WHEN 'DISCLOSED-SPECIFIC' THEN 5
        WHEN 'DISCLOSED-BY-THEM' THEN 6
        WHEN 'DISCLOSED-BY-COURT' THEN 7
        WHEN 'UNKNOWN' THEN 8
    END;

-- SDC.V3 Information Advantage by Element VIEW
CREATE VIEW IF NOT EXISTS sdc_element_advantage AS
SELECT
    l.element_id,
    c.claim_name,
    c.element_name,
    COUNT(*) AS total_items,
    SUM(CASE WHEN l.disclosure_status = 'UNDISCLOSED' THEN 1 ELSE 0 END) AS undisclosed,
    SUM(CASE WHEN l.disclosure_status IN ('DISCLOSED-SPECIFIC', 'DISCLOSED-BY-THEM', 'DISCLOSED-BY-COURT') THEN 1 ELSE 0 END) AS fully_disclosed,
    AVG(CASE WHEN l.disclosure_status IN ('UNDISCLOSED', 'PARTIALLY-DISCLOSED') THEN l.surprise_value END) AS avg_hidden_sv,
    CASE
        WHEN SUM(CASE WHEN l.disclosure_status = 'UNDISCLOSED' THEN 1 ELSE 0 END) > 0
             AND MAX(CASE WHEN l.disclosure_status = 'UNDISCLOSED' THEN l.surprise_value ELSE 0 END) >= 4
            THEN 'STRONG-ADVANTAGE'
        WHEN SUM(CASE WHEN l.disclosure_status IN ('UNDISCLOSED', 'PARTIALLY-DISCLOSED') THEN 1 ELSE 0 END) > 0
            THEN 'SOME-ADVANTAGE'
        ELSE 'NO-ADVANTAGE'
    END AS advantage_level
FROM sdc_disclosure_ledger l
LEFT JOIN pcm_claims c ON l.element_id = c.element_id
WHERE l.element_id IS NOT NULL
GROUP BY l.element_id, c.claim_name, c.element_name
ORDER BY
    CASE
        WHEN avg_hidden_sv >= 4 THEN 1
        WHEN avg_hidden_sv >= 3 THEN 2
        ELSE 3
    END,
    undisclosed DESC;

-- SDC.V4 Active Bluffs VIEW — currently running bluff strategies
CREATE VIEW IF NOT EXISTS sdc_active_bluffs AS
SELECT
    b.bluff_id,
    b.bluff_type,
    b.target,
    b.objective,
    b.status,
    b.risk_level,
    b.started_date,
    b.last_maintained,
    JULIANDAY('now') - JULIANDAY(b.last_maintained) AS days_since_maintenance,
    b.notes
FROM sdc_bluff_register b
WHERE b.status = 'ACTIVE'
ORDER BY
    CASE b.risk_level
        WHEN 'CRITICAL' THEN 1
        WHEN 'HIGH' THEN 2
        WHEN 'MODERATE' THEN 3
        WHEN 'LOW' THEN 4
    END;

-- SDC.V5 Pending Reveals VIEW — approved but not yet executed
CREATE VIEW IF NOT EXISTS sdc_pending_reveals AS
SELECT
    r.plan_id,
    r.plan_name,
    r.timing_type,
    r.target_audience,
    r.target_date,
    r.vehicle,
    r.status,
    r.framing_notes
FROM sdc_reveal_plans r
WHERE r.status IN ('PLANNED', 'APPROVED')
ORDER BY r.target_date;


-- ============================================================================
-- SDC Processing Log entries use the existing processing_log table
-- with hub = 'SDC'
-- ============================================================================

-- Record schema extension
INSERT INTO schema_version (version, description)
VALUES ('7.0.1-SDC', 'SDC v1.0 schema extension — Disclosure Tracking Hub (5 tables, 5 views)');
