// post-x-promote-make-your-own-bounty-01 — entry program (Node 22, stdlib only).
//
// The entry itself is a post on X: one public post quoting (or linking)
// make.fun's make-your-own-bounty post, with a photo of its own attached
// and the entrant's play code in its text. The house reads that post's
// replies, reposts and quotes straight from X — nothing this program
// writes about the post is scored.
//
// All this program does is hand POST.json (the post's address) to the
// grader: it reads POST.json from the repository, checks it is a JSON
// object naming a real X post URL, and copies it to /output/POST.json.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILE = 'POST.json';
const MAX_POST_BYTES = 16384;

// An X post address as the gate reads it: x.com or twitter.com,
// /<handle>/status/<digits> (or /i/web/status/<digits>), with an
// optional query or fragment after the id, which the gate reads past.
const POST_URL =
  /^https:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:[^/]+\/status|i\/web\/status)\/\d+(?:[?#].*)?$/;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const sourcePath = join(BOT_DIR, POST_FILE);
let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`could not read ${sourcePath}: ${(err as Error).message}`);
}

if (raw!.length > MAX_POST_BYTES) {
  fail(`${POST_FILE} is ${raw!.length} bytes, over the ${MAX_POST_BYTES} byte cap`);
}

let post: unknown;
try {
  post = JSON.parse(raw!.toString('utf8'));
} catch (err) {
  fail(`${POST_FILE} is not valid JSON: ${(err as Error).message}`);
}

if (typeof post !== 'object' || post === null || Array.isArray(post)) {
  fail(`${POST_FILE} must hold a JSON object like {"url": "https://x.com/<handle>/status/<id>"}`);
}

const url = (post as { url?: unknown }).url;
if (typeof url !== 'string' || !POST_URL.test(url)) {
  fail(`${POST_FILE}.url must be an X post address, got: ${JSON.stringify(url)}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, POST_FILE);
// Canonical form: the address as X shows it, without any query or fragment.
const canonical = url.split(/[?#]/, 1)[0];
writeFileSync(outPath, JSON.stringify({ url: canonical }) + '\n', 'utf8');
console.log(`main.ts: wrote ${outPath} (${statSync(outPath).size} bytes) for ${canonical}`);
