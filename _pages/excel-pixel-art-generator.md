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
    <p class="home-hero__lead">Upload an image and independently generate a Digital Excel paint-by-number workbook or Physical production outputs with material palettes, printable pages, and color masks.</p>
    <p>Excel Pixel Art Generator is a WillGaoLab product made by William (Peidong) Gao.</p>
    <p><a class="btn btn--primary" href="https://willgaolab-dvy5xga3u2xexllw7lei82.streamlit.app/">Launch the app</a></p>
  </div>
  <figure class="home-hero__media">
    <img src="{{ '/images/excel-pixel-art-wave.jpg' | relative_url }}" alt="Under the Wave off Kanagawa demo image">
  </figure>
</section>

<section class="research-panel" aria-label="Excel Pixel Art Generator features">
  <article>
    <span>01</span>
    <h3>Upload any image</h3>
    <p>Use the hosted Streamlit interface to convert paintings, photos, and illustrations into Excel workbooks.</p>
  </article>
  <article>
    <span>02</span>
    <h3>Digital Layer</h3>
    <p>Create an Excel workbook with Reference, Template, and Color Index sheets using an independent paper canvas, resolution, and indexed color count.</p>
  </article>
  <article>
    <span>03</span>
    <h3>Physical Layer</h3>
    <p>Generate material-matched production outputs using Adaptive, LEGO, or Liquitex Basics 24 palettes, with optional poster splitting and color masks.</p>
  </article>
</section>

## Project Links

- [Launch the hosted app](https://willgaolab-dvy5xga3u2xexllw7lei82.streamlit.app/)
- [GitHub repository](https://github.com/PeidongGao/excel-pixel-art-generator)
- [Streamlit app repository](https://github.com/WillGaoLab/WillGaoLab)
- [Demo workbooks](https://github.com/PeidongGao/excel-pixel-art-generator/tree/main/demos)
- [Streamlit documentation](https://streamlit.io/#install)

## Use Online

Open:

```text
https://willgaolab-dvy5xga3u2xexllw7lei82.streamlit.app/
```

Upload an image, configure the independent Digital or Physical workflow, then download the generated workbook or Physical output ZIP.

## Version 2

Version 2 separates the generator into two workflows:

- **Digital Layer / Excel Mode** creates the familiar Excel pixel-art reference, numbered template, and color index.
- **Physical Layer / Print Mode** uses an independent print canvas and material palette, with optional poster splitting, color masks, workbook output, printable PDF output, and mask output.

Both layers default to A4, `128 x 128`, and 48 colors. Physical material palette options include Adaptive, LEGO, and Liquitex Basics 24.

Selected Physical outputs are packaged into one ZIP download.

Physical material colors are screen approximations. Actual LEGO plastic and acrylic paint colors vary with lighting, surface, opacity, and drying.

## Run Locally

```bash
git clone https://github.com/WillGaoLab/WillGaoLab.git
cd WillGaoLab
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
streamlit run streamlit_app.py
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

## Personal Use and Legal Notice

Excel Pixel Art Generator is a WillGaoLab product made by William (Peidong) Gao. The WillGaoLab name, project identity, documentation, source code organization, and product presentation are maintained by William (Peidong) Gao unless otherwise stated.

This tool is provided for personal, educational, research, and non-commercial creative use only.

Do not use uploaded images, generated templates, generated workbooks, or derivative outputs for commercial sale, paid products, merchandise, advertising, client work, or other revenue-generating activity unless you have independently secured all required rights and permissions.

Users are solely responsible for ensuring they have the legal right to upload, transform, distribute, print, share, or otherwise use any image processed with the tool. The maintainers do not claim ownership of user-uploaded images or generated workbooks, and do not grant rights to third-party images.

Generated outputs may still be subject to copyright, trademark, privacy, publicity, moral rights, museum/license terms, or other legal restrictions depending on the source image and jurisdiction. The tool is provided as-is, without warranty. The maintainers are not liable for misuse, infringement claims, losses, damages, takedown requests, printing costs, or other consequences arising from use of the tool or generated outputs.

This notice is not legal advice. For commercial use, public distribution, uncertain image rights, or jurisdiction-specific questions, consult a qualified legal professional before using the image or output.
