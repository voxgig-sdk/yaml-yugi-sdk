-- Typed models for the YamlYugi SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Aggregation

---@class AggregationLoadMatch

---@class Card
---@field archetype? table
---@field atk? number
---@field attribute? string
---@field cardType? string
---@field def? number
---@field format? table
---@field konamiId? string
---@field level? number
---@field linkRating? number
---@field name? table
---@field password? string
---@field rank? number
---@field text? table
---@field type? string

---@class CardListMatch
---@field konami_id? string

---@class IndividualCard

---@class IndividualCardLoadMatch
---@field card_id? string
---@field konami_id? string
---@field yugipedia_id? string

---@class Series
---@field cards? table
---@field name? table

---@class SeriesListMatch
---@field cards? table
---@field name? table

---@class SeriesAndArchetype
---@field cards? table
---@field name? table

---@class SeriesAndArchetypeLoadMatch
---@field cards? table
---@field name? table

---@class Skill
---@field cardType? string
---@field character? string
---@field name? table
---@field text? table
---@field yugipediaId? string

---@class SkillListMatch
---@field cardType? string
---@field character? string
---@field name? table
---@field text? table
---@field yugipediaId? string

---@class SkillCard
---@field cardType? string
---@field character? string
---@field name? table
---@field text? table
---@field yugipediaId? string

---@class SkillCardLoadMatch
---@field yugipedia_id string

local M = {}

return M
