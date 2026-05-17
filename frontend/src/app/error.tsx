"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error Boundary Segment — App Router segment boundary.
 * MUST be a Client Component. Catches errors within a route segment
 * without breaking the parent layout (sidebar, header remain intact).
 */
export default function Error({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Slot for an error-reporting service (e.g., Sentry, Datadog).
    // In production, replace this with: Sentry.captureException(error)
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <section
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="w-full flex flex-col items-center justify-center py-24 px-6"
    >
      <div className="max-w-md w-full text-center space-y-6">

        {/* Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shadow-sm">
          <AlertTriangle className="w-7 h-7 text-rose-500" aria-hidden="true" />
        </div>

        {/* Copy */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Something went wrong
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            This section of the dashboard encountered an unexpected error.
            The rest of your workspace is unaffected.
          </p>
          {/* Digest for cross-referencing server logs — only show in dev */}
          {error.digest && (
            <p className="mt-3 inline-block rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-[11px] text-slate-500 select-all">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 font-semibold transition-all"
            aria-label="Retry loading this section"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.assign("/")}
            className="rounded-xl px-6 font-semibold border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}
