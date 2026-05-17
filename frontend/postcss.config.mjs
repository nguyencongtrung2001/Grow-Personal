const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        "text-primary": "#0F172A",
        "text-muted": "#64748B",
        "border-glass": "#E2E8F0",
        "color-finance": "#EAB308",    // Vàng đồng xu
        "color-vocab": "#0284C7",      // Xanh biển mát
        "color-challenge": "#FF4500",  // Cam đỏ nhiệt huyết
        "color-task": "#10B981",       // Xanh lá tươi
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
};

export default config;
