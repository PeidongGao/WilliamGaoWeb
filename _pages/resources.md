---
layout: archive
title: "Resources"
permalink: /resources/
author_profile: true
---

## Resources

This page collects selected resources related to bioinformatics, computational biology, multi-omics analysis, human islet biology, diabetes, and reproducible research workflows.

{% if site.resources.size > 0 %}

## Resource collection

{% assign resources = site.resources | sort: "title" %}

{% for resource in resources %}
- [{{ resource.title }}]({{ resource.url | relative_url }})
{% endfor %}

{% else %}

Content will be added gradually.

{% endif %}