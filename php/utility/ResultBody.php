<?php
declare(strict_types=1);

// YamlYugi SDK utility: result_body

class YamlYugiResultBody
{
    public static function call(YamlYugiContext $ctx): ?YamlYugiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
