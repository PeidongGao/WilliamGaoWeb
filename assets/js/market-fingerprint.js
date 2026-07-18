(() => {
  "use strict";

  const root = document.querySelector("[data-market-fingerprint]");
  if (!root) return;

  const status = root.querySelector("[data-market-remote-state]");
  const figure = root.querySelector("[data-market-figure]");
  const image = root.querySelector("[data-market-image]");
  const imageLink = root.querySelector("[data-market-image-link]");
  const dateLabel = root.querySelector("[data-market-commentary-date]");
  const localDate = root.dataset.commentaryDate || "";
  const historyUrl = root.dataset.historyUrl;
  const imageBase = root.dataset.imageBase;
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  const isValidIsoDate = (date) => {
    if (!isoDate.test(date)) return false;

    const parsed = new Date(`${date}T00:00:00Z`);
    return Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date;
  };
  const requiredNumericColumns = [
    "sp500_previous_close", "sp500_open", "sp500_gap", "sp500_gap_pct",
    "nasdaq100_previous_close", "nasdaq100_open", "nasdaq100_gap", "nasdaq100_gap_pct",
    "vix_previous_close", "vix_open", "vix_gap", "vix_gap_pct",
    "tnx_previous_close", "tnx_open", "tnx_gap", "tnx_gap_pct",
    "dxy_previous_close", "dxy_open", "dxy_gap", "dxy_gap_pct",
    "wti_previous_close", "wti_open", "wti_gap", "wti_gap_pct",
  ];
  const requiredColumns = ["date", "source", ...requiredNumericColumns];

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

  const parseHistory = (csv) => {
    const lines = csv.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error("No Tracker history is available.");

    const headers = lines.shift().split(",");
    if (!requiredColumns.every((header) => headers.includes(header))) {
      throw new Error("Tracker history is missing required market columns.");
    }

    return lines.map((line) => {
      const values = line.split(",");
      return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
    }).filter((row) => (
      isValidIsoDate(row.date)
      && row.source.trim() !== ""
      && requiredNumericColumns.every((header) => (
        row[header].trim() !== "" && Number.isFinite(Number(row[header]))
      ))
    )).sort((a, b) => b.date.localeCompare(a.date));
  };

  const showImage = (date) => new Promise((resolve, reject) => {
    if (!isValidIsoDate(date)) throw new Error("Tracker returned an invalid report date.");

    const filename = `${date}.png`;
    const imageUrl = `${imageBase}${encodeURIComponent(filename)}`;
    image.alt = `Overnight Market Fingerprint for ${formatDate(date)}.`;
    imageLink.href = imageUrl;
    image.onload = () => {
      figure.hidden = false;
      resolve();
    };
    image.onerror = () => {
      figure.hidden = true;
      reject(new Error("Tracker image is unavailable."));
    };
    image.src = imageUrl;
  });

  const loadTracker = async () => {
    try {
      const response = await fetch(`${historyUrl}?v=${Date.now()}`, { headers: { Accept: "text/csv" } });
      if (!response.ok) throw new Error(`Tracker request failed (${response.status}).`);

      const latest = parseHistory(await response.text())[0];
      if (!latest) throw new Error("No valid Tracker report is available.");

      if (!localDate) {
        await showImage(latest.date);
        if (dateLabel) dateLabel.textContent = formatDate(latest.date);
        setStatus("Latest market data is available. Commentary is not yet published.");
        return;
      }

      if (latest.date === localDate) {
        await showImage(latest.date);
        status.hidden = true;
        return;
      }

      if (latest.date > localDate) {
        setStatus(`Latest market data is available for ${formatDate(latest.date)}. Commentary is pending; the published commentary below is for ${formatDate(localDate)}.`);
        return;
      }

      setStatus(`Tracker data is currently available through ${formatDate(latest.date)}. The published commentary below is for ${formatDate(localDate)}.`);
    } catch (error) {
      setStatus("Latest Tracker data is unavailable. The published commentary below remains available.");
    }
  };

  loadTracker();
})();
