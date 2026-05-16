package voxgigyamlyugisdk

import (
	"github.com/voxgig-sdk/yaml-yugi-sdk/core"
	"github.com/voxgig-sdk/yaml-yugi-sdk/entity"
	"github.com/voxgig-sdk/yaml-yugi-sdk/feature"
	_ "github.com/voxgig-sdk/yaml-yugi-sdk/utility"
)

// Type aliases preserve external API.
type YamlYugiSDK = core.YamlYugiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type YamlYugiEntity = core.YamlYugiEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type YamlYugiError = core.YamlYugiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAggregationEntityFunc = func(client *core.YamlYugiSDK, entopts map[string]any) core.YamlYugiEntity {
		return entity.NewAggregationEntity(client, entopts)
	}
	core.NewCardEntityFunc = func(client *core.YamlYugiSDK, entopts map[string]any) core.YamlYugiEntity {
		return entity.NewCardEntity(client, entopts)
	}
	core.NewIndividualCardEntityFunc = func(client *core.YamlYugiSDK, entopts map[string]any) core.YamlYugiEntity {
		return entity.NewIndividualCardEntity(client, entopts)
	}
	core.NewSeriesEntityFunc = func(client *core.YamlYugiSDK, entopts map[string]any) core.YamlYugiEntity {
		return entity.NewSeriesEntity(client, entopts)
	}
	core.NewSeriesAndArchetypeEntityFunc = func(client *core.YamlYugiSDK, entopts map[string]any) core.YamlYugiEntity {
		return entity.NewSeriesAndArchetypeEntity(client, entopts)
	}
	core.NewSkillEntityFunc = func(client *core.YamlYugiSDK, entopts map[string]any) core.YamlYugiEntity {
		return entity.NewSkillEntity(client, entopts)
	}
	core.NewSkillCardEntityFunc = func(client *core.YamlYugiSDK, entopts map[string]any) core.YamlYugiEntity {
		return entity.NewSkillCardEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewYamlYugiSDK = core.NewYamlYugiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
