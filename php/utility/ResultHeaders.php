<?php
declare(strict_types=1);

// YamlYugi SDK utility: result_headers

class YamlYugiResultHeaders
{
    public static function call(YamlYugiContext $ctx): ?YamlYugiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
