# YamlYugi SDK feature factory

from feature.base_feature import YamlYugiBaseFeature
from feature.test_feature import YamlYugiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: YamlYugiBaseFeature(),
        "test": lambda: YamlYugiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
