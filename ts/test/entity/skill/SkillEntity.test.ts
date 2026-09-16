

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


describe('SkillEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAML_YUGI_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAML_YUGI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YamlYugiSDK.test()
    const ent = testsdk.Skill()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAML_YUGI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'skill.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cardType","req":false,"short":"Type identifier for skill cards","type":"`$STRING`","index$":0},{"active":true,"name":"character","req":false,"short":"Character associated with the skill","type":"`$STRING`","index$":1},{"active":true,"name":"name","req":false,"short":"Skill card name in multiple languages","type":"`$OBJECT`","index$":2},{"active":true,"name":"text","req":false,"short":"Skill card text in multiple languages","type":"`$OBJECT`","index$":3},{"active":true,"name":"yugipediaId","req":false,"short":"Yugipedia page ID","type":"`$STRING`","index$":4}],"name":"skill","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /skill.json","json":"{\"operationId\":\"getAllSpeedDuelSkillCards\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Represents a TCG Speed Duel Skill Card.\",\"properties\":{\"cardType\":{\"description\":\"Type identifier for skill cards\",\"enum\":[\"Skill\"],\"type\":\"string\"},\"character\":{\"description\":\"Character associated with the skill\",\"type\":\"string\"},\"name\":{\"description\":\"Skill card name in multiple languages\",\"properties\":{\"en\":{\"description\":\"English name\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Skill card text in multiple languages\",\"properties\":{\"en\":{\"description\":\"English skill text\",\"type\":\"string\"}},\"type\":\"object\"},\"yugipediaId\":{\"description\":\"Yugipedia page ID\",\"example\":\"yugipedia585581\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response containing all TCG Speed Duel Skill Cards\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/skill.json","segments":[{"lit":"skill.json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"skill","name__orig":"skill","Name":"Skill","name_":"skill","name-":"skill","NAME":"SKILL","index$":5}, {"active":true,"entity":"skill","key$":"BasicSkillFlow","kind":"basic","name":"BasicSkillFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"skill_ref01"}}],"index$":0}]}, 'Skill')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let skill_ref01_data = Object.values(setup.data.existing.skill)[0] as any

    // LIST
    const skill_ref01_ent = client.Skill()
    const skill_ref01_match: any = {}

    const skill_ref01_list = (await skill_ref01_ent.list(skill_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/skill/SkillTestData.json')

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
    ['skill01','skill02','skill03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAML_YUGI_TEST_SKILL_ENTID': idmap,
    'YAML_YUGI_TEST_LIVE': 'FALSE',
    'YAML_YUGI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['YAML_YUGI_TEST_SKILL_ENTID']

  const live = 'TRUE' === env.YAML_YUGI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAML_YUGI_TEST_SKILL_ENTID']
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
  
