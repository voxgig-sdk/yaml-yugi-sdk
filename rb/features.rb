# YamlYugi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module YamlYugiFeatures
  def self.make_feature(name)
    case name
    when "base"
      YamlYugiBaseFeature.new
    when "test"
      YamlYugiTestFeature.new
    else
      YamlYugiBaseFeature.new
    end
  end
end
