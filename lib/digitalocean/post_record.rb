require_relative './base_object'

module Digitalocean
  class PostRecord < BaseObject
    before do
      set_authorization_header!
    end

    # TODO: Consider using this instead https://github.com/digitalocean/droplet_kit
    def call
      # Create a new domain record with the name and data
      post_options = context.request_options.deep_merge(
        body: { type: context.type, name: context.name, data: context.data },
        headers: { 'Content-Type' => 'application/json' }
      )
      # TODO: Something is happening here that is causing this request to return
      #   a list of all domain records for context.domain instead of attempting to
      #   create a new record.
      post("/domains/#{context.domain}/records", post_options)
      if (data = response_item('domain_record'))
        context.data = data
      else
        context.fail!(message: 'Failed to create domain record')
      end
    end
  end
end
