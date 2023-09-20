require_relative './base_object'

module Digitalocean
  class PatchRecord < BaseObject
    before do
      set_authorization_header!
    end

    # TODO: Consider using this instead https://github.com/digitalocean/droplet_kit
    def call
      if context.success?
        # Check if a matching record exists by name
        matching_record = context.domain_records.find do |record|
          record[:name] == context.name
        end

        unless matching_record.nil?
          context.domain_record = matching_record
          patch("/domains/#{context.domain}/records/#{matching_record[:id]}", context.request_options)
          if (data = response_item('domain_record'))
            context.data = data
          else
            context.fail!('Failed to patch domain record')
          end
        end

        # context.fail!(message: "No matching record found by name: #{context.options[:name]}") if matching_record.nil?
      end
    end
  end
end
