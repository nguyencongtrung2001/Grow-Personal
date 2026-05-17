import { Skeleton } from "@/components/ui/skeleton";

/**
 * Notes Route — Loading Skeleton.
 * Mirrors the NoteSidebar + NoteEditor two-panel layout.
 */
export default function NotesLoading() {
  return (
    <div className="w-full max-w-[1440px] mx-auto flex gap-6 pt-6" aria-busy="true" aria-label="Loading notes">

      {/* NoteSidebar Skeleton */}
      <aside className="w-72 shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 hidden lg:block">
        {/* Search bar */}
        <Skeleton className="h-9 w-full rounded-lg" />

        {/* Category header */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-20 rounded" />
        </div>

        {/* Note list items */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
            <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-3.5 w-28 rounded" />
              <Skeleton className="h-2.5 w-20 rounded" />
            </div>
          </div>
        ))}

        {/* Add note button */}
        <Skeleton className="h-9 w-full rounded-lg" />
      </aside>

      {/* NoteEditor Skeleton */}
      <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        {/* Editor toolbar */}
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-lg" />
          ))}
          <div className="flex-1" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>

        {/* Title */}
        <Skeleton className="h-8 w-72 rounded-md" />

        {/* Content lines */}
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-4 rounded"
              style={{ width: `${85 - i * 6}%` }}
            />
          ))}
        </div>

        {/* Tags row */}
        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
