# YamlYugi Lua SDK



The Lua SDK for the YamlYugi API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Aggregation()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/yaml-yugi-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("yaml-yugi_sdk")

local client = sdk.new()
```

### 3. Load an individualcard

IndividualCard is nested under card, so provide the `card_id`.

```lua
local individualcard, err = client:IndividualCard():load({ card_id = "example_card_id" })
if err then error(err) end
print(individualcard)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local seriess, err = client:Series():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Series():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
YAML_YUGI_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### YamlYugiSDK

```lua
local sdk = require("yaml-yugi_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### YamlYugiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Aggregation` | `(data) -> AggregationEntity` | Create an Aggregation entity instance. |
| `Card` | `(data) -> CardEntity` | Create a Card entity instance. |
| `IndividualCard` | `(data) -> IndividualCardEntity` | Create an IndividualCard entity instance. |
| `Series` | `(data) -> SeriesEntity` | Create a Series entity instance. |
| `SeriesAndArchetype` | `(data) -> SeriesAndArchetypeEntity` | Create a SeriesAndArchetype entity instance. |
| `Skill` | `(data) -> SkillEntity` | Create a Skill entity instance. |
| `SkillCard` | `(data) -> SkillCardEntity` | Create a SkillCard entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local aggregation, err = client:Aggregation():load()
    if err then error(err) end
    -- aggregation is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Aggregation

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/cards.yaml`

#### Card

| Field | Description |
| --- | --- |
| `archetype` | Archetypes the card belongs to |
| `atk` | Attack points |
| `attribute` | Card attribute (for monsters) |
| `cardType` | Type of card (Monster, Spell, Trap, etc.) |
| `def` | Defense points |
| `format` | Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel) |
| `konamiId` | Konami database ID |
| `level` | Level of the monster card |
| `linkRating` | Link rating for Link monsters |
| `name` | Card name in multiple languages |
| `password` | 8-digit card password/ID |
| `rank` | Rank of XYZ monster |
| `text` | Card text in multiple languages |
| `type` | Monster type or spell/trap subtype |

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
| `cards` | List of card IDs belonging to this series/archetype |
| `name` | Series/archetype name in multiple languages |

Operations: List.

API path: `/data/series/list.json`

#### SeriesAndArchetype

| Field | Description |
| --- | --- |
| `cards` | List of card IDs belonging to this series/archetype |
| `name` | Series/archetype name in multiple languages |

Operations: Load.

API path: `/data/series/list.yaml`

#### Skill

| Field | Description |
| --- | --- |
| `cardType` | Type identifier for skill cards |
| `character` | Character associated with the skill |
| `name` | Skill card name in multiple languages |
| `text` | Skill card text in multiple languages |
| `yugipediaId` | Yugipedia page ID |

Operations: List.

API path: `/skill.json`

#### SkillCard

| Field | Description |
| --- | --- |
| `cardType` | Type identifier for skill cards |
| `character` | Character associated with the skill |
| `name` | Skill card name in multiple languages |
| `text` | Skill card text in multiple languages |
| `yugipediaId` | Yugipedia page ID |

Operations: Load.

API path: `/data/tcg-speed-skill/{yugipediaId}.json`



## Entities


### Aggregation

Create an instance: `local aggregation = client:Aggregation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local aggregation, err = client:Aggregation():load()
```


### Card

Create an instance: `local card = client:Card(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `archetype` | `table` | Archetypes the card belongs to |
| `atk` | `number` | Attack points |
| `attribute` | `string` | Card attribute (for monsters) |
| `cardType` | `string` | Type of card (Monster, Spell, Trap, etc.) |
| `def` | `number` | Defense points |
| `format` | `table` | Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel) |
| `konamiId` | `string` | Konami database ID |
| `level` | `number` | Level of the monster card |
| `linkRating` | `number` | Link rating for Link monsters |
| `name` | `table` | Card name in multiple languages |
| `password` | `string` | 8-digit card password/ID |
| `rank` | `number` | Rank of XYZ monster |
| `text` | `table` | Card text in multiple languages |
| `type` | `string` | Monster type or spell/trap subtype |

#### Example: List

```lua
local cards, err = client:Card():list()
```


### IndividualCard

Create an instance: `local individual_card = client:IndividualCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local individual_card, err = client:IndividualCard():load({ card_id = "card_id" })
```


### Series

Create an instance: `local series = client:Series(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cards` | `table` | List of card IDs belonging to this series/archetype |
| `name` | `table` | Series/archetype name in multiple languages |

#### Example: List

```lua
local seriess, err = client:Series():list()
```


### SeriesAndArchetype

Create an instance: `local series_and_archetype = client:SeriesAndArchetype(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cards` | `table` | List of card IDs belonging to this series/archetype |
| `name` | `table` | Series/archetype name in multiple languages |

#### Example: Load

```lua
local series_and_archetype, err = client:SeriesAndArchetype():load()
```


### Skill

Create an instance: `local skill = client:Skill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cardType` | `string` | Type identifier for skill cards |
| `character` | `string` | Character associated with the skill |
| `name` | `table` | Skill card name in multiple languages |
| `text` | `table` | Skill card text in multiple languages |
| `yugipediaId` | `string` | Yugipedia page ID |

#### Example: List

```lua
local skills, err = client:Skill():list()
```


### SkillCard

Create an instance: `local skill_card = client:SkillCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cardType` | `string` | Type identifier for skill cards |
| `character` | `string` | Character associated with the skill |
| `name` | `table` | Skill card name in multiple languages |
| `text` | `table` | Skill card text in multiple languages |
| `yugipediaId` | `string` | Yugipedia page ID |

#### Example: Load

```lua
local skill_card, err = client:SkillCard():load({ yugipedia_id = "yugipedia_id" })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── yaml-yugi_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`yaml-yugi_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local series = client:Series()
series:list()

-- series:data_get() now returns the series data from the last list
-- series:match_get() returns the last match criteria
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
