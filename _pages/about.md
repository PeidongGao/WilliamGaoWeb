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

<nav class="wg-nav-grid" aria-label="Explore the site">
  {% include card.html href="/research/" accent="brand" eyebrow="William Gao" title="Research" desc="Human islet biology, diabetes, and interpretable multi-omics." cta="Read more" %}
  {% include card.html href="/publications/" accent="brand" eyebrow="William Gao" title="Publications" desc="Peer-reviewed work in genomics, gene regulation, and metabolism." cta="Browse" %}
  {% include card.html href="/resources/" accent="lab" eyebrow="WillGaoLab" title="Resources" desc="Statistics notes, paper and book notes, and practical tools." cta="Explore" %}
  {% include card.html href="/willgaolab/" accent="lab" eyebrow="WillGaoLab" title="The Lab" desc="Open notes, tools, and projects built in public." cta="Enter" %}
</nav>

<section class="home-section accent-lab" aria-label="Latest from WillGaoLab">
  <p class="home-kicker">WillGaoLab</p>
  <h2 class="home-section__title">Latest from WillGaoLab</h2>
  {%- comment -%}
    Auto-generated showcase of the newest WillGaoLab content. For now this shows
    the latest tools. To showcase the newest content across ALL types later,
    replace the `lab_updates` assignment below with:
      {% assign tools = site.pages | where: "type", "tools" %}
      {% assign lab_updates = site.resources | concat: tools | sort: "date" | reverse %}
    Nothing else needs to change — the grid and cards adapt automatically.
  {%- endcomment -%}
  {% assign lab_updates = site.pages | where: "type", "tools" | sort: "date" | reverse %}
  <div class="wg-card-grid">
    {% for it in lab_updates limit: 3 %}{% include resource-card.html item=it %}{% endfor %}
  </div>
  <p class="wg-hub__links"><a href="{{ '/willgaolab/' | relative_url }}">Explore WillGaoLab &rarr;</a></p>
</section>
