import { applyDocumentLocale, RTL_LOCALES } from '@hermes/shared/i18n'
import { describe, expect, it } from 'vitest'

import { TRANSLATIONS } from './catalog'
import { isLocale, isSupportedLocaleValue, localeConfigValue, LOCALE_OPTIONS, normalizeLocale } from './languages'
import { en } from './en'
import { fa } from './fa'

/**
 * Persian (fa) locale — added by the hermes-fa distribution.
 *
 * Kept in a file of its own (not edits to the upstream language tests) so the
 * fork's diff stays additive and rebases cleanly.
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

const PERSIAN = /[\u0600-\u06FF]/
const asText = (v: unknown) => (typeof v === 'function' ? (v as () => string).toString() : String(v ?? ''))

describe('persian (fa) locale', () => {
  const enLeaves = leafMap(en)
  const faLeaves = leafMap(TRANSLATIONS.fa)

  it('is selectable in the language picker', () => {
    expect(LOCALE_OPTIONS.map(option => option.id)).toContain('fa')
    expect(LOCALE_OPTIONS.find(option => option.id === 'fa')?.name).toBe('فارسی')
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

  it('resolves every English key to a non-empty message', () => {
    expect([...faLeaves.keys()].sort()).toEqual([...enLeaves.keys()].sort())

    // 以英文为基准：英文有内容而波斯语为空 = 真问题；
    // 英文本身就是空/null 的键（如 notifications.native.turnDoneBody）不算。
    const blanks = [...enLeaves.entries()]
      .filter(([path, enValue]) => asText(enValue).trim() !== '' && asText(faLeaves.get(path)).trim() === '')
      .map(([path]) => path)
    expect(blanks).toEqual([])
  })

  it('is translated almost in full, with the remainder English by design', () => {
    const notPersian = [...faLeaves.entries()]
      .filter(([path, value]) => !PERSIAN.test(asText(value)) && asText(enLeaves.get(path)) !== asText(value))
      .map(([path]) => path)

    // 极少数条目本就无需翻译：纯品牌名/符号/数字，或恒等函数（(cwd) => cwd）
    expect(notPersian.length).toBeLessThan(40)

    const coverage = 1 - notPersian.length / enLeaves.size
    expect(coverage).toBeGreaterThan(0.99)
  })

  it('never drops an interpolated value from a function message', () => {
    // 这是真实踩过的坑：机翻把 `${name}` 弄丢后，函数会变成"少了变量"的句子，
    // 而类型检查完全看不出来。这里逐条比较英文与波斯语函数里 ${...} 的个数。
    const dropped: string[] = []
    for (const [path, enValue] of enLeaves) {
      if (typeof enValue !== 'function') {
        continue
      }
      const faValue = faLeaves.get(path)
      const countEn = (enValue.toString().match(/\$\{/g) ?? []).length
      const countFa = (String(faValue).match(/\$\{/g) ?? []).length
      if (countEn !== countFa) {
        dropped.push(`${path} (en=${countEn} fa=${countFa})`)
      }
    }
    expect(dropped).toEqual([])
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
