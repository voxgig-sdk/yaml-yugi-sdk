

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


describe('SeriesAndArchetypeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAML_YUGI_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAML_YUGI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YamlYugiSDK.test()
    const ent = testsdk.SeriesAndArchetype()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAML_YUGI_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'series_and_archetype.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cards","req":false,"short":"List of card IDs belonging to this series/archetype","type":"`$ARRAY`","index$":0},{"active":true,"name":"name","req":false,"short":"Series/archetype name in multiple languages","type":"`$OBJECT`","index$":1}],"name":"series_and_archetype","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /data/series/list.yaml","json":"{\"operationId\":\"getSeriesListYaml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/yaml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response containing series and archetypes as a list in YAML format\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/series/list.yaml","segments":[{"lit":"data"},{"lit":"series"},{"lit":"list.yaml"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /data/series/map.json","json":"{\"operationId\":\"getSeriesMap\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":{\"description\":\"Represents a card series or archetype.\",\"properties\":{\"cards\":{\"description\":\"List of card IDs belonging to this series/archetype\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Series/archetype name in multiple languages\",\"properties\":{\"de\":{\"description\":\"German name\",\"type\":\"string\"},\"en\":{\"description\":\"English name\",\"type\":\"string\"},\"es\":{\"description\":\"Spanish name\",\"type\":\"string\"},\"fr\":{\"description\":\"French name\",\"type\":\"string\"},\"it\":{\"description\":\"Italian name\",\"type\":\"string\"},\"ja\":{\"description\":\"Japanese name\",\"type\":\"string\"},\"ko\":{\"description\":\"Korean name\",\"type\":\"string\"},\"pt\":{\"description\":\"Portuguese name\",\"type\":\"string\"},\"zh\":{\"description\":\"Chinese name\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"object\"}}},\"description\":\"Successful response containing series and archetypes as a mapping\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/series/map.json","segments":[{"lit":"data"},{"lit":"series"},{"lit":"map.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"GET /data/series/map.yaml","json":"{\"operationId\":\"getSeriesMapYaml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/yaml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response containing series and archetypes as a mapping in YAML format\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/series/map.yaml","segments":[{"lit":"data"},{"lit":"series"},{"lit":"map.yaml"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"series_and_archetype","name__orig":"series_and_archetype","Name":"SeriesAndArchetype","name_":"series_and_archetype","name-":"series-and-archetype","NAME":"SERIES_AND_ARCHETYPE","index$":4}, {"active":true,"entity":"series_and_archetype","key$":"BasicSeriesAndArchetypeFlow","kind":"basic","name":"BasicSeriesAndArchetypeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"series_and_archetype_ref01","srcdatavar":"series_and_archetype_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-series_and_archetype_ref01"}}],"index$":0}]}, 'SeriesAndArchetype')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let series_and_archetype_ref01_data = Object.values(setup.data.existing.series_and_archetype)[0] as any

    // LOAD
    const series_and_archetype_ref01_ent = client.SeriesAndArchetype()
    const series_and_archetype_ref01_match_dt0: any = {}
    const series_and_archetype_ref01_data_dt0 = (await series_and_archetype_ref01_ent.load(series_and_archetype_ref01_match_dt0)).data()
    assert(null != series_and_archetype_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/series_and_archetype/SeriesAndArchetypeTestData.json')

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
    ['series_and_archetype01','series_and_archetype02','series_and_archetype03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAML_YUGI_TEST_SERIES_AND_ARCHETYPE_ENTID': idmap,
    'YAML_YUGI_TEST_LIVE': 'FALSE',
    'YAML_YUGI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['YAML_YUGI_TEST_SERIES_AND_ARCHETYPE_ENTID']

  const live = 'TRUE' === env.YAML_YUGI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAML_YUGI_TEST_SERIES_AND_ARCHETYPE_ENTID']
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
  
