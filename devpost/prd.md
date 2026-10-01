---
doc: prd
status: approved
created: 2026-10-01
process: post-prototype-skill-pack-reconciliation
---

# AI Prompt Builder - Product Requirements

Current official 3-prd reconciliation grounded in the owner answer packet and approved scope, after the first prototype existed. This is not original pre-build planning. Approved 2026-10-01 by the owner's explicit conditional approval covering current presentation, defaults, generation, reset and copy/fallback; source inspection confirmed those descriptions. No hands-on review is implied.

## The Core Journey

Source: scope.md > The Core Loop and What "Working" Looks Like.

1. Open the builder and enter a rough or incomplete idea in Goal.
2. Fill guided context, audience, constraints, tone and desired output fields; use source notes and review focus when relevant.
3. Generate reusable text organized into explicit instructions and headings.
4. Review the prompt and checklist to recognize what became clearer or more complete.
5. Copy for use elsewhere, or use the visible manual-selection fallback if clipboard access fails.
6. Reset for another idea. The existing client-update sample is an alternate starting point.

## Screens and Layout

Source: scope.md > The POC Boundary.

One working surface, no landing page or account screens. Current prototype observation: labeled input form and output/checklist alongside each other on desktop, stacked at narrow widths. Generate, Copy, Load sample and Reset are visible controls. No redesign proposed; retaining this layout was explicitly approved by the owner on 2026-10-01.

## Look and Feel

Owner-established direction: clear first screen, practical, no decorative overbuild, desktop/mobile usable. Existing light background, dark text, restrained teal actions, amber focus treatment and system-font fallback are retained under current owner approval of the existing presentation. Markdown-only planning review; no optional HTML companion.

## Features and Behavior

### Guided Prompt Inputs

Source: scope.md > The Unique Kernel.

Goal, Context, Audience, Constraints, Tone, Output format, Examples/source notes and Review checklist focus are editable. Users supply the information that matters. Output reflects supplied values without inventing missing project facts.

### Structured Prompt and Checklist

Source: scope.md > What "Working" Looks Like.

Output organizes ingredients under headings and includes output expectations, review criteria and a final instruction to check the eventual answer. A separate checklist makes audience, constraints, format and review focus visible. It does not grade quality, run the prompt, compare model answers or automatically explain semantic improvement.

Actual owner hands-on feedback must establish whether the organization/checklist helps explain added clarity; successful text generation alone does not establish understanding or better AI answers.

### Copy, Sample and Reset

Source: scope.md > The Core Loop.

Copy generated output, not a placeholder; show copy success or selection fallback. Sample fills the fields with the existing client-update scenario and generates output. Reset clears inputs to form defaults and restores initial output/checklist/status.

## States and Boundaries

Observed existing behavior approved for retention:

- First use: empty text fields and existing tone/format defaults; output invites generation.
- Empty/minimal generation: blank optional sections skipped; blank goal uses a generic fallback task. Defaults and fixed output instructions still appear, not an AI answer or a complete task-specific prompt.
- Generation: structured prompt/checklist and Prompt ready status.
- Copy before generation: Nothing to copy status.
- Clipboard unavailable/denied: output selected for manual copy, with fallback status; no browser-policy bypass.
- Reset/reload: input text is not persisted; reset restores form/output defaults.

## Acceptance Criteria

Source: scope.md > What "Working" Looks Like.

- Rough goal plus supplied fields produces corresponding Task/Goal, Context, Audience, Constraints, Tone and Desired Output Format headings with user content preserved.
- Source notes and review focus appear in their proper locations when supplied.
- Output includes expectations/review criteria with minimal input without fabricating facts.
- Sample, generate, copy/fallback and reset work end to end.
- Desktop/narrow layouts stay readable; inputs are labeled and keyboard reachable.
- Owner tries the workflow and reports whether added clarity is understandable.

These are expectations, not completed tests.

## Product Decisions

- Owner chose a reusable composition utility for professionals, small businesses, educators, writers and AI beginners.
- Owner defined success as rough idea in, organized prompt out, including copy/reset and understanding of added clarity.
- Owner specified existing static local prototype, no backend, MIT, existing public repo/demo, honest provenance and held submission.
- Owner selected concise batched checkpoints and Markdown review.
- Owner explicitly confirmed retaining the observed visual and empty-state choices in the batched review on 2026-10-01.

## What We're Building

Reconcile and verify the existing composition loop, keeping it distinct from Entry 01. Any required repair is current work with real checks, not original development.

## Deferred From the POC

No new features committed. Further requests require explicit scope decisions.

## Non-Goals

Source: scope.md > Explicitly Cut. No external AI calls, generated answers, backend/accounts, cloud persistence, quality scoring, guaranteed results, private-source copying, deployment or Devpost submission.

## Open Questions

- Product review is approved; retaining plain HTML/CSS/JavaScript and no services/persistence was explicitly approved in the same owner response.
- Build: actual owner hands-on feedback received on 2026-10-01; see verification.md and checklist.md for current completion evidence.
- Ship: hosted video playback, owner-written submission fields and eligibility remain unresolved. No submission action authorized.
