require 'minitest/autorun'
require_relative '../../lib/story-sprout/domain'

class TestDomain < Minitest::Test
  def setup
    @domain = StorySprout::Domain.new
  end

  def teardown
    # ...
  end

  def test_record
    # assert true
  end

  def test_records
    out, _err = capture_io {
      @domain.invoke(:records, %w[--domain-name storysprout.app])
    }
    assert_equal out, "stuff"
  end

  def test_repo_path
    assert_equal @domain.send(:repo_path), 'git@github.com:Donnadieu/storyteller-ui.git'
  end

  def test_current_branch
    assert_equal @domain.send(:current_branch), `git branch --show-current`.strip
  end
end
