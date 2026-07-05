/* Lightweight, dependency-free client-side search over search.json.
   Works fully static on GitHub Pages. Config: window.WG_SEARCH_JSON. */
(function () {
  "use strict";
  var input = document.getElementById("wg-search-input");
  var results = document.getElementById("wg-search-results");
  var discovery = document.getElementById("wg-discovery");
  if (!input || !results) return;

  function toggleDiscovery() {
    if (discovery) discovery.hidden = input.value.trim().length > 0;
  }

  var url = window.WG_SEARCH_JSON || "/search.json";
  var data = [];
  var ready = false;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(items, q) {
    if (!q) { results.innerHTML = ""; return; }
    if (!items.length) {
      results.innerHTML = '<li class="wg-search__empty">No results for &ldquo;' + esc(q) + '&rdquo;.</li>';
      return;
    }
    results.innerHTML = items.map(function (it) {
      var topics = (it.topics || []).map(function (t) {
        return '<span class="wg-chip">' + esc(t) + "</span>";
      }).join("");
      return (
        '<li class="wg-search__item"><a href="' + esc(it.url) + '">' +
        '<span class="wg-card__eyebrow wg-card__eyebrow--lab">' + esc(it.type) + "</span>" +
        '<span class="wg-search__title">' + esc(it.title) + "</span>" +
        (it.summary ? '<span class="wg-search__summary">' + esc(it.summary) + "</span>" : "") +
        (topics ? '<span class="wg-card__topics">' + topics + "</span>" : "") +
        "</a></li>"
      );
    }).join("");
  }

  function search(q) {
    var needle = q.trim().toLowerCase();
    if (!needle) return [];
    return data.filter(function (it) {
      var hay = [it.title, it.summary, it.type].concat(it.topics || []).join(" ").toLowerCase();
      return hay.indexOf(needle) !== -1;
    }).slice(0, 50);
  }

  function run() { render(search(input.value), input.value.trim()); }

  fetch(url)
    .then(function (r) { return r.json(); })
    .then(function (json) { data = json; ready = true; if (input.value) run(); })
    .catch(function () {
      results.innerHTML = '<li class="wg-search__empty">Search index could not be loaded.</li>';
    });

  input.addEventListener("input", function () { if (ready) run(); toggleDiscovery(); });
  toggleDiscovery();
})();
