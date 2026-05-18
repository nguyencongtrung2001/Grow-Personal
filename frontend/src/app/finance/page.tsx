"use client";
import React, { Suspense } from "react";
import FinanceLayout from "@/components/finance/FinanceLayout";
import { Skeleton } from "@/components/ui/skeleton";

function FinanceLoadingFallback() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-4 w-72 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>
      
      {/* Tabs Skeleton */}
      <div className="bg-slate-200/50 h-11 w-80 rounded-xl p-1" />
      
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl bg-white border border-slate-100 shadow-2xs" />
        ))}
      </div>

      {/* Grid of Jars Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[180px] rounded-2xl bg-white border border-slate-150 shadow-2xs" />
        ))}
      </div>
    </div>
  );
}

export default function FinancePage() {
  return (
    <Suspense fallback={<FinanceLoadingFallback />}>
      <FinanceLayout />
    </Suspense>
  );
}
