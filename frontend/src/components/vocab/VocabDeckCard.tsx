"use client";
import React from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, MoreVertical, Star, ChevronRight } from "lucide-react";
import { DeckItem } from "./VocabDeckGrid";

interface VocabDeckCardProps {
  deck: DeckItem;
}

export default function VocabDeckCard({ deck }: VocabDeckCardProps) {
  return (
    <Card className="rounded-2xl p-6 bg-white border-[#E2EDF5] flex flex-col justify-between min-h-[340px] shadow-[0_4px_0_#BAE6FD,0_8px_0_#E0F2FE] transition-transform hover:-translate-y-1 duration-200">
      <div>
        {/* Header điều khiển thẻ */}
        <CardHeader className="p-0 flex flex-row justify-between items-start mb-3 space-y-0">
          <Folder className={`w-10 h-10 ${deck.themeColor} fill-current`} />
          <Button variant="ghost" size="icon" className="w-8 h-8 p-0 text-slate-400 hover:bg-slate-100 rounded-lg">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </CardHeader>

        {/* Nội dung thông tin bộ từ */}
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-slate-900">{deck.title}</h4>
          <p className="text-xs text-slate-500 leading-normal">{deck.description}</p>
        </div>

        {/* Danh sách từ xem trước (Preview Words Area) */}
        <div className="mt-4 space-y-2">
          {deck.words.map((w, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex justify-between items-center group/item hover:bg-slate-100/50 transition-colors">
              <div className="truncate pr-2">
                <p className="text-xs font-bold text-slate-800 truncate">{w.word}</p>
                <p className="text-[10px] text-slate-400 truncate font-sans">
                  <span className="italic font-medium text-sky-600 mr-1">{w.type}</span>• {w.definition}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="w-7 h-7 p-0 rounded-full shrink-0">
                <Star className={`w-4 h-4 ${w.isStarred ? "text-amber-500 fill-current" : "text-slate-300"}`} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer quản lý hành động */}
      <CardFooter className="p-0 border-t border-slate-100 pt-4 mt-4 flex justify-between items-center">
        <Badge className="bg-sky-50 text-sky-700 hover:bg-sky-50 font-bold border-none font-mono text-[11px] py-0.5 px-2.5 rounded-md shadow-none">
          {deck.totalCards} Thẻ từ
        </Badge>
        <Button variant="ghost" className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:bg-transparent p-0 flex items-center gap-0.5">
          Học ngay <ChevronRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}