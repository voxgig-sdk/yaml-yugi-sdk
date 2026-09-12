import { AggregationEntity } from './entity/AggregationEntity';
import { CardEntity } from './entity/CardEntity';
import { IndividualCardEntity } from './entity/IndividualCardEntity';
import { SeriesEntity } from './entity/SeriesEntity';
import { SeriesAndArchetypeEntity } from './entity/SeriesAndArchetypeEntity';
import { SkillEntity } from './entity/SkillEntity';
import { SkillCardEntity } from './entity/SkillCardEntity';
export type * from './YamlYugiTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { YamlYugiEntityBase } from './YamlYugiEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class YamlYugiSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Aggregation(entopts?: Record<string, any>): AggregationEntity;
    Card(entopts?: Record<string, any>): CardEntity;
    IndividualCard(entopts?: Record<string, any>): IndividualCardEntity;
    Series(entopts?: Record<string, any>): SeriesEntity;
    SeriesAndArchetype(entopts?: Record<string, any>): SeriesAndArchetypeEntity;
    Skill(entopts?: Record<string, any>): SkillEntity;
    SkillCard(entopts?: Record<string, any>): SkillCardEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): YamlYugiSDK;
    tester(testopts?: any, sdkopts?: any): YamlYugiSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof YamlYugiSDK;
export { stdutil, config, BaseFeature, YamlYugiEntityBase, YamlYugiSDK, SDK, };
