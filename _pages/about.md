---
permalink: /
title: "William Gao"
author_profile: true
---

<section class="home-hero">
  <div class="home-hero__copy">
    <p class="home-kicker">Ph.D. candidate in Genetics</p>
    <h1 class="home-hero__title">William (Peidong) Gao</h1>
    <p class="home-hero__lead">I study human islet biology and diabetes through bioinformatics and multi-omics analysis — and I learn in public through <strong>WillGaoLab</strong>.</p>
    <p class="wg-actions">
      {% include button.html href="/research/" text="View research" accent="brand" %}
      {% include button.html href="/willgaolab/" text="Explore WillGaoLab" variant="outline" accent="lab" %}
    </p>
  </div>
  <figure class="home-hero__media">
    <img src="{{ '/images/profile.2.png' | relative_url }}" alt="Portrait of William Gao">
  </figure>
</section>

{%- comment -%}
  Only the Publications card carries a metadata line, and it is a real,
  self-updating figure (article count + active years) computed from the
  collection. The other cards omit metadata on purpose: a keyword tag there
  would only echo the description without adding information.
{%- endcomment -%}
{%- assign pubs = site.publications | sort: "date" -%}
{%- assign pub_count = pubs | size -%}
{%- assign pub_first_year = pubs.first.date | date: "%Y" -%}
{%- assign pub_last_year = pubs.last.date | date: "%Y" -%}
{%- capture pub_meta -%}{{ pub_count }} articles · {{ pub_first_year }}–{{ pub_last_year }}{%- endcapture -%}

<nav class="wg-nav-grid" aria-label="Explore the site">
  {% include card.html href="/research/" accent="brand" eyebrow="William Gao" title="Research" desc="How islet cell states and stress responses drive diabetes — computational analysis built to explain biology, not just describe it." cta="Read more" %}
  {% include card.html href="/publications/" accent="brand" eyebrow="William Gao" title="Publications" desc="Peer-reviewed studies in single-cell genomics, gene regulation, and metabolic disease — including recent work in Nature Communications." meta=pub_meta cta="Browse" %}
  {% include card.html href="/resources/" accent="lab" eyebrow="WillGaoLab" title="Resources" desc="Learn-in-public notes on statistics, reading papers, and books — plus a few hands-on tools." cta="Explore" %}
  {% include card.html href="/willgaolab/" accent="lab" eyebrow="WillGaoLab" title="The Lab" desc="The home base for everything I build in the open — videos on YouTube, writing on Substack, and code on GitHub." cta="Enter" %}
</nav>

<section class="home-section accent-lab" aria-label="Featured tools from WillGaoLab">
  <p class="home-kicker">WillGaoLab</p>
  <h2 class="home-section__title">Featured Tools</h2>
  <p class="home-section__intro">Practical tools I've built and shared — free to use, each with a write-up on how it works.</p>
  {%- comment -%}
    Showcase of published WillGaoLab tools (newest first). Because only tools are
    shown here, the heading is "Featured Tools" rather than "Latest". To showcase
    the newest content across ALL types instead, replace the `featured_tools`
    assignment below with:
      {% assign tools = site.pages | where: "type", "tools" | where: "status", "published" %}
      {% assign featured_tools = site.resources | concat: tools | sort: "date" | reverse %}
    and rename the heading accordingly.
  {%- endcomment -%}
  {% assign featured_tools = site.pages | where: "type", "tools" | where: "status", "published" | sort: "date" | reverse %}
  <div class="wg-card-grid">
    {% for it in featured_tools limit: 3 %}{% include resource-card.html item=it %}{% endfor %}
  </div>
  <p class="wg-hub__links"><a href="{{ '/willgaolab/' | relative_url }}">See everything in WillGaoLab &rarr;</a></p>
</section>
