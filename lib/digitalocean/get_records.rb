require_relative './base_object'

module Digitalocean
  class GetRecords < BaseObject
    before do
      set_authorization_header!
    end

    # TODO: Consider using this instead https://github.com/digitalocean/droplet_kit
    def call
      get("/domains/#{context.domain}/records", context.request_options)
      # TODO: Set context.records
      if (data = response_item('domain_records', as_list: true))
        context.domain_records = data
      else
        context.fail!(message: 'Failed to get domain records')
      end
    end
  end
end
