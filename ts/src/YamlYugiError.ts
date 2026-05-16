
import { Context } from './Context'


class YamlYugiError extends Error {

  isYamlYugiError = true

  sdk = 'YamlYugi'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  YamlYugiError
}

