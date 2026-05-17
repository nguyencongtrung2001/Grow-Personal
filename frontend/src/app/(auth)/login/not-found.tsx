import Link from "next/link";
import { LogIn, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Login Route — 404 Not Found.
 * Full-page layout matching the auth design system.
 */
export default function LoginNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] relative overflow-hidden px-6">
      {/* Ambient background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-sky-200/40 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-emerald-100/50 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />

      <section
        className="relative z-10 max-w-md w-full text-center space-y-6"
        aria-labelledby="login-not-found-heading"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shadow-sm">
          <LogIn className="w-7 h-7 text-sky-500" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 id="login-not-found-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The authentication page you&apos;re looking for doesn&apos;t exist.
            Please use the link below to sign in.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 font-semibold">
            <Link href="/login">
              <LogIn className="w-4 h-4" aria-hidden="true" />
              Go to Login
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 rounded-xl px-6 font-semibold border-slate-200 text-slate-600 hover:bg-slate-50">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Dashboard
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
