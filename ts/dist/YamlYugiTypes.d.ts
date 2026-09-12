export interface Aggregation {
}
export interface AggregationLoadMatch {
}
export interface Card {
    archetype?: any[];
    atk?: number;
    attribute?: string;
    cardType?: string;
    def?: number;
    format?: any[];
    konamiId?: string;
    level?: number;
    linkRating?: number;
    name?: Record<string, any>;
    password?: string;
    rank?: number;
    text?: Record<string, any>;
    type?: string;
}
export interface CardListMatch {
    konami_id: string;
    $action?: string;
    [action: string]: any;
}
export interface IndividualCard {
}
export interface IndividualCardLoadMatch {
    card_id: string;
}
export interface Series {
    cards?: any[];
    name?: Record<string, any>;
}
export interface SeriesListMatch {
    cards?: any[];
    name?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface SeriesAndArchetype {
    cards?: any[];
    name?: Record<string, any>;
}
export interface SeriesAndArchetypeLoadMatch {
    cards?: any[];
    name?: Record<string, any>;
}
export interface Skill {
    cardType?: string;
    character?: string;
    name?: Record<string, any>;
    text?: Record<string, any>;
    yugipediaId?: string;
}
export interface SkillListMatch {
    cardType?: string;
    character?: string;
    name?: Record<string, any>;
    text?: Record<string, any>;
    yugipediaId?: string;
}
export interface SkillCard {
    cardType?: string;
    character?: string;
    name?: Record<string, any>;
    text?: Record<string, any>;
    yugipediaId?: string;
}
export interface SkillCardLoadMatch {
    yugipedia_id: string;
}
