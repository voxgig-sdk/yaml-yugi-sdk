<?php
declare(strict_types=1);

// YamlYugi SDK configuration

class YamlYugiConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "YamlYugi",
                "slug" => "yaml-yugi",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://dawnbrandbots.github.io/yaml-yugi",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "aggregation" => [],
                    "card" => [],
                    "individual_card" => [],
                    "series" => [],
                    "series_and_archetype" => [],
                    "skill" => [],
                    "yugipedia_id" => [],
                ],
            ],
            "entity" => [
        'aggregation' => [
          'fields' => [],
          'name' => 'aggregation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards.yaml',
                  'segments' => [
                    [
                      'lit' => 'cards.yaml',
                    ],
                  ],
                  'parts' => [
                    'cards.yaml',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/rush.yaml',
                  'segments' => [
                    [
                      'lit' => 'rush.yaml',
                    ],
                  ],
                  'parts' => [
                    'rush.yaml',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'card' => [
          'fields' => [
            [
              'name' => 'archetype',
              'title' => 'Archetype',
              'type' => '`$ARRAY`',
              'short' => 'Archetypes the card belongs to',
            ],
            [
              'name' => 'atk',
              'title' => 'Atk',
              'type' => '`$INTEGER`',
              'short' => 'Attack points',
            ],
            [
              'name' => 'attribute',
              'title' => 'Attribute',
              'type' => '`$STRING`',
              'short' => 'Card attribute (for monsters)',
            ],
            [
              'name' => 'cardType',
              'title' => 'Card Type',
              'type' => '`$STRING`',
              'short' => 'Type of card (Monster, Spell, Trap, etc.)',
            ],
            [
              'name' => 'def',
              'title' => 'Def',
              'type' => '`$INTEGER`',
              'short' => 'Defense points',
            ],
            [
              'name' => 'format',
              'title' => 'Format',
              'type' => '`$ARRAY`',
              'short' => 'Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)',
            ],
            [
              'name' => 'konamiId',
              'title' => 'Konami Id',
              'type' => '`$STRING`',
              'short' => 'Konami database ID',
            ],
            [
              'name' => 'level',
              'title' => 'Level',
              'type' => '`$INTEGER`',
              'short' => 'Level of the monster card',
            ],
            [
              'name' => 'linkRating',
              'title' => 'Link Rating',
              'type' => '`$INTEGER`',
              'short' => 'Link rating for Link monsters',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'short' => 'Card name in multiple languages',
            ],
            [
              'name' => 'password',
              'title' => 'Password',
              'type' => '`$STRING`',
              'short' => '8-digit card password/ID',
            ],
            [
              'name' => 'rank',
              'title' => 'Rank',
              'type' => '`$INTEGER`',
              'short' => 'Rank of XYZ monster',
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$OBJECT`',
              'short' => 'Card text in multiple languages',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
              'short' => 'Monster type or spell/trap subtype',
            ],
          ],
          'name' => 'card',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/cards/{cardId}.json',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'cards',
                    ],
                    [
                      'lit' => '{cardId}.json',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'cards',
                    '{cardId}.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'card_id',
                        'orig' => 'card_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '00010000',
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'card_id',
                    'exist' => [
                      'card_id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/rush/{konamiId}.json',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'rush',
                    ],
                    [
                      'lit' => '{konamiId}.json',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'rush',
                    '{konamiId}.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'konami_id',
                        'orig' => 'konami_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '15150',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'konami_id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards.json',
                  'segments' => [
                    [
                      'lit' => 'cards.json',
                    ],
                  ],
                  'parts' => [
                    'cards.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/master-duel-raw.json',
                  'segments' => [
                    [
                      'lit' => 'master-duel-raw.json',
                    ],
                  ],
                  'parts' => [
                    'master-duel-raw.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/rush.json',
                  'segments' => [
                    [
                      'lit' => 'rush.json',
                    ],
                  ],
                  'parts' => [
                    'rush.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'individual_card' => [
          'fields' => [],
          'name' => 'individual_card',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/cards/{cardId}.yaml',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'cards',
                    ],
                    [
                      'lit' => '{cardId}.yaml',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'cards',
                    '{cardId}.yaml',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'card_id',
                        'orig' => 'card_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '00010000',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'card_id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/rush/{konamiId}.yaml',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'rush',
                    ],
                    [
                      'lit' => '{konamiId}.yaml',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'rush',
                    '{konamiId}.yaml',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'konami_id',
                        'orig' => 'konami_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '15150',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'konami_id',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/tcg-speed-skill/{yugipediaId}.yaml',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'tcg-speed-skill',
                    ],
                    [
                      'lit' => '{yugipediaId}.yaml',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'tcg-speed-skill',
                    '{yugipediaId}.yaml',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'yugipedia_id',
                        'orig' => 'yugipedia_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'yugipedia585581',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'yugipedia_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'series' => [
          'fields' => [
            [
              'name' => 'cards',
              'title' => 'Cards',
              'type' => '`$ARRAY`',
              'short' => 'List of card IDs belonging to this series/archetype',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'short' => 'Series/archetype name in multiple languages',
            ],
          ],
          'name' => 'series',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/series/list.json',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'series',
                    ],
                    [
                      'lit' => 'list.json',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'series',
                    'list.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [
                    '$action' => 'list',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'series_and_archetype' => [
          'fields' => [
            [
              'name' => 'cards',
              'title' => 'Cards',
              'type' => '`$ARRAY`',
              'short' => 'List of card IDs belonging to this series/archetype',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'short' => 'Series/archetype name in multiple languages',
            ],
          ],
          'name' => 'series_and_archetype',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/series/list.yaml',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'series',
                    ],
                    [
                      'lit' => 'list.yaml',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'series',
                    'list.yaml',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/series/map.json',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'series',
                    ],
                    [
                      'lit' => 'map.json',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'series',
                    'map.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/series/map.yaml',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'series',
                    ],
                    [
                      'lit' => 'map.yaml',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'series',
                    'map.yaml',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'skill' => [
          'fields' => [
            [
              'name' => 'cardType',
              'title' => 'Card Type',
              'type' => '`$STRING`',
              'short' => 'Type identifier for skill cards',
            ],
            [
              'name' => 'character',
              'title' => 'Character',
              'type' => '`$STRING`',
              'short' => 'Character associated with the skill',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'short' => 'Skill card name in multiple languages',
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$OBJECT`',
              'short' => 'Skill card text in multiple languages',
            ],
            [
              'name' => 'yugipediaId',
              'title' => 'Yugipedia Id',
              'type' => '`$STRING`',
              'short' => 'Yugipedia page ID',
            ],
          ],
          'name' => 'skill',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/skill.json',
                  'segments' => [
                    [
                      'lit' => 'skill.json',
                    ],
                  ],
                  'parts' => [
                    'skill.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'yugipedia_id' => [
          'fields' => [
            [
              'name' => 'cardType',
              'title' => 'Card Type',
              'type' => '`$STRING`',
              'short' => 'Type identifier for skill cards',
            ],
            [
              'name' => 'character',
              'title' => 'Character',
              'type' => '`$STRING`',
              'short' => 'Character associated with the skill',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$OBJECT`',
              'short' => 'Skill card name in multiple languages',
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$OBJECT`',
              'short' => 'Skill card text in multiple languages',
            ],
            [
              'name' => 'yugipediaId',
              'title' => 'Yugipedia Id',
              'type' => '`$STRING`',
              'short' => 'Yugipedia page ID',
            ],
          ],
          'name' => 'yugipedia_id',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/tcg-speed-skill/{yugipediaId}.json',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                    [
                      'lit' => 'tcg-speed-skill',
                    ],
                    [
                      'lit' => '{yugipediaId}.json',
                    ],
                  ],
                  'parts' => [
                    'data',
                    'tcg-speed-skill',
                    '{yugipediaId}.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'yugipedia_id',
                        'orig' => 'yugipedia_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'yugipedia585581',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'yugipedia_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return YamlYugiFeatures::make_feature($name);
    }
}
