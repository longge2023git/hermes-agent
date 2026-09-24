import { afterEach, describe, expect, it } from "vitest";
import { getInitialLocale } from "./context";

// 本文件跑在 node 环境（仓库默认），因此不依赖 jsdom：
// 把 navigator / localStorage 作为全局桩注入，直接测真实的 getInitialLocale。
type Globals = { navigator?: unknown; localStorage?: unknown };

function withEnv(languages: string[], stored: Record<string, string> = {}) {
  const g = globalThis as Globals & typeof globalThis;
  Object.defineProperty(g, "navigator", {
    value: { language: languages[0], languages },
    configurable: true,
    writable: true,
  });
  g.localStorage = {
    getItem: (k: string) => (k in stored ? stored[k] : null),
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  } as unknown as Storage;
}

afterEach(() => {
  const g = globalThis as Globals;
  delete g.navigator;
  delete g.localStorage;
});

describe("getInitialLocale 首次打开的语言", () => {
  it("无存储 + 浏览器波斯语 → fa（伊朗用户装完即得波斯语）", () => {
    withEnv(["fa-IR", "fa", "en-US"]);
    expect(getInitialLocale()).toBe("fa");
  });

  it("无存储 + 浏览器英文 → en", () => {
    withEnv(["en-US", "en"]);
    expect(getInitialLocale()).toBe("en");
  });

  it("用户显式选择优先于浏览器语言", () => {
    withEnv(["fa-IR", "fa"], { "hermes-locale": "de" });
    expect(getInitialLocale()).toBe("de");
  });

  it("存储里的值非法时回退到浏览器语言", () => {
    withEnv(["fa-IR"], { "hermes-locale": "xx-YY" });
    expect(getInitialLocale()).toBe("fa");
  });

  it("浏览器语言不在支持列表时回退 en", () => {
    withEnv(["is-IS", "is"]);
    expect(getInitialLocale()).toBe("en");
  });

  it("localStorage 抛异常（隐私模式）时仍不崩，回退浏览器语言", () => {
    const g = globalThis as Globals & typeof globalThis;
    Object.defineProperty(g, "navigator", {
      value: { language: "fa-IR", languages: ["fa-IR"] },
      configurable: true,
      writable: true,
    });
    g.localStorage = {
      getItem: () => {
        throw new Error("denied");
      },
    } as unknown as Storage;
    expect(getInitialLocale()).toBe("fa");
  });
});
