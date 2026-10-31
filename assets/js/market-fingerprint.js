(() => {
  "use strict";
  const root = document.querySelector("[data-market-fingerprint]");
  if (!root) return;
  const status = root.querySelector("[data-market-remote-state]");
  const localDate = root.dataset.commentaryDate || "";
  const explorer = root.querySelector("[data-fingerprint-explorer]");
  const load = async () => {
    try {
      if (!window.FingerprintExplorer) throw new Error("Interactive viewer unavailable.");
      const response = await fetch(`${root.dataset.historyUrl}?v=${Date.now()}`, { headers: { Accept: "text/csv" } });
      if (!response.ok) throw new Error("Tracker history unavailable.");
      const rows = FingerprintExplorer.parseCsv(await response.text());
      if (!rows.length) throw new Error("Tracker history is empty.");
      const latest = rows.at(-1).date;
      const initialDate = rows.some((row) => row.date === localDate) ? localDate : latest;
      status.textContent = localDate
        ? `The interactive chart can show any recorded date. Commentary on this page is for ${localDate}.${latest !== localDate ? ` Latest Tracker observation: ${latest}.` : ""}`
        : `Latest Tracker observation: ${latest}. Commentary is pending.`;
      await FingerprintExplorer.mount(explorer, {
        rows, initialDate,
        loadSvg: async (date) => {
          const result = await fetch(`${root.dataset.imageBase}${encodeURIComponent(date)}.svg?v=${Date.now()}`);
          if (!result.ok) throw new Error("The SVG is not available yet.");
          return result.text();
        },
      }).ready;
    } catch (error) {
      status.textContent = "Interactive Tracker data is unavailable. The published commentary remains available.";
      if (!/^\d{4}-\d{2}-\d{2}$/.test(localDate)) return;
      const image = root.querySelector("[data-market-image]");
      const url = `${root.dataset.imageBase}${encodeURIComponent(localDate)}.png`;
      image.alt = `Overnight Market Fingerprint for ${localDate}.`;
      image.onload = () => { root.querySelector("[data-market-figure]").hidden = false; };
      image.src = url;
      root.querySelector("[data-market-image-link]").href = url;
    }
  };
  load();
})();
