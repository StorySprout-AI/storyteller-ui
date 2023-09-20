require 'open3'
require 'thor'
require_relative '../lib/story-sprout/domain'

class CLI < Thor
  def self.exit_on_failure?
    true
  end

  class_option :verbose, type: :boolean, aliases: '-v', desc: 'Verbose output', default: false

  desc 'domain SUBCOMMAND', 'Domain script'
  subcommand 'domain', StorySprout::Domain

  option :name,
         type: :string,
         aliases: '-n',
         desc: 'The name of the app to deploy',
         default: 'storyteller-ui'
  option :prebuilt,
         type: :boolean,
         desc: 'Use the prebuilt version of the app',
         default: false
  desc 'deploy', 'Deploy a preview of the current working branch'
  def deploy
    # TODO: Check for existing deployments by SHA
    cmd = ['vercel deploy']
    cmd << '--prebuilt' if options[:prebuilt]
    o, s = Open3.capture2(cmd.join(' '))
    puts "Output: #{o}"
    if s.success?
      matches = /\Ahttps?:\/\/((.+)\.vercel\.app)/.match(o)
      _deploy_url, cname_data, deploy_name = matches.values_at 0, 1, 2
      # Attempt to create DNS record
      StorySprout::Domain.new.invoke(
        :upsert_record, [],
        type: 'CNAME',
        name: deploy_name,
        data: cname_data,
        verbose: options[:verbose]
      )
      # TODO: Add github comment with deployment URL to PR if one exists for the current branch
    end
  end
end
