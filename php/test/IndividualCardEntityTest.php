<?php
declare(strict_types=1);

// IndividualCard entity test

require_once __DIR__ . '/../yamlyugi_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class IndividualCardEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = YamlYugiSDK::test(null, null);
        $ent = $testsdk->IndividualCard(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = individual_card_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "individual_card." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set YAMLYUGI_TEST_INDIVIDUAL_CARD_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $individual_card_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.individual_card")));
        $individual_card_ref01_data = null;
        if (count($individual_card_ref01_data_raw) > 0) {
            $individual_card_ref01_data = Helpers::to_map($individual_card_ref01_data_raw[0][1]);
        }

        // LOAD
        $individual_card_ref01_ent = $client->IndividualCard(null);
        $individual_card_ref01_match_dt0 = [];
        $individual_card_ref01_data_dt0_loaded = $individual_card_ref01_ent->load($individual_card_ref01_match_dt0, null);
        $this->assertNotNull($individual_card_ref01_data_dt0_loaded);

    }
}

function individual_card_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/individual_card/IndividualCardTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = YamlYugiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["individual_card01", "individual_card02", "individual_card03", "card01", "card02", "card03", "rush01", "rush02", "rush03", "tcg_speed_skill01", "tcg_speed_skill02", "tcg_speed_skill03", "yugipedia01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("YAMLYUGI_TEST_INDIVIDUAL_CARD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "YAMLYUGI_TEST_INDIVIDUAL_CARD_ENTID" => $idmap,
        "YAMLYUGI_TEST_LIVE" => "FALSE",
        "YAMLYUGI_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["YAMLYUGI_TEST_INDIVIDUAL_CARD_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["YAMLYUGI_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new YamlYugiSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["YAMLYUGI_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["YAMLYUGI_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
