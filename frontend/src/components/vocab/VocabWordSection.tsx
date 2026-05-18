"use client";
import React, { useState, useCallback } from "react";
import { WordPreview } from "./VocabDeckGrid";
import SearchWords from "./SearchWords";
import VocabListWord from "./VocabListWord";

interface VocabWordSectionProps {
  words: WordPreview[];
  onToggleStar: (wordName: string) => void;
  onAddWordClick: () => void;
}

/**
 * VocabWordSection — isolates searchQuery & viewMode state so that toggling
 * grid/list or typing in the search box only re-renders this subtree,
 * leaving the parent folder header completely untouched.
 */
export default function VocabWordSection({
  words,
  onToggleStar,
  onAddWordClick,
}: VocabWordSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredWords = words.filter((w) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      w.word.toLowerCase().includes(query) ||
      w.definition.toLowerCase().includes(query) ||
      w.type.toLowerCase().includes(query)
    );
  });

  const handleClearSearch = useCallback(() => setSearchQuery(""), []);

  return (
    <>
      {/* Search Input Bar & Grid/List Switcher */}
      <SearchWords
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Word Cards display — only this subtree re-renders on mode/search change */}
      <VocabListWord
        words={filteredWords}
        viewMode={viewMode}
        searchQuery={searchQuery}
        onClearSearch={handleClearSearch}
        onAddWordClick={onAddWordClick}
        onToggleStar={onToggleStar}
      />
    </>
  );
}
