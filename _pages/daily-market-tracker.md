---
title: "Daily Market Tracker"
layout: single
permalink: /resources/daily-market-tracker/
author_profile: true
accent: lab
type: tools
topics: [automation, data-analysis, investing, tools]
date: 2026-07-15
status: published
summary: "An automated daily market observation system that records opening gaps, generates a Market Fingerprint, and maintains a historical dataset."
---

Daily Market Tracker is an automated market observation system for recording
the opening state of six core financial indicators: the S&P 500, Nasdaq-100
Futures, VIX, U.S. 10-Year Treasury Yield, U.S. Dollar Index, and WTI Crude
Oil.

It records each instrument's previous Yahoo Finance daily close, current daily
open, absolute gap, and gap percentage. Those observations are stored in one
historical CSV, used to generate a daily Market Fingerprint, and displayed in a
minimal Streamlit dashboard.

The project is designed to observe market conditions consistently over time;
it does not predict market direction or provide trading recommendations.

<p class="wg-actions">{% include button.html href="https://dailymarkettracker-mtklpsoauidwibgbij9xoq.streamlit.app/" text="Open the live dashboard" accent="lab" external=true %}</p>

## Daily Workflow

On each U.S. trading day after the market close, GitHub Actions:

1. Retrieves Yahoo Finance daily-bar data for all six instruments.
2. Validates and appends one record to `data/history.csv`.
3. Generates `figures/YYYY-MM-DD.png` from the historical record.
4. Commits the new data and figure when a valid new day is available.

The pipeline is idempotent: an existing date is not duplicated. Missing Yahoo
data on an expected trading day fails visibly rather than being interpreted as
a market holiday.

## Use Locally

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt

python scripts/daily_pipeline.py
streamlit run app.py
```

To backfill a missing U.S. trading day:

```bash
python scripts/daily_pipeline.py --date YYYY-MM-DD
```

## Project Links

- [Live Streamlit dashboard](https://dailymarkettracker-mtklpsoauidwibgbij9xoq.streamlit.app/)
- [WillGaoLab repository](https://github.com/WillGaoLab/Daily_Market_Tracker)
- [Primary development repository](https://github.com/PeidongGao/Daily_Market_Tracker)
- [Usage disclaimer](https://github.com/PeidongGao/Daily_Market_Tracker/blob/main/DISCLAIMER.md)
- [MIT License](https://github.com/PeidongGao/Daily_Market_Tracker/blob/main/LICENSE)
- [WillGaoLab profile and project index](https://github.com/WillGaoLab/WillGaoLab)

## Data and Scope

`data/history.csv` is the project's single source of truth. Market Fingerprint
figures and the Streamlit dashboard are derived from that file. The initial
record is a documented manual seed; subsequent records are collected from
Yahoo Finance daily bars.

Yahoo Finance data can be delayed, revised, or unavailable. Historical values
record the observation available at collection time and are not automatically
rewritten. Users are responsible for complying with Yahoo Finance terms of
use, exchange data rules, and applicable law before using or redistributing
generated data.

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
