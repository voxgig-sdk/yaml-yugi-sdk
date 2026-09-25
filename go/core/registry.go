package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAggregationEntityFunc func(client *YamlYugiSDK, entopts map[string]any) YamlYugiEntity

var NewCardEntityFunc func(client *YamlYugiSDK, entopts map[string]any) YamlYugiEntity

var NewIndividualCardEntityFunc func(client *YamlYugiSDK, entopts map[string]any) YamlYugiEntity

var NewSeriesEntityFunc func(client *YamlYugiSDK, entopts map[string]any) YamlYugiEntity

var NewSeriesAndArchetypeEntityFunc func(client *YamlYugiSDK, entopts map[string]any) YamlYugiEntity

var NewSkillEntityFunc func(client *YamlYugiSDK, entopts map[string]any) YamlYugiEntity

var NewYugipediaIdEntityFunc func(client *YamlYugiSDK, entopts map[string]any) YamlYugiEntity

