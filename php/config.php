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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'atk',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'attribute',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cardType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'def',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'format',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'konamiId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'level',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'linkRating',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'password',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rank',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'text',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'type',
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
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
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
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'character',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'text',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'yugipediaId',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'character',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'text',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'yugipediaId',
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
