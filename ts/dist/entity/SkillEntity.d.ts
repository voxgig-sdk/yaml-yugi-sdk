import { YamlYugiEntityBase } from '../YamlYugiEntityBase';
import type { YamlYugiSDK } from '../YamlYugiSDK';
import type { Control } from '../types';
import type { Skill, SkillListMatch } from '../YamlYugiTypes';
declare class SkillEntity extends YamlYugiEntityBase<Skill> {
    constructor(client: YamlYugiSDK, entopts: any);
    make(this: SkillEntity): SkillEntity;
    list(this: any, reqmatch?: SkillListMatch, ctrl?: Control): Promise<SkillEntity[]>;
}
export { SkillEntity };
