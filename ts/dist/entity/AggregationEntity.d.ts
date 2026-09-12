import { YamlYugiEntityBase } from '../YamlYugiEntityBase';
import type { YamlYugiSDK } from '../YamlYugiSDK';
import type { Control } from '../types';
import type { Aggregation, AggregationLoadMatch } from '../YamlYugiTypes';
declare class AggregationEntity extends YamlYugiEntityBase<Aggregation> {
    constructor(client: YamlYugiSDK, entopts: any);
    make(this: AggregationEntity): AggregationEntity;
    load(this: any, reqmatch?: AggregationLoadMatch, ctrl?: Control): Promise<AggregationEntity>;
}
export { AggregationEntity };
