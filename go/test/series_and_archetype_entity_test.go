package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/yaml-yugi-sdk"
	"github.com/voxgig-sdk/yaml-yugi-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestSeriesAndArchetypeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SeriesAndArchetype(nil)
		if ent == nil {
			t.Fatal("expected non-nil SeriesAndArchetypeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := series_and_archetypeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "series_and_archetype." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set YAMLYUGI_TEST_SERIES_AND_ARCHETYPE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		seriesAndArchetypeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.series_and_archetype", setup.data)))
		var seriesAndArchetypeRef01Data map[string]any
		if len(seriesAndArchetypeRef01DataRaw) > 0 {
			seriesAndArchetypeRef01Data = core.ToMapAny(seriesAndArchetypeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = seriesAndArchetypeRef01Data

		// LOAD
		seriesAndArchetypeRef01Ent := client.SeriesAndArchetype(nil)
		seriesAndArchetypeRef01MatchDt0 := map[string]any{}
		seriesAndArchetypeRef01DataDt0Loaded, err := seriesAndArchetypeRef01Ent.Load(seriesAndArchetypeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if seriesAndArchetypeRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func series_and_archetypeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "series_and_archetype", "SeriesAndArchetypeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read series_and_archetype test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse series_and_archetype test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"series_and_archetype01", "series_and_archetype02", "series_and_archetype03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("YAMLYUGI_TEST_SERIES_AND_ARCHETYPE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"YAMLYUGI_TEST_SERIES_AND_ARCHETYPE_ENTID": idmap,
		"YAMLYUGI_TEST_LIVE":      "FALSE",
		"YAMLYUGI_TEST_EXPLAIN":   "FALSE",
		"YAMLYUGI_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["YAMLYUGI_TEST_SERIES_AND_ARCHETYPE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["YAMLYUGI_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["YAMLYUGI_APIKEY"],
			},
			extra,
		})
		client = sdk.NewYamlYugiSDK(core.ToMapAny(mergedOpts))
	}

	live := env["YAMLYUGI_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["YAMLYUGI_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
