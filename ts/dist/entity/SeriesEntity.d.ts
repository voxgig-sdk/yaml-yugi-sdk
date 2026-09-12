import { YamlYugiEntityBase } from '../YamlYugiEntityBase';
import type { YamlYugiSDK } from '../YamlYugiSDK';
import type { Control } from '../types';
import type { Series, SeriesListMatch } from '../YamlYugiTypes';
declare class SeriesEntity extends YamlYugiEntityBase<Series> {
    constructor(client: YamlYugiSDK, entopts: any);
    make(this: SeriesEntity): SeriesEntity;
    list(this: any, reqmatch?: SeriesListMatch, ctrl?: Control): Promise<SeriesEntity[]>;
}
export { SeriesEntity };
