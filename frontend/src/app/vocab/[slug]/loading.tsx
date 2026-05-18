import React from "react";
import { Card } from "@/components/ui/card";

export default function VocabFolderLoading() {
  return (
    <div className="max-w-[1440px] mx-auto space-y-8 animate-pulse p-1">
      {/* Back button skeleton */}
      <div className="w-48 h-8 bg-slate-100 rounded-xl"></div>

      {/* Directory Folder Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white border border-slate-150 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4 w-full">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl shrink-0"></div>
          <div className="space-y-2 w-full max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-48 h-7 bg-slate-200 rounded-lg"></div>
              <div className="w-20 h-5 bg-slate-100 rounded-full"></div>
            </div>
            <div className="w-full h-4 bg-slate-150 rounded-md"></div>
            <div className="w-2/3 h-4 bg-slate-150 rounded-md"></div>
          </div>
        </div>
        <div className="w-36 h-11 bg-slate-200 rounded-xl shrink-0 self-start md:self-center"></div>
      </div>

      {/* Search Input Bar skeleton */}
      <div className="w-full h-14 bg-slate-100 rounded-2xl"></div>

      {/* Word Cards Grid Display skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-12">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card 
            key={index}
            className="rounded-2xl border border-slate-200/60 p-4.5 flex flex-col gap-4 shadow-none bg-white border-dashed"
          >
            {/* Image placeholder */}
            <div className="w-full h-32 bg-slate-100 rounded-xl"></div>
            {/* Title & Badge */}
            <div className="flex items-center justify-between gap-3">
              <div className="w-2/3 h-6 bg-slate-200 rounded-lg"></div>
              <div className="w-12 h-5 bg-slate-100 rounded-md"></div>
            </div>
            {/* Definition */}
            <div className="border-l-2 border-slate-200 pl-2.5 space-y-1.5 py-1">
              <div className="w-full h-4 bg-slate-150 rounded-md"></div>
            </div>
            {/* Usage */}
            <div className="bg-slate-50/50 border border-slate-100/50 rounded-lg p-2.5 space-y-1">
              <div className="w-1/3 h-3 bg-slate-200 rounded-md"></div>
              <div className="w-full h-3.5 bg-slate-150 rounded-md"></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
