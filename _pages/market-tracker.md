---
title: "Market Tracker"
layout: single
permalink: /resources/market-tracker/
author_profile: true
---

Market Tracker is a weekly market report generator for the ETFs `VOO`, `QQQ`,
and `SMH`. It pulls Yahoo Finance daily data and builds a Markdown report of
each ticker's weekly close, 52-week range, drawdown (DD), and week-over-week
(WoW) change, cross-validating every reported value against an independent
source before writing it.

The tool is intended for low-volume, user-initiated weekly market review run
from a personal command line. It is not a high-frequency trading system, an
automated scraper, or a bulk data-redistribution service.

## Usage

Generate the latest completed weekly report:

```bash
market-tracking report
```

Write a specific week and update the history file:

```bash
market-tracking report --week-ending 2026-06-26 \
  --output-dir reports/weekly --history reports/history.csv
```

Reported metrics use closing prices only:

```text
DD  = current close / 52-week high - 1
WoW = current close / previous week close - 1
```

The 52-week high/low are the max/min of daily closes over the trailing 365 days;
intraday spikes are deliberately ignored.

## Cross-validation

Yahoo Finance produces every reported value. Each run independently re-checks
those values and records a Data Validation section per ticker:

- Close and previous-week close are confirmed against an independent source,
  [stockanalysis.com](https://stockanalysis.com). The second source is used only
  to verify and never populates the report.
- The 52-week range is shown on every basis (close, intraday, Yahoo meta) so the
  reported figure is auditable.
- Reporting week and history continuity are self-checked so the run is
  reproducible over time.

## Project Links

- [Primary development repository](https://github.com/PeidongGao/MarketTrackingSystem)
- [WillGaoLab brand mirror](https://github.com/WillGaoLab/MarketTrackingSystem)
- [Usage disclaimer](https://github.com/PeidongGao/MarketTrackingSystem/blob/main/DISCLAIMER.md)
- [WillGaoLab profile and project index](https://github.com/WillGaoLab/WillGaoLab)

## Usage Disclaimer

This tool is for low-volume, user-initiated weekly market review only — not
high-frequency trading, automated scraping, investment execution, or bulk
redistribution of data. It provides no investment, financial, tax, legal, or
trading advice.

Users are responsible for complying with the terms of use of Yahoo, Yahoo
Finance, stockanalysis.com, and any other data source, as well as applicable
law. A publicly accessible quote is not necessarily permission for automated
retrieval or redistribution.

## Attribution and Affiliation

This is a WillGaoLab project created and maintained by
William (Peidong) Gao.

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
 MarketTrackingSystem
```

This project is not affiliated with, endorsed by, sponsored by, or officially
associated with Yahoo, Yahoo Finance, stockanalysis.com, Vanguard, Invesco,
VanEck, Nasdaq, NYSE, Cboe, any exchange, any ETF issuer, or any other entity
referenced here.

All trademarks, ticker symbols, fund names, and data-provider names are the
property of their respective owners and are used solely for identification and
descriptive purposes.

## License

Original code and documentation are released under the
[MIT License](https://github.com/PeidongGao/MarketTrackingSystem/blob/main/LICENSE)
© 2026 William Gao. The MIT grant covers this project's own source and
documentation only; it does not extend to third-party or market data, or to any
names, logos, trademarks, ticker symbols, or fund names referenced here.
