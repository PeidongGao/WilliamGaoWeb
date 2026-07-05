/* Client-side filtering for the Resources hub. Progressive enhancement:
   with JS off, every card is already rendered and visible. */
(function () {
  "use strict";
  var grid = document.querySelector("[data-resource-grid]");
  if (!grid) return;

  var typeBar = document.querySelector("[data-filter-types]");
  var topicBar = document.querySelector("[data-filter-topics]");
  var emptyMsg = document.querySelector("[data-empty]");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".wg-card"));

  var activeType = "all";
  var activeTopic = null;

  function apply() {
    var shown = 0;
    cards.forEach(function (card) {
      var type = card.getAttribute("data-type") || "";
      var topics = (card.getAttribute("data-topics") || "").split(" ");
      var okType = activeType === "all" || type === activeType;
      var okTopic = !activeTopic || topics.indexOf(activeTopic) !== -1;
      var show = okType && okTopic;
      card.hidden = !show;
      if (show) shown++;
    });
    if (emptyMsg) emptyMsg.hidden = shown !== 0;
  }

  function wire(bar, attr, onSet) {
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("[" + attr + "]");
      if (!btn) return;
      onSet(btn.getAttribute(attr), btn, bar);
      apply();
    });
  }

  wire(typeBar, "data-type", function (val, btn, bar) {
    activeType = val;
    bar.querySelectorAll(".wg-filter__btn").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");
  });

  wire(topicBar, "data-topic", function (val, btn, bar) {
    if (activeTopic === val) {
      activeTopic = null;
      btn.classList.remove("is-active");
    } else {
      activeTopic = val;
      bar.querySelectorAll(".wg-chip--btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
    }
  });
})();
