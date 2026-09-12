package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "YamlYugi",
			"slug": "yaml-yugi",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://dawnbrandbots.github.io/yaml-yugi",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"aggregation": map[string]any{},
				"card": map[string]any{},
				"individual_card": map[string]any{},
				"series": map[string]any{},
				"series_and_archetype": map[string]any{},
				"skill": map[string]any{},
				"skill_card": map[string]any{},
			},
		},
		"entity": map[string]any{
			"aggregation": map[string]any{
				"fields": []any{},
				"name": "aggregation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/cards.yaml",
								"segments": []any{
									map[string]any{
										"lit": "cards.yaml",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cards.yaml",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/rush.yaml",
								"segments": []any{
									map[string]any{
										"lit": "rush.yaml",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"rush.yaml",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "archetype",
						"short": "Archetypes the card belongs to",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "atk",
						"short": "Attack points",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "attribute",
						"short": "Card attribute (for monsters)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cardType",
						"short": "Type of card (Monster, Spell, Trap, etc.)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "def",
						"short": "Defense points",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "format",
						"short": "Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "konamiId",
						"short": "Konami database ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "level",
						"short": "Level of the monster card",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "linkRating",
						"short": "Link rating for Link monsters",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Card name in multiple languages",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "password",
						"short": "8-digit card password/ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"short": "Rank of XYZ monster",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "text",
						"short": "Card text in multiple languages",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"short": "Monster type or spell/trap subtype",
						"type": "`$STRING`",
					},
				},
				"name": "card",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "00010000",
											"kind": "param",
											"name": "card_id",
											"orig": "card_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cards/{cardId}.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"lit": "{cardId}.json",
									},
								},
								"select": map[string]any{
									"$action": "card_id",
									"exist": []any{
										"card_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"cards",
									"{cardId}.json",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "15150",
											"kind": "param",
											"name": "konami_id",
											"orig": "konami_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data/rush/{konamiId}.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "rush",
									},
									map[string]any{
										"lit": "{konamiId}.json",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"konami_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"rush",
									"{konamiId}.json",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/cards.json",
								"segments": []any{
									map[string]any{
										"lit": "cards.json",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"cards.json",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/master-duel-raw.json",
								"segments": []any{
									map[string]any{
										"lit": "master-duel-raw.json",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"master-duel-raw.json",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/rush.json",
								"segments": []any{
									map[string]any{
										"lit": "rush.json",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"rush.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"individual_card": map[string]any{
				"fields": []any{},
				"name": "individual_card",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "00010000",
											"kind": "param",
											"name": "card_id",
											"orig": "card_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data/cards/{cardId}.yaml",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"lit": "{cardId}.yaml",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"cards",
									"{cardId}.yaml",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "15150",
											"kind": "param",
											"name": "konami_id",
											"orig": "konami_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data/rush/{konamiId}.yaml",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "rush",
									},
									map[string]any{
										"lit": "{konamiId}.yaml",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"konami_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"rush",
									"{konamiId}.yaml",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "yugipedia585581",
											"kind": "param",
											"name": "yugipedia_id",
											"orig": "yugipedia_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data/tcg-speed-skill/{yugipediaId}.yaml",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "tcg-speed-skill",
									},
									map[string]any{
										"lit": "{yugipediaId}.yaml",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"yugipedia_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"tcg-speed-skill",
									"{yugipediaId}.yaml",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"series": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cards",
						"short": "List of card IDs belonging to this series/archetype",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "Series/archetype name in multiple languages",
						"type": "`$OBJECT`",
					},
				},
				"name": "series",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/series/list.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "series",
									},
									map[string]any{
										"lit": "list.json",
									},
								},
								"select": map[string]any{
									"$action": "list",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"series",
									"list.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"series_and_archetype": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cards",
						"short": "List of card IDs belonging to this series/archetype",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "Series/archetype name in multiple languages",
						"type": "`$OBJECT`",
					},
				},
				"name": "series_and_archetype",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/series/list.yaml",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "series",
									},
									map[string]any{
										"lit": "list.yaml",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"series",
									"list.yaml",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/series/map.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "series",
									},
									map[string]any{
										"lit": "map.json",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"series",
									"map.json",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/series/map.yaml",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "series",
									},
									map[string]any{
										"lit": "map.yaml",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"series",
									"map.yaml",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"skill": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cardType",
						"short": "Type identifier for skill cards",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "character",
						"short": "Character associated with the skill",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Skill card name in multiple languages",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"short": "Skill card text in multiple languages",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "yugipediaId",
						"short": "Yugipedia page ID",
						"type": "`$STRING`",
					},
				},
				"name": "skill",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/skill.json",
								"segments": []any{
									map[string]any{
										"lit": "skill.json",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"skill.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"skill_card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cardType",
						"short": "Type identifier for skill cards",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "character",
						"short": "Character associated with the skill",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Skill card name in multiple languages",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"short": "Skill card text in multiple languages",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "yugipediaId",
						"short": "Yugipedia page ID",
						"type": "`$STRING`",
					},
				},
				"name": "skill_card",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "yugipedia585581",
											"kind": "param",
											"name": "yugipedia_id",
											"orig": "yugipedia_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data/tcg-speed-skill/{yugipediaId}.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "tcg-speed-skill",
									},
									map[string]any{
										"lit": "{yugipediaId}.json",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"yugipedia_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"tcg-speed-skill",
									"{yugipediaId}.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
