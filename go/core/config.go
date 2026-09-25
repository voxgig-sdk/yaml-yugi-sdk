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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"yugipedia_id": map[string]any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/cards.yaml",
								"segments": []any{
									map[string]any{
										"lit": "cards.yaml",
									},
								},
								"parts": []any{
									"cards.yaml",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/rush.yaml",
								"segments": []any{
									map[string]any{
										"lit": "rush.yaml",
									},
								},
								"parts": []any{
									"rush.yaml",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Archetype",
						"type": "`$ARRAY`",
						"short": "Archetypes the card belongs to",
					},
					map[string]any{
						"name": "atk",
						"title": "Atk",
						"type": "`$INTEGER`",
						"short": "Attack points",
					},
					map[string]any{
						"name": "attribute",
						"title": "Attribute",
						"type": "`$STRING`",
						"short": "Card attribute (for monsters)",
					},
					map[string]any{
						"name": "cardType",
						"title": "Card Type",
						"type": "`$STRING`",
						"short": "Type of card (Monster, Spell, Trap, etc.)",
					},
					map[string]any{
						"name": "def",
						"title": "Def",
						"type": "`$INTEGER`",
						"short": "Defense points",
					},
					map[string]any{
						"name": "format",
						"title": "Format",
						"type": "`$ARRAY`",
						"short": "Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)",
					},
					map[string]any{
						"name": "konamiId",
						"title": "Konami Id",
						"type": "`$STRING`",
						"short": "Konami database ID",
					},
					map[string]any{
						"name": "level",
						"title": "Level",
						"type": "`$INTEGER`",
						"short": "Level of the monster card",
					},
					map[string]any{
						"name": "linkRating",
						"title": "Link Rating",
						"type": "`$INTEGER`",
						"short": "Link rating for Link monsters",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"short": "Card name in multiple languages",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"short": "8-digit card password/ID",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$INTEGER`",
						"short": "Rank of XYZ monster",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$OBJECT`",
						"short": "Card text in multiple languages",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Monster type or spell/trap subtype",
					},
				},
				"name": "card",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"cards",
									"{cardId}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "card_id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "00010000",
										},
									},
								},
								"select": map[string]any{
									"$action": "card_id",
									"exist": []any{
										"card_id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"data",
									"rush",
									"{konamiId}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "konami_id",
											"orig": "konami_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "15150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"konami_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards.json",
								"segments": []any{
									map[string]any{
										"lit": "cards.json",
									},
								},
								"parts": []any{
									"cards.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/master-duel-raw.json",
								"segments": []any{
									map[string]any{
										"lit": "master-duel-raw.json",
									},
								},
								"parts": []any{
									"master-duel-raw.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/rush.json",
								"segments": []any{
									map[string]any{
										"lit": "rush.json",
									},
								},
								"parts": []any{
									"rush.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"parts": []any{
									"data",
									"cards",
									"{cardId}.yaml",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "card_id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "00010000",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card_id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"data",
									"rush",
									"{konamiId}.yaml",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "konami_id",
											"orig": "konami_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "15150",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"konami_id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"data",
									"tcg-speed-skill",
									"{yugipediaId}.yaml",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "yugipedia_id",
											"orig": "yugipedia_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "yugipedia585581",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"yugipedia_id",
									},
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
						"title": "Cards",
						"type": "`$ARRAY`",
						"short": "List of card IDs belonging to this series/archetype",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"short": "Series/archetype name in multiple languages",
					},
				},
				"name": "series",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"series",
									"list.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "list",
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
						"title": "Cards",
						"type": "`$ARRAY`",
						"short": "List of card IDs belonging to this series/archetype",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"short": "Series/archetype name in multiple languages",
					},
				},
				"name": "series_and_archetype",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"series",
									"list.yaml",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"data",
									"series",
									"map.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"data",
									"series",
									"map.yaml",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Card Type",
						"type": "`$STRING`",
						"short": "Type identifier for skill cards",
					},
					map[string]any{
						"name": "character",
						"title": "Character",
						"type": "`$STRING`",
						"short": "Character associated with the skill",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"short": "Skill card name in multiple languages",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$OBJECT`",
						"short": "Skill card text in multiple languages",
					},
					map[string]any{
						"name": "yugipediaId",
						"title": "Yugipedia Id",
						"type": "`$STRING`",
						"short": "Yugipedia page ID",
					},
				},
				"name": "skill",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/skill.json",
								"segments": []any{
									map[string]any{
										"lit": "skill.json",
									},
								},
								"parts": []any{
									"skill.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"yugipedia_id": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cardType",
						"title": "Card Type",
						"type": "`$STRING`",
						"short": "Type identifier for skill cards",
					},
					map[string]any{
						"name": "character",
						"title": "Character",
						"type": "`$STRING`",
						"short": "Character associated with the skill",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
						"short": "Skill card name in multiple languages",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$OBJECT`",
						"short": "Skill card text in multiple languages",
					},
					map[string]any{
						"name": "yugipediaId",
						"title": "Yugipedia Id",
						"type": "`$STRING`",
						"short": "Yugipedia page ID",
					},
				},
				"name": "yugipedia_id",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"tcg-speed-skill",
									"{yugipediaId}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "yugipedia_id",
											"orig": "yugipedia_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "yugipedia585581",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"yugipedia_id",
									},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
