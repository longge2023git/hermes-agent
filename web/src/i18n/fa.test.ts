import { describe, expect, it } from 'vitest'

import { en } from './en'
import { fa } from './fa'

/**
 * Web 控制台的波斯语语言包守卫（与桌面端 apps/desktop/src/i18n/fa.test.ts 同源）。
 *
 * 为什么单独一份：上一轮审查实测 **web 产物里混进了一个中文词「浏览」**，
 * 而当时唯一的 fa 测试只覆盖桌面端 —— 缺陷就是这么溜过去的。
 */

const PERSIAN = /[\u0600-\u06FF]/
const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/
const CJK_NAMES: Record<string, string> = {
  '\u3040': '日文假名',
  '\u3400': '中文（扩展 A）',
  '\u4e00': '中文汉字',
  '\uac00': '韩文谚文'
}

/** 与流水线 recognize 的"散文"判据一致：英文 ≥3 个词才算自然语句 */
const looksLikeProse = (s: string) => {
  const words = s
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/[«»"'…·:.,!?()[\]|]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  return words.length >= 3 && words.filter(w => /^[A-Za-z][a-z'-]{2,}$/.test(w)).length >= 2
}

const placeholders = (s: string) => s.match(/\{[^}]*\}/g) ?? []

function leaves(tree: unknown, path = ''): Map<string, string> {
  const out = new Map<string, string>()
  const walk = (node: unknown, current: string) => {
    if (typeof node === 'string') {
      out.set(current, node)

      return
    }
    if (node === null || typeof node !== 'object') {
      return
    }
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      walk(value, current ? `${current}.${key}` : key)
    }
  }
  walk(tree, path)

  return out
}

const enLeaves = leaves(en)
const faLeaves = leaves(fa)

/** 结构被**有意**改写的键：英文用 `{s}` 占位符拼复数后缀（`{count} skill{s}`），
 *  波斯语按数词不变，因此译文去掉了 `{s}` —— 不是回归，别当 bug 修。
 *  （桌面端同样的模式在 apps/desktop/src/i18n/fa.test.ts 里也单独列出。） */
const STRUCTURE_INTENTIONALLY_CHANGED = new Set(['skills.skillCount', 'skills.resultCount'])

describe('persian (fa) locale — web dashboard', () => {
  it('covers every English key', () => {
    expect([...faLeaves.keys()].sort()).toEqual([...enLeaves.keys()].sort())
  })

  it('keeps every placeholder, in order', () => {
    const bad = [...enLeaves.entries()]
      .filter(([path, enValue]) => {
        if (STRUCTURE_INTENTIONALLY_CHANGED.has(path)) {
          return false
        }

        return placeholders(faLeaves.get(path) ?? '').join() !== placeholders(enValue).join()
      })
      .map(([path]) => path)
    expect(bad).toEqual([])
  })

  it('contains no CJK characters', () => {
    // 真实发生过：skills.noSkills 里混进了中文「浏览」
    const bad = [...faLeaves.entries()]
      .filter(([, value]) => CJK.test(value))
      .map(([path, value]) => {
        const ch = value.match(CJK)?.[0] ?? ''
        const name = CJK_NAMES[`\\u${ch.charCodeAt(0).toString(16).padStart(4, '0')}`] ?? 'CJK'
        return `${path}: 含${name}字符「${ch}」`
      })
    expect(bad).toEqual([])
  })

  it('never ships English prose where a translation belongs', () => {
    const bad = [...enLeaves.entries()]
      .filter(([path, enValue]) => faLeaves.get(path) === enValue && looksLikeProse(enValue))
      .map(([path]) => path)
    expect(bad).toEqual([])
  })

  it('translates the vast majority of the catalog', () => {
    const persian = [...faLeaves.values()].filter(v => PERSIAN.test(v)).length
    const ratio = persian / faLeaves.size
    expect(ratio).toBeGreaterThan(0.9)
  })

  it('writes Persian morphemes with ZWNJ instead of gluing them', () => {
    // 审计 M9：机翻把「می」+「شود」这类语素粘连，是波斯语界面最显眼的"机翻味"。
    // 提示词自己的示例当时也是错形（0 个 U+200C），等于在教模型写错 —— 已一并修正。
    const GLUED = [
      /\u0645\u06cc\u0634\u0648\u062f/,
      /\u0646\u0645\u06cc\u0634\u0648\u062f/,
      /\u0645\u06cc\u06a9\u0646\u062f/,
      /\u0645\u06cc\u062f\u0647\u062f/,
      /\u0645\u06cc\u0631\u0648\u062f/,
      /\u0645\u06cc\u062a\u0648\u0627\u0646/,
      /\u0628\u0647\u0631\u0648\u0632/,
      /\u06af\u0641\u062a\u0648\u06af\u0648/,
      /[\u0600-\u06FF]{2,}\u0647\u0647\u0627\u06cc/
    ]
    const offenders: string[] = []
    for (const [path, value] of faLeaves) {
      const text = typeof value === 'function' ? String(value) : String(value)
      for (const re of GLUED) {
        if (re.test(text)) {
          offenders.push(`${path}: missing ZWNJ`)
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
