# YamlYugi SDK configuration

module YamlYugiConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "YamlYugi",
        "slug" => "yaml-yugi",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://dawnbrandbots.github.io/yaml-yugi",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "aggregation" => {},
          "card" => {},
          "individual_card" => {},
          "series" => {},
          "series_and_archetype" => {},
          "skill" => {},
          "skill_card" => {},
        },
      },
      "entity" => {
        "aggregation" => {
          "fields" => [],
          "name" => "aggregation",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards.yaml",
                  "segments" => [
                    {
                      "lit" => "cards.yaml",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "cards.yaml",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/rush.yaml",
                  "segments" => [
                    {
                      "lit" => "rush.yaml",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "rush.yaml",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "card" => {
          "fields" => [
            {
              "name" => "archetype",
              "short" => "Archetypes the card belongs to",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "atk",
              "short" => "Attack points",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "attribute",
              "short" => "Card attribute (for monsters)",
              "type" => "`$STRING`",
            },
            {
              "name" => "cardType",
              "short" => "Type of card (Monster, Spell, Trap, etc.)",
              "type" => "`$STRING`",
            },
            {
              "name" => "def",
              "short" => "Defense points",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "format",
              "short" => "Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "konamiId",
              "short" => "Konami database ID",
              "type" => "`$STRING`",
            },
            {
              "name" => "level",
              "short" => "Level of the monster card",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "linkRating",
              "short" => "Link rating for Link monsters",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Card name in multiple languages",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "password",
              "short" => "8-digit card password/ID",
              "type" => "`$STRING`",
            },
            {
              "name" => "rank",
              "short" => "Rank of XYZ monster",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "text",
              "short" => "Card text in multiple languages",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "short" => "Monster type or spell/trap subtype",
              "type" => "`$STRING`",
            },
          ],
          "name" => "card",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "00010000",
                        "kind" => "param",
                        "name" => "card_id",
                        "orig" => "card_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cards/{cardId}.json",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "cards",
                    },
                    {
                      "lit" => "{cardId}.json",
                    },
                  ],
                  "select" => {
                    "$action" => "card_id",
                    "exist" => [
                      "card_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "cards",
                    "{cardId}.json",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "15150",
                        "kind" => "param",
                        "name" => "konami_id",
                        "orig" => "konami_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/rush/{konamiId}.json",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "rush",
                    },
                    {
                      "lit" => "{konamiId}.json",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "konami_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "rush",
                    "{konamiId}.json",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards.json",
                  "segments" => [
                    {
                      "lit" => "cards.json",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "cards.json",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/master-duel-raw.json",
                  "segments" => [
                    {
                      "lit" => "master-duel-raw.json",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "master-duel-raw.json",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/rush.json",
                  "segments" => [
                    {
                      "lit" => "rush.json",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "rush.json",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "individual_card" => {
          "fields" => [],
          "name" => "individual_card",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "00010000",
                        "kind" => "param",
                        "name" => "card_id",
                        "orig" => "card_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/cards/{cardId}.yaml",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "cards",
                    },
                    {
                      "lit" => "{cardId}.yaml",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "card_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "cards",
                    "{cardId}.yaml",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "15150",
                        "kind" => "param",
                        "name" => "konami_id",
                        "orig" => "konami_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/rush/{konamiId}.yaml",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "rush",
                    },
                    {
                      "lit" => "{konamiId}.yaml",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "konami_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "rush",
                    "{konamiId}.yaml",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "yugipedia585581",
                        "kind" => "param",
                        "name" => "yugipedia_id",
                        "orig" => "yugipedia_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/tcg-speed-skill/{yugipediaId}.yaml",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "tcg-speed-skill",
                    },
                    {
                      "lit" => "{yugipediaId}.yaml",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "yugipedia_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "tcg-speed-skill",
                    "{yugipediaId}.yaml",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "series" => {
          "fields" => [
            {
              "name" => "cards",
              "short" => "List of card IDs belonging to this series/archetype",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name",
              "short" => "Series/archetype name in multiple languages",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "series",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/series/list.json",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "series",
                    },
                    {
                      "lit" => "list.json",
                    },
                  ],
                  "select" => {
                    "$action" => "list",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "series",
                    "list.json",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "series_and_archetype" => {
          "fields" => [
            {
              "name" => "cards",
              "short" => "List of card IDs belonging to this series/archetype",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name",
              "short" => "Series/archetype name in multiple languages",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "series_and_archetype",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/series/list.yaml",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "series",
                    },
                    {
                      "lit" => "list.yaml",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "series",
                    "list.yaml",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/series/map.json",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "series",
                    },
                    {
                      "lit" => "map.json",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "series",
                    "map.json",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/series/map.yaml",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "series",
                    },
                    {
                      "lit" => "map.yaml",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "series",
                    "map.yaml",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "skill" => {
          "fields" => [
            {
              "name" => "cardType",
              "short" => "Type identifier for skill cards",
              "type" => "`$STRING`",
            },
            {
              "name" => "character",
              "short" => "Character associated with the skill",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Skill card name in multiple languages",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "text",
              "short" => "Skill card text in multiple languages",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "yugipediaId",
              "short" => "Yugipedia page ID",
              "type" => "`$STRING`",
            },
          ],
          "name" => "skill",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/skill.json",
                  "segments" => [
                    {
                      "lit" => "skill.json",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "skill.json",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "skill_card" => {
          "fields" => [
            {
              "name" => "cardType",
              "short" => "Type identifier for skill cards",
              "type" => "`$STRING`",
            },
            {
              "name" => "character",
              "short" => "Character associated with the skill",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Skill card name in multiple languages",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "text",
              "short" => "Skill card text in multiple languages",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "yugipediaId",
              "short" => "Yugipedia page ID",
              "type" => "`$STRING`",
            },
          ],
          "name" => "skill_card",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "yugipedia585581",
                        "kind" => "param",
                        "name" => "yugipedia_id",
                        "orig" => "yugipedia_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data/tcg-speed-skill/{yugipediaId}.json",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                    {
                      "lit" => "tcg-speed-skill",
                    },
                    {
                      "lit" => "{yugipediaId}.json",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "yugipedia_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "data",
                    "tcg-speed-skill",
                    "{yugipediaId}.json",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    YamlYugiFeatures.make_feature(name)
  end
end
