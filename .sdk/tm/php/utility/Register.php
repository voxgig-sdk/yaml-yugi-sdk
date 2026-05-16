<?php
declare(strict_types=1);

// YamlYugi SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

YamlYugiUtility::setRegistrar(function (YamlYugiUtility $u): void {
    $u->clean = [YamlYugiClean::class, 'call'];
    $u->done = [YamlYugiDone::class, 'call'];
    $u->make_error = [YamlYugiMakeError::class, 'call'];
    $u->feature_add = [YamlYugiFeatureAdd::class, 'call'];
    $u->feature_hook = [YamlYugiFeatureHook::class, 'call'];
    $u->feature_init = [YamlYugiFeatureInit::class, 'call'];
    $u->fetcher = [YamlYugiFetcher::class, 'call'];
    $u->make_fetch_def = [YamlYugiMakeFetchDef::class, 'call'];
    $u->make_context = [YamlYugiMakeContext::class, 'call'];
    $u->make_options = [YamlYugiMakeOptions::class, 'call'];
    $u->make_request = [YamlYugiMakeRequest::class, 'call'];
    $u->make_response = [YamlYugiMakeResponse::class, 'call'];
    $u->make_result = [YamlYugiMakeResult::class, 'call'];
    $u->make_point = [YamlYugiMakePoint::class, 'call'];
    $u->make_spec = [YamlYugiMakeSpec::class, 'call'];
    $u->make_url = [YamlYugiMakeUrl::class, 'call'];
    $u->param = [YamlYugiParam::class, 'call'];
    $u->prepare_auth = [YamlYugiPrepareAuth::class, 'call'];
    $u->prepare_body = [YamlYugiPrepareBody::class, 'call'];
    $u->prepare_headers = [YamlYugiPrepareHeaders::class, 'call'];
    $u->prepare_method = [YamlYugiPrepareMethod::class, 'call'];
    $u->prepare_params = [YamlYugiPrepareParams::class, 'call'];
    $u->prepare_path = [YamlYugiPreparePath::class, 'call'];
    $u->prepare_query = [YamlYugiPrepareQuery::class, 'call'];
    $u->result_basic = [YamlYugiResultBasic::class, 'call'];
    $u->result_body = [YamlYugiResultBody::class, 'call'];
    $u->result_headers = [YamlYugiResultHeaders::class, 'call'];
    $u->transform_request = [YamlYugiTransformRequest::class, 'call'];
    $u->transform_response = [YamlYugiTransformResponse::class, 'call'];
});
