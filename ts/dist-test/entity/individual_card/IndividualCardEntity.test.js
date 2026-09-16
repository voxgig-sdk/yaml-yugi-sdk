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
(0, node_test_1.describe)('IndividualCardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when YAML_YUGI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('YAML_YUGI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.YamlYugiSDK.test();
        const ent = testsdk.IndividualCard();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.YAML_YUGI_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'individual_card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "individual_card", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "00010000", "kind": "param", "name": "card_id", "orig": "card_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /data/cards/{cardId}.yaml", "json": "{\"operationId\":\"getOcgTcgCardByIdYaml\",\"parameters\":[{\"description\":\"Card password (e.g., '00010000') or Konami ID (e.g., 'kdb5000') or Yugipedia page ID (e.g., 'yugipedia123456')\",\"example\":\"00010000\",\"in\":\"path\",\"name\":\"cardId\",\"required\":true,\"schema\":{\"pattern\":\"^(\\\\d{8}|kdb\\\\d+|yugipedia\\\\d+)$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/yaml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response containing the card data in YAML format\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/data/cards/{cardId}.yaml", "segments": [{ "lit": "data" }, { "lit": "cards" }, { "lit": "{cardId}.yaml" }], "select": { "exist": ["card_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "example": "15150", "kind": "param", "name": "konami_id", "orig": "konami_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /data/rush/{konamiId}.yaml", "json": "{\"operationId\":\"getRushDuelCardByIdYaml\",\"parameters\":[{\"description\":\"Konami ID for the Rush Duel card\",\"example\":\"15150\",\"in\":\"path\",\"name\":\"konamiId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/yaml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response containing the Rush Duel card data in YAML format\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/data/rush/{konamiId}.yaml", "segments": [{ "lit": "data" }, { "lit": "rush" }, { "lit": "{konamiId}.yaml" }], "select": { "exist": ["konami_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "params": [{ "active": true, "example": "yugipedia585581", "kind": "param", "name": "yugipedia_id", "orig": "yugipedia_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /data/tcg-speed-skill/{yugipediaId}.yaml", "json": "{\"operationId\":\"getSpeedDuelSkillCardByIdYaml\",\"parameters\":[{\"description\":\"Yugipedia page ID for the Speed Duel Skill Card (e.g., 'yugipedia585581')\",\"example\":\"yugipedia585581\",\"in\":\"path\",\"name\":\"yugipediaId\",\"required\":true,\"schema\":{\"pattern\":\"^yugipedia\\\\d+$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/yaml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response containing the Speed Duel Skill Card data in YAML format\"},\"404\":{\"description\":\"Card not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/data/tcg-speed-skill/{yugipediaId}.yaml", "segments": [{ "lit": "data" }, { "lit": "tcg-speed-skill" }, { "lit": "{yugipediaId}.yaml" }], "select": { "exist": ["yugipedia_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "individual_card", "name__orig": "individual_card", "Name": "IndividualCard", "name_": "individual_card", "name-": "individual-card", "NAME": "INDIVIDUAL_CARD", "index$": 2 }, { "active": true, "entity": "individual_card", "key$": "BasicIndividualCardFlow", "kind": "basic", "name": "BasicIndividualCardFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "individual_card_ref01", "srcdatavar": "individual_card_ref01_data", "suffix": "_dt0" }, "match": { "yugipedia_id": "yugipedia01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-individual_card_ref01" } }], "index$": 0 }] }, 'IndividualCard');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let individual_card_ref01_data = Object.values(setup.data.existing.individual_card)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const individual_card_ref01_ent = client.IndividualCard();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/individual_card/IndividualCardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.YamlYugiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['individual_card01', 'individual_card02', 'individual_card03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'YAML_YUGI_TEST_INDIVIDUAL_CARD_ENTID': idmap,
        'YAML_YUGI_TEST_LIVE': 'FALSE',
        'YAML_YUGI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['YAML_YUGI_TEST_INDIVIDUAL_CARD_ENTID'];
    const live = 'TRUE' === env.YAML_YUGI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['YAML_YUGI_TEST_INDIVIDUAL_CARD_ENTID'];
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
//# sourceMappingURL=IndividualCardEntity.test.js.map