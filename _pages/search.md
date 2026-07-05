---
title: "Search"
permalink: /search/
layout: single
author_profile: true
accent: lab
---

Search across every note, tool, and publication — or explore the collections below.

<div class="wg-search">
  <input type="search" id="wg-search-input" class="wg-search__input" placeholder="Search notes, tools, and publications…" autocomplete="off" aria-label="Search the site">
</div>
<ul id="wg-search-results" class="wg-search__results" aria-live="polite"></ul>

<div id="wg-discovery">

  <section class="home-section" aria-label="Popular topics">
    <h2 class="home-section__title">Popular topics</h2>
    {% include topic-chips.html %}
  </section>

  <section class="home-section" aria-label="Browse learning">
    <h2 class="home-section__title">Browse learning</h2>
    <div class="wg-card-grid">
      {% include card.html href="/resources/statistics/" accent="lab" eyebrow="Statistics" title="Learn Statistics with Will" desc="Building intuition through notes and examples." cta="Open" %}
      {% include card.html href="/resources/papers/" accent="lab" eyebrow="Papers" title="Read Papers with Will" desc="Understanding papers as stories." cta="Open" %}
      {% include card.html href="/resources/books/" accent="lab" eyebrow="Books" title="Read Books with Will" desc="Ideas worth remembering." cta="Open" %}
    </div>
  </section>

  <section class="home-section" aria-label="Browse tools">
    <h2 class="home-section__title">Browse tools</h2>
    {% assign lab_tools = site.pages | where: "type", "tools" | where: "status", "published" | sort: "date" | reverse %}
    <div class="wg-card-grid">{% for it in lab_tools %}{% include resource-card.html item=it %}{% endfor %}</div>
  </section>

  <section class="home-section" aria-label="Browse publications">
    <h2 class="home-section__title">Browse publications</h2>
    <div class="wg-card-grid">
      {% assign recent_pubs = site.publications | sort: "date" | reverse %}
      {% for pub in recent_pubs limit: 3 %}
        {% assign pub_year = pub.date | date: "%Y" %}
        {% include card.html href=pub.url accent="brand" eyebrow=pub_year title=pub.title desc=pub.venue cta="Read" %}
      {% endfor %}
    </div>
    <p class="wg-hub__links"><a href="{{ '/publications/' | relative_url }}">All publications &rarr;</a></p>
  </section>

</div>

<script>window.WG_SEARCH_JSON = "{{ '/search.json' | relative_url }}";</script>
<script src="{{ '/assets/js/search.js' | relative_url }}" defer></script>
