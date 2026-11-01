require 'yaml'
require 'date'
require 'nokogiri'
require 'json'
require 'kramdown'
require 'kramdown-parser-gfm'
root=File.expand_path('..',__dir__)
compact=->(s){s.to_s.gsub(/\s+/,'')}
results=[]
def validate_citation(doc, slug, day)
 url="https://williampeidonggao.com/#{slug}/#{day}/"
 citations=doc.css('[data-market-citation]')
 raise 'Missing or duplicate edition citation' unless citations.size==1
 text=citations.first.text
 raise 'Missing citation author or publisher' unless text.include?('William Peidong Gao.') && text.include?('WillGaoLab.')
 raise 'Citation has the wrong report date' unless text.include?(Date.iso8601(day).strftime('%B %-d, %Y'))
 link=doc.at_css('[data-market-citation-link]')
 raise 'Citation must link to the dated edition' unless link && link['href']==url && link.text==url
end

[['daily','market_commentary.yml','market-fingerprint'],['weekly','weekly_market_commentary.yml','follow-the-market-with-will']].each do |kind,file,slug|
 entries=YAML.safe_load(File.read("#{root}/_data/#{file}"),permitted_classes:[Date]).sort_by{|r|r['date'].to_s}
 entries.each_with_index do |entry,i|
  day=entry['date'].to_s
  doc=Nokogiri::HTML(File.read("#{root}/_site/#{slug}/#{day}/index.html"))
  validate_citation(doc,slug,day)
  raise 'Wrong edition date' unless doc.at_css('[data-edition-date]')['data-edition-date']==day
  raise 'Summary changed' unless compact.call(doc.at_css('.mp-summary').text)==compact.call(entry['summary'])
  raise 'Observation changed' unless compact.call(doc.at_css('.wg-market-key-observation')&.text)==compact.call(entry['key_observation'])
  expected=entry['market_notes'].map{|n|kind=='daily' ? Nokogiri::HTML.fragment(Kramdown::Document.new(n,input:'GFM').to_html).text : n}.map{|n|compact.call(n)}
  raise "Notes changed: #{kind} #{day}" unless doc.css('.mp-note-content').map{|n|compact.call(n.text)}==expected
  raise 'Previous boundary' unless doc.at_css('[data-market-edition-previous]')&.[]('href')==(i>0 ? "/#{slug}/#{entries[i-1]['date']}/" : nil)
  raise 'Next boundary' unless doc.at_css('[data-market-edition-next]')&.[]('href')==(i<entries.size-1 ? "/#{slug}/#{entries[i+1]['date']}/" : nil)
  raise 'Incorrect canonical URL' unless doc.at_css('link[rel=canonical]')['href']=="https://williampeidonggao.com/#{slug}/#{day}/"
  raise 'Missing edition links' unless doc.css('.mp-edition-archive-links li').size==entries.size-1
  if kind=='weekly'
   raise 'Missing exact snapshot' unless doc.css('.mp-week-snapshot tbody tr').size==3
   raise 'Historical page contains latest PNG' if doc.at_css('[data-weekly-image]')
  end
 end
 latest=entries.last['date'].to_s
 validate_citation(Nokogiri::HTML(File.read("#{root}/_site/#{slug}/index.html")),slug,latest)
 results << {series:kind,editions:entries.size,all_fields_preserved:true,navigation_and_canonical_urls_valid:true,citations_valid:true,latest_citation_uses_dated_url:true}
end
raise 'Plugin source leaked' if File.exist?("#{root}/_site/_plugins")
puts JSON.pretty_generate(results)
