# frozen_string_literal: true

# Typed models for the YamlYugi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Aggregation entity data model.
class Aggregation
end

# Request payload for Aggregation#load.
class AggregationLoadMatch
end

# Card entity data model.
#
# @!attribute [rw] archetype
#   @return [Array, nil]
#
# @!attribute [rw] atk
#   @return [Integer, nil]
#
# @!attribute [rw] attribute
#   @return [String, nil]
#
# @!attribute [rw] cardType
#   @return [String, nil]
#
# @!attribute [rw] def
#   @return [Integer, nil]
#
# @!attribute [rw] format
#   @return [Array, nil]
#
# @!attribute [rw] konamiId
#   @return [String, nil]
#
# @!attribute [rw] level
#   @return [Integer, nil]
#
# @!attribute [rw] linkRating
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] text
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Card = Struct.new(
  :archetype,
  :atk,
  :attribute,
  :cardType,
  :def,
  :format,
  :konamiId,
  :level,
  :linkRating,
  :name,
  :password,
  :rank,
  :text,
  :type,
  keyword_init: true
)

# Request payload for Card#list.
#
# @!attribute [rw] konami_id
#   @return [String, nil]
CardListMatch = Struct.new(
  :konami_id,
  keyword_init: true
)

# IndividualCard entity data model.
class IndividualCard
end

# Request payload for IndividualCard#load.
#
# @!attribute [rw] card_id
#   @return [String, nil]
#
# @!attribute [rw] konami_id
#   @return [String, nil]
#
# @!attribute [rw] yugipedia_id
#   @return [String, nil]
IndividualCardLoadMatch = Struct.new(
  :card_id,
  :konami_id,
  :yugipedia_id,
  keyword_init: true
)

# Series entity data model.
#
# @!attribute [rw] cards
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
Series = Struct.new(
  :cards,
  :name,
  keyword_init: true
)

# Request payload for Series#list.
#
# @!attribute [rw] cards
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
SeriesListMatch = Struct.new(
  :cards,
  :name,
  keyword_init: true
)

# SeriesAndArchetype entity data model.
#
# @!attribute [rw] cards
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
SeriesAndArchetype = Struct.new(
  :cards,
  :name,
  keyword_init: true
)

# Request payload for SeriesAndArchetype#load.
#
# @!attribute [rw] cards
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
SeriesAndArchetypeLoadMatch = Struct.new(
  :cards,
  :name,
  keyword_init: true
)

# Skill entity data model.
#
# @!attribute [rw] cardType
#   @return [String, nil]
#
# @!attribute [rw] character
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] text
#   @return [Hash, nil]
#
# @!attribute [rw] yugipediaId
#   @return [String, nil]
Skill = Struct.new(
  :cardType,
  :character,
  :name,
  :text,
  :yugipediaId,
  keyword_init: true
)

# Request payload for Skill#list.
#
# @!attribute [rw] cardType
#   @return [String, nil]
#
# @!attribute [rw] character
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] text
#   @return [Hash, nil]
#
# @!attribute [rw] yugipediaId
#   @return [String, nil]
SkillListMatch = Struct.new(
  :cardType,
  :character,
  :name,
  :text,
  :yugipediaId,
  keyword_init: true
)

# SkillCard entity data model.
#
# @!attribute [rw] cardType
#   @return [String, nil]
#
# @!attribute [rw] character
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] text
#   @return [Hash, nil]
#
# @!attribute [rw] yugipediaId
#   @return [String, nil]
SkillCard = Struct.new(
  :cardType,
  :character,
  :name,
  :text,
  :yugipediaId,
  keyword_init: true
)

# Request payload for SkillCard#load.
#
# @!attribute [rw] yugipedia_id
#   @return [String]
SkillCardLoadMatch = Struct.new(
  :yugipedia_id,
  keyword_init: true
)

