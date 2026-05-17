import Link from "next/link";
import {
  LayoutDashboard,
  FileQuestion,
  ArrowLeft,
  BookOpen,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * 404 Not Found Page — App Router global not-found boundary.
 * Rendered automatically by Next.js when notFound() is called or a
 * route segment cannot be matched.
 * Semantic HTML5 + full ARIA accessibility compliance.
 */
export default function NotFound() {
  const quickLinks = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard, color: "text-slate-600" },
    { label: "Tasks", href: "/tasks", icon: CheckSquare, color: "text-emerald-600" },
    { label: "Learn Vocab", href: "/vocab", icon: BookOpen, color: "text-sky-600" },
  ];

  return (
    <main
      className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 py-20"
      aria-labelledby="not-found-heading"
    >
      <article className="max-w-lg w-full text-center space-y-8">

        {/* Illustrative Badge */}
        <div
          className="mx-auto relative w-28 h-28"
          aria-hidden="true"
        >
          {/* Outer decorative ring */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-orange-100 to-amber-50 border border-orange-200/60 shadow-lg shadow-orange-100/40" />
          {/* Inner icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-orange-500" strokeWidth={1.5} />
          </div>
          {/* Floating "404" badge */}
          <span
            className="absolute -top-2.5 -right-2.5 bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-1 rounded-full shadow-md"
            aria-label="HTTP 404 error code"
          >
            404
          </span>
        </div>

        {/* Headline & Description */}
        <header className="space-y-3">
          <h1
            id="not-found-heading"
            className="text-3xl font-extrabold text-slate-900 tracking-tight"
          >
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            This route doesn&apos;t exist in your Productivity OS workspace.
            The page may have been moved, deleted, or you may have followed an
            outdated link.
          </p>
        </header>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            className="gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 font-semibold transition-all shadow-md shadow-slate-900/10"
          >
            <Link href="/" aria-label="Go back to the main dashboard">
              <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
              Back to Dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="gap-2 rounded-xl px-6 font-semibold border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Link href="javascript:history.back()" aria-label="Go back to the previous page">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="relative" aria-hidden="true">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-50 px-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
              or explore your workspace
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick workspace navigation" className="flex flex-col sm:flex-row gap-3 justify-center">
          {quickLinks.map(({ label, href, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              aria-label={`Navigate to ${label}`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${color} transition-transform group-hover:scale-110`}
                aria-hidden="true"
              />
              {label}
            </Link>
          ))}
        </nav>
      </article>
    </main>
  );
}
