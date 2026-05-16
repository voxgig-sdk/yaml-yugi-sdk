# YamlYugi SDK utility: make_context
require_relative '../core/context'
module YamlYugiUtilities
  MakeContext = ->(ctxmap, basectx) {
    YamlYugiContext.new(ctxmap, basectx)
  }
end
