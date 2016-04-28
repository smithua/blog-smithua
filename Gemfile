# smithua blog Gemfile
source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']

# Jekyll and Plugins
gem 'jekyll-archives'
gem 'jekyll-tagging-related_posts'
# gem 'jekyll-assets'

gem 'html-proofer'
gem 'rake'
