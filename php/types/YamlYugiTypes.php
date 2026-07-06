<?php
declare(strict_types=1);

// Typed models for the YamlYugi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Aggregation entity data model. */
class Aggregation
{
}

/** Request payload for Aggregation#load. */
class AggregationLoadMatch
{
}

/** Card entity data model. */
class Card
{
    public ?array $archetype = null;
    public ?int $atk = null;
    public ?string $attribute = null;
    public ?string $card_type = null;
    public ?int $def = null;
    public ?array $format = null;
    public ?string $konami_id = null;
    public ?int $level = null;
    public ?int $link_rating = null;
    public ?array $name = null;
    public ?string $password = null;
    public ?int $rank = null;
    public ?array $text = null;
    public ?string $type = null;
}

/** Request payload for Card#list. */
class CardListMatch
{
    public string $card_id;
    public string $konami_id;
}

/** IndividualCard entity data model. */
class IndividualCard
{
}

/** Request payload for IndividualCard#load. */
class IndividualCardLoadMatch
{
    public string $card_id;
    public string $konami_id;
    public string $yugipedia_id;
}

/** Series entity data model. */
class Series
{
    public ?array $card = null;
    public ?array $name = null;
}

/** Request payload for Series#list. */
class SeriesListMatch
{
    public ?array $card = null;
    public ?array $name = null;
}

/** SeriesAndArchetype entity data model. */
class SeriesAndArchetype
{
    public ?array $card = null;
    public ?array $name = null;
}

/** Request payload for SeriesAndArchetype#load. */
class SeriesAndArchetypeLoadMatch
{
    public ?array $card = null;
    public ?array $name = null;
}

/** Skill entity data model. */
class Skill
{
    public ?string $card_type = null;
    public ?string $character = null;
    public ?array $name = null;
    public ?array $text = null;
    public ?string $yugipedia_id = null;
}

/** Request payload for Skill#list. */
class SkillListMatch
{
    public ?string $card_type = null;
    public ?string $character = null;
    public ?array $name = null;
    public ?array $text = null;
    public ?string $yugipedia_id = null;
}

/** SkillCard entity data model. */
class SkillCard
{
    public ?string $card_type = null;
    public ?string $character = null;
    public ?array $name = null;
    public ?array $text = null;
    public ?string $yugipedia_id = null;
}

/** Request payload for SkillCard#load. */
class SkillCardLoadMatch
{
    public string $yugipedia_id;
}

