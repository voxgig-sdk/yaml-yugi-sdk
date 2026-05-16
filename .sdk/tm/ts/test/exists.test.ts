
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YamlYugiSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await YamlYugiSDK.test()
    equal(null !== testsdk, true)
  })

})
