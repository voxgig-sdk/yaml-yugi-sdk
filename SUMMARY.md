# YAML Yugi

API providing a comprehensive, machine-readable database of Yu-Gi-Oh! Trading Card Game, Official Card Game, Master Duel, Rush Duel, and Speed Duel. It supports fetching individual cards in JSON or YAML format, and integrates with Discord bot Bastion. Aggregations and card data are published on GitHub Pages.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 16 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Aggregation

Results: Successful response containing all OCG/TCG cards in YAML format; Successful response containing all Rush Duel cards in YAML format.

SDK operations: `load`.

### Card

Results: Successful response containing the card data; Successful response containing the Rush Duel card data; Successful response containing all OCG/TCG cards; Successful response containing all Master Duel cards; Successful response containing all Rush Duel cards.

SDK operations: `list`.

Key fields to recognise:

- `archetype`: Archetypes the card belongs to
- `atk`: Attack points
- `attribute`: Card attribute (for monsters)
- `cardType`: Type of card (Monster, Spell, Trap, etc.)
- `def`: Defense points

### IndividualCard

Results: Successful response containing the card data in YAML format; Successful response containing the Rush Duel card data in YAML format; Successful response containing the Speed Duel Skill Card data in YAML format.

SDK operations: `load`.

### Series

Results: Successful response containing series and archetypes as a list.

SDK operations: `list`.

Key fields to recognise:

- `cards`: List of card IDs belonging to this series/archetype
- `name`: Series/archetype name in multiple languages

### SeriesAndArchetype

Results: Successful response containing series and archetypes as a list in YAML format; Successful response containing series and archetypes as a mapping; Successful response containing series and archetypes as a mapping in YAML format.

SDK operations: `load`.

Key fields to recognise:

- `cards`: List of card IDs belonging to this series/archetype
- `name`: Series/archetype name in multiple languages

### Skill

Results: Successful response containing all TCG Speed Duel Skill Cards.

SDK operations: `list`.

Key fields to recognise:

- `cardType`: Type identifier for skill cards
- `character`: Character associated with the skill
- `name`: Skill card name in multiple languages
- `text`: Skill card text in multiple languages
- `yugipediaId`: Yugipedia page ID

### YugipediaId

Results: Successful response containing the Speed Duel Skill Card data.

SDK operations: `load`.

Key fields to recognise:

- `cardType`: Type identifier for skill cards
- `character`: Character associated with the skill
- `name`: Skill card name in multiple languages
- `text`: Skill card text in multiple languages
- `yugipediaId`: Yugipedia page ID

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Aggregation | `load` | `GET /cards.yaml` | See reference |
| Aggregation | `load` | `GET /rush.yaml` | See reference |
| Card | `list` | `GET /data/cards/{cardId}.json` | See reference |
| Card | `list` | `GET /data/rush/{konamiId}.json` | See reference |
| Card | `list` | `GET /cards.json` | See reference |
| Card | `list` | `GET /master-duel-raw.json` | See reference |
| Card | `list` | `GET /rush.json` | See reference |
| IndividualCard | `load` | `GET /data/cards/{cardId}.yaml` | See reference |
| IndividualCard | `load` | `GET /data/rush/{konamiId}.yaml` | See reference |
| IndividualCard | `load` | `GET /data/tcg-speed-skill/{yugipediaId}.yaml` | See reference |
| Series | `list` | `GET /data/series/list.json` | See reference |
| SeriesAndArchetype | `load` | `GET /data/series/list.yaml` | See reference |
| SeriesAndArchetype | `load` | `GET /data/series/map.json` | See reference |
| SeriesAndArchetype | `load` | `GET /data/series/map.yaml` | See reference |
| Skill | `list` | `GET /skill.json` | See reference |
| YugipediaId | `load` | `GET /data/tcg-speed-skill/{yugipediaId}.json` | See reference |

## Connect to the API

- GitHub Pages - Aggregations: `https://dawnbrandbots.github.io/yaml-yugi`
- jsDelivr CDN - Individual cards: `https://cdn.jsdelivr.net/gh/DawnbrandBots/yaml-yugi`
- Statically CDN - Individual cards: `https://cdn.statically.io/gh/DawnbrandBots/yaml-yugi/master`
- GitHub Raw - Individual cards: `https://github.com/DawnbrandBots/yaml-yugi/raw/master`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `yaml-yugi_list`: List records for an entity. Supported entities: `card`, `series`, `skill`.
- `yaml-yugi_load`: Load one record for an entity. Supported entities: `aggregation`, `individual_card`, `series_and_archetype`, `yugipedia_id`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

