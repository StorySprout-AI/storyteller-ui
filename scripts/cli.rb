# frozen_string_literal: true

require_relative '../lib/story-cli/domain'
require_relative '../lib/story-cli/app'

class CLI < Thor
  class_option :verbose, type: :boolean, aliases: '-v', desc: 'Verbose output', default: false
  class_option :dry_run, type: :boolean, desc: 'Dry run', default: false

  namespace 'story-cli'

  desc 'domain SUBCOMMAND', 'Alias of domain command'
  subcommand 'domain', StoryCLI::Domain

  desc 'app SUBCOMMAND', 'Alias of app command'
  subcommand 'app', StoryCLI::App
end
