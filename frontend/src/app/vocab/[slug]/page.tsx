// src/app/vocab/[slug]/page.tsx
import React, { Suspense } from "react";
import VocabGameEngine from "@/components/vocab/game/VocabGameEngine";
import VocabWordSection from "@/components/vocab/VocabWordSection";
import VocabControlPanel from "@/components/vocab/VocabMini";
import VocabAddWord from "@/components/vocab/VocabAddWord";
import { Skeleton } from "@/components/ui/skeleton";
import { getDecksAction } from "@/app/vocab/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ game?: string; addWord?: string }>;
}

export default async function VocabDeckDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { slug } = resolvedParams;
  const gameMode = resolvedSearchParams.game;
  const isAddWordOpen = resolvedSearchParams.addWord === "true";

  const decks = await getDecksAction();
  const deck = decks.find(d => d.id === slug);

  if (!deck) {
    notFound();
  }

  const words = deck.words;

  return (
    <main className="w-full max-w-7xl mx-auto p-4 md:p-6 min-h-screen animate-in fade-in duration-300">
      {gameMode ? (
        <Suspense fallback={<GameLoadingSkeleton />}>
          <VocabGameEngine 
            mode={gameMode} 
            words={words.map((w, index) => ({
              id: `${w.word}-${index}`,
              word: w.word,
              type: w.type,
              definition: w.definition,
              example: w.usage || "Chưa có ví dụ minh họa."
            }))} 
            slug={slug} 
          />
        </Suspense>
      ) : (
        <div className="space-y-6">
          {/* Breadcrumb / Back button */}
          <div>
            <Link 
              href="/vocab" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Không Gian Từ Vựng
            </Link>
          </div>

          {/* Deck Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {deck.title}
              </h1>
              <p className="text-sm text-slate-500 mt-1 leading-normal max-w-3xl">
                {deck.description}
              </p>
            </div>
            
            <Button 
              asChild
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 h-11 rounded-xl shadow-md shadow-sky-600/10 flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-center transition-all active:scale-[0.98]"
            >
              <Link href={`/vocab/${slug}?addWord=true`} scroll={false}>
                <Plus className="w-4 h-4 text-white" />
                Thêm thẻ từ mới
              </Link>
            </Button>
          </div>

          {/* Mini game control panel */}
          <VocabControlPanel slug={slug} />

          {/* Word list section */}
          <Suspense fallback={<GameLoadingSkeleton />}>
            <VocabWordSection words={words} folderId={slug} />
          </Suspense>
        </div>
      )}

      {/* Add word modal */}
      {isAddWordOpen && (
        <VocabAddWord isOpen={true} decks={decks} defaultFolderId={slug} />
      )}
    </main>
  );
}

function GameLoadingSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 mt-12">
      <Skeleton className="h-8 w-1/4 rounded-lg mx-auto" />
      <Skeleton className="h-[450px] w-full rounded-2xl shadow-sm" />
      <div className="flex justify-between max-w-xs mx-auto">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  );
}