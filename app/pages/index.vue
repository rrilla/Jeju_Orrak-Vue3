<script setup lang="ts"></script>

<template>
  <UContainer class="py-10">
    <div class="grid gap-6">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h1 class="text-lg font-semibold">제주 오름 취향 맞춤 추천</h1>
            <UButton to="/quiz">추천 받기</UButton>
          </div>
        </template>

        <p>
          우리 가족이 즐겁고 안전하게 오를 수 있는 오름을 추천해드려요. 난이도, 소요시간, 주차,
          추천시기 등 핵심 정보를 한눈에!
        </p>
      </UCard>

      <div class="flex flex-wrap gap-3">
        <UButton to="/search" variant="soft" icon="i-heroicons-magnifying-glass-20-solid"
          >오름 검색</UButton
        >
        <UButton to="/favorites" variant="soft" icon="i-heroicons-heart-20-solid">즐겨찾기</UButton>
        <UButton to="/about" variant="soft" icon="i-heroicons-information-circle-20-solid"
          >서비스 소개</UButton
        >
      </div>
    </div>
  </UContainer>

  <!-- Alert -->
  <UAlert
    title="Heads up!"
    description="You can change the primary color in your app config."
    variant="outline"
    :actions="[
      {
        label: 'Action 1',
      },
      {
        label: 'Action 2',
        color: 'neutral',
        variant: 'subtle',
      },
    ]"
  />
</template>
