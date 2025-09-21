<script setup lang="ts">
import { ref, computed } from 'vue';
import { useColorMode } from '#imports';

type NavItem = { label: string; to: string };

const links = ref<NavItem[]>([
  { label: '홈', to: '/' },
  { label: '오름 검색', to: '/search' },
  { label: '추천 받기', to: '/quiz' },
  { label: '즐겨찾기', to: '/favorites' },
]);

const isOpen = ref(false);
const colorMode = useColorMode();
const isDark = computed(() => colorMode.preference === 'dark');
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark';
};

// 단축키 설정 (예: 'o' 키로 모바일 메뉴 열기/닫기)
// defineShortcuts({
//   o: () => (isOpen.value = !isOpen.value),
// });
</script>

<template>
  <header class="sticky top-0 z-50 border-b backdrop-blur">
    <UContainer class="py-3">
      <div class="flex items-center gap-3">
        <!-- 로고 -->
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold">
          <UIcon name="i-heroicons-fire-20-solid" class="h-5 w-5" />
          <span>오르락(Orrak)</span>
        </NuxtLink>

        <!-- 데스크탑 내비 -->
        <nav class="ml-auto hidden md:flex items-center gap-2">
          <AppNav :links="links" />
          <UButton
            :aria-label="isDark ? '라이트 모드' : '다크 모드'"
            variant="ghost"
            size="sm"
            @click="toggleTheme"
          >
            <UIcon
              :name="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
              class="h-5 w-5"
            />
          </UButton>
        </nav>

        <!-- 모바일 메뉴 버튼 -->
        <div class="ml-auto md:hidden flex items-center gap-2">
          <UButton
            :aria-label="isDark ? '라이트 모드' : '다크 모드'"
            variant="ghost"
            size="sm"
            @click="toggleTheme"
          >
            <UIcon
              :name="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
              class="h-5 w-5"
            />
          </UButton>

          <UButton icon="i-heroicons-bars-3-20-solid" variant="soft" @click="isOpen = true">
            메뉴
          </UButton>
        </div>
      </div>
    </UContainer>

    <!-- 모바일 드로어 -->
    <USlideover
      v-model:open="isOpen"
      side="right"
      :ui="{
        content: 'w-64',
      }"
    >
      <template #header="{ close }">
        <div class="flex items-center justify-between w-full">
          <UIcon name="i-heroicons-fire-20-solid" class="h-5 w-5" />

          <UButton
            icon="i-heroicons-x-mark-20-solid"
            variant="ghost"
            aria-label="닫기"
            color="neutral"
            @click="close()"
          />
        </div>
      </template>

      <template #body>
        <div class="p-4 space-y-4">
          <div class="flex items-center justify-between">
            <span class="font-semibold">메뉴</span>
          </div>

          <div class="grid gap-2">
            <NuxtLink
              v-for="item in links"
              :key="item.to"
              :to="item.to"
              class="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              @click="isOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </USlideover>
  </header>
</template>
