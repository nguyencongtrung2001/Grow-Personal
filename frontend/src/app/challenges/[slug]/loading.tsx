import React from "react";

export default function ChallengeDetailLoading() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto px-2 sm:px-4 py-4 animate-pulse">
      {/* Back button & Breadcrumb Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-9 w-40 bg-slate-200/70 rounded-xl" />
        <div className="h-4 w-48 bg-slate-200/70 rounded-lg" />
      </div>

      {/* BANNER THÔNG TIN TỔNG QUAN Skeleton */}
      <div className="bg-white border border-[#F1E7E2]/50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4 w-full md:w-2/3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-16 bg-slate-200/70 rounded-full" />
            <div className="h-6 w-28 bg-slate-200/70 rounded-full" />
          </div>
          <div className="h-8 w-3/4 bg-slate-200/80 rounded-xl" />
          <div className="h-4 w-1/2 bg-slate-200/70 rounded-lg" />
          <div className="pt-2 max-w-md space-y-2">
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-slate-200/70 rounded-xs" />
              <div className="h-3 w-32 bg-slate-200/70 rounded-xs" />
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[76%] bg-slate-200/80 rounded-full" />
            </div>
          </div>
        </div>

        {/* Streak Block Skeleton */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl w-full md:w-auto">
          <div className="p-3 rounded-xl w-14 h-14 bg-slate-200/70" />
          <div className="space-y-2">
            <div className="h-6 w-24 bg-slate-200/80 rounded-lg" />
            <div className="h-3 w-32 bg-slate-200/70 rounded-xs" />
          </div>
        </div>
      </div>

      {/* DASHBOARD MATRIX Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-24 bg-slate-200/70 rounded-xs" />
              <div className="w-4 h-4 bg-slate-200/70 rounded-full" />
            </div>
            <div className="h-8 w-16 bg-slate-200/80 rounded-lg" />
            <div className="h-3.5 w-full bg-slate-200/60 rounded-xs" />
          </div>
        ))}
      </div>

      {/* TABS Skeleton */}
      <div className="space-y-6">
        <div className="bg-slate-100 p-1 rounded-xl w-full sm:w-[350px] h-10 flex gap-2">
          <div className="flex-1 bg-white rounded-lg" />
          <div className="flex-1 bg-transparent rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6">
          <div className="space-y-2">
            <div className="h-5 w-64 bg-slate-200/80 rounded-lg" />
            <div className="h-3.5 w-96 bg-slate-200/70 rounded-xs" />
          </div>

          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="grid grid-cols-10 gap-3">
              {Array.from({ length: 30 }).map((_, index) => (
                <div key={index} className="aspect-square bg-slate-200/60 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
