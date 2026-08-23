# YamlYugi Python SDK Reference

Complete API reference for the YamlYugi Python SDK.


## YamlYugiSDK

### Constructor

```python
from yamlyugi_sdk import YamlYugiSDK

client = YamlYugiSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YamlYugiSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = YamlYugiSDK.test()
```


### Instance Methods

#### `Aggregation(data=None)`

Create a new `AggregationEntity` instance. Pass `None` for no initial data.

#### `Card(data=None)`

Create a new `CardEntity` instance. Pass `None` for no initial data.

#### `IndividualCard(data=None)`

Create a new `IndividualCardEntity` instance. Pass `None` for no initial data.

#### `Series(data=None)`

Create a new `SeriesEntity` instance. Pass `None` for no initial data.

#### `SeriesAndArchetype(data=None)`

Create a new `SeriesAndArchetypeEntity` instance. Pass `None` for no initial data.

#### `Skill(data=None)`

Create a new `SkillEntity` instance. Pass `None` for no initial data.

#### `SkillCard(data=None)`

Create a new `SkillCardEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AggregationEntity

```python
aggregation = client.Aggregation()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Aggregation().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AggregationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardEntity

```python
card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `archetype` | `list` | No | Archetypes the card belongs to |
| `atk` | `int` | No | Attack points |
| `attribute` | `str` | No | Card attribute (for monsters) |
| `cardType` | `str` | No | Type of card (Monster, Spell, Trap, etc.) |
| `def` | `int` | No | Defense points |
| `format` | `list` | No | Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel) |
| `konamiId` | `str` | No | Konami database ID |
| `level` | `int` | No | Level of the monster card |
| `linkRating` | `int` | No | Link rating for Link monsters |
| `name` | `dict` | No | Card name in multiple languages |
| `password` | `str` | No | 8-digit card password/ID |
| `rank` | `int` | No | Rank of XYZ monster |
| `text` | `dict` | No | Card text in multiple languages |
| `type` | `str` | No | Monster type or spell/trap subtype |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Card().list({"konami_id": "example"})
for card in results:
    print(card)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IndividualCardEntity

```python
individual_card = client.IndividualCard()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IndividualCard().load({"card_id": "card_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IndividualCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SeriesEntity

```python
series = client.Series()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cards` | `list` | No | List of card IDs belonging to this series/archetype |
| `name` | `dict` | No | Series/archetype name in multiple languages |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Series().list()
for series in results:
    print(series)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SeriesEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SeriesAndArchetypeEntity

```python
series_and_archetype = client.SeriesAndArchetype()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cards` | `list` | No | List of card IDs belonging to this series/archetype |
| `name` | `dict` | No | Series/archetype name in multiple languages |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SeriesAndArchetype().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SeriesAndArchetypeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SkillEntity

```python
skill = client.Skill()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardType` | `str` | No | Type identifier for skill cards |
| `character` | `str` | No | Character associated with the skill |
| `name` | `dict` | No | Skill card name in multiple languages |
| `text` | `dict` | No | Skill card text in multiple languages |
| `yugipediaId` | `str` | No | Yugipedia page ID |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Skill().list()
for skill in results:
    print(skill)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SkillEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SkillCardEntity

```python
skill_card = client.SkillCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cardType` | `str` | No | Type identifier for skill cards |
| `character` | `str` | No | Character associated with the skill |
| `name` | `dict` | No | Skill card name in multiple languages |
| `text` | `dict` | No | Skill card text in multiple languages |
| `yugipediaId` | `str` | No | Yugipedia page ID |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SkillCard().load({"yugipedia_id": "yugipedia_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SkillCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = YamlYugiSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

