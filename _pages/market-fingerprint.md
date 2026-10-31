---
layout: single
title: "Market Fingerprint"
permalink: /market-fingerprint/
# Retired dated snapshot; keep its published URL alive.
redirect_from:
  - /market-fingerprint/2026-09-11/
author_profile: false
market_publication: true
accent: lab
type: market
status: published
topics: [investing]
summary: "A daily overnight market read based on the latest Market Fingerprint."
---

{% assign commentary_entries = site.data.market_commentary | sort: "date" | reverse %}
{% assign latest_commentary = commentary_entries | first %}
{% assign market_asset_version = site.time | date: "%s" %}

<div class="mp-publication" data-market-fingerprint data-commentary-date="{% if latest_commentary %}{{ latest_commentary.date }}{% endif %}" data-history-url="https://raw.githubusercontent.com/WillGaoLab/Daily_Market_Tracker/main/data/history.csv" data-image-base="https://raw.githubusercontent.com/WillGaoLab/Daily_Market_Tracker/main/figures/">

<p class="mp-deck">The Overnight Market Fingerprint summarizes pre-market pricing across equities, risk &amp; sentiment, and macro conditions before the U.S. cash session begins.</p>
<div class="mp-meta">
  <span class="mp-frequency">Daily briefing</span>
  {% if latest_commentary %}<time data-market-commentary-date datetime="{{ latest_commentary.date }}">{{ latest_commentary.date | date: "%B %-d, %Y" }}</time>{% else %}<span data-market-commentary-date>Commentary pending</span>{% endif %}
  <span>By <a href="{{ '/about/' | relative_url }}">William Peidong Gao</a></span>
</div>

<div class="mp-lead">
  <section aria-labelledby="daily-summary-heading">
    <h2 id="daily-summary-heading">Summary</h2>
    {% if latest_commentary %}<p class="mp-summary">{{ latest_commentary.summary | escape }}</p>{% else %}<p class="mp-summary">Commentary is not yet published.</p>{% endif %}
  </section>
  <aside class="mp-observation" aria-labelledby="daily-observation-heading">
    <h2 id="daily-observation-heading">Key Observation</h2>
    {% if latest_commentary %}<p class="wg-market-key-observation">{{ latest_commentary.key_observation | escape }}</p>{% else %}<p>Commentary is not yet published.</p>{% endif %}
  </aside>
</div>

<section class="mp-chart-section" aria-labelledby="daily-chart-heading">
  <div class="mp-section-head">
    <h2 id="daily-chart-heading">The overnight fingerprint</h2>
    <p>Equities · Risk &amp; sentiment · Macro</p>
  </div>
  <p class="wg-market-remote-state" data-market-remote-state role="status" aria-live="polite">Latest Tracker data will load when JavaScript is available.</p>
  <div data-fingerprint-explorer></div>
  <noscript><p>Enable JavaScript to explore historical fingerprints and inspect each indicator.</p></noscript>
  <figure class="wg-market-fingerprint-image" data-market-figure hidden>
    <a data-market-image-link href="#" target="_blank" rel="noopener noreferrer" aria-label="Open the current Overnight Market Fingerprint at full resolution"><img data-market-image alt=""></a>
  </figure>
  <p class="mp-caption">Opening/reference changes, rather than closing returns. Select a recorded date to explore the chart; the written briefing remains dated above.</p>
</section>

<div class="mp-reading-grid">
  <section aria-labelledby="daily-notes-heading">
    <h2 id="daily-notes-heading">Market Notes</h2>
    <div class="mp-notes">
      {% if latest_commentary %}{% for note in latest_commentary.market_notes %}
      <div class="mp-note"><div class="mp-note-content">{{ note | markdownify }}</div></div>
      {% endfor %}{% else %}<p>Commentary is not yet published.</p>{% endif %}
    </div>
  </section>
  <aside class="mp-companion" aria-label="About the daily briefing and archive">
    <section>
      <h2>About the fingerprint</h2>
      <p>Nine indicators, read together across equities, risk &amp; sentiment, and macro conditions.</p>
      <p>S&amp;P 500 · Nasdaq-100 futures · Dow Jones · VIX · Bitcoin · Gold · 10-year Treasury yield · U.S. dollar index · WTI oil</p>
      <a class="mp-resource" href="https://dailymarkettracker-jrnxjbmkxitvegoascnxk4.streamlit.app/" target="_blank" rel="noopener noreferrer">Open the Streamlit dashboard ↗</a>
    </section>
{% if commentary_entries.size > 1 %}
  <details class="wg-market-archive">
    <summary>Previous Fingerprints</summary>
    {% for entry in commentary_entries offset: 1 %}
      <details class="wg-market-archive__entry">
        <summary><time datetime="{{ entry.date }}">{{ entry.date | date: "%B %-d, %Y" }}</time></summary>
        <p><strong>Summary:</strong> {{ entry.summary | escape }}</p>
        <p><strong>Key observation:</strong> {{ entry.key_observation | escape }}</p>
        {% for note in entry.market_notes %}
          {{ note | markdownify }}
        {% endfor %}
      </details>
    {% endfor %}
  </details>
{% endif %}
    <details>
      <summary>Reading the fingerprint</summary>
      <h3>Radar chart</h3>
      <p>The radar chart shows the nine tracked indicators together. The dashed circle marks no overnight change; positions beyond or within it show the size and direction of each direction-adjusted move. Labels show the raw gap/change percentage.</p>
      <h3>Heatmap</h3>
      <p>The heatmap presents the same overnight changes as individual tiles. Green indicates a positive direction-adjusted move and red indicates a negative one. VIX and the U.S. dollar are reversed so the chart reads in a consistent market-direction context.</p>
      <p>Hover, focus, or tap a point or tile to inspect its baseline and opening/reference value. Switch between the full figure, radar, and heatmap, or zoom and drag to inspect the original chart more closely.</p>
    </details>
    <details>
      <summary>Methodology and source</summary>
      <p>The fingerprint is generated automatically by the open-source <a href="{{ '/resources/daily-market-tracker/' | relative_url }}">Daily Market Tracker</a> project.</p>
      <p>Each U.S. trading day, the workflow downloads Yahoo Finance market data, calculates the changes, validates and stores the daily record, and generates the fingerprint.</p>
      <p>Traditional instruments compare the previous close with their daily open. Bitcoin compares its 00:00 UTC daily open with the current market price at collection time. Treasury-yield changes are relative percentages, not basis points.</p>
    </details>
  </aside>
</div>
<footer class="mp-disclaimer">
  <h2>Disclaimer</h2>
  <p>This page reflects my personal learning process and observations of the financial markets.</p>
  <p>It is intended for educational purposes only and should not be interpreted as investment, financial, tax, legal, or trading advice.</p>
</footer>
</div>

<link rel="stylesheet" href="{{ '/assets/market/fingerprint.css' | relative_url }}?v={{ market_asset_version }}">
<script src="{{ '/assets/market/fingerprint.js' | relative_url }}?v={{ market_asset_version }}" defer></script>
<script src="{{ '/assets/js/market-fingerprint.js' | relative_url }}?v={{ market_asset_version }}" defer></script>
