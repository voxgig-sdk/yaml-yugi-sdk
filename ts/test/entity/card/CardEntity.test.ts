

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"archetype":{"a":true,"h":"Archetype","n":"archetype","r":false,"sh":"Archetypes the card belongs to","t":"`$ARRAY`","key$":"archetype","index$":0},"atk":{"a":true,"h":"Atk","n":"atk","r":false,"sh":"Attack points","t":"`$INTEGER`","key$":"atk","index$":1},"attribute":{"a":true,"h":"Attribute","n":"attribute","r":false,"sh":"Card attribute (for monsters)","t":"`$STRING`","key$":"attribute","index$":2},"cardType":{"a":true,"h":"Card Type","n":"cardType","r":false,"sh":"Type of card (Monster, Spell, Trap, etc.)","t":"`$STRING`","key$":"cardType","index$":3},"def":{"a":true,"h":"Def","n":"def","r":false,"sh":"Defense points","t":"`$INTEGER`","key$":"def","index$":4},"format":{"a":true,"h":"Format","n":"format","r":false,"sh":"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)","t":"`$ARRAY`","key$":"format","index$":5},"konamiId":{"a":true,"h":"Konami Id","n":"konamiId","r":false,"sh":"Konami database ID","t":"`$STRING`","key$":"konamiId","index$":6},"level":{"a":true,"h":"Level","n":"level","r":false,"sh":"Level of the monster card","t":"`$INTEGER`","key$":"level","index$":7},"linkRating":{"a":true,"h":"Link Rating","n":"linkRating","r":false,"sh":"Link rating for Link monsters","t":"`$INTEGER`","key$":"linkRating","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Card name in multiple languages","t":"`$OBJECT`","key$":"name","index$":9},"password":{"a":true,"h":"Password","n":"password","r":false,"sh":"8-digit card password/ID","t":"`$STRING`","key$":"password","index$":10},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"Rank of XYZ monster","t":"`$INTEGER`","key$":"rank","index$":11},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"Card text in multiple languages","t":"`$OBJECT`","key$":"text","index$":12},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Monster type or spell/trap subtype","t":"`$STRING`","key$":"type","index$":13}},"name":"card","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /data/cards/{cardId}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"00010000","k":"param","n":"card_id","or":"card_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/data/cards/{cardId}.json","q":{"$action":"card_id","exist":["card_id"]},"r":{},"s":[{"lit":"data"},{"lit":"cards"},{"lit":"{cardId}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /data/rush/{konamiId}.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"15150","k":"param","n":"konami_id","or":"konami_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/data/rush/{konamiId}.json","q":{"exist":["konami_id"]},"r":{},"s":[{"lit":"data"},{"lit":"rush"},{"lit":"{konamiId}.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /cards.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/cards.json","q":{},"r":{},"s":[{"lit":"cards.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /master-duel-raw.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/master-duel-raw.json","q":{},"r":{},"s":[{"lit":"master-duel-raw.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /rush.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/rush.json","q":{},"r":{},"s":[{"lit":"rush.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"card","name__orig":"card","Name":"Card","name_":"card","name-":"card","NAME":"CARD","index$":1}, {"active":true,"entity":"card","key$":"BasicCardFlow","kind":"basic","name":"BasicCardFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"card_ref01"}}],"index$":0}]}, 'Card', {"GET /data/cards/{cardId}.json":{"protocol":"http","operationId":"getOcgTcgCardById","responses":{"200":{"description":"Successful response containing the card data","content":{"application/json":{"schema":{"type":"object","description":"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.","properties":{"password":{"description":"8-digit card password/ID","example":"00010000","key$":"password","type":"string"},"konamiId":{"description":"Konami database ID","example":"kdb5000","key$":"konamiId","type":"string"},"name":{"description":"Card name in multiple languages","key$":"name","properties":{"de":{"description":"German name","type":"string"},"en":{"description":"English name","type":"string"},"es":{"description":"Spanish name","type":"string"},"fr":{"description":"French name","type":"string"},"it":{"description":"Italian name","type":"string"},"ja":{"description":"Japanese name","type":"string"},"ko":{"description":"Korean name","type":"string"},"pt":{"description":"Portuguese name","type":"string"},"zh":{"description":"Chinese name","type":"string"}},"type":"object"},"text":{"description":"Card text in multiple languages","key$":"text","properties":{"de":{"description":"German card text","type":"string"},"en":{"description":"English card text","type":"string"},"es":{"description":"Spanish card text","type":"string"},"fr":{"description":"French card text","type":"string"},"it":{"description":"Italian card text","type":"string"},"ja":{"description":"Japanese card text","type":"string"},"ko":{"description":"Korean card text","type":"string"},"pt":{"description":"Portuguese card text","type":"string"},"zh":{"description":"Chinese card text","type":"string"}},"type":"object"},"cardType":{"description":"Type of card (Monster, Spell, Trap, etc.)","enum":["Monster","Spell","Trap"],"key$":"cardType","type":"string"},"attribute":{"description":"Card attribute (for monsters)","enum":["DARK","LIGHT","EARTH","WATER","FIRE","WIND","DIVINE"],"key$":"attribute","type":"string"},"type":{"description":"Monster type or spell/trap subtype","key$":"type","type":"string"},"level":{"description":"Level of the monster card","key$":"level","type":"integer"},"rank":{"description":"Rank of XYZ monster","key$":"rank","type":"integer"},"linkRating":{"description":"Link rating for Link monsters","key$":"linkRating","type":"integer"},"atk":{"description":"Attack points","key$":"atk","nullable":true,"type":"integer"},"def":{"description":"Defense points","key$":"def","nullable":true,"type":"integer"},"archetype":{"description":"Archetypes the card belongs to","items":{"type":"string"},"key$":"archetype","type":"array"},"format":{"description":"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)","items":{"enum":["OCG","TCG","Master Duel","Rush Duel","Speed Duel"],"type":"string"},"key$":"format","type":"array"}},"x-ref":"#/components/schemas/Card","index$":0}}}},"404":{"description":"Card not found"}},"parameters":[{"name":"cardId","in":"path","description":"Card password (e.g., '00010000') or Konami ID (e.g., 'kdb5000') or Yugipedia page ID (e.g., 'yugipedia123456')","required":true,"schema":{"type":"string","pattern":"^(\\d{8}|kdb\\d+|yugipedia\\d+)$"},"example":"00010000","index$":0}],"securitySource":"unspecified"},"GET /data/rush/{konamiId}.json":{"protocol":"http","operationId":"getRushDuelCardById","responses":{"200":{"description":"Successful response containing the Rush Duel card data","content":{"application/json":{"schema":{"type":"object","description":"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.","properties":{"password":{"description":"8-digit card password/ID","example":"00010000","key$":"password","type":"string"},"konamiId":{"description":"Konami database ID","example":"kdb5000","key$":"konamiId","type":"string"},"name":{"description":"Card name in multiple languages","key$":"name","properties":{"de":{"description":"German name","type":"string"},"en":{"description":"English name","type":"string"},"es":{"description":"Spanish name","type":"string"},"fr":{"description":"French name","type":"string"},"it":{"description":"Italian name","type":"string"},"ja":{"description":"Japanese name","type":"string"},"ko":{"description":"Korean name","type":"string"},"pt":{"description":"Portuguese name","type":"string"},"zh":{"description":"Chinese name","type":"string"}},"type":"object"},"text":{"description":"Card text in multiple languages","key$":"text","properties":{"de":{"description":"German card text","type":"string"},"en":{"description":"English card text","type":"string"},"es":{"description":"Spanish card text","type":"string"},"fr":{"description":"French card text","type":"string"},"it":{"description":"Italian card text","type":"string"},"ja":{"description":"Japanese card text","type":"string"},"ko":{"description":"Korean card text","type":"string"},"pt":{"description":"Portuguese card text","type":"string"},"zh":{"description":"Chinese card text","type":"string"}},"type":"object"},"cardType":{"description":"Type of card (Monster, Spell, Trap, etc.)","enum":["Monster","Spell","Trap"],"key$":"cardType","type":"string"},"attribute":{"description":"Card attribute (for monsters)","enum":["DARK","LIGHT","EARTH","WATER","FIRE","WIND","DIVINE"],"key$":"attribute","type":"string"},"type":{"description":"Monster type or spell/trap subtype","key$":"type","type":"string"},"level":{"description":"Level of the monster card","key$":"level","type":"integer"},"rank":{"description":"Rank of XYZ monster","key$":"rank","type":"integer"},"linkRating":{"description":"Link rating for Link monsters","key$":"linkRating","type":"integer"},"atk":{"description":"Attack points","key$":"atk","nullable":true,"type":"integer"},"def":{"description":"Defense points","key$":"def","nullable":true,"type":"integer"},"archetype":{"description":"Archetypes the card belongs to","items":{"type":"string"},"key$":"archetype","type":"array"},"format":{"description":"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)","items":{"enum":["OCG","TCG","Master Duel","Rush Duel","Speed Duel"],"type":"string"},"key$":"format","type":"array"}},"x-ref":"#/components/schemas/Card","index$":0}}}},"404":{"description":"Card not found"}},"parameters":[{"name":"konamiId","in":"path","description":"Konami ID for the Rush Duel card","required":true,"schema":{"type":"string"},"example":"15150","index$":0}],"securitySource":"unspecified"},"GET /cards.json":{"protocol":"http","operationId":"getAllOcgTcgCards","responses":{"200":{"description":"Successful response containing all OCG/TCG cards","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.","properties":{"password":{"description":"8-digit card password/ID","example":"00010000","key$":"password","type":"string"},"konamiId":{"description":"Konami database ID","example":"kdb5000","key$":"konamiId","type":"string"},"name":{"description":"Card name in multiple languages","key$":"name","properties":{"de":{"description":"German name","type":"string"},"en":{"description":"English name","type":"string"},"es":{"description":"Spanish name","type":"string"},"fr":{"description":"French name","type":"string"},"it":{"description":"Italian name","type":"string"},"ja":{"description":"Japanese name","type":"string"},"ko":{"description":"Korean name","type":"string"},"pt":{"description":"Portuguese name","type":"string"},"zh":{"description":"Chinese name","type":"string"}},"type":"object"},"text":{"description":"Card text in multiple languages","key$":"text","properties":{"de":{"description":"German card text","type":"string"},"en":{"description":"English card text","type":"string"},"es":{"description":"Spanish card text","type":"string"},"fr":{"description":"French card text","type":"string"},"it":{"description":"Italian card text","type":"string"},"ja":{"description":"Japanese card text","type":"string"},"ko":{"description":"Korean card text","type":"string"},"pt":{"description":"Portuguese card text","type":"string"},"zh":{"description":"Chinese card text","type":"string"}},"type":"object"},"cardType":{"description":"Type of card (Monster, Spell, Trap, etc.)","enum":["Monster","Spell","Trap"],"key$":"cardType","type":"string"},"attribute":{"description":"Card attribute (for monsters)","enum":["DARK","LIGHT","EARTH","WATER","FIRE","WIND","DIVINE"],"key$":"attribute","type":"string"},"type":{"description":"Monster type or spell/trap subtype","key$":"type","type":"string"},"level":{"description":"Level of the monster card","key$":"level","type":"integer"},"rank":{"description":"Rank of XYZ monster","key$":"rank","type":"integer"},"linkRating":{"description":"Link rating for Link monsters","key$":"linkRating","type":"integer"},"atk":{"description":"Attack points","key$":"atk","nullable":true,"type":"integer"},"def":{"description":"Defense points","key$":"def","nullable":true,"type":"integer"},"archetype":{"description":"Archetypes the card belongs to","items":{"type":"string"},"key$":"archetype","type":"array"},"format":{"description":"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)","items":{"enum":["OCG","TCG","Master Duel","Rush Duel","Speed Duel"],"type":"string"},"key$":"format","type":"array"}},"x-ref":"#/components/schemas/Card","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /master-duel-raw.json":{"protocol":"http","operationId":"getAllMasterDuelCards","responses":{"200":{"description":"Successful response containing all Master Duel cards","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.","properties":{"password":{"description":"8-digit card password/ID","example":"00010000","key$":"password","type":"string"},"konamiId":{"description":"Konami database ID","example":"kdb5000","key$":"konamiId","type":"string"},"name":{"description":"Card name in multiple languages","key$":"name","properties":{"de":{"description":"German name","type":"string"},"en":{"description":"English name","type":"string"},"es":{"description":"Spanish name","type":"string"},"fr":{"description":"French name","type":"string"},"it":{"description":"Italian name","type":"string"},"ja":{"description":"Japanese name","type":"string"},"ko":{"description":"Korean name","type":"string"},"pt":{"description":"Portuguese name","type":"string"},"zh":{"description":"Chinese name","type":"string"}},"type":"object"},"text":{"description":"Card text in multiple languages","key$":"text","properties":{"de":{"description":"German card text","type":"string"},"en":{"description":"English card text","type":"string"},"es":{"description":"Spanish card text","type":"string"},"fr":{"description":"French card text","type":"string"},"it":{"description":"Italian card text","type":"string"},"ja":{"description":"Japanese card text","type":"string"},"ko":{"description":"Korean card text","type":"string"},"pt":{"description":"Portuguese card text","type":"string"},"zh":{"description":"Chinese card text","type":"string"}},"type":"object"},"cardType":{"description":"Type of card (Monster, Spell, Trap, etc.)","enum":["Monster","Spell","Trap"],"key$":"cardType","type":"string"},"attribute":{"description":"Card attribute (for monsters)","enum":["DARK","LIGHT","EARTH","WATER","FIRE","WIND","DIVINE"],"key$":"attribute","type":"string"},"type":{"description":"Monster type or spell/trap subtype","key$":"type","type":"string"},"level":{"description":"Level of the monster card","key$":"level","type":"integer"},"rank":{"description":"Rank of XYZ monster","key$":"rank","type":"integer"},"linkRating":{"description":"Link rating for Link monsters","key$":"linkRating","type":"integer"},"atk":{"description":"Attack points","key$":"atk","nullable":true,"type":"integer"},"def":{"description":"Defense points","key$":"def","nullable":true,"type":"integer"},"archetype":{"description":"Archetypes the card belongs to","items":{"type":"string"},"key$":"archetype","type":"array"},"format":{"description":"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)","items":{"enum":["OCG","TCG","Master Duel","Rush Duel","Speed Duel"],"type":"string"},"key$":"format","type":"array"}},"x-ref":"#/components/schemas/Card","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /rush.json":{"protocol":"http","operationId":"getAllRushDuelCards","responses":{"200":{"description":"Successful response containing all Rush Duel cards","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Represents a Yu-Gi-Oh! card with comprehensive metadata and text in multiple languages.","properties":{"password":{"description":"8-digit card password/ID","example":"00010000","key$":"password","type":"string"},"konamiId":{"description":"Konami database ID","example":"kdb5000","key$":"konamiId","type":"string"},"name":{"description":"Card name in multiple languages","key$":"name","properties":{"de":{"description":"German name","type":"string"},"en":{"description":"English name","type":"string"},"es":{"description":"Spanish name","type":"string"},"fr":{"description":"French name","type":"string"},"it":{"description":"Italian name","type":"string"},"ja":{"description":"Japanese name","type":"string"},"ko":{"description":"Korean name","type":"string"},"pt":{"description":"Portuguese name","type":"string"},"zh":{"description":"Chinese name","type":"string"}},"type":"object"},"text":{"description":"Card text in multiple languages","key$":"text","properties":{"de":{"description":"German card text","type":"string"},"en":{"description":"English card text","type":"string"},"es":{"description":"Spanish card text","type":"string"},"fr":{"description":"French card text","type":"string"},"it":{"description":"Italian card text","type":"string"},"ja":{"description":"Japanese card text","type":"string"},"ko":{"description":"Korean card text","type":"string"},"pt":{"description":"Portuguese card text","type":"string"},"zh":{"description":"Chinese card text","type":"string"}},"type":"object"},"cardType":{"description":"Type of card (Monster, Spell, Trap, etc.)","enum":["Monster","Spell","Trap"],"key$":"cardType","type":"string"},"attribute":{"description":"Card attribute (for monsters)","enum":["DARK","LIGHT","EARTH","WATER","FIRE","WIND","DIVINE"],"key$":"attribute","type":"string"},"type":{"description":"Monster type or spell/trap subtype","key$":"type","type":"string"},"level":{"description":"Level of the monster card","key$":"level","type":"integer"},"rank":{"description":"Rank of XYZ monster","key$":"rank","type":"integer"},"linkRating":{"description":"Link rating for Link monsters","key$":"linkRating","type":"integer"},"atk":{"description":"Attack points","key$":"atk","nullable":true,"type":"integer"},"def":{"description":"Defense points","key$":"def","nullable":true,"type":"integer"},"archetype":{"description":"Archetypes the card belongs to","items":{"type":"string"},"key$":"archetype","type":"array"},"format":{"description":"Formats where the card is available (OCG, TCG, Master Duel, Rush Duel, Speed Duel)","items":{"enum":["OCG","TCG","Master Duel","Rush Duel","Speed Duel"],"type":"string"},"key$":"format","type":"array"}},"x-ref":"#/components/schemas/Card","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
