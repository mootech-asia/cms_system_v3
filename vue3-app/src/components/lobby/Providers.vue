<template>
  <section class="lobby-section" :class="{ 'is-collapsed': collapsed }" data-screen-label="Providers">
    <div class="section-head">
      <h2 class="section-title">Providers<span class="count">{{ PROVIDERS.length }}</span></h2>
      <div class="section-actions">
        <a href="#" class="see-all">All providers →</a>
        <button
          class="section-collapse"
          :class="{ active: collapsed }"
          :aria-label="collapsed ? 'Expand providers' : 'Collapse providers'"
          :aria-expanded="!collapsed"
          @click="collapsed = !collapsed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </div>
    </div>
    <div v-show="!collapsed" class="providers">
      <a v-for="p in PROVIDERS" :key="p" href="#" class="provider">{{ p }}</a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { PROVIDERS } from '@/data/index.js';

const collapsed = ref(false);
</script>
