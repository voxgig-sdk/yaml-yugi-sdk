package = "voxgig-sdk-yaml-yugi"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/yaml-yugi-sdk.git"
}
description = {
  summary = "YamlYugi SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["yaml-yugi_sdk"] = "yaml-yugi_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
