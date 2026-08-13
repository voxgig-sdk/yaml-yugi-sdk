# YamlYugi SDK utility: make_context

from yamlyugi_sdk.core.context import YamlYugiContext


def make_context_util(ctxmap, basectx):
    return YamlYugiContext(ctxmap, basectx)
