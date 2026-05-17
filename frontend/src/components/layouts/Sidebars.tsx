"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  BookOpen, 
  CreditCard, 
  CheckSquare, 
  Trophy, 
  StickyNote 
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard, hoverColor: "text-white", hoverBg: "bg-slate-900" },
  { label: "Learn Vocab", href: "/vocab", icon: BookOpen, hoverColor: "hover:text-sky-600", hoverBg: "hover:bg-sky-50" },
  { label: "Finance", href: "/finance", icon: CreditCard, hoverColor: "hover:text-amber-600", hoverBg: "hover:bg-amber-50" },
  { label: "Tasks", href: "/tasks", icon: CheckSquare, hoverColor: "hover:text-emerald-600", hoverBg: "hover:bg-emerald-50" },
  { label: "Challenges", href: "/challenges", icon: Trophy, hoverColor: "hover:text-orange-600", hoverBg: "hover:bg-orange-50" },
  { label: "Notes", href: "/notes", icon: StickyNote, hoverColor: "hover:text-orange-600", hoverBg: "hover:bg-orange-50" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-slate-200 bg-white shadow-sm">
      <SidebarHeader className="px-6 py-8 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-6 bg-linear-to-b from-orange-600 to-amber-500 rounded-full"></span>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Command Center</h2>
            <p className="text-[11px] font-semibold text-slate-500">Productivity OS</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`h-auto px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-slate-900 text-white font-bold shadow-md shadow-slate-900/10 hover:bg-slate-800 hover:text-white"
                          : `text-slate-500 font-semibold ${item.hoverColor} ${item.hoverBg}`
                      }`}
                    >
                      <Link href={item.href} className="flex items-center gap-3 w-full">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://lh3.googleusercontent.com/...your-avatar-id" alt="Profile" />
            <AvatarFallback>TN</AvatarFallback>
          </Avatar>
          <div className="truncate">
            <p className="text-xs font-bold text-slate-900">Trung Nguyen</p>
            <p className="text-[10px] text-slate-500">Senior Workspace</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}