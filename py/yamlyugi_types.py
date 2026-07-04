# Typed models for the YamlYugi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Aggregation:
    pass


@dataclass
class AggregationLoadMatch:
    pass


@dataclass
class Card:
    archetype: Optional[list] = None
    atk: Optional[int] = None
    attribute: Optional[str] = None
    card_type: Optional[str] = None
    format: Optional[list] = None
    konami_id: Optional[str] = None
    level: Optional[int] = None
    link_rating: Optional[int] = None
    name: Optional[dict] = None
    password: Optional[str] = None
    rank: Optional[int] = None
    text: Optional[dict] = None
    type: Optional[str] = None


@dataclass
class CardListMatch:
    card_id: str
    konami_id: str


@dataclass
class IndividualCard:
    pass


@dataclass
class IndividualCardLoadMatch:
    card_id: str
    konami_id: str
    yugipedia_id: str


@dataclass
class Series:
    card: Optional[list] = None
    name: Optional[dict] = None


@dataclass
class SeriesListMatch:
    card: Optional[list] = None
    name: Optional[dict] = None


@dataclass
class SeriesAndArchetype:
    card: Optional[list] = None
    name: Optional[dict] = None


@dataclass
class SeriesAndArchetypeLoadMatch:
    card: Optional[list] = None
    name: Optional[dict] = None


@dataclass
class Skill:
    card_type: Optional[str] = None
    character: Optional[str] = None
    name: Optional[dict] = None
    text: Optional[dict] = None
    yugipedia_id: Optional[str] = None


@dataclass
class SkillListMatch:
    card_type: Optional[str] = None
    character: Optional[str] = None
    name: Optional[dict] = None
    text: Optional[dict] = None
    yugipedia_id: Optional[str] = None


@dataclass
class SkillCard:
    card_type: Optional[str] = None
    character: Optional[str] = None
    name: Optional[dict] = None
    text: Optional[dict] = None
    yugipedia_id: Optional[str] = None


@dataclass
class SkillCardLoadMatch:
    yugipedia_id: str

