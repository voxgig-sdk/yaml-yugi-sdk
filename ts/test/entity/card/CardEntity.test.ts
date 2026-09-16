

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { YamlYugiSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAML_YUGI_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAML_YUGI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YamlYugiSDK.test()
    const ent = testsdk.Card()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAML_YUGI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"archetype","req":false,"short":"Archetypes the card belongs to","type":"`$ARRAY`","index$":0},{"active":true,"name":"atk","req":false,"short":"Attack points","type":"`$INTEGER`","index$":1},{"active":true,"name":"attribute","req":false,"short":"Card attribute (for monsters)","type":"`$STRING`","index$":2},{"active":true,"name":"cardType","req":false,"short":"Type of card (Monster, Spell, Trap, etc.)","type":"`$STRING`","index$":3},{"active":true,"name":"def","req":false,"short":"Defense points","type":"`$INTEGER`","index$":4},{"active":true,"name":"format","req":false,"short":"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)","type":"`$ARRAY`","index$":5},{"active":true,"name":"konamiId","req":false,"short":"Konami database ID","type":"`$STRING`","index$":6},{"active":true,"name":"level","req":false,"short":"Level of the monster card","type":"`$INTEGER`","index$":7},{"active":true,"name":"linkRating","req":false,"short":"Link rating for Link monsters","type":"`$INTEGER`","index$":8},{"active":true,"name":"name","req":false,"short":"Card name in multiple languages","type":"`$OBJECT`","index$":9},{"active":true,"name":"password","req":false,"short":"8-digit card password/ID","type":"`$STRING`","index$":10},{"active":true,"name":"rank","req":false,"short":"Rank of XYZ monster","type":"`$INTEGER`","index$":11},{"active":true,"name":"text","req":false,"short":"Card text in multiple languages","type":"`$OBJECT`","index$":12},{"active":true,"name":"type","req":false,"short":"Monster type or spell/trap subtype","type":"`$STRING`","index$":13}],"name":"card","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"00010000","kind":"param","name":"card_id","orig":"card_id","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"GET /data/cards/{cardId}.json","json":"{\"operationId\":\"getOcgTcgCardById\",\"parameters\":[{\"description\":\"Card password (e.g., '00010000') or Konami ID (e.g., 'kdb5000') or Yugipedia page ID (e.g., 'yugipedia123456')\",\"example\":\"00010000\",\"in\":\"path\",\"name\":\"cardId\",\"required\":true,\"schema\":{\"pattern\":\"^(\\\\d{8}|kdb\\\\d+|yugipedia\\\\d+)$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.\",\"properties\":{\"archetype\":{\"description\":\"Archetypes the card belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"atk\":{\"description\":\"Attack points\",\"nullable\":true,\"type\":\"integer\"},\"attribute\":{\"description\":\"Card attribute (for monsters)\",\"enum\":[\"DARK\",\"LIGHT\",\"EARTH\",\"WATER\",\"FIRE\",\"WIND\",\"DIVINE\"],\"type\":\"string\"},\"cardType\":{\"description\":\"Type of card (Monster, Spell, Trap, etc.)\",\"enum\":[\"Monster\",\"Spell\",\"Trap\"],\"type\":\"string\"},\"def\":{\"description\":\"Defense points\",\"nullable\":true,\"type\":\"integer\"},\"format\":{\"description\":\"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)\",\"items\":{\"enum\":[\"OCG\",\"TCG\",\"Master Duel\",\"Rush Duel\",\"Speed Duel\"],\"type\":\"string\"},\"type\":\"array\"},\"konamiId\":{\"description\":\"Konami database ID\",\"example\":\"kdb5000\",\"type\":\"string\"},\"level\":{\"description\":\"Level of the monster card\",\"type\":\"integer\"},\"linkRating\":{\"description\":\"Link rating for Link monsters\",\"type\":\"integer\"},\"name\":{\"description\":\"Card name in multiple languages\",\"properties\":{\"de\":{\"description\":\"German name\",\"type\":\"string\"},\"en\":{\"description\":\"English name\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish name\",\"type\":\"string\"},\"fr\":{\"description\":\"French name\",\"type\":\"string\"},\"it\":{\"description\":\"Italian name\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese name\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean name\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese name\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese name\",\"type\":\"string\"}},\"type\":\"object\"},\"password\":{\"description\":\"8-digit card password/ID\",\"example\":\"00010000\",\"type\":\"string\"},\"rank\":{\"description\":\"Rank of XYZ monster\",\"type\":\"integer\"},\"text\":{\"description\":\"Card text in multiple languages\",\"properties\":{\"de\":{\"description\":\"German card text\",\"type\":\"string\"},\"en\":{\"description\":\"English card text\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish card text\",\"type\":\"string\"},\"fr\":{\"description\":\"French card text\",\"type\":\"string\"},\"it\":{\"description\":\"Italian card text\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese card text\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean card text\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese card text\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese card text\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"description\":\"Monster type or spell/trap subtype\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response containing the card data\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cards/{cardId}.json","segments":[{"lit":"data"},{"lit":"cards"},{"lit":"{cardId}.json"}],"select":{"$action":"card_id","exist":["card_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":"15150","kind":"param","name":"konami_id","orig":"konami_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /data/rush/{konamiId}.json","json":"{\"operationId\":\"getRushDuelCardById\",\"parameters\":[{\"description\":\"Konami ID for the Rush Duel card\",\"example\":\"15150\",\"in\":\"path\",\"name\":\"konamiId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.\",\"properties\":{\"archetype\":{\"description\":\"Archetypes the card belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"atk\":{\"description\":\"Attack points\",\"nullable\":true,\"type\":\"integer\"},\"attribute\":{\"description\":\"Card attribute (for monsters)\",\"enum\":[\"DARK\",\"LIGHT\",\"EARTH\",\"WATER\",\"FIRE\",\"WIND\",\"DIVINE\"],\"type\":\"string\"},\"cardType\":{\"description\":\"Type of card (Monster, Spell, Trap, etc.)\",\"enum\":[\"Monster\",\"Spell\",\"Trap\"],\"type\":\"string\"},\"def\":{\"description\":\"Defense points\",\"nullable\":true,\"type\":\"integer\"},\"format\":{\"description\":\"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)\",\"items\":{\"enum\":[\"OCG\",\"TCG\",\"Master Duel\",\"Rush Duel\",\"Speed Duel\"],\"type\":\"string\"},\"type\":\"array\"},\"konamiId\":{\"description\":\"Konami database ID\",\"example\":\"kdb5000\",\"type\":\"string\"},\"level\":{\"description\":\"Level of the monster card\",\"type\":\"integer\"},\"linkRating\":{\"description\":\"Link rating for Link monsters\",\"type\":\"integer\"},\"name\":{\"description\":\"Card name in multiple languages\",\"properties\":{\"de\":{\"description\":\"German name\",\"type\":\"string\"},\"en\":{\"description\":\"English name\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish name\",\"type\":\"string\"},\"fr\":{\"description\":\"French name\",\"type\":\"string\"},\"it\":{\"description\":\"Italian name\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese name\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean name\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese name\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese name\",\"type\":\"string\"}},\"type\":\"object\"},\"password\":{\"description\":\"8-digit card password/ID\",\"example\":\"00010000\",\"type\":\"string\"},\"rank\":{\"description\":\"Rank of XYZ monster\",\"type\":\"integer\"},\"text\":{\"description\":\"Card text in multiple languages\",\"properties\":{\"de\":{\"description\":\"German card text\",\"type\":\"string\"},\"en\":{\"description\":\"English card text\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish card text\",\"type\":\"string\"},\"fr\":{\"description\":\"French card text\",\"type\":\"string\"},\"it\":{\"description\":\"Italian card text\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese card text\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean card text\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese card text\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese card text\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"description\":\"Monster type or spell/trap subtype\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response containing the Rush Duel card data\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/rush/{konamiId}.json","segments":[{"lit":"data"},{"lit":"rush"},{"lit":"{konamiId}.json"}],"select":{"exist":["konami_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /cards.json","json":"{\"operationId\":\"getAllOcgTcgCards\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.\",\"properties\":{\"archetype\":{\"description\":\"Archetypes the card belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"atk\":{\"description\":\"Attack points\",\"nullable\":true,\"type\":\"integer\"},\"attribute\":{\"description\":\"Card attribute (for monsters)\",\"enum\":[\"DARK\",\"LIGHT\",\"EARTH\",\"WATER\",\"FIRE\",\"WIND\",\"DIVINE\"],\"type\":\"string\"},\"cardType\":{\"description\":\"Type of card (Monster, Spell, Trap, etc.)\",\"enum\":[\"Monster\",\"Spell\",\"Trap\"],\"type\":\"string\"},\"def\":{\"description\":\"Defense points\",\"nullable\":true,\"type\":\"integer\"},\"format\":{\"description\":\"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)\",\"items\":{\"enum\":[\"OCG\",\"TCG\",\"Master Duel\",\"Rush Duel\",\"Speed Duel\"],\"type\":\"string\"},\"type\":\"array\"},\"konamiId\":{\"description\":\"Konami database ID\",\"example\":\"kdb5000\",\"type\":\"string\"},\"level\":{\"description\":\"Level of the monster card\",\"type\":\"integer\"},\"linkRating\":{\"description\":\"Link rating for Link monsters\",\"type\":\"integer\"},\"name\":{\"description\":\"Card name in multiple languages\",\"properties\":{\"de\":{\"description\":\"German name\",\"type\":\"string\"},\"en\":{\"description\":\"English name\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish name\",\"type\":\"string\"},\"fr\":{\"description\":\"French name\",\"type\":\"string\"},\"it\":{\"description\":\"Italian name\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese name\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean name\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese name\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese name\",\"type\":\"string\"}},\"type\":\"object\"},\"password\":{\"description\":\"8-digit card password/ID\",\"example\":\"00010000\",\"type\":\"string\"},\"rank\":{\"description\":\"Rank of XYZ monster\",\"type\":\"integer\"},\"text\":{\"description\":\"Card text in multiple languages\",\"properties\":{\"de\":{\"description\":\"German card text\",\"type\":\"string\"},\"en\":{\"description\":\"English card text\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish card text\",\"type\":\"string\"},\"fr\":{\"description\":\"French card text\",\"type\":\"string\"},\"it\":{\"description\":\"Italian card text\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese card text\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean card text\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese card text\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese card text\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"description\":\"Monster type or spell/trap subtype\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response containing all OCG/TCG cards\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cards.json","segments":[{"lit":"cards.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{},"contract":{"id":"GET /master-duel-raw.json","json":"{\"operationId\":\"getAllMasterDuelCards\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.\",\"properties\":{\"archetype\":{\"description\":\"Archetypes the card belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"atk\":{\"description\":\"Attack points\",\"nullable\":true,\"type\":\"integer\"},\"attribute\":{\"description\":\"Card attribute (for monsters)\",\"enum\":[\"DARK\",\"LIGHT\",\"EARTH\",\"WATER\",\"FIRE\",\"WIND\",\"DIVINE\"],\"type\":\"string\"},\"cardType\":{\"description\":\"Type of card (Monster, Spell, Trap, etc.)\",\"enum\":[\"Monster\",\"Spell\",\"Trap\"],\"type\":\"string\"},\"def\":{\"description\":\"Defense points\",\"nullable\":true,\"type\":\"integer\"},\"format\":{\"description\":\"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)\",\"items\":{\"enum\":[\"OCG\",\"TCG\",\"Master Duel\",\"Rush Duel\",\"Speed Duel\"],\"type\":\"string\"},\"type\":\"array\"},\"konamiId\":{\"description\":\"Konami database ID\",\"example\":\"kdb5000\",\"type\":\"string\"},\"level\":{\"description\":\"Level of the monster card\",\"type\":\"integer\"},\"linkRating\":{\"description\":\"Link rating for Link monsters\",\"type\":\"integer\"},\"name\":{\"description\":\"Card name in multiple languages\",\"properties\":{\"de\":{\"description\":\"German name\",\"type\":\"string\"},\"en\":{\"description\":\"English name\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish name\",\"type\":\"string\"},\"fr\":{\"description\":\"French name\",\"type\":\"string\"},\"it\":{\"description\":\"Italian name\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese name\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean name\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese name\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese name\",\"type\":\"string\"}},\"type\":\"object\"},\"password\":{\"description\":\"8-digit card password/ID\",\"example\":\"00010000\",\"type\":\"string\"},\"rank\":{\"description\":\"Rank of XYZ monster\",\"type\":\"integer\"},\"text\":{\"description\":\"Card text in multiple languages\",\"properties\":{\"de\":{\"description\":\"German card text\",\"type\":\"string\"},\"en\":{\"description\":\"English card text\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish card text\",\"type\":\"string\"},\"fr\":{\"description\":\"French card text\",\"type\":\"string\"},\"it\":{\"description\":\"Italian card text\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese card text\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean card text\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese card text\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese card text\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"description\":\"Monster type or spell/trap subtype\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response containing all Master Duel cards\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/master-duel-raw.json","segments":[{"lit":"master-duel-raw.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3},{"active":true,"args":{},"contract":{"id":"GET /rush.json","json":"{\"operationId\":\"getAllRushDuelCards\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.\",\"properties\":{\"archetype\":{\"description\":\"Archetypes the card belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"atk\":{\"description\":\"Attack points\",\"nullable\":true,\"type\":\"integer\"},\"attribute\":{\"description\":\"Card attribute (for monsters)\",\"enum\":[\"DARK\",\"LIGHT\",\"EARTH\",\"WATER\",\"FIRE\",\"WIND\",\"DIVINE\"],\"type\":\"string\"},\"cardType\":{\"description\":\"Type of card (Monster, Spell, Trap, etc.)\",\"enum\":[\"Monster\",\"Spell\",\"Trap\"],\"type\":\"string\"},\"def\":{\"description\":\"Defense points\",\"nullable\":true,\"type\":\"integer\"},\"format\":{\"description\":\"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)\",\"items\":{\"enum\":[\"OCG\",\"TCG\",\"Master Duel\",\"Rush Duel\",\"Speed Duel\"],\"type\":\"string\"},\"type\":\"array\"},\"konamiId\":{\"description\":\"Konami database ID\",\"example\":\"kdb5000\",\"type\":\"string\"},\"level\":{\"description\":\"Level of the monster card\",\"type\":\"integer\"},\"linkRating\":{\"description\":\"Link rating for Link monsters\",\"type\":\"integer\"},\"name\":{\"description\":\"Card name in multiple languages\",\"properties\":{\"de\":{\"description\":\"German name\",\"type\":\"string\"},\"en\":{\"description\":\"English name\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish name\",\"type\":\"string\"},\"fr\":{\"description\":\"French name\",\"type\":\"string\"},\"it\":{\"description\":\"Italian name\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese name\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean name\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese name\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese name\",\"type\":\"string\"}},\"type\":\"object\"},\"password\":{\"description\":\"8-digit card password/ID\",\"example\":\"00010000\",\"type\":\"string\"},\"rank\":{\"description\":\"Rank of XYZ monster\",\"type\":\"integer\"},\"text\":{\"description\":\"Card text in multiple languages\",\"properties\":{\"de\":{\"description\":\"German card text\",\"type\":\"string\"},\"en\":{\"description\":\"English card text\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish card text\",\"type\":\"string\"},\"fr\":{\"description\":\"French card text\",\"type\":\"string\"},\"it\":{\"description\":\"Italian card text\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese card text\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean card text\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese card text\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese card text\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"description\":\"Monster type or spell/trap subtype\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response containing all Rush Duel cards\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/rush.json","segments":[{"lit":"rush.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"card","name__orig":"card","Name":"Card","name_":"card","name-":"card","NAME":"CARD","index$":1}, {"active":true,"entity":"card","key$":"BasicCardFlow","kind":"basic","name":"BasicCardFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"card_ref01"}}],"index$":0}]}, 'Card')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let card_ref01_data = Object.values(setup.data.existing.card)[0] as any

    // LIST
    const card_ref01_ent = client.Card()
    const card_ref01_match: any = {}

    const card_ref01_list = (await card_ref01_ent.list(card_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/card/CardTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = YamlYugiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['card01','card02','card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAML_YUGI_TEST_CARD_ENTID': idmap,
    'YAML_YUGI_TEST_LIVE': 'FALSE',
    'YAML_YUGI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['YAML_YUGI_TEST_CARD_ENTID']

  const live = 'TRUE' === env.YAML_YUGI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAML_YUGI_TEST_CARD_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new YamlYugiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.YAML_YUGI_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
