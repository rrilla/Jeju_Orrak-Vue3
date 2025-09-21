import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        // Nuxt UI가 쓰는 기본 sans를 Pretendard로 지정
        sans: ["Pretendard Variable", "sans-serif"],
      },
    },
  },
};
