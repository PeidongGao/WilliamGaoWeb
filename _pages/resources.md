---
layout: single
title: "Resources"
permalink: /resources/
author_profile: true
accent: lab
---

The WillGaoLab knowledge base — learning notes and practical tools.

## Learning resources

<div class="wg-card-grid">
  {% include card.html href="/resources/statistics/" accent="lab" eyebrow="Statistics" title="Learn Statistics with Will" desc="Building intuition through notes and examples." cta="Open" %}
  {% include card.html href="/resources/papers/" accent="lab" eyebrow="Papers" title="Read Papers with Will" desc="Understanding papers as stories." cta="Open" %}
  {% include card.html href="/resources/books/" accent="lab" eyebrow="Books" title="Read Books with Will" desc="Ideas worth remembering." cta="Open" %}
</div>

## Market

<div class="wg-market-card">
  {% include card.html href="/market-fingerprint/" accent="lab" eyebrow="DAILY MARKET" title="Market Fingerprint" desc="Daily overnight market insights." cta="Open" %}
  {% include card.html href="/follow-the-market-with-will/" accent="lab" eyebrow="WEEKLY MARKET" title="Follow the Market with Will" desc="Weekly snapshots of broad equities, technology, and semiconductors." cta="Open" %}
</div>

## Tools

{% assign lab_tools = site.pages | where: "type", "tools" | where: "status", "published" | sort: "date" | reverse %}
<div class="wg-card-grid">{% for it in lab_tools %}{% include resource-card.html item=it %}{% endfor %}</div>

<p class="wg-hub__links">Looking for something specific? <a href="{{ '/search/' | relative_url }}">Search everything</a> or <a href="{{ '/topics/' | relative_url }}">browse by topic</a>.</p>
