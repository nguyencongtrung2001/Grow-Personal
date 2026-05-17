import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col antialiased justify-between relative overflow-hidden select-none bg-[#F8FAFC]">
      
      {/* KHỐI ĐA DẠNG MÀU (Ambient Gradient Bubbles tạo chiều sâu nghệ thuật) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-sky-200/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-emerald-100/50 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-[35vw] h-[35vw] bg-amber-100/40 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] bg-orange-100/30 blur-[90px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <header className="flex justify-center items-center w-full pt-12 pb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-6 bg-linear-to-b from-[#FF4500] via-[#EAB308] to-[#0284C7] rounded-full shadow-sm" />
          <h1 className="text-xl font-black text-[#0F172A] tracking-tight font-sans">
            Growth Personal
          </h1>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="grow flex items-center justify-center px-5 relative z-10 py-6">
        <AuthCard />
      </main>

      {/* App Footer (Global Anchor) */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center px-12 pb-8 relative z-10 text-center sm:text-left gap-2">
        <span className="text-[11px] text-[#64748B] font-medium">
          © 2026 GrowthOS. Built for ultimate human performance.
        </span>
        <div className="flex gap-4 text-[11px] font-semibold text-[#64748B]">
          <a className="hover:text-[#0284C7] transition-colors" href="#">Trợ giúp</a>
          <a className="hover:text-[#0284C7] transition-colors" href="#">Phát triển bởi Timo Deck</a>
        </div>
      </footer>
    </div>
  );
}