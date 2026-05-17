"use client";

import { useEffect } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Login Route — Error Boundary Segment.
 * Full-page error state (no sidebar context on auth pages).
 */
export default function LoginError({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("[Auth Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] relative overflow-hidden px-6">
      {/* Ambient background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-sky-200/40 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-emerald-100/50 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />

      <section
        role="alert"
        aria-live="assertive"
        className="relative z-10 max-w-md w-full text-center space-y-6"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shadow-sm">
          <ShieldAlert className="w-7 h-7 text-rose-500" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Authentication Error
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            The login service encountered an unexpected error.
            Please try again or contact support if the issue persists.
          </p>
          {error.digest && (
            <p className="mt-3 inline-block rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-[11px] text-slate-500 select-all">
              ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={reset} className="gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 font-semibold">
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Try Again
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()} className="rounded-xl px-6 font-semibold border-slate-200 text-slate-600 hover:bg-slate-50">
            Reload Page
          </Button>
        </div>
      </section>
    </div>
  );
}
