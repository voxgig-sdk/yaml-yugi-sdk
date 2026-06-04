# YamlYugi SDK

Machine-readable, human-editable Yu-Gi-Oh! card database covering TCG, OCG, Master Duel, Rush Duel and Speed Duel

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About YAML Yugi

[YAML Yugi](https://github.com/DawnbrandBots/yaml-yugi) is a community-maintained, machine-readable Yu-Gi-Oh! card database run by [DawnbrandBots](https://github.com/DawnbrandBots). It covers the Trading Card Game (TCG), Official Card Game (OCG), the Master Duel video game, Rush Duel and Speed Duel formats, and is the data source behind the Bastion Discord bot.

What you get from the API:

- Aggregated dumps of every OCG/TCG card (`cards.json` / `cards.yaml`) and every Rush Duel card (`rush.json` / `rush.yaml`).
- A raw Master Duel snapshot (`master-duel-raw.json`) and a Speed Duel skill-card dump (`skill.json`).
- Individual card files keyed by password (`/data/cards/<password>.json`), Konami ID (`/data/cards/kdb<id>.json`) or Yugipedia page id (`/data/cards/yugipedia<id>.json`).
- Series and archetype indexes under `/data/series/list.json` and `/data/series/map.json`.

Operational notes: the data is served as static files from GitHub Pages at `https://dawnbrandbots.github.io/yaml-yugi`, so there is no authentication or per-call rate limit beyond GitHub's CDN policy. CORS is enabled. Files are regenerated continuously from upstream sources, with both JSON and YAML representations available for most aggregations.

## Try it

**TypeScript**
```bash
npm install yaml-yugi
```

**Python**
```bash
pip install yaml-yugi-sdk
```

**PHP**
```bash
composer require voxgig/yaml-yugi-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/yaml-yugi-sdk/go
```

**Ruby**
```bash
gem install yaml-yugi-sdk
```

**Lua**
```bash
luarocks install yaml-yugi-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { YamlYugiSDK } from 'yaml-yugi'

const client = new YamlYugiSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o yaml-yugi-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "yaml-yugi": {
      "command": "/abs/path/to/yaml-yugi-mcp"
    }
  }
}
```

## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Aggregation** | Bulk dumps of every card or skill in a given format, e.g. `cards.json`, `cards.yaml`, `rush.json`, `master-duel-raw.json` and `skill.json` under the site root. | `/cards.yaml` |
| **Card** | An OCG/TCG card record as it appears inside the aggregated `cards.json` / `cards.yaml` dump. | `/data/cards/{cardId}.json` |
| **IndividualCard** | A single card fetched from its own file at `/data/cards/<password>.json`, `/data/cards/kdb<konami_id>.json` or `/data/cards/yugipedia<page_id>.json`. | `/data/cards/{cardId}.yaml` |
| **Series** | A Yu-Gi-Oh! series or archetype entry listed in `/data/series/list.json`. | `/data/series/list.json` |
| **SeriesAndArchetype** | The combined series/archetype lookup map exposed at `/data/series/map.json`, linking cards to the series and archetypes they belong to. | `/data/series/list.yaml` |
| **Skill** | A Speed Duel skill entry from the aggregated `skill.json` dump. | `/skill.json` |
| **SkillCard** | An individual Speed Duel skill card file under `/data/tcg-speed-skill/yugipedia<page_id>.json`. | `/data/tcg-speed-skill/{yugipediaId}.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from yamlyugi_sdk import YamlYugiSDK

client = YamlYugiSDK({})


# Load a specific aggregation
aggregation, err = client.Aggregation(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'yamlyugi_sdk.php';

$client = new YamlYugiSDK([]);


// Load a specific aggregation
[$aggregation, $err] = $client->Aggregation(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/yaml-yugi-sdk/go"

client := sdk.NewYamlYugiSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "YamlYugi_sdk"

client = YamlYugiSDK.new({})


# Load a specific aggregation
aggregation, err = client.Aggregation(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("yaml-yugi_sdk")

local client = sdk.new({})


-- Load a specific aggregation
local aggregation, err = client:Aggregation(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = YamlYugiSDK.test()
const result = await client.Aggregation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = YamlYugiSDK.test(None, None)
result, err = client.Aggregation(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = YamlYugiSDK::test(null, null);
[$result, $err] = $client->Aggregation(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Aggregation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = YamlYugiSDK.test(nil, nil)
result, err = client.Aggregation(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Aggregation(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the YAML Yugi

- Upstream: [https://github.com/DawnbrandBots/yaml-yugi](https://github.com/DawnbrandBots/yaml-yugi)
- API docs: [https://github.com/DawnbrandBots/yaml-yugi#readme](https://github.com/DawnbrandBots/yaml-yugi#readme)

- Source code and data pipeline are licensed under the GNU Affero General Public License v3.0 or later.
- Card names, text and artwork remain the property of Studio Dice/SHUEISHA, TV TOKYO and KONAMI.
- Aggregated card data is published on GitHub Pages for community and tooling use; check the upstream repo for current terms before redistribution.
- This SDK is an unaffiliated convenience wrapper and not endorsed by Konami.

---

Generated from the YAML Yugi OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
