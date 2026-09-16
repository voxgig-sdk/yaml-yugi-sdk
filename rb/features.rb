# YamlYugi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module YamlYugiFeatures
  def self.make_feature(name)
    case name
    when "base"
      YamlYugiBaseFeature.new
    when "ratelimit"
      YamlYugiRatelimitFeature.new
    when "retry"
      YamlYugiRetryFeature.new
    when "test"
      YamlYugiTestFeature.new
    when "timeout"
      YamlYugiTimeoutFeature.new
    else
      YamlYugiBaseFeature.new
    end
  end
end
