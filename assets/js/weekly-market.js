(() => {
  "use strict";

  const root = document.querySelector("[data-weekly-market]");
  if (!root) return;

  const status = root.querySelector("[data-weekly-remote-state]");
  const dateLabel = root.querySelector("[data-weekly-dashboard-date]");
  const snapshot = root.querySelector("[data-weekly-snapshot]");
  const image = root.querySelector("[data-weekly-image]");
  const imageLink = root.querySelector("[data-weekly-image-link]");
  const commentaryDate = root.dataset.commentaryDate || "";
  const historyUrl = root.dataset.historyUrl;
  const imageUrl = root.dataset.imageUrl;
  const tickers = ["VOO", "QQQ", "SMH"];
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;

  const setStatus = (message) => {
    status.hidden = false;
    status.textContent = message;
  };

  const formatDate = (date) => new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));

  const isValidDate = (date) => {
    if (!isoDate.test(date)) return false;
    const parsed = new Date(`${date}T00:00:00Z`);
    return Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date;
  };

  const parseHistory = (csv) => {
    const lines = csv.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 4) throw new Error("No complete weekly history is available.");

    const headers = lines.shift().replace(/^\uFEFF/, "").split(",");
    const required = ["week_ending", "ticker", "drawdown", "week_over_week"];
    if (!required.every((header) => headers.includes(header))) {
      throw new Error("Weekly history is missing required columns.");
    }

    const weeks = new Map();
    lines.forEach((line) => {
      const values = line.split(",");
      const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
      if (
        !isValidDate(row.week_ending)
        || !tickers.includes(row.ticker)
        || row.drawdown.trim() === ""
        || row.week_over_week.trim() === ""
        || !Number.isFinite(Number(row.drawdown))
        || !Number.isFinite(Number(row.week_over_week))
      ) return;

      if (!weeks.has(row.week_ending)) weeks.set(row.week_ending, new Map());
      weeks.get(row.week_ending).set(row.ticker, row);
    });

    const completeDates = [...weeks.keys()]
      .filter((date) => tickers.every((ticker) => weeks.get(date).has(ticker)))
      .sort((a, b) => b.localeCompare(a));
    if (!completeDates.length) throw new Error("No complete weekly report is available.");

    return completeDates.map((date) => ({
      date,
      rows: tickers.map((ticker) => weeks.get(date).get(ticker)),
    }));
  };

  const formatPercent = (value) => {
    const percent = Number(value) * 100;
    const sign = percent > 0 ? "+" : percent < 0 ? "−" : "";
    return `${sign}${Math.abs(percent).toFixed(1)}%`;
  };

  const renderSnapshot = (rows) => {
    snapshot.replaceChildren(...rows.map((row) => {
      const tableRow = document.createElement("tr");
      [row.ticker, formatPercent(row.drawdown), formatPercent(row.week_over_week)].forEach((value) => {
        const cell = document.createElement("td");
        cell.style.textAlign = "center";
        cell.textContent = value;
        tableRow.appendChild(cell);
      });
      return tableRow;
    }));
  };

  const snapshotText = (rows) => rows.map((row) => (
    `${row.ticker} ${formatPercent(row.drawdown)} drawdown / ${formatPercent(row.week_over_week)} weekly return`
  )).join("; ");

  const renderArchiveSnapshots = (reports) => {
    const reportsByDate = new Map(reports.map((report) => [report.date, report]));
    root.querySelectorAll("[data-weekly-archive-snapshot]").forEach((archiveSnapshot) => {
      const report = reportsByDate.get(archiveSnapshot.dataset.weeklyDate);
      archiveSnapshot.textContent = report ? snapshotText(report.rows) : "Market data is unavailable for this week.";
    });
  };

  const loadDashboard = async () => {
    try {
      const response = await fetch(`${historyUrl}?v=${Date.now()}`, { headers: { Accept: "text/csv" } });
      if (!response.ok) throw new Error(`Weekly history request failed (${response.status}).`);

      const reports = parseHistory(await response.text());
      const latest = reports[0];
      dateLabel.dateTime = latest.date;
      dateLabel.textContent = formatDate(latest.date);
      renderSnapshot(latest.rows);
      renderArchiveSnapshots(reports);

      const currentImageUrl = `${imageUrl}?v=${encodeURIComponent(latest.date)}`;
      image.src = currentImageUrl;
      image.alt = `Weekly ETF dashboard through ${formatDate(latest.date)}.`;
      imageLink.href = currentImageUrl;

      if (!commentaryDate) {
        setStatus(`Latest weekly market data is available for ${formatDate(latest.date)}. Commentary is pending.`);
      } else if (latest.date === commentaryDate) {
        status.hidden = true;
      } else if (latest.date > commentaryDate) {
        setStatus(`Latest weekly market data is available for ${formatDate(latest.date)}. Commentary is pending; the published notes below are for ${formatDate(commentaryDate)}.`);
      } else {
        setStatus(`Weekly market data is currently available through ${formatDate(latest.date)}. The published notes below are for ${formatDate(commentaryDate)}.`);
      }
    } catch (error) {
      setStatus("Latest weekly market data is unavailable. The published dashboard and notes below remain available.");
    }
  };

  loadDashboard();
})();
