# YamlYugi SDK feature factory

from yamlyugi_sdk.feature.base_feature import YamlYugiBaseFeature
from yamlyugi_sdk.feature.test_feature import YamlYugiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: YamlYugiBaseFeature(),
        "test": lambda: YamlYugiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
