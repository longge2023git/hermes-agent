import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Last-resort error boundary.
 *
 * Why it is deliberately self-contained: it must still render when the *i18n
 * provider, the theme provider or the API client* are the thing that blew up,
 * so it reads the locale straight from localStorage and carries its own
 * two-language dictionary instead of calling `useI18n()`.
 *
 * Motivating case (measured on this fork): when the backend is unreachable
 * every `/api/*` call 502s and a render error used to collapse the whole tree
 * to a blank page. For users whose relay is down that is an unexplainable
 * white screen; here they get a sentence they can act on.
 */
type Props = { children: ReactNode };
type State = { error: Error | null };

const COPY = {
  fa: {
    title: "\u062e\u0637\u0627\u06cc\u06cc \u0631\u062e \u062f\u0627\u062f",
    body: "\u0627\u062a\u0635\u0627\u0644 \u0628\u0647 \u0633\u0631\u0648\u06cc\u0633 Hermes \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062f \u06cc\u0627 \u062e\u0637\u0627\u06cc \u063a\u06cc\u0631\u0645\u0646\u062a\u0638\u0631\u0647\u200c\u0627\u06cc \u0631\u062e \u062f\u0627\u062f\u0647 \u0627\u0633\u062a. \u0644\u0637\u0641\u0627\u064b \u062f\u0648\u0628\u0627\u0631\u0647 \u062a\u0644\u0627\u0634 \u06a9\u0646\u06cc\u062f.",
    retry: "\u062a\u0644\u0627\u0634 \u062f\u0648\u0628\u0627\u0631\u0647",
    details: "\u062c\u0632\u0626\u06cc\u0627\u062a \u062e\u0637\u0627",
    dir: "rtl",
  },
  en: {
    title: "Something went wrong",
    body: "The app could not reach the Hermes service, or an unexpected error occurred. Please try again.",
    retry: "Try again",
    details: "Error details",
    dir: "ltr",
  },
} as const;

function copy() {
  try {
    const loc = window.localStorage.getItem("hermes-locale") ?? "";
    return loc.startsWith("fa") ? COPY.fa : COPY.en;
  } catch {
    return COPY.en;
  }
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep the console trail: this is what bug reports get built from.
    console.error("[hermes] render error caught by ErrorBoundary", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const c = copy();
    // The i18n provider may be exactly what crashed, so the fallback owns the
    // document direction too (otherwise the RTL text renders left-aligned).
    try {
      document.documentElement.setAttribute("dir", c.dir);
      document.documentElement.setAttribute("lang", c.dir === "rtl" ? "fa" : "en");
    } catch {
      /* ignore */
    }
    return (
      <div dir={c.dir} className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
        <div className="w-full max-w-lg space-y-4 rounded-lg border border-border bg-card p-6">
          <h1 className="text-lg font-semibold">{c.title}</h1>
          <p className="text-sm text-muted-foreground">{c.body}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {c.retry}
          </button>
          <details className="text-xs text-muted-foreground">
            <summary className="cursor-pointer">{c.details}</summary>
            <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-all">{String(error?.message || error)}</pre>
          </details>
        </div>
      </div>
    );
  }
}
