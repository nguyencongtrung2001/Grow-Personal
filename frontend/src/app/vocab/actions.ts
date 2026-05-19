"use server";
import { revalidatePath } from "next/cache";
import { initialVocabDecks, DeckItem } from "@/app/vocab/data";

// Giả lập In-Memory Database (Chỉ dùng cho mục đích demo, sẽ mất khi restart server)
let mockDatabase: DeckItem[] = [...initialVocabDecks];

export async function getDecksAction(): Promise<DeckItem[]> {
  return mockDatabase;
}

export async function createDeckAction(prevState: unknown, formData: FormData) {
  const title = formData.get("folderTitle") as string;
  const description = formData.get("folderDesc") as string;

  if (!title || !title.trim()) {
    return { success: false, error: "Vui lòng nhập tên thư mục." };
  }

  const colors = [
    "text-sky-600",
    "text-blue-500",
    "text-cyan-500",
    "text-emerald-500",
    "text-indigo-500",
    "text-violet-500",
    "text-rose-500"
  ];
  const themeColor = colors[Math.floor(Math.random() * colors.length)];

  const newDeck: DeckItem = {
    id: `custom-${Date.now()}`,
    title: title.trim(),
    description: description?.trim() || "Chưa có mô tả chi tiết.",
    totalCards: 0,
    themeColor,
    words: []
  };

  mockDatabase = [newDeck, ...mockDatabase];
  
  revalidatePath("/vocab");
  return { success: true, error: null };
}

export async function createWordAction(prevState: unknown, formData: FormData) {
  const word = formData.get("word") as string;
  const type = formData.get("type") as string;
  const definition = formData.get("definition") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const usage = formData.get("usage") as string;
  const folderId = formData.get("folderId") as string;

  if (!word?.trim()) return { success: false, error: "Vui lòng nhập từ vựng." };
  if (!definition?.trim()) return { success: false, error: "Vui lòng nhập định nghĩa tiếng Việt." };
  if (!folderId) return { success: false, error: "Vui lòng chọn thư mục lưu trữ." };

  mockDatabase = mockDatabase.map((deck) => {
    if (deck.id === folderId) {
      return {
        ...deck,
        totalCards: deck.totalCards + 1,
        words: [
          {
            word: word.trim(),
            type,
            definition: definition.trim(),
            isStarred: false,
            imageUrl: imageUrl?.trim() || undefined,
            usage: usage?.trim() || undefined
          },
          ...deck.words,
        ],
      };
    }
    return deck;
  });

  revalidatePath("/vocab");
  revalidatePath(`/vocab/${folderId}`);
  return { success: true, error: null };
}

export async function toggleStarAction(wordText: string, folderId: string) {
  mockDatabase = mockDatabase.map((deck) => {
    if (deck.id === folderId) {
      return {
        ...deck,
        words: deck.words.map(w => 
          w.word === wordText ? { ...w, isStarred: !w.isStarred } : w
        )
      };
    }
    return deck;
  });
  revalidatePath(`/vocab/${folderId}`);
}
