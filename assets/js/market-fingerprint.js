(() => {
  "use strict";
  const root = document.querySelector("[data-market-fingerprint]");
  if (!root) return;
  const status = root.querySelector("[data-market-remote-state]");
  const localDate = root.dataset.commentaryDate || "";
  const editionDate = root.dataset.editionDate || localDate;
  const editionSelect = root.querySelector("[data-market-edition-select]");
  if (editionSelect) editionSelect.addEventListener("change", () => window.location.assign(editionSelect.value));
  const explorer = root.querySelector("[data-fingerprint-explorer]");
  const load = async () => {
    try {
      if (!window.FingerprintExplorer) throw new Error("Interactive viewer unavailable.");
      const response = await fetch(`${root.dataset.historyUrl}?v=${Date.now()}`, { headers: { Accept: "text/csv" } });
      if (!response.ok) throw new Error("Tracker history unavailable.");
      const rows = FingerprintExplorer.parseCsv(await response.text());
      if (!rows.length) throw new Error("Tracker history is empty.");
      const selected = rows.find((row) => row.date === editionDate);
      if (!selected) throw new Error("No matching Tracker record for this daily report.");
      const initialDate = selected.date;
      status.textContent = `Report and fingerprint date: ${initialDate}. Use the report navigation above to change dates.`;
      await FingerprintExplorer.mount(explorer, {
        rows: [selected], initialDate, selectable: false,
        loadSvg: async (date) => {
          const result = await fetch(`${root.dataset.imageBase}${encodeURIComponent(date)}.svg?v=${Date.now()}`);
          if (!result.ok) throw new Error("The SVG is not available yet.");
          return result.text();
        },
      }).ready;
    } catch (error) {
      status.textContent = "A matching interactive fingerprint is unavailable for this report. The dated commentary remains available.";
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
