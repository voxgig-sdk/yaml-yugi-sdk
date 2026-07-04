# YamlYugi TypeScript SDK Reference

Complete API reference for the YamlYugi TypeScript SDK.


## YamlYugiSDK

### Constructor

```ts
new YamlYugiSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YamlYugiSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = YamlYugiSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `YamlYugiSDK` instance in test mode.


### Instance Methods

#### `Aggregation(data?: object)`

Create a new `Aggregation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AggregationEntity` instance.

#### `Card(data?: object)`

Create a new `Card` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardEntity` instance.

#### `IndividualCard(data?: object)`

Create a new `IndividualCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IndividualCardEntity` instance.

#### `Series(data?: object)`

Create a new `Series` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SeriesEntity` instance.

#### `SeriesAndArchetype(data?: object)`

Create a new `SeriesAndArchetype` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SeriesAndArchetypeEntity` instance.

#### `Skill(data?: object)`

Create a new `Skill` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SkillEntity` instance.

#### `SkillCard(data?: object)`

Create a new `SkillCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SkillCardEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `YamlYugiSDK.test()`.

**Returns:** `YamlYugiSDK` instance in test mode.


---

## AggregationEntity

```ts
const aggregation = client.aggregation
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.aggregation.load({ id: 'aggregation_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AggregationEntity` instance with the same client and
options.

#### `client()`

Return the parent `YamlYugiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardEntity

```ts
const card = client.card
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.card.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardEntity` instance with the same client and
options.

#### `client()`

Return the parent `YamlYugiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IndividualCardEntity

```ts
const individual_card = client.individual_card
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.individual_card.load({ id: 'individual_card_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IndividualCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `YamlYugiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SeriesEntity

```ts
const series = client.series
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | ``$ARRAY`` | No |  |
| `name` | ``$OBJECT`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.series.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SeriesEntity` instance with the same client and
options.

#### `client()`

Return the parent `YamlYugiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SeriesAndArchetypeEntity

```ts
const series_and_archetype = client.series_and_archetype
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | ``$ARRAY`` | No |  |
| `name` | ``$OBJECT`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.series_and_archetype.load({ id: 'series_and_archetype_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SeriesAndArchetypeEntity` instance with the same client and
options.

#### `client()`

Return the parent `YamlYugiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SkillEntity

```ts
const skill = client.skill
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.skill.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SkillEntity` instance with the same client and
options.

#### `client()`

Return the parent `YamlYugiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SkillCardEntity

```ts
const skill_card = client.skill_card
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.skill_card.load({ id: 'skill_card_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SkillCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `YamlYugiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new YamlYugiSDK({
  feature: {
    test: { active: true },
  }
})
```

