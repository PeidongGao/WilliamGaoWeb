# Generate dated daily/weekly editions from the existing approved report data.
require "date"
require "csv"

module MarketEditions
  class Generator < Jekyll::Generator
    safe true
    priority :low

    SERIES = [
      ["daily", "market_commentary", "/market-fingerprint/", "daily-market-publication.html"],
      ["weekly", "weekly_market_commentary", "/follow-the-market-with-will/", "weekly-market-publication.html"]
    ].freeze

    def generate(site)
      history = weekly_history(site)
      SERIES.each do |kind, data_key, base_url, template|
        entries = site.data.fetch(data_key, [])
        next if entries.empty?
        dated = entries.map { |entry| [Date.iso8601(entry.fetch("date").to_s).iso8601, entry] }.sort_by(&:first)
        raise Jekyll::Errors::FatalException, "Duplicate #{kind} commentary dates" unless dated.map(&:first).uniq.size == dated.size
        root = site.pages.find { |page| page.url == base_url }
        raise Jekyll::Errors::FatalException, "Missing #{kind} publication page" unless root
        root.data["market_edition_type"] = kind
        root.data["market_edition_root"] = base_url

        dated.each_with_index do |(day, entry), index|
          path = "#{base_url}#{day}/"
          if site.pages.any? { |page| page.url == path || Array(page.data["redirect_from"]).include?(path) }
            raise Jekyll::Errors::FatalException, "Edition URL already exists: #{path}"
          end
          page = Jekyll::PageWithoutAFile.new(site, site.source, path.sub(%r{\A/}, ""), "index.html")
          page.content = "{% include #{template} %}"
          page.data = root.data.dup.merge(
            "permalink" => path,
            "market_edition_entry" => entry,
            "market_edition_date" => day,
            "market_edition_previous" => index.positive? ? link(base_url, dated[index - 1][0]) : nil,
            "market_edition_next" => index < dated.size - 1 ? link(base_url, dated[index + 1][0]) : nil
          )
          page.data["weekly_edition_rows"] = history.select { |row| row["week_ending"] == day } if kind == "weekly"
          site.pages << page
        end
        root.data["market_edition_previous"] = dated.size > 1 ? link(base_url, dated[-2][0]) : nil
        if kind == "weekly"
          root.data["weekly_edition_rows"] = history.select { |row| row["week_ending"] == dated[-1][0] }
          root.data["weekly_static_image_matches"] = history.map { |row| row["week_ending"] }.max == dated[-1][0]
        end
      end
    rescue ArgumentError, KeyError => error
      raise Jekyll::Errors::FatalException, "Invalid market edition: #{error.message}"
    end

    def link(base_url, day)
      { "date" => day, "url" => "#{base_url}#{day}/" }
    end

    def weekly_history(site)
      rows = CSV.read(File.join(site.source, "assets/data/weekly-market-history.csv"), headers: true).map(&:to_h)
      keys = {}
      rows.each do |row|
        Date.iso8601(row.fetch("week_ending"))
        key = [row.fetch("week_ending"), row.fetch("ticker")]
        unless %w[VOO QQQ SMH].include?(key[1]) && !keys[key] && %w[drawdown week_over_week].all? { |field| Float(row.fetch(field)).finite? }
          raise Jekyll::Errors::FatalException, "Invalid weekly chart record: #{key.join('/')}"
        end
        keys[key] = true
      end
      raise Jekyll::Errors::FatalException, "Incomplete weekly ETF observations" unless rows.group_by { |row| row["week_ending"] }.values.all? { |group| group.size == 3 }
      rows
    end
  end
end
