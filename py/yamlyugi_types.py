# Typed models for the YamlYugi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Aggregation(TypedDict):
    pass


class AggregationLoadMatch(TypedDict):
    pass


class Card(TypedDict, total=False):
    archetype: list
    atk: int
    attribute: str
    card_type: str
    format: list
    konami_id: str
    level: int
    link_rating: int
    name: dict
    password: str
    rank: int
    text: dict
    type: str


class CardListMatch(TypedDict):
    card_id: str
    konami_id: str


class IndividualCard(TypedDict):
    pass


class IndividualCardLoadMatch(TypedDict):
    card_id: str
    konami_id: str
    yugipedia_id: str


class Series(TypedDict, total=False):
    card: list
    name: dict


class SeriesListMatch(TypedDict, total=False):
    card: list
    name: dict


class SeriesAndArchetype(TypedDict, total=False):
    card: list
    name: dict


class SeriesAndArchetypeLoadMatch(TypedDict, total=False):
    card: list
    name: dict


class Skill(TypedDict, total=False):
    card_type: str
    character: str
    name: dict
    text: dict
    yugipedia_id: str


class SkillListMatch(TypedDict, total=False):
    card_type: str
    character: str
    name: dict
    text: dict
    yugipedia_id: str


class SkillCard(TypedDict, total=False):
    card_type: str
    character: str
    name: dict
    text: dict
    yugipedia_id: str


class SkillCardLoadMatch(TypedDict):
    yugipedia_id: str
