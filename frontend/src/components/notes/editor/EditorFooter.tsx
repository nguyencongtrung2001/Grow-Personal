import React from "react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Save, Loader2 } from "lucide-react";

interface EditorFooterProps {
  onSave: () => void;
  isPending: boolean;
}

export default function EditorFooter({ onSave, isPending }: EditorFooterProps) {
  return (
    <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
      <span className="text-xs text-slate-400 flex items-center gap-1">
        <Cloud className="w-4 h-4 text-amber-500 fill-amber-500/10" /> 
        Tự động lưu đám mây thành công
      </span>
      <div className="flex gap-2">
        <Button type="button" variant="ghost" className="px-5 text-sm font-semibold text-slate-500 hover:bg-slate-200 rounded-xl h-10">
          Hủy bỏ
        </Button>
        <Button 
          onClick={onSave}
          disabled={isPending}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 rounded-xl shadow-md shadow-amber-500/10 active:scale-[0.98] transition-all gap-1.5 h-10 min-w-[140px]"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              Lưu ghi chú
            </>
          )}
        </Button>
      </div>
    </CardFooter>
  );
}
