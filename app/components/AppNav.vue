<script setup lang="ts">
type NavItem = { label: string; to: string };
defineProps<{ links: NavItem[] }>();
</script>

<template>
  <div class="flex items-center gap-1">
    <NuxtLink
      v-for="item in links"
      :key="item.to"
      :to="item.to"
      class="px-3 py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      active-class="bg-gray-100 dark:bg-gray-800 font-semibold"
    >
      {{ item.label }}
    </NuxtLink>
  </div>
</template>
