"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Tasks Route — Error Boundary Segment.
 * Catches errors from BigCalendar, TaskForm, TodayAgenda, etc.
 * without breaking the sidebar or layout header.
 */
export default function TasksError({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("[Tasks Error Boundary]", error);
  }, [error]);

  return (
    <section
      role="alert"
      aria-live="assertive"
      className="w-full flex flex-col items-center justify-center py-20 px-6"
    >
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-sm">
          <AlertTriangle className="w-6 h-6 text-emerald-600" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Failed to load Tasks
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Your calendar and task modules encountered an error.
            Your other workspaces are unaffected.
          </p>
          {error.digest && (
            <p className="mt-3 inline-block rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-[11px] text-slate-500 select-all">
              ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 font-semibold"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Retry
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.assign("/")}
            className="rounded-xl px-6 font-semibold border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}
