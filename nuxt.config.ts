// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  modules: ['@nuxt/ui'],
  css: [
    '~/assets/css/main.css',
    'pretendard/dist/web/variable/pretendardvariable.css', // 가변 폰트
  ],
  app: {
    head: {
      title: '오르락 | 제주 오름 추천',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '가족 맞춤형 제주 오름 추천/상세 정보',
        },
      ],
    },
  },
  ui: {
    theme: {
      colors: ['myColor'],
    },
  },
});
