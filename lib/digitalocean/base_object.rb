require 'interactor'
require 'httparty'

module Digitalocean
  class BaseObject
    include Interactor
    include HTTParty

    base_uri 'api.digitalocean.com/v2'

    def set_authorization_header!
      context.request_options = {
        headers: {
          Authorization: "Bearer #{ENV.fetch('DIGITALOCEAN_TOKEN')}"
        }
      }
    end

    def get(path, options)
      response = self.class.get(path, options)
      context.response = response
      response
    end

    def put(path, options)
      response = self.class.put(path, options)
      context.response = response
      response
    end

    def post(path, options)
      response = self.class.post(path,
                                 body: options[:body].to_json,
                                 headers: options[:headers])
      context.response = response
      response
    end

    def patch(path, options)
      response = self.class.patch(path, options)
      context.response = response
      response
    end

    def response_item(by_key, as_list: false)
      return nil if context.response.nil?

      default_value = as_list ? [] : nil
      value = context.response.parsed_response.dig(by_key.to_s) || default_value
      return value if value.nil?
      return value.map(&:deep_symbolize_keys) if as_list

      value.deep_symbolize_keys
    end
  end
end
