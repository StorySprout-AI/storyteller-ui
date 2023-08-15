require 'bundler'
require 'thor'
require 'dotenv'
require_relative '../digitalocean'

# TODO: This should be helping avoid explicit requires,
#   but I'm not sure I have it working yet https://bundler.io/guides/bundler_setup.html
Bundler.require(ENV['RACK_ENV'] || 'development')

# Load environment variables
Dotenv.load('.envrc')

# Thor method option data types: https://github.com/rails/thor/wiki/Method-Options#types-for-method_options
module StorySprout
  class Domain < Thor
    def self.exit_on_failure?
      true
    end

    class_option :verbose,
                 type: :boolean,
                 aliases: '-v',
                 desc: 'Verbose output',
                 default: false, required: false
    class_option :domain,
                 type: :string,
                  aliases: '-d',
                 desc: 'The domain name to manage',
                 default: 'storysprout.app',
                 required: false

    namespace 'story-sprout-cli:domain'

    option :type,
           type: :string,
           alias: '-t',
           desc: 'The type of the DNS record. For example: A, CNAME, TXT, ...',
           required: true
    option :name,
           type: :string,
           alias: '-n',
           desc: 'The host name, alias, or service being defined by the record',
           required: true
    option :data,
           type: :string,
           alias: '-d',
           desc: 'Variable data depending on record type',
           required: true
    option :ttl, type: :numeric, desc: 'This value is the time to live for the record, in seconds'
    desc 'upsert_record', 'Create or Update a DNS record'
    def upsert_record
      # Fetch DNS records for options[:domain] (via Digitalocean::Records)
      #  - If the record exists by options[:name], update it (via Digitalocean::PatchRecord)
      #  - If the record does not exist, create it (via Digitalocean::PutRecord)
      result = Digitalocean::UpsertRecord.call(options)
      if result.success?
        puts "Upserted record for #{record_fqdn}"
      else
        puts result.message
      end
    end

    private

    def record_fqdn
      "#{options[:name] || record_name}.#{options[:domain]}"
    end

    def record_name(from_branch = nil)
      matches = /^git@github.com:(.+)\/(.+).git$/.match(repo_path)
      branch = from_branch
      branch ||= current_branch
      branch_parts = branch.split('/', 2)
      git_user, repo_name = matches.values_at 1, 2
      no_special_chars_regex = /[^a-zA-Z0-9-]/
      branch_parts.map! { |part| part.gsub(no_special_chars_regex, '') }
      clean_repo_name = repo_name.gsub(no_special_chars_regex, '')
      clean_git_user = git_user.gsub(no_special_chars_regex, '')
      [clean_repo_name, 'git', branch_parts, clean_git_user].flatten.map(&:downcase).flatten.join('-')
    end

    def repo_path
      # Run command to get the github repository ssh path
      `git remote get-url origin`.strip
    end

    def current_branch
      `git branch --show-current`.strip
    end
  end
end
