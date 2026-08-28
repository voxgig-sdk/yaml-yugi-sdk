# YamlYugi PHP SDK Reference

Complete API reference for the YamlYugi PHP SDK.


## YamlYugiSDK

### Constructor

```php
require_once __DIR__ . '/yamlyugi_sdk.php';

$client = new YamlYugiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YamlYugiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = YamlYugiSDK::test();
```


### Instance Methods

#### `Aggregation($data = null)`

Create a new `AggregationEntity` instance. Pass `null` for no initial data.

#### `Card($data = null)`

Create a new `CardEntity` instance. Pass `null` for no initial data.

#### `IndividualCard($data = null)`

Create a new `IndividualCardEntity` instance. Pass `null` for no initial data.

#### `Series($data = null)`

Create a new `SeriesEntity` instance. Pass `null` for no initial data.

#### `SeriesAndArchetype($data = null)`

Create a new `SeriesAndArchetypeEntity` instance. Pass `null` for no initial data.

#### `Skill($data = null)`

Create a new `SkillEntity` instance. Pass `null` for no initial data.

#### `SkillCard($data = null)`

Create a new `SkillCardEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): YamlYugiUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AggregationEntity

```php
$aggregation = $client->Aggregation();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Aggregation()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AggregationEntity`

Create a new `AggregationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardEntity

```php
$card = $client->Card();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archetype` | `array` | No | Archetypes the card belongs to |
| `atk` | `int` | No | Attack points |
| `attribute` | `string` | No | Card attribute (for monsters) |
| `cardType` | `string` | No | Type of card (Monster, Spell, Trap, etc.) |
| `def` | `int` | No | Defense points |
| `format` | `array` | No | Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel) |
| `konamiId` | `string` | No | Konami database ID |
| `level` | `int` | No | Level of the monster card |
| `linkRating` | `int` | No | Link rating for Link monsters |
| `name` | `array` | No | Card name in multiple languages |
| `password` | `string` | No | 8-digit card password/ID |
| `rank` | `int` | No | Rank of XYZ monster |
| `text` | `array` | No | Card text in multiple languages |
| `type` | `string` | No | Monster type or spell/trap subtype |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Card()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardEntity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IndividualCardEntity

```php
$individual_card = $client->IndividualCard();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IndividualCard()->load(["card_id" => "card_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IndividualCardEntity`

Create a new `IndividualCardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SeriesEntity

```php
$series = $client->Series();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cards` | `array` | No | List of card IDs belonging to this series/archetype |
| `name` | `array` | No | Series/archetype name in multiple languages |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Series()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SeriesEntity`

Create a new `SeriesEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SeriesAndArchetypeEntity

```php
$series_and_archetype = $client->SeriesAndArchetype();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cards` | `array` | No | List of card IDs belonging to this series/archetype |
| `name` | `array` | No | Series/archetype name in multiple languages |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->SeriesAndArchetype()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SeriesAndArchetypeEntity`

Create a new `SeriesAndArchetypeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SkillEntity

```php
$skill = $client->Skill();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardType` | `string` | No | Type identifier for skill cards |
| `character` | `string` | No | Character associated with the skill |
| `name` | `array` | No | Skill card name in multiple languages |
| `text` | `array` | No | Skill card text in multiple languages |
| `yugipediaId` | `string` | No | Yugipedia page ID |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Skill()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SkillEntity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SkillCardEntity

```php
$skill_card = $client->SkillCard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardType` | `string` | No | Type identifier for skill cards |
| `character` | `string` | No | Character associated with the skill |
| `name` | `array` | No | Skill card name in multiple languages |
| `text` | `array` | No | Skill card text in multiple languages |
| `yugipediaId` | `string` | No | Yugipedia page ID |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->SkillCard()->load(["yugipedia_id" => "yugipedia_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SkillCardEntity`

Create a new `SkillCardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new YamlYugiSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

