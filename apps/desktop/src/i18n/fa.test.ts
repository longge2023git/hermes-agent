import { applyDocumentLocale, RTL_LOCALES } from '@hermes/shared/i18n'
import { describe, expect, it } from 'vitest'

import { TRANSLATIONS } from './catalog'
import { en } from './en'
import { fa } from './fa'
import { isLocale, isSupportedLocaleValue, localeConfigValue, LOCALE_OPTIONS, normalizeLocale } from './languages'

/**
 * Persian (fa) locale — added by the hermes-fa distribution.
 *
 * Kept in a file of its own (not edits to the upstream language tests) so the
 * fork's diff stays additive and rebases cleanly.
 *
 * History worth keeping: an earlier revision of this suite passed while the
 * locale still shipped whole English sentences (the coverage assertion excluded
 * every entry whose value equalled the English source — exactly the defect
 * class). The assertions below are written so that cannot happen again.
 */

/** leaf path → value, as a Map (some upstream keys contain dots themselves). */
function leafMap(tree: unknown, prefix = ''): Map<string, unknown> {
  const out = new Map<string, unknown>()

  const walk = (node: unknown, path: string) => {
    if (typeof node === 'string' || typeof node === 'function') {
      out.set(path, node)
      return
    }
    if (node === null || typeof node !== 'object') {
      return
    }
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      walk(value, path ? `${path}.${key}` : key)
    }
  }

  walk(tree, prefix)

  return out
}

const PERSIAN_CHAR = /[\u0600-\u06FF]/
const asText = (v: unknown) =>
  typeof v === 'function' ? (v as (...a: unknown[]) => string).toString() : String(v ?? '')

/** 散文 = 至少 3 个词，且其中 ≥2 个是普通的英文单词（像句子）。
 *  URL、标识符、缩写、两词以内的品牌名（"Hermes Cloud"）都不算散文。 */
const looksLikeProse = (s: string) => {
  const t = s.trim()
  if (!t || /^(https?:\/\/|www\.)\S*$/i.test(t) || /^@/.test(t)) {
    return false
  }
  const words = t
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/[«»"'…·:.,!?()[\]|]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  if (words.length < 3) {
    return false
  }
  const plainWords = words.filter(w => /^[A-Za-z][a-z'-]{2,}$/.test(w) && w !== w.toUpperCase())

  return plainWords.length >= 2
}

/** 源码里每个 `${...}` 表达式的内部文本（花括号配对，跳过字符串与嵌套模板）。 */
function expressionSegments(src: string): string[] {
  const out: string[] = []
  let i = 0
  while (i < src.length) {
    if (src[i] === '$' && src[i + 1] === '{') {
      let depth = 1
      let j = i + 2
      while (j < src.length && depth > 0) {
        const c = src[j]
        if (c === '\\') {
          j += 2
          continue
        }
        if (c === '{') {
          depth += 1
          j += 1
          continue
        }
        if (c === '}') {
          depth -= 1
          j += 1
          continue
        }
        if (c === "'" || c === '"') {
          const quote = c
          j += 1
          while (j < src.length && src[j] !== quote) {
            if (src[j] === '\\') {
              j += 1
            }
            j += 1
          }
          j += 1
          continue
        }
        if (c === '`') {
          j += 1
          let nested = 0
          while (j < src.length) {
            if (src[j] === '\\') {
              j += 2
              continue
            }
            if (src[j] === '$' && src[j + 1] === '{') {
              nested += 1
              j += 2
              continue
            }
            if (src[j] === '}' && nested > 0) {
              nested -= 1
              j += 1
              continue
            }
            if (src[j] === '`' && nested === 0) {
              j += 1
              break
            }
            j += 1
          }
          continue
        }
        j += 1
      }
      out.push(src.slice(i + 2, j - 1))
      i = j
      continue
    }
    i += 1
  }

  return out
}

/** 一段文本里的字符串字面量（含引号内内容）。 */
const quotedLiterals = (src: string) => [...src.matchAll(/(['"])((?:\\.|(?!\1)[^\\])*)\1/g)].map(m => m[2])

/** 表达式内部的字符串字面量。**必须**只看 `${...}` 里面：模板文本里成对的普通引号
 *  （如 `Re: "${question}"`）不是字面量，直接对整份源码跑引号正则会造出假阳性。 */
const exprLiterals = (src: string) => expressionSegments(src).flatMap(quotedLiterals)

/** 结构被**有意**改写的键，分两类（都不是回归，别当 bug 修）：
 *  1) 英文靠 `count === 1 ? "" : "s"` 拼复数后缀，波斯语按数词不变 → 人工去掉后缀；
 *  2) 英文是三元/多分支的复杂函数（dump 标为 unsupported）→ 人工重写为单一形式。
 *  这些键的译文来自 i18n-src/fa.manual.json。 */
const STRUCTURE_INTENTIONALLY_CHANGED = new Set([
  // 复数后缀类
  'install.lines',
  'shell.statusbar.commitsBehind',
  'shell.statusbar.subagents',
  'skills.hub.findings',
  'updates.moreChanges',
  // dump 无法机翻、由人工重写的复杂函数
  'assistant.mcpSetup.toolCount',
  'assistant.thread.filesChanged',
  'assistant.thread.resumeWhenBackgroundDone',
  'commandCenter.maintenance.bytes',
  'messaging.waitingSince',
  'preview.web.addComments',
  'rightSidebar.folderTip',
  'settings.vault.identifierShown',
  'sidebar.projects.branchOff',
  'statusStack.control.gateLastExit',
  'titlebar.unreadSessions'
])

describe('persian (fa) locale', () => {
  const enLeaves = leafMap(en)
  const faLeaves = leafMap(TRANSLATIONS.fa)

  it('is selectable in the language picker', () => {
    expect(LOCALE_OPTIONS.map(o => o.id)).toContain('fa')
    expect(LOCALE_OPTIONS.find(o => o.id === 'fa')?.name).toBe('فارسی')
    expect(isLocale('fa')).toBe(true)
    expect(localeConfigValue('fa')).toBe('fa')
  })

  it('normalizes common Persian tags and endonyms', () => {
    expect(normalizeLocale('fa')).toBe('fa')
    expect(normalizeLocale('fa-IR')).toBe('fa')
    expect(normalizeLocale('FA_ir')).toBe('fa')
    expect(normalizeLocale(' persian ')).toBe('fa')
    expect(normalizeLocale('Farsi')).toBe('fa')
    expect(normalizeLocale('فارسی')).toBe('fa')
    expect(isSupportedLocaleValue('fa-IR')).toBe(true)
  })

  it('is registered as a right-to-left locale and drives <html dir>', () => {
    expect(RTL_LOCALES.has('fa')).toBe(true)

    applyDocumentLocale('fa')
    expect(document.documentElement.dir).toBe('rtl')
    expect(document.documentElement.lang).toBe('fa')

    applyDocumentLocale('en')
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('resolves every English key to a non-empty message (no blanks)', () => {
    // 键集合本身由 defineLocale 的深合并在结构上保证；这条主要防"多出/漏掉键"
    expect([...faLeaves.keys()].sort()).toEqual([...enLeaves.keys()].sort())

    const blanks = [...enLeaves.entries()]
      .filter(([path, enValue]) => asText(enValue).trim() !== '' && asText(faLeaves.get(path)).trim() === '')
      .map(([path]) => path)
    expect(blanks).toEqual([])
  })

  it('contains no CJK characters', () => {
    // 审查在 web 产物里实测到一个中文词混入；桌面这轮没有，但必须同样断言，
    // 否则同类污染（模型偶发输出中文/日文）不会有任何测试拦住。
    const cjk = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/
    const bad = [...faLeaves.entries()]
      .filter(([, value]) => cjk.test(String(value)))
      .map(([path, value]) => `${path}: ${(String(value).match(cjk) ?? [''])[0]}`)
    expect(bad).toEqual([])
  })

  it('never ships English prose where a translation belongs', () => {
    // 这是曾经真实发生过的缺陷：43 条字符串 + 85 个函数叶子直接是英文，
    // 而当时的断言恰好把"与英文相同"排除在外，于是全绿放行。
    //
    // 只检查**字符串**叶子：函数的 asText() 给的是源码（如
    // `(pre, post) => `${pre} → ${post}``），那本来就不含散文，比较它会造出假阳性。
    const offenders = [...enLeaves.entries()]
      .filter(([path, enValue]) => {
        if (typeof enValue === 'function' || STRUCTURE_INTENTIONALLY_CHANGED.has(path)) {
          return false
        }
        const enText = asText(enValue)
        return asText(faLeaves.get(path)) === enText && looksLikeProse(enText)
      })
      .map(([path]) => path)
    expect(offenders).toEqual([])
  })

  it('translates the catalog almost in full', () => {
    const persian = [...faLeaves.values()].filter(v => PERSIAN_CHAR.test(asText(v))).length
    expect(persian / enLeaves.size).toBeGreaterThan(0.97)
  })

  it('never drops an interpolated value from a function message', () => {
    const dropped: string[] = []
    for (const [path, enValue] of enLeaves) {
      if (typeof enValue !== 'function' || STRUCTURE_INTENTIONALLY_CHANGED.has(path)) {
        continue
      }
      const countEn = (enValue.toString().match(/\$\{/g) ?? []).length
      const countFa = (String(faLeaves.get(path)).match(/\$\{/g) ?? []).length
      if (countEn !== countFa) {
        dropped.push(`${path} (en=${countEn} fa=${countFa})`)
      }
    }
    expect(dropped).toEqual([])
  })

  it('keeps conditional branches structurally intact', () => {
    // 空分支被"填了内容"会让句子语义反转（真实缺陷：安装被阻止的告警里插进了
    // "技能安装已被阻止"）。这里逐条比对字面量数量与空串模式。
    const broken: string[] = []
    for (const [path, enValue] of enLeaves) {
      if (typeof enValue !== 'function' || STRUCTURE_INTENTIONALLY_CHANGED.has(path)) {
        continue
      }
      const enLiterals = exprLiterals(enValue.toString())
      const faLiterals = exprLiterals(String(faLeaves.get(path)))
      if (enLiterals.length !== faLiterals.length) {
        broken.push(`${path}: 字面量数量 ${enLiterals.length} → ${faLiterals.length}`)
        continue
      }
      enLiterals.forEach((lit, i) => {
        if (lit.trim() === '' && faLiterals[i].trim() !== '') {
          broken.push(`${path}: 空分支被填了 ${JSON.stringify(faLiterals[i]).slice(0, 40)}`)
        }
      })
    }
    expect(broken).toEqual([])
  })

  it('translates array entries too (they are user-visible copy)', () => {
    const arrays: Array<[string, unknown, unknown]> = [
      ['composer.newSessionPlaceholders', en.composer.newSessionPlaceholders, fa.composer.newSessionPlaceholders],
      ['composer.followUpPlaceholders', en.composer.followUpPlaceholders, fa.composer.followUpPlaceholders]
    ]
    for (const [path, enArr, faArr] of arrays) {
      expect(faArr, path).toHaveLength((enArr as unknown[]).length)
      ;(faArr as string[]).forEach((item, i) => {
        expect(item.trim(), `${path}[${i}]`).not.toBe('')
        expect(item, `${path}[${i}] 仍是英文`).not.toBe((enArr as string[])[i])
      })
    }
  })

  it('keeps interpolator signatures so callers can keep passing args', () => {
    expect(fa.common.tryHint('foo')).toContain('foo')
    expect(fa.onboarding.price('$1', '$2')).toContain('$1')
    expect(fa.onboarding.price('$1', '$2')).toContain('$2')
    expect(fa.onboarding.signInWith('Nous')).toContain('Nous')
    expect(fa.boot.failure.signInWithProvider('Google')).toContain('Google')
    expect(fa.boot.desktopBootFailedWithMessage('boom')).toContain('boom')
    expect(fa.ui.sidebar.toggle(true)).not.toEqual(fa.ui.sidebar.toggle(false))
    expect(fa.common.tryHint('foo')).not.toEqual(en.common.tryHint('foo'))
  })
})
