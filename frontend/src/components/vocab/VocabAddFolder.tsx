"use client";
import React, { useState} from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FolderPlus, X } from "lucide-react";

interface VocabAddFolderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

export default function VocabAddFolder({ isOpen, onClose, onSave }: VocabAddFolderProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setError("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Vui lòng nhập tên thư mục.");
      return;
    }
    onSave(title.trim(), description.trim());
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-slate-100 max-w-md w-full p-6 shadow-2xl relative flex flex-col gap-5 animate-in zoom-in-95 duration-200"
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
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Tạo Thư Mục Mới</h3>
            <p className="text-xs text-slate-500 mt-0.5">Tổ chức từ vựng của bạn theo từng chủ đề riêng biệt.</p>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="folder-title" className="text-xs font-bold text-slate-700">
              Tên thư mục <span className="text-rose-500">*</span>
            </label>
            <Input
              id="folder-title"
              placeholder="Ví dụ: IELTS Academic, Giao tiếp hàng ngày..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 h-10"
              maxLength={50}
            />
            {error && (
              <span className="text-xs text-rose-500 font-semibold">{error}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="folder-desc" className="text-xs font-bold text-slate-700">
              Mô tả thư mục
            </label>
            <Textarea
              id="folder-desc"
              placeholder="Nhập mô tả ngắn giúp bạn định hình tốt hơn nội dung từ vựng..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-slate-200 focus-visible:border-sky-500 focus-visible:ring-sky-500/10 min-h-24 resize-none"
              maxLength={150}
            />
            <span className="text-[10px] text-slate-400 self-end">
              {description.length}/150 ký tự
            </span>
          </div>

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
              Lưu thư mục
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
