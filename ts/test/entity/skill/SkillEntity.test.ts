

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cardType":{"a":true,"h":"Card Type","n":"cardType","r":false,"sh":"Type identifier for skill cards","t":"`$STRING`","key$":"cardType","index$":0},"character":{"a":true,"h":"Character","n":"character","r":false,"sh":"Character associated with the skill","t":"`$STRING`","key$":"character","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Skill card name in multiple languages","t":"`$OBJECT`","key$":"name","index$":2},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"Skill card text in multiple languages","t":"`$OBJECT`","key$":"text","index$":3},"yugipediaId":{"a":true,"h":"Yugipedia Id","n":"yugipediaId","r":false,"sh":"Yugipedia page ID","t":"`$STRING`","key$":"yugipediaId","index$":4}},"name":"skill","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /skill.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/skill.json","q":{},"r":{},"s":[{"lit":"skill.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"skill","name__orig":"skill","Name":"Skill","name_":"skill","name-":"skill","NAME":"SKILL","index$":5}, {"active":true,"entity":"skill","key$":"BasicSkillFlow","kind":"basic","name":"BasicSkillFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"skill_ref01"}}],"index$":0}]}, 'Skill', {"GET /skill.json":{"protocol":"http","operationId":"getAllSpeedDuelSkillCards","responses":{"200":{"description":"Successful response containing all TCG Speed Duel Skill Cards","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"Represents a TCG Speed Duel Skill Card.","properties":{"yugipediaId":{"description":"Yugipedia page ID","example":"yugipedia585581","key$":"yugipediaId","type":"string"},"name":{"description":"Skill card name in multiple languages","key$":"name","properties":{"en":{"description":"English name","type":"string"}},"type":"object"},"text":{"description":"Skill card text in multiple languages","key$":"text","properties":{"en":{"description":"English skill text","type":"string"}},"type":"object"},"character":{"description":"Character associated with the skill","key$":"character","type":"string"},"cardType":{"description":"Type identifier for skill cards","enum":["Skill"],"key$":"cardType","type":"string"}},"x-ref":"#/components/schemas/SkillCard","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
