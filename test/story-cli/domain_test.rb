require 'minitest/autorun'
require_relative '../../lib/story-cli/domain'

class TestDomain < Minitest::Test
  def setup
    @domain = StoryCLI::Domain.new
  end

  def teardown
    # ...
  end

  def test_record
    # assert true
  end

  def test_upsert_record
    out, _err = capture_io {
      @domain.invoke(
        :upsert_record, [],
        type: 'CNAME',
        name: 'staging-test',
        data: 'storysprout-staging-test.ngrok.app',
        verbose: true
      )
    }
    assert_match /(Creat|Updat|Upsert)ed record for staging-test.storysprout.app/, out
  end

  def test_repo_path
    assert_equal @domain.send(:repo_path), 'git@github.com:Donnadieu/storyteller-ui.git'
  end

  def test_current_branch
    assert_equal @domain.send(:current_branch), `git branch --show-current`.strip
  end
end
