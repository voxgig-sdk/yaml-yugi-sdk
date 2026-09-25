"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YamlYugiError = void 0;
class YamlYugiError extends Error {
    isYamlYugiError = true;
    sdk = 'YamlYugi';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.YamlYugiError = YamlYugiError;
//# sourceMappingURL=YamlYugiError.js.map