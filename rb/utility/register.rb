# YamlYugi SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

YamlYugiUtility.registrar = ->(u) {
  u.clean = YamlYugiUtilities::Clean
  u.done = YamlYugiUtilities::Done
  u.make_error = YamlYugiUtilities::MakeError
  u.feature_add = YamlYugiUtilities::FeatureAdd
  u.feature_hook = YamlYugiUtilities::FeatureHook
  u.feature_init = YamlYugiUtilities::FeatureInit
  u.fetcher = YamlYugiUtilities::Fetcher
  u.make_fetch_def = YamlYugiUtilities::MakeFetchDef
  u.make_context = YamlYugiUtilities::MakeContext
  u.make_options = YamlYugiUtilities::MakeOptions
  u.make_request = YamlYugiUtilities::MakeRequest
  u.make_response = YamlYugiUtilities::MakeResponse
  u.make_result = YamlYugiUtilities::MakeResult
  u.make_point = YamlYugiUtilities::MakePoint
  u.make_spec = YamlYugiUtilities::MakeSpec
  u.make_url = YamlYugiUtilities::MakeUrl
  u.param = YamlYugiUtilities::Param
  u.prepare_auth = YamlYugiUtilities::PrepareAuth
  u.prepare_body = YamlYugiUtilities::PrepareBody
  u.prepare_headers = YamlYugiUtilities::PrepareHeaders
  u.prepare_method = YamlYugiUtilities::PrepareMethod
  u.prepare_params = YamlYugiUtilities::PrepareParams
  u.prepare_path = YamlYugiUtilities::PreparePath
  u.prepare_query = YamlYugiUtilities::PrepareQuery
  u.result_basic = YamlYugiUtilities::ResultBasic
  u.result_body = YamlYugiUtilities::ResultBody
  u.result_headers = YamlYugiUtilities::ResultHeaders
  u.transform_request = YamlYugiUtilities::TransformRequest
  u.transform_response = YamlYugiUtilities::TransformResponse
}
