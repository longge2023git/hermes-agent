import { writeFileSync } from 'node:fs'
import { describe, it } from 'vitest'

import { ar } from './ar'
import { en } from './en'
import { fa } from './fa'

describe('hv-ar-fa-probe', () => {
  it('dumps three-way renders', () => {
    const out: unknown[] = []
    const walk = (a: any, b: any, c: any, p = '') => {
      for (const k of Object.keys(a ?? {})) {
        const av = a[k], bv = b?.[k], cv = c?.[k]
        const path = p ? `${p}.${k}` : k
        if (av && typeof av === 'object' && !Array.isArray(av)) { walk(av, bv, cv, path); continue }
        if (typeof av === 'function' && /=== 1/.test(av.toString())) {
          const r: any = { path, en: [], fa: [], ar: [] }
          for (const args of [[1], [3]]) {
            for (const [slot, fn] of [['en', av], ['fa', bv], ['ar', cv]] as const) {
              try { r[slot].push(String((fn as any)(...args))) } catch { r[slot].push('__throw__') }
            }
          }
          out.push(r)
        }
      }
    }
    walk(en, fa, ar)
    // 顺带把"术语"样本也导出：en 值含关键词的条目，三方对照（字符串叶子）
    const terms: Record<string, { en: string; fa: string; ar: string }[]> = {}
    const KEYWORDS = ['model', 'provider', 'session', 'skill', 'memory', 'token', 'agent', 'tool', 'profile', 'gateway', 'workspace', 'stream']
    const walk2 = (a: any, b: any, c: any, p = '') => {
      for (const k of Object.keys(a ?? {})) {
        const av = a[k], bv = b?.[k], cv = c?.[k]
        const path = p ? `${p}.${k}` : k
        if (av && typeof av === 'object' && !Array.isArray(av)) { walk2(av, bv, cv, path); continue }
        if (typeof av !== 'string' || typeof bv !== 'string' || typeof cv !== 'string') continue
        for (const kw of KEYWORDS) {
          if (new RegExp(`\\b${kw}s?\\b`, 'i').test(av)) {
            (terms[kw] ??= []).push({ en: av, fa: bv, ar: cv })
          }
        }
      }
    }
    walk2(en, fa, ar)
    writeFileSync('/tmp/hv-ar-fa.json', JSON.stringify({ plural: out, terms }, null, 1))
  })
})
