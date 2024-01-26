import { Context, Schema } from 'koishi'

export const name = 'censure'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command('censure <target> <event>', { checkArgCount: true })
  .alias('谴责')
  .action((_, target, event) => {
    return `我方对${event}表示强烈谴责。${event}是${target}的蓄意行为，这种行为侵犯了我方的正当权益。我方要求${target}立即停止${event}，并采取措施纠正错误。我方将继续密切关注此事的进展，并采取一切必要措施，以维护我方的正当权益。`
  })
}