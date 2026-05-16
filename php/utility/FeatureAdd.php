<?php
declare(strict_types=1);

// YamlYugi SDK utility: feature_add

class YamlYugiFeatureAdd
{
    public static function call(YamlYugiContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
