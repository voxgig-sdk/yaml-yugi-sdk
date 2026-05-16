<?php
declare(strict_types=1);

// YamlYugi SDK utility: prepare_body

class YamlYugiPrepareBody
{
    public static function call(YamlYugiContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
