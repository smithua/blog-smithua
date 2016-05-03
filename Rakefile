require 'html-proofer'

task :default do
  opts = { :allow_hash_href => true, :check_favicon => true, :enforce_https => true }
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site").run
end
