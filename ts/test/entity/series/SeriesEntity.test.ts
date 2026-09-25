

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


describe('SeriesEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAML_YUGI_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAML_YUGI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YamlYugiSDK.test()
    const ent = testsdk.Series()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAML_YUGI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'series.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cards":{"a":true,"h":"Cards","n":"cards","r":false,"sh":"List of card IDs belonging to this series/archetype","t":"`$ARRAY`","key$":"cards","index$":0},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Series/archetype name in multiple languages","t":"`$OBJECT`","key$":"name","index$":1}},"name":"series","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /data/series/list.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/series/list.json","q":{"$action":"list"},"r":{},"s":[{"lit":"data"},{"lit":"series"},{"lit":"list.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"series","name__orig":"series","Name":"Series","name_":"series","name-":"series","NAME":"SERIES","index$":3}, {"active":true,"entity":"series","key$":"BasicSeriesFlow","kind":"basic","name":"BasicSeriesFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"series_ref01"}}],"index$":0}]}, 'Series', {"GET /data/series/list.json":{"protocol":"http","operationId":"getSeriesList","responses":{"200":{"description":"Successful response containing series and archetypes as a list","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Represents a card series or archetype.","properties":{"name":{"type":"object","description":"Series/archetype name in multiple languages","properties":{"en":{"type":"string","description":"English name"},"ja":{"type":"string","description":"Japanese name"},"de":{"type":"string","description":"German name"},"es":{"type":"string","description":"Spanish name"},"fr":{"type":"string","description":"French name"},"it":{"type":"string","description":"Italian name"},"pt":{"type":"string","description":"Portuguese name"},"ko":{"type":"string","description":"Korean name"},"zh":{"type":"string","description":"Chinese name"}},"key$":"name"},"cards":{"type":"array","description":"List of card IDs belonging to this series/archetype","items":{"type":"string"},"key$":"cards"}},"x-ref":"#/components/schemas/Series","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let series_ref01_data = Object.values(setup.data.existing.series)[0] as any

    // LIST
    const series_ref01_ent = client.Series()
    const series_ref01_match: any = {}

    const series_ref01_list = (await series_ref01_ent.list(series_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/series/SeriesTestData.json')

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
    ['series01','series02','series03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAML_YUGI_TEST_SERIES_ENTID': idmap,
    'YAML_YUGI_TEST_LIVE': 'FALSE',
    'YAML_YUGI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['YAML_YUGI_TEST_SERIES_ENTID']

  const live = 'TRUE' === env.YAML_YUGI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAML_YUGI_TEST_SERIES_ENTID']
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
  
