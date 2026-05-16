# YamlYugi SDK exists test

require "minitest/autorun"
require_relative "../YamlYugi_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = YamlYugiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
