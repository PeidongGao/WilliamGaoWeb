# William Peidong Gao

This repository contains the source code for my personal academic website:

https://williampeidonggao.com/

I use this site to keep a public record of my research interests, publications, presentations, CV, and selected work in bioinformatics and multi-omics analysis.

## About

I am William Peidong Gao, a Ph.D. candidate in Genetics at Case Western Reserve University. My work focuses on bioinformatics, multi-omics analysis, human islet cells, and diabetes.

## Local Development

Use Ruby 3.4.11, Bundler 4.0.23, and Node 26.12.1 or a newer patched 26.x
release. Version files are committed alongside both dependency lockfiles.
`scripts/site` selects a site-local Node installation under `local/toolchains`
and Homebrew's `ruby@3.4` when present, and checks the runtime versions.

Install the locked dependencies:

```bash
scripts/site bundle install
scripts/site npm ci --ignore-scripts
```

Build the site:

```bash
scripts/site npm run build:js
scripts/site bundle exec jekyll build
```

Preview locally:

```bash
scripts/site npm run serve -- --host 127.0.0.1 --port 4000
```

Then open:

```text
http://127.0.0.1:4000/
```

## Publishing Workflow

Before editing:

```bash
git pull --ff-only origin master
```

Create a branch, edit the site, and check the local preview. Stage only the
intended files, commit, push the branch, and open a pull request.

Use a feature branch and pull request for updates. The `Build and audit` check
audits the locked Ruby and npm dependencies, tests the Worker, and builds the
site. After a passing pull request is merged to `master`, the same workflow
publishes the generated `_site` artifact to GitHub Pages. The legacy Pages
dependency bundle is no longer used.

The Cloudflare Worker is deployed separately:

```bash
scripts/site npm test
scripts/site npx --no-install wrangler deploy --dry-run --config workers/markdown-negotiation/wrangler.toml
scripts/site npx --no-install wrangler deploy --keep-vars --config workers/markdown-negotiation/wrangler.toml
```

See `SECURITY.md` for maintenance checks and the local preview boundary.
