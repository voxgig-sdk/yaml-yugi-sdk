

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


describe('IndividualCardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAML_YUGI_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAML_YUGI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YamlYugiSDK.test()
    const ent = testsdk.IndividualCard()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAML_YUGI_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'individual_card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"individual_card","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"00010000","kind":"param","name":"card_id","orig":"card_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /data/cards/{cardId}.yaml","json":"{\"operationId\":\"getOcgTcgCardByIdYaml\",\"parameters\":[{\"description\":\"Card password (e.g., '00010000') or Konami ID (e.g., 'kdb5000') or Yugipedia page ID (e.g., 'yugipedia123456')\",\"example\":\"00010000\",\"in\":\"path\",\"name\":\"cardId\",\"required\":true,\"schema\":{\"pattern\":\"^(\\\\d{8}|kdb\\\\d+|yugipedia\\\\d+)$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/yaml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response containing the card data in YAML format\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/cards/{cardId}.yaml","segments":[{"lit":"data"},{"lit":"cards"},{"lit":"{cardId}.yaml"}],"select":{"exist":["card_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":"15150","kind":"param","name":"konami_id","orig":"konami_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /data/rush/{konamiId}.yaml","json":"{\"operationId\":\"getRushDuelCardByIdYaml\",\"parameters\":[{\"description\":\"Konami ID for the Rush Duel card\",\"example\":\"15150\",\"in\":\"path\",\"name\":\"konamiId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/yaml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response containing the Rush Duel card data in YAML format\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/rush/{konamiId}.yaml","segments":[{"lit":"data"},{"lit":"rush"},{"lit":"{konamiId}.yaml"}],"select":{"exist":["konami_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"example":"yugipedia585581","kind":"param","name":"yugipedia_id","orig":"yugipedia_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /data/tcg-speed-skill/{yugipediaId}.yaml","json":"{\"operationId\":\"getSpeedDuelSkillCardByIdYaml\",\"parameters\":[{\"description\":\"Yugipedia page ID for the Speed Duel Skill Card (e.g., 'yugipedia585581')\",\"example\":\"yugipedia585581\",\"in\":\"path\",\"name\":\"yugipediaId\",\"required\":true,\"schema\":{\"pattern\":\"^yugipedia\\\\d+$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/yaml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response containing the Speed Duel Skill Card data in YAML format\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/tcg-speed-skill/{yugipediaId}.yaml","segments":[{"lit":"data"},{"lit":"tcg-speed-skill"},{"lit":"{yugipediaId}.yaml"}],"select":{"exist":["yugipedia_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"individual_card","name__orig":"individual_card","Name":"IndividualCard","name_":"individual_card","name-":"individual-card","NAME":"INDIVIDUAL_CARD","index$":2}, {"active":true,"entity":"individual_card","key$":"BasicIndividualCardFlow","kind":"basic","name":"BasicIndividualCardFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"individual_card_ref01","srcdatavar":"individual_card_ref01_data","suffix":"_dt0"},"match":{"yugipedia_id":"yugipedia01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-individual_card_ref01"}}],"index$":0}]}, 'IndividualCard')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let individual_card_ref01_data = Object.values(setup.data.existing.individual_card)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const individual_card_ref01_ent = client.IndividualCard()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/individual_card/IndividualCardTestData.json')

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
    ['individual_card01','individual_card02','individual_card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAML_YUGI_TEST_INDIVIDUAL_CARD_ENTID': idmap,
    'YAML_YUGI_TEST_LIVE': 'FALSE',
    'YAML_YUGI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['YAML_YUGI_TEST_INDIVIDUAL_CARD_ENTID']

  const live = 'TRUE' === env.YAML_YUGI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAML_YUGI_TEST_INDIVIDUAL_CARD_ENTID']
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
  
