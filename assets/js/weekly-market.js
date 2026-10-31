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
  const setStatus = (text) => { status.hidden = !text; status.textContent = text; };

  async function loadDashboard() {
    try {
      const api = window.WeeklyMarketDashboard;
      if (!api) throw new Error("Chart component unavailable");
      const response = await fetch(`${root.dataset.historyUrl}?v=${Date.now()}`, { headers: { Accept: "text/csv" } });
      if (!response.ok) throw new Error("History unavailable");
      const reports = api.parseHistory(await response.text());
      const latest = reports[reports.length - 1];
      dateLabel.dateTime = latest.date; dateLabel.textContent = api.formatDate(latest.date);
      const currentImageUrl = `${root.dataset.imageUrl}?v=${encodeURIComponent(latest.date)}`;
      image.src = currentImageUrl; image.alt = `Weekly ETF dashboard through ${api.formatDate(latest.date)}.`; imageLink.href = currentImageUrl;
      const byDate = new Map(reports.map((report) => [report.date, report]));
      root.querySelectorAll("[data-weekly-archive-snapshot]").forEach((el) => {
        const report = byDate.get(el.dataset.weeklyDate);
        el.textContent = report ? report.rows.map((row) => `${row.ticker} ${api.percent(row.drawdown)} drawdown / ${api.percent(row.week_over_week)} weekly change`).join("; ") : "Market data is unavailable for this week.";
      });
      api.create(explorer, reports, window.echarts);
      fallback.open = false;
      if (!commentaryDate || latest.date > commentaryDate) {
        setStatus(`Data is available through ${api.formatDate(latest.date)}. Published notes below are ${commentaryDate ? `for ${api.formatDate(commentaryDate)}` : "pending"}.`);
      } else if (latest.date < commentaryDate) {
        setStatus(`Data is available through ${api.formatDate(latest.date)}. Published notes below are for ${api.formatDate(commentaryDate)}.`);
      } else setStatus("");
    } catch (error) {
      explorer.hidden = true; fallback.open = true;
      setStatus("The interactive chart is unavailable. The static dashboard and published weekly notes remain available below.");
    }
  }
  loadDashboard();
})();
