---
title: "Excel Pixel Art Generator"
permalink: /resources/excel-pixel-art-generator/
layout: single
author_profile: true
---

<section class="home-hero">
  <div class="home-hero__copy">
    <p class="home-kicker">Tool / Excel / Paint-by-number</p>
    <h2>Excel Pixel Art Generator</h2>
    <p class="home-hero__lead">Upload an image and generate an Excel workbook with a finished reference sheet, a paper-style numbered template, and a color index for manual coloring.</p>
  </div>
  <figure class="home-hero__media">
    <img src="{{ '/images/excel-pixel-art-wave.jpg' | relative_url }}" alt="Under the Wave off Kanagawa demo image">
  </figure>
</section>

<section class="research-panel" aria-label="Excel Pixel Art Generator features">
  <article>
    <span>01</span>
    <h3>Upload any image</h3>
    <p>Use a Streamlit interface or command-line workflow to convert paintings, photos, and illustrations into Excel workbooks.</p>
  </article>
  <article>
    <span>02</span>
    <h3>Control the canvas</h3>
    <p>Choose A4, Letter, B5, and other paper presets, or set exact Excel-cell resolution such as 240 x 170.</p>
  </article>
  <article>
    <span>03</span>
    <h3>Paint by number</h3>
    <p>Each workbook includes Reference, Template, and Color Index sheets. The template uses light gray numbers and no printed borders.</p>
  </article>
</section>

## Project Links

- [GitHub repository](https://github.com/PeidongGao/excel-pixel-art-generator)
- [Demo workbooks](https://github.com/PeidongGao/excel-pixel-art-generator/tree/main/demos)
- [Streamlit documentation](https://streamlit.io/#install)

## Run Locally

```bash
git clone https://github.com/PeidongGao/excel-pixel-art-generator.git
cd excel-pixel-art-generator
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e .
excel-pixel-art-streamlit
```

Then open:

```text
http://127.0.0.1:8501
```

The lightweight local upload form is also available:

```bash
excel-pixel-art-web
```

Then open:

```text
http://127.0.0.1:8000
```

## Example Outputs

Both examples use A4 landscape paper setup. Higher resolution and more indexed colors produce more detail, but also more cells to fill.

| Image | Starter | Medium | Maximum |
| --- | --- | --- | --- |
| Great Wave | [80 x 56 / 16 colors](https://github.com/PeidongGao/excel-pixel-art-generator/raw/main/demos/wave_a4_080x056_016colors.xlsx) | [160 x 113 / 64 colors](https://github.com/PeidongGao/excel-pixel-art-generator/raw/main/demos/wave_a4_160x113_064colors.xlsx) | [240 x 170 / 256 colors](https://github.com/PeidongGao/excel-pixel-art-generator/raw/main/demos/wave_a4_240x170_256colors.xlsx) |
| Landscape photo | [80 x 56 / 16 colors](https://github.com/PeidongGao/excel-pixel-art-generator/raw/main/demos/landscape_a4_080x056_016colors.xlsx) | [160 x 113 / 64 colors](https://github.com/PeidongGao/excel-pixel-art-generator/raw/main/demos/landscape_a4_160x113_064colors.xlsx) | [240 x 170 / 256 colors](https://github.com/PeidongGao/excel-pixel-art-generator/raw/main/demos/landscape_a4_240x170_256colors.xlsx) |

<figure>
  <img src="{{ '/images/excel-pixel-art-landscape.jpg' | relative_url }}" alt="Landscape photo used as an Excel Pixel Art Generator demo">
  <figcaption>Landscape photo demo input.</figcaption>
</figure>

## Image Credits and Rights

The Great Wave sample image is sourced from [The Art Institute of Chicago collection record](https://www.artic.edu/artworks/89503/under-the-wave-off-kanagawa-kanagawa-oki-nami-ura-also-known-as-the-great-wave-from-the-series-thirty-six-views-of-mount-fuji-fugaku-sanjurokkei), where the work is identified as public domain / CC0. The landscape photo is a user-provided photograph taken by William and included for demo generation.

Users are responsible for ensuring they have the legal right to upload, transform, distribute, print, sell, or otherwise use any image processed with the tool. This page is not legal advice.
