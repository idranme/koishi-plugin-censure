import { Context, Schema } from 'koishi'
import type { } from '@koishijs/censor'

export const name = 'censure'

export interface Config {
  censor: boolean
}

export const Config: Schema<Config> = Schema.object({
  censor: Schema.boolean().description('是否启用输出内容审核。').default(false)
})

export const inject = {
  optional: ['censor']
}

export function apply(ctx: Context, cfg: Config) {
  ctx.command('censure <target> <event>', '生成谴责文案')
    .alias('谴责')
    .action(async ({ source }, target, event) => {
      if (isEmpty(target)) return '你没有输入目标。'
      if (isEmpty(event)) return '你没有输入事件。'
      if (source.includes('&lt;') && source.includes('&gt;')) return '你没有好好说话。'
      if (target.includes('。') || event.includes('。')) return '你没有好好说话。'
      const a = target, b = event
      const content = `我方对${b}表示强烈谴责。${b}是${a}的蓄意行为，这种行为侵犯了我方的正当权益。我方要求${a}立即停止${b}，并采取措施纠正错误。我方将继续密切关注此事的进展，并采取一切必要措施，以维护我方的正当权益。`
      if (cfg.censor) {
        if (!ctx.censor) throw new Error('missing censor service')
        return `<censor>${content}</censor>`
      } else {
        return content
      }
    })
}

function isEmpty(value: unknown): boolean {
  return value === undefined || value === ''
}