<script setup lang="ts">
import { useOrums } from '~/composables/useOrums';
import type { Season } from '~/types/orum';

const { query, data, pending, error } = useOrums({ sort: 'name', order: 'asc' });

const difficulties = ['하', '중', '상'];
const seasons: Season[] = ['봄', '여름', '가을', '겨울'];
const parkingOptions = [
  { label: '전체', value: '' },
  { label: '가능', value: 'true' },
  { label: '불가', value: 'false' },
];

// 클라이언트 페이지네이션
const page = ref(1);
const pageSize = ref(12);
const total = computed(() => data.value?.total || 0);
const pagedItems = computed(() => {
  const items = data.value?.items || [];
  const start = (page.value - 1) * pageSize.value;
  return items.slice(start, start + pageSize.value);
});

watch(
  query,
  () => {
    page.value = 1;
  },
  { deep: true }
);
</script>

<template>
  <UContainer class="py-8 space-y-6">
    <!-- 상단 -->
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-xl font-semibold">오름 목록</h1>
        <p class="text-sm text-gray-500">총 {{ total }}개</p>
      </div>

      <div class="flex items-center gap-2">
        <USelect
          v-model="query.sort"
          :options="[
            { label: '이름순', value: 'name' },
            { label: '편도 소요순', value: 'duration' },
          ]"
          size="sm"
        />
        <USelect
          v-model="query.order"
          :options="[
            { label: '오름차순', value: 'asc' },
            { label: '내림차순', value: 'desc' },
          ]"
          size="sm"
        />
      </div>
    </div>

    <!-- 필터 -->
    <UCard>
      <div class="grid gap-3 md:grid-cols-6">
        <div class="md:col-span-2">
          <UInput
            v-model="query.q"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="오름명·설명·특징 검색"
          />
        </div>

        <div class="md:col-span-1">
          <USelect
            v-model="query.difficulty"
            :options="['', ...difficulties]"
            placeholder="난이도"
          />
        </div>

        <div class="md:col-span-1">
          <USelect v-model="query.season" :options="['', ...seasons]" placeholder="추천시기" />
        </div>

        <div class="md:col-span-1">
          <USelect v-model="query.parking" :options="parkingOptions" />
        </div>

        <div class="md:col-span-1">
          <UInput
            v-model.number="query.maxDuration"
            type="number"
            min="0"
            placeholder="최대 편도(분)"
          />
        </div>
      </div>
    </UCard>

    <!-- 목록 -->
    <div v-if="pending" class="flex justify-center py-16"><ULoader /></div>

    <template v-else>
      <div v-if="error" class="py-8">
        <UAlert color="red" title="오류" :description="String(error)" />
      </div>

      <div v-else-if="(data?.items?.length || 0) === 0" class="py-16 text-center text-gray-500">
        조건에 맞는 오름이 없습니다.
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <OrumCard v-for="o in pagedItems" :key="o.name" :item="o" />
      </div>

      <div v-if="total > pageSize" class="flex justify-center pt-6">
        <UPagination v-model="page" :page-count="Math.ceil(total / pageSize)" />
      </div>
    </template>
  </UContainer>
</template>
