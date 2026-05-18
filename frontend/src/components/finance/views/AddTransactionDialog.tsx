"use client";
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, Check } from "lucide-react";

interface Jar {
  id: string;
  name: string;
  icon: string;
  percentage: number;
  allocated: number;
  spent: number;
  color: string;
}

interface AddTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jars: Jar[];
  onAddTransaction: (amount: number, jarId: string, description: string, date: string, tags: string[]) => void;
}

const QUICK_TAGS = ["#CầnThiết", "#HưởngThụ", "#ImpulseBuy", "#BấtKhảKháng"];

export default function AddTransactionDialog({ 
  isOpen, 
  onClose, 
  jars, 
  onAddTransaction 
}: AddTransactionDialogProps) {
  const [amountInput, setAmountInput] = useState("");
  const [selectedJarId, setSelectedJarId] = useState(jars[0]?.id || "");
  const [dateInput, setDateInput] = useState(() => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
  });
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");

  // Format currency for large visual display
  const formatInputAmount = (valStr: string) => {
    if (!valStr) return "0 ₫";
    const num = parseInt(valStr.replace(/\D/g, ""), 10) || 0;
    return new Intl.NumberFormat("vi-VN").format(num) + " ₫";
  };

  // Handle amount digits typing
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setAmountInput(digits);
  };

  // Toggle quick tags
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Submit transaction
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseInt(amountInput, 10) || 0;
    if (amountVal <= 0) {
      alert("Vui lòng nhập số tiền lớn hơn 0!");
      return;
    }
    if (!selectedJarId) {
      alert("Vui lòng chọn hũ tài chính!");
      return;
    }
    if (!description.trim()) {
      alert("Vui lòng nhập mô tả chi tiêu!");
      return;
    }

    // Amount is negative for expenses, positive for income
    const finalAmount = transactionType === "expense" ? -amountVal : amountVal;

    onAddTransaction(
      finalAmount,
      selectedJarId,
      description.trim(),
      dateInput || new Date().toISOString(),
      selectedTags
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-extrabold text-slate-900 tracking-tight">Thêm Giao Dịch Mới</DialogTitle>
          <DialogDescription className="text-xs text-slate-400 font-semibold leading-relaxed">
            Ghi chép giao dịch nhanh giúp kiểm soát dòng tiền của hũ tài chính thông minh.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* TYPE TOGGLE: EXPENSE VS INCOME */}
          <div className="flex p-1 bg-slate-100 rounded-xl gap-1">
            <Button
              type="button"
              variant="ghost"
              className={`flex-1 text-xs font-bold py-2 rounded-lg cursor-pointer transition-all ${
                transactionType === "expense" 
                  ? "bg-white text-rose-600 shadow-xs" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
              onClick={() => setTransactionType("expense")}
            >
              💸 Khoản Chi (Tiền ra)
            </Button>
            <Button
              type="button"
              variant="ghost"
              className={`flex-1 text-xs font-bold py-2 rounded-lg cursor-pointer transition-all ${
                transactionType === "income" 
                  ? "bg-white text-emerald-600 shadow-xs" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
              onClick={() => setTransactionType("income")}
            >
              💰 Khoản Thu (Tiền vào)
            </Button>
          </div>

          {/* FIELD 1: BIG AMOUNT INPUT */}
          <div className="space-y-1.5 text-center">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Số tiền giao dịch</label>
            <div className="relative inline-block w-full">
              <Input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={amountInput}
                onChange={handleAmountChange}
                placeholder="Nhập số tiền"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                autoFocus
              />
              <div className={`text-3xl md:text-4xl font-black tracking-tight py-4 px-2 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center gap-1 ${
                transactionType === "expense" ? "text-rose-600" : "text-emerald-600"
              }`}>
                {transactionType === "expense" && amountInput && <span className="text-xl font-bold">-</span>}
                {transactionType === "income" && amountInput && <span className="text-xl font-bold">+</span>}
                <span>{formatInputAmount(amountInput)}</span>
              </div>
            </div>
          </div>

          {/* FIELD 2: JAR SELECTOR */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Chọn hũ tài chính</label>
            
            {/* Inline Horizontal Scroll / Grid of Circular Buttons */}
            <div className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin select-none snap-x snap-mandatory">
              {jars.map((jar) => {
                const isSelected = selectedJarId === jar.id;
                
                return (
                  <button
                    key={jar.id}
                    type="button"
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all cursor-pointer min-w-[76px] snap-start shrink-0 ${
                      isSelected 
                        ? "bg-slate-900 border-slate-900 text-white scale-[1.03] shadow-md shadow-slate-900/10" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                    onClick={() => setSelectedJarId(jar.id)}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                      isSelected ? "bg-white/20" : "bg-slate-50"
                    }`}>
                      {jar.icon}
                    </div>
                    <span className="text-[9px] font-bold tracking-wide truncate max-w-[68px]">
                      {jar.name.split(" ")[1] || ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FIELD 3: DATE & TIME */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Thời gian giao dịch
            </label>
            <Input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="h-9.5 rounded-xl border-slate-200 text-xs font-semibold focus:ring-slate-400"
            />
          </div>

          {/* FIELD 4: DESCRIPTION */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Nội dung chi tiết</label>
            <Textarea
              rows={2}
              placeholder={
                transactionType === "expense" 
                  ? "Ăn sáng bánh mì & cà phê đen..." 
                  : "Nhận tiền lương tháng / Freelance..."
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl border-slate-200 text-xs font-semibold focus:ring-slate-400 placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* FIELD 5: QUICK TAGS */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Phân loại nhanh (Tags)
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {QUICK_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg cursor-pointer border select-none transition-all ${
                      isSelected 
                        ? "bg-slate-900 border-slate-900 text-white font-extrabold" 
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <DialogFooter className="pt-2 gap-2 sm:gap-0 border-t border-slate-100 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9.5 rounded-xl text-xs font-bold text-slate-500 border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={!amountInput || parseInt(amountInput, 10) <= 0 || !description.trim()}
              className={`h-9.5 rounded-xl text-xs font-bold px-5 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                amountInput && parseInt(amountInput, 10) > 0 && description.trim()
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Check className="w-4 h-4" /> Xác Nhận Giao Dịch
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}
