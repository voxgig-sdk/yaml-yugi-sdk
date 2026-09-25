# YamlYugi Ruby SDK Reference

Complete API reference for the YamlYugi Ruby SDK.


## YamlYugiSDK

### Constructor

```ruby
require_relative 'YamlYugi_sdk'

client = YamlYugiSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
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

#### `YugipediaId(data = nil)`

Create a new `YugipediaId` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

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

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AggregationEntity

```ruby
aggregation = client.Aggregation
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Aggregation.load()
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
| `archetype` | `Array` | No | Archetypes the card belongs to |
| `atk` | `Integer` | No | Attack points |
| `attribute` | `String` | No | Card attribute (for monsters) |
| `cardType` | `String` | No | Type of card (Monster, Spell, Trap, etc.) |
| `def` | `Integer` | No | Defense points |
| `format` | `Array` | No | Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel) |
| `konamiId` | `String` | No | Konami database ID |
| `level` | `Integer` | No | Level of the monster card |
| `linkRating` | `Integer` | No | Link rating for Link monsters |
| `name` | `Hash` | No | Card name in multiple languages |
| `password` | `String` | No | 8-digit card password/ID |
| `rank` | `Integer` | No | Rank of XYZ monster |
| `text` | `Hash` | No | Card text in multiple languages |
| `type` | `String` | No | Monster type or spell/trap subtype |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Card.list
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IndividualCard.load({ "card_id" => "card_id" })
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
| `cards` | `Array` | No | List of card IDs belonging to this series/archetype |
| `name` | `Hash` | No | Series/archetype name in multiple languages |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Series.list
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
| `cards` | `Array` | No | List of card IDs belonging to this series/archetype |
| `name` | `Hash` | No | Series/archetype name in multiple languages |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.SeriesAndArchetype.load()
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
| `cardType` | `String` | No | Type identifier for skill cards |
| `character` | `String` | No | Character associated with the skill |
| `name` | `Hash` | No | Skill card name in multiple languages |
| `text` | `Hash` | No | Skill card text in multiple languages |
| `yugipediaId` | `String` | No | Yugipedia page ID |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Skill.list
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

## YugipediaIdEntity

```ruby
yugipedia_id = client.YugipediaId
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardType` | `String` | No | Type identifier for skill cards |
| `character` | `String` | No | Character associated with the skill |
| `name` | `Hash` | No | Skill card name in multiple languages |
| `text` | `Hash` | No | Skill card text in multiple languages |
| `yugipediaId` | `String` | No | Yugipedia page ID |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.YugipediaId.load({ "yugipedia_id" => "yugipedia_id" })
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

Create a new `YugipediaIdEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ruby
client = YamlYugiSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

