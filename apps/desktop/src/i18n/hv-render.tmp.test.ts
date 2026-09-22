import { writeFileSync } from 'node:fs'
import { describe, it } from 'vitest'

import { en } from './en'
import { fa } from './fa'

/** 临时探针：渲染所有含 count === 1 分支的函数，输出到 /tmp 供分析。跑完即删。 */
describe('hv-render-probe', () => {
  it('dumps renders', () => {
    const out: unknown[] = []
    const walk = (a: any, b: any, p = '') => {
      for (const k of Object.keys(a ?? {})) {
        const av = a[k]
        const bv = b?.[k]
        const path = p ? `${p}.${k}` : k
        if (av && typeof av === 'object' && !Array.isArray(av)) {
          walk(av, bv, path)
          continue
        }
        if (typeof av === 'function' && /=== 1/.test(av.toString())) {
          const renders: unknown[] = []
          for (const n of [1, 3]) {
            for (const args of [[n], [n, 'extra'], [n, 2], [n, null]]) {
              let s: string
              try {
                s = String((av as any)(...args))
              } catch (e) {
                s = `__throw__:${(e as Error).name}`
              }
              let en_s = ''
              try {
                en_s = String((bv as any)(...args))
              } catch {
                en_s = '__throw__'
              }
              renders.push({ args, fa: s, en: en_s })
            }
          }
          out.push({ path, renders })
        }
      }
    }
    walk(fa, en)
    writeFileSync('/tmp/hv-render.json', JSON.stringify(out, null, 1))
  })
})
