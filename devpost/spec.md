---
doc: spec
status: approved
created: 2026-10-01
process: post-prototype-skill-pack-reconciliation
---

# AI Prompt Builder - Technical Spec

Current official 4-spec reconciliation after the existing prototype and public snapshot; not original pre-build planning. Owner explicitly approved retaining this technical approach on 2026-10-01: plain HTML/CSS/JavaScript, local-only execution, no backend, persistence, accounts, analytics or external runtime network dependency. Implementation detail below derives from that approved approach and current source, not unreported owner choices. Approval records that actual response, not a claim of a separate detailed-spec review.

## How This Works, In Plain Language

The page gathers prompt ingredients. JavaScript reads those fields and assembles headings, instructions and a review checklist. It displays reusable text; it does not ask an AI to answer the prompt. CSS controls the existing desktop/narrow layout. Copy is a browser permission-dependent action with manual selection as a fallback. Form state stays in page memory, not storage.

## The Core Journey Through the System

Implements prd.md > The Core Journey.

Goal and other inputs in index.html -> getValues trims field values -> buildPrompt/buildChecklist assemble text -> generatePrompt writes promptOutput.textContent and renders checklist text nodes -> copy handler writes to clipboard or selects the output -> native form reset plus the reset handler restore defaults and initial output.

## Stack

Plain HTML/CSS/JavaScript as explicitly approved; no framework, package dependencies or application build step. Existing browser DOM and clipboard APIs. Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document and https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText.

Tradeoff: simple offline composition without generated AI answers, semantic grading or saved sessions. Existing choices retained; no new architecture introduced.

## Where It Runs and How Someone Tries It

Modern browser. Serve repo root with python -m http.server 8404 --bind 127.0.0.1, then open http://127.0.0.1:8404/. Python is optional localhost preview tooling, not an app dependency. If port occupied use another loopback-only port; do not expose beyond localhost. Stop temporary QA servers when their work ends. Existing README also permits opening index.html directly; current QA should use localhost, not repeat the previously blocked file-path browser route.

No key, account, paid service or deployment required. Public repo https://github.com/micryptrosen/veristio-ai-prompt-builder; existing owner-published demo https://youtu.be/6lem4K_B9V8. Anonymous hosted playback and representative frames checked 2026-10-01; see shipping-readiness.md. Devpost remains held.

## Look and Feel

Implements prd.md > Look and Feel and Screens and Layout. Retain current CSS light surfaces, dark text, teal actions, amber focus, system-font fallback and responsive layout. Existing 840px breakpoint stacks form/output. No redesign or HTML planning companion; build app-map is required separately.

## Components

### Input Form

Implements prd.md > Guided Prompt Inputs. index.html labeled goal/context/audience/constraints/source-notes/review-focus fields and tone/output-format selections. app.js fields object locates these controls. No storage or external calls.

### Prompt Composition

Implements prd.md > Structured Prompt and Checklist. getValues trims inputs; buildPrompt adds nonempty sections, goal fallback and fixed expectations/final instruction; buildChecklist returns five items with audience/constraint/format defaults and review focus. User content rendered as text, not executable markup.

### Output and Clipboard

Implements prd.md > Copy, Sample and Reset. generatePrompt updates textContent and checklist nodes. Copy ignores initial placeholder, tries navigator.clipboard.writeText, and invokes selectPromptText plus status if unavailable or denied. Manual clipboard use is an explicit user action, not automatic persistence.

### Sample and Reset

Implements prd.md > Copy, Sample and Reset and States and Boundaries. sampleScenario supplies current client-update fields and generation. Reset relies on native form defaults, then timeout restores output placeholder, three initial checklist items and Local only status. Copy success/denial never bypasses policy.

## Data Model

Eight string values: goal, context, audience, constraints, tone, outputFormat, sourceNotes, reviewFocus. Live form values and generated output exist only in the DOM/page memory. No cookies, localStorage, database, telemetry or reload restoration. Built-in sample data are explicitly sample content.

## File Structure

```
repo/
  index.html             # form, buttons and output
  styles.css             # current responsive presentation
  app.js                 # composition, checklist, copy/sample/reset
  README.md              # run instructions and demo link
  LICENSE                # MIT for independent prototype
  SOURCE_CUSTODY.md      # reference boundaries
  ROADMAP.md             # future work
  DEMO_SCRIPT.md         # local demonstration sequence
  DEVPOST_REQUIREMENTS.md # readiness, not submission approval
  .gitignore             # excludes personal profile and credentials
  devpost/
    learner-profile.md   # ignored personal context
    scope.md             # approved current scope
    prd.md               # approved current product requirements
    spec.md              # this current technical plan
    checklist.md         # prospective reconciliation work state
    app-map.html         # generated after reviewed/finished code
```

Installed curriculum under .agents/skills and related installer files are locally excluded tooling, not project progress or public outputs.

## External Services and Dependencies

No application endpoints, keys, accounts, network dependency or payment. GitHub/video URLs are sharing evidence, not runtime services. Official Skill Pack installation already used network; that is tooling provenance, not app traffic. Do not download dependencies or contact external services for the app.

## Important Failure Modes

- Missing optional fields: skip sections; blank goal uses generic fallback. Do not interpret defaults as supplied facts.
- Clipboard unavailable/denied: display fallback status and select text; user manually copies.
- Narrow viewport: use existing breakpoint and wrapped output; verify actual layout, not CSS assumptions alone.

## What Was Simplified and Why

- Local deterministic composition instead of AI-service integration: proves the agreed reusable-prompt loop without service complexity.
- Page memory instead of persisted sessions: explicitly approved no persistence.
- Retain existing prototype rather than manufacture a rebuild: current work is verification/reconciliation, not original implementation.

## Decisions and Open Issues

Owner approved technical approach and fast mode on 2026-10-01. Their stated uncertainty is how owner decisions become documents and trustworthy build evidence when agents implement. Investigate one real trace: prd.md > Structured Prompt and Checklist -> app.js buildPrompt/buildChecklist -> observed generation and user feedback. Test output proves assembly, not understanding or model performance.

Owner approved the displayed single-slice checklist and supplied actual hands-on feedback on 2026-10-01. Final review and the concise wrap-up are recorded in checklist.md. Current hosted video playback was observed without authentication; see shipping-readiness.md for exact checks and remaining gaps. Owner-authored submission answers and eligibility remain separate from technical readiness.
