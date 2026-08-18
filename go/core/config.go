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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
								"parts": []any{
									"cards.yaml",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/rush.yaml",
								"parts": []any{
									"rush.yaml",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "atk",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "attribute",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cardType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "def",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "format",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "konamiId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "level",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "linkRating",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "password",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "text",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
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
								"parts": []any{
									"data",
									"cards",
									"{cardId}.json",
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
								"parts": []any{
									"data",
									"rush",
									"{konamiId}.json",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/cards.json",
								"parts": []any{
									"cards.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/master-duel-raw.json",
								"parts": []any{
									"master-duel-raw.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/rush.json",
								"parts": []any{
									"rush.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"card",
						},
						[]any{
							"rush",
						},
					},
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
								"parts": []any{
									"data",
									"cards",
									"{cardId}.yaml",
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
								"parts": []any{
									"data",
									"rush",
									"{konamiId}.yaml",
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
								"parts": []any{
									"data",
									"tcg-speed-skill",
									"{yugipediaId}.yaml",
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"card",
						},
						[]any{
							"rush",
						},
						[]any{
							"tcg_speed_skill",
						},
					},
				},
			},
			"series": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cards",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
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
								"parts": []any{
									"data",
									"series",
									"list.json",
								},
								"select": map[string]any{
									"$action": "list",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
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
								"parts": []any{
									"data",
									"series",
									"list.yaml",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/series/map.json",
								"parts": []any{
									"data",
									"series",
									"map.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/series/map.yaml",
								"parts": []any{
									"data",
									"series",
									"map.yaml",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "character",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "yugipediaId",
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
								"parts": []any{
									"skill.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "character",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "yugipediaId",
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
								"parts": []any{
									"data",
									"tcg-speed-skill",
									"{yugipediaId}.json",
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"tcg_speed_skill",
						},
					},
				},
			},
		},
	}
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
