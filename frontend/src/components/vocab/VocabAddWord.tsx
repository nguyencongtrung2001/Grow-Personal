"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePlus, X, Image as ImageIcon} from "lucide-react";
import { DeckItem } from "./VocabDeckGrid";

interface VocabAddWordProps {
  isOpen: boolean;
  onClose: () => void;
  decks: DeckItem[];
  onSave: (wordData: {
    word: string;
    type: string;
    definition: string;
    imageUrl?: string;
    usage?: string;
    folderId: string;
  }) => void;
}

export default function VocabAddWord({ isOpen, onClose, decks, onSave }: VocabAddWordProps) {
  const [word, setWord] = useState("");
  const [type, setType] = useState("adj");
  const [definition, setDefinition] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [usage, setUsage] = useState("");
  const [folderId, setFolderId] = useState(decks[0]?.id || "");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setWord("");
    setType("adj");
    setDefinition("");
    setImageUrl("");
    setUsage("");
    setFolderId(decks[0]?.id || "");
    setError("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) {
      setError("Vui lòng nhập từ vựng.");
      return;
    }
    if (!definition.trim()) {
      setError("Vui lòng nhập định nghĩa tiếng Việt.");
      return;
    }
    if (!folderId) {
      setError("Vui lòng chọn thư mục lưu trữ.");
      return;
    }

    onSave({
      word: word.trim(),
      type,
      definition: definition.trim(),
      imageUrl: imageUrl.trim() || undefined,
      usage: usage.trim() || undefined,
      folderId,
    });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-slate-100 max-w-lg w-full p-6 shadow-2xl relative flex flex-col gap-5 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
            <FilePlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Tạo Thẻ Từ Mới</h3>
            <p className="text-xs text-slate-500 mt-0.5">Thêm từ mới kèm nghĩa, ví dụ minh họa sinh động.</p>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Dòng 1: Từ vựng & Loại từ */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col gap-1.5">
              <label htmlFor="word-text" className="text-xs font-bold text-slate-700">
                Từ vựng <span className="text-rose-500">*</span>
              </label>
              <Input
                id="word-text"
                placeholder="Ví dụ: Resilient, Synergy..."
                value={word}
                onChange={(e) => {
                  setWord(e.target.value);
                  if (error) setError("");
                }}
                className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 h-10"
                maxLength={40}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="word-type" className="text-xs font-bold text-slate-700">
                Loại từ
              </label>
              <select
                id="word-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
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

          {/* Định nghĩa tiếng Việt */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="word-definition" className="text-xs font-bold text-slate-700">
              Nghĩa tiếng Việt <span className="text-rose-500">*</span>
            </label>
            <Input
              id="word-definition"
              placeholder="Ví dụ: Kiên cường, hiệp lực..."
              value={definition}
              onChange={(e) => {
                setDefinition(e.target.value);
                if (error) setError("");
              }}
              className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 h-10"
              maxLength={80}
            />
          </div>

          {/* Cách sử dụng từ (Ví dụ) */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="word-usage" className="text-xs font-bold text-slate-700">
              Cách sử dụng (Ví dụ minh họa)
            </label>
            <Textarea
              id="word-usage"
              placeholder="Nhập ví dụ đặt câu: 'She is incredibly resilient.' hoặc ghi chú collocations, cách chia từ..."
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 min-h-20 resize-none"
              maxLength={150}
            />
          </div>

          {/* Hình ảnh từ vựng */}
          <div className="flex flex-col gap-2">
            <label htmlFor="word-image" className="text-xs font-bold text-slate-700">
              Hình ảnh minh họa
            </label>
            
            <div className="flex gap-3 items-start">
              {/* Box Preview */}
              <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                    onError={() => setError("Link ảnh không hợp lệ")}
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-300" />
                )}
              </div>

              {/* Text Input URL */}
              <div className="flex-1 flex flex-col gap-1.5">
                <Input
                  id="word-image"
                  placeholder="Dán URL hình ảnh chất lượng cao vào đây..."
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (error) setError("");
                  }}
                  className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 h-10 text-xs"
                />
                
         
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <span className="text-xs text-rose-500 font-semibold self-start">{error}</span>
          )}

          {/* Modal Actions */}
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
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 shadow-sm shadow-sky-600/10"
            >
              Lưu thẻ từ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
