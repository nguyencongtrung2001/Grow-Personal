import Link from "next/link";
import { Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Challenges Route — 404 Not Found.
 */
export default function ChallengesNotFound() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center py-24 px-6"
      aria-labelledby="challenges-not-found-heading"
    >
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-sm">
          <Trophy className="w-7 h-7 text-orange-500" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 id="challenges-not-found-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
            Challenge Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The challenge you&apos;re looking for doesn&apos;t exist or has been completed and archived.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button asChild className="gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 font-semibold">
            <Link href="/challenges">
              <Trophy className="w-4 h-4" aria-hidden="true" />
              All Challenges
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 rounded-xl px-6 font-semibold border-slate-200 text-slate-600 hover:bg-slate-50">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
