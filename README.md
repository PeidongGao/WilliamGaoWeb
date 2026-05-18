# William Gao

This repository contains the source code for my personal academic website:

https://williampeidonggao.com/

I use this site to keep a public record of my research interests, publications, presentations, CV, and selected work in bioinformatics and multi-omics analysis.

## About

I am William (Peidong) Gao, a Ph.D. candidate in Genetics at Case Western Reserve University. My work focuses on bioinformatics, multi-omics analysis, human islet cells, and diabetes.

## Local Development

Install dependencies:

```bash
bundle install
```

Build the site:

```bash
bundle exec jekyll build
```

Preview locally:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
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

After editing and checking the local preview:

```bash
git status
git add .
git commit -m "Describe the site update"
git push origin master
```

GitHub Pages rebuilds the public site after each push to `master`.
