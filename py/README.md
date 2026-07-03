# YamlYugi Python SDK



The Python SDK for the YamlYugi API — an entity-oriented client following Pythonic conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
pip install voxgig-sdk-yaml-yugi
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from yamlyugi_sdk import YamlYugiSDK

client = YamlYugiSDK({
    "apikey": os.environ.get("YAML-YUGI_APIKEY"),
})
```

### 3. Load a aggregation

```python
result, err = client.Aggregation().load({"id": "example_id"})
if err:
    raise Exception(err)
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = YamlYugiSDK.test()

result, err = client.YamlYugi().load({"id": "test01"})
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = YamlYugiSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
YAML-YUGI_TEST_LIVE=TRUE
YAML-YUGI_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### YamlYugiSDK

```python
from yamlyugi_sdk import YamlYugiSDK

client = YamlYugiSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = YamlYugiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### YamlYugiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Aggregation` | `(data) -> AggregationEntity` | Create a Aggregation entity instance. |
| `Card` | `(data) -> CardEntity` | Create a Card entity instance. |
| `IndividualCard` | `(data) -> IndividualCardEntity` | Create a IndividualCard entity instance. |
| `Series` | `(data) -> SeriesEntity` | Create a Series entity instance. |
| `SeriesAndArchetype` | `(data) -> SeriesAndArchetypeEntity` | Create a SeriesAndArchetype entity instance. |
| `Skill` | `(data) -> SkillEntity` | Create a Skill entity instance. |
| `SkillCard` | `(data) -> SkillCardEntity` | Create a SkillCard entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Aggregation

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/cards.yaml`

#### Card

| Field | Description |
| --- | --- |
| `archetype` |  |
| `atk` |  |
| `attribute` |  |
| `card_type` |  |
| `def` |  |
| `format` |  |
| `konami_id` |  |
| `level` |  |
| `link_rating` |  |
| `name` |  |
| `password` |  |
| `rank` |  |
| `text` |  |
| `type` |  |

Operations: List.

API path: `/data/cards/{cardId}.json`

#### IndividualCard

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/data/cards/{cardId}.yaml`

#### Series

| Field | Description |
| --- | --- |
| `card` |  |
| `name` |  |

Operations: List.

API path: `/data/series/list.json`

#### SeriesAndArchetype

| Field | Description |
| --- | --- |
| `card` |  |
| `name` |  |

Operations: Load.

API path: `/data/series/list.yaml`

#### Skill

| Field | Description |
| --- | --- |
| `card_type` |  |
| `character` |  |
| `name` |  |
| `text` |  |
| `yugipedia_id` |  |

Operations: List.

API path: `/skill.json`

#### SkillCard

| Field | Description |
| --- | --- |
| `card_type` |  |
| `character` |  |
| `name` |  |
| `text` |  |
| `yugipedia_id` |  |

Operations: Load.

API path: `/data/tcg-speed-skill/{yugipediaId}.json`



## Entities


### Aggregation

Create an instance: `const aggregation = client.Aggregation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const aggregation = await client.Aggregation().load({ id: 'aggregation_id' })
```


### Card

Create an instance: `const card = client.Card()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archetype` | ``$ARRAY`` |  |
| `atk` | ``$INTEGER`` |  |
| `attribute` | ``$STRING`` |  |
| `card_type` | ``$STRING`` |  |
| `def` | ``$INTEGER`` |  |
| `format` | ``$ARRAY`` |  |
| `konami_id` | ``$STRING`` |  |
| `level` | ``$INTEGER`` |  |
| `link_rating` | ``$INTEGER`` |  |
| `name` | ``$OBJECT`` |  |
| `password` | ``$STRING`` |  |
| `rank` | ``$INTEGER`` |  |
| `text` | ``$OBJECT`` |  |
| `type` | ``$STRING`` |  |

#### Example: List

```ts
const cards = await client.Card().list()
```


### IndividualCard

Create an instance: `const individual_card = client.IndividualCard()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const individual_card = await client.IndividualCard().load({ id: 'individual_card_id' })
```


### Series

Create an instance: `const series = client.Series()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | ``$ARRAY`` |  |
| `name` | ``$OBJECT`` |  |

#### Example: List

```ts
const seriess = await client.Series().list()
```


### SeriesAndArchetype

Create an instance: `const series_and_archetype = client.SeriesAndArchetype()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | ``$ARRAY`` |  |
| `name` | ``$OBJECT`` |  |

#### Example: Load

```ts
const series_and_archetype = await client.SeriesAndArchetype().load({ id: 'series_and_archetype_id' })
```


### Skill

Create an instance: `const skill = client.Skill()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card_type` | ``$STRING`` |  |
| `character` | ``$STRING`` |  |
| `name` | ``$OBJECT`` |  |
| `text` | ``$OBJECT`` |  |
| `yugipedia_id` | ``$STRING`` |  |

#### Example: List

```ts
const skills = await client.Skill().list()
```


### SkillCard

Create an instance: `const skill_card = client.SkillCard()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card_type` | ``$STRING`` |  |
| `character` | ``$STRING`` |  |
| `name` | ``$OBJECT`` |  |
| `text` | ``$OBJECT`` |  |
| `yugipedia_id` | ``$STRING`` |  |

#### Example: Load

```ts
const skill_card = await client.SkillCard().load({ id: 'skill_card_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── yamlyugi_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`yamlyugi_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
