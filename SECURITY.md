# Security maintenance

The public site consists of static Jekyll output on GitHub Pages and an edge
Worker on Cloudflare. PHP, Next.js, and a Python application server are not part
of the site's runtime.

## Dependencies and publication

- Commit `Gemfile.lock` and `package-lock.json`; use `bundle install` and
  `npm ci --ignore-scripts` with the recorded runtime versions.
- Production builds run the repository's locked dependencies in GitHub Actions.
  The unused `github-pages` meta-package and its remote-theme/archive dependency
  chain have been removed. Jekyll remains on the existing 3.10 renderer.
- Dependabot checks Ruby, npm, Docker images, and GitHub Actions weekly.
  Actions are pinned to immutable commit hashes. Build jobs have read-only
  repository access; only the Pages deployment job receives Pages/OIDC writes.
- The build fails on known dependency advisories, Worker regression failures,
  generated asset drift, or accidental publication of build/configuration files.

Run the checks locally:

```sh
scripts/site bundle exec bundler-audit check --update
scripts/site npm audit --audit-level=low
scripts/site npm test
scripts/site npm run build:js
scripts/site bundle exec jekyll build
```

Update the runtime pins and Docker tags together when taking a security release.
Review lockfile changes, rerun the checks, and publish through a passing pull
request. Never run `npm audit fix --force` without reviewing its proposed changes.

## Preview and edge behavior

The Compose preview publishes port 4000 only on `127.0.0.1`. Its container runs
as an unprivileged user and uses the same locked Ruby dependencies. The native
Node JavaScript watcher avoids the former `onchange`/`braces` dependency chain.

The Worker converts only public GET HTML responses, reads at most 1 MiB plus
one incoming chunk before falling back to streaming the complete origin body,
preserves cache variation, and does not replay requests. HTTPS responses receive
HSTS without `includeSubDomains`; HTML receives a report-only CSP for evaluation
before any policy enforcement. Normal HTML remains available when conversion
fails or exceeds the size limit.

Credentials belong in the provider's secret store, not in this repository.
`.env` files, private keys, local tools, source configuration, and Worker sources
must stay out of the published Jekyll artifact.
