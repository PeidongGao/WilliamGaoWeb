# Markdown content negotiation

Serves a Markdown rendering of any page to clients that send
`Accept: text/markdown`. Browsers are unaffected and continue to get HTML.

## Why a Worker

The origin is GitHub Pages, which serves static files and cannot negotiate on
the `Accept` header. Cloudflare's built-in **Markdown for Agents** converter
does exactly this, but requires a Pro plan; this zone is on Free. The Worker
reproduces the behaviour at the edge instead.

Workers' free tier allows 100,000 requests/day. This site sees well under that,
and the Worker only does conversion work on Markdown requests — ordinary browser
traffic is passed straight through.

## Deploy

```bash
npm install -g wrangler        # once
wrangler login                 # opens a browser to authorise
cd workers/markdown-negotiation
wrangler deploy
```

## Verify

```bash
# Markdown for an agent
curl -H "Accept: text/markdown" https://williampeidonggao.com/ -i | head -20

# HTML still the default for a browser
curl -H "Accept: text/html" https://williampeidonggao.com/ -I
```

Expect `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, and an
`X-Markdown-Tokens` header on the first; `text/html` on the second.

Then run the conformance scan:

```bash
curl -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url":"https://williampeidonggao.com"}'
```

`checks.contentAccessibility.markdownNegotiation.status` should read `"pass"`.

## Rollback

```bash
wrangler delete
```

Removing the Worker restores the previous behaviour exactly; nothing in the
Jekyll site depends on it.

## Notes

- `Vary: Accept` is set on **all** responses, including HTML ones, so no cache
  can serve an agent's Markdown to a browser or the reverse.
- The author sidebar, nav and footer are stripped; the article `<header>` is
  kept, since it carries the title, author list and co-first-author marker.
- JSON-LD blocks are appended verbatim under a `## Structured data` heading.
- Only `200` HTML responses are converted; everything else passes through.
