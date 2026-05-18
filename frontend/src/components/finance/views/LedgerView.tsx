"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Calendar, 
  Inbox, 
  Trash2,
  CalendarDays,
  X
} from "lucide-react";

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

interface LedgerViewProps {
  transactions: Transaction[];
  jars: Jar[];
  onDeleteTransaction?: (id: string) => void;
}

export default function LedgerView({ transactions, jars, onDeleteTransaction }: LedgerViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJarId, setSelectedJarId] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");

  // Format currency
  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Clear filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedJarId("all");
    setSortBy("date-desc");
  };

  // Filter & Sort logic
  const filteredTransactions = transactions
    .filter((tx) => {
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tx.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesJar = selectedJarId === "all" || tx.jarId === selectedJarId;
      return matchesSearch && matchesJar;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "amount-desc") {
        return Math.abs(b.amount) - Math.abs(a.amount);
      } else {
        return Math.abs(a.amount) - Math.abs(b.amount);
      }
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* SECTION 1: SEARCH, FILTER, AND SORT TOOLBAR */}
      <Card className="bg-white border-slate-200 rounded-2xl shadow-xs">
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Tìm nội dung, tag #CầnThiết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9.5 rounded-xl border-slate-200 text-xs font-semibold focus:ring-slate-400 placeholder:text-slate-400"
              />
            </div>

            {/* Jar Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <select
                value={selectedJarId}
                onChange={(e) => setSelectedJarId(e.target.value)}
                className="w-full h-9.5 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-hidden focus:ring-2 focus:ring-slate-400 focus:border-transparent select-none cursor-pointer appearance-none"
              >
                <option value="all">📁 Tất cả các hũ</option>
                {jars.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.icon} {j.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date-desc" | "date-asc" | "amount-desc" | "amount-asc")}
                className="w-full h-9.5 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-hidden focus:ring-2 focus:ring-slate-400 focus:border-transparent select-none cursor-pointer appearance-none"
              >
                <option value="date-desc">🕒 Thời gian: Mới nhất</option>
                <option value="date-asc">🕒 Thời gian: Cũ nhất</option>
                <option value="amount-desc">💰 Số tiền: Lớn nhất</option>
                <option value="amount-asc">💰 Số tiền: Nhỏ nhất</option>
              </select>
            </div>

            {/* Active filters indicators & Reset */}
            <div className="flex items-center justify-start lg:justify-end gap-2">
              {(searchTerm || selectedJarId !== "all" || sortBy !== "date-desc") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 h-9.5 px-3 rounded-xl"
                >
                  <X className="w-3.5 h-3.5" /> Xóa Bộ Lọc
                </Button>
              )}
              <Badge variant="secondary" className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-extrabold px-3 py-1.5 rounded-xl">
                Kết quả: {filteredTransactions.length}
              </Badge>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: TRANSACTION LEDGER TABLE */}
      {filteredTransactions.length === 0 ? (
        /* PREMIUM EMPTY STATE */
        <Card className="bg-white border-slate-200 rounded-2xl shadow-xs py-12 text-center">
          <CardContent className="space-y-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-[280px]">
              <h4 className="text-sm font-bold text-slate-900">Không tìm thấy giao dịch</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Thử thay đổi từ khóa tìm kiếm hoặc lọc theo hũ tài chính khác xem sao nhé.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="bg-white border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs mt-2"
            >
              Xem tất cả giao dịch
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          
          {/* DESKTOP TABLE VIEW */}
          <Card className="bg-white border-slate-200 rounded-2xl shadow-xs overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="p-4 pl-6">Thời Gian</th>
                    <th className="p-4">Hũ Tài Chính</th>
                    <th className="p-4">Nội Dung Giao Dịch</th>
                    <th className="p-4 text-right">Số Tiền (₫)</th>
                    {onDeleteTransaction && <th className="p-4 w-[60px]"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                  {filteredTransactions.map((tx) => {
                    const jar = jars.find((j) => j.id === tx.jarId);
                    
                    return (
                      <tr 
                        key={tx.id} 
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="p-4 pl-6 text-slate-400 font-bold flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {new Date(tx.date).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          })} 
                          <span className="text-[10px] text-slate-300 font-medium">
                            {new Date(tx.date).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </td>
                        
                        <td className="p-4">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                            <span className="text-sm shrink-0">{jar?.icon || "🛍️"}</span>
                            <span className="text-[11px] font-bold truncate max-w-[120px]">{jar?.name.split(" ")[1] || "Ăn uống"}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="space-y-1 max-w-[320px]">
                            <span className="text-slate-800 font-bold leading-relaxed wrap-break-word block">
                              {tx.description}
                            </span>
                            <div className="flex gap-1.5 flex-wrap">
                              {tx.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="text-[9px] font-extrabold text-slate-500 bg-slate-100 border border-slate-200/50 px-1.5 py-0.2 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>

                        <td className="p-4 text-right">
                          <span className={`text-sm font-extrabold ${tx.amount < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                            {tx.amount < 0 ? "" : "+"}{formatVND(tx.amount)}
                          </span>
                        </td>

                        {onDeleteTransaction && (
                          <td className="p-4 text-center">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all shrink-0 cursor-pointer"
                              onClick={() => onDeleteTransaction(tx.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* MOBILE CARDS VIEW */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredTransactions.map((tx) => {
              const jar = jars.find((j) => j.id === tx.jarId);

              return (
                <Card 
                  key={tx.id} 
                  className="bg-white border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3 relative group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                      <span className="text-xs shrink-0">{jar?.icon || "🛍️"}</span>
                      <span className="text-[10px] font-bold">{jar?.name.split(" ")[1] || "Ăn uống"}</span>
                    </div>

                    <span className={`text-xs font-extrabold shrink-0 ${tx.amount < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                      {tx.amount < 0 ? "" : "+"}{formatVND(tx.amount)}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-800 wrap-break-word leading-relaxed">
                    {tx.description}
                  </p>

                  <div className="flex justify-between items-center gap-2 flex-wrap border-t border-slate-50 pt-2.5">
                    <span className="text-[9px] font-bold text-slate-400 flex items-center gap-0.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(tx.date).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit"
                      })}{" "}
                      {new Date(tx.date).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>

                    <div className="flex gap-1 flex-wrap">
                      {tx.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-extrabold text-slate-500 bg-slate-100 px-1 py-0.2 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {onDeleteTransaction && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="absolute top-2 right-2 text-slate-350 hover:text-rose-500 hover:bg-rose-50 rounded-lg md:opacity-0 shrink-0 cursor-pointer"
                      onClick={() => onDeleteTransaction(tx.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
