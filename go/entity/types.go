// Typed models for the YamlYugi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Aggregation is the typed data model for the aggregation entity.
type Aggregation struct {
}

// AggregationLoadMatch is the typed request payload for Aggregation.LoadTyped.
type AggregationLoadMatch struct {
}

// Card is the typed data model for the card entity.
type Card struct {
	Archetype *[]any `json:"archetype,omitempty"`
	Atk *int `json:"atk,omitempty"`
	Attribute *string `json:"attribute,omitempty"`
	CardType *string `json:"card_type,omitempty"`
	Def *int `json:"def,omitempty"`
	Format *[]any `json:"format,omitempty"`
	KonamiId *string `json:"konami_id,omitempty"`
	Level *int `json:"level,omitempty"`
	LinkRating *int `json:"link_rating,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	Password *string `json:"password,omitempty"`
	Rank *int `json:"rank,omitempty"`
	Text *map[string]any `json:"text,omitempty"`
	Type *string `json:"type,omitempty"`
}

// CardListMatch is the typed request payload for Card.ListTyped.
type CardListMatch struct {
	KonamiId *string `json:"konami_id,omitempty"`
}

// IndividualCard is the typed data model for the individual_card entity.
type IndividualCard struct {
}

// IndividualCardLoadMatch is the typed request payload for IndividualCard.LoadTyped.
type IndividualCardLoadMatch struct {
	CardId *string `json:"card_id,omitempty"`
	KonamiId *string `json:"konami_id,omitempty"`
	YugipediaId *string `json:"yugipedia_id,omitempty"`
}

// Series is the typed data model for the series entity.
type Series struct {
	Card *[]any `json:"card,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
}

// SeriesListMatch is the typed request payload for Series.ListTyped.
type SeriesListMatch struct {
	Card *[]any `json:"card,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
}

// SeriesAndArchetype is the typed data model for the series_and_archetype entity.
type SeriesAndArchetype struct {
	Card *[]any `json:"card,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
}

// SeriesAndArchetypeLoadMatch is the typed request payload for SeriesAndArchetype.LoadTyped.
type SeriesAndArchetypeLoadMatch struct {
	Card *[]any `json:"card,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
}

// Skill is the typed data model for the skill entity.
type Skill struct {
	CardType *string `json:"card_type,omitempty"`
	Character *string `json:"character,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	Text *map[string]any `json:"text,omitempty"`
	YugipediaId *string `json:"yugipedia_id,omitempty"`
}

// SkillListMatch is the typed request payload for Skill.ListTyped.
type SkillListMatch struct {
	CardType *string `json:"card_type,omitempty"`
	Character *string `json:"character,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	Text *map[string]any `json:"text,omitempty"`
	YugipediaId *string `json:"yugipedia_id,omitempty"`
}

// SkillCard is the typed data model for the skill_card entity.
type SkillCard struct {
	CardType *string `json:"card_type,omitempty"`
	Character *string `json:"character,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	Text *map[string]any `json:"text,omitempty"`
	YugipediaId *string `json:"yugipedia_id,omitempty"`
}

// SkillCardLoadMatch is the typed request payload for SkillCard.LoadTyped.
type SkillCardLoadMatch struct {
	YugipediaId string `json:"yugipedia_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
