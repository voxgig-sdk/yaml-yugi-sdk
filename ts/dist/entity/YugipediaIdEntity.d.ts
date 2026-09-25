import { YamlYugiEntityBase } from '../YamlYugiEntityBase';
import type { YamlYugiSDK } from '../YamlYugiSDK';
import type { Control } from '../types';
import type { YugipediaId, YugipediaIdLoadMatch } from '../YamlYugiTypes';
declare class YugipediaIdEntity extends YamlYugiEntityBase<YugipediaId> {
    constructor(client: YamlYugiSDK, entopts: any);
    make(this: YugipediaIdEntity): YugipediaIdEntity;
    load(this: any, reqmatch?: YugipediaIdLoadMatch, ctrl?: Control): Promise<YugipediaIdEntity>;
}
export { YugipediaIdEntity };
