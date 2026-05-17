import type { Metadata } from "next";
import "./globals.css";
import AppSidebar from "@/components/layouts/Sidebars";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Master Dashboard - Command Center",
  description: "Productivity OS built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="light">
      <head>
        <Link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased font-sans">
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
            {/* AppSidebar component from Shadcn */}
            <AppSidebar />
            
            {/* Khối content chính */}
            <main className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden">
              {/* Header thanh công cụ nhỏ chứa Trigger */}
              <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 bg-white px-4 md:px-6">
                <SidebarTrigger className="text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all" />
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex-1 overflow-x-auto whitespace-nowrap py-1 scrollbar-none  flex items-center">
        
                </div>
              </header>

              {/* Viewport chính của Page */}
              <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="w-full flex flex-col gap-6">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </body>
    </html>
  );
}