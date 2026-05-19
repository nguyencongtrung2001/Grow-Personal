import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChallengeDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border border-slate-200/60 rounded-2xl">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 rounded mb-1" />
              <Skeleton className="h-3 w-32 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Heatmap Layout Skeleton */}
      <Card className="rounded-2xl p-6 border border-slate-200">
        <Skeleton className="h-5 w-48 rounded mb-2" />
        <Skeleton className="h-3 w-64 rounded mb-6" />
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl grid grid-cols-10 gap-3">
          {Array.from({ length: 30 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      </Card>
    </div>
  );
}

export function ChallengesListSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto" aria-busy="true" aria-label="Loading challenges">
      {/* ChallengeHeader Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white border border-[#F1E7E2] rounded-2xl relative overflow-hidden shadow-sm">
        <div className="space-y-2 z-10 w-full sm:w-auto">
          <Skeleton className="h-8 w-56 rounded-lg bg-slate-200" />
          <Skeleton className="h-4 w-72 sm:w-96 rounded-md bg-slate-100" />
        </div>
        <Skeleton className="h-12 w-44 rounded-xl mt-4 sm:mt-0 z-10 bg-slate-200" />
      </div>

      {/* Challenge Cards Skeleton List */}
      <section className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5"
          >
            {/* Card header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-44 rounded" />
                  <Skeleton className="h-3 w-64 rounded" />
                </div>
              </div>
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>

            {/* Progress section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>

            {/* Day grid items skeleton */}
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 6 }).map((_, j) => (
                <Skeleton key={j} className="h-10 w-10 rounded-lg" />
              ))}
            </div>

            {/* Footer stats */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-3 w-28 rounded" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}