import Link from "next/link";
import { LayoutDashboard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Dashboard Route — 404 Not Found.
 */
export default function DashboardNotFound() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center py-24 px-6"
      aria-labelledby="dashboard-not-found-heading"
    >
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
          <LayoutDashboard className="w-7 h-7 text-slate-500" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 id="dashboard-not-found-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            Widget Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The dashboard section you&apos;re looking for doesn&apos;t exist or has been reconfigured.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button asChild className="gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 font-semibold">
            <Link href="/">
              <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
              Main Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 rounded-xl px-6 font-semibold border-slate-200 text-slate-600 hover:bg-slate-50">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
