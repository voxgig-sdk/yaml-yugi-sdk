-- YamlYugi SDK error

local YamlYugiError = {}
YamlYugiError.__index = YamlYugiError


function YamlYugiError.new(code, msg, ctx)
  local self = setmetatable({}, YamlYugiError)
  self.is_sdk_error = true
  self.sdk = "YamlYugi"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function YamlYugiError:error()
  return self.msg
end


function YamlYugiError:__tostring()
  return self.msg
end


return YamlYugiError
