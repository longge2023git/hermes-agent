// @vitest-environment jsdom
// @vitest-environment-options {"url": "http://localhost/"}
// Regression guard for the outermost ErrorBoundary.
//
// Motivating incident: when the backend is unreachable every /api/* call 502s
// and a render error collapsed the whole tree to a BLANK page. For users whose
// relay is down that is an unexplainable white screen. These tests fail if the
// boundary is ever dropped by an upstream rebase, stops rendering the Persian
// copy, or stops taking over the document direction.

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ReactNode } from "react";

import { ErrorBoundary } from "./ErrorBoundary";

let container: HTMLDivElement;
let root: Root;
let errSpy: ReturnType<typeof vi.spyOn>;

function Boom(): ReactNode {
  throw new Error("__boom__");
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  // React logs the caught error; keep the test output readable.
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  errSpy.mockRestore();
  window.localStorage.clear();
  document.documentElement.removeAttribute("dir");
  document.documentElement.removeAttribute("lang");
});

// jsdom 在 about:blank（不透明源）下不提供 localStorage，Node 的实验性 localStorage
// 在无 --localstorage-file 时也是 undefined → 这里显式定义一个内存实现供组件读取。
const store = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  writable: true,
  value: {
    getItem: (k: string) => (store.has(k) ? String(store.get(k)) : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => void store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  },
});

describe("ErrorBoundary", () => {
  it("renders its children untouched when nothing throws", () => {
    act(() => root.render(<ErrorBoundary><p>fine</p></ErrorBoundary>));
    expect(container.textContent).toContain("fine");
    expect(container.textContent).not.toContain("خطایی");
  });

  it("renders the Persian fallback and takes over the document direction", () => {
    window.localStorage.setItem("hermes-locale", "fa");
    act(() => root.render(<ErrorBoundary><Boom /></ErrorBoundary>));
    const text = container.textContent ?? "";
    expect(text).toContain("خطایی رخ داد");
    expect(text).toContain("تلاش دوباره");
    expect(text).not.toContain("Something went wrong");
    expect(document.documentElement.getAttribute("dir")).toBe("rtl");
    expect(document.documentElement.getAttribute("lang")).toBe("fa");
  });

  it("renders the English fallback for a non-fa locale", () => {
    window.localStorage.setItem("hermes-locale", "en");
    act(() => root.render(<ErrorBoundary><Boom /></ErrorBoundary>));
    const text = container.textContent ?? "";
    expect(text).toContain("Something went wrong");
    expect(text).toContain("Try again");
    expect(text).not.toContain("خطایی");
    expect(document.documentElement.getAttribute("dir")).toBe("ltr");
  });

  it("survives an unreadable localStorage instead of throwing again", () => {
    const spy = vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    act(() => root.render(<ErrorBoundary><Boom /></ErrorBoundary>));
    expect(container.textContent).toContain("Something went wrong");
    spy.mockRestore();
  });
});
