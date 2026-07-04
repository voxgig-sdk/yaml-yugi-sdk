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
---@field card_type? string
---@field def? number
---@field format? table
---@field konami_id? string
---@field level? number
---@field link_rating? number
---@field name? table
---@field password? string
---@field rank? number
---@field text? table
---@field type? string

---@class CardListMatch
---@field card_id string
---@field konami_id string

---@class IndividualCard

---@class IndividualCardLoadMatch
---@field card_id string
---@field konami_id string
---@field yugipedia_id string

---@class Series
---@field card? table
---@field name? table

---@class SeriesListMatch

---@class SeriesAndArchetype
---@field card? table
---@field name? table

---@class SeriesAndArchetypeLoadMatch

---@class Skill
---@field card_type? string
---@field character? string
---@field name? table
---@field text? table
---@field yugipedia_id? string

---@class SkillListMatch

---@class SkillCard
---@field card_type? string
---@field character? string
---@field name? table
---@field text? table
---@field yugipedia_id? string

---@class SkillCardLoadMatch
---@field yugipedia_id string

local M = {}

return M
