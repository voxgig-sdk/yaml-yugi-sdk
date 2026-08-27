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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
                    "skill_card" => [],
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards.yaml',
                  'parts' => [
                    'cards.yaml',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/rush.yaml',
                  'parts' => [
                    'rush.yaml',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'short' => 'Archetypes the card belongs to',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'atk',
              'short' => 'Attack points',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'attribute',
              'short' => 'Card attribute (for monsters)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cardType',
              'short' => 'Type of card (Monster, Spell, Trap, etc.)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'def',
              'short' => 'Defense points',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'format',
              'short' => 'Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'konamiId',
              'short' => 'Konami database ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'level',
              'short' => 'Level of the monster card',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'linkRating',
              'short' => 'Link rating for Link monsters',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'short' => 'Card name in multiple languages',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'password',
              'short' => '8-digit card password/ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rank',
              'short' => 'Rank of XYZ monster',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'text',
              'short' => 'Card text in multiple languages',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'type',
              'short' => 'Monster type or spell/trap subtype',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'card',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '00010000',
                        'kind' => 'param',
                        'name' => 'card_id',
                        'orig' => 'card_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/cards/{cardId}.json',
                  'parts' => [
                    'data',
                    'cards',
                    '{cardId}.json',
                  ],
                  'select' => [
                    '$action' => 'card_id',
                    'exist' => [
                      'card_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '15150',
                        'kind' => 'param',
                        'name' => 'konami_id',
                        'orig' => 'konami_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/rush/{konamiId}.json',
                  'parts' => [
                    'data',
                    'rush',
                    '{konamiId}.json',
                  ],
                  'select' => [
                    'exist' => [
                      'konami_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards.json',
                  'parts' => [
                    'cards.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/master-duel-raw.json',
                  'parts' => [
                    'master-duel-raw.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/rush.json',
                  'parts' => [
                    'rush.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'card',
              ],
              [
                'rush',
              ],
            ],
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
                  'args' => [
                    'params' => [
                      [
                        'example' => '00010000',
                        'kind' => 'param',
                        'name' => 'card_id',
                        'orig' => 'card_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/cards/{cardId}.yaml',
                  'parts' => [
                    'data',
                    'cards',
                    '{cardId}.yaml',
                  ],
                  'select' => [
                    'exist' => [
                      'card_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '15150',
                        'kind' => 'param',
                        'name' => 'konami_id',
                        'orig' => 'konami_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/rush/{konamiId}.yaml',
                  'parts' => [
                    'data',
                    'rush',
                    '{konamiId}.yaml',
                  ],
                  'select' => [
                    'exist' => [
                      'konami_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'yugipedia585581',
                        'kind' => 'param',
                        'name' => 'yugipedia_id',
                        'orig' => 'yugipedia_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/tcg-speed-skill/{yugipediaId}.yaml',
                  'parts' => [
                    'data',
                    'tcg-speed-skill',
                    '{yugipediaId}.yaml',
                  ],
                  'select' => [
                    'exist' => [
                      'yugipedia_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'card',
              ],
              [
                'rush',
              ],
              [
                'tcg_speed_skill',
              ],
            ],
          ],
        ],
        'series' => [
          'fields' => [
            [
              'name' => 'cards',
              'short' => 'List of card IDs belonging to this series/archetype',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'short' => 'Series/archetype name in multiple languages',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'series',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/series/list.json',
                  'parts' => [
                    'data',
                    'series',
                    'list.json',
                  ],
                  'select' => [
                    '$action' => 'list',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'short' => 'List of card IDs belonging to this series/archetype',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'short' => 'Series/archetype name in multiple languages',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'series_and_archetype',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/series/list.yaml',
                  'parts' => [
                    'data',
                    'series',
                    'list.yaml',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/series/map.json',
                  'parts' => [
                    'data',
                    'series',
                    'map.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/series/map.yaml',
                  'parts' => [
                    'data',
                    'series',
                    'map.yaml',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'short' => 'Type identifier for skill cards',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'character',
              'short' => 'Character associated with the skill',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Skill card name in multiple languages',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'text',
              'short' => 'Skill card text in multiple languages',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'yugipediaId',
              'short' => 'Yugipedia page ID',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'skill',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/skill.json',
                  'parts' => [
                    'skill.json',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'skill_card' => [
          'fields' => [
            [
              'name' => 'cardType',
              'short' => 'Type identifier for skill cards',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'character',
              'short' => 'Character associated with the skill',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Skill card name in multiple languages',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'text',
              'short' => 'Skill card text in multiple languages',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'yugipediaId',
              'short' => 'Yugipedia page ID',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'skill_card',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'yugipedia585581',
                        'kind' => 'param',
                        'name' => 'yugipedia_id',
                        'orig' => 'yugipedia_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data/tcg-speed-skill/{yugipediaId}.json',
                  'parts' => [
                    'data',
                    'tcg-speed-skill',
                    '{yugipediaId}.json',
                  ],
                  'select' => [
                    'exist' => [
                      'yugipedia_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'tcg_speed_skill',
              ],
            ],
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
