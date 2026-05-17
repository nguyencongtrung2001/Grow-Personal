"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"pomo" | "short" | "long">("pomo");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0 && minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          if (interval) clearInterval(interval);
        }
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes]);

  const switchMode = (newMode: "pomo" | "short" | "long", mins: number) => {
    setMode(newMode);
    setMinutes(mins);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <Card className="border-slate-200 shadow-sm p-6 bg-white rounded-xl flex flex-col items-center justify-center text-center">
      <div className="flex gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg mb-6">
        <Button 
          variant={mode === "pomo" ? "secondary" : "ghost"} 
          onClick={() => switchMode("pomo", 25)}
          className={`h-8 px-4 text-xs font-medium rounded-md shadow-none ${mode === "pomo" ? "bg-white text-slate-900 border border-slate-200" : "text-slate-500"}`}
        >
          Pomodoro
        </Button>
        <Button 
          variant={mode === "short" ? "secondary" : "ghost"} 
          onClick={() => switchMode("short", 5)}
          className={`h-8 px-4 text-xs font-medium rounded-md shadow-none ${mode === "short" ? "bg-white text-slate-900 border border-slate-200" : "text-slate-500"}`}
        >
          Nghỉ Ngắn
        </Button>
        <Button 
          variant={mode === "long" ? "secondary" : "ghost"} 
          onClick={() => switchMode("long", 15)}
          className={`h-8 px-4 text-xs font-medium rounded-md shadow-none ${mode === "long" ? "bg-white text-slate-900 border border-slate-200" : "text-slate-500"}`}
        >
          Nghỉ Dài
        </Button>
      </div>

      <div className="text-5xl font-bold text-slate-900 mb-6 tracking-tighter font-sans">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={() => setIsActive(!isActive)}
          className="bg-emerald-500 text-white px-8 h-12 rounded-full text-sm font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
        >
          {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          {isActive ? "Tạm Dừng" : "Bắt Đầu Tập Trung"}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => switchMode(mode, mode === "pomo" ? 25 : mode === "short" ? 5 : 15)}
          className="h-12 w-12 border-slate-200 text-slate-400 hover:text-slate-600 rounded-full"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}