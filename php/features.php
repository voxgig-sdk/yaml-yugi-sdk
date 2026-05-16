<?php
declare(strict_types=1);

// YamlYugi SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class YamlYugiFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new YamlYugiBaseFeature();
            case "test":
                return new YamlYugiTestFeature();
            default:
                return new YamlYugiBaseFeature();
        }
    }
}
