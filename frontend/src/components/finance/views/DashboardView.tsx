"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Calendar,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  PieChart as PieIcon,
  Activity
} from "lucide-react";

interface Jar {
  id: string;
  name: string;
  icon: string;
  percentage: number;
  allocated: number;
  spent: number;
  color: string;
}

interface Transaction {
  id: string;
  amount: number;
  jarId: string;
  date: string;
  description: string;
  tags: string[];
}

interface DashboardViewProps {
  jars: Jar[];
  transactions: Transaction[];
}

export default function DashboardView({ jars, transactions }: DashboardViewProps) {
  const [expandedJarId, setExpandedJarId] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Format currency
  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Calculate totals
  const totalIncome = 25000000; // Mock fixed income
  const totalAllocated = jars.reduce((sum, jar) => sum + jar.allocated, 0);
  const totalSpent = jars.reduce((sum, jar) => sum + jar.spent, 0);
  const totalRemaining = totalIncome - totalSpent;
  const allocationProgress = (totalAllocated / totalIncome) * 100;

  // Toggle expanded jar transactions
  const toggleJar = (id: string) => {
    setExpandedJarId(expandedJarId === id ? null : id);
  };

  // Get status color based on remaining amount ratio
  const getJarStatusProps = (jar: Jar) => {
    const remaining = jar.allocated - jar.spent;
    const ratio = jar.allocated > 0 ? (remaining / jar.allocated) * 100 : 0;
    
    if (remaining < 0) {
      return {
        bg: "bg-rose-50 border-rose-100",
        text: "text-rose-600",
        progressColor: "[&>div]:bg-rose-500",
        badgeBg: "bg-rose-100 text-rose-700",
        label: "Vượt chi"
      };
    } else if (ratio < 20) {
      return {
        bg: "bg-amber-50/50 border-amber-100",
        text: "text-amber-600",
        progressColor: "[&>div]:bg-amber-500",
        badgeBg: "bg-amber-100 text-amber-700",
        label: "Sắp hết"
      };
    } else {
      return {
        bg: "bg-emerald-50/30 border-emerald-100",
        text: "text-emerald-600",
        progressColor: "[&>div]:bg-emerald-500",
        badgeBg: "bg-emerald-100 text-emerald-700",
        label: "An toàn"
      };
    }
  };

  // 1. Calculations for Pie Chart (Donut Chart)
  const pieSegments = jars.map((jar, index) => {
    const percentage = jar.percentage;
    const strokeDasharray = `${percentage} ${100 - percentage}`;
    const prevPercentageSum = jars.slice(0, index).reduce((sum, j) => sum + j.percentage, 0);
    const strokeDashoffset = 100 - prevPercentageSum;
    return {
      ...jar,
      strokeDasharray,
      strokeDashoffset,
      index
    };
  });

  // 2. Calculations for Spent Area Chart (Daily trend)
  // Mock data for day-by-day accumulated spending from Day 1 to Day 30 of the current month
  const dailySpending = [
    { day: "01", spent: 300000 },
    { day: "05", spent: 4500000 },
    { day: "10", spent: 5400000 },
    { day: "15", spent: 8800000 },
    { day: "20", spent: 9800000 },
    { day: "25", spent: 9800000 },
    { day: "30", spent: 9800000 },
  ];

  const maxChartSpent = 12000000;
  const chartHeight = 160;
  const chartWidth = 500;
  const paddingLeft = 35;
  const paddingRight = 10;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  
  // Calculate SVG Points for Area path
  const points = dailySpending.map((d, index) => {
    const x = paddingLeft + (index / (dailySpending.length - 1)) * plotWidth;
    const y = chartHeight - (d.spent / maxChartSpent) * chartHeight;
    return { x, y, day: d.day, spent: d.spent };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  // Top 3 Largest Expenses
  const largestExpenses = [...transactions]
    .filter(t => t.amount < 0)
    .sort((a, b) => a.amount - b.amount) // Note: negative numbers, so smaller means bigger expense
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* SECTION 1: QUICK STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Income */}
        <Card className="bg-white border-slate-200 rounded-2xl shadow-xs overflow-hidden group hover:shadow-md transition-all">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng thu nhập tháng</p>
              <h3 className="text-xl md:text-2xl font-extrabold text-emerald-600 tracking-tight">+{formatVND(totalIncome)}</h3>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[10px] font-extrabold text-emerald-600 border border-emerald-100/50">
                Đã nhận
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <CircleDollarSign className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Stat 2: Allocated */}
        <Card className="bg-white border-slate-200 rounded-2xl shadow-xs overflow-hidden group hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Đã phân bổ vào hũ</p>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{formatVND(totalAllocated)}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold">{allocationProgress.toFixed(0)}%</span>
              </div>
            </div>
            <div className="space-y-1">
              <Progress value={allocationProgress} className="h-1.5 bg-slate-100 [&>div]:bg-slate-900" />
              <div className="text-[10px] text-slate-400 font-semibold flex justify-between">
                <span>Chưa chia: {formatVND(totalIncome - totalAllocated)}</span>
                <span>Hạn mức: 100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stat 3: Spent */}
        <Card className="bg-white border-slate-200 rounded-2xl shadow-xs overflow-hidden group hover:shadow-md transition-all">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tổng đã chi tiêu</p>
              <h3 className="text-xl md:text-2xl font-extrabold text-rose-600 tracking-tight">-{formatVND(totalSpent)}</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-rose-500">
                <Activity className="w-3.5 h-3.5" /> Chi tiêu ở mức ổn định
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <TrendingDown className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Stat 4: Remaining Savings */}
        <Card className="bg-white border-slate-200 rounded-2xl shadow-xs overflow-hidden group hover:shadow-md transition-all">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tích lũy còn lại</p>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">+{formatVND(totalRemaining)}</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                <Sparkles className="w-3.5 h-3.5" /> Khả năng tích lũy cao
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 2: JARS GRID */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-5 bg-slate-900 rounded-full"></span>
            Hệ thống 6 Hũ Tài Chính
          </h2>
          <Badge variant="secondary" className="bg-slate-100 text-slate-600 border border-slate-200 text-xs px-2.5 py-1 flex items-center gap-1 font-semibold">
            <Info className="w-3.5 h-3.5 text-slate-400" /> Click hũ để xem giao dịch
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jars.map((jar) => {
            const isExpanded = expandedJarId === jar.id;
            const remaining = jar.allocated - jar.spent;
            const spentPercent = jar.allocated > 0 ? (jar.spent / jar.allocated) * 100 : 0;
            const statusProps = getJarStatusProps(jar);
            
            // Get latest 3 transactions for this jar
            const jarTransactions = transactions
              .filter((t) => t.jarId === jar.id)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 3);

            return (
              <Card 
                key={jar.id} 
                className={`bg-white border-slate-200 rounded-2xl shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md ${
                  isExpanded ? "ring-1 ring-slate-400/50 scale-[1.01]" : ""
                }`}
              >
                {/* Card Header */}
                <div 
                  className="p-5 cursor-pointer select-none"
                  onClick={() => toggleJar(jar.id)}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shadow-2xs">
                        {jar.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">{jar.name}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Phân bổ: {jar.percentage}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end">
                      <Badge className={`text-[9px] font-extrabold px-1.5 py-0.2 border mb-1 shrink-0 ${statusProps.badgeBg} border-current/10`}>
                        {statusProps.label}
                      </Badge>
                      <div className="text-right">
                        <span className="text-[9px] font-bold text-slate-400 block leading-tight">Còn lại</span>
                        <span className={`text-xs font-extrabold ${statusProps.text}`}>{formatVND(remaining)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle section: Thin progress bar */}
                  <div className="space-y-1.5 mb-3">
                    <Progress value={Math.min(spentPercent, 100)} className={`h-1.5 bg-slate-100 ${statusProps.progressColor}`} />
                  </div>

                  {/* Bottom section: Subtext showing details */}
                  <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold mb-1 border-t border-slate-50 pt-2">
                    <span>Đã dùng: {formatVND(jar.spent)}</span>
                    <span>Hạn mức: {formatVND(jar.allocated)}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-center text-[10px] font-bold text-slate-400 gap-1 hover:text-slate-600 transition-colors">
                    {isExpanded ? (
                      <>Thu nhỏ <ChevronUp className="w-3.5 h-3.5" /></>
                    ) : (
                      <>Xem giao dịch gần đây <ChevronDown className="w-3.5 h-3.5" /></>
                    )}
                  </div>
                </div>

                {/* Expanded Transactions list */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Giao dịch gần đây</p>
                    
                    {jarTransactions.length === 0 ? (
                      <div className="text-center py-4 text-xs font-semibold text-slate-400">
                        Chưa có giao dịch nào trong hũ này.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {jarTransactions.map((tx) => (
                          <div 
                            key={tx.id} 
                            className="bg-white border border-slate-150 rounded-xl p-3 flex justify-between items-center gap-2 hover:border-slate-300 transition-colors"
                          >
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-slate-900 leading-snug wrap-break-word">
                                {tx.description}
                              </span>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-0.5">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(tx.date).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                  })}
                                </span>
                                {tx.tags.map((tag) => (
                                  <span key={tag} className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className={`text-xs font-bold shrink-0 ${tx.amount < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                              {tx.amount < 0 ? "" : "+"}{formatVND(tx.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: ANALYTICS SECTION (2-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Donut Chart */}
        <Card className="lg:col-span-5 bg-white border-slate-200 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-slate-500" /> Tỷ Lệ Phân Bổ Số Dư (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              
              {/* SVG Donut Chart */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                  <circle
                    className="text-slate-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="15.915"
                    cx="21"
                    cy="21"
                  />
                  {pieSegments.map((seg, i) => {
                    // Match colors nicely
                    const colors = [
                      "#10b981", // emerald
                      "#3b82f6", // blue
                      "#f59e0b", // amber
                      "#8b5cf6", // violet
                      "#ec4899", // pink
                      "#6366f1"  // indigo
                    ];
                    const strokeColor = colors[i % colors.length];
                    const isHovered = hoveredSegment === i;
                    
                    return (
                      <circle
                        key={seg.id}
                        className="transition-all duration-300 cursor-pointer"
                        stroke={strokeColor}
                        strokeWidth={isHovered ? "5.5" : "4"}
                        strokeDasharray={seg.strokeDasharray}
                        strokeDashoffset={seg.strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        r="15.915"
                        cx="21"
                        cy="21"
                        onMouseEnter={() => setHoveredSegment(i)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />
                    );
                  })}
                </svg>

                {/* Donut Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {hoveredSegment !== null ? jars[hoveredSegment].name.split(" ")[1] : "Tổng Hũ"}
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 leading-tight">
                    {hoveredSegment !== null ? `${jars[hoveredSegment].percentage}%` : jars.length}
                  </span>
                </div>
              </div>

              {/* Legends list */}
              <div className="flex-1 space-y-2 w-full">
                {jars.map((jar, i) => {
                  const colors = [
                    "bg-emerald-500", 
                    "bg-blue-500", 
                    "bg-amber-500", 
                    "bg-violet-500", 
                    "bg-pink-500", 
                    "bg-indigo-500"
                  ];
                  const colorClass = colors[i % colors.length];
                  const isHovered = hoveredSegment === i;

                  return (
                    <div 
                      key={jar.id}
                      className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-all ${
                        isHovered ? "bg-slate-50 font-bold" : ""
                      }`}
                      onMouseEnter={() => setHoveredSegment(i)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${colorClass}`}></span>
                        <span className="text-slate-600 truncate">{jar.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">{jar.percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Spending trend & Top Expenses */}
        <Card className="lg:col-span-7 bg-white border-slate-200 rounded-2xl shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" /> Xu Hướng Chi Tiêu Theo Ngày (Trong Tháng)
            </CardTitle>
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-[10px] px-2 py-0.5">
              Cập nhật 10s trước
            </Badge>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* SVG Line / Area Chart */}
              <div className="md:col-span-2 space-y-2">
                <div className="relative w-full h-[180px]">
                  <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Dotted grid lines and Y Axis labels */}
                    {[2000000, 4000000, 6000000, 8000000, 10000000].map((val) => {
                      const y = chartHeight - (val / maxChartSpent) * chartHeight;
                      return (
                        <g key={val}>
                          <line 
                            x1={paddingLeft} 
                            y1={y} 
                            x2={chartWidth - paddingRight} 
                            y2={y} 
                            stroke="#f1f5f9" 
                            strokeWidth="1" 
                            strokeDasharray="4 4" 
                          />
                          <text 
                            x="2" 
                            y={y + 3} 
                            fill="#94a3b8" 
                            fontSize="8" 
                            className="font-extrabold select-none"
                          >
                            {val / 1000000}M
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Area path */}
                    <path d={areaD} fill="url(#chartGradient)" className="transition-all duration-500" />
                    
                    {/* Line path */}
                    <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-500" />

                    {/* Data Points */}
                    {points.map((p, i) => {
                      const isHovered = hoveredPoint === i;
                      return (
                        <g key={i}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={isHovered ? "6" : "4"}
                            fill={isHovered ? "#b45309" : "#f59e0b"}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            className="cursor-pointer transition-all duration-150"
                            onMouseEnter={() => setHoveredPoint(i)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Dynamic Tooltip on Hover */}
                  {hoveredPoint !== null && (
                    <div 
                      className="absolute bg-slate-900 text-white rounded-lg p-2 text-[10px] font-bold shadow-lg border border-slate-800 z-10 -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-150"
                      style={{ 
                        left: `${(points[hoveredPoint].x / chartWidth) * 100}%`, 
                        top: `${(points[hoveredPoint].y / chartHeight) * 100 - 5}%` 
                      }}
                    >
                      <p className="text-slate-400">Ngày: {points[hoveredPoint].day}</p>
                      <p className="text-amber-400">Lũy kế: {formatVND(points[hoveredPoint].spent)}</p>
                    </div>
                  )}
                </div>

                {/* X Axis labels */}
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 px-1">
                  {dailySpending.map((d, i) => (
                    <span key={i}>{d.day}</span>
                  ))}
                </div>
              </div>

              {/* Sidebar Widget: Top 3 Khoản Chi Lớn Nhất */}
              <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4 space-y-3">
                <h5 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Top 3 Chi Tiêu Lớn</h5>
                
                {largestExpenses.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400 font-semibold">Chưa phát sinh chi tiêu lớn.</div>
                ) : (
                  <div className="space-y-2">
                    {largestExpenses.map((tx, index) => {
                      const jar = jars.find(j => j.id === tx.jarId);
                      const badgeColors = ["bg-rose-50 text-rose-700", "bg-rose-50/70 text-rose-600", "bg-rose-50/50 text-rose-500"];
                      const badgeClass = badgeColors[index % badgeColors.length];

                      return (
                        <div key={tx.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-2 hover:border-slate-200 transition-colors">
                          <div className="truncate space-y-0.5">
                            <p className="text-xs font-bold text-slate-800 truncate leading-tight">{tx.description}</p>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-bold text-slate-400">{jar?.icon || "🛍️"} {jar?.name.split(" ")[1] || ""}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className={`text-[10px] font-bold shrink-0 ${badgeClass}`}>
                            {formatVND(Math.abs(tx.amount))}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
