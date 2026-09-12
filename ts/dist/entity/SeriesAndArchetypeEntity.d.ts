import { YamlYugiEntityBase } from '../YamlYugiEntityBase';
import type { YamlYugiSDK } from '../YamlYugiSDK';
import type { Control } from '../types';
import type { SeriesAndArchetype, SeriesAndArchetypeLoadMatch } from '../YamlYugiTypes';
declare class SeriesAndArchetypeEntity extends YamlYugiEntityBase<SeriesAndArchetype> {
    constructor(client: YamlYugiSDK, entopts: any);
    make(this: SeriesAndArchetypeEntity): SeriesAndArchetypeEntity;
    load(this: any, reqmatch?: SeriesAndArchetypeLoadMatch, ctrl?: Control): Promise<SeriesAndArchetypeEntity>;
}
export { SeriesAndArchetypeEntity };
