

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"individual_card","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /data/cards/{cardId}.yaml","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"00010000","k":"param","n":"card_id","or":"card_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/data/cards/{cardId}.yaml","q":{"exist":["card_id"]},"r":{},"s":[{"lit":"data"},{"lit":"cards"},{"lit":"{cardId}.yaml"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /data/rush/{konamiId}.yaml","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"15150","k":"param","n":"konami_id","or":"konami_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/data/rush/{konamiId}.yaml","q":{"exist":["konami_id"]},"r":{},"s":[{"lit":"data"},{"lit":"rush"},{"lit":"{konamiId}.yaml"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /data/tcg-speed-skill/{yugipediaId}.yaml","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"yugipedia585581","k":"param","n":"yugipedia_id","or":"yugipedia_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/data/tcg-speed-skill/{yugipediaId}.yaml","q":{"exist":["yugipedia_id"]},"r":{},"s":[{"lit":"data"},{"lit":"tcg-speed-skill"},{"lit":"{yugipediaId}.yaml"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"individual_card","name__orig":"individual_card","Name":"IndividualCard","name_":"individual_card","name-":"individual-card","NAME":"INDIVIDUAL_CARD","index$":2}, {"active":true,"entity":"individual_card","key$":"BasicIndividualCardFlow","kind":"basic","name":"BasicIndividualCardFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"individual_card_ref01","srcdatavar":"individual_card_ref01_data","suffix":"_dt0"},"m":{"yugipedia_id":"yugipedia01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-individual_card_ref01"}}],"index$":0}]}, 'IndividualCard', {"GET /data/cards/{cardId}.yaml":{"protocol":"http","operationId":"getOcgTcgCardByIdYaml","responses":{"200":{"description":"Successful response containing the card data in YAML format","content":{"text/yaml":{"schema":{"type":"string"}}}},"404":{"description":"Card not found"}},"parameters":[{"name":"cardId","in":"path","description":"Card password (e.g., '00010000') or Konami ID (e.g., 'kdb5000') or Yugipedia page ID (e.g., 'yugipedia123456')","required":true,"schema":{"type":"string","pattern":"^(\\d{8}|kdb\\d+|yugipedia\\d+)$"},"example":"00010000","index$":0}],"securitySource":"unspecified"},"GET /data/rush/{konamiId}.yaml":{"protocol":"http","operationId":"getRushDuelCardByIdYaml","responses":{"200":{"description":"Successful response containing the Rush Duel card data in YAML format","content":{"text/yaml":{"schema":{"type":"string"}}}},"404":{"description":"Card not found"}},"parameters":[{"name":"konamiId","in":"path","description":"Konami ID for the Rush Duel card","required":true,"schema":{"type":"string"},"example":"15150","index$":0}],"securitySource":"unspecified"},"GET /data/tcg-speed-skill/{yugipediaId}.yaml":{"protocol":"http","operationId":"getSpeedDuelSkillCardByIdYaml","responses":{"200":{"description":"Successful response containing the Speed Duel Skill Card data in YAML format","content":{"text/yaml":{"schema":{"type":"string"}}}},"404":{"description":"Card not found"}},"parameters":[{"name":"yugipediaId","in":"path","description":"Yugipedia page ID for the Speed Duel Skill Card (e.g., 'yugipedia585581')","required":true,"schema":{"type":"string","pattern":"^yugipedia\\d+$"},"example":"yugipedia585581","index$":0}],"securitySource":"unspecified"}})
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
    ['individual_card01','individual_card02','individual_card03','yugipedia01'],
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
  
