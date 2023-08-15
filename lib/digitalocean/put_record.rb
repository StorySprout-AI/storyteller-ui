require_relative './base_object'

module Digitalocean
  class PutRecord < BaseObject
    before do
      set_authorization_header!
    end

    def call
      # Do stuff
    end
  end
end
