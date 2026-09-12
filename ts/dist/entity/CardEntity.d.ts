import { YamlYugiEntityBase } from '../YamlYugiEntityBase';
import type { YamlYugiSDK } from '../YamlYugiSDK';
import type { Control } from '../types';
import type { Card, CardListMatch } from '../YamlYugiTypes';
declare class CardEntity extends YamlYugiEntityBase<Card> {
    constructor(client: YamlYugiSDK, entopts: any);
    make(this: CardEntity): CardEntity;
    list(this: any, reqmatch?: CardListMatch, ctrl?: Control): Promise<CardEntity[]>;
}
export { CardEntity };
