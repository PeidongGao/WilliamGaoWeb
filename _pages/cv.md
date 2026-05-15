---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* Ph.D. candidate in Genetics, Case Western Reserve University

Research Focus
======
* Bioinformatics and multi-omics analysis
* Human islet cells
* Diabetes and complex disease biology
* Reproducible computational workflows

Publications
======
{% if site.publications.size > 0 %}
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
{% else %}
Publication records will be added here.
{% endif %}

Talks
======
{% if site.talks.size > 0 %}
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html %}
  {% endfor %}</ul>
{% else %}
Talks and presentations will be added here.
{% endif %}

Links
======
* [Google Scholar](https://scholar.google.com/citations?hl=en&user=j-UnGkAAAAAJ&view_op=list_works)
* [ORCID](https://orcid.org/0009-0004-1467-7570)
* [GitHub](https://github.com/PeidongGao)
