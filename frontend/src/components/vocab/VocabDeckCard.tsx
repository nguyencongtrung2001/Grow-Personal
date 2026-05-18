"use client";
import React from "react";
import Link from "next/link";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, MoreVertical, ChevronRight } from "lucide-react";
import { DeckItem } from "./VocabDeckGrid";

interface VocabDeckCardProps {
  deck: DeckItem;
}

export default function VocabDeckCard({ deck }: VocabDeckCardProps) {
  return (
    <Card className="rounded-2xl p-5 bg-white border-[#E2EDF5] flex flex-col justify-between min-h-[220px] shadow-[0_4px_0_#BAE6FD,0_8px_0_#E0F2FE] transition-all hover:-translate-y-1 hover:shadow-[0_6px_0_#BAE6FD,0_10px_0_#E0F2FE] duration-200">
      <Link href={`/vocab/${deck.id}`} className="block flex-1 group cursor-pointer">
        <div>
          {/* Header điều khiển thẻ */}
          <div className="p-0 flex flex-row justify-between items-start mb-2.5">
            <Folder className={`w-8 h-8 ${deck.themeColor} fill-current group-hover:scale-105 transition-transform`} />
            
            {/* Dừng sự kiện nổi bọt khi click nút Tác vụ khác */}
            <div onClick={(e) => e.preventDefault()}>
              <Button variant="ghost" size="icon" className="w-7 h-7 p-0 text-slate-400 hover:bg-slate-100 rounded-lg">
                <MoreVertical className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Nội dung thông tin bộ từ */}
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
              {deck.title}
            </h4>
            <p className="text-xs text-slate-500 leading-normal line-clamp-2">{deck.description}</p>
          </div>
        </div>
      </Link>

      {/* Footer quản lý hành động */}
      <CardFooter className="p-0 border-t border-slate-100 pt-3 mt-3 flex justify-between items-center">
        <Badge className="bg-sky-50 text-sky-700 hover:bg-sky-50 font-bold border-none font-mono text-[10px] py-0.5 px-2 rounded-md shadow-none">
          {deck.totalCards} Thẻ từ
        </Badge>
        <Link href={`/vocab/${deck.id}`} className="cursor-pointer">
          <Button variant="ghost" className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:bg-transparent p-0 flex items-center gap-0.5">
            Học ngay <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}