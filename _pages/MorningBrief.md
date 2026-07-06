---
title: "MorningBrief"
layout: single
permalink: /resources/MorningBrief/
author_profile: true
accent: lab
type: tools
topics: [automation, learning, tools]
date: 2026-07-06
status: published
summary: "A personal Chief of Staff layer for Codex that turns your knowledge, priorities, and operating principles into decision-ready morning briefings."
---

MorningBrief transforms Codex into your personal Chief of Staff. By combining
your knowledge, priorities, and operating principles, it generates consistent,
decision-ready morning briefings tailored to how you think and work.

MorningBrief is a local CLI for running a configured Codex-based Morning Brief
workflow and browsing saved reports through a read-only Streamlit interface.
It wraps an existing prompt workflow: `mb run` executes the configured prompt,
extracts the generated brief, saves it as Markdown, and updates a CSV index;
`mb serve` opens a local reader for previous reports.

The project is designed for low-volume, user-initiated personal review. Local
paths, prompts, source materials, generated reports, and Codex session logs stay
outside the public repository and are configured through `.env` or environment
variables.

## Usage

Generate today's Morning Brief:

```bash
mb run
```

Launch the local reader:

```bash
mb serve
```

The reader displays saved reports, scan statistics, metadata, and file
locations. It does not launch the workflow or write report data.

## Configuration

MorningBrief keeps machine-specific settings out of source code. A local `.env`
file or environment variables define the Codex workspace, prompt file, input
source directories, Codex session directory, output data directory, and Codex
binary.

Example configuration keys include:

```text
MB_CODEX_REPO=/path/to/your/codex-workspace
MB_PROMPT_FILE=/path/to/your/prompt.md
MB_VAULT_DIR=/path/to/your/input-notes
MB_AUTOMATION_MEMORY_DIR=/path/to/your/automation-memory
MB_SESSIONS_ROOT=~/.codex/sessions
MB_DATA_ROOT=/path/to/your/output-data
MB_CODEX_BINARY=codex
```

## Project Links

- [WillGaoLab repository](https://github.com/WillGaoLab/MorningBrief)
- [Primary development repository](https://github.com/PeidongGao/MorningBrief)
- [Usage disclaimer](https://github.com/PeidongGao/MorningBrief/blob/main/DISCLAIMER.md)
- [MIT License](https://github.com/PeidongGao/MorningBrief/blob/main/LICENSE)
- [WillGaoLab profile and project index](https://github.com/WillGaoLab/WillGaoLab)

## Privacy and Scope

MorningBrief does not include private prompts, notes, Codex session logs,
generated reports, local configuration, or source material. Users decide what
local files the configured workflow may read and are responsible for reviewing
generated reports before using, publishing, or redistributing them.

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
