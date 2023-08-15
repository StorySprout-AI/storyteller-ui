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

  def test_repo_path
    assert_equal @domain.send(:repo_path), 'donnadieu'
  end

  def test_current_branch
    assert_equal @domain.send(:current_branch), `git branch --show-current`.strip
  end
end
