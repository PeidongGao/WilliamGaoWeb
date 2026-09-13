/**
 * Markdown content negotiation for williampeidonggao.com
 *
 * Requests carrying `Accept: text/markdown` get a Markdown rendering of the
 * page; everything else is passed through untouched, so browsers keep the HTML.
 *
 * Exists because the origin is GitHub Pages, which serves static files and
 * cannot negotiate, and Cloudflare's built-in "Markdown for Agents" converter
 * requires a Pro plan. This reproduces that behaviour on the Free tier.
 */

const MD_TYPES = ['text/markdown', 'application/markdown', 'text/x-markdown'];

function wantsMarkdown(request) {
  const accept = request.headers.get('Accept') || '';
  if (!MD_TYPES.some((t) => accept.toLowerCase().includes(t))) return false;
  // An `Accept: */*` client is not asking for Markdown specifically.
  return true;
}

/* ---------- HTML -> Markdown ------------------------------------------- */

function decodeEntities(s) {
  const named = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    mdash: '—', ndash: '–', hellip: '…', middot: '·',
    rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
    times: '×', deg: '°', rarr: '→', larr: '←',
  };
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => (named[n.toLowerCase()] !== undefined ? named[n.toLowerCase()] : m));
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

/** Inline elements -> Markdown, applied inside a block. */
function inline(html) {
  let s = html;
  s = s.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, '');
  s = s.replace(/<br\s*\/?>/gi, '\u0000');
  s = s.replace(/<\s*(code)[^>]*>([\s\S]*?)<\/\s*\1\s*>/gi, (_, __, t) => '`' + stripTags(t) + '`');
  s = s.replace(/<\s*(strong|b)[^>]*>([\s\S]*?)<\/\s*\1\s*>/gi, (_, __, t) => {
    const inner = inline(t).trim();
    return inner ? '**' + inner + '**' : '';
  });
  s = s.replace(/<\s*(em|i)[^>]*>([\s\S]*?)<\/\s*\1\s*>/gi, (_, __, t) => {
    const inner = inline(t).trim();
    return inner ? '*' + inner + '*' : '';
  });
  s = s.replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
    const label = inline(t).trim();
    if (!label) return '';
    if (href.startsWith('#')) return label;
    return '[' + label + '](' + href.trim() + ')';
  });
  s = s.replace(/<img\b[^>]*?alt=["']([^"']*)["'][^>]*?src=["']([^"']+)["'][^>]*>/gi, (_, alt, src) => '![' + alt + '](' + src + ')');
  s = s.replace(/<img\b[^>]*?src=["']([^"']+)["'][^>]*>/gi, (_, src) => '![](' + src + ')');
  // Escape a bare "*" footnote marker: next to bold text, "**Name***" is
  // ambiguous to Markdown parsers.
  s = s.replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, (_, t) => stripTags(t).replace(/\*/g, '\\*'));
  // Collapse all whitespace, including the newlines Liquid leaves between
  // template tags (which otherwise shred a comma-separated author list), then
  // restore real <br> breaks from the sentinel.
  return decodeEntities(s.replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .replace(/\s*\u0000\s*/g, '  \n')
    .replace(/\s+([,.;:!?])/g, '$1');
}

function convertBlocks(html) {
  let s = html;

  // Drop anything that is chrome rather than content.
  s = s.replace(/<\s*(script|style|noscript|svg|form)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, '');
  // NB: <header> is NOT stripped here. extractMain has already scoped us to the
  // article, and an article's <header> carries the title, author list and
  // co-first-author marker — the most useful metadata on a publication page.
  s = s.replace(/<\s*(nav|aside|footer)\b[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, '');
  s = s.replace(/<[^>]+class=["'][^"']*(visually-hidden|screen-reader-text|page__share|author__urls|breadcrumbs|pagination)[^"']*["'][^>]*>[\s\S]*?<\/[a-z]+>/gi, '');

  const out = [];
  const blockRe = /<(h[1-6]|p|li|blockquote|pre|tr)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = blockRe.exec(s)) !== null) {
    const tag = m[1].toLowerCase();
    const raw = m[2];
    let text;
    if (tag === 'pre') {
      text = stripTags(raw);
      if (text) out.push('```\n' + text + '\n```');
      continue;
    }
    text = inline(raw).trim();
    if (!text) continue;
    if (/^h[1-6]$/.test(tag)) out.push('#'.repeat(Number(tag[1])) + ' ' + text);
    else if (tag === 'li') out.push('- ' + text);
    else if (tag === 'blockquote') out.push('> ' + text);
    else if (tag === 'tr') out.push('| ' + text + ' |');
    else out.push(text);
  }
  return out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Remove an element and everything inside it, counting nested tags of the same
 * name so the correct closing tag is found. A plain non-greedy regex stops at
 * the first `</div>`, which for a nested block cuts in the wrong place.
 */
function removeElement(html, openRe, tag) {
  for (let guard = 0; guard < 20; guard++) {
    openRe.lastIndex = 0;
    const m = openRe.exec(html);
    if (!m) return html;
    const open = new RegExp('<' + tag + '\\b', 'gi');
    const close = new RegExp('</' + tag + '\\s*>', 'gi');
    let depth = 1;
    let i = m.index + m[0].length;
    while (depth > 0 && i < html.length) {
      open.lastIndex = i;
      close.lastIndex = i;
      const o = open.exec(html);
      const c = close.exec(html);
      if (!c) return html.slice(0, m.index);
      if (o && o.index < c.index) { depth++; i = o.index + o[0].length; }
      else { depth--; i = c.index + c[0].length; }
    }
    html = html.slice(0, m.index) + html.slice(i);
  }
  return html;
}

function extractMain(html) {
  // The author sidebar sits inside role="main", so strip it first: otherwise
  // every page opens with the same name, bio and link list before its content.
  let s = html;
  s = removeElement(s, /<div\b[^>]*class=["'][^"']*\bsidebar\b[^"']*["'][^>]*>/gi, 'div');
  s = removeElement(s, /<nav\b[^>]*>/gi, 'nav');
  s = removeElement(s, /<footer\b[^>]*>/gi, 'footer');

  const patterns = [
    /<main\b[^>]*>([\s\S]*?)<\/main>/i,
    /<div\b[^>]*id=["']main["'][^>]*>([\s\S]*)<\/div>/i,
  ];
  for (const re of patterns) {
    const m = s.match(re);
    if (m && m[1].length > 200) return m[1];
  }
  const body = s.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return body ? body[1] : s;
}

function meta(html, name) {
  const re = new RegExp('<meta[^>]+(?:name|property)=["\']' + name + '["\'][^>]*content=["\']([^"\']*)["\']', 'i');
  const alt = new RegExp('<meta[^>]+content=["\']([^"\']*)["\'][^>]*(?:name|property)=["\']' + name + '["\']', 'i');
  const m = html.match(re) || html.match(alt);
  return m ? decodeEntities(m[1]) : '';
}

function yamlEscape(v) {
  return '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function htmlToMarkdown(html, url) {
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleM ? stripTags(titleM[1]) : '';
  const description = meta(html, 'description');
  const image = meta(html, 'og:image');

  const front = ['---', 'source: ' + yamlEscape(url)];
  if (title) front.push('title: ' + yamlEscape(title));
  if (description) front.push('description: ' + yamlEscape(description));
  if (image) front.push('image: ' + yamlEscape(image));
  front.push('---', '');

  const body = convertBlocks(extractMain(html));

  // Preserve structured data, which agents read.
  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1].trim())
    .filter(Boolean);
  let ld = '';
  if (blocks.length) {
    ld = '\n\n## Structured data\n\n```json\n' + blocks.join('\n') + '\n```';
  }

  return front.join('\n') + body + ld + '\n';
}

/* ---------- Worker ------------------------------------------------------ */

export default {
  async fetch(request) {
    try {
      return await handle(request);
    } catch (err) {
      // Last resort: pass the request straight to the origin, so a defect in
      // this Worker can never make the site unreachable.
      return fetch(request);
    }
  },
};

async function handle(request) {
  {
    const response = await fetch(request);

    // `Vary: Accept` on every response so caches never hand an agent's Markdown
    // to a browser, or the reverse.
    const withVary = (res) => {
      const h = new Headers(res.headers);
      const prev = h.get('Vary');
      // Compare complete tokens. A regex like /\baccept\b/ matches inside
      // "Accept-Encoding" (the hyphen is a word boundary), which would skip
      // adding "Accept" and let a cache serve Markdown to a browser.
      const tokens = (prev || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
      if (tokens.includes('*')) { /* already varies on everything */ }
      else if (!tokens.includes('accept')) h.set('Vary', tokens.concat('Accept').join(', '));
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
    };

    if (!wantsMarkdown(request)) return withVary(response);

    const type = response.headers.get('Content-Type') || '';
    if (!response.ok || !type.includes('text/html')) return withVary(response);

    const html = await response.text();
    const url = new URL(request.url).toString();

    // Never let a conversion bug take the site down. Any failure here falls
    // back to the original HTML, which is a worse answer for an agent but a
    // correct one for everybody — far better than a Cloudflare 1101 page.
    let markdown;
    try {
      markdown = htmlToMarkdown(html, url);
      if (!markdown || markdown.length < 80) throw new Error('conversion produced no usable output');
    } catch (err) {
      const fallback = new Headers(response.headers);
      fallback.set('Vary', 'Accept');
      fallback.set('X-Markdown-Fallback', 'conversion-failed');
      return new Response(html, { status: response.status, statusText: response.statusText, headers: fallback });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    headers.set('Vary', 'Accept');
    headers.set('Cache-Control', response.headers.get('Cache-Control') || 'public, max-age=600');
    headers.set('X-Markdown-Tokens', String(Math.ceil(markdown.length / 4)));
    headers.set('X-Original-Tokens', String(Math.ceil(html.length / 4)));
    headers.set('X-Content-Type-Options', 'nosniff');

    return new Response(request.method === 'HEAD' ? null : markdown, { status: 200, headers });
  }
}
