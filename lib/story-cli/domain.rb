require 'bundler'
require 'thor'
require 'dotenv'
require 'deep_merge'

# TODO: This should be helping avoid explicit requires,
#   but I'm not sure I have it working yet https://bundler.io/guides/bundler_setup.html
Bundler.require(ENV['RACK_ENV'] || 'development')

# Load environment variables
Dotenv.load('.envrc')

# Thor method option data types: https://github.com/rails/thor/wiki/Method-Options#types-for-method_options
module StoryCLI
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

    namespace 'story-cli:domain'

    option :branch_name,
           aliases: '-b',
           type: :string,
           desc: 'The name of the current feature branch',
           required: true
    desc 'record_name', 'Algorithm for generating the Render DNS record name derived from the current feature branch'
    def record_name
      from_branch = options[:branch_name]
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

    private

    def repo_path
      # Run command to get the github repository ssh path
      `git remote get-url origin`.strip
    end

    def current_branch
      `git branch --show-current`.strip
    end
  end
end
