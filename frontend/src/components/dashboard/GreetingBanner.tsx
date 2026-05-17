import React from "react";

export default function GreetingBanner() {
  return (
    <section className="bg-white border border-border-glass p-6 rounded-2xl relative overflow-hidden shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-tr from-sky-100/40 via-amber-50/20 to-emerald-50/40 blur-2xl rounded-full pointer-events-none"></div>
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Chào Trung Nguyen, ngày mới năng suất thực thụ!</h2>
        <p className="text-xs text-text-muted mt-1">Hệ thống đã chuẩn bị đầy đủ lộ trình hũ tài chính, thẻ từ vựng và ma trận công việc cho hôm nay.</p>
      </div>
      <div className="bg-slate-900 text-white text-xs font-mono font-bold px-4 py-2 rounded-xl flex items-center gap-2 z-10">
        <span className="material-symbols-outlined text-sm">calendar_today</span> May 16, 2026
      </div>
    </section>
  );
}