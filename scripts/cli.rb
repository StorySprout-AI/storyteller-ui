require 'open3'
require 'thor'
require 'droplet_kit'
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
    deploy_cmd = ['vercel deploy']
    deploy_cmd << '--prebuilt' if options[:prebuilt]
    # TODO: This is printing the output of the command to the console. It should either be
    #   suppressed, re-routed to a log file or printed to the console only if the verbose option is set.
    #   It is worth looking into the Open3.capture3 method to see if it can be used to capture the output
    #   while still printing it to the console with the source formatting.
    o, s = Open3.capture2(deploy_cmd.join(' '))
    if s.success?
      matches = /\Ahttps?:\/\/((.+)\.vercel\.app)/.match(o)
      _deploy_url, fqdn, name = matches.values_at 0, 1, 2
      # Initialize DigitalOcean client
      client = DropletKit::Client.new(access_token: ENV.fetch('DIGITALOCEAN_TOKEN'))
      # Create domain record
      record = client.domain_records.create(
        DropletKit::DomainRecord.new(type: 'CNAME', name:, data: "#{fqdn}."),
        for_domain: 'storysprout.app'
      )
      # TODO: Add alias/domain for review deployment using vercel CLI
      # TODO: Add github comment with deployment URL to PR if one exists for the current branch
      alias_cmd = ['vercel alias', fqdn, "#{record.name}.storysprout.app"]
      _o2, s2 = Open3.capture2(alias_cmd.join(' '))
      if s2.success?
        puts "Deployment successful! Visit https://#{name}.storysprout.app to view your deployment."
      else
        puts "There was a problem aliasing your deployment. Visit https://#{fqdn} to view your deployment."
      end
    else
      puts 'Deployment failed. Please try again.'
    end
  end
end
