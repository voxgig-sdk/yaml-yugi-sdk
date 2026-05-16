# YamlYugi Ruby SDK Reference

Complete API reference for the YamlYugi Ruby SDK.


## YamlYugiSDK

### Constructor

```ruby
require_relative 'yaml-yugi_sdk'

client = YamlYugiSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YamlYugiSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = YamlYugiSDK.test
```


### Instance Methods

#### `Aggregation(data = nil)`

Create a new `Aggregation` entity instance. Pass `nil` for no initial data.

#### `Card(data = nil)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `IndividualCard(data = nil)`

Create a new `IndividualCard` entity instance. Pass `nil` for no initial data.

#### `Series(data = nil)`

Create a new `Series` entity instance. Pass `nil` for no initial data.

#### `SeriesAndArchetype(data = nil)`

Create a new `SeriesAndArchetype` entity instance. Pass `nil` for no initial data.

#### `Skill(data = nil)`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `SkillCard(data = nil)`

Create a new `SkillCard` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## AggregationEntity

```ruby
aggregation = client.Aggregation
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Aggregation.load({ "id" => "aggregation_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AggregationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardEntity

```ruby
card = client.Card
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Card.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IndividualCardEntity

```ruby
individual_card = client.IndividualCard
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.IndividualCard.load({ "id" => "individual_card_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IndividualCardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SeriesEntity

```ruby
series = client.Series
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | ``$ARRAY`` | No |  |
| `name` | ``$OBJECT`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Series.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SeriesEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SeriesAndArchetypeEntity

```ruby
series_and_archetype = client.SeriesAndArchetype
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | ``$ARRAY`` | No |  |
| `name` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.SeriesAndArchetype.load({ "id" => "series_and_archetype_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SeriesAndArchetypeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SkillEntity

```ruby
skill = client.Skill
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Skill.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SkillCardEntity

```ruby
skill_card = client.SkillCard
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

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.SkillCard.load({ "id" => "skill_card_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SkillCardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = YamlYugiSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

