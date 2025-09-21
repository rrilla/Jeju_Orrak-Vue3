<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t">
    <UContainer class="py-8">
      <div class="grid gap-6 md:grid-cols-3">
        <div class="space-y-2">
          <div class="flex items-center gap-2 font-semibold">
            <UIcon name="i-heroicons-fire-20-solid" class="h-5 w-5" />
            <span>오르락(Orrak)</span>
          </div>
          <p class="text-sm text-my">가족 취향 맞춤형 제주 오름 추천</p>
        </div>

        <div>
          <div class="text-sm font-semibold mb-2">바로가기</div>
          <div class="flex flex-wrap gap-2">
            <UButton to="/search" variant="ghost" size="sm">오름 검색</UButton>
            <UButton to="/quiz" variant="ghost" size="sm">추천 받기</UButton>
            <UButton to="/about" variant="ghost" size="sm">서비스 소개</UButton>
          </div>
        </div>

        <div class="text-sm text-my">© {{ year }} Orrak. All rights reserved.</div>
      </div>
    </UContainer>
  </footer>
</template>
