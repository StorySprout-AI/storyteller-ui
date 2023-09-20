require 'open3'
require_relative '../lib/story-sprout/domain'

class CLI < Thor
  class_option :verbose, type: :boolean, aliases: '-v', desc: 'Verbose output', default: false

  desc 'domain SUBCOMMAND', 'Domain script'
  subcommand 'domain', StorySprout::Domain

  desc 'deploy', 'Deploy a preview of the current working branch'
  def deploy
    o, s = Open3.capture2('vercel deploy')
    puts "Output: #{o}"
    if s.success?
      matches = /\Ahttps?:\/\/((.+)\.vercel\.app)/.match(o)
      puts matches
    end
  end
end
