<?php
declare(strict_types=1);

// YamlYugi SDK base feature

class YamlYugiBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(YamlYugiContext $ctx, array $options): void {}
    public function PostConstruct(YamlYugiContext $ctx): void {}
    public function PostConstructEntity(YamlYugiContext $ctx): void {}
    public function SetData(YamlYugiContext $ctx): void {}
    public function GetData(YamlYugiContext $ctx): void {}
    public function GetMatch(YamlYugiContext $ctx): void {}
    public function SetMatch(YamlYugiContext $ctx): void {}
    public function PrePoint(YamlYugiContext $ctx): void {}
    public function PreSpec(YamlYugiContext $ctx): void {}
    public function PreRequest(YamlYugiContext $ctx): void {}
    public function PreResponse(YamlYugiContext $ctx): void {}
    public function PreResult(YamlYugiContext $ctx): void {}
    public function PreDone(YamlYugiContext $ctx): void {}
    public function PreUnexpected(YamlYugiContext $ctx): void {}
}
