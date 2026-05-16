<?php
declare(strict_types=1);

// YamlYugi SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class YamlYugiMakeContext
{
    public static function call(array $ctxmap, ?YamlYugiContext $basectx): YamlYugiContext
    {
        return new YamlYugiContext($ctxmap, $basectx);
    }
}
