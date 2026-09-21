import { applyDocumentLocale, RTL_LOCALES } from '@hermes/shared/i18n'
import { describe, expect, it } from 'vitest'

import { TRANSLATIONS } from './catalog'
import { isLocale, isSupportedLocaleValue, localeConfigValue, LOCALE_OPTIONS, normalizeLocale } from './languages'
import { en } from './en'
import { fa } from './fa'

/**
 * Persian (fa) locale — added by the hermes-fa distribution (P1).
 *
 * These tests are deliberately in a file of their own (not edits to the upstream
 * language tests) so the fork's diff stays additive and rebases cleanly.
 */

/** Every leaf path in a nested message tree, mapped to its value. A Map (not
 *  dotted-path lookups) because some upstream keys contain dots themselves,
 *  which makes `a.b` ambiguous. */
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

function leafPaths(tree: unknown): string[] {
  return [...leafMap(tree).keys()]
}

function atPath(tree: unknown, path: string): unknown {
  return leafMap(tree).get(path)
}

const PERSIAN = /[\u0600-\u06FF]/

describe('persian (fa) locale', () => {
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

  it('resolves every English key (missing keys fall back, never blank)', () => {
    const enPaths = leafPaths(en).sort()
    const faPaths = leafPaths(TRANSLATIONS.fa).sort()
    expect(faPaths).toEqual(enPaths)
    expect(enPaths.every(path => atPath(TRANSLATIONS.fa, path) != null)).toBe(true)
  })

  it('translates the whole first batch and leaves the rest on the English fallback', () => {
    // ① 已翻译区块：每个叶子都必须是波斯语（防止漏译/误留英文）
    const translatedSections = ['language', 'common', 'boot', 'errors', 'onboarding', 'modelPicker', 'ui'] as const
    const englishLeftovers: string[] = []
    for (const section of translatedSections) {
      for (const path of leafPaths(fa[section])) {
        const value = String(atPath(fa[section], path) ?? '')
        // 允许纯符号/数字/拉丁品牌名，但至少要有一个波斯字母
        if (!PERSIAN.test(value)) {
          englishLeftovers.push(`${section}.${path}`)
        }
      }
    }
    expect(englishLeftovers).toEqual([])

    // ② 未进入首批的区块：必须原样回退成英文（证明 defineLocale 深合并在生效）
    for (const path of ['composer.send', 'settings.something', 'sidebar.sessions', 'assistant.thinking']) {
      if (atPath(en, path) == null) {
        continue
      }
      expect(atPath(TRANSLATIONS.fa, path)).toEqual(atPath(en, path))
    }

    // ③ 覆盖量守卫：首批翻译不应悄悄退化成少数几条
    const persianLeaves = leafPaths(fa).filter(path => PERSIAN.test(String(atPath(fa, path) ?? '')))
    expect(persianLeaves.length).toBeGreaterThanOrEqual(150)
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
