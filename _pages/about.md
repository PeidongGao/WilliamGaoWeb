---
permalink: /
title: "William Peidong Gao"
author_profile: true
description: "William Peidong Gao studies why insulin-producing cells fail in diabetes, using single-cell and multi-omics data. Ph.D. candidate in Genetics at Case Western."
---

<section class="home-hero">
  <div class="home-hero__copy">
    <p class="home-kicker">Ph.D. candidate in Genetics</p>
    <h1 class="home-hero__title">William Peidong Gao</h1>
    <p class="home-hero__lead">I study why the cells that make insulin stop working in diabetes — using computers to read what is happening inside thousands of individual cells at once. I also learn in public through <strong>WillGaoLab</strong>.</p>
    <p class="wg-actions">
      {% include button.html href="/research/" text="View research" accent="brand" %}
      {% include button.html href="/willgaolab/" text="Explore WillGaoLab" variant="outline" accent="lab" %}
    </p>
  </div>
  <figure class="home-hero__media">
    <picture>
      <source srcset="{{ '/images/profile-hero.webp' | relative_url }}" type="image/webp">
      <img src="{{ '/images/profile-hero.jpg' | relative_url }}"
           width="800" height="1000" fetchpriority="high" decoding="async"
           alt="William Peidong Gao, standing by the water with the New York City skyline behind him">
    </picture>
  </figure>
</section>

<section class="home-section" aria-labelledby="what-i-work-on">
  <p class="home-kicker">Overview</p>
  <h2 class="home-section__title" id="what-i-work-on">What I work on</h2>

  <h3>What does my research actually study?</h3>
  <p>I study why the pancreatic beta cells that produce insulin stop working in diabetes. These cells sit in small clusters called islets. Using single-cell data, I look at how individual cells differ from each other and how stress changes their behavior — differences that averaged measurements hide completely.</p>

  <h3>Why use computers to study diabetes?</h3>
  <p>Because a modern experiment measures thousands of cells at once, and nobody can read that by hand. I build reproducible computational workflows that turn those large datasets into specific, testable claims about which cells are changing and why, so the result explains the biology instead of only describing it.</p>

  <h3>What is WillGaoLab?</h3>
  <p>WillGaoLab is where I learn in public. It collects the notes, videos, and tools I make while working through statistics, reading papers, and building software — published openly on YouTube, Substack, and GitHub so other people can use them too.</p>
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

<h2 class="home-section__title" id="explore-this-site">Explore this site</h2>
<nav class="wg-nav-grid" aria-labelledby="explore-this-site">
  {% include card.html href="/research/" accent="brand" eyebrow="William Peidong Gao" title="Research" desc="How insulin-making cells change under stress, and what that means for diabetes — analysis built to explain the biology, not just describe it." cta="Read more" %}
  {% include card.html href="/publications/" accent="brand" eyebrow="William Peidong Gao" title="Publications" desc="Peer-reviewed papers on how single cells behave in diabetes and other metabolic disease — including recent work in Nature Communications." meta=pub_meta cta="Browse" %}
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
