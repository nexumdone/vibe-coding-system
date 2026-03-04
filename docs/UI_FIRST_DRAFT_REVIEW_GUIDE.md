# MISSION OS UI First Draft — Review Guide

## What this draft includes
- Minimal Ops shell layout
- Fleet overview metrics cards
- Active OS selector
- Per-OS dashboard panel
- Boundary event table

## How to open locally
1. Open `ui/mission-os/index.html` in your browser.
2. Switch views using left navigation.
3. Change active OS in selector to verify panel refresh.

## Important note
This draft currently uses seeded sample data in `ui/mission-os/app.js`.
Next iteration should wire it to live outputs from mission-os scaffold/status/event files.

## Review checklist
- Is layout readable and clean enough for first human review?
- Is navigation intuitive?
- Does per-OS panel show the right summary fields?
- What top widgets are missing?
- What should be added/removed before Slice 2 UI enhancement?
