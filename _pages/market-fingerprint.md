---
layout: single
title: "Market Fingerprint"
permalink: /market-fingerprint/
author_profile: true
accent: lab
type: market
status: published
topics: [investing]
summary: "A daily overnight market read based on the latest Market Fingerprint."
---

{% assign commentary_entries = site.data.market_commentary | sort: "date" | reverse %}
{% assign latest_commentary = commentary_entries | first %}

<div data-market-fingerprint data-commentary-date="{% if latest_commentary %}{{ latest_commentary.date }}{% endif %}" data-history-url="https://raw.githubusercontent.com/WillGaoLab/Daily_Market_Tracker/main/data/history.csv" data-image-base="https://raw.githubusercontent.com/WillGaoLab/Daily_Market_Tracker/main/figures/">

<h2>Introduction</h2>

<p class="wg-market-introduction">The Overnight Market Fingerprint summarizes pre-market pricing across equities, volatility, yields, the U.S. dollar, and oil before the U.S. cash session begins.</p>

<h2>Today's Fingerprint <span class="wg-section-status">Latest</span></h2>

{% if latest_commentary %}
<h3><time data-market-commentary-date datetime="{{ latest_commentary.date }}">{{ latest_commentary.date | date: "%B %-d, %Y" }}</time></h3>
<p>{{ latest_commentary.summary | escape }}</p>
{% else %}
<h3><span data-market-commentary-date>Commentary pending</span></h3>
<p>Commentary is not yet published.</p>
{% endif %}

<p class="wg-market-remote-state" data-market-remote-state role="status" aria-live="polite">Latest Tracker data will load when JavaScript is available.</p>

<figure class="wg-market-fingerprint-image" data-market-figure hidden>
  <a data-market-image-link href="#" target="_blank" rel="noopener noreferrer" aria-label="Open the current Overnight Market Fingerprint at full resolution">
    <img data-market-image alt="">
  </a>
</figure>

<h2>Key Observation</h2>

{% if latest_commentary %}
<p class="wg-market-key-observation">{{ latest_commentary.key_observation | escape }}</p>
{% else %}
<p class="wg-market-remote-state">Commentary is not yet published.</p>
{% endif %}

<h2>Market Notes</h2>

{% if latest_commentary %}
{% for note in latest_commentary.market_notes %}
<p>{{ note | escape }}</p>
{% endfor %}
{% else %}
<p class="wg-market-remote-state">Commentary is not yet published.</p>
{% endif %}

{% if commentary_entries.size > 1 %}
  <details class="wg-market-archive">
    <summary>Previous Fingerprints</summary>
    {% for entry in commentary_entries offset: 1 %}
      <details class="wg-market-archive__entry">
        <summary><time datetime="{{ entry.date }}">{{ entry.date | date: "%B %-d, %Y" }}</time></summary>
        <p><strong>Summary:</strong> {{ entry.summary | escape }}</p>
        <p><strong>Key observation:</strong> {{ entry.key_observation | escape }}</p>
        {% for note in entry.market_notes %}
          <p>{{ note | escape }}</p>
        {% endfor %}
      </details>
    {% endfor %}
  </details>
{% endif %}

<h2>Reading the Fingerprint</h2>

<p>This fingerprint combines three complementary views of overnight market conditions.</p>

<h3>Radar Chart</h3>

<p>The radar chart shows the six tracked indicators together. The dashed circle marks no overnight change; positions beyond or within it show the size and direction of each direction-adjusted move. Labels show the raw opening-gap percentage.</p>

<h3>Heatmap</h3>

<p>The heatmap presents the same overnight changes as individual tiles. Green indicates a positive direction-adjusted move and red indicates a negative one. VIX and the U.S. dollar are reversed so the chart reads in a consistent market-direction context.</p>

<h3>Overnight Indicators</h3>

<p>The fingerprint follows the S&amp;P 500, Nasdaq-100, VIX, 10-year Treasury yield, U.S. dollar index, and WTI oil. Reading them together helps distinguish technology-specific weakness from broader changes in risk, liquidity, and macro conditions.</p>

<h2>Methodology</h2>

<p>The fingerprint is generated automatically by the open-source <a href="{{ '/resources/daily-market-tracker/' | relative_url }}">Daily Market Tracker</a> project.</p>

<p>Each U.S. trading day, the workflow:</p>

<ol>
  <li>Downloads Yahoo Finance daily open and close data for the six indicators.</li>
  <li>Calculates each indicator's opening gap from the previous close.</li>
  <li>Validates and stores the daily record.</li>
  <li>Generates the fingerprint automatically.</li>
</ol>

<h2>Disclaimer</h2>

<p>This page reflects my personal learning process and observations of the financial markets.</p>

<p>It is intended for educational purposes only and should not be interpreted as investment, financial, tax, legal, or trading advice.</p>

</div>

<script src="{{ '/assets/js/market-fingerprint.js' | relative_url }}" defer></script>
