---
title: "MorningBrief"
layout: single
permalink: /resources/MorningBrief/
author_profile: true
accent: lab
type: tools
topics: [automation, learning, tools]
date: 2026-07-19
status: published
summary: "A personal Chief of Staff layer for Codex that turns your knowledge, priorities, and operating principles into decision-ready morning briefings."
---

MorningBrief transforms GPT-5.6 and Codex into your personal Chief of Staff. By combining
your knowledge, priorities, and operating principles, it generates consistent,
decision-ready morning briefings tailored to how you think and work.

MorningBrief is a local application for running repeatable Codex-based briefing
workflows and browsing saved reports through a read-only Streamlit interface.
`mb run` executes your configured prompt, saves Codex's exact final response as
Markdown, and records the run in an append-only history; `mb serve` opens a
local reader for successful and failed runs.

Version 2.1 expands the public sample into a complete, privacy-safe demo. You
can validate the bundled workflow, generate a real briefing through the Codex
CLI, and browse the result without providing private prompts, notes, memory, or
configuration. Version 2.0 established the reliable application foundation:
portable configuration, setup diagnostics, private state initialization,
atomic writes, rollback on failed runs, and non-destructive same-day reruns.

## Install and Try the Demo

The repository includes fictional sample data, so you can explore the reader
without Codex, private files, or local configuration. Python 3.9 or newer is
required.

```bash
git clone https://github.com/WillGaoLab/MorningBrief.git
cd MorningBrief
python -m venv .venv
source .venv/bin/activate
pip install -e .
mb serve --demo
```

On Windows, activate the environment with `.venv\Scripts\activate` before
installing. The command opens the read-only MorningBrief app with a
pre-generated fictional report, run metadata, and scan statistics. Use
**Close MorningBrief** in the sidebar when you are finished.

## Run the Complete v2.1 Demo

With the Codex CLI installed and available on `PATH`, you can exercise the
entire workflow using only the repository's public fictional fixtures:

```bash
mb doctor --demo
mb run --demo
mb serve --demo
```

The full demo uses a bundled prompt, a 12-file Markdown vault, and seed
operational memory. It ignores `.env` and writes mutable memory, generated
reports, and history only under the Git-ignored
`MorningBriefDataDemo/runtime/` directory. After a successful demo run,
`mb serve --demo` automatically selects the generated runtime history instead
of the pre-generated sample.

## Configure Your MorningBrief

To generate your own reports, you also need the Codex CLI, a prompt, and an
input directory that Codex may access.

First, initialize private operational memory. This command will not overwrite
an existing `memory.md` file:

```bash
mb init --state-dir /path/to/your/morningbrief-state
```

Then copy `.env.example` to `.env` and replace the placeholder paths:

```dotenv
MB_CODEX_REPO=/path/to/your/codex-workspace
MB_PROMPT_FILE=/path/to/your/prompt.md
MB_VAULT_DIR=/path/to/your/input-notes
MB_STATE_DIR=/path/to/your/morningbrief-state
MB_DATA_ROOT=/path/to/your/output-data
MB_CODEX_BINARY=codex
```

`MB_AUTOMATION_MEMORY_DIR` remains available as the legacy name for
`MB_STATE_DIR`. MorningBrief no longer searches global Codex session
directories, so `MB_SESSIONS_ROOT` is not needed.

Validate the setup before generating your first briefing:

```bash
mb doctor
mb run
mb serve
```

You can also provide a configuration file explicitly from any working
directory:

```bash
mb --config /path/to/config.env doctor
mb --config /path/to/config.env run
```

Environment variables override file values. MorningBrief also supports a
platform user-config location, making the installed CLI portable beyond the
repository directory.

## Commands

```text
mb run           Generate and save a new briefing
mb run --demo    Generate from bundled fictional inputs
mb serve         Browse reports from the configured output directory
mb serve --demo  Browse sample or generated fictional demo runs
mb doctor        Validate configuration without generating
mb doctor --demo Validate the full fictional demo workflow
mb init          Create private operational memory safely
```

The reader displays reports, scan statistics, run status, metadata, and file
locations. It remains read-only: it does not launch the workflow or modify
report data.

## Data and Reliability

Each run receives a unique ID. Reports and `history.csv` are written atomically,
and multiple runs on the same day are preserved instead of replacing one
another. Existing date-named reports and older history rows remain readable.

MorningBrief captures the exact final Codex response through
`codex exec --output-last-message`; it does not discover or parse global session
directories. Before generation, it validates the configuration and snapshots
operational memory. If generation or extraction fails, it restores the pre-run
memory and records the failed run for diagnosis.

The demo follows the same separation of source inputs, operational memory, and
generated data as a private workflow. Its public fixtures remain unchanged;
all locally generated demo state lives in the ignored `runtime/` directory.

## Project Links

- [Video walkthrough](https://www.youtube.com/watch?v=SRhJr2AWbc0)
- [Install from the WillGaoLab repository](https://github.com/WillGaoLab/MorningBrief)
- [MorningBrief v2.1.0 release](https://github.com/WillGaoLab/MorningBrief/releases/tag/v2.1.0)
- [Full demo guide](https://github.com/WillGaoLab/MorningBrief/tree/main/MorningBriefDataDemo)
- [Changelog](https://github.com/WillGaoLab/MorningBrief/blob/main/CHANGELOG.md)
- [Primary development repository](https://github.com/PeidongGao/MorningBrief)
- [Primary v2.1.0 release](https://github.com/PeidongGao/MorningBrief/releases/tag/v2.1.0)
- [Usage disclaimer](https://github.com/PeidongGao/MorningBrief/blob/main/DISCLAIMER.md)
- [MIT License](https://github.com/PeidongGao/MorningBrief/blob/main/LICENSE)
- [WillGaoLab profile and project index](https://github.com/WillGaoLab/WillGaoLab)

## Privacy and Scope

MorningBrief is local-first. Private prompts, notes, operational memory, Codex
sessions, generated reports, and local configuration stay outside the public
repository. The included demo contains fictional public content only.

Users decide which local files the configured workflow may read and are
responsible for reviewing generated reports before using, publishing, or
redistributing them.

## Usage Disclaimer

This tool is for informational and personal workflow purposes only. It does not
provide legal, medical, financial, investment, tax, security, or other
professional advice. Generated briefs may be incomplete, outdated, inaccurate,
or inappropriate for a particular decision.

Users are responsible for complying with the terms of any model provider, data
provider, API, website, document source, or other third-party service involved
in their configured workflow.

## Attribution and Affiliation

This is a WillGaoLab project created and maintained by William (Peidong) Gao.

- Project website: <https://williampeidonggao.com>
- Brand: <https://github.com/WillGaoLab>
- Personal GitHub: <https://github.com/PeidongGao>

```text
William (Peidong) Gao
        |
    WillGaoLab
        |
Open-source Projects
        |
   MorningBrief
```

This project is not affiliated with, endorsed by, sponsored by, or officially
associated with OpenAI, Codex, Streamlit, GitHub, any data provider, any model
provider, or any other entity referenced here.

All trademarks, product names, company names, and service names are the
property of their respective owners and are used solely for identification and
descriptive purposes.

## License

Original code and documentation are released under the
[MIT License](https://github.com/PeidongGao/MorningBrief/blob/main/LICENSE)
© 2026 William Gao. The MIT grant covers this project's own source and
documentation only; it does not extend to third-party content, private
documents, API outputs, model outputs, datasets, trademarks, logos, product
names, or other materials referenced by a configured workflow or generated
report.
