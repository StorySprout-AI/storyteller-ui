require_relative './get_records'
require_relative './patch_record'
require_relative './put_record'

module Digitalocean
  class UpsertRecord
    include Interactor::Organizer

    organize GetRecords,
             PatchRecord,
             PutRecord
  end
end
