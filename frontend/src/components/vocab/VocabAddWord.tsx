"use client";
import React, { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePlus, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { DeckItem } from "@/app/vocab/data";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createWordAction } from "@/app/vocab/actions";

interface VocabAddWordProps {
  isOpen: boolean;
  decks: DeckItem[];
  defaultFolderId?: string;
}

export default function VocabAddWord({ isOpen, decks, defaultFolderId }: VocabAddWordProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(createWordAction, { success: false, error: null });
  const [imageUrlPreview, setImageUrlPreview] = useState("");

  useEffect(() => {
    if (state.success) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("addWord");
      const newQuery = newSearchParams.toString();
      router.push(`${pathname}${newQuery ? `?${newQuery}` : ""}`, { scroll: false });
    }
  }, [state.success, router, pathname, searchParams]);

  if (!isOpen) return null;

  const handleClose = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("addWord");
    const newQuery = newSearchParams.toString();
    router.push(`${pathname}${newQuery ? `?${newQuery}` : ""}`, { scroll: false });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-slate-100 max-w-lg w-full p-6 shadow-2xl relative flex flex-col gap-5 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Button 
          type="button"
          variant="ghost" 
          size="icon" 
          onClick={handleClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
            <FilePlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Tạo Thẻ Từ Mới</h3>
            <p className="text-xs text-slate-500 mt-0.5">Thêm từ mới kèm nghĩa, ví dụ minh họa sinh động.</p>
          </div>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col gap-1.5">
              <label htmlFor="word" className="text-xs font-bold text-slate-700">
                Từ vựng <span className="text-rose-500">*</span>
              </label>
              <Input
                id="word"
                name="word"
                placeholder="Ví dụ: Resilient, Synergy..."
                className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 h-10"
                maxLength={40}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="type" className="text-xs font-bold text-slate-700">
                Loại từ
              </label>
              <select
                id="type"
                name="type"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="adj">Tính từ (adj)</option>
                <option value="n">Danh từ (n)</option>
                <option value="v">Động từ (v)</option>
                <option value="adv">Trạng từ (adv)</option>
                <option value="idiom">Thành ngữ (idiom)</option>
                <option value="phrase">Cụm từ (phrase)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="folderId" className="text-xs font-bold text-slate-700">
              Thư mục lưu trữ <span className="text-rose-500">*</span>
            </label>
            <select
              id="folderId"
              name="folderId"
              defaultValue={defaultFolderId}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>{deck.title}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="definition" className="text-xs font-bold text-slate-700">
              Nghĩa tiếng Việt <span className="text-rose-500">*</span>
            </label>
            <Input
              id="definition"
              name="definition"
              placeholder="Ví dụ: Kiên cường, hiệp lực..."
              className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 h-10"
              maxLength={80}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="usage" className="text-xs font-bold text-slate-700">
              Cách sử dụng (Ví dụ minh họa)
            </label>
            <Textarea
              id="usage"
              name="usage"
              placeholder="Nhập ví dụ đặt câu: 'She is incredibly resilient.' hoặc ghi chú collocations..."
              className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 min-h-20 resize-none"
              maxLength={150}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="imageUrl" className="text-xs font-bold text-slate-700">
              Hình ảnh minh họa
            </label>
            <div className="flex gap-3 items-start">
              <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative">
                {imageUrlPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={imageUrlPreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                    onError={() => setImageUrlPreview("")}
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Dán URL hình ảnh chất lượng cao vào đây..."
                  onChange={(e) => setImageUrlPreview(e.target.value)}
                  className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 h-10 text-xs"
                />
              </div>
            </div>
          </div>

          {state.error && (
            <span className="text-xs text-rose-500 font-semibold self-start">{state.error}</span>
          )}

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-slate-200 text-slate-600 hover:bg-slate-50 font-bold px-5"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 shadow-sm shadow-sky-600/10"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Lưu thẻ từ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
