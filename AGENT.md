# Agent notes — post-x-promote-make-your-own-bounty-01

The entry is a post on X, not the code. One public post quoting (or
linking) make.fun's make-your-own-bounty post
(https://x.com/makefunai/status/2124915864336236646), with a photo of
its own attached and the entrant's play code in its text. The house
reads the post's replies + reposts + quotes from X at the deadline;
top 50 share $250.

This repo only hands the post's address to the grader:

- `POST.json` — `{"url": "https://x.com/<handle>/status/<id>"}`,
  replaced with the real post's address before submitting.
- `main.ts` — reads `POST.json`, validates the URL shape, copies it to
  `/output/POST.json`. Run locally with
  `MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`.
- `.makefun/owner.json` — the payout wallet, proving the repo is the
  entrant's.
