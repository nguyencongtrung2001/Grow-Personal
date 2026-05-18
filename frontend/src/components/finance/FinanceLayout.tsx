"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, LayoutDashboard, CalendarDays } from "lucide-react";
import DashboardView from "./views/DashboardView";
import AllocationView from "./views/AllocationView";
import LedgerView from "./views/LedgerView";
import AddTransactionDialog from "./views/AddTransactionDialog";

interface Jar {
  id: string;
  name: string;
  icon: string;
  percentage: number;
  allocated: number;
  spent: number;
  color: string;
}

interface Transaction {
  id: string;
  amount: number;
  jarId: string;
  date: string;
  description: string;
  tags: string[];
}

const DEFAULT_JARS: Jar[] = [
  {
    id: "eat",
    name: "🛍️ Ăn Uống & Cafe",
    icon: "🛍️",
    percentage: 24,
    allocated: 6000000,
    spent: 1200000,
    color: "emerald-500",
  },
  {
    id: "home",
    name: "🏠 Nhà Cửa & Điện Nước",
    icon: "🏠",
    percentage: 20,
    allocated: 5000000,
    spent: 4900000,
    color: "blue-500",
  },
  {
    id: "save",
    name: "🐷 Tiết Kiệm Dài Hạn",
    icon: "🐷",
    percentage: 16,
    allocated: 4000000,
    spent: 0,
    color: "amber-500",
  },
  {
    id: "play",
    name: "🍿 Giải Trí & Shopping",
    icon: "🍿",
    percentage: 12,
    allocated: 3000000,
    spent: 3500000, // overspent
    color: "pink-500",
  },
  {
    id: "invest",
    name: "🎯 Đầu Tư Tài Chính",
    icon: "🎯",
    percentage: 12,
    allocated: 3000000,
    spent: 0,
    color: "violet-500",
  },
  {
    id: "health",
    name: "🏥 Quỹ Khẩn Cấp & Y Tế",
    icon: "🏥",
    percentage: 8,
    allocated: 2000000,
    spent: 200000,
    color: "indigo-500",
  },
];

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    amount: -4200000,
    jarId: "home",
    date: "2026-05-05T09:00:00.000Z",
    description: "Tiền thuê nhà chung cư tháng 5",
    tags: ["#CầnThiết", "#BấtKhảKháng"],
  },
  {
    id: "tx-2",
    amount: -700000,
    jarId: "home",
    date: "2026-05-10T14:30:00.000Z",
    description: "Hóa đơn điện nước & Internet tốc độ cao",
    tags: ["#CầnThiết"],
  },
  {
    id: "tx-3",
    amount: -850000,
    jarId: "eat",
    date: "2026-05-12T18:00:00.000Z",
    description: "Đi chợ mua đồ ăn tuần tại siêu thị lớn",
    tags: ["#CầnThiết"],
  },
  {
    id: "tx-4",
    amount: -350000,
    jarId: "eat",
    date: "2026-05-15T19:30:00.000Z",
    description: "Ăn tối & uống nước ngọt cùng bạn bè",
    tags: ["#HưởngThụ"],
  },
  {
    id: "tx-5",
    amount: -2500000,
    jarId: "play",
    date: "2026-05-08T16:00:00.000Z",
    description: "Mua giày thể thao chạy bộ mới",
    tags: ["#HưởngThụ", "#ImpulseBuy"],
  },
  {
    id: "tx-6",
    amount: -1000000,
    jarId: "play",
    date: "2026-05-14T20:00:00.000Z",
    description: "Vé xem ca nhạc live show & Ăn uống nhẹ",
    tags: ["#HưởngThụ"],
  },
  {
    id: "tx-7",
    amount: -200000,
    jarId: "health",
    date: "2026-05-11T09:30:00.000Z",
    description: "Mua thuốc cảm cúm & Khẩu trang y tế",
    tags: ["#CầnThiết", "#BấtKhảKháng"],
  },
];

export default function FinanceLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL State Synced Active Tab
  const activeTab = searchParams.get("tab") || "overview";

  // Shared states for full reactivity
  const [jars, setJars] = useState<Jar[]>(DEFAULT_JARS);
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sync tab change with URL search parameters
  const handleTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", val);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Add transaction handler
  const handleAddTransaction = (
    amount: number,
    jarId: string,
    description: string,
    date: string,
    tags: string[]
  ) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      amount,
      jarId,
      date,
      description,
      tags
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Recalculate jar spent amount (Expenses are negative, incomes are positive)
    setJars((prevJars) =>
      prevJars.map((jar) => {
        if (jar.id === jarId) {
          const delta = amount < 0 ? Math.abs(amount) : -amount;
          const newSpent = jar.spent + delta;
          return {
            ...jar,
            spent: Math.max(0, newSpent)
          };
        }
        return jar;
      })
    );
  };

  // Delete transaction handler
  const handleDeleteTransaction = (id: string) => {
    const txToDelete = transactions.find((t) => t.id === id);
    if (!txToDelete) return;

    setTransactions((prev) => prev.filter((t) => t.id !== id));

    // Revert jar spent amount
    setJars((prevJars) =>
      prevJars.map((jar) => {
        if (jar.id === txToDelete.jarId) {
          const delta = txToDelete.amount < 0 ? Math.abs(txToDelete.amount) : -txToDelete.amount;
          const newSpent = jar.spent - delta;
          return {
            ...jar,
            spent: Math.max(0, newSpent)
          };
        }
        return jar;
      })
    );
  };

  // Update allocation matrix
  const handleSaveAllocation = (updatedJars: Jar[]) => {
    setJars(updatedJars);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Chi Tiêu
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed">
            Hệ thống hũ tài chính thông minh (Money Jars) giúp lập kế hoạch và tối ưu hóa tài sản.
          </p>
        </div>

        <div className="shrink-0">
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-slate-900 text-white rounded-xl text-xs font-bold h-9 px-4 flex items-center gap-1.5 hover:bg-slate-800 transition-all shadow-xs cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="w-4 h-4" /> Thêm giao dịch
          </Button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-slate-200/50 p-1 rounded-xl inline-flex w-full sm:w-auto overflow-x-auto justify-start sm:justify-center whitespace-nowrap scrollbar-none [&::-webkit-scrollbar]:hidden">
          <TabsTrigger value="overview" className="flex items-center gap-1.5 cursor-pointer">
            <LayoutDashboard className="w-3.5 h-3.5" /> Tổng Quan
          </TabsTrigger>
          <TabsTrigger value="allocation" className="flex items-center gap-1.5 cursor-pointer">
            <CreditCard className="w-3.5 h-3.5" /> Phân Bổ Đầu Tháng
          </TabsTrigger>
          <TabsTrigger value="ledger" className="flex items-center gap-1.5 cursor-pointer">
            <CalendarDays className="w-3.5 h-3.5" /> Lịch Sử Giao Dịch
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview Dashboard */}
        <TabsContent value="overview">
          <DashboardView jars={jars} transactions={transactions} />
        </TabsContent>

        {/* Tab 2: Monthly Allocation */}
        <TabsContent value="allocation">
          <AllocationView jars={jars} onSaveAllocation={handleSaveAllocation} />
        </TabsContent>

        {/* Tab 3: Transaction Ledger */}
        <TabsContent value="ledger">
          <LedgerView 
            transactions={transactions} 
            jars={jars} 
            onDeleteTransaction={handleDeleteTransaction}
          />
        </TabsContent>
      </Tabs>

      {/* QUICK TRANSACTION DIALOG */}
      <AddTransactionDialog
        key={isDialogOpen ? "open" : "closed"}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        jars={jars}
        onAddTransaction={handleAddTransaction}
      />

    </div>
  );
}
