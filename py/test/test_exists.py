# ProjectName SDK exists test

import pytest
from yamlyugi_sdk import YamlYugiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = YamlYugiSDK.test(None, None)
        assert testsdk is not None
