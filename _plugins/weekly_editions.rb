# Build complete, dated weekly reports from the existing approved commentary.
# No manually maintained page or duplicate report text is needed for each week.
require "date"
require "csv"

module WeeklyEditions
  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      entries = site.data.fetch("weekly_market_commentary", [])
      return if entries.empty?
      dated = entries.map do |entry|
        day = Date.iso8601(entry.fetch("date").to_s).iso8601
        [day, entry]
      end.sort_by(&:first)
      raise Jekyll::Errors::FatalException, "Duplicate weekly commentary dates" unless dated.map(&:first).uniq.size == dated.size

      root = site.pages.find { |page| page.url == "/follow-the-market-with-will/" }
      raise Jekyll::Errors::FatalException, "Weekly publication page is missing" unless root
      history = CSV.read(File.join(site.source, "assets/data/weekly-market-history.csv"), headers: true).map(&:to_h)
      keys = {}
      history.each do |row|
        Date.iso8601(row.fetch("week_ending"))
        key = [row.fetch("week_ending"), row.fetch("ticker")]
        unless %w[VOO QQQ SMH].include?(key[1]) && !keys[key] && %w[drawdown week_over_week].all? { |field| Float(row.fetch(field)).finite? }
          raise Jekyll::Errors::FatalException, "Invalid weekly chart record: #{key.join('/')}"
        end
        keys[key] = true
      end
      unless history.group_by { |row| row["week_ending"] }.values.all? { |rows| rows.size == 3 }
        raise Jekyll::Errors::FatalException, "Weekly chart history has incomplete ETF observations"
      end

      dated.each_with_index do |(day, entry), index|
        path = "/follow-the-market-with-will/#{day}/"
        raise Jekyll::Errors::FatalException, "Weekly edition URL already exists: #{path}" if site.pages.any? { |page| page.url == path }
        page = Jekyll::PageWithoutAFile.new(site, site.source, "follow-the-market-with-will/#{day}", "index.html")
        page.content = "{% include weekly-market-publication.html %}"
        page.data = root.data.dup.merge(
          "permalink" => path,
          "weekly_entry" => entry,
          "weekly_edition_date" => day,
          "weekly_edition_previous" => index.positive? ? link(dated[index - 1][0]) : nil,
          "weekly_edition_next" => index < dated.size - 1 ? link(dated[index + 1][0]) : nil,
          "weekly_edition_rows" => history.select { |row| row["week_ending"] == day }
        )
        site.pages << page
      end
      root.data["weekly_edition_previous"] = dated.size > 1 ? link(dated[-2][0]) : nil
      root.data["weekly_edition_rows"] = history.select { |row| row["week_ending"] == dated[-1][0] }
      root.data["weekly_static_image_matches"] = history.map { |row| row["week_ending"] }.max == dated[-1][0]
    rescue ArgumentError, KeyError => error
      raise Jekyll::Errors::FatalException, "Invalid weekly edition: #{error.message}"
    end

    def link(day)
      { "date" => day, "url" => "/follow-the-market-with-will/#{day}/" }
    end
  end
end
