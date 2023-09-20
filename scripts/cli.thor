require 'open3'
require_relative '../lib/story-sprout/domain'

class CLI < Thor
  class_option :verbose, type: :boolean, aliases: '-v', desc: 'Verbose output', default: false

  option :name,
         type: :string,
         aliases: '-n',
         desc: 'The name of the app to deploy',
         default: 'storyteller-ui'
  desc 'domain SUBCOMMAND', 'Domain script'
  subcommand 'domain', StorySprout::Domain

  desc 'deploy', 'Deploy a preview of the current working branch'
  def deploy
    # TODO: Check for existing deployments by SHA
    o, s = Open3.capture2('vercel deploy')
    puts "Output: #{o}"
    if s.success?
      matches = /\Ahttps?:\/\/(.+)\.vercel\.app/.match(o)
      puts matches
    end
  end
end
