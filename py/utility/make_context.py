# YamlYugi SDK utility: make_context

from core.context import YamlYugiContext


def make_context_util(ctxmap, basectx):
    return YamlYugiContext(ctxmap, basectx)
