import { YamlYugiEntityBase } from '../YamlYugiEntityBase';
import type { YamlYugiSDK } from '../YamlYugiSDK';
import type { Control } from '../types';
import type { IndividualCard, IndividualCardLoadMatch } from '../YamlYugiTypes';
declare class IndividualCardEntity extends YamlYugiEntityBase<IndividualCard> {
    constructor(client: YamlYugiSDK, entopts: any);
    make(this: IndividualCardEntity): IndividualCardEntity;
    load(this: any, reqmatch?: IndividualCardLoadMatch, ctrl?: Control): Promise<IndividualCardEntity>;
}
export { IndividualCardEntity };
