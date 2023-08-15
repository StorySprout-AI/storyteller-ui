require_relative './base_object'

module Digitalocean
  class PatchRecord < BaseObject
    before do
      set_authorization_header!
    end

    # TODO: Consider using this instead https://github.com/digitalocean/droplet_kit
    def call
      # Do stuff
    end
  end
end
