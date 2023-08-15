require 'thor'

module StorySprout
  class Domain < Thor
    def self.exit_on_failure?
      true
    end

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
    desc 'record', 'Manage DNS records'
    def record
    end

    private

    def record_name_from_branch

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
