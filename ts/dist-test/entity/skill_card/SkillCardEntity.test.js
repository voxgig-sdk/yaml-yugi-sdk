"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SkillCardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when YAML_YUGI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('YAML_YUGI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.YamlYugiSDK.test();
        const ent = testsdk.SkillCard();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.YAML_YUGI_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'skill_card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "cardType", "req": false, "short": "Type identifier for skill cards", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "character", "req": false, "short": "Character associated with the skill", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "name", "req": false, "short": "Skill card name in multiple languages", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "text", "req": false, "short": "Skill card text in multiple languages", "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "yugipediaId", "req": false, "short": "Yugipedia page ID", "type": "`$STRING`", "index$": 4 }], "name": "skill_card", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "yugipedia585581", "kind": "param", "name": "yugipedia_id", "orig": "yugipedia_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /data/tcg-speed-skill/{yugipediaId}.json", "json": "{\"operationId\":\"getSpeedDuelSkillCardById\",\"parameters\":[{\"description\":\"Yugipedia page ID for the Speed Duel Skill Card (e.g., 'yugipedia585581')\",\"example\":\"yugipedia585581\",\"in\":\"path\",\"name\":\"yugipediaId\",\"required\":true,\"schema\":{\"pattern\":\"^yugipedia\\\\d+$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Represents a TCG Speed Duel Skill Card.\",\"properties\":{\"cardType\":{\"description\":\"Type identifier for skill cards\",\"enum\":[\"Skill\"],\"type\":\"string\"},\"character\":{\"description\":\"Character associated with the skill\",\"type\":\"string\"},\"name\":{\"description\":\"Skill card name in multiple languages\",\"properties\":{\"en\":{\"description\":\"English name\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Skill card text in multiple languages\",\"properties\":{\"en\":{\"description\":\"English skill text\",\"type\":\"string\"}},\"type\":\"object\"},\"yugipediaId\":{\"description\":\"Yugipedia page ID\",\"example\":\"yugipedia585581\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response containing the Speed Duel Skill Card data\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/data/tcg-speed-skill/{yugipediaId}.json", "segments": [{ "lit": "data" }, { "lit": "tcg-speed-skill" }, { "lit": "{yugipediaId}.json" }], "select": { "exist": ["yugipedia_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "skill_card", "name__orig": "skill_card", "Name": "SkillCard", "name_": "skill_card", "name-": "skill-card", "NAME": "SKILL_CARD", "index$": 6 }, { "active": true, "entity": "skill_card", "key$": "BasicSkillCardFlow", "kind": "basic", "name": "BasicSkillCardFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "skill_card_ref01", "srcdatavar": "skill_card_ref01_data", "suffix": "_dt0" }, "match": { "yugipedia_id": "yugipedia01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-skill_card_ref01" } }], "index$": 0 }] }, 'SkillCard');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let skill_card_ref01_data = Object.values(setup.data.existing.skill_card)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const skill_card_ref01_ent = client.SkillCard();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/skill_card/SkillCardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.YamlYugiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['skill_card01', 'skill_card02', 'skill_card03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'YAML_YUGI_TEST_SKILL_CARD_ENTID': idmap,
        'YAML_YUGI_TEST_LIVE': 'FALSE',
        'YAML_YUGI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['YAML_YUGI_TEST_SKILL_CARD_ENTID'];
    const live = 'TRUE' === env.YAML_YUGI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['YAML_YUGI_TEST_SKILL_CARD_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.YamlYugiSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=SkillCardEntity.test.js.map