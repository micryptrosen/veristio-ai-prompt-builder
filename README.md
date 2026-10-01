# AI Prompt Builder

A dependency-free local browser prototype for Build With AI Hackathon #2.

## Features

- Collect goal, context, audience, constraints, tone, source notes, output format, and review criteria.
- Generate a structured reusable prompt and short review checklist.
- Load a sample, reset fields, and copy the generated prompt.

## Run Locally

Open `index.html` in a browser, or serve this folder over localhost:

```bash
python -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/`. No dependency installation, account, API key, or paid service is needed. The app uses plain HTML, CSS, and JavaScript with no external network calls, telemetry, or input storage. Clipboard availability depends on the browser; use the displayed fallback selection when necessary.

## Demo

[Watch the demo](https://youtu.be/6lem4K_B9V8). Owner-published; anonymous browser playback and representative workflow frames were checked on 2026-10-01. Reported player duration: 62.941 seconds.

## Limitations

A local prompt composition tool, distinct from the learning challenge. It composes reusable text without invoking an AI service. Project Designer and Book 19 remain concept/reference sources only.

## Project Notes

See `ROADMAP.md`, `DEMO_SCRIPT.md`, `DEVPOST_REQUIREMENTS.md`, and `SOURCE_CUSTODY.md`. This repository is a fresh publication snapshot of an independently developed local prototype; its first commit does not represent the beginning of development. Devpost submission has not been performed.

The `devpost/` documents record a current official Skill Pack rerun/reconciliation on 2026-10-01 **after the first prototype existed**, not original pre-build planning. See `devpost/verification.md`, `devpost/checklist.md`, and `devpost/shipping-readiness.md` for actual checks and remaining gates. `devpost/app-map.html` is an offline reference guide, not part of the app. Personal learner context and raw local captures are excluded from publication.

## License

MIT. See `LICENSE`. The license covers this independent prototype, not excluded source-reference materials.
