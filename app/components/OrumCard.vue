<script setup lang="ts">
import type { Orum } from '~/types/orum';
defineProps<{ item: Orum }>();

const fmtDuration = (n?: number) => (typeof n === 'number' ? `${n}분` : '-');
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div class="flex items-center justify-between gap-2">
        <div class="font-semibold truncate">{{ item.name }}</div>
        <UBadge v-if="item.difficulty" variant="soft" color="primary">{{ item.difficulty }}</UBadge>
      </div>
    </template>

    <div class="space-y-3">
      <!-- 설명 -->
      <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {{ item.description }}
      </p>

      <!-- 시즌 뱃지 -->
      <div v-if="item.seasons?.length" class="flex flex-wrap gap-1">
        <UBadge v-for="s in item.seasons" :key="s" size="xs" variant="soft">{{ s }}</UBadge>
      </div>

      <!-- 핵심 정보 -->
      <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-clock-20-solid" class="h-4 w-4" />
          <span>정상(편도)</span>
          <span class="ml-auto font-medium">{{
            fmtDuration(item.duration_minutes_one_way?.summit)
          }}</span>
        </div>

        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-arrow-path-20-solid" class="h-4 w-4" />
          <span>코스(편도)</span>
          <span class="ml-auto font-medium">{{
            fmtDuration(item.duration_minutes_one_way?.course)
          }}</span>
        </div>

        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-map-pin-20-solid" class="h-4 w-4" />
          <span>입구</span>
          <span class="ml-auto text-right truncate max-w-[10rem]">
            {{ item.entrance?.main || '-' }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <UIcon
            :name="
              item.parking?.has_parking
                ? 'i-heroicons-parking-20-solid'
                : 'i-heroicons-no-symbol-20-solid'
            "
            class="h-4 w-4"
          />
          <span>주차</span>
          <UPopover v-if="item.parking?.parking?.length" mode="hover">
            <UButton variant="link" size="xs" class="ml-auto px-0">세부</UButton>
            <template #panel>
              <div class="p-2 text-sm space-y-1 max-w-xs">
                <div v-for="(p, i) in item.parking.parking" :key="i">- {{ p }}</div>
              </div>
            </template>
          </UPopover>
          <span v-else class="ml-auto">{{ item.parking?.has_parking ? '가능' : '불가' }}</span>
        </div>
      </div>

      <!-- 이용시간/입장료 -->
      <div v-if="item.usage_and_fees?.hours_and_fees?.length" class="text-xs text-gray-500">
        <span class="font-medium">이용/요금:</span>
        <UPopover mode="hover">
          <UButton variant="link" size="xs" class="px-1">자세히</UButton>
          <template #panel>
            <div class="p-2 text-sm space-y-1 max-w-sm">
              <div>입장료: {{ item.usage_and_fees.has_admission_fee ? '있음' : '없음' }}</div>
              <hr class="my-1 opacity-50" />
              <div v-for="(f, i) in item.usage_and_fees.hours_and_fees" :key="i">- {{ f }}</div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center gap-2 text-xs text-gray-500">
        <div v-if="item.tips?.length">Tip {{ item.tips.length }}</div>
        <UButton to="#" size="sm" color="primary" variant="soft">자세히 보기</UButton>
      </div>
    </template>
  </UCard>
</template>
