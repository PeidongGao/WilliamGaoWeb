---
title: "Follow the Market with Will"
permalink: /follow-the-market-with-will/
layout: single
author_profile: true
accent: lab
type: market
topics: [investing, etf]
status: published
summary: "A weekly ETF dashboard tracking VOO, QQQ, and SMH through drawdown analysis, week-over-week returns, and personal market notes."
---

{% assign weekly_entries = site.data.weekly_market_commentary | sort: "date" | reverse %}
{% assign latest_week = weekly_entries | first %}

<div data-weekly-market data-commentary-date="{% if latest_week %}{{ latest_week.date }}{% endif %}" data-history-url="{{ '/assets/data/weekly-market-history.csv' | relative_url }}" data-image-url="{{ '/images/market/weekly-market-dashboard.png' | relative_url }}" markdown="1">

<h2>Introduction</h2>

<p class="wg-market-introduction">Every Friday, I update the dashboard and record what I learned from that week's market movement.</p>

The dashboard focuses on three representative ETFs:

- `VOO` — S&P 500
- `QQQ` — Nasdaq-100
- `SMH` — Semiconductor sector

Rather than predicting where the market will go next, my goal is to build a consistent framework for understanding market behavior over time.

<h2>Weekly Dashboard <span class="wg-section-status">Latest</span></h2>

<h3>Week ending {% if latest_week %}<time data-weekly-dashboard-date datetime="{{ latest_week.date }}">{{ latest_week.date | date: "%B %-d, %Y" }}</time>{% else %}<time data-weekly-dashboard-date>data pending</time>{% endif %}</h3>

<p class="wg-market-remote-state" data-weekly-remote-state role="status" aria-live="polite">Latest weekly market data will load when JavaScript is available.</p>

<figure class="wg-market-fingerprint-image">
  <a data-weekly-image-link href="{{ '/images/market/weekly-market-dashboard.png' | relative_url }}" target="_blank" rel="noopener noreferrer" aria-label="Open the weekly ETF dashboard at full resolution">
    <img data-weekly-image src="{{ '/images/market/weekly-market-dashboard.png' | relative_url }}" alt="Weekly ETF dashboard showing drawdown from 52-week highs and week-over-week returns for VOO, QQQ, and SMH.">
  </a>
</figure>

<h2>Current Snapshot</h2>

The chart above shows the historical trend. The table below summarizes the latest values for the current reporting week.

<table>
  <thead>
    <tr>
      <th style="text-align: center">ETF</th>
      <th style="text-align: center">Current Drawdown</th>
      <th style="text-align: center">This Week's Return</th>
    </tr>
  </thead>
  <tbody data-weekly-snapshot>
    <tr>
      <td colspan="3" style="text-align: center">Latest weekly snapshot will load when JavaScript is available.</td>
    </tr>
  </tbody>
</table>

<h2>My Notes This Week</h2>

{% if latest_week %}
<h3><time datetime="{{ latest_week.date }}">{{ latest_week.date | date: "%B %-d, %Y" }}</time></h3>

<p>{{ latest_week.summary | escape }}</p>

<h2>Key Observation</h2>

<p class="wg-market-key-observation">{{ latest_week.key_observation | escape }}</p>

<h2>Market Notes</h2>

{% for note in latest_week.market_notes %}
<p>{{ note | escape }}</p>
{% endfor %}
{% else %}
<p class="wg-market-remote-state">Weekly notes are not yet published.</p>
{% endif %}

{% if weekly_entries.size > 1 %}
  <details class="wg-market-archive">
    <summary>Previous Weekly Notes</summary>
    {% for entry in weekly_entries offset: 1 %}
      <details class="wg-market-archive__entry">
        <summary>Week ending <time datetime="{{ entry.date }}">{{ entry.date | date: "%B %-d, %Y" }}</time></summary>
        <p><strong>Summary:</strong> {{ entry.summary | escape }}</p>
        <p><strong>Key observation:</strong> {{ entry.key_observation | escape }}</p>
        <p><strong>Snapshot:</strong> <span data-weekly-archive-snapshot data-weekly-date="{{ entry.date }}">Market data will load when JavaScript is available.</span></p>
        {% for note in entry.market_notes %}
          <p>{{ note | escape }}</p>
        {% endfor %}
      </details>
    {% endfor %}
  </details>
{% endif %}

<h2>Reading the Dashboard</h2>

This dashboard combines two complementary metrics.

### Drawdown

Drawdown measures how far an ETF's closing price is below its highest closing price during the previous 52 weeks.

It answers a simple question:

> **Where is the market today relative to its recent high?**

Values closer to **0%** indicate stronger long-term positioning.

### Week-over-Week Return

Week-over-week return measures the percentage change from the previous Friday's closing price.

It answers a different question:

> **What happened over the past week?**

Positive values indicate short-term strength, while negative values indicate short-term weakness.

Reading these two metrics together provides a more complete picture of market conditions than either metric alone.

## Methodology

The dashboard is generated automatically by my open-source [Market Tracker]({{ '/resources/market-tracker/' | relative_url }}) project.

Each week, the workflow:

1. Downloads market data.
2. Calculates standardized metrics.
3. Validates the results.
4. Generates the dashboard automatically.

<h2>Disclaimer</h2>

This page reflects my personal learning process and observations of the financial markets.

It is intended for educational purposes only and should not be interpreted as investment, financial, tax, legal, or trading advice.

</div>

<script src="{{ '/assets/js/weekly-market.js' | relative_url }}" defer></script>
