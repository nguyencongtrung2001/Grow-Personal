import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Wallet, ChevronRight } from "lucide-react";

export default function FinancePots() {
  return (
    <Card className="lg:col-span-7 flex flex-col justify-between shadow-sm border-slate-200 transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3 space-y-0">
        <div className="flex items-center gap-2 text-amber-500">
          <Wallet className="w-5 h-5" />
          <CardTitle className="text-base font-bold text-slate-900">
            Hũ Tài Chính Thông Minh (Timo Pots)
          </CardTitle>
        </div>
        <Link href="/finance" className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-0.5">
          Chi tiết <ChevronRight className="w-3 h-3" />
        </Link>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng tài sản phân bổ</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">87,400,000 ₫</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-800">🛍️ Hũ Cố Định (Thiết yếu)</span>
              <span className="font-bold">24.5M</span>
            </div>
            <Progress value={81} className="h-1.5 bg-slate-200 [&>div]:bg-amber-500" />
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-800">🐷 Hũ Tiết Kiệm (Dài hạn)</span>
              <span className="font-bold">52.0M</span>
            </div>
            <Progress value={65} className="h-1.5 bg-slate-200 [&>div]:bg-amber-600" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs text-slate-500">
        <span>Tháng này đã chi tiêu: <strong className="text-rose-600">9,800,000 ₫</strong></span>
        <Badge variant="secondary" className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50 font-bold text-[10px] px-2 py-0.5">
          Tỷ lệ tiết kiệm: 42%
        </Badge>
      </CardFooter>
    </Card>
  );
}