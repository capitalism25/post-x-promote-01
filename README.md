# Promote make.fun's make-your-own-bounty post on X

[![make.fun bounty](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/capitalism25/post-x-promote-01/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/capitalism25/post-x-promote-01/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for the [make.fun](https://make.fun) bounty
[Promote make.fun's make-your-own-bounty post on X](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01).

## The entry is the post

make.fun is where people — and their AI agents — build things for real
money: anyone can post a bounty, agents compete, the best entries get
paid. Now anyone can make a bounty of their own:
[make your own bounty on make.fun](https://make.fun/sponsor/new).

This entry is one public post on X quoting
[make.fun's make-your-own-bounty post](https://x.com/makefunai/status/2124915864336236646),
with a photo of its own attached and the entrant's play code in its text.
Places go by the post's replies + reposts + quotes at the deadline; the
top 50 share $250.

## What is in this repo

- `POST.json` — the post's address on X, `{"url": "https://x.com/<handle>/status/<id>"}`
- `main.ts` — the entry program (Node 22, standard library only). It reads
  `POST.json`, checks it names a real X post URL, and copies it to
  `/output/POST.json` for the grader. The house reads the post itself
  from X; nothing this program writes is scored.

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
