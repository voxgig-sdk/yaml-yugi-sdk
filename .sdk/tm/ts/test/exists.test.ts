
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YamlYugiSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = YamlYugiSDK.test()
    equal(testsdk instanceof YamlYugiSDK, true,
      'YamlYugiSDK.test() must return a client synchronously')
  })

})
