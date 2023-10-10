require 'minitest/autorun'
require_relative '../../lib/story-cli/domain'

describe StoryCLI::Domain do
  before do
    @domain = StoryCLI::Domain.new
  end

  describe '#record_name_from_branch' do
    describe 'with a simple branch name' do
      subject { @domain.send(:record_name, 'something') }

      it 'returns the expected record name' do
        _(subject).must_equal 'storyteller-ui-git-something-donnadieu'
      end
    end

    describe 'when branch name = some/thing' do
      subject { @domain.send(:record_name, 'some/thing') }

      it 'returns the expected record name' do
        _(subject).must_equal 'storyteller-ui-git-some-thing-donnadieu'
      end
    end

    describe 'when branch name = feat/v2-ui' do
      subject { @domain.send(:record_name, 'feat/v2-ui') }

      it 'returns the expected record name' do
        _(subject).must_equal 'storyteller-ui-git-feat-v2-ui-donnadieu'
      end
    end

    describe 'when branch name = alt/2/STORYAI-1/apple_sign_in' do
      subject { @domain.send(:record_name, 'alt/2/STORYAI-1/apple_sign_in') }

      it 'returns the expected record name' do
        _(subject).must_equal 'storyteller-ui-git-alt-2storyai-1applesignin-donnadieu'
      end
    end
  end
end
