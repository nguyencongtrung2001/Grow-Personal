import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/layouts/Sidebars";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

// Load Google Fonts locally via next/font to eliminate external CDN network requests and Layout Shift (CLS)
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Comprehensive, production-ready SEO configuration meeting strict marketplace standards
export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Master Dashboard - Command Center",
    template: "%s | Master Dashboard",
  },
  description: "Productivity OS built with Next.js",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Master Dashboard - Command Center",
    description: "Productivity OS built with Next.js",
    url: "https://yourdomain.com",
    siteName: "Master Dashboard",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Dashboard - Command Center",
    description: "Productivity OS built with Next.js",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="light" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-slate-50 text-slate-900 min-h-screen antialiased font-sans`} suppressHydrationWarning>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              {/* AppSidebar component from Shadcn */}
              <AppSidebar />
              
              {/* Khối content chính */}
              <main className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden">
                {/* Header thanh công cụ nhỏ chứa Trigger */}
                <header className="flex h-12 shrink-0 items-center gap-2 border-b border-slate-100 bg-white px-4 md:px-6">
                  <SidebarTrigger className="text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all" />
                </header>

                {/* Viewport chính của Page */}
                <div className="flex-1 p-4 md:pt-4 md:pb-8 md:px-8 overflow-y-auto">
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