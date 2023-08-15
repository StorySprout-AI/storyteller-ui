require 'interactor'
require 'httparty'

module Digitalocean
  class BaseObject
    include Interactor
    include HTTParty

    base_uri 'api.digitalocean.com/v2'

    def set_authorization_header!
      context.options = {
        headers: {
          Authorization: "Bearer #{ENV.fetch('DIGITALOCEAN_TOKEN')}"
        }
      }
    end
  end
end
