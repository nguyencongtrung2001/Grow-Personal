"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, Star } from "lucide-react";

interface CardWordProps {
  word: string;
  type: string;
  definition: string;
  usage?: string;
  imageUrl?: string;
  isStarred: boolean;
  onToggleStar: () => void;
  viewMode?: "grid" | "list";
}

export default function CardWord({
  word,
  type,
  definition,
  usage,
  imageUrl,
  isStarred,
  onToggleStar,
  viewMode = "grid",
}: CardWordProps) {
  
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Map word types to beautiful Vietnamese abbreviations and badges
  const getTypeBadgeColor = (t: string) => {
    switch (t?.toLowerCase()) {
      case "n":
        return "bg-amber-50 text-amber-700 border-amber-200/50";
      case "v":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
      case "adj":
        return "bg-sky-50 text-sky-700 border-sky-200/50";
      case "adv":
        return "bg-purple-50 text-purple-700 border-purple-200/50";
      case "idiom":
        return "bg-rose-50 text-rose-700 border-rose-200/50";
      case "phrase":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/50";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/50";
    }
  };

  const getTypeName = (t: string) => {
    switch (t?.toLowerCase()) {
      case "n": return "Noun";
      case "v": return "Verb";
      case "adj": return "Adjective";
      case "adv": return "Adverb";
      case "idiom": return "Idiom";
      case "phrase": return "Phrase";
      default: return t;
    }
  };

  // 1. List View Mode Layout
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/60 p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md hover:border-sky-200/60 transition-all duration-200 group relative">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* List Image illustration thumbnail */}
          {imageUrl && (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden bg-slate-50 rounded-xl border border-slate-100 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={imageUrl} 
                alt={word} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-lg font-extrabold text-slate-900 tracking-tight truncate">
                {word}
              </h4>
              <Badge className={`border font-bold text-[10px] py-0.5 px-2 rounded-md shadow-none shrink-0 ${getTypeBadgeColor(type)}`}>
                {getTypeName(type)}
              </Badge>
            </div>
            <div className="border-l-2 border-sky-400 pl-2.5 py-0.5">
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                {definition}
              </p>
            </div>
            {usage && (
              <p className="text-xs text-slate-500 italic max-w-xl truncate">
                &ldquo;{usage}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* List Action Buttons (Speech & Star) */}
        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSpeak}
            className="w-8 h-8 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
            title="Phát âm"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar();
            }}
            className={`w-8 h-8 rounded-lg transition-colors cursor-pointer ${
              isStarred 
                ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50" 
                : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
            }`}
            title={isStarred ? "Bỏ yêu thích" : "Yêu thích"}
          >
            <Star className={`w-4 h-4 ${isStarred ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    );
  }

  // 2. Default Grid View Mode Layout
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-4.5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-sky-200/60 transition-all duration-200 group relative overflow-hidden">
      <div>
        {/* Top Image if present */}
        {imageUrl && (
          <div className="relative w-full h-32 overflow-hidden bg-slate-50 rounded-xl mb-3 border border-slate-100 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageUrl} 
              alt={word} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}

        {/* Word header block */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <h4 className="text-lg font-extrabold text-slate-900 tracking-tight truncate min-w-0">
              {word}
            </h4>
            <Badge className={`border font-bold text-[10px] py-0.5 px-2 rounded-md shadow-none shrink-0 ${getTypeBadgeColor(type)}`}>
              {getTypeName(type)}
            </Badge>
          </div>

          {/* Action buttons (Audio & Star) */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSpeak}
              className="w-7 h-7 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
              title="Phát âm tiếng Anh"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar();
              }}
              className={`w-7 h-7 rounded-lg transition-colors cursor-pointer ${
                isStarred 
                  ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50" 
                  : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
              }`}
              title={isStarred ? "Bỏ yêu thích" : "Đánh dấu yêu thích"}
            >
              <Star className={`w-4 h-4 ${isStarred ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Vietnamese Definition */}
        <div className="border-l-2 border-sky-400 pl-2.5 py-0.5 mt-2 shrink-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">
            {definition}
          </p>
        </div>

        {/* Example/Usage Sentence */}
        {usage && (
          <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-2.5 mt-3 text-xs text-slate-600 leading-relaxed italic font-sans shrink-0">
            <span className="font-bold text-sky-600 text-[9px] block mb-0.5 not-italic uppercase tracking-wider">Cách dùng:</span>
            &ldquo;{usage}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
