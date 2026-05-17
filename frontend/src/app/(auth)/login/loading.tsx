import { Skeleton } from "@/components/ui/skeleton";

/**
 * Login Route — Loading Skeleton.
 * Mirrors the full-page auth layout with ambient gradient background,
 * header branding, centered AuthCard form, and footer.
 */
export default function LoginLoading() {
  return (
    <div
      className="min-h-screen flex flex-col justify-between relative overflow-hidden select-none bg-[#F8FAFC]"
      aria-busy="true"
      aria-label="Loading login"
    >
      {/* Ambient gradient bubbles (purely decorative) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-sky-200/40 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-emerald-100/50 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[30%] right-[-5%] w-[35vw] h-[35vw] bg-amber-100/40 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <header className="flex justify-center items-center w-full pt-12 pb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-3 h-6 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-md" />
        </div>
      </header>

      {/* AuthCard Skeleton */}
      <main className="grow flex items-center justify-center px-5 relative z-10 py-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-lg space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <Skeleton className="h-7 w-48 mx-auto rounded-md" />
            <Skeleton className="h-4 w-64 mx-auto rounded" />
          </div>

          {/* Social login buttons */}
          <div className="space-y-3">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-px flex-1 rounded" />
            <Skeleton className="h-4 w-8 rounded" />
            <Skeleton className="h-px flex-1 rounded" />
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-16 rounded" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-20 rounded" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>

          {/* Submit button */}
          <Skeleton className="h-11 w-full rounded-xl" />

          {/* Footer link */}
          <Skeleton className="h-3.5 w-48 mx-auto rounded" />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex justify-between items-center px-12 pb-8 relative z-10">
        <Skeleton className="h-3 w-56 rounded" />
        <div className="flex gap-4">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-32 rounded" />
        </div>
      </footer>
    </div>
  );
}
