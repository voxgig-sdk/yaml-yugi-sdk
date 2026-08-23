# YamlYugi SDK feature factory

from yamlyugi_sdk.feature.base_feature import YamlYugiBaseFeature
from yamlyugi_sdk.feature.test_feature import YamlYugiTestFeature


_FEATURES = {
    "base": lambda: YamlYugiBaseFeature(),
    "test": lambda: YamlYugiTestFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
