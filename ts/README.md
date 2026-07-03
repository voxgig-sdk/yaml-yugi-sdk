# YamlYugi TypeScript SDK



The TypeScript SDK for the YamlYugi API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
npm install yaml-yugi
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { YamlYugiSDK } from 'yaml-yugi'

const client = new YamlYugiSDK({
  apikey: process.env.YAML-YUGI_APIKEY,
})
```

### 3. Load a aggregation

```ts
const result = await client.Aggregation().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = YamlYugiSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new YamlYugiSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new YamlYugiSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### YamlYugiSDK

#### Constructor

```ts
new YamlYugiSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Aggregation(data?)` | `AggregationEntity` | Create a Aggregation entity instance. |
| `Card(data?)` | `CardEntity` | Create a Card entity instance. |
| `IndividualCard(data?)` | `IndividualCardEntity` | Create a IndividualCard entity instance. |
| `Series(data?)` | `SeriesEntity` | Create a Series entity instance. |
| `SeriesAndArchetype(data?)` | `SeriesAndArchetypeEntity` | Create a SeriesAndArchetype entity instance. |
| `Skill(data?)` | `SkillEntity` | Create a Skill entity instance. |
| `SkillCard(data?)` | `SkillCardEntity` | Create a SkillCard entity instance. |
| `tester(testopts?, sdkopts?)` | `YamlYugiSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `YamlYugiSDK.test(testopts?, sdkopts?)` | `YamlYugiSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): YamlYugiSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Aggregation

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list.

API path: `/data/cards/{cardId}.json`

#### IndividualCard

| Field | Description |
| --- | --- |

Operations: load.

API path: `/data/cards/{cardId}.yaml`

#### Series

| Field | Description |
| --- | --- |
| `card` |  |
| `name` |  |

Operations: list.

API path: `/data/series/list.json`

#### SeriesAndArchetype

| Field | Description |
| --- | --- |
| `card` |  |
| `name` |  |

Operations: load.

API path: `/data/series/list.yaml`

#### Skill

| Field | Description |
| --- | --- |
| `card_type` |  |
| `character` |  |
| `name` |  |
| `text` |  |
| `yugipedia_id` |  |

Operations: list.

API path: `/skill.json`

#### SkillCard

| Field | Description |
| --- | --- |
| `card_type` |  |
| `character` |  |
| `name` |  |
| `text` |  |
| `yugipedia_id` |  |

Operations: load.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
yaml-yugi/
├── src/
│   ├── YamlYugiSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { YamlYugiSDK } from 'yaml-yugi'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
