// Typed models for the YamlYugi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Aggregation {
}

export interface AggregationLoadMatch {
}

export interface Card {
  archetype?: any[]
  atk?: number
  attribute?: string
  card_type?: string
  def?: number
  format?: any[]
  konami_id?: string
  level?: number
  link_rating?: number
  name?: Record<string, any>
  password?: string
  rank?: number
  text?: Record<string, any>
  type?: string
}

export interface CardListMatch {
  konami_id?: string
}

export interface IndividualCard {
}

export interface IndividualCardLoadMatch {
  card_id?: string
  konami_id?: string
  yugipedia_id?: string
}

export interface Series {
  card?: any[]
  name?: Record<string, any>
}

export interface SeriesListMatch {
  card?: any[]
  name?: Record<string, any>
}

export interface SeriesAndArchetype {
  card?: any[]
  name?: Record<string, any>
}

export interface SeriesAndArchetypeLoadMatch {
  card?: any[]
  name?: Record<string, any>
}

export interface Skill {
  card_type?: string
  character?: string
  name?: Record<string, any>
  text?: Record<string, any>
  yugipedia_id?: string
}

export interface SkillListMatch {
  card_type?: string
  character?: string
  name?: Record<string, any>
  text?: Record<string, any>
  yugipedia_id?: string
}

export interface SkillCard {
  card_type?: string
  character?: string
  name?: Record<string, any>
  text?: Record<string, any>
  yugipedia_id?: string
}

export interface SkillCardLoadMatch {
  yugipedia_id: string
}

