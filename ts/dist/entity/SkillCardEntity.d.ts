import { YamlYugiEntityBase } from '../YamlYugiEntityBase';
import type { YamlYugiSDK } from '../YamlYugiSDK';
import type { Control } from '../types';
import type { SkillCard, SkillCardLoadMatch } from '../YamlYugiTypes';
declare class SkillCardEntity extends YamlYugiEntityBase<SkillCard> {
    constructor(client: YamlYugiSDK, entopts: any);
    make(this: SkillCardEntity): SkillCardEntity;
    load(this: any, reqmatch?: SkillCardLoadMatch, ctrl?: Control): Promise<SkillCardEntity>;
}
export { SkillCardEntity };
