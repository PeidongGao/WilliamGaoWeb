---
title: "Daily Market Tracker"
layout: single
permalink: /resources/daily-market-tracker/
author_profile: true
accent: lab
type: tools
topics: [automation, data-analysis, investing, tools]
date: 2026-07-19
status: published
summary: "An automated daily market observation system that tracks nine indicators, generates an Overnight Market Fingerprint, and maintains a historical dataset."
---

Daily Market Tracker is an automated market observation system for recording
the opening state of nine financial indicators across equities, risk and
sentiment, and macro conditions.

For eight traditional market instruments, it records the previous Yahoo
Finance daily close, current daily open, absolute gap, and gap percentage.
Because Bitcoin trades continuously, the tracker instead compares its latest
00:00 UTC daily open with the current market price available when the data is
collected.

Those observations are stored in one historical CSV, used to generate a daily
Overnight Market Fingerprint, and presented through a public Streamlit
dashboard. The project is designed to observe market conditions consistently
over time; it does not predict market direction or provide trading
recommendations.

<p class="wg-actions">
{% include button.html href="https://dailymarkettracker-jrnxjbmkxitvegoascnxk4.streamlit.app/" text="Open the live dashboard" accent="lab" external=true %}
{% include button.html href="/market-fingerprint/" text="View the latest fingerprint" accent="lab" %}
</p>

## What's New in Version 2.0

Version 2.0 expands the original six-indicator tracker with the Dow Jones
Industrial Average, Gold Futures, and Bitcoin. The nine indicators are
organized into three complementary groups:

- **Equities:** S&P 500, Nasdaq-100 Futures, and Dow Jones Industrial Average
- **Risk & Sentiment:** VIX, Bitcoin, and Gold Futures
- **Macro:** U.S. 10-Year Treasury Yield, U.S. Dollar Index, and WTI Crude Oil

The expanded Market Fingerprint combines a radar chart and heatmap so the nine
overnight observations can be read together. VIX and the U.S. dollar are
direction-adjusted in the visualization to keep the color and shape language
consistent; labels continue to show the raw percentage changes.

Version 2.0 also migrates the history schema in place. It preserves the
original records, marks Bitcoin values that cannot be reconstructed as `NA`,
and records the complete schema for every new automated observation.

## Daily Workflow

On each U.S. trading day after the market close, GitHub Actions:

1. Runs the automated test suite.
2. Retrieves Yahoo Finance data for all nine indicators.
3. Validates and appends one record to `data/history.csv`.
4. Generates `figures/YYYY-MM-DD.png` from the historical record.
5. Commits the new data and figure when a valid new day is available.

The scheduled workflow runs on weekdays at 22:15 UTC, after the U.S. cash close
in both Eastern Standard and Daylight Time. The pipeline is idempotent: an
existing date is not duplicated. Weekends and regular NYSE holidays are
skipped, while missing data on an expected trading day fails visibly instead
of being silently treated as a holiday.

## Use Locally

Clone the repository and install its dependencies:

```bash
git clone https://github.com/WillGaoLab/Daily_Market_Tracker.git
cd Daily_Market_Tracker
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Fetch a current-day preview without changing the history file:

```bash
python scripts/fetch_data.py
```

Run the complete idempotent pipeline and launch the dashboard:

```bash
python scripts/daily_pipeline.py
streamlit run app.py
```

To backfill a missing U.S. trading day or regenerate an existing fingerprint:

```bash
python scripts/daily_pipeline.py --date YYYY-MM-DD
python scripts/generate_fingerprint.py --date YYYY-MM-DD
```

## Data and Methodology

`data/history.csv` is the project's single source of truth. Market Fingerprint
figures, the public fingerprint page, and the Streamlit dashboard are derived
from that file.

The tracked Yahoo Finance symbols are `^GSPC`, `NQ=F`, `^DJI`, `^VIX`,
`BTC-USD`, `GC=F`, `^TNX`, `DX-Y.NYB`, and `CL=F`. Traditional instruments use
the previous close and current daily open. Bitcoin uses its latest 00:00 UTC
daily open and the current price at collection time; a manual backfill cannot
reconstruct a historical intraday Bitcoin price.

The migrated history preserves its original July 15, 2026 manual seed and July
16 automated record. Later rows are collected automatically. Historical values
represent the observation available at collection time and are not
automatically rewritten.

Yahoo Finance data can be delayed, revised, or unavailable. Users are
responsible for complying with Yahoo Finance terms of use, exchange data rules,
and applicable law before using or redistributing generated data.

## Project Links

- [Live Streamlit dashboard](https://dailymarkettracker-jrnxjbmkxitvegoascnxk4.streamlit.app/)
- [Latest Overnight Market Fingerprint]({{ '/market-fingerprint/' | relative_url }})
- [WillGaoLab repository](https://github.com/WillGaoLab/Daily_Market_Tracker)
- [Primary development repository](https://github.com/PeidongGao/Daily_Market_Tracker)
- [Usage disclaimer](https://github.com/PeidongGao/Daily_Market_Tracker/blob/main/DISCLAIMER.md)
- [MIT License](https://github.com/PeidongGao/Daily_Market_Tracker/blob/main/LICENSE)
- [WillGaoLab profile and project index](https://github.com/WillGaoLab/WillGaoLab)

## Privacy and Scope

The hosted Streamlit dashboard uses Google Analytics 4 and Microsoft Clarity to
process usage and technical analytics data under their respective terms and
privacy policies.

Daily Market Tracker is an observation and learning tool. It does not predict
markets, execute trades, or provide investment, financial, tax, legal, or
trading advice.

## Attribution and Affiliation

Daily Market Tracker is an independent open-source project developed and
maintained by William (Peidong) Gao under WillGaoLab.

- Project website: <https://williampeidonggao.com>
- Brand: <https://github.com/WillGaoLab>
- Personal GitHub: <https://github.com/PeidongGao>

This project is not affiliated with, endorsed by, sponsored by, or officially
associated with Yahoo, Yahoo Finance, Nasdaq, NYSE, Cboe, CME Group, ICE, any
exchange, index provider, or other organization referenced here.

All trademarks, service marks, ticker symbols, company names, exchange names,
and data-provider names are the property of their respective owners and are
used solely for identification and descriptive purposes.

## License

Original code and documentation are released under the
[MIT License](https://github.com/PeidongGao/Daily_Market_Tracker/blob/main/LICENSE)
© 2026 William Gao. The MIT grant covers this project's own source and
documentation only; it does not extend to Yahoo Finance or exchange-provided
data, trademarks, or other third-party materials.
