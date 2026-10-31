---
title: "Follow the Market with Will"
permalink: /follow-the-market-with-will/
layout: single
author_profile: false
market_publication: true
accent: lab
type: market
topics: [investing, etf]
status: published
summary: "A weekly ETF dashboard tracking VOO, QQQ, and SMH through drawdown analysis, week-over-week returns, and personal market notes."
---

{% assign weekly_entries = site.data.weekly_market_commentary | sort: "date" | reverse %}
{% assign latest_week = weekly_entries | first %}
{% assign market_asset_version = site.time | date: "%s" %}

<link rel="stylesheet" href="{{ '/assets/market/dashboard.css' | relative_url }}?v={{ market_asset_version }}">

<div class="mp-publication" data-weekly-market data-commentary-date="{% if latest_week %}{{ latest_week.date }}{% endif %}" data-history-url="{{ '/assets/data/weekly-market-history.csv' | relative_url }}" data-image-url="{{ '/images/market/weekly-market-dashboard.png' | relative_url }}">

<p class="mp-deck">Every Friday, I update the dashboard and record what I learned from that week's market movement.</p>
<div class="mp-meta">
  <span class="mp-frequency">Weekly review</span>
  {% if latest_week %}<span>Week ending <time datetime="{{ latest_week.date }}">{{ latest_week.date | date: "%B %-d, %Y" }}</time></span>{% else %}<span>Weekly notes pending</span>{% endif %}
  <span>By <a href="{{ '/about/' | relative_url }}">William Peidong Gao</a></span>
</div>

<div class="mp-lead">
  <section aria-labelledby="weekly-summary-heading">
    <h2 id="weekly-summary-heading">Summary</h2>
    {% if latest_week %}<p class="mp-summary">{{ latest_week.summary | escape }}</p>{% else %}<p class="mp-summary">Weekly notes are not yet published.</p>{% endif %}
  </section>
  <aside class="mp-observation" aria-labelledby="weekly-observation-heading">
    <h2 id="weekly-observation-heading">Key Observation</h2>
    {% if latest_week %}<p class="wg-market-key-observation">{{ latest_week.key_observation | escape }}</p>{% else %}<p>Weekly notes are not yet published.</p>{% endif %}
  </aside>
</div>

<section class="mp-chart-section" aria-labelledby="weekly-chart-heading">
  <div class="mp-section-head">
    <h2 id="weekly-chart-heading">The weekly dashboard</h2>
    <p>Through {% if latest_week %}<time data-weekly-dashboard-date datetime="{{ latest_week.date }}">{{ latest_week.date | date: "%B %-d, %Y" }}</time>{% else %}<time data-weekly-dashboard-date>data pending</time>{% endif %}</p>
  </div>
  <p class="wg-market-remote-state" data-weekly-remote-state role="status" aria-live="polite">Loading weekly observations. The static dashboard remains available below.</p>
  <div data-weekly-explorer hidden></div>
  <details class="me-static" data-weekly-static open>
    <summary>View static dashboard</summary>
    <figure class="wg-market-fingerprint-image"><a data-weekly-image-link href="{{ '/images/market/weekly-market-dashboard.png' | relative_url }}" target="_blank" rel="noopener noreferrer" aria-label="Open the weekly ETF dashboard at full resolution"><img data-weekly-image src="{{ '/images/market/weekly-market-dashboard.png' | relative_url }}" alt="Weekly ETF dashboard showing drawdown from 52-week highs and week-over-week returns for VOO, QQQ, and SMH."></a></figure>
  </details>
  <noscript><p>Enable JavaScript to select dates and explore the charts. The static dashboard and weekly notes remain available.</p></noscript>
  <p class="mp-caption">VOO · S&amp;P 500 &nbsp; / &nbsp; QQQ · Nasdaq-100 &nbsp; / &nbsp; SMH · Semiconductors. Recorded weekly observations; chart selection is separate from the written review.</p>
</section>

<div class="mp-reading-grid">
  <section aria-labelledby="weekly-notes-heading">
    <h2 id="weekly-notes-heading">Market Notes</h2>
    <div class="mp-notes">
      {% if latest_week %}{% for note in latest_week.market_notes %}
      <div class="mp-note"><div class="mp-note-content"><p>{{ note | escape }}</p></div></div>
      {% endfor %}{% else %}<p>Weekly notes are not yet published.</p>{% endif %}
    </div>
  </section>
  <aside class="mp-companion" aria-label="About the weekly review and archive">
    <section>
      <h2>About the review</h2>
      <p>The dashboard focuses on VOO, QQQ, and SMH, representing the S&amp;P 500, Nasdaq-100, and semiconductor sector.</p>
      <p>My goal is to build a consistent framework for understanding market behavior over time.</p>
      <a class="mp-resource" href="{{ '/resources/market-tracker/' | relative_url }}">Explore the Market Tracker project →</a>
    </section>
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
    <details>
      <summary>Reading the dashboard</summary>
      <h3>Drawdown</h3>
      <p>Drawdown measures how far an ETF's closing price is below the selected 52-week high. Current reports use the highest intraday price during the trailing 365 days; earlier observations may use closing-price highs. Values closer to 0% indicate stronger long-term positioning.</p>
      <h3>Week-over-week return</h3>
      <p>Week-over-week return measures the percentage change from the previous Friday's closing price. Positive values indicate short-term strength, while negative values indicate short-term weakness.</p>
      <p>Reading these two metrics together provides a more complete picture of market conditions than either metric alone.</p>
    </details>
    <details>
      <summary>Methodology and source</summary>
      <p>The dashboard is generated automatically by my open-source <a href="{{ '/resources/market-tracker/' | relative_url }}">Market Tracker</a> project.</p>
      <p>Each week, the workflow downloads market data, calculates standardized metrics, validates the results, and generates the dashboard.</p>
    </details>
  </aside>
</div>
<footer class="mp-disclaimer">
  <h2>Disclaimer</h2>
  <p>This page reflects my personal learning process and observations of the financial markets.</p>
  <p>It is intended for educational purposes only and should not be interpreted as investment, financial, tax, legal, or trading advice.</p>
</footer>
</div>

<script src="{{ '/assets/market/echarts.min.js' | relative_url }}?v={{ market_asset_version }}" defer></script>
<script src="{{ '/assets/market/dashboard.js' | relative_url }}?v={{ market_asset_version }}" defer></script>
<script src="{{ '/assets/js/weekly-market.js' | relative_url }}?v={{ market_asset_version }}" defer></script>
