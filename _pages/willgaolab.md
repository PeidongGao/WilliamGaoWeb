---
title: "WillGaoLab"
permalink: /willgaolab/
layout: single
author_profile: true
accent: lab
---

## Learning

<div class="wg-card-grid">
  {% include card.html href="/resources/statistics/" accent="lab" eyebrow="Statistics" title="Learn Statistics with Will" desc="Building intuition through notes and examples." cta="Open" %}
  {% include card.html href="/resources/papers/" accent="lab" eyebrow="Papers" title="Read Papers with Will" desc="Understanding papers as stories." cta="Open" %}
  {% include card.html href="/resources/books/" accent="lab" eyebrow="Books" title="Read Books with Will" desc="Ideas worth remembering." cta="Open" %}
</div>

## Tools

Practical tools built under the WillGaoLab brand. New tools appear here automatically.

{% assign lab_tools = site.pages | where: "type", "tools" | sort: "date" | reverse %}
<div class="wg-card-grid">{% for it in lab_tools %}{% include resource-card.html item=it %}{% endfor %}</div>

## GitHub Projects

- [WillGaoLab profile and project index](https://github.com/WillGaoLab/WillGaoLab)
- [Excel Pixel Art Generator](https://github.com/WillGaoLab/excel_pixel_art_generator)
- [auto_paper_get_CNS](https://github.com/WillGaoLab/auto_paper_get_CNS)
- [MarketTrackingSystem](https://github.com/WillGaoLab/MarketTrackingSystem)

## Follow

- [YouTube](https://www.youtube.com/@WillGaoLab)
- [Substack](https://willgaolab.substack.com)
- [GitHub](https://github.com/WillGaoLab)
- [X](https://x.com/WillGaoLab)
- [Instagram](https://www.instagram.com/willgaolab/)
- [Bluesky](https://bsky.app/profile/willgaolab.bsky.social)
