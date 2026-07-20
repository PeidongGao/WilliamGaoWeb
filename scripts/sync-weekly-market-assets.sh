#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: scripts/sync-weekly-market-assets.sh HISTORY_CSV DASHBOARD_PNG" >&2
  exit 2
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
site_root="$(cd "${script_dir}/.." && pwd)"
history_source="$1"
dashboard_source="$2"
history_target="${site_root}/assets/data/weekly-market-history.csv"
dashboard_target="${site_root}/images/market/weekly-market-dashboard.png"

if [[ ! -f "${history_source}" ]]; then
  echo "History CSV was not found." >&2
  exit 1
fi

if [[ ! -f "${dashboard_source}" ]]; then
  echo "Dashboard PNG was not found." >&2
  exit 1
fi

header="$(sed -n '1p' "${history_source}")"
for column in week_ending ticker drawdown week_over_week; do
  if [[ ",${header}," != *",${column},"* ]]; then
    echo "History CSV is missing required column: ${column}" >&2
    exit 1
  fi
done

mkdir -p "$(dirname "${history_target}")" "$(dirname "${dashboard_target}")"

history_temp="$(mktemp)"
dashboard_temp="$(mktemp)"
trap 'rm -f "${history_temp}" "${dashboard_temp}"' EXIT

awk -F',' '
  BEGIN { OFS = "," }
  NR == 1 {
    for (field_num = 1; field_num <= NF; field_num++) {
      gsub(/\r$/, "", $field_num)
      columns[$field_num] = field_num
    }
    print "week_ending", "ticker", "drawdown", "week_over_week"
    next
  }
  {
    gsub(/\r$/, "", $columns["week_over_week"])
    print $columns["week_ending"], $columns["ticker"], $columns["drawdown"], $columns["week_over_week"]
  }
' "${history_source}" > "${history_temp}"

cp "${dashboard_source}" "${dashboard_temp}"

if strings "${dashboard_temp}" | grep -Eq '(/Users/|/home/|[A-Za-z]:\\Users\\)'; then
  echo "Dashboard PNG appears to contain a local filesystem path; synchronization stopped." >&2
  exit 1
fi

mv "${history_temp}" "${history_target}"
mv "${dashboard_temp}" "${dashboard_target}"

echo "Weekly market assets synchronized."
