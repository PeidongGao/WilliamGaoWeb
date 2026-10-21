import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('./worker.js', import.meta.url), 'utf8');
const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const html = '<html><head><title>Example</title></head><body><main><h1>Example</h1><p>' + 'Public content. '.repeat(25) + '</p></main></body></html>';

function request(headers = {}, method = 'GET') {
  return new Request('https://williampeidonggao.com/example/', { method, headers: { Accept: 'text/markdown', ...headers } });
}

test('converts public HTML and drops the original representation validators', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(html, { headers: { 'Content-Type': 'text/html', Vary: 'Accept-Encoding, X-Variant', ETag: '"html"', 'Content-Length': String(Buffer.byteLength(html)) } }));
  const res = await worker.fetch(request());
  assert.match(res.headers.get('Content-Type'), /^text\/markdown/);
  assert.equal(res.headers.get('ETag'), null);
  assert.equal(res.headers.get('Content-Length'), null);
  assert.match(res.headers.get('Vary'), /X-Variant, Accept$/);
  assert.match(res.headers.get('Strict-Transport-Security'), /max-age=/);
  assert.match(await res.text(), /# Example/);
});

test('unknown-length oversized HTML falls back byte-for-byte without a second fetch', async (t) => {
  const chunks = [new Uint8Array(700000).fill(65), new Uint8Array(700000).fill(66), new Uint8Array(100).fill(67)];
  const mock = t.mock.method(globalThis, 'fetch', async () => new Response(new ReadableStream({ pull(c) { const next = chunks.shift(); if (next) c.enqueue(next); else c.close(); } }), { headers: { 'Content-Type': 'text/html', Vary: 'Accept-Encoding' } }));
  const res = await worker.fetch(request());
  assert.equal(res.headers.get('X-Markdown-Fallback'), 'size-limit');
  assert.equal(res.headers.get('Vary'), 'Accept-Encoding, Accept');
  const bytes = new Uint8Array(await res.arrayBuffer());
  assert.equal(bytes.length, 1400100);
  assert.equal(bytes[0], 65);
  assert.equal(bytes[700000], 66);
  assert.equal(bytes[1400099], 67);
  assert.equal(mock.mock.callCount(), 1);
});

test('declared oversized HTML is passed through without consuming it', async (t) => {
  const origin = new Response(html, { headers: { 'Content-Type': 'text/html', 'Content-Length': '2000000' } });
  t.mock.method(globalThis, 'fetch', async () => origin);
  const res = await worker.fetch(request());
  assert.equal(origin.bodyUsed, false);
  assert.equal(res.headers.get('X-Markdown-Fallback'), 'size-limit');
  assert.equal(await res.text(), html);
});

test('POST passes through and is never repeated', async (t) => {
  const mock = t.mock.method(globalThis, 'fetch', async () => new Response(html, { headers: { 'Content-Type': 'text/html' } }));
  const res = await worker.fetch(request({}, 'POST'));
  assert.match(res.headers.get('Content-Type'), /^text\/html/);
  assert.equal(await res.text(), html);
  assert.equal(mock.mock.callCount(), 1);
});

test('personalized responses are not converted', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(html, { headers: { 'Content-Type': 'text/html', 'Cache-Control': 'private, max-age=10', 'Set-Cookie': 'session=example; Secure' } }));
  const res = await worker.fetch(request());
  assert.equal(res.headers.get('Set-Cookie'), 'session=example; Secure');
  assert.equal(await res.text(), html);
});

test('conversion failures preserve complete HTML and existing Vary tokens', async (t) => {
  const invalid = html.replace('Example</h1>', '&#999999999;</h1>');
  t.mock.method(globalThis, 'fetch', async () => new Response(invalid, { headers: { 'Content-Type': 'text/html', Vary: 'Accept-Encoding' } }));
  const res = await worker.fetch(request());
  assert.equal(res.headers.get('X-Markdown-Fallback'), 'conversion-failed');
  assert.equal(res.headers.get('Vary'), 'Accept-Encoding, Accept');
  assert.equal(await res.text(), invalid);
});

test('normal browser HTML keeps security headers and advertises Markdown', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(html, { headers: { 'Content-Type': 'text/html', Link: '</feed.xml>; rel="alternate"' } }));
  const res = await worker.fetch(request({ Accept: 'text/html' }));
  assert.match(res.headers.get('Link'), /feed\.xml/);
  assert.match(res.headers.get('Link'), /type="text\/markdown"/);
  assert.match(res.headers.get('Content-Security-Policy-Report-Only'), /object-src 'none'/);
  assert.equal(await res.text(), html);
});
