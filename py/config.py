# YamlYugi SDK configuration


def make_config():
    return {
        "main": {
            "name": "YamlYugi",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://dawnbrandbots.github.io/yaml-yugi",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "aggregation": {},
                "card": {},
                "individual_card": {},
                "series": {},
                "series_and_archetype": {},
                "skill": {},
                "skill_card": {},
            },
        },
        "entity": {
      "aggregation": {
        "fields": [],
        "name": "aggregation",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/cards.yaml",
                "parts": [
                  "cards.yaml",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
              {
                "method": "GET",
                "orig": "/rush.yaml",
                "parts": [
                  "rush.yaml",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "card": {
        "fields": [
          {
            "name": "archetype",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "atk",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "attribute",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "card_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "def",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "format",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "konami_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "level",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "link_rating",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "password",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "rank",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "text",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 13,
          },
        ],
        "name": "card",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "00010000",
                      "kind": "param",
                      "name": "card_id",
                      "orig": "card_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/data/cards/{cardId}.json",
                "parts": [
                  "data",
                  "cards",
                  "{cardId}.json",
                ],
                "select": {
                  "$action": "card_id",
                  "exist": [
                    "card_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "15150",
                      "kind": "param",
                      "name": "konami_id",
                      "orig": "konami_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/data/rush/{konamiId}.json",
                "parts": [
                  "data",
                  "rush",
                  "{konamiId}.json",
                ],
                "select": {
                  "exist": [
                    "konami_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
              {
                "method": "GET",
                "orig": "/cards.json",
                "parts": [
                  "cards.json",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 2,
              },
              {
                "method": "GET",
                "orig": "/master-duel-raw.json",
                "parts": [
                  "master-duel-raw.json",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 3,
              },
              {
                "method": "GET",
                "orig": "/rush.json",
                "parts": [
                  "rush.json",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 4,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [
            [
              "card",
            ],
            [
              "rush",
            ],
          ],
        },
      },
      "individual_card": {
        "fields": [],
        "name": "individual_card",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "00010000",
                      "kind": "param",
                      "name": "card_id",
                      "orig": "card_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/data/cards/{cardId}.yaml",
                "parts": [
                  "data",
                  "cards",
                  "{cardId}.yaml",
                ],
                "select": {
                  "exist": [
                    "card_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "15150",
                      "kind": "param",
                      "name": "konami_id",
                      "orig": "konami_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/data/rush/{konamiId}.yaml",
                "parts": [
                  "data",
                  "rush",
                  "{konamiId}.yaml",
                ],
                "select": {
                  "exist": [
                    "konami_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "yugipedia585581",
                      "kind": "param",
                      "name": "yugipedia_id",
                      "orig": "yugipedia_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/data/tcg-speed-skill/{yugipediaId}.yaml",
                "parts": [
                  "data",
                  "tcg-speed-skill",
                  "{yugipediaId}.yaml",
                ],
                "select": {
                  "exist": [
                    "yugipedia_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 2,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "card",
            ],
            [
              "rush",
            ],
            [
              "tcg_speed_skill",
            ],
          ],
        },
      },
      "series": {
        "fields": [
          {
            "name": "card",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "series",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/data/series/list.json",
                "parts": [
                  "data",
                  "series",
                  "list.json",
                ],
                "select": {
                  "$action": "list",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "series_and_archetype": {
        "fields": [
          {
            "name": "card",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "series_and_archetype",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/data/series/list.yaml",
                "parts": [
                  "data",
                  "series",
                  "list.yaml",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
              {
                "method": "GET",
                "orig": "/data/series/map.json",
                "parts": [
                  "data",
                  "series",
                  "map.json",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 1,
              },
              {
                "method": "GET",
                "orig": "/data/series/map.yaml",
                "parts": [
                  "data",
                  "series",
                  "map.yaml",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 2,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "skill": {
        "fields": [
          {
            "name": "card_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "character",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "text",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "yugipedia_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "skill",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/skill.json",
                "parts": [
                  "skill.json",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "skill_card": {
        "fields": [
          {
            "name": "card_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "character",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "text",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "yugipedia_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "skill_card",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "yugipedia585581",
                      "kind": "param",
                      "name": "yugipedia_id",
                      "orig": "yugipedia_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/data/tcg-speed-skill/{yugipediaId}.json",
                "parts": [
                  "data",
                  "tcg-speed-skill",
                  "{yugipediaId}.json",
                ],
                "select": {
                  "exist": [
                    "yugipedia_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "tcg_speed_skill",
            ],
          ],
        },
      },
    },
    }
