# YamlYugi PHP SDK Reference

Complete API reference for the YamlYugi PHP SDK.


## YamlYugiSDK

### Constructor

```php
require_once __DIR__ . '/yaml-yugi_sdk.php';

$client = new YamlYugiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## AggregationEntity

```php
$aggregation = $client->Aggregation();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Aggregation()->load(["id" => "aggregation_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AggregationEntity`

Create a new `AggregationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CardEntity

```php
$card = $client->Card();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archetype` | ``$ARRAY`` | No |  |
| `atk` | ``$INTEGER`` | No |  |
| `attribute` | ``$STRING`` | No |  |
| `card_type` | ``$STRING`` | No |  |
| `def` | ``$INTEGER`` | No |  |
| `format` | ``$ARRAY`` | No |  |
| `konami_id` | ``$STRING`` | No |  |
| `level` | ``$INTEGER`` | No |  |
| `link_rating` | ``$INTEGER`` | No |  |
| `name` | ``$OBJECT`` | No |  |
| `password` | ``$STRING`` | No |  |
| `rank` | ``$INTEGER`` | No |  |
| `text` | ``$OBJECT`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Card()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CardEntity`

Create a new `CardEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IndividualCardEntity

```php
$individual_card = $client->IndividualCard();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->IndividualCard()->load(["id" => "individual_card_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IndividualCardEntity`

Create a new `IndividualCardEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SeriesEntity

```php
$series = $client->Series();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | ``$ARRAY`` | No |  |
| `name` | ``$OBJECT`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Series()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SeriesEntity`

Create a new `SeriesEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SeriesAndArchetypeEntity

```php
$series_and_archetype = $client->SeriesAndArchetype();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | ``$ARRAY`` | No |  |
| `name` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->SeriesAndArchetype()->load(["id" => "series_and_archetype_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SeriesAndArchetypeEntity`

Create a new `SeriesAndArchetypeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SkillEntity

```php
$skill = $client->Skill();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card_type` | ``$STRING`` | No |  |
| `character` | ``$STRING`` | No |  |
| `name` | ``$OBJECT`` | No |  |
| `text` | ``$OBJECT`` | No |  |
| `yugipedia_id` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Skill()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SkillEntity`

Create a new `SkillEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SkillCardEntity

```php
$skill_card = $client->SkillCard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card_type` | ``$STRING`` | No |  |
| `character` | ``$STRING`` | No |  |
| `name` | ``$OBJECT`` | No |  |
| `text` | ``$OBJECT`` | No |  |
| `yugipedia_id` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->SkillCard()->load(["id" => "skill_card_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SkillCardEntity`

Create a new `SkillCardEntity` instance with the same client and
options.

#### `getName(): string`

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

