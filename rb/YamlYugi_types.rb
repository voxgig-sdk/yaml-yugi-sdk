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
# @!attribute [rw] card_type
#   @return [String, nil]
#
# @!attribute [rw] def
#   @return [Integer, nil]
#
# @!attribute [rw] format
#   @return [Array, nil]
#
# @!attribute [rw] konami_id
#   @return [String, nil]
#
# @!attribute [rw] level
#   @return [Integer, nil]
#
# @!attribute [rw] link_rating
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
  :card_type,
  :def,
  :format,
  :konami_id,
  :level,
  :link_rating,
  :name,
  :password,
  :rank,
  :text,
  :type,
  keyword_init: true
)

# Request payload for Card#list.
#
# @!attribute [rw] card_id
#   @return [String]
#
# @!attribute [rw] konami_id
#   @return [String]
CardListMatch = Struct.new(
  :card_id,
  :konami_id,
  keyword_init: true
)

# IndividualCard entity data model.
class IndividualCard
end

# Request payload for IndividualCard#load.
#
# @!attribute [rw] card_id
#   @return [String]
#
# @!attribute [rw] konami_id
#   @return [String]
#
# @!attribute [rw] yugipedia_id
#   @return [String]
IndividualCardLoadMatch = Struct.new(
  :card_id,
  :konami_id,
  :yugipedia_id,
  keyword_init: true
)

# Series entity data model.
#
# @!attribute [rw] card
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
Series = Struct.new(
  :card,
  :name,
  keyword_init: true
)

# Request payload for Series#list.
#
# @!attribute [rw] card
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
SeriesListMatch = Struct.new(
  :card,
  :name,
  keyword_init: true
)

# SeriesAndArchetype entity data model.
#
# @!attribute [rw] card
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
SeriesAndArchetype = Struct.new(
  :card,
  :name,
  keyword_init: true
)

# Request payload for SeriesAndArchetype#load.
#
# @!attribute [rw] card
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
SeriesAndArchetypeLoadMatch = Struct.new(
  :card,
  :name,
  keyword_init: true
)

# Skill entity data model.
#
# @!attribute [rw] card_type
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
# @!attribute [rw] yugipedia_id
#   @return [String, nil]
Skill = Struct.new(
  :card_type,
  :character,
  :name,
  :text,
  :yugipedia_id,
  keyword_init: true
)

# Request payload for Skill#list.
#
# @!attribute [rw] card_type
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
# @!attribute [rw] yugipedia_id
#   @return [String, nil]
SkillListMatch = Struct.new(
  :card_type,
  :character,
  :name,
  :text,
  :yugipedia_id,
  keyword_init: true
)

# SkillCard entity data model.
#
# @!attribute [rw] card_type
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
# @!attribute [rw] yugipedia_id
#   @return [String, nil]
SkillCard = Struct.new(
  :card_type,
  :character,
  :name,
  :text,
  :yugipedia_id,
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

