# IndividualCard entity test

require "minitest/autorun"
require "json"
require_relative "../YamlYugi_sdk"
require_relative "runner"

class IndividualCardEntityTest < Minitest::Test
  def test_create_instance
    testsdk = YamlYugiSDK.test(nil, nil)
    ent = testsdk.IndividualCard(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = individual_card_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "individual_card." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set YAMLYUGI_TEST_INDIVIDUAL_CARD_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    individual_card_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.individual_card")))
    individual_card_ref01_data = nil
    if individual_card_ref01_data_raw.length > 0
      individual_card_ref01_data = Helpers.to_map(individual_card_ref01_data_raw[0][1])
    end

    # LOAD
    individual_card_ref01_ent = client.IndividualCard(nil)
    individual_card_ref01_match_dt0 = {}
    individual_card_ref01_data_dt0_loaded = individual_card_ref01_ent.load(individual_card_ref01_match_dt0, nil)
    assert !individual_card_ref01_data_dt0_loaded.nil?

  end
end

def individual_card_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "individual_card", "IndividualCardTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = YamlYugiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["individual_card01", "individual_card02", "individual_card03", "card01", "card02", "card03", "rush01", "rush02", "rush03", "tcg_speed_skill01", "tcg_speed_skill02", "tcg_speed_skill03", "yugipedia01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["YAMLYUGI_TEST_INDIVIDUAL_CARD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "YAMLYUGI_TEST_INDIVIDUAL_CARD_ENTID" => idmap,
    "YAMLYUGI_TEST_LIVE" => "FALSE",
    "YAMLYUGI_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["YAMLYUGI_TEST_INDIVIDUAL_CARD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["YAMLYUGI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = YamlYugiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["YAMLYUGI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["YAMLYUGI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
