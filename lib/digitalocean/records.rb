require 'interactor'
require 'httparty'
require_relative '../digitalocean'

module Digitalocean
  class Records
    include Interactor
    include HTTParty

    base_uri Digitalocean::BASE_URI

    # TODO: Can we move this to a base interactor class
    #   for the Digitalocean module?
    before do
      context.options = {
        headers: {
          Authorization: "Bearer #{ENV.fetch('DIGITALOCEAN_TOKEN')}"
        }
      }
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
