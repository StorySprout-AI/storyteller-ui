require_relative './base_object'

module Digitalocean
  class GetRecords < BaseObject
    before do
      set_authorization_header!
    end

    def call
      response = self.class.get("/domains/#{context.domain}/records", context.options)
      # TODO: Set context.records
      if (data = (response.parsed_response.dig('domain_records') || []).map(&:deep_symbolize_keys))
        context.data = data
      else
        context.fail!('Failed to get domain records')
      end
    end
  end
end
