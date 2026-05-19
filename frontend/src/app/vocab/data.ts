export interface WordPreview {
  word: string;
  type: string;
  definition: string;
  isStarred: boolean;
  usage?: string;
  imageUrl?: string;
}

export interface DeckItem {
  id: string;
  title: string;
  description: string;
  totalCards: number;
  themeColor: string;
  words: WordPreview[];
}

export const initialVocabDecks: DeckItem[] = [
  {
    id: "ielts-core",
    title: "IELTS Core Academic",
    description: "Từ vựng nâng cao phục vụ kỹ năng Speaking & Writing đạt Band 7.0+",
    totalCards: 45,
    themeColor: "text-sky-600",
    words: [
      { 
        word: "Resilient", 
        type: "adj", 
        definition: "Kiên cường, phục hồi nhanh", 
        isStarred: true,
        usage: "Despite the heavy storm, the coastal trees proved to be highly resilient.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60"
      },
      { 
        word: "Ubiquitous", 
        type: "adj", 
        definition: "Phổ biến khắp mọi nơi", 
        isStarred: false,
        usage: "Smartphones have become ubiquitous in modern society.",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60"
      },
      { 
        word: "Pragmatic", 
        type: "adj", 
        definition: "Thực tế, thực dụng", 
        isStarred: true,
        usage: "We need a pragmatic approach to solve this budget issue quickly.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60"
      },
    ]
  },
  {
    id: "tech-it",
    title: "Tech & Software Engineering",
    description: "Thuật ngữ chuyên ngành, thiết kế hệ thống và cấu trúc dữ liệu cơ bản.",
    totalCards: 28,
    themeColor: "text-blue-500",
    words: [
      { 
        word: "Idempotent", 
        type: "adj", 
        definition: "Giao dịch lặp lại không đổi trạng thái", 
        isStarred: true,
        usage: "In REST APIs, the GET method should always be idempotent.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60"
      },
      { 
        word: "Asynchronous", 
        type: "adj", 
        definition: "Bất đồng bộ, không cùng thời gian", 
        isStarred: false,
        usage: "JavaScript uses asynchronous callbacks to handle server responses.",
        imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=500&auto=format&fit=crop&q=60"
      },
      { 
        word: "Concurrency", 
        type: "n", 
        definition: "Sự thực thi đồng thời hệ thống", 
        isStarred: false,
        usage: "High concurrency is a key challenge in building online multiplayer games.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60"
      },
    ]
  },
  {
    id: "daily-life",
    title: "Daily Life & Communication",
    description: "Cụm từ thông dụng, thành ngữ giao tiếp tự nhiên hàng ngày.",
    totalCards: 64,
    themeColor: "text-cyan-500",
    words: [
      { 
        word: "Bite the bullet", 
        type: "idiom", 
        definition: "Cắn răng chịu đựng khó khăn", 
        isStarred: false,
        usage: "I decided to bite the bullet and tell my boss about the mistake.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60"
      },
      { 
        word: "Break a leg", 
        type: "idiom", 
        definition: "Chúc may mắn trước khi diễn", 
        isStarred: true,
        usage: "You are going to do great on the presentation. Break a leg!",
        imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=500&auto=format&fit=crop&q=60"
      },
      { 
        word: "Hit the sack", 
        type: "idiom", 
        definition: "Đi ngủ vì quá mệt mỏi", 
        isStarred: false,
        usage: "I'm absolutely exhausted after the flight, so I'm going to hit the sack.",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60"
      },
    ]
  },
  {
    id: "business-english",
    title: "Business English",
    description: "Từ vựng tiếng Anh thương mại, đàm phán và thuyết trình chuyên nghiệp.",
    totalCards: 36,
    themeColor: "text-emerald-500",
    words: [
      { 
        word: "Synergy", 
        type: "n", 
        definition: "Sự cộng tác, hiệp lực hiệu quả", 
        isStarred: true,
        usage: "The synergy between our design and engineering departments is incredible.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60"
      },
      { 
        word: "Leverage", 
        type: "v", 
        definition: "Tận dụng tối đa ưu thế, đòn bẩy", 
        isStarred: false,
        usage: "We can leverage our customer base to launch this new subscription service.",
        imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=60"
      },
      { 
        word: "Feasible", 
        type: "adj", 
        definition: "Khả thi, có thể thực hiện được", 
        isStarred: true,
        usage: "It is not feasible to complete the entire project in just two days.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&auto=format&fit=crop&q=60"
      },
    ]
  }
];
