(() => {
  "use strict";
  const root = document.querySelector("[data-weekly-market]");
  if (!root) return;
  const status = root.querySelector("[data-weekly-remote-state]");
  const dateLabel = root.querySelector("[data-weekly-dashboard-date]");
  const explorer = root.querySelector("[data-weekly-explorer]");
  const fallback = root.querySelector("[data-weekly-static]");
  const image = root.querySelector("[data-weekly-image]");
  const imageLink = root.querySelector("[data-weekly-image-link]");
  const commentaryDate = root.dataset.commentaryDate || "";
  const editionDate = root.dataset.editionDate || commentaryDate;
  const editionSelect = root.querySelector("[data-market-edition-select]");
  if (editionSelect) editionSelect.addEventListener("change", () => window.location.assign(editionSelect.value));
  const setStatus = (text) => { status.hidden = !text; status.textContent = text; };

  async function loadDashboard() {
    try {
      const api = window.WeeklyMarketDashboard;
      if (!api) throw new Error("Chart component unavailable");
      const response = await fetch(`${root.dataset.historyUrl}?v=${Date.now()}`, { headers: { Accept: "text/csv" } });
      if (!response.ok) throw new Error("History unavailable");
      const reports = api.parseHistory(await response.text());
      const latest = reports[reports.length - 1];
      const editionReports = reports.filter((report) => !editionDate || report.date <= editionDate);
      const selected = editionReports[editionReports.length - 1];
      if (!selected || (editionDate && selected.date !== editionDate)) throw new Error("No matching chart observation for this report.");
      dateLabel.dateTime = selected.date; dateLabel.textContent = api.formatDate(selected.date);
      if (image && imageLink) {
        const sameWeek = selected.date === latest.date;
        image.closest("figure").hidden = !sameWeek;
        if (sameWeek) {
          const currentImageUrl = `${root.dataset.imageUrl}?v=${encodeURIComponent(selected.date)}`;
          image.src = currentImageUrl; image.alt = `Weekly ETF dashboard through ${api.formatDate(selected.date)}.`; imageLink.href = currentImageUrl;
        }
      }
      const byDate = new Map(reports.map((report) => [report.date, report]));
      root.querySelectorAll("[data-weekly-archive-snapshot]").forEach((el) => {
        const report = byDate.get(el.dataset.weeklyDate);
        el.textContent = report ? report.rows.map((row) => `${row.ticker} ${api.percent(row.drawdown)} drawdown / ${api.percent(row.week_over_week)} weekly change`).join("; ") : "Market data is unavailable for this week.";
      });
      api.create(explorer, editionReports, window.echarts);
      fallback.open = false;
      setStatus(editionDate && selected.date < latest.date
        ? `Viewing the report and chart for ${api.formatDate(selected.date)}. The chart includes only observations through this week.` : "");
    } catch (error) {
      explorer.hidden = true; fallback.open = true;
      setStatus("The interactive chart is unavailable for this report. Its recorded weekly snapshot and written notes remain available below.");
    }
  }
  loadDashboard();
})();
